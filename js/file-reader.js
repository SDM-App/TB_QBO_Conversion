/**
 * File Reader Module
 * Handles reading Excel/CSV files and clipboard data into raw arrays
 *
 * Dependencies: SheetJS (XLSX), AppState
 */

const FileReader = (function() {
  'use strict';

  // Common column name patterns for auto-detection
  const COLUMN_PATTERNS = {
    accountNumber: [
      /^(account|acct|acc)[\s_-]*(#|no|num|number)?$/i,
      /^(#|no|num|number)$/i,
      /^code$/i
    ],
    accountName: [
      /^(account|acct)[\s_-]*(name|desc|description)?$/i,
      /^name$/i,
      /^description$/i
    ],
    combined: [
      /^(account|acct)$/i,
      /^account[\s_-]*(info|details?)?$/i
    ],
    debit: [
      /^debit[s]?$/i,
      /^dr$/i,
      /^debit[\s_-]*(amount|balance)?$/i
    ],
    credit: [
      /^credit[s]?$/i,
      /^cr$/i,
      /^credit[\s_-]*(amount|balance)?$/i
    ],
    balance: [
      /^balance$/i,
      /^amount$/i,
      /^net$/i,
      /^total$/i
    ],
    gifi: [
      /^gifi$/i,
      /^gifi[\s_-]*(code|#|no|num)?$/i
    ]
  };

  // Default parse configuration
  const DEFAULT_PARSE_CONFIG = {
    skipRows: 0,                    // Number of header rows to skip
    useCombinedColumn: false,       // Account # and name in one column
    combinedDelimiter: ' \u00B7 ',  // Default: space + middle dot + space
    amountType: 'auto',             // 'auto', 'single', 'separate'
    autoGenerateNumbers: false,     // Generate account numbers if missing
    numberStartFrom: 1000           // Starting number for auto-generation
  };

  /**
   * Read a file (Excel or CSV) into a raw array
   * @param {File} file - The file object to read
   * @param {Object} config - Optional configuration
   * @returns {Promise} Resolves with raw data array
   */
  function readFile(file, config = {}) {
    const readConfig = { ...DEFAULT_PARSE_CONFIG, ...config };

    return new Promise((resolve, reject) => {
      const fileName = file.name;
      const extension = fileName.split('.').pop().toLowerCase();

      if (!['xlsx', 'xls', 'csv'].includes(extension)) {
        reject(new Error('Unsupported file type. Please upload .xlsx, .xls, or .csv files.'));
        return;
      }

      const reader = new window.FileReader(); // Use window.FileReader to avoid conflict with our module name

      reader.onload = function(e) {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          // Check if multiple sheets exist
          if (workbook.SheetNames.length > 1) {
            // Return sheet info for UI to show selector
            const sheets = workbook.SheetNames.map(name => {
              const sheet = workbook.Sheets[name];
              let cellCount = 0;
              for (const key in sheet) {
                if (key[0] !== '!') cellCount++;
              }
              return { name, cellCount };
            });

            resolve({
              needsSheetSelection: true,
              sheets,
              workbook,
              fileName,
              fileType: extension
            });
            return;
          }

          // Single sheet - read it directly
          const sheetName = workbook.SheetNames[0];
          const result = readSheetData(workbook, sheetName, fileName, extension, readConfig);
          resolve(result);

        } catch (error) {
          reject(new Error(`Failed to read file: ${error.message}`));
        }
      };

      reader.onerror = function() {
        reject(new Error('Failed to read file.'));
      };

      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Read a specific sheet from a workbook (called after user selects sheet)
   * @param {Object} workbook - The SheetJS workbook object
   * @param {string} sheetName - Name of the sheet to read
   * @param {string} fileName - Original file name
   * @param {string} fileType - File type (xlsx, xls)
   * @param {Object} config - Optional configuration
   * @returns {Object} Parsed result
   */
  function readSheet(workbook, sheetName, fileName, fileType, config = {}) {
    const readConfig = { ...DEFAULT_PARSE_CONFIG, ...config };
    return readSheetData(workbook, sheetName, fileName, fileType, readConfig);
  }

  /**
   * Internal function to read sheet data from a workbook
   * @param {Object} workbook - The SheetJS workbook object
   * @param {string} sheetName - Name of the sheet to read
   * @param {string} fileName - Original file name
   * @param {string} fileType - File type (xlsx, xls)
   * @param {Object} readConfig - Parse configuration
   * @returns {Object} Parsed result
   */
  function readSheetData(workbook, sheetName, fileName, fileType, readConfig) {
    const sheet = workbook.Sheets[sheetName];

    // Find TRUE max column by checking all cell references
    // This handles cases where column A is empty but data exists in B, C, etc.
    let maxCol = 0;
    for (const cellRef in sheet) {
      if (cellRef[0] === '!') continue; // skip special keys like !ref, !margins
      const cell = XLSX.utils.decode_cell(cellRef);
      if (cell.c > maxCol) maxCol = cell.c;
    }

    // Convert to JSON (array of arrays)
    const rawFromSheet = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

    // Normalize: ensure every row has exactly maxCol+1 columns as strings
    // SheetJS creates sparse arrays when columns are empty (e.g., column A empty)
    // This ensures dense arrays matching paste behavior
    const originalRawData = rawFromSheet.map(row => {
      // Create array with correct number of empty strings
      const arr = new Array(maxCol + 1).fill('');
      if (row && Array.isArray(row)) {
        // Copy values at their correct positions (handles sparse arrays)
        for (let i = 0; i <= maxCol; i++) {
          if (row[i] !== null && row[i] !== undefined) {
            arr[i] = String(row[i]);
          }
        }
      }
      return arr;
    });

    if (!originalRawData || originalRawData.length < 2) {
      throw new Error('Sheet appears to be empty or has insufficient data.');
    }

    // Store the raw data
    return storeRawData(originalRawData, fileName, fileType, readConfig);
  }

  /**
   * Read pasted text (tab or comma separated) into a raw array
   * @param {string} text - The pasted text
   * @param {Object} config - Optional configuration
   * @returns {Promise} Resolves with raw data array
   */
  function readText(text, config = {}) {
    const readConfig = { ...DEFAULT_PARSE_CONFIG, ...config };

    return new Promise((resolve, reject) => {
      try {
        if (!text || text.trim().length === 0) {
          reject(new Error('No data provided.'));
          return;
        }

        // Detect delimiter (tab, comma, or semicolon)
        const firstLine = text.split('\n')[0];
        let delimiter = '\t';
        if (firstLine.includes('\t')) {
          delimiter = '\t';
        } else if (firstLine.includes(',')) {
          delimiter = ',';
        } else if (firstLine.includes(';')) {
          delimiter = ';';
        }

        // Read lines into array
        const lines = text.trim().split('\n');
        const originalRawData = lines.map(line => {
          // Handle quoted values for CSV
          if (delimiter === ',') {
            return readCSVLine(line);
          }
          return line.split(delimiter).map(cell => cell.trim());
        });

        if (originalRawData.length < 2) {
          reject(new Error('Insufficient data. Please paste at least a header row and one data row.'));
          return;
        }

        // Store the raw data
        const result = storeRawData(originalRawData, 'Pasted Data', 'paste', readConfig);
        resolve(result);

      } catch (error) {
        reject(new Error(`Failed to read pasted data: ${error.message}`));
      }
    });
  }

  /**
   * Read a CSV line respecting quoted values
   */
  function readCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result;
  }

  /**
   * Store raw data array in state
   * @param {Array} originalRawData - Raw array of row arrays
   * @param {string} fileName - Name of the source file
   * @param {string} fileType - Type of file (xlsx, csv, paste)
   * @param {Object} config - Configuration options
   */
  function storeRawData(originalRawData, fileName, fileType, config = DEFAULT_PARSE_CONFIG) {
    // Just store the raw data - that's it
    // All mapping happens in Step 2 when user configures columns
    AppState.setUploadedFile(fileName, fileType, originalRawData, [], originalRawData);

    return {
      fileName,
      fileType,
      rowCount: originalRawData.length,
      originalRawData
    };
  }

  /**
   * Prepare data for column mapping in Step 2
   * Applies skipRows, detects columns, extracts accounts
   * Called when entering Step 2 or when config changes
   */
  function prepareForMapping(parseConfig = null) {
    const uploadedData = AppState.getUploadedData();
    const originalRawData = uploadedData.originalRawData;

    if (!originalRawData || originalRawData.length === 0) {
      return null;
    }

    const config = parseConfig || AppState.getParseConfig();

    // Apply skipRows to get working data
    let workingData = originalRawData;
    if (config.skipRows > 0) {
      workingData = originalRawData.slice(config.skipRows);
    }

    if (workingData.length < 1) {
      return null;
    }

    // First row of working data is headers
    const headers = workingData[0].map((h, i) => {
      const val = h !== null && h !== undefined ? String(h).trim() : '';
      return val || `Column ${String.fromCharCode(65 + i)}`;
    });
    const dataRows = workingData.slice(1);

    // Filter out completely empty rows
    const filteredRows = dataRows.filter(row =>
      row.some(cell => cell !== null && cell !== undefined && String(cell).trim() !== '')
    );

    // Auto-detect column mapping based on config
    const columnMapping = detectColumns(headers, config);

    // Update state - use updateParsedData to preserve originalRawData
    AppState.setParseConfig(config);
    AppState.updateParsedData(headers, filteredRows);  // <-- preserves originalRawData for header row preview
    AppState.setColumnMapping(columnMapping);

    // Parse accounts using detected mapping
    const parsedAccounts = parseAccounts(filteredRows, headers, columnMapping, config);
    AppState.setParsedAccounts(parsedAccounts);

    // Detect unique first digits found in the data
    const firstDigits = detectFirstDigits(parsedAccounts);
    AppState.setDetectedFirstDigits(firstDigits);

    return {
      headers,
      rowCount: filteredRows.length,
      columnMapping,
      mappingConfidence: calculateMappingConfidence(columnMapping, config),
      parsedAccounts,
      firstDigits
    };
  }

  /**
   * Detect unique first digits present in the parsed accounts
   * @param {Array} accounts - Parsed accounts array
   * @returns {Array} Sorted array of unique first digits
   */
  function detectFirstDigits(accounts) {
    const digits = new Set();
    for (const account of accounts) {
      if (account.accountNumber && account.accountNumber.length > 0) {
        const firstChar = account.accountNumber.charAt(0);
        if (/[0-9]/.test(firstChar)) {
          digits.add(firstChar);
        }
      }
    }
    return Array.from(digits).sort();
  }

  /**
   * Auto-detect column mappings based on header names
   * @param {Array} headers - Array of header strings
   * @param {Object} parseConfig - Parse configuration
   */
  function detectColumns(headers, parseConfig = DEFAULT_PARSE_CONFIG) {
    const mapping = {
      accountNumber: null,
      accountName: null,
      combined: null,           // For combined account#/name column
      debit: null,
      credit: null,
      balance: null,
      gifi: null
    };

    headers.forEach((header, index) => {
      const headerLower = String(header).toLowerCase().trim();

      for (const [field, patterns] of Object.entries(COLUMN_PATTERNS)) {
        if (mapping[field] === null) {
          for (const pattern of patterns) {
            if (pattern.test(headerLower)) {
              mapping[field] = index;
              break;
            }
          }
        }
      }
    });

    // If using combined column mode, always clear the separate fields
    // User must manually select the combined column from dropdown
    if (parseConfig.useCombinedColumn) {
      mapping.accountNumber = null;
      mapping.accountName = null;
    }

    // If amountType is 'single', only look for balance column
    if (parseConfig.amountType === 'single') {
      mapping.debit = null;
      mapping.credit = null;
    }

    // If amountType is 'separate', only look for debit/credit columns
    if (parseConfig.amountType === 'separate') {
      mapping.balance = null;
    }

    return mapping;
  }

  /**
   * Calculate confidence score for the column mapping
   * @param {Object} mapping - Column mapping object
   * @param {Object} parseConfig - Parse configuration
   */
  function calculateMappingConfidence(mapping, parseConfig = DEFAULT_PARSE_CONFIG) {
    let score = 0;
    let maxScore = 0;

    // If using combined column mode
    if (parseConfig.useCombinedColumn) {
      if (mapping.combined !== null) score += 60;
      maxScore += 60;
    } else {
      // Separate account number and name
      if (mapping.accountNumber !== null) score += 30;
      maxScore += 30;

      if (mapping.accountName !== null) score += 30;
      maxScore += 30;
    }

    // Amount fields based on config
    if (parseConfig.amountType === 'single') {
      if (mapping.balance !== null) score += 30;
      maxScore += 30;
    } else if (parseConfig.amountType === 'separate') {
      if (mapping.debit !== null) score += 15;
      if (mapping.credit !== null) score += 15;
      maxScore += 30;
    } else {
      // Auto mode: accept either
      if (mapping.balance !== null) {
        score += 30;
      } else if (mapping.debit !== null || mapping.credit !== null) {
        score += 15;
        if (mapping.debit !== null && mapping.credit !== null) {
          score += 15;
        }
      }
      maxScore += 30;
    }

    // Optional: GIFI (bonus)
    if (mapping.gifi !== null) score += 10;
    maxScore += 10;

    return Math.round((score / maxScore) * 100);
  }

  /**
   * Parse accounts from raw data using column mapping
   * @param {Array} rows - Data rows
   * @param {Array} headers - Header row
   * @param {Object} mapping - Column mapping
   * @param {Object} parseConfig - Parse configuration
   */
  function parseAccounts(rows, headers, mapping, parseConfig = DEFAULT_PARSE_CONFIG) {
    const accounts = [];
    let autoNumberCounter = parseConfig.numberStartFrom || 1000;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      let accountNumber = '';
      let accountName = '';

      // Handle combined column with delimiter splitting
      if (parseConfig.useCombinedColumn && mapping.combined !== null) {
        const combined = String(row[mapping.combined] || '').trim();
        if (combined) {
          const parts = splitByDelimiter(combined, parseConfig.combinedDelimiter);
          accountNumber = parts.accountNumber;
          accountName = parts.accountName;
        }
      } else {
        // Separate columns
        accountNumber = mapping.accountNumber !== null
          ? String(row[mapping.accountNumber] || '').trim()
          : '';

        accountName = mapping.accountName !== null
          ? String(row[mapping.accountName] || '').trim()
          : '';
      }

      // Calculate balance based on amount type configuration
      let balance = 0;
      let debit = null;
      let credit = null;

      if (parseConfig.amountType === 'single' || mapping.balance !== null) {
        // Single balance column: positive = debit, negative = credit
        balance = parseNumber(row[mapping.balance]);
        if (balance > 0) {
          debit = balance;
          credit = null;
        } else if (balance < 0) {
          debit = null;
          credit = Math.abs(balance);
        }
      } else {
        // Separate debit/credit columns
        debit = mapping.debit !== null ? parseNumber(row[mapping.debit]) : 0;
        credit = mapping.credit !== null ? parseNumber(row[mapping.credit]) : 0;
        balance = debit - credit;
      }

      // Skip rows with no amount data (completely empty financial rows)
      if (balance === 0 && (debit === null || debit === 0) && (credit === null || credit === 0)) {
        // Only skip if there's also no identifying info
        if (!accountNumber && !accountName) continue;
      }

      // Get GIFI if available
      const gifi = mapping.gifi !== null
        ? String(row[mapping.gifi] || '').trim()
        : '';

      // Auto-generate account number if needed and enabled
      if (!accountNumber && parseConfig.autoGenerateNumbers) {
        accountNumber = String(autoNumberCounter++);
      }

      accounts.push({
        rowIndex: i,
        accountNumber,
        accountName,
        balance,
        debit,
        credit,
        gifi,
        // First digit for category mapping (empty if no account number)
        firstDigit: accountNumber ? accountNumber.charAt(0) : '',
        // Flag if account number was auto-generated
        autoGenerated: parseConfig.autoGenerateNumbers && !accountNumber
      });
    }

    return accounts;
  }

  /**
   * Split a combined field by delimiter
   * @param {string} value - The combined value
   * @param {string} delimiter - The delimiter to split by
   * @returns {Object} { accountNumber, accountName }
   */
  function splitByDelimiter(value, delimiter) {
    if (!value || !delimiter) {
      return { accountNumber: '', accountName: value || '' };
    }

    const index = value.indexOf(delimiter);
    if (index === -1) {
      // No delimiter found - assume it's all account name
      return { accountNumber: '', accountName: value };
    }

    const leftPart = value.substring(0, index).trim();
    const rightPart = value.substring(index + delimiter.length).trim();

    // Check for QBDT hierarchical format: "Parent:1234" where digits are at the end after a colon
    // Pattern: parent path ending with ":digits"
    // Example: "Employment Expenses:6560 · Payroll Expenses" → accountNumber="6560", accountName="Employment Expenses:Payroll Expenses"
    const qbdtMatch = leftPart.match(/^(.+):(\d+)$/);

    if (qbdtMatch) {
      // QBDT format detected
      const parentPath = qbdtMatch[1].trim();
      const accountNumber = qbdtMatch[2];
      const accountName = parentPath + ':' + rightPart;
      return { accountNumber, accountName };
    }

    // Standard format: "12100 · Inventory Asset"
    return { accountNumber: leftPart, accountName: rightPart };
  }

  /**
   * Parse a number from various formats
   */
  function parseNumber(value) {
    if (value === null || value === undefined || value === '') {
      return 0;
    }

    // If already a number
    if (typeof value === 'number') {
      return isNaN(value) ? 0 : value;
    }

    // Convert to string and clean up
    let str = String(value).trim();

    // Handle accounting format: (1,234.56) -> -1234.56
    const isNegative = str.startsWith('(') && str.endsWith(')');
    if (isNegative) {
      str = str.slice(1, -1);
    }

    // Also check for minus sign
    const hasMinus = str.startsWith('-');
    if (hasMinus) {
      str = str.slice(1);
    }

    // Remove currency symbols and thousands separators
    str = str.replace(/[$€£¥,\s]/g, '');

    // Parse
    let num = parseFloat(str);
    if (isNaN(num)) {
      return 0;
    }

    // Apply negative sign
    if (isNegative || hasMinus) {
      num = -num;
    }

    return num;
  }

  /**
   * Update column mapping (when user manually changes it)
   */
  function updateColumnMapping(field, columnIndex) {
    const mapping = AppState.getUploadedData().columnMapping;
    mapping[field] = columnIndex;
    AppState.setColumnMapping(mapping);

    // Re-parse accounts with new mapping
    const uploadedData = AppState.getUploadedData();
    const parseConfig = AppState.getParseConfig();
    const parsedAccounts = parseAccounts(
      uploadedData.rawData,
      uploadedData.headers,
      mapping,
      parseConfig
    );
    AppState.setParsedAccounts(parsedAccounts);

    // Update detected first digits
    const firstDigits = detectFirstDigits(parsedAccounts);
    AppState.setDetectedFirstDigits(firstDigits);

    return parsedAccounts;
  }

  /**
   * Validate the uploaded data
   */
  function validateUploadedData() {
    const data = AppState.getUploadedData();
    const errors = [];

    if (data.parsedAccounts.length === 0) {
      errors.push('No valid accounts found in the data.');
    }

    if (data.columnMapping.accountNumber === null) {
      errors.push('Account number column not identified.');
    }

    if (data.columnMapping.accountName === null) {
      errors.push('Account name column not identified.');
    }

    const hasAmount = data.columnMapping.balance !== null ||
                      data.columnMapping.debit !== null ||
                      data.columnMapping.credit !== null;
    if (!hasAmount) {
      errors.push('No balance or debit/credit columns identified.');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Get data preview (first N rows)
   */
  function getDataPreview(maxRows = 10) {
    const data = AppState.getUploadedData();
    const headers = data.headers && data.headers.length > 0 ? data.headers : [];
    const rawData = data.rawData && data.rawData.length > 0 ? data.rawData : [];

    // If headers is empty but we have originalRawData, use first row as headers
    let displayHeaders = headers;
    let displayRows = rawData;

    if (displayHeaders.length === 0 && data.originalRawData && data.originalRawData.length > 0) {
      const config = AppState.getParseConfig();
      const skipRows = config.skipRows || 0;
      const workingData = data.originalRawData.slice(skipRows);
      if (workingData.length > 0) {
        displayHeaders = workingData[0].map((h, i) => {
          const val = String(h || '').trim();
          return val || `Column ${String.fromCharCode(65 + i)}`;
        });
        displayRows = workingData.slice(1, maxRows + 1);
      }
    }

    return {
      headers: displayHeaders,
      rows: displayRows.slice(0, maxRows),
      totalRows: displayRows.length,
      columnMapping: data.columnMapping
    };
  }

  /**
   * Re-parse data with new configuration
   * @param {Object} newConfig - New parse configuration
   * @returns {Object} Parsed result
   */
  function reparseWithConfig(newConfig) {
    const uploadedData = AppState.getUploadedData();
    const originalData = uploadedData.originalRawData;

    // Need original data to re-slice with new skipRows
    if (!originalData || originalData.length === 0) {
      return null;
    }

    const parseConfig = { ...DEFAULT_PARSE_CONFIG, ...newConfig };

    // RE-SLICE from original with new skipRows
    let workingData = originalData;
    if (parseConfig.skipRows > 0) {
      workingData = originalData.slice(parseConfig.skipRows);
    }

    if (workingData.length < 2) {
      return null;
    }

    // Now detect headers from the NEW first row
    const headers = workingData[0].map(h => String(h).trim());
    const dataRows = workingData.slice(1);

    // Filter out empty rows
    const filteredRows = dataRows.filter(row =>
      row.some(cell => cell !== null && cell !== undefined && String(cell).trim() !== '')
    );

    // Re-detect columns with new headers and config
    const columnMapping = detectColumns(headers, parseConfig);

    // Update state
    AppState.setParseConfig(parseConfig);
    AppState.setUploadedFile(uploadedData.fileName, uploadedData.fileType, filteredRows, headers, originalData);
    AppState.setColumnMapping(columnMapping);

    // Re-parse accounts with new headers
    const parsedAccounts = parseAccounts(
      filteredRows,
      headers,
      columnMapping,
      parseConfig
    );
    AppState.setParsedAccounts(parsedAccounts);

    // Re-detect first digits
    const firstDigits = detectFirstDigits(parsedAccounts);
    AppState.setDetectedFirstDigits(firstDigits);

    return {
      headers,
      columnMapping,
      mappingConfidence: calculateMappingConfidence(columnMapping, parseConfig),
      parsedAccounts,
      firstDigits,
      parseConfig
    };
  }

  /**
   * Get default parse configuration
   */
  function getDefaultConfig() {
    return { ...DEFAULT_PARSE_CONFIG };
  }

  // Public API
  return {
    readFile,
    readSheet,
    readText,
    prepareForMapping,
    updateColumnMapping,
    validateUploadedData,
    getDataPreview,
    calculateMappingConfidence,
    reparseWithConfig,
    getDefaultConfig,
    detectFirstDigits,
    splitByDelimiter
  };

})();

// Export for ES modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FileReader;
}
