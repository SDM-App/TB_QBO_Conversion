/**
 * Application State Management
 * Centralized state for the TB Import Tool wizard
 */

const AppState = (function() {
  'use strict';

  // Current language
  let _lang = 'en';

  // Current wizard step (1-6)
  let _currentStep = 1;

  // Step 1: Upload & Parse Configuration
  let _setup = {
    trialBalanceDate: null,     // Date object
    accountNumberLength: null,  // Auto-detected from data (legacy, kept for compatibility)
    multiCurrency: false,       // Multi-currency COA mode
    homeCurrency: 'CAD'         // Home currency code
  };

  // Parse configuration (new in restructured wizard)
  let _parseConfig = {
    skipRows: 0,                    // Number of header rows to skip
    useCombinedColumn: false,       // Account # and name in one column
    combinedDelimiter: ' \u00B7 ',  // Default: space + middle dot + space
    amountType: 'auto',             // 'auto', 'single', 'separate'
    autoGenerateNumbers: false,     // Generate account numbers if missing
    numberStartFrom: 1000           // Starting number for auto-generation
  };

  // Detected first digits from uploaded data
  let _detectedFirstDigits = [];

  // Step 2: Chart of Accounts Structure
  let _structure = {
    // First digit to category mapping (0-9)
    digitMapping: {
      0: 'Skip',      // Usually not used
      1: 'Asset',
      2: 'Liability',
      3: 'Equity',
      4: 'Income',
      5: 'Expense',
      6: 'Expense',
      7: 'Expense',
      8: 'Expense',
      9: 'Expense'
    },
    // Special account numbers
    specialAccounts: {
      ar: '',         // Accounts Receivable account number
      ap: '',         // Accounts Payable account number
      re: ''          // Retained Earnings account number
    }
  };

  // Step 2: Uploaded data (moved earlier in new wizard flow)
  let _uploadedData = {
    fileName: '',
    fileType: '',           // 'xlsx', 'xls', 'csv', 'paste'
    originalRawData: [],    // ORIGINAL file data before any skipRows processing
    rawData: [],            // Raw parsed rows (after skipRows applied)
    headers: [],            // Column headers
    columnMapping: {        // Which column maps to which field
      accountNumber: null,
      accountName: null,
      combined: null,       // For combined account#/name column
      debit: null,
      credit: null,
      balance: null,
      gifi: null
    },
    parsedAccounts: []      // Processed account rows
  };

  // Step 4: Mapping results
  let _mappingResults = {
    accounts: [],           // Array of mapped account objects
    summary: {
      total: 0,
      mapped: 0,
      needsReview: 0,
      errors: 0
    }
  };

  // Event listeners
  let _listeners = {
    stepChange: [],
    langChange: [],
    stateChange: []
  };

  // ============================================
  // Event System
  // ============================================

  function on(event, callback) {
    if (_listeners[event]) {
      _listeners[event].push(callback);
    }
  }

  function off(event, callback) {
    if (_listeners[event]) {
      _listeners[event] = _listeners[event].filter(cb => cb !== callback);
    }
  }

  function emit(event, data) {
    if (_listeners[event]) {
      _listeners[event].forEach(cb => cb(data));
    }
  }

  // ============================================
  // Language
  // ============================================

  function getLanguage() {
    return _lang;
  }

  function setLanguage(lang) {
    if (lang === 'en' || lang === 'fr') {
      _lang = lang;
      emit('langChange', _lang);
      emit('stateChange', { type: 'language', value: _lang });
    }
  }

  function toggleLanguage() {
    setLanguage(_lang === 'en' ? 'fr' : 'en');
  }

  // ============================================
  // Step Navigation
  // ============================================

  function getCurrentStep() {
    return _currentStep;
  }

  function setCurrentStep(step) {
    if (step >= 1 && step <= 6) {
      const prevStep = _currentStep;
      _currentStep = step;
      emit('stepChange', { from: prevStep, to: _currentStep });
      emit('stateChange', { type: 'step', value: _currentStep });
    }
  }

  /**
   * Check if Step 3 (First Digit Mapping) should be skipped
   * Skip when no account numbers are detected in the data
   */
  function shouldSkipStep3() {
    return _detectedFirstDigits.length === 0;
  }

  function nextStep() {
    if (_currentStep < 6) {
      let nextStepNum = _currentStep + 1;
      // Skip Step 3 if no account numbers detected
      if (_currentStep === 2 && shouldSkipStep3()) {
        nextStepNum = 4;
      }
      setCurrentStep(nextStepNum);
    }
  }

  function prevStep() {
    if (_currentStep > 1) {
      let prevStepNum = _currentStep - 1;
      // Skip Step 3 when going back if no account numbers detected
      if (_currentStep === 4 && shouldSkipStep3()) {
        prevStepNum = 2;
      }
      setCurrentStep(prevStepNum);
    }
  }

  function canProceed() {
    switch (_currentStep) {
      case 1:
        return validateStep1();
      case 2:
        return validateStep2();
      case 3:
        return validateStep3();
      case 4:
        return validateStep4();
      case 5:
        return validateStep5();
      case 6:
        return true; // Always can "proceed" from download (restart)
      default:
        return false;
    }
  }

  // ============================================
  // Step 1: Setup
  // ============================================

  function getSetup() {
    return { ..._setup };
  }

  function setTrialBalanceDate(date) {
    _setup.trialBalanceDate = date;
    emit('stateChange', { type: 'setup.date', value: date });
  }

  function setAccountNumberLength(length) {
    const len = parseInt(length, 10);
    if (len >= 3 && len <= 6) {
      _setup.accountNumberLength = len;
      emit('stateChange', { type: 'setup.accountLength', value: len });
    }
  }

  function setMultiCurrency(enabled) {
    _setup.multiCurrency = !!enabled;
    emit('stateChange', { type: 'setup.multiCurrency', value: _setup.multiCurrency });
  }

  function setHomeCurrency(currencyCode) {
    _setup.homeCurrency = currencyCode || 'CAD';
    emit('stateChange', { type: 'setup.homeCurrency', value: _setup.homeCurrency });
  }

  // ============================================
  // Parse Configuration
  // ============================================

  function getParseConfig() {
    return { ..._parseConfig };
  }

  function setParseConfig(config) {
    _parseConfig = { ..._parseConfig, ...config };
    emit('stateChange', { type: 'parseConfig', value: _parseConfig });
  }

  function setSkipRows(rows) {
    _parseConfig.skipRows = parseInt(rows, 10) || 0;
    emit('stateChange', { type: 'parseConfig.skipRows', value: _parseConfig.skipRows });
  }

  function setCombinedColumn(enabled, delimiter = null) {
    _parseConfig.useCombinedColumn = enabled;
    if (delimiter !== null) {
      _parseConfig.combinedDelimiter = delimiter;
    }
    emit('stateChange', { type: 'parseConfig.combined', value: { enabled, delimiter } });
  }

  function setAmountType(type) {
    if (['auto', 'single', 'separate'].includes(type)) {
      _parseConfig.amountType = type;
      emit('stateChange', { type: 'parseConfig.amountType', value: type });
    }
  }

  function setAutoGenerateNumbers(enabled, startFrom = 1000) {
    _parseConfig.autoGenerateNumbers = enabled;
    _parseConfig.numberStartFrom = parseInt(startFrom, 10) || 1000;
    emit('stateChange', { type: 'parseConfig.autoGenerate', value: { enabled, startFrom } });
  }

  function getDetectedFirstDigits() {
    return [..._detectedFirstDigits];
  }

  function setDetectedFirstDigits(digits) {
    _detectedFirstDigits = digits;
    emit('stateChange', { type: 'detectedDigits', value: digits });
  }

  function validateStep1() {
    // In new flow: Step 1 is upload & parse config
    // Must have uploaded data (check originalRawData since that's what stores the file)
    const hasData = _uploadedData.fileName ||
                    (_uploadedData.rawData && _uploadedData.rawData.length > 0) ||
                    (_uploadedData.originalRawData && _uploadedData.originalRawData.length > 0);
    if (!hasData) {
      return false;
    }

    // Date is still required
    if (!_setup.trialBalanceDate) return false;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (_setup.trialBalanceDate > today) return false;

    return true;
  }

  // ============================================
  // Step 2: Structure
  // ============================================

  function getStructure() {
    return {
      digitMapping: { ..._structure.digitMapping },
      specialAccounts: { ..._structure.specialAccounts }
    };
  }

  function setDigitMapping(digit, category) {
    if (digit >= 0 && digit <= 9) {
      _structure.digitMapping[digit] = category;
      emit('stateChange', { type: 'structure.digit', digit, value: category });
    }
  }

  function setSpecialAccount(type, accountNumber) {
    if (['ar', 'ap', 're'].includes(type)) {
      _structure.specialAccounts[type] = accountNumber;
      emit('stateChange', { type: `structure.special.${type}`, value: accountNumber });
    }
  }

  // ============================================
  // Uploaded Data (Step 1 in new flow)
  // ============================================

  function getUploadedData() {
    return {
      ..._uploadedData,
      originalRawData: _uploadedData.originalRawData || [],
      rawData: _uploadedData.rawData || [],
      headers: _uploadedData.headers || []
    };
  }

  function setUploadedFile(fileName, fileType, rawData, headers, originalRawData) {
    _uploadedData.fileName = fileName;
    _uploadedData.fileType = fileType;
    _uploadedData.rawData = rawData;
    _uploadedData.headers = headers;
    _uploadedData.originalRawData = originalRawData || rawData;
    _uploadedData.columnMapping = {
      accountNumber: null,
      accountName: null,
      combined: null,
      debit: null,
      credit: null,
      balance: null,
      gifi: null
    };
    _uploadedData.parsedAccounts = [];
    emit('stateChange', { type: 'upload.file', value: fileName });
  }

  function setOriginalRawData(data) {
    _uploadedData.originalRawData = data;
  }

  function setColumnMapping(mapping) {
    _uploadedData.columnMapping = { ...mapping };
    emit('stateChange', { type: 'upload.mapping', value: mapping });
  }

  /**
   * Update headers and rawData without touching originalRawData
   * Used by processForStep2 to preserve original data for header row preview
   */
  function updateParsedData(headers, rawData) {
    _uploadedData.headers = headers;
    _uploadedData.rawData = rawData;
    // DO NOT touch originalRawData - keep it pristine for header row preview
    emit('stateChange', { type: 'upload.parsed' });
  }

  function setParsedAccounts(accounts) {
    _uploadedData.parsedAccounts = accounts;
    emit('stateChange', { type: 'upload.accounts', value: accounts.length });
  }

  function clearUploadedData() {
    _uploadedData = {
      fileName: '',
      fileType: '',
      originalRawData: [],
      rawData: [],
      headers: [],
      columnMapping: {
        accountNumber: null,
        accountName: null,
        combined: null,
        debit: null,
        credit: null,
        balance: null,
        gifi: null
      },
      parsedAccounts: []
    };
    _detectedFirstDigits = [];
    emit('stateChange', { type: 'upload.clear' });
  }

  function validateStep2() {
    // Step 2: Column Mapping & Preview (new flow)
    // Must have uploaded raw data (check both rawData and originalRawData)
    const hasData = (_uploadedData.rawData && _uploadedData.rawData.length > 0) ||
                    (_uploadedData.originalRawData && _uploadedData.originalRawData.length > 0);
    if (!hasData) return false;

    // Only requirement: at least one amount column (debit, credit, or balance)
    // Account number is OPTIONAL - QBO doesn't require it
    const hasAmount = _uploadedData.columnMapping.debit !== null ||
                      _uploadedData.columnMapping.credit !== null ||
                      _uploadedData.columnMapping.balance !== null;

    return hasAmount;
  }

  function validateStep3() {
    // Step 3: Account Categories (new flow)
    // This is the first digit mapping step

    // Auto-pass if no account numbers detected (step will be skipped)
    if (_detectedFirstDigits.length === 0) {
      return true;
    }

    const cats = Object.values(_structure.digitMapping);

    // Must have at least one Asset, Liability, and Equity
    const hasAsset = cats.includes('Asset');
    const hasLiability = cats.includes('Liability');
    const hasEquity = cats.includes('Equity');

    return hasAsset && hasLiability && hasEquity;
  }

  // ============================================
  // Step 4: Mapping Results
  // ============================================

  function getMappingResults() {
    return {
      accounts: [..._mappingResults.accounts],
      summary: { ..._mappingResults.summary }
    };
  }

  function setMappingResults(accounts) {
    _mappingResults.accounts = accounts;

    // Calculate summary
    let mapped = 0, needsReview = 0, errors = 0, skipped = 0;
    for (const acct of accounts) {
      switch (acct.status) {
        case 'mapped':
        case 'locked':
          mapped++;
          break;
        case 'review':
          needsReview++;
          break;
        case 'error':
          errors++;
          break;
        case 'skip':
          skipped++;
          break;
      }
    }

    _mappingResults.summary = {
      total: accounts.length,
      mapped,
      needsReview,
      errors,
      skipped
    };

    emit('stateChange', { type: 'mapping.results', value: _mappingResults.summary });
  }

  function updateAccountMapping(index, updates) {
    if (index >= 0 && index < _mappingResults.accounts.length) {
      _mappingResults.accounts[index] = {
        ..._mappingResults.accounts[index],
        ...updates
      };

      // Recalculate summary
      setMappingResults(_mappingResults.accounts);
      emit('stateChange', { type: 'mapping.update', index, value: updates });
    }
  }

  function validateStep4() {
    // No errors or unresolved reviews
    return _mappingResults.summary.errors === 0 &&
           _mappingResults.summary.needsReview === 0;
  }

  function validateStep5() {
    // Step 5: Special Accounts - always valid (selections are optional)
    return true;
  }

  // ============================================
  // Reset / Export
  // ============================================

  function reset() {
    _currentStep = 1;
    _setup = {
      trialBalanceDate: null,
      accountNumberLength: null,
      multiCurrency: false,
      homeCurrency: 'CAD'
    };
    _parseConfig = {
      skipRows: 0,
      useCombinedColumn: false,
      combinedDelimiter: ' \u00B7 ',
      amountType: 'auto',
      autoGenerateNumbers: false,
      numberStartFrom: 1000
    };
    _detectedFirstDigits = [];
    _structure = {
      digitMapping: {
        0: 'Skip',
        1: 'Asset',
        2: 'Liability',
        3: 'Equity',
        4: 'Income',
        5: 'Expense',
        6: 'Expense',
        7: 'Expense',
        8: 'Expense',
        9: 'Expense'
      },
      specialAccounts: { ar: '', ap: '', re: '' }
    };
    clearUploadedData();
    _mappingResults = {
      accounts: [],
      summary: { total: 0, mapped: 0, needsReview: 0, errors: 0 }
    };
    emit('stateChange', { type: 'reset' });
    emit('stepChange', { from: null, to: 1 });
  }

  function exportState() {
    return {
      lang: _lang,
      currentStep: _currentStep,
      setup: { ..._setup },
      structure: getStructure(),
      uploadedData: {
        fileName: _uploadedData.fileName,
        parsedAccounts: _uploadedData.parsedAccounts.length
      },
      mappingResults: getMappingResults()
    };
  }

  // Public API
  return {
    // Events
    on,
    off,

    // Language
    getLanguage,
    setLanguage,
    toggleLanguage,

    // Steps
    getCurrentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    canProceed,

    // Step 1: Upload & Parse Config
    getSetup,
    setTrialBalanceDate,
    setAccountNumberLength,
    setMultiCurrency,
    setHomeCurrency,
    getParseConfig,
    setParseConfig,
    setSkipRows,
    setCombinedColumn,
    setAmountType,
    setAutoGenerateNumbers,
    getDetectedFirstDigits,
    setDetectedFirstDigits,
    getUploadedData,
    setUploadedFile,
    setOriginalRawData,
    setColumnMapping,
    updateParsedData,
    setParsedAccounts,
    clearUploadedData,
    validateStep1,

    // Step 2: Column Mapping & Preview
    validateStep2,

    // Step 3: Account Categories
    getStructure,
    setDigitMapping,
    setSpecialAccount,
    validateStep3,

    // Step 4: Verify Mappings
    getMappingResults,
    setMappingResults,
    updateAccountMapping,
    validateStep4,

    // Step 5: Special Accounts
    validateStep5,

    // Utility
    reset,
    exportState
  };

})();

// Export for ES modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppState;
}
