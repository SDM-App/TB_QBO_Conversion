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
    detailTypes: [],     // { Type_Code, Code, Name_EN, Name_FR }
    gifi: {},            // { [gifiCode]: { qboCode } } - descriptions for maintenance only, not displayed
    keywords: {},        // { [category]: [{ Keyword, Priority, QBO_Code }] }
    uiStrings: UI_STRINGS  // Loaded from ui-strings.js
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

          // Build indexes
          buildIndexes();

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
   * Parse DetailTypes sheet
   */
  function parseDetailTypes(workbook) {
    const sheet = workbook.Sheets['DetailTypes'];
    if (!sheet) {
      console.warn('DetailTypes sheet not found');
      return;
    }
    _data.detailTypes = XLSX.utils.sheet_to_json(sheet);
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
   * @param {string} accountName - Account name to search
   * @param {string} category - Category to search within
   * @returns {Object|null} Best matching keyword result { keyword, qboCode }
   */
  function findKeywordMatch(accountName, category = null) {
    if (!accountName) return null;

    const upperName = accountName.toUpperCase();

    // If category provided, search only that category
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

    // No category - search ALL categories for best match
    // Collect all matches with their priorities
    let bestMatch = null;
    let bestPriority = Infinity;

    for (const cat of Object.keys(_data.keywords)) {
      const keywords = _data.keywords[cat];
      for (const kw of keywords) {
        if (upperName.includes(kw.keyword)) {
          // Keywords are sorted by priority, so first match in each category is best for that category
          if (kw.priority < bestPriority) {
            bestPriority = kw.priority;
            bestMatch = {
              keyword: kw.keyword,
              qboCode: kw.qboCode,
              category: cat
            };
          }
          break; // Only consider first match per category (they're sorted)
        }
      }
    }

    return bestMatch;
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
    getRawData
  };

})();

// Export for ES modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DataLoader;
}
