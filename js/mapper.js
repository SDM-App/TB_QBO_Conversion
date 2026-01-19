/**
 * Account Mapper Module
 * Maps uploaded accounts to QBO types and detail types
 *
 * Mapping Priority:
 * 1. Manual override (user selected)
 * 2. Special accounts (A/R, A/P, Retained Earnings)
 * 3. GIFI code lookup
 * 4. Keyword matching
 * 5. First digit category fallback
 * 6. Unknown (flagged for review)
 *
 * Dependencies: DataLoader, AppState
 */

const AccountMapper = (function() {
  'use strict';

  // Default QBO codes for fallback by category
  const CATEGORY_DEFAULTS = {
    'Asset': 'CURASSET',           // Other current assets
    'Liability': 'CURLIAB',        // Current liabilities
    'Equity': 'RE',                // Retained earnings
    'Income': 'INC',               // Other primary income
    'COGS': 'COGS',                // Cost of goods sold
    'Expense': 'EXP'               // Other miscellaneous service cost
  };

  // Special account QBO codes
  const SPECIAL_ACCOUNT_CODES = {
    'ar': 'AR',    // Accounts Receivable
    'ap': 'AP',    // Accounts Payable
    're': 'RE'     // Retained Earnings
  };

  /**
   * Map all accounts
   * @returns {Array} Array of mapped account objects
   */
  function mapAllAccounts() {
    const uploadedData = AppState.getUploadedData();
    const accounts = uploadedData.parsedAccounts;
    const structure = AppState.getStructure();

    if (!accounts || accounts.length === 0) {
      return [];
    }

    // Filter out blank rows (no account name) BEFORE mapping
    const validAccounts = accounts.filter(account =>
      account.accountName && account.accountName.trim() !== ''
    );

    const mappedAccounts = validAccounts.map((account, index) => {
      return mapAccount(account, structure, index);
    });

    // Update state with results
    AppState.setMappingResults(mappedAccounts);

    return mappedAccounts;
  }

  /**
   * Map a single account
   */
  function mapAccount(account, structure, index) {
    // Get currency settings
    const setup = AppState.getSetup();
    const defaultCurrency = setup.multiCurrency ? setup.homeCurrency : null;

    const result = {
      index,
      accountNumber: account.accountNumber,
      accountName: account.accountName,
      balance: account.balance,
      debit: account.debit,
      credit: account.credit,
      gifi: account.gifi,
      // Mapping results
      qboCode: null,           // Detail type code (e.g., 'BCHQ')
      typeCode: null,          // Type code (e.g., 'BANK')
      typeName: null,          // Type display name for export
      detailTypeName: null,    // Detail type display name for export
      category: null,
      currency: defaultCurrency, // Currency code for MC COA (null if not MC)
      // Mapping metadata
      mappingSource: null,  // 'manual', 'special', 'gifi', 'keyword', 'digit', 'unknown'
      status: 'error',      // 'mapped', 'locked', 'review', 'error'
      // For manual overrides
      overrideTypeCode: null,
      overrideDetailTypeCode: null
    };

    // Validate required fields - only accountName is truly required
    // Account numbers are OPTIONAL (QBO doesn't require them)
    if (!account.accountName) {
      result.status = 'error';
      result.mappingSource = 'error';
      return result;
    }

    // Try mapping in priority order

    // 1. Check for special accounts (A/R, A/P, RE) - only if we have account numbers
    if (account.accountNumber) {
      const specialMapping = checkSpecialAccount(account.accountNumber, structure);
      if (specialMapping) {
        applyMapping(result, specialMapping.qboCode, 'special');
        result.status = 'locked'; // Special accounts are locked
        return result;
      }
    }

    // 2. Try GIFI lookup
    if (account.gifi) {
      const gifiCode = DataLoader.getGIFI(account.gifi);
      if (gifiCode) {
        applyMapping(result, gifiCode, 'gifi');
        result.status = 'mapped';
        return result;
      }
    }

    // 3. Determine category from first digit (if available)
    const firstDigit = account.firstDigit;
    let category = null;

    if (firstDigit) {
      category = structure.digitMapping[firstDigit];
      if (category === 'Skip') {
        result.status = 'review';
        result.mappingSource = 'unknown';
        return result;
      }
    }

    result.category = category;

    // 4. Try keyword matching (with or without category constraint)
    const keywordMatch = DataLoader.findKeywordMatch(account.accountName, category);
    if (keywordMatch) {
      applyMapping(result, keywordMatch.qboCode, 'keyword');
      result.status = 'mapped';
      return result;
    }

    // 5. Fall back to category default (if we have a category)
    if (category) {
      const defaultCode = CATEGORY_DEFAULTS[category];
      if (defaultCode) {
        applyMapping(result, defaultCode, 'digit');
        result.status = 'review'; // Defaults should be reviewed
        return result;
      }
    }

    // 6. Unknown - flag for review
    result.status = 'review';
    result.mappingSource = 'unknown';
    return result;
  }

  /**
   * Check if account is a special account (A/R, A/P, RE)
   */
  function checkSpecialAccount(accountNumber, structure) {
    const specialAccounts = structure.specialAccounts;

    if (specialAccounts.ar && accountNumber === specialAccounts.ar) {
      return { qboCode: SPECIAL_ACCOUNT_CODES.ar, type: 'ar' };
    }

    if (specialAccounts.ap && accountNumber === specialAccounts.ap) {
      return { qboCode: SPECIAL_ACCOUNT_CODES.ap, type: 'ap' };
    }

    if (specialAccounts.re && accountNumber === specialAccounts.re) {
      return { qboCode: SPECIAL_ACCOUNT_CODES.re, type: 're' };
    }

    return null;
  }

  /**
   * Apply a QBO code mapping to the result
   */
  function applyMapping(result, qboCode, source) {
    const lang = AppState.getLanguage();
    const detailType = DataLoader.getDetailTypeByCode(qboCode, lang);

    if (detailType) {
      result.qboCode = qboCode;
      result.typeCode = detailType.type_code;
      result.typeName = getTypeNameByCode(detailType.type_code, lang);
      result.detailTypeName = detailType.name;
      result.category = detailType.category;
      result.mappingSource = source;
    } else {
      // Code not found in reference data
      result.qboCode = qboCode;
      result.mappingSource = source;
      result.status = 'review';
    }
  }

  /**
   * Get type display name from type code
   */
  function getTypeNameByCode(typeCode, lang) {
    const types = DataLoader.getAllTypes(lang);
    const type = types.find(t => t.id === typeCode);
    return type ? type.name : typeCode;
  }

  /**
   * Update a single account's mapping (manual override)
   */
  function updateAccountMapping(index, typeCode, detailTypeCode) {
    const results = AppState.getMappingResults();
    const account = results.accounts[index];

    if (!account) return null;

    const lang = AppState.getLanguage();

    // Update the mapping
    account.overrideTypeCode = typeCode;
    account.overrideDetailTypeCode = detailTypeCode;

    if (detailTypeCode) {
      const detailType = DataLoader.getDetailTypeByCode(detailTypeCode, lang);
      if (detailType) {
        account.qboCode = detailTypeCode;
        account.typeCode = detailType.type_code;
        account.typeName = getTypeNameByCode(detailType.type_code, lang);
        account.detailTypeName = detailType.name;
        account.category = detailType.category;
        account.mappingSource = 'manual';
        account.status = 'mapped';
      }
    } else if (typeCode) {
      // Type selected but no detail type yet
      account.typeCode = typeCode;
      account.typeName = getTypeNameByCode(typeCode, lang);
      account.category = DataLoader.getCategoryForType(typeCode);
      account.status = 'review';
    }

    // Update state
    AppState.updateAccountMapping(index, account);

    return account;
  }

  /**
   * Get mapping statistics
   */
  function getMappingStats() {
    const results = AppState.getMappingResults();
    const accounts = results.accounts;

    const stats = {
      total: accounts.length,
      byStatus: {
        mapped: 0,
        locked: 0,
        review: 0,
        error: 0
      },
      bySource: {
        manual: 0,
        special: 0,
        gifi: 0,
        keyword: 0,
        digit: 0,
        unknown: 0,
        error: 0
      },
      byCategory: {}
    };

    for (const account of accounts) {
      // Count by status
      stats.byStatus[account.status] = (stats.byStatus[account.status] || 0) + 1;

      // Count by source
      if (account.mappingSource) {
        stats.bySource[account.mappingSource] = (stats.bySource[account.mappingSource] || 0) + 1;
      }

      // Count by category
      if (account.category) {
        stats.byCategory[account.category] = (stats.byCategory[account.category] || 0) + 1;
      }
    }

    return stats;
  }

  /**
   * Get accounts filtered by status
   */
  function getAccountsByStatus(status) {
    const results = AppState.getMappingResults();
    return results.accounts.filter(a => a.status === status);
  }

  /**
   * Get accounts that need review
   */
  function getAccountsNeedingReview() {
    return getAccountsByStatus('review');
  }

  /**
   * Get accounts with errors
   */
  function getAccountsWithErrors() {
    return getAccountsByStatus('error');
  }

  /**
   * Check if all accounts are properly mapped (no errors or reviews)
   */
  function isFullyMapped() {
    const results = AppState.getMappingResults();
    return results.summary.errors === 0 && results.summary.needsReview === 0;
  }

  /**
   * Skip an account (mark it to be excluded from export)
   * @returns {Object} The updated account, or {error: 'reason'} if skip not allowed
   */
  function skipAccount(index) {
    const results = AppState.getMappingResults();
    const account = results.accounts[index];
    if (!account) return null;

    // Cannot skip accounts with non-zero balance (would unbalance the JE)
    if (account.balance !== 0) {
      return { error: 'cannot_skip_with_balance', account };
    }

    // Store original status so we can restore it
    if (!account.originalStatus) {
      account.originalStatus = account.status;
      account.originalMappingSource = account.mappingSource;
    }

    account.status = 'skip';
    account.mappingSource = 'manual';
    AppState.updateAccountMapping(index, account);
    return account;
  }

  /**
   * Unskip an account (restore its original mapping)
   */
  function unskipAccount(index) {
    const results = AppState.getMappingResults();
    const account = results.accounts[index];
    if (!account) return null;

    // Restore original status if we have it
    if (account.originalStatus) {
      account.status = account.originalStatus;
      account.mappingSource = account.originalMappingSource || 'unknown';
      delete account.originalStatus;
      delete account.originalMappingSource;
    } else {
      // If no original, re-map the account
      const uploadedData = AppState.getUploadedData();
      const structure = AppState.getStructure();

      // Find original parsed account
      const validAccounts = uploadedData.parsedAccounts.filter(a =>
        a.accountName && a.accountName.trim() !== ''
      );
      const originalAccount = validAccounts[index];

      if (originalAccount) {
        const remapped = mapAccount(originalAccount, structure, index);
        AppState.updateAccountMapping(index, remapped);
        return remapped;
      }
    }

    AppState.updateAccountMapping(index, account);
    return account;
  }

  /**
   * Get available types for a category
   */
  function getTypesForCategory(category) {
    const lang = AppState.getLanguage();
    return DataLoader.getTypesForCategory(category, lang);
  }

  /**
   * Get available detail types for a type
   */
  function getDetailTypesForType(typeCode) {
    const lang = AppState.getLanguage();
    return DataLoader.getDetailTypesForType(typeCode, lang);
  }

  /**
   * Get all types (for "show all" option in dropdown)
   */
  function getAllTypes() {
    const lang = AppState.getLanguage();
    return DataLoader.getAllTypes(lang);
  }

  // Public API
  return {
    mapAllAccounts,
    mapAccount,
    updateAccountMapping,
    skipAccount,
    unskipAccount,
    getMappingStats,
    getAccountsByStatus,
    getAccountsNeedingReview,
    getAccountsWithErrors,
    isFullyMapped,
    getTypesForCategory,
    getDetailTypesForType,
    getAllTypes
  };

})();

// Export for ES modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AccountMapper;
}
