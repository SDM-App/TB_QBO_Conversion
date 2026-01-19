/**
 * Script to generate reference_data.xlsx from existing JS data files
 * Run with: node scripts/generate-reference-data.js
 * Requires: npm install xlsx
 */

const XLSX = require('xlsx');
const path = require('path');

// ============================================
// CATEGORIES
// ============================================
const categories = [
  { Category: 'Asset', Name_EN: 'Asset', Name_FR: 'Actif' },
  { Category: 'Liability', Name_EN: 'Liability', Name_FR: 'Passif' },
  { Category: 'Equity', Name_EN: 'Equity', Name_FR: 'Capitaux propres' },
  { Category: 'Income', Name_EN: 'Income', Name_FR: 'Revenus' },
  { Category: 'COGS', Name_EN: 'Cost of Goods Sold', Name_FR: 'Coût des marchandises vendues' },
  { Category: 'Expense', Name_EN: 'Expense', Name_FR: 'Dépenses' }
];

// ============================================
// TYPES (from spec Section 6.2)
// ============================================
const types = [
  // Asset Types
  { Type: 'Bank', Category: 'Asset', Name_EN: 'Bank', Name_FR: 'Banque' },
  { Type: 'Accounts receivable (A/R)', Category: 'Asset', Name_EN: 'Accounts receivable (A/R)', Name_FR: 'Comptes clients' },
  { Type: 'Current assets', Category: 'Asset', Name_EN: 'Current assets', Name_FR: 'Actifs à court terme' },
  { Type: 'Fixed assets', Category: 'Asset', Name_EN: 'Fixed assets', Name_FR: 'Immobilisations corporelles' },
  { Type: 'Other assets', Category: 'Asset', Name_EN: 'Other assets', Name_FR: 'Autres actifs' },
  // Liability Types
  { Type: 'Accounts payable (A/P)', Category: 'Liability', Name_EN: 'Accounts payable (A/P)', Name_FR: 'Comptes fournisseurs' },
  { Type: 'Credit Card', Category: 'Liability', Name_EN: 'Credit Card', Name_FR: 'Carte de crédit' },
  { Type: 'Current liabilities', Category: 'Liability', Name_EN: 'Current liabilities', Name_FR: 'Passifs à court terme' },
  { Type: 'Long-term liabilities', Category: 'Liability', Name_EN: 'Long-term liabilities', Name_FR: 'Passifs à long terme' },
  // Equity Types
  { Type: 'Equity', Category: 'Equity', Name_EN: 'Equity', Name_FR: 'Capitaux propres' },
  // Income Types
  { Type: 'Income', Category: 'Income', Name_EN: 'Income', Name_FR: 'Revenus' },
  { Type: 'Other income', Category: 'Income', Name_EN: 'Other income', Name_FR: 'Autres revenus' },
  // COGS Types
  { Type: 'Cost of Goods Sold', Category: 'COGS', Name_EN: 'Cost of Goods Sold', Name_FR: 'Coût des marchandises vendues' },
  // Expense Types
  { Type: 'Expenses', Category: 'Expense', Name_EN: 'Expenses', Name_FR: 'Dépenses' },
  { Type: 'Other Expense', Category: 'Expense', Name_EN: 'Other Expense', Name_FR: 'Autres dépenses' }
];

// ============================================
// DETAIL TYPES (from spec Section 6.2)
// ============================================
const detailTypes = [
  // Bank
  { Code: 'BCHQ', Type: 'Bank', Name_EN: 'Chequing', Name_FR: 'Compte chèques' },
  { Code: 'BSAV', Type: 'Bank', Name_EN: 'Savings', Name_FR: 'Épargne' },
  { Code: 'BMM', Type: 'Bank', Name_EN: 'Money Market', Name_FR: 'Marché monétaire' },
  { Code: 'BCASH', Type: 'Bank', Name_EN: 'Cash on hand', Name_FR: 'Encaisse' },
  { Code: 'BTRUST', Type: 'Bank', Name_EN: 'Trust account', Name_FR: 'Compte en fiducie' },
  { Code: 'BRT', Type: 'Bank', Name_EN: 'Rents Held in Trust', Name_FR: 'Loyers détenus en fiducie' },

  // Accounts receivable
  { Code: 'AR', Type: 'Accounts receivable (A/R)', Name_EN: 'Accounts Receivable (A/R)', Name_FR: 'Comptes clients' },

  // Current assets
  { Code: 'CURALLOWBAD', Type: 'Current assets', Name_EN: 'Allowance for bad debts', Name_FR: 'Provision pour créances douteuses' },
  { Code: 'CURDEVCOSTS', Type: 'Current assets', Name_EN: 'Development costs', Name_FR: 'Frais de développement' },
  { Code: 'CUREMPADVANCE', Type: 'Current assets', Name_EN: 'Employee cash advances', Name_FR: 'Avances aux employés' },
  { Code: 'CURINVEST', Type: 'Current assets', Name_EN: 'Investments - Other', Name_FR: 'Placements - Autres' },
  { Code: 'CUROFFICERLOAN', Type: 'Current assets', Name_EN: 'Loans to officers', Name_FR: 'Prêts aux dirigeants' },
  { Code: 'CUROTHERLOAN', Type: 'Current assets', Name_EN: 'Loans to others', Name_FR: 'Prêts à des tiers' },
  { Code: 'CURSHARELOAN', Type: 'Current assets', Name_EN: 'Loans to shareholders', Name_FR: 'Prêts aux actionnaires' },
  { Code: 'CURASSET', Type: 'Current assets', Name_EN: 'Other current assets', Name_FR: 'Autres actifs à court terme' },
  { Code: 'CURPREPAID', Type: 'Current assets', Name_EN: 'Prepaid expenses', Name_FR: 'Frais payés d\'avance' },
  { Code: 'CURRETAINAGE', Type: 'Current assets', Name_EN: 'Retainage', Name_FR: 'Retenue de garantie' },
  { Code: 'CURINVENTORY', Type: 'Current assets', Name_EN: 'Inventory', Name_FR: 'Stock' },
  { Code: 'CURUNDEPOSIT', Type: 'Current assets', Name_EN: 'Undeposited funds', Name_FR: 'Fonds non déposés' },

  // Fixed assets
  { Code: 'FABUILDING', Type: 'Fixed assets', Name_EN: 'Buildings', Name_FR: 'Bâtiments' },
  { Code: 'FAFURN', Type: 'Fixed assets', Name_EN: 'Furniture and fixtures', Name_FR: 'Mobilier et agencements' },
  { Code: 'FA', Type: 'Fixed assets', Name_EN: 'Land', Name_FR: 'Terrain' },
  { Code: 'FALEASEHOLD', Type: 'Fixed assets', Name_EN: 'Leasehold improvements', Name_FR: 'Améliorations locatives' },
  { Code: 'FAEQUIP', Type: 'Fixed assets', Name_EN: 'Machinery and equipment', Name_FR: 'Machines et équipements' },
  { Code: 'FAVEHICLE', Type: 'Fixed assets', Name_EN: 'Vehicles', Name_FR: 'Véhicules' },
  { Code: 'FAACCUMAMORT', Type: 'Fixed assets', Name_EN: 'Accumulated amortization', Name_FR: 'Amortissement cumulé' },
  { Code: 'FAACCUMDEPR', Type: 'Fixed assets', Name_EN: 'Accumulated depreciation', Name_FR: 'Dépréciation cumulée' },
  { Code: 'FAOTHER', Type: 'Fixed assets', Name_EN: 'Other fixed assets', Name_FR: 'Autres immobilisations' },

  // Other assets (Long-term)
  { Code: 'LTGOODWILL', Type: 'Other assets', Name_EN: 'Goodwill', Name_FR: 'Achalandage' },
  { Code: 'LTAINTANGIBLE', Type: 'Other assets', Name_EN: 'Intangible assets', Name_FR: 'Actifs incorporels' },
  { Code: 'LTALEASEBUYOUT', Type: 'Other assets', Name_EN: 'Lease buyout', Name_FR: 'Rachat de bail' },
  { Code: 'LTALICENSE', Type: 'Other assets', Name_EN: 'Licences', Name_FR: 'Licences' },
  { Code: 'LTAINVEST', Type: 'Other assets', Name_EN: 'Long-term investments', Name_FR: 'Placements à long terme' },
  { Code: 'LTAORGCOST', Type: 'Other assets', Name_EN: 'Organizational costs', Name_FR: 'Frais de constitution' },
  { Code: 'LTASECDEP', Type: 'Other assets', Name_EN: 'Security deposits', Name_FR: 'Dépôts de garantie' },
  { Code: 'LTA', Type: 'Other assets', Name_EN: 'Other long-term assets', Name_FR: 'Autres actifs à long terme' },
  { Code: 'LTAMORT', Type: 'Other assets', Name_EN: 'Accumulated amortization of other assets', Name_FR: 'Amortissement cumulé des autres actifs' },
  { Code: 'LTAVS', Type: 'Other assets', Name_EN: 'Available-for-sale financial assets', Name_FR: 'Actifs financiers disponibles à la vente' },
  { Code: 'LTAOTHINTANG', Type: 'Other assets', Name_EN: 'Other intangible assets', Name_FR: 'Autres actifs incorporels' },
  { Code: 'LTADEFTAX', Type: 'Other assets', Name_EN: 'Deferred tax', Name_FR: 'Impôt différé' },
  { Code: 'LTAPREPAY', Type: 'Other assets', Name_EN: 'Prepayments and accrued income', Name_FR: 'Charges payées d\'avance et revenus courus' },

  // Accounts payable
  { Code: 'AP', Type: 'Accounts payable (A/P)', Name_EN: 'Accounts Payable (A/P)', Name_FR: 'Comptes fournisseurs' },

  // Credit Card
  { Code: 'CC', Type: 'Credit Card', Name_EN: 'Credit Card', Name_FR: 'Carte de crédit' },

  // Current liabilities
  { Code: 'CURLIAB', Type: 'Current liabilities', Name_EN: 'Current liabilities', Name_FR: 'Passifs courants' },
  { Code: 'LIABINSURANCE', Type: 'Current liabilities', Name_EN: 'Insurance payable', Name_FR: 'Assurance à payer' },
  { Code: 'LIABPAYCLEAR', Type: 'Current liabilities', Name_EN: 'Payroll clearing', Name_FR: 'Compensation de paie' },
  { Code: 'LIABTRUST', Type: 'Current liabilities', Name_EN: 'Trust accounts - liabilities', Name_FR: 'Comptes en fiducie - passif' },
  { Code: 'LIABPREPAID', Type: 'Current liabilities', Name_EN: 'Prepaid expenses payable', Name_FR: 'Frais payés d\'avance à payer' },
  { Code: 'LIABSHTERMRELATED', Type: 'Current liabilities', Name_EN: 'Short term borrowings from related parties', Name_FR: 'Emprunts à court terme de parties liées' },
  { Code: 'LIABINTEREST', Type: 'Current liabilities', Name_EN: 'Interest payables', Name_FR: 'Intérêts à payer' },
  { Code: 'LIABLINECREDIT', Type: 'Current liabilities', Name_EN: 'Line of credit', Name_FR: 'Marge de crédit' },
  { Code: 'LIABRT', Type: 'Current liabilities', Name_EN: 'Rents in trust - liability', Name_FR: 'Loyers en fiducie - passif' },
  { Code: 'LIABPAYROLL', Type: 'Current liabilities', Name_EN: 'Payroll liabilities', Name_FR: 'Charges sociales à payer' },
  { Code: 'LIABLEASE', Type: 'Current liabilities', Name_EN: 'Current portion of obligations under finance leases', Name_FR: 'Partie courante des obligations en vertu de contrats de location-financement' },
  { Code: 'LIABEMPBEN', Type: 'Current liabilities', Name_EN: 'Current portion of employee benefits obligations', Name_FR: 'Partie courante des obligations liées aux avantages sociaux' },
  { Code: 'LIABWARRANTY', Type: 'Current liabilities', Name_EN: 'Provision for warranty obligations', Name_FR: 'Provision pour garanties' },
  { Code: 'LIABLOAN', Type: 'Current liabilities', Name_EN: 'Loan Payable', Name_FR: 'Emprunt à payer' },
  { Code: 'LIABTAX', Type: 'Current liabilities', Name_EN: 'Current tax liability', Name_FR: 'Impôt exigible' },

  // Long-term liabilities
  { Code: 'LTLIAB', Type: 'Long-term liabilities', Name_EN: 'Other long term liabilities', Name_FR: 'Autres passifs à long terme' },
  { Code: 'LTLDEFERINC', Type: 'Long-term liabilities', Name_EN: 'Accruals and deferred income', Name_FR: 'Charges à payer et revenus différés' },
  { Code: 'LTLNOTE', Type: 'Long-term liabilities', Name_EN: 'Notes payable', Name_FR: 'Effets à payer' },
  { Code: 'LTLSHNOTE', Type: 'Long-term liabilities', Name_EN: 'Shareholder notes payable', Name_FR: 'Effets à payer aux actionnaires' },
  { Code: 'LTLBORROW', Type: 'Long-term liabilities', Name_EN: 'Long term borrowings', Name_FR: 'Emprunts à long terme' },
  { Code: 'LTLEMPBEN', Type: 'Long-term liabilities', Name_EN: 'Long term employee benefit obligations', Name_FR: 'Obligations à long terme liées aux avantages sociaux' },
  { Code: 'LTLEASE', Type: 'Long-term liabilities', Name_EN: 'Obligations under finance leases', Name_FR: 'Obligations en vertu de contrats de location-financement' },
  { Code: 'LTLOAN', Type: 'Long-term liabilities', Name_EN: 'Bank loans', Name_FR: 'Emprunts bancaires' },

  // Equity
  { Code: 'EQACCUMAMORT', Type: 'Equity', Name_EN: 'Accumulated adjustment', Name_FR: 'Ajustement cumulé' },
  { Code: 'EQSTOCK', Type: 'Equity', Name_EN: 'Common stock', Name_FR: 'Actions ordinaires' },
  { Code: 'EQOBEQ', Type: 'Equity', Name_EN: 'Opening balance equity', Name_FR: 'Capitaux propres d\'ouverture' },
  { Code: 'EQOE', Type: 'Equity', Name_EN: 'Owner\'s equity', Name_FR: 'Capitaux du propriétaire' },
  { Code: 'EQSURPLUS', Type: 'Equity', Name_EN: 'Paid-in capital or surplus', Name_FR: 'Capital d\'apport ou surplus' },
  { Code: 'EQCONTRIBUTIONS', Type: 'Equity', Name_EN: 'Partner Contributions', Name_FR: 'Apports des associés' },
  { Code: 'EQDISTRIBUTIONS', Type: 'Equity', Name_EN: 'Partner Distributions', Name_FR: 'Distributions aux associés' },
  { Code: 'EQPARTNEREQUITY', Type: 'Equity', Name_EN: 'Partner\'s equity', Name_FR: 'Capitaux des associés' },
  { Code: 'EQPREFSTOCK', Type: 'Equity', Name_EN: 'Preferred Stock', Name_FR: 'Actions privilégiées' },
  { Code: 'RE', Type: 'Equity', Name_EN: 'Retained Earnings', Name_FR: 'Bénéfices non répartis' },
  { Code: 'EQTREASSHARE', Type: 'Equity', Name_EN: 'Treasury shares', Name_FR: 'Actions autodétenues' },
  { Code: 'EQSHARECAP', Type: 'Equity', Name_EN: 'Share capital', Name_FR: 'Capital-actions' },

  // Income
  { Code: 'INCDISCOUNT', Type: 'Income', Name_EN: 'Discounts/refunds given', Name_FR: 'Remises/remboursements accordés' },
  { Code: 'INCNONPROFIT', Type: 'Income', Name_EN: 'Non-profit income', Name_FR: 'Revenus sans but lucratif' },
  { Code: 'INC', Type: 'Income', Name_EN: 'Other Primary Income', Name_FR: 'Autres revenus principaux' },
  { Code: 'INCPRODUCT', Type: 'Income', Name_EN: 'Sales of product income', Name_FR: 'Ventes de produits' },
  { Code: 'INCSERVICE', Type: 'Income', Name_EN: 'Service/Fee Income', Name_FR: 'Revenus de services/honoraires' },

  // Other income
  { Code: 'OIDIVIDEND', Type: 'Other income', Name_EN: 'Dividend income', Name_FR: 'Revenus de dividendes' },
  { Code: 'OIINTEREST', Type: 'Other income', Name_EN: 'Interest earned', Name_FR: 'Intérêts gagnés' },
  { Code: 'OIINVEST', Type: 'Other income', Name_EN: 'Other investment income', Name_FR: 'Autres revenus de placements' },
  { Code: 'OI', Type: 'Other income', Name_EN: 'Income', Name_FR: 'Revenus' },
  { Code: 'OIGAINLOSSFA', Type: 'Other income', Name_EN: 'Gain/loss on sale of fixed assets', Name_FR: 'Gain/perte sur cession d\'immobilisations' },
  { Code: 'OIGAINLOSSINVEST', Type: 'Other income', Name_EN: 'Gain/loss on sale of investments', Name_FR: 'Gain/perte sur cession de placements' },
  { Code: 'OITAXEXEMPTINTEREST', Type: 'Other income', Name_EN: 'Tax-exempt interest', Name_FR: 'Intérêts non imposables' },

  // Cost of Goods Sold
  { Code: 'COGS', Type: 'Cost of Goods Sold', Name_EN: 'Cost of goods sold', Name_FR: 'Coût des marchandises vendues' },
  { Code: 'COGSLAB', Type: 'Cost of Goods Sold', Name_EN: 'Cost of labour - COS', Name_FR: 'Coût de la main-d\'œuvre - CMV' },
  { Code: 'COGSEQUIPRENT', Type: 'Cost of Goods Sold', Name_EN: 'Equipment rental - COS', Name_FR: 'Location d\'équipement - CMV' },
  { Code: 'COGSSHIP', Type: 'Cost of Goods Sold', Name_EN: 'Shipping, freight and delivery - COS', Name_FR: 'Expédition, fret et livraison - CMV' },
  { Code: 'COGSCOS', Type: 'Cost of Goods Sold', Name_EN: 'Other costs of service - COS', Name_FR: 'Autres coûts de service - CMV' },
  { Code: 'COGSSUPPLY', Type: 'Cost of Goods Sold', Name_EN: 'Supplies and materials - COS', Name_FR: 'Fournitures et matériaux - CMV' },

  // Expenses
  { Code: 'EXPADVERTISING', Type: 'Expenses', Name_EN: 'Advertising/promotional', Name_FR: 'Publicité/promotion' },
  { Code: 'EXPAUTO', Type: 'Expenses', Name_EN: 'Auto', Name_FR: 'Automobile' },
  { Code: 'EXPBADDEBT', Type: 'Expenses', Name_EN: 'Bad debts', Name_FR: 'Créances irrécouvrables' },
  { Code: 'EXPBANKCHARGE', Type: 'Expenses', Name_EN: 'Bank charges', Name_FR: 'Frais bancaires' },
  { Code: 'EXPDONATION', Type: 'Expenses', Name_EN: 'Charitable contributions', Name_FR: 'Dons de bienfaisance' },
  { Code: 'EXPLAB', Type: 'Expenses', Name_EN: 'Cost of labour', Name_FR: 'Coût de la main-d\'œuvre' },
  { Code: 'EXPDUES', Type: 'Expenses', Name_EN: 'Dues and subscriptions', Name_FR: 'Cotisations et abonnements' },
  { Code: 'EXPDISTRIBUTION', Type: 'Expenses', Name_EN: 'Distribution costs', Name_FR: 'Frais de distribution' },
  { Code: 'EXPENTERTAIN', Type: 'Expenses', Name_EN: 'Entertainment', Name_FR: 'Divertissement' },
  { Code: 'EXPEQUIPRENT', Type: 'Expenses', Name_EN: 'Equipment rental', Name_FR: 'Location d\'équipement' },
  { Code: 'EXPSHIP', Type: 'Expenses', Name_EN: 'Shipping, Freight, and Delivery', Name_FR: 'Expédition, fret et livraison' },
  { Code: 'EXPINS', Type: 'Expenses', Name_EN: 'Insurance', Name_FR: 'Assurance' },
  { Code: 'EXPINTEREST', Type: 'Expenses', Name_EN: 'Interest paid', Name_FR: 'Intérêts payés' },
  { Code: 'EXPPROFESSIONAL', Type: 'Expenses', Name_EN: 'Legal and professional fees', Name_FR: 'Honoraires professionnels' },
  { Code: 'EXPMEAL', Type: 'Expenses', Name_EN: 'Meals and entertainment', Name_FR: 'Repas et divertissement' },
  { Code: 'EXPOFFICE', Type: 'Expenses', Name_EN: 'Office/General Administrative Expenses', Name_FR: 'Frais de bureau/admin.' },
  { Code: 'EXP', Type: 'Expenses', Name_EN: 'Other miscellaneous service cost', Name_FR: 'Autres frais de service divers' },
  { Code: 'EXPPAYROLL', Type: 'Expenses', Name_EN: 'Payroll expenses', Name_FR: 'Frais de paie' },
  { Code: 'EXPPROMOMEALS', Type: 'Expenses', Name_EN: 'Promotional meals', Name_FR: 'Repas promotionnels' },
  { Code: 'EXPRENT', Type: 'Expenses', Name_EN: 'Rent or lease of buildings', Name_FR: 'Loyer ou location de bâtiments' },
  { Code: 'EXPREPAIR', Type: 'Expenses', Name_EN: 'Repair and maintenance', Name_FR: 'Réparation et entretien' },
  { Code: 'EXPSUPPLY', Type: 'Expenses', Name_EN: 'Supplies', Name_FR: 'Fournitures' },
  { Code: 'EXPTAXES', Type: 'Expenses', Name_EN: 'Taxes paid', Name_FR: 'Impôts et taxes payés' },
  { Code: 'EXPTRAVEL', Type: 'Expenses', Name_EN: 'Travel', Name_FR: 'Voyage' },
  { Code: 'EXPTRAVELMEAL', Type: 'Expenses', Name_EN: 'Travel meals', Name_FR: 'Repas de voyage' },
  { Code: 'EXPUTILITIES', Type: 'Expenses', Name_EN: 'Utilities', Name_FR: 'Services publics' },

  // Other Expense
  { Code: 'OEAMORT', Type: 'Other Expense', Name_EN: 'Amortization', Name_FR: 'Amortissement' },
  { Code: 'OEDEPRECIATION', Type: 'Other Expense', Name_EN: 'Depreciation', Name_FR: 'Dépréciation' },
  { Code: 'OEEXCHANGE', Type: 'Other Expense', Name_EN: 'Exchange Gain or Loss', Name_FR: 'Gain ou perte de change' },
  { Code: 'OE', Type: 'Other Expense', Name_EN: 'Other miscellaneous expense', Name_FR: 'Autres dépenses diverses' },
  { Code: 'OEPENALTIES', Type: 'Other Expense', Name_EN: 'Penalties and settlements', Name_FR: 'Pénalités et règlements' }
];

// ============================================
// UI STRINGS (for the application interface)
// ============================================
const uiStrings = [
  // App Header & Footer
  { Key: 'app.title', English: 'TB Import Tool', French: 'Outil Import BV' },
  { Key: 'app.pageTitle', English: 'Trial Balance Import Tool', French: 'Outil d\'importation de balance de vérification' },
  { Key: 'app.subtitle', English: 'QuickBooks Online Import Converter', French: 'Convertisseur d\'importation QuickBooks Online' },
  { Key: 'app.footer', English: 'Trial Balance Import Tool \u2022 Version 1.0', French: 'Outil d\'importation de balance de vérification \u2022 Version 1.0' },

  // Confirmations
  { Key: 'confirm.startOver', English: 'Are you sure you want to start over? All data will be lost.', French: '\u00CAtes-vous s\u00FBr de vouloir recommencer? Toutes les donn\u00E9es seront perdues.' },

  // Step names (new flow: Upload -> Columns -> Categories -> Verify -> Download)
  { Key: 'step.1.name', English: 'Upload', French: 'Importer' },
  { Key: 'step.2.name', English: 'Columns', French: 'Colonnes' },
  { Key: 'step.3.name', English: 'Categories', French: 'Cat\u00E9gories' },
  { Key: 'step.4.name', English: 'Verify', French: 'V\u00E9rifier' },
  { Key: 'step.5.name', English: 'Download', French: 'T\u00E9l\u00E9charger' },

  // Step 1
  { Key: 'step.1.title', English: 'Trial Balance Setup', French: 'Configuration de la balance de vérification' },
  { Key: 'step.1.description', English: 'Enter basic information about your trial balance data', French: 'Entrez les informations de base sur votre balance de vérification' },
  { Key: 'step.1.date.label', English: 'Trial Balance Date', French: 'Date de la balance de vérification' },
  { Key: 'step.1.date.help', English: 'The "As of" date for your trial balance', French: 'La date "Au" de votre balance de vérification' },
  { Key: 'step.1.acctLength.label', English: 'Account Number Length', French: 'Longueur du numéro de compte' },
  { Key: 'step.1.acctLength.help', English: 'How many digits are in your account numbers?', French: 'Combien de chiffres contiennent vos numéros de compte?' },

  // Step 2
  { Key: 'step.2.title', English: 'Chart of Accounts Structure', French: 'Structure du plan comptable' },
  { Key: 'step.2.description', English: 'Define how your account numbers map to account types', French: 'Définissez comment vos numéros de compte correspondent aux types de comptes' },
  { Key: 'step.2.digitMapping.title', English: 'First Digit Mapping', French: 'Mappage du premier chiffre' },
  { Key: 'step.2.digitMapping.description', English: 'What category does each first digit represent?', French: 'Quelle catégorie représente chaque premier chiffre?' },
  { Key: 'step.2.specialAccounts.title', English: 'Special Accounts', French: 'Comptes spéciaux' },
  { Key: 'step.2.specialAccounts.description', English: 'Enter account numbers for these special accounts (if they exist)', French: 'Entrez les numéros de compte pour ces comptes spéciaux (s\'ils existent)' },
  { Key: 'step.2.ar.label', English: 'Accounts Receivable (A/R)', French: 'Comptes clients (A/R)' },
  { Key: 'step.2.ap.label', English: 'Accounts Payable (A/P)', French: 'Comptes fournisseurs (A/P)' },
  { Key: 'step.2.re.label', English: 'Retained Earnings', French: 'Bénéfices non répartis' },

  // Step 3
  { Key: 'step.3.title', English: 'Upload Trial Balance Data', French: 'Téléverser les données de la balance de vérification' },
  { Key: 'step.3.description', English: 'Upload your trial balance file or paste the data', French: 'Téléversez votre fichier de balance de vérification ou collez les données' },
  { Key: 'step.3.dropzone.text', English: 'Drag and drop your file here', French: 'Glissez et déposez votre fichier ici' },
  { Key: 'step.3.dropzone.subtext', English: 'or click to browse (Excel or CSV)', French: 'ou cliquez pour parcourir (Excel ou CSV)' },
  { Key: 'step.3.paste.label', English: 'Or paste from clipboard', French: 'Ou collez depuis le presse-papiers' },
  { Key: 'step.3.columnMapping.title', English: 'Column Mapping', French: 'Mappage des colonnes' },
  { Key: 'step.3.preview.title', English: 'Data Preview', French: 'Aperçu des données' },

  // Step 4
  { Key: 'step.4.title', English: 'Verify Account Mapping', French: 'Vérifier le mappage des comptes' },
  { Key: 'step.4.description', English: 'Review and correct the automatic account type assignments', French: 'Examinez et corrigez les attributions automatiques de types de comptes' },
  { Key: 'step.4.summary.mapped', English: 'Mapped', French: 'Mappés' },
  { Key: 'step.4.summary.review', English: 'Need Review', French: 'À vérifier' },
  { Key: 'step.4.summary.errors', English: 'Errors', French: 'Erreurs' },
  { Key: 'step.4.filter.all', English: 'Show All', French: 'Afficher tout' },
  { Key: 'step.4.filter.review', English: 'Show Review', French: 'Afficher à vérifier' },
  { Key: 'step.4.filter.errors', English: 'Show Errors', French: 'Afficher erreurs' },

  // Step 5
  { Key: 'step.5.title', English: 'Download Import Files', French: 'Télécharger les fichiers d\'importation' },
  { Key: 'step.5.description', English: 'Your files are ready to download and import into QuickBooks Online', French: 'Vos fichiers sont prêts à être téléchargés et importés dans QuickBooks Online' },
  { Key: 'step.5.summary.title', English: 'Import Summary', French: 'Résumé de l\'importation' },
  { Key: 'step.5.coa.title', English: 'Chart of Accounts', French: 'Plan comptable' },
  { Key: 'step.5.coa.button', English: 'Download COA_IMPORT.xlsx', French: 'Télécharger COA_IMPORT.xlsx' },
  { Key: 'step.5.je.title', English: 'Opening Balance Journal Entry', French: 'Écriture de journal d\'ouverture' },
  { Key: 'step.5.je.button', English: 'Download JE_IMPORT.csv', French: 'Télécharger JE_IMPORT.csv' },

  // Buttons
  { Key: 'btn.next', English: 'Next', French: 'Suivant' },
  { Key: 'btn.back', English: 'Back', French: 'Retour' },
  { Key: 'btn.cancel', English: 'Cancel', French: 'Annuler' },
  { Key: 'btn.save', English: 'Save', French: 'Enregistrer' },
  { Key: 'btn.download', English: 'Download', French: 'Télécharger' },
  { Key: 'btn.startOver', English: 'Start Over', French: 'Recommencer' },

  // Validation messages
  { Key: 'validation.required', English: 'This field is required', French: 'Ce champ est requis' },
  { Key: 'validation.invalidDate', English: 'Please enter a valid date', French: 'Veuillez entrer une date valide' },
  { Key: 'validation.futureDate', English: 'Date cannot be in the future', French: 'La date ne peut pas être dans le futur' },
  { Key: 'validation.invalidAcctNum', English: 'Invalid account number format', French: 'Format de numéro de compte invalide' },
  { Key: 'validation.noFile', English: 'Please upload a file or paste data', French: 'Veuillez téléverser un fichier ou coller des données' },
  { Key: 'validation.unresolved', English: 'Please resolve all flagged accounts', French: 'Veuillez résoudre tous les comptes signalés' },

  // Table headers
  { Key: 'table.acctNum', English: 'Account #', French: 'N° de compte' },
  { Key: 'table.acctName', English: 'Account Name', French: 'Nom du compte' },
  { Key: 'table.debit', English: 'Debit', French: 'Débit' },
  { Key: 'table.credit', English: 'Credit', French: 'Crédit' },
  { Key: 'table.type', English: 'Type', French: 'Type' },
  { Key: 'table.detailType', English: 'Detail Type', French: 'Type détaillé' },
  { Key: 'table.status', English: 'Status', French: 'Statut' },
  { Key: 'table.gifi', English: 'GIFI', French: 'IGRF' },

  // Category names (for dropdowns)
  { Key: 'category.Asset', English: 'Asset', French: 'Actif' },
  { Key: 'category.Liability', English: 'Liability', French: 'Passif' },
  { Key: 'category.Equity', English: 'Equity', French: 'Capitaux propres' },
  { Key: 'category.Income', English: 'Income', French: 'Revenus' },
  { Key: 'category.COGS', English: 'Cost of Goods Sold', French: 'Coût des marchandises vendues' },
  { Key: 'category.Expense', English: 'Expense', French: 'Dépenses' },
  { Key: 'category.Skip', English: 'Skip / Not Used', French: 'Ignorer / Non utilisé' },

  // Errors
  { Key: 'error.loadingData', English: 'Error loading reference data', French: 'Erreur lors du chargement des données de référence' },
  { Key: 'error.parsingFile', English: 'Error parsing file', French: 'Erreur lors de l\'analyse du fichier' },
  { Key: 'error.exportFailed', English: 'Error generating export file', French: 'Erreur lors de la génération du fichier d\'exportation' }
];

// ============================================
// Create Workbook
// ============================================
const wb = XLSX.utils.book_new();

// Add Categories sheet
const wsCategories = XLSX.utils.json_to_sheet(categories);
XLSX.utils.book_append_sheet(wb, wsCategories, 'Categories');

// Add Types sheet
const wsTypes = XLSX.utils.json_to_sheet(types);
XLSX.utils.book_append_sheet(wb, wsTypes, 'Types');

// Add DetailTypes sheet
const wsDetailTypes = XLSX.utils.json_to_sheet(detailTypes);
XLSX.utils.book_append_sheet(wb, wsDetailTypes, 'DetailTypes');

// Add UI_Strings sheet
const wsUIStrings = XLSX.utils.json_to_sheet(uiStrings);
XLSX.utils.book_append_sheet(wb, wsUIStrings, 'UI_Strings');

// Note: GIFI and Keywords sheets will need to be populated separately
// as they have 748+ and 150+ rows respectively

// Add placeholder GIFI sheet
const gifiPlaceholder = [
  { GIFI: '1000', Description_EN: 'Cash and deposits', Description_FR: '[TRANSLATE]', QBO_Code: 'BCHQ' },
  { GIFI: '(748 rows - populate from your data)', Description_EN: '', Description_FR: '', QBO_Code: '' }
];
const wsGIFI = XLSX.utils.json_to_sheet(gifiPlaceholder);
XLSX.utils.book_append_sheet(wb, wsGIFI, 'GIFI');

// Add placeholder Keywords sheet
const keywordsPlaceholder = [
  { Keyword: 'BANK', Category: 'Asset', Priority: 2, QBO_Code: 'BCHQ' },
  { Keyword: '(~150 rows - populate from data_keywords.js)', Category: '', Priority: '', QBO_Code: '' }
];
const wsKeywords = XLSX.utils.json_to_sheet(keywordsPlaceholder);
XLSX.utils.book_append_sheet(wb, wsKeywords, 'Keywords');

// Write the file
const outputPath = path.join(__dirname, '..', 'data', 'reference_data.xlsx');
XLSX.writeFile(wb, outputPath);

console.log(`Created: ${outputPath}`);
console.log('');
console.log('Sheets created:');
console.log(`  - Categories: ${categories.length} rows`);
console.log(`  - Types: ${types.length} rows`);
console.log(`  - DetailTypes: ${detailTypes.length} rows`);
console.log(`  - UI_Strings: ${uiStrings.length} rows`);
console.log(`  - GIFI: PLACEHOLDER - needs population from your data`);
console.log(`  - Keywords: PLACEHOLDER - needs population from data_keywords.js`);
console.log('');
console.log('Next steps:');
console.log('  1. Open reference_data.xlsx in Excel');
console.log('  2. Populate the GIFI sheet with your 748 GIFI mappings + French translations');
console.log('  3. Populate the Keywords sheet from data_keywords.js (fix null QBO_Codes)');
