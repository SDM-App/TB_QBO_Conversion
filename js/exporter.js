/**
 * Exporter Module
 * Generates COA_IMPORT.xlsx and JE_IMPORT.csv files for QuickBooks Online import
 *
 * Dependencies: SheetJS (XLSX), AppState, DataLoader
 */

const Exporter = (function() {
  'use strict';

  /**
   * Export Chart of Accounts (COA) to Excel
   * Format: ACCOUNT NUMBER, ACCOUNT NAME, TYPE, DETAIL TYPE
   */
  function exportCOA() {
    const results = AppState.getMappingResults();
    const accounts = results.accounts;
    const lang = AppState.getLanguage();

    if (accounts.length === 0) {
      alert(DataLoader.getString('error.noData', lang) || 'No data to export.');
      return;
    }

    // Build data array
    const data = [];

    // Header row (QBO expected headers)
    data.push(['ACCOUNT NUMBER', 'ACCOUNT NAME', 'TYPE', 'DETAIL TYPE']);

    // Account rows
    for (const account of accounts) {
      // Skip accounts with errors or marked as skip
      if (account.status === 'error' || account.status === 'skip') continue;

      // Get type and detail type names
      const typeName = account.typeName || '';
      const detailTypeName = account.detailTypeName || '';

      data.push([
        account.accountNumber,
        account.accountName,
        typeName,
        detailTypeName
      ]);
    }

    // Create workbook and worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Chart of Accounts');

    // Set column widths
    ws['!cols'] = [
      { wch: 15 },  // Account Number
      { wch: 40 },  // Account Name
      { wch: 25 },  // Type
      { wch: 30 }   // Detail Type
    ];

    // Download
    XLSX.writeFile(wb, 'COA_IMPORT.xlsx');
  }

  /**
   * Export Journal Entry (JE) to CSV
   * Format for QBO import
   */
  function exportJE() {
    const results = AppState.getMappingResults();
    const accounts = results.accounts;
    const setup = AppState.getSetup();
    const lang = AppState.getLanguage();

    if (accounts.length === 0) {
      alert(DataLoader.getString('error.noData', lang) || 'No data to export.');
      return;
    }

    // Format date as MM/DD/YYYY for QBO
    const date = setup.trialBalanceDate;
    if (!date) {
      alert(DataLoader.getString('error.noDate', lang) || 'Trial balance date not set.');
      return;
    }

    const dateStr = formatDateForQBO(date);

    // Build CSV data
    const rows = [];

    // Filter accounts with non-zero balances (exclude errors and skipped)
    const nonZeroAccounts = accounts.filter(a =>
      a.status !== 'error' && a.status !== 'skip' && a.balance !== 0
    );

    // Check if any AR/AP accounts exist (need Name column for QBO)
    const hasArAp = nonZeroAccounts.some(a => a.qboCode === 'AR' || a.qboCode === 'AP');

    // Header row (QBO JE import format)
    const header = [
      'Journal date',
      'Journal no.',
      'Memo/Description',
      'Account name',
      'Debits',
      'Credits'
    ];
    if (hasArAp) {
      header.push('Name');
    }
    rows.push(header);

    if (nonZeroAccounts.length === 0) {
      alert(DataLoader.getString('error.noBalances', lang) || 'No accounts with balances to export.');
      return;
    }

    // Calculate totals for validation
    let totalDebits = 0;
    let totalCredits = 0;

    // Journal number (use date-based)
    const journalNo = 'OB-' + date.getFullYear();

    // Add each account as a line
    for (const account of nonZeroAccounts) {
      const debit = account.balance > 0 ? Math.abs(account.balance) : '';
      const credit = account.balance < 0 ? Math.abs(account.balance) : '';

      if (debit) totalDebits += parseFloat(debit);
      if (credit) totalCredits += parseFloat(credit);

      // Format account name with number (e.g., "1000 Cash")
      const fullAccountName = account.accountNumber
        ? `${account.accountNumber} ${account.accountName}`
        : account.accountName;

      const row = [
        dateStr,
        journalNo,
        'Opening Balances',
        fullAccountName,
        debit ? formatNumber(debit) : '',
        credit ? formatNumber(credit) : ''
      ];
      if (hasArAp) {
        row.push(getNameForAccount(account));
      }
      rows.push(row);
    }

    // Check if balanced
    const difference = Math.abs(totalDebits - totalCredits);
    if (difference > 0.01) {
      const msg = lang === 'fr'
        ? `Attention: La balance n'est pas équilibrée. Différence: ${formatNumber(difference)}`
        : `Warning: Trial balance is not balanced. Difference: ${formatNumber(difference)}`;

      if (!confirm(msg + '\n\nContinue with export?')) {
        return;
      }
    }

    // Convert to CSV
    const csv = rows.map(row =>
      row.map(cell => escapeCSVCell(cell)).join(',')
    ).join('\r\n');

    // Download
    downloadFile('JE_IMPORT.csv', csv, 'text/csv');
  }

  /**
   * Get Name value for AR/AP accounts (required by QBO)
   * @param {Object} account - The account object
   * @returns {string} 'zCustomer' for AR, 'zVendor' for AP, empty string otherwise
   */
  function getNameForAccount(account) {
    if (account.qboCode === 'AR') return 'zCustomer';
    if (account.qboCode === 'AP') return 'zVendor';
    return '';
  }

  /**
   * Format date for QBO (MM/DD/YYYY)
   */
  function formatDateForQBO(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  /**
   * Format number with 2 decimal places
   */
  function formatNumber(num) {
    return parseFloat(num).toFixed(2);
  }

  /**
   * Escape a cell value for CSV
   */
  function escapeCSVCell(value) {
    if (value === null || value === undefined) {
      return '';
    }

    const str = String(value);

    // If contains comma, quote, or newline, wrap in quotes
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return '"' + str.replace(/"/g, '""') + '"';
    }

    return str;
  }

  /**
   * Download a file
   */
  function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  }

  /**
   * Get export summary for display
   */
  function getExportSummary() {
    const results = AppState.getMappingResults();
    const accounts = results.accounts;
    const setup = AppState.getSetup();

    // Count valid accounts (exclude errors and skipped)
    const validAccounts = accounts.filter(a => a.status !== 'error' && a.status !== 'skip');

    // Count accounts with balances
    const withBalances = accounts.filter(a =>
      a.status !== 'error' && a.status !== 'skip' && a.balance !== 0
    );

    // Calculate totals
    let totalDebits = 0;
    let totalCredits = 0;

    for (const account of accounts) {
      if (account.status === 'error' || account.status === 'skip') continue;
      if (account.balance > 0) {
        totalDebits += account.balance;
      } else if (account.balance < 0) {
        totalCredits += Math.abs(account.balance);
      }
    }

    const difference = totalDebits - totalCredits;

    return {
      date: setup.trialBalanceDate,
      totalAccounts: validAccounts.length,
      accountsWithBalances: withBalances.length,
      totalDebits,
      totalCredits,
      difference,
      isBalanced: Math.abs(difference) < 0.01
    };
  }

  /**
   * Preview COA data (for display in UI)
   */
  function previewCOA(maxRows = 10) {
    const results = AppState.getMappingResults();
    const accounts = results.accounts.filter(a => a.status !== 'error' && a.status !== 'skip');

    return {
      headers: ['Account #', 'Account Name', 'Type', 'Detail Type'],
      rows: accounts.slice(0, maxRows).map(a => [
        a.accountNumber,
        a.accountName,
        a.typeName || '-',
        a.detailTypeName || '-'
      ]),
      totalRows: accounts.length
    };
  }

  /**
   * Preview JE data (for display in UI)
   */
  function previewJE(maxRows = 10) {
    const results = AppState.getMappingResults();
    const setup = AppState.getSetup();

    const accounts = results.accounts.filter(a =>
      a.status !== 'error' && a.status !== 'skip' && a.balance !== 0
    );

    const dateStr = setup.trialBalanceDate
      ? formatDateForQBO(setup.trialBalanceDate)
      : '-';

    // Check if any AR/AP accounts exist (need Name column)
    const hasArAp = accounts.some(a => a.qboCode === 'AR' || a.qboCode === 'AP');

    const headers = ['Date', 'Description', 'Account Name', 'Debit', 'Credit'];
    if (hasArAp) {
      headers.push('Name');
    }

    const rows = accounts.slice(0, maxRows).map(a => {
      // Format account name with number (e.g., "1000 Cash")
      const fullAccountName = a.accountNumber
        ? `${a.accountNumber} ${a.accountName}`
        : a.accountName;

      const row = [
        dateStr,
        'Opening Balances',
        fullAccountName,
        a.balance > 0 ? formatNumber(a.balance) : '',
        a.balance < 0 ? formatNumber(Math.abs(a.balance)) : ''
      ];
      if (hasArAp) {
        row.push(getNameForAccount(a));
      }
      return row;
    });

    return {
      headers,
      rows,
      totalRows: accounts.length
    };
  }

  // Public API
  return {
    exportCOA,
    exportJE,
    getExportSummary,
    previewCOA,
    previewJE
  };

})();

// Export for ES modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Exporter;
}
