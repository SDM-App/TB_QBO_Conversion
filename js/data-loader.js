/**
 * Data Loader Module
 * Loads reference_data.xlsx and parses it into JavaScript objects
 *
 * Dependencies: SheetJS (XLSX) loaded via CDN
 */

const DataLoader = (function() {
  'use strict';

  // Parsed data storage
  let _data = {
    categories: [],      // { Category, Name_EN, Name_FR }
    types: [],           // { Type_Code, Category, Name_EN, Name_FR }
    detailTypes: [],     // { Type_Code, Code, Name_EN, Name_FR, IsDefault, IsFallback }
    gifi: {},            // { [gifiCode]: { qboCode } } - descriptions for maintenance only, not displayed
    keywords: {},        // { [category]: [{ Keyword, Priority, QBO_Code }] }
    categoryIndicators: [], // { keyword, category, points } - for scoring categories when no account number
    uiStrings: UI_STRINGS,  // Loaded from ui-strings.js
    defaults: {
      byCategory: {},    // { [category]: detailTypeCode } - default detail type per category
      fallbacks: {}      // { AR: code, AP: code, RE: code } - fallback for non-special accounts
    }
  };

  // Lookup indexes for fast access
  let _indexes = {
    typesByCategory: {},      // { [category]: [type names] }
    detailTypesByType: {},    // { [type]: [{ code, name_en, name_fr }] }
    detailTypeByCode: {},     // { [code]: { type, name_en, name_fr } }
    categoryByType: {}        // { [type]: category }
  };

  let _loaded = false;
  let _loadPromise = null;

  /**
   * Load the reference data Excel file
   * @returns {Promise} Resolves when data is loaded
   */
  function load() {
    if (_loaded) {
      return Promise.resolve(_data);
    }

    if (_loadPromise) {
      return _loadPromise;
    }

    _loadPromise = new Promise((resolve, reject) => {
      // Fetch the Excel file
      fetch('data/reference_data.xlsx')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to load reference data: ${response.status}`);
          }
          return response.arrayBuffer();
        })
        .then(buffer => {
          // Parse with SheetJS
          const workbook = XLSX.read(buffer, { type: 'array' });

          // Parse each sheet
          parseCategories(workbook);
          parseTypes(workbook);
          parseDetailTypes(workbook);
          parseGIFI(workbook);
          parseKeywords(workbook);
          parseCategoryIndicators(workbook);

          // Build indexes
          buildIndexes();

          // Process defaults (needs indexes to be built first)
          processDefaults();

          _loaded = true;
          console.log('Reference data loaded successfully');
          resolve(_data);
        })
        .catch(error => {
          console.error('Error loading reference data:', error);
          reject(error);
        });
    });

    return _loadPromise;
  }

  /**
   * Parse Categories sheet
   */
  function parseCategories(workbook) {
    const sheet = workbook.Sheets['Categories'];
    if (!sheet) {
      console.warn('Categories sheet not found');
      return;
    }
    _data.categories = XLSX.utils.sheet_to_json(sheet);
  }

  /**
   * Parse Types sheet
   */
  function parseTypes(workbook) {
    const sheet = workbook.Sheets['Types'];
    if (!sheet) {
      console.warn('Types sheet not found');
      return;
    }
    _data.types = XLSX.utils.sheet_to_json(sheet);
  }

  /**
   * Parse DetailTypes sheet and extract defaults
   */
  function parseDetailTypes(workbook) {
    const sheet = workbook.Sheets['DetailTypes'];
    if (!sheet) {
      console.warn('DetailTypes sheet not found');
      return;
    }
    _data.detailTypes = XLSX.utils.sheet_to_json(sheet);

    // Reset defaults
    _data.defaults = {
      byCategory: {},
      byType: {},      // Default detail type per type (from IsDefault column)
      fallbacks: {}
    };

    // Extract IsDefault and IsFallback info
    // Note: Need to build categoryByType first, but it's done in buildIndexes() which runs after
    // So we store the raw data and process in buildIndexes()
  }

  /**
   * Process defaults after indexes are built
   */
  function processDefaults() {
    for (const dt of _data.detailTypes) {
      // Check IsDefault column - marks default detail type for this TYPE
      const isDefault = dt.IsDefault;
      if (isDefault === 'TRUE' || isDefault === 'Y' || isDefault === '1' || isDefault === true) {
        // Store by TYPE (not category) - each type can have its own default
        _data.defaults.byType[dt.Type_Code] = dt.Code;

        // Also store by category for backward compatibility (first digit fallback mapping)
        const category = _indexes.categoryByType[dt.Type_Code];
        if (category && !_data.defaults.byCategory[category]) {
          _data.defaults.byCategory[category] = dt.Code;
        }
      }

      // Check IsFallback column - AR, AP, or RE
      const fallback = dt.IsFallback;
      if (fallback && String(fallback).trim()) {
        _data.defaults.fallbacks[String(fallback).trim().toUpperCase()] = dt.Code;
      }
    }
  }

  /**
   * Parse GIFI sheet into lookup object
   * Note: Description columns exist for maintenance reference only - never displayed to users
   */
  function parseGIFI(workbook) {
    const sheet = workbook.Sheets['GIFI'];
    if (!sheet) {
      console.warn('GIFI sheet not found');
      return;
    }
    const rows = XLSX.utils.sheet_to_json(sheet);
    _data.gifi = {};

    for (const row of rows) {
      const gifiCode = String(row.GIFI || '').trim();
      if (gifiCode) {
        _data.gifi[gifiCode] = {
          qboCode: row.QBO_Code || ''
        };
      }
    }
  }

  /**
   * Parse Keywords sheet into lookup object by category
   */
  function parseKeywords(workbook) {
    const sheet = workbook.Sheets['Keywords'];
    if (!sheet) {
      console.warn('Keywords sheet not found');
      return;
    }
    const rows = XLSX.utils.sheet_to_json(sheet);
    _data.keywords = {};

    for (const row of rows) {
      const category = row.Category || '';
      const keyword = row.Keyword || '';
      const qboCode = row.QBO_Code || '';

      // Skip invalid entries
      if (!category || !keyword || !qboCode || qboCode === 'NEEDS_REVIEW') {
        continue;
      }

      if (!_data.keywords[category]) {
        _data.keywords[category] = [];
      }

      _data.keywords[category].push({
        keyword: keyword.toUpperCase(),
        priority: parseInt(row.Priority, 10) || 99,
        qboCode: qboCode
      });
    }

    // Sort each category's keywords by priority (lower = higher priority)
    for (const category of Object.keys(_data.keywords)) {
      _data.keywords[category].sort((a, b) => a.priority - b.priority);
    }
  }

  /**
   * Parse CategoryIndicators sheet for points-based category scoring
   */
  function parseCategoryIndicators(workbook) {
    const sheet = workbook.Sheets['CategoryIndicators'];
    if (!sheet) {
      console.warn('CategoryIndicators sheet not found');
      return;
    }
    const rows = XLSX.utils.sheet_to_json(sheet);
    _data.categoryIndicators = rows.map(row => ({
      keyword: (row.Keyword || '').toUpperCase(),
      category: row.Category || '',
      points: parseInt(row.Points, 10) || 0
    })).filter(ind => ind.keyword && ind.category && ind.points > 0);
  }


  /**
   * Build lookup indexes for fast access
   */
  function buildIndexes() {
    // Types by category
    _indexes.typesByCategory = {};
    for (const type of _data.types) {
      const cat = type.Category;
      if (!_indexes.typesByCategory[cat]) {
        _indexes.typesByCategory[cat] = [];
      }
      _indexes.typesByCategory[cat].push({
        type_code: type.Type_Code,
        name_en: type.Name_EN,
        name_fr: type.Name_FR
      });
    }

    // Category by type_code (reverse lookup)
    _indexes.categoryByType = {};
    for (const type of _data.types) {
      _indexes.categoryByType[type.Type_Code] = type.Category;
    }

    // Detail types by type_code
    _indexes.detailTypesByType = {};
    _indexes.detailTypeByCode = {};
    for (const dt of _data.detailTypes) {
      const typeCode = dt.Type_Code;
      if (!_indexes.detailTypesByType[typeCode]) {
        _indexes.detailTypesByType[typeCode] = [];
      }

      const detailObj = {
        code: dt.Code,
        name_en: dt.Name_EN,
        name_fr: dt.Name_FR
      };

      _indexes.detailTypesByType[typeCode].push(detailObj);
      _indexes.detailTypeByCode[dt.Code] = {
        ...detailObj,
        type_code: typeCode
      };
    }
  }

  // ============================================
  // Public API
  // ============================================

  /**
   * Check if data is loaded
   */
  function isLoaded() {
    return _loaded;
  }

  /**
   * Get all categories
   * @param {string} lang - 'en' or 'fr'
   * @returns {Array} Array of { id, name }
   */
  function getCategories(lang = 'en') {
    const nameKey = lang === 'fr' ? 'Name_FR' : 'Name_EN';
    return _data.categories.map(c => ({
      id: c.Category,
      name: c[nameKey] || c.Name_EN
    }));
  }

  /**
   * Get types for a category
   * @param {string} category - Category ID
   * @param {string} lang - 'en' or 'fr'
   * @returns {Array} Array of { id, name }
   */
  function getTypesForCategory(category, lang = 'en') {
    const types = _indexes.typesByCategory[category] || [];
    const nameKey = lang === 'fr' ? 'name_fr' : 'name_en';
    return types.map(t => ({
      id: t.type_code,
      name: t[nameKey] || t.name_en
    }));
  }

  /**
   * Get all types
   * @param {string} lang - 'en' or 'fr'
   * @returns {Array} Array of { id, name, category }
   */
  function getAllTypes(lang = 'en') {
    const nameKey = lang === 'fr' ? 'Name_FR' : 'Name_EN';
    return _data.types.map(t => ({
      id: t.Type_Code,
      name: t[nameKey] || t.Name_EN,
      category: t.Category
    }));
  }

  /**
   * Get detail types for a type
   * @param {string} typeCode - Type code (e.g., 'BANK', 'AR')
   * @param {string} lang - 'en' or 'fr'
   * @returns {Array} Array of { code, name }
   */
  function getDetailTypesForType(typeCode, lang = 'en') {
    const detailTypes = _indexes.detailTypesByType[typeCode] || [];
    const nameKey = lang === 'fr' ? 'name_fr' : 'name_en';
    return detailTypes.map(dt => ({
      code: dt.code,
      name: dt[nameKey] || dt.name_en
    }));
  }

  /**
   * Get detail type info by code
   * @param {string} code - Detail type code (e.g., 'BCHQ')
   * @param {string} lang - 'en' or 'fr'
   * @returns {Object|null} { code, name, type_code, category }
   */
  function getDetailTypeByCode(code, lang = 'en') {
    const dt = _indexes.detailTypeByCode[code];
    if (!dt) return null;

    const nameKey = lang === 'fr' ? 'name_fr' : 'name_en';
    return {
      code: dt.code,
      name: dt[nameKey] || dt.name_en,
      type_code: dt.type_code,
      category: _indexes.categoryByType[dt.type_code] || ''
    };
  }

  /**
   * Get category for a type
   * @param {string} typeCode - Type code (e.g., 'BANK', 'AR')
   * @returns {string|null} Category name
   */
  function getCategoryForType(typeCode) {
    return _indexes.categoryByType[typeCode] || null;
  }

  /**
   * Look up GIFI code to get QBO mapping
   * @param {string} gifiCode - GIFI code
   * @returns {string|null} QBO code or null if not found
   */
  function getGIFI(gifiCode) {
    const gifi = _data.gifi[gifiCode];
    if (!gifi) return null;
    return gifi.qboCode || null;
  }

  /**
   * Get keywords for a category (sorted by priority)
   * @param {string} category - Category name
   * @returns {Array} Array of { keyword, priority, qboCode }
   */
  function getKeywordsForCategory(category) {
    return _data.keywords[category] || [];
  }

  /**
   * Search for matching keyword in account name
   * Uses points-based scoring when no category is provided
   * @param {string} accountName - Account name to search
   * @param {string} category - Category to search within (optional)
   * @returns {Object|null} Best matching keyword result { keyword, qboCode, category }
   */
  function findKeywordMatch(accountName, category = null) {
    if (!accountName) return null;

    const upperName = accountName.toUpperCase();

    // Helper: Check if keyword matches as a whole word
    function isWholeWordMatch(name, keyword) {
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`);
      return regex.test(name);
    }

    // If category provided, search only that category (existing behavior)
    if (category) {
      const keywords = _data.keywords[category];
      if (!keywords) return null;

      // Keywords are already sorted by priority
      for (const kw of keywords) {
        if (upperName.includes(kw.keyword)) {
          return {
            keyword: kw.keyword,
            qboCode: kw.qboCode,
            category: category
          };
        }
      }
      return null;
    }

    // === NO CATEGORY - USE POINTS-BASED SCORING ===

    // Step 1: Score categories using CategoryIndicators
    let scores = {};
    for (const cat of Object.keys(_data.keywords)) {
      scores[cat] = 0;
    }

    for (const ind of _data.categoryIndicators) {
      if (upperName.includes(ind.keyword)) {
        if (scores[ind.category] !== undefined) {
          scores[ind.category] += ind.points;
        }
      }
    }

    // Step 2: Find all keyword matches, prefer whole word
    let matchesByCategory = {};

    for (const cat of Object.keys(_data.keywords)) {
      const keywords = _data.keywords[cat];
      let bestMatch = null;
      let bestIsWholeWord = false;
      let bestPriority = Infinity;

      for (const kw of keywords) {
        if (upperName.includes(kw.keyword)) {
          const isWholeWord = isWholeWordMatch(upperName, kw.keyword);

          // Prefer whole word, then lower priority
          const isBetter =
            (!bestMatch) ||
            (isWholeWord && !bestIsWholeWord) ||
            (isWholeWord === bestIsWholeWord && kw.priority < bestPriority);

          if (isBetter) {
            bestMatch = kw;
            bestIsWholeWord = isWholeWord;
            bestPriority = kw.priority;
          }
        }
      }

      if (bestMatch) {
        matchesByCategory[cat] = {
          keyword: bestMatch.keyword,
          qboCode: bestMatch.qboCode,
          priority: bestMatch.priority,
          isWholeWord: bestIsWholeWord
        };
        // Add points for keyword match
        // Whole word: +2 per word (multi-word keywords get bonus)
        // Substring: +1 flat
        const wordCount = bestMatch.keyword.split(/\s+/).length;
        scores[cat] += bestIsWholeWord ? (2 * wordCount) : 1;
      }
    }

    // Step 3: Find category with highest score
    let bestCategory = null;
    let bestScore = 0;

    for (const [cat, score] of Object.entries(scores)) {
      if (score > bestScore && matchesByCategory[cat]) {
        bestScore = score;
        bestCategory = cat;
      }
    }

    if (!bestCategory) return null;

    const match = matchesByCategory[bestCategory];
    return {
      keyword: match.keyword,
      qboCode: match.qboCode,
      category: bestCategory
    };
  }

  /**
   * Get UI string
   * @param {string} key - String key
   * @param {string} lang - 'en' or 'fr'
   * @returns {string} Translated string or key if not found
   */
  function getString(key, lang = 'en') {
    const str = _data.uiStrings[key];
    if (!str) return key;
    return str[lang] || str.en || key;
  }

  /**
   * Get all UI strings for a language
   * @param {string} lang - 'en' or 'fr'
   * @returns {Object} Key-value pairs
   */
  function getAllStrings(lang = 'en') {
    const result = {};
    for (const [key, value] of Object.entries(_data.uiStrings)) {
      result[key] = value[lang] || value.en || key;
    }
    return result;
  }

  /**
   * Get raw data (for debugging)
   */
  function getRawData() {
    return { ..._data };
  }

  /**
   * Get defaults (category defaults and fallbacks)
   * @returns {Object} { byCategory: { [category]: code }, fallbacks: { AR: code, AP: code, RE: code } }
   */
  function getDefaults() {
    return _data.defaults;
  }

  /**
   * Get default detail type code for a specific type
   * @param {string} typeCode - The type code (e.g., 'PPE', 'BANK')
   * @returns {string|null} Detail type code or null if not found
   */
  function getTypeDefault(typeCode) {
    return _data.defaults.byType[typeCode] || null;
  }

  // Public API
  return {
    load,
    isLoaded,
    getCategories,
    getTypesForCategory,
    getAllTypes,
    getDetailTypesForType,
    getDetailTypeByCode,
    getCategoryForType,
    getGIFI,
    getKeywordsForCategory,
    findKeywordMatch,
    getString,
    getAllStrings,
    getRawData,
    getDefaults,
    getTypeDefault
  };

})();

// Export for ES modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DataLoader;
}
