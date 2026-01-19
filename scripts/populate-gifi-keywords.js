/**
 * Script to populate GIFI and Keywords sheets in reference_data.xlsx
 * from the existing JS data files
 *
 * Run with: node scripts/populate-gifi-keywords.js
 */

const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// Read the existing reference_data.xlsx
const refDataPath = path.join(__dirname, '..', 'data', 'reference_data.xlsx');
const wb = XLSX.readFile(refDataPath);

// ============================================
// GIFI DATA - extracted from data_gifi.js
// ============================================
// We need to read the JS file and parse the data
const gifiJsPath = path.join(__dirname, '..', 'data', 'data_gifi.js');
const gifiJsContent = fs.readFileSync(gifiJsPath, 'utf8');

// Extract the GIFI_MAP object using regex (since we can't import ES modules easily)
const gifiMatch = gifiJsContent.match(/const GIFI_MAP = ({[\s\S]*?});/);
if (!gifiMatch) {
  console.error('Could not parse GIFI_MAP from data_gifi.js');
  process.exit(1);
}

// Evaluate the object (safe since we control the source file)
let GIFI_MAP;
eval('GIFI_MAP = ' + gifiMatch[1]);

// Convert to array format for Excel
const gifiRows = Object.entries(GIFI_MAP).map(([gifi, data]) => ({
  GIFI: gifi,
  Description_EN: data.description || '',
  Description_FR: '', // User will need to provide French translations
  QBO_Code: data.qboCode || ''
}));

console.log(`Parsed ${gifiRows.length} GIFI entries`);

// ============================================
// KEYWORDS DATA - extracted from data_keywords.js
// ============================================
const keywordsJsPath = path.join(__dirname, '..', 'data', 'data_keywords.js');
const keywordsJsContent = fs.readFileSync(keywordsJsPath, 'utf8');

// Extract the KEYWORDS object
const keywordsMatch = keywordsJsContent.match(/const KEYWORDS = ({[\s\S]*?});/);
if (!keywordsMatch) {
  console.error('Could not parse KEYWORDS from data_keywords.js');
  process.exit(1);
}

let KEYWORDS;
eval('KEYWORDS = ' + keywordsMatch[1]);

// Flatten the keywords object into rows
const keywordRows = [];
let nullCount = 0;

for (const [category, keywords] of Object.entries(KEYWORDS)) {
  for (const kw of keywords) {
    if (kw.qboCode === null) {
      nullCount++;
      // Skip entries with null qboCode or mark them
      keywordRows.push({
        Keyword: kw.keyword,
        Category: category,
        Priority: kw.priority,
        QBO_Code: 'NEEDS_REVIEW' // Mark for review
      });
    } else {
      keywordRows.push({
        Keyword: kw.keyword,
        Category: category,
        Priority: kw.priority,
        QBO_Code: kw.qboCode
      });
    }
  }
}

console.log(`Parsed ${keywordRows.length} Keywords entries (${nullCount} with null QBO_Code marked as NEEDS_REVIEW)`);

// ============================================
// Update the workbook
// ============================================

// Remove old GIFI sheet and add new one
const gifiSheetIndex = wb.SheetNames.indexOf('GIFI');
if (gifiSheetIndex > -1) {
  delete wb.Sheets['GIFI'];
  wb.SheetNames.splice(gifiSheetIndex, 1);
}
const wsGIFI = XLSX.utils.json_to_sheet(gifiRows);
XLSX.utils.book_append_sheet(wb, wsGIFI, 'GIFI');

// Remove old Keywords sheet and add new one
const kwSheetIndex = wb.SheetNames.indexOf('Keywords');
if (kwSheetIndex > -1) {
  delete wb.Sheets['Keywords'];
  wb.SheetNames.splice(kwSheetIndex, 1);
}
const wsKeywords = XLSX.utils.json_to_sheet(keywordRows);
XLSX.utils.book_append_sheet(wb, wsKeywords, 'Keywords');

// Write the updated file
XLSX.writeFile(wb, refDataPath);

console.log('');
console.log(`Updated: ${refDataPath}`);
console.log('');
console.log('Summary:');
console.log(`  - GIFI: ${gifiRows.length} rows (Description_FR column needs translation)`);
console.log(`  - Keywords: ${keywordRows.length} rows (${nullCount} marked NEEDS_REVIEW)`);
console.log('');
console.log('Next steps:');
console.log('  1. Open reference_data.xlsx in Excel');
console.log('  2. Add French translations to GIFI Description_FR column');
console.log('  3. Fix keywords marked "NEEDS_REVIEW" in QBO_Code column');
