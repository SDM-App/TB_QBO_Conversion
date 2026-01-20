/**
 * Help Content Generator
 * Run this script in the browser console to generate help_content.xlsx
 *
 * Usage:
 *   - In browser: Load index.html, open console, paste this script and run generateHelpExcel()
 */

const HELP_CONTENT = {
  Step1: [
    { key: 'title', en: 'Step 1: Upload & Setup', fr: 'Étape 1: Téléversement et configuration' },
    { key: 'summary', en: 'Upload your trial balance file and configure basic settings. The date you enter will be used as the journal entry date for opening balances in QuickBooks.', fr: 'Téléversez votre fichier de balance de vérification et configurez les paramètres de base. La date que vous entrez sera utilisée comme date d\'écriture de journal pour les soldes d\'ouverture dans QuickBooks.' },

    { key: 'date_title', en: '**Trial Balance Date**', fr: '**Date de la balance de vérification**' },
    { key: 'date_1', en: 'This is the "As of" date for your trial balance (e.g., fiscal year end, month end)', fr: 'Il s\'agit de la date "Au" de votre balance de vérification (p. ex., fin d\'exercice, fin de mois)' },
    { key: 'date_2', en: 'QuickBooks will use this as the journal entry date for opening balances', fr: 'QuickBooks utilisera cette date comme date d\'écriture de journal pour les soldes d\'ouverture' },
    { key: 'date_3', en: 'The exported journal entry file will use MM/DD/YYYY date format for QBO compatibility', fr: 'Le fichier d\'écriture de journal exporté utilisera le format de date MM/JJ/AAAA pour la compatibilité QBO' },

    { key: 'file_title', en: '**File Format**', fr: '**Format de fichier**' },
    { key: 'file_1', en: '**Excel files:** .xlsx or .xls - if your workbook has multiple sheets, you\'ll be prompted to select which sheet contains your trial balance data', fr: '**Fichiers Excel:** .xlsx ou .xls - si votre classeur contient plusieurs feuilles, on vous demandera de sélectionner celle qui contient vos données de balance' },
    { key: 'file_2', en: '**CSV files:** .csv format', fr: '**Fichiers CSV:** format .csv' },
    { key: 'file_3', en: '**Paste:** You can paste data directly from Excel, Google Sheets, or any spreadsheet application', fr: '**Coller:** Vous pouvez coller les données directement depuis Excel, Google Sheets ou toute autre application de tableur' },
    { key: 'file_4', en: 'Your data should contain: Account names and amounts (account numbers are optional)', fr: 'Vos données doivent contenir: Noms de compte et montants (les numéros de compte sont optionnels)' },
    { key: 'file_5', en: 'Amounts can be in separate Debit/Credit columns OR a single column with +/- values', fr: 'Les montants peuvent être dans des colonnes Débit/Crédit séparées OU une seule colonne avec des valeurs +/-' },

    { key: 'issues_title', en: '**Common Issues**', fr: '**Problèmes courants**' },
    { key: 'issues_1', en: 'File won\'t upload: Ensure file is not open in Excel, try saving as .xlsx', fr: 'Le fichier ne se téléverse pas: Assurez-vous que le fichier n\'est pas ouvert dans Excel, essayez de l\'enregistrer en .xlsx' },
    { key: 'issues_2', en: 'Weird characters: Check file encoding if exporting from another system', fr: 'Caractères étranges: Vérifiez l\'encodage du fichier si vous exportez depuis un autre système' }
  ],

  Step2: [
    { key: 'title', en: 'Step 2: Column Mapping', fr: 'Étape 2: Mappage des colonnes' },
    { key: 'summary', en: 'Tell the tool which columns contain your data. Click the row that contains your column headers, then map each column to its purpose.', fr: 'Indiquez à l\'outil quelles colonnes contiennent vos données. Cliquez sur la ligne contenant vos en-têtes de colonnes, puis mappez chaque colonne à son usage.' },

    { key: 'header_title', en: '**Selecting the Header Row**', fr: '**Sélection de la ligne d\'en-tête**' },
    { key: 'header_1', en: 'The tool displays the first 10 rows of your data', fr: 'L\'outil affiche les 10 premières lignes de vos données' },
    { key: 'header_2', en: '**Click the row that contains your column headers** (e.g., "Account", "Name", "Debit", "Credit")', fr: '**Cliquez sur la ligne qui contient vos en-têtes de colonnes** (p. ex., "Compte", "Nom", "Débit", "Crédit")' },
    { key: 'header_3', en: 'Rows above your selection will be skipped during import', fr: 'Les lignes au-dessus de votre sélection seront ignorées lors de l\'importation' },

    { key: 'combined_title', en: '**Account Number & Name**', fr: '**Numéro et nom de compte**' },
    { key: 'combined_1', en: 'You can have separate columns for Account Number and Account Name', fr: 'Vous pouvez avoir des colonnes séparées pour le numéro de compte et le nom de compte' },
    { key: 'combined_2', en: 'OR you can have them combined in one column (e.g., "1000 · Cash" or "1000 - Cash")', fr: 'OU vous pouvez les avoir combinés dans une seule colonne (p. ex., "1000 · Encaisse" ou "1000 - Encaisse")' },
    { key: 'combined_3', en: 'If combined, check "Combined Column" and enter the delimiter that separates number from name', fr: 'Si combinés, cochez "Colonne combinée" et entrez le délimiteur qui sépare le numéro du nom' },
    { key: 'combined_4', en: '**Delimiter:** Enter the exact character(s) between number and name (e.g., " · " or " - ")', fr: '**Délimiteur:** Entrez le(s) caractère(s) exact(s) entre le numéro et le nom (p. ex., " · " ou " - ")' },
    { key: 'combined_5', en: 'If no delimiter is specified, the tool splits on the first space (e.g., "1000 Cash" → number: 1000, name: Cash)', fr: 'Si aucun délimiteur n\'est spécifié, l\'outil divise au premier espace (p. ex., "1000 Encaisse" → numéro: 1000, nom: Encaisse)' },

    { key: 'amount_title', en: '**Amount Format**', fr: '**Format des montants**' },
    { key: 'amount_1', en: '**Separate Debit/Credit:** Two columns - one for debits, one for credits (most common)', fr: '**Débit/Crédit séparés:** Deux colonnes - une pour les débits, une pour les crédits (le plus courant)' },
    { key: 'amount_2', en: '**Single Column (Balance):** One column with positive values for debits, negative for credits (or vice versa)', fr: '**Colonne unique (Solde):** Une colonne avec des valeurs positives pour les débits, négatives pour les crédits (ou vice versa)' },

    { key: 'columns_title', en: '**Column Assignment**', fr: '**Attribution des colonnes**' },
    { key: 'columns_1', en: '**Account Number:** (Optional) The column containing account numbers', fr: '**Numéro de compte:** (Optionnel) La colonne contenant les numéros de compte' },
    { key: 'columns_2', en: '**Account Name:** (Required) The column containing account names', fr: '**Nom de compte:** (Requis) La colonne contenant les noms de compte' },
    { key: 'columns_3', en: '**Debit/Credit:** Select columns for separate debit and credit amounts', fr: '**Débit/Crédit:** Sélectionnez les colonnes pour les montants débit et crédit séparés' },
    { key: 'columns_4', en: '**Balance:** Select this if amounts are in a single column (+/- format)', fr: '**Solde:** Sélectionnez ceci si les montants sont dans une seule colonne (format +/-)' },
    { key: 'columns_5', en: '**GIFI Code:** (Optional) Canadian tax reporting code', fr: '**Code IGRF:** (Optionnel) Code de déclaration fiscale canadien' },

    { key: 'note_title', en: '**Note**', fr: '**Remarque**' },
    { key: 'note_1', en: 'Rows with zero balance will be included in the import', fr: 'Les lignes avec un solde nul seront incluses dans l\'importation' },
    { key: 'note_2', en: 'Rows with no account name will be skipped', fr: 'Les lignes sans nom de compte seront ignorées' }
  ],

  Step3: [
    { key: 'title', en: 'Step 3: Account Categories', fr: 'Étape 3: Catégories de comptes' },
    { key: 'summary', en: 'Define how your account numbers map to the five main account categories. This determines the account type in QuickBooks.', fr: 'Définissez comment vos numéros de compte correspondent aux cinq principales catégories de comptes. Ceci détermine le type de compte dans QuickBooks.' },

    { key: 'mapping_title', en: '**First Digit Mapping**', fr: '**Mappage du premier chiffre**' },
    { key: 'mapping_intro', en: 'Most chart of accounts follow a pattern where the first digit indicates the category:', fr: 'La plupart des plans comptables suivent un modèle où le premier chiffre indique la catégorie:' },
    { key: 'mapping_1', en: '1xxx = Assets', fr: '1xxx = Actifs' },
    { key: 'mapping_2', en: '2xxx = Liabilities', fr: '2xxx = Passifs' },
    { key: 'mapping_3', en: '3xxx = Equity', fr: '3xxx = Capitaux propres' },
    { key: 'mapping_4', en: '4xxx = Income/Revenue', fr: '4xxx = Revenus' },
    { key: 'mapping_5', en: '5xxx-9xxx = Expenses', fr: '5xxx-9xxx = Dépenses' },
    { key: 'mapping_note', en: 'Adjust these mappings to match YOUR chart of accounts structure.', fr: 'Ajustez ces mappages pour correspondre à la structure de VOTRE plan comptable.' },

    { key: 'why_title', en: '**Why This Matters**', fr: '**Pourquoi c\'est important**' },
    { key: 'why_1', en: 'Correct categorization ensures your Balance Sheet and Income Statement are accurate', fr: 'Une catégorisation correcte garantit l\'exactitude de votre bilan et de votre état des résultats' },
    { key: 'why_2', en: 'QuickBooks uses these categories for financial reporting', fr: 'QuickBooks utilise ces catégories pour les rapports financiers' },
    { key: 'why_3', en: 'Incorrect mapping will cause accounts to appear in wrong sections of reports', fr: 'Un mappage incorrect fera apparaître les comptes dans les mauvaises sections des rapports' }
  ],

  Step4: [
    { key: 'title', en: 'Step 4: Verify Mappings', fr: 'Étape 4: Vérifier les mappages' },
    { key: 'summary', en: 'Review ALL account type assignments. The tool uses keyword matching to suggest QuickBooks account types - **ALL accounts should be reviewed, including those marked as "Mapped".**', fr: 'Examinez TOUTES les attributions de types de compte. L\'outil utilise la correspondance par mots-clés pour suggérer des types de comptes QuickBooks - **TOUS les comptes doivent être examinés, y compris ceux marqués comme "Mappé".**' },

    { key: 'keyword_title', en: '**Important - Keyword Matching**', fr: '**Important - Correspondance par mots-clés**' },
    { key: 'keyword_1', en: 'The tool uses a keyword library to automatically suggest account types based on account names', fr: 'L\'outil utilise une bibliothèque de mots-clés pour suggérer automatiquement des types de comptes basés sur les noms de compte' },
    { key: 'keyword_2', en: '**This is a SUGGESTION only** - the keyword library may not match your specific accounts correctly', fr: '**Ceci est une SUGGESTION uniquement** - la bibliothèque de mots-clés peut ne pas correspondre correctement à vos comptes spécifiques' },
    { key: 'keyword_3', en: '**ALL accounts should be reviewed** - even "Green/Mapped" accounts may have incorrect suggestions', fr: '**TOUS les comptes doivent être examinés** - même les comptes "Verts/Mappés" peuvent avoir des suggestions incorrectes' },

    { key: 'status_title', en: '**Status Indicators**', fr: '**Indicateurs de statut**' },
    { key: 'status_1', en: '**Green (Mapped):** Keyword match found - STILL REQUIRES YOUR REVIEW', fr: '**Vert (Mappé):** Correspondance trouvée - NÉCESSITE ENCORE VOTRE EXAMEN' },
    { key: 'status_2', en: '**Yellow (Review):** Multiple possible matches or low confidence - needs attention', fr: '**Jaune (À examiner):** Correspondances multiples possibles ou faible confiance - nécessite attention' },
    { key: 'status_3', en: '**Red (Error):** Could not determine account type - must be fixed before proceeding', fr: '**Rouge (Erreur):** Impossible de déterminer le type de compte - doit être corrigé avant de continuer' },

    { key: 'fix_title', en: '**How to Fix**', fr: '**Comment corriger**' },
    { key: 'fix_1', en: 'Click on any account to change its Type or Detail Type', fr: 'Cliquez sur n\'importe quel compte pour modifier son Type ou Type de détail' },
    { key: 'fix_2', en: 'Use the filter buttons to show only accounts that need review', fr: 'Utilisez les boutons de filtre pour afficher uniquement les comptes à examiner' },
    { key: 'fix_3', en: 'Changes are saved automatically', fr: 'Les modifications sont enregistrées automatiquement' },

    { key: 'multicurrency_title', en: '**Multi-Currency**', fr: '**Multi-devises**' },
    { key: 'multicurrency_flag', en: '[FLAG: NEEDS TESTING BEFORE FINALIZING THIS SECTION]', fr: '[INDICATEUR: NÉCESSITE DES TESTS AVANT DE FINALISER CETTE SECTION]' },
    { key: 'multicurrency_1', en: 'Enable this ONLY if you need to track transactions in multiple currencies in QuickBooks', fr: 'Activez ceci UNIQUEMENT si vous devez suivre des transactions dans plusieurs devises dans QuickBooks' },
    { key: 'multicurrency_2', en: 'Home Currency: Your primary operating currency (e.g., CAD for Canadian businesses)', fr: 'Devise principale: Votre devise d\'exploitation principale (p. ex., CAD pour les entreprises canadiennes)' },
    { key: 'multicurrency_3', en: 'If unsure, leave multi-currency disabled', fr: 'En cas de doute, laissez la multi-devises désactivée' }
  ],

  Step5: [
    { key: 'title', en: 'Step 5: Special Accounts', fr: 'Étape 5: Comptes spéciaux' },
    { key: 'summary', en: 'Identify accounts with special behavior in QuickBooks. These accounts have specific rules.', fr: 'Identifiez les comptes ayant un comportement spécial dans QuickBooks. Ces comptes ont des règles spécifiques.' },

    { key: 'ar_title', en: '**Accounts Receivable (A/R)**', fr: '**Comptes clients (A/R)**' },
    { key: 'ar_1', en: 'Used for customer invoices and payments', fr: 'Utilisés pour les factures et paiements clients' },
    { key: 'ar_2', en: 'QBO allows multiple A/R accounts, BUT unless they are different currencies, there is no way to control which A/R account is used for customer transactions', fr: 'QBO permet plusieurs comptes A/R, MAIS sauf s\'ils sont dans des devises différentes, il n\'y a aucun moyen de contrôler quel compte A/R est utilisé pour les transactions clients' },
    { key: 'ar_3', en: '**Best practice:** Use only ONE A/R account per currency', fr: '**Meilleure pratique:** Utilisez un seul compte A/R par devise' },
    { key: 'ar_4', en: 'If you have multiple A/R accounts, select which one should remain as A/R type', fr: 'Si vous avez plusieurs comptes A/R, sélectionnez lequel doit rester de type A/R' },

    { key: 'ap_title', en: '**Accounts Payable (A/P)**', fr: '**Comptes fournisseurs (A/P)**' },
    { key: 'ap_1', en: 'Used for vendor bills and payments', fr: 'Utilisés pour les factures et paiements fournisseurs' },
    { key: 'ap_2', en: 'QBO allows multiple A/P accounts, BUT unless they are different currencies, there is no way to control which A/P account is used for vendor transactions', fr: 'QBO permet plusieurs comptes A/P, MAIS sauf s\'ils sont dans des devises différentes, il n\'y a aucun moyen de contrôler quel compte A/P est utilisé pour les transactions fournisseurs' },
    { key: 'ap_3', en: '**Best practice:** Use only ONE A/P account per currency', fr: '**Meilleure pratique:** Utilisez un seul compte A/P par devise' },
    { key: 'ap_4', en: 'If you have multiple A/P accounts, select which one should remain as A/P type', fr: 'Si vous avez plusieurs comptes A/P, sélectionnez lequel doit rester de type A/P' },

    { key: 're_title', en: '**Retained Earnings**', fr: '**Bénéfices non répartis**' },
    { key: 're_1', en: 'QuickBooks can only have ONE Retained Earnings account', fr: 'QuickBooks ne peut avoir qu\'UN seul compte de Bénéfices non répartis' },
    { key: 're_2', en: 'QBO automatically creates an account called "Retained Earnings"', fr: 'QBO crée automatiquement un compte appelé "Bénéfices non répartis"' },
    { key: 're_3', en: '**Important:** If you want a different name or account number for Retained Earnings, you must **manually rename the "Retained Earnings" account in QBO BEFORE importing the Journal Entry**', fr: '**Important:** Si vous voulez un nom ou numéro de compte différent pour les Bénéfices non répartis, vous devez **renommer manuellement le compte "Bénéfices non répartis" dans QBO AVANT d\'importer l\'Écriture de journal**' },
    { key: 're_4', en: 'If you have multiple equity accounts for prior earnings, select which one should be Retained Earnings', fr: 'Si vous avez plusieurs comptes de capitaux propres pour les bénéfices antérieurs, sélectionnez lequel doit être les Bénéfices non répartis' },

    { key: 'nonselected_title', en: '**What happens to non-selected accounts?**', fr: '**Qu\'advient-il des comptes non sélectionnés?**' },
    { key: 'nonselected_1', en: 'Non-selected A/R accounts become "Other Current Assets"', fr: 'Les comptes A/R non sélectionnés deviennent "Autres actifs courants"' },
    { key: 'nonselected_2', en: 'Non-selected A/P accounts become "Other Current Liabilities"', fr: 'Les comptes A/P non sélectionnés deviennent "Autres passifs courants"' },
    { key: 'nonselected_3', en: 'Non-selected RE accounts become "Equity"', fr: 'Les comptes BNR non sélectionnés deviennent "Capitaux propres"' },

    { key: 'placeholder_title', en: '**Before Importing - Placeholder Setup**', fr: '**Avant l\'importation - Configuration des espaces réservés**' },
    { key: 'placeholder_intro', en: 'If your trial balance includes A/R or A/P accounts, you will need to create placeholder records in QBO BEFORE importing the journal entry:', fr: 'Si votre balance de vérification comprend des comptes A/R ou A/P, vous devrez créer des enregistrements d\'espace réservé dans QBO AVANT d\'importer l\'écriture de journal:' },
    { key: 'placeholder_1', en: 'Create a customer named **"zCustomer"** (for A/R accounts)', fr: 'Créez un client nommé **"zCustomer"** (pour les comptes A/R)' },
    { key: 'placeholder_2', en: 'Create a vendor named **"zVendor"** (for A/P accounts)', fr: 'Créez un fournisseur nommé **"zVendor"** (pour les comptes A/P)' },
    { key: 'placeholder_3', en: 'These placeholders allow the journal entry to post opening balances to A/R and A/P accounts.', fr: 'Ces espaces réservés permettent à l\'écriture de journal de comptabiliser les soldes d\'ouverture dans les comptes A/R et A/P.' }
  ],

  Step6: [
    { key: 'title', en: 'Step 6: Download', fr: 'Étape 6: Téléchargement' },
    { key: 'summary', en: 'Your import files are ready. Download both files and import them into QuickBooks Online.', fr: 'Vos fichiers d\'importation sont prêts. Téléchargez les deux fichiers et importez-les dans QuickBooks Online.' },

    { key: 'files_title', en: '**Two Files**', fr: '**Deux fichiers**' },
    { key: 'files_1', en: '**COA_IMPORT.xlsx** - Your Chart of Accounts', fr: '**COA_IMPORT.xlsx** - Votre plan comptable' },
    { key: 'files_2', en: '**JE_IMPORT.csv** - Opening Balance Journal Entry (uses MM/DD/YYYY date format)', fr: '**JE_IMPORT.csv** - Écriture de journal des soldes d\'ouverture (utilise le format de date MM/JJ/AAAA)' },

    { key: 'order_title', en: '**Import Order - IMPORTANT**', fr: '**Ordre d\'importation - IMPORTANT**' },
    { key: 'order_1', en: '1. Import the Chart of Accounts FIRST', fr: '1. Importez le plan comptable EN PREMIER' },
    { key: 'order_2', en: '2. THEN import the Journal Entry', fr: '2. ENSUITE importez l\'écriture de journal' },
    { key: 'order_3', en: 'The accounts must exist before you can post balances to them.', fr: 'Les comptes doivent exister avant de pouvoir y comptabiliser des soldes.' },

    { key: 'checklist_title', en: '**Before Importing - Checklist**', fr: '**Avant l\'importation - Liste de contrôle**' },
    { key: 'checklist_1', en: 'If you have A/R accounts: Create a customer named "zCustomer" in QBO', fr: 'Si vous avez des comptes A/R: Créez un client nommé "zCustomer" dans QBO' },
    { key: 'checklist_2', en: 'If you have A/P accounts: Create a vendor named "zVendor" in QBO', fr: 'Si vous avez des comptes A/P: Créez un fournisseur nommé "zVendor" dans QBO' },
    { key: 'checklist_3', en: 'If you want a custom name/number for Retained Earnings: Rename the QBO "Retained Earnings" account BEFORE importing JE', fr: 'Si vous voulez un nom/numéro personnalisé pour les Bénéfices non répartis: Renommez le compte "Bénéfices non répartis" de QBO AVANT d\'importer l\'EJ' },

    { key: 'next_title', en: '**Next Steps**', fr: '**Prochaines étapes**' },
    { key: 'next_1', en: 'See the "QBO Instructions" tab for detailed import steps.', fr: 'Consultez l\'onglet "Instructions QBO" pour les étapes d\'importation détaillées.' }
  ],

  QBOInstructions: [
    { key: 'title', en: 'Importing into QuickBooks Online', fr: 'Importation dans QuickBooks Online' },

    { key: 'setup_title', en: '**Before You Start - Setup Checklist**', fr: '**Avant de commencer - Liste de contrôle**' },

    { key: 'setup_ar_title', en: '**If your trial balance includes A/R accounts:**', fr: '**Si votre balance de vérification comprend des comptes A/R:**' },
    { key: 'setup_ar_1', en: '1. In QBO, go to **Sales > Customers**', fr: '1. Dans QBO, allez dans **Ventes > Clients**' },
    { key: 'setup_ar_2', en: '2. Click **New Customer**', fr: '2. Cliquez sur **Nouveau client**' },
    { key: 'setup_ar_3', en: '3. Create a customer named **"zCustomer"**', fr: '3. Créez un client nommé **"zCustomer"**' },
    { key: 'setup_ar_4', en: '4. This placeholder allows the journal entry to post opening balances to A/R', fr: '4. Cet espace réservé permet à l\'écriture de journal de comptabiliser les soldes d\'ouverture dans A/R' },

    { key: 'setup_ap_title', en: '**If your trial balance includes A/P accounts:**', fr: '**Si votre balance de vérification comprend des comptes A/P:**' },
    { key: 'setup_ap_1', en: '1. In QBO, go to **Expenses > Vendors**', fr: '1. Dans QBO, allez dans **Dépenses > Fournisseurs**' },
    { key: 'setup_ap_2', en: '2. Click **New Vendor**', fr: '2. Cliquez sur **Nouveau fournisseur**' },
    { key: 'setup_ap_3', en: '3. Create a vendor named **"zVendor"**', fr: '3. Créez un fournisseur nommé **"zVendor"**' },
    { key: 'setup_ap_4', en: '4. This placeholder allows the journal entry to post opening balances to A/P', fr: '4. Cet espace réservé permet à l\'écriture de journal de comptabiliser les soldes d\'ouverture dans A/P' },

    { key: 'setup_re_title', en: '**If you want a custom Retained Earnings account name:**', fr: '**Si vous voulez un nom personnalisé pour le compte Bénéfices non répartis:**' },
    { key: 'setup_re_1', en: '1. In QBO, go to **Settings > Chart of Accounts**', fr: '1. Dans QBO, allez dans **Paramètres > Plan comptable**' },
    { key: 'setup_re_2', en: '2. Find the account named "Retained Earnings" (QBO creates this automatically)', fr: '2. Trouvez le compte nommé "Bénéfices non répartis" (QBO le crée automatiquement)' },
    { key: 'setup_re_3', en: '3. Click **Edit** and change the name/number to match your desired account', fr: '3. Cliquez sur **Modifier** et changez le nom/numéro pour correspondre à votre compte souhaité' },
    { key: 'setup_re_4', en: '4. **Do this BEFORE importing the Journal Entry**', fr: '4. **Faites ceci AVANT d\'importer l\'Écriture de journal**' },

    { key: 'coa_title', en: '**Importing the Chart of Accounts**', fr: '**Importation du plan comptable**' },
    { key: 'coa_1', en: '1. Log into QuickBooks Online', fr: '1. Connectez-vous à QuickBooks Online' },
    { key: 'coa_2', en: '2. Click the **Settings** gear icon (top right)', fr: '2. Cliquez sur l\'icône **Paramètres** (engrenage, en haut à droite)' },
    { key: 'coa_3', en: '3. Select **Import Data**', fr: '3. Sélectionnez **Importer des données**' },
    { key: 'coa_4', en: '4. Choose **Chart of Accounts**', fr: '4. Choisissez **Plan comptable**' },
    { key: 'coa_5', en: '5. Click **Browse** and select **COA_IMPORT.xlsx**', fr: '5. Cliquez sur **Parcourir** et sélectionnez **COA_IMPORT.xlsx**' },
    { key: 'coa_6', en: '6. Review the column mapping - it should auto-detect: Account Type, Detail Type, Name, Number (if included)', fr: '6. Vérifiez le mappage des colonnes - il devrait détecter automatiquement: Type de compte, Type de détail, Nom, Numéro (si inclus)' },
    { key: 'coa_7', en: '7. Click **Import**', fr: '7. Cliquez sur **Importer**' },
    { key: 'coa_8', en: '8. Review any warnings or errors - fix if needed before proceeding', fr: '8. Examinez les avertissements ou erreurs - corrigez si nécessaire avant de continuer' },

    { key: 'je_title', en: '**Importing the Journal Entry**', fr: '**Importation de l\'écriture de journal**' },
    { key: 'je_warning', en: '**Important:** Complete the Chart of Accounts import first!', fr: '**Important:** Complétez d\'abord l\'importation du plan comptable!' },
    { key: 'je_1', en: '1. Return to **Settings > Import Data**', fr: '1. Retournez dans **Paramètres > Importer des données**' },
    { key: 'je_2', en: '2. Choose **Journal Entries**', fr: '2. Choisissez **Écritures de journal**' },
    { key: 'je_3', en: '3. Click **Browse** and select **JE_IMPORT.csv**', fr: '3. Cliquez sur **Parcourir** et sélectionnez **JE_IMPORT.csv**' },
    { key: 'je_4', en: '4. Review the column mapping: Journal Date, Journal No., Account, Debits, Credits, Name (for A/R and A/P lines)', fr: '4. Vérifiez le mappage des colonnes: Date du journal, No de journal, Compte, Débits, Crédits, Nom (pour les lignes A/R et A/P)' },
    { key: 'je_5', en: '5. Click **Import**', fr: '5. Cliquez sur **Importer**' },
    { key: 'je_6', en: '6. Review any errors - common issues below', fr: '6. Examinez les erreurs - problèmes courants ci-dessous' },

    { key: 'verify_title', en: '**Verifying the Import**', fr: '**Vérification de l\'importation**' },
    { key: 'verify_1', en: '1. Go to **Reports > Balance Sheet**', fr: '1. Allez dans **Rapports > Bilan**' },
    { key: 'verify_2', en: '2. Set the "As of" date to your trial balance date', fr: '2. Définissez la date "Au" sur la date de votre balance de vérification' },
    { key: 'verify_3', en: '3. Compare totals with your original trial balance: Total Assets, Total Liabilities, Total Equity should match', fr: '3. Comparez les totaux avec votre balance de vérification originale: Total des actifs, Total des passifs, Total des capitaux propres devraient correspondre' },
    { key: 'verify_4', en: '4. Verify: Total Assets = Total Liabilities + Total Equity', fr: '4. Vérifiez: Total des actifs = Total des passifs + Total des capitaux propres' },

    { key: 'verify_mismatch_title', en: '**If totals don\'t match:**', fr: '**Si les totaux ne correspondent pas:**' },
    { key: 'verify_mismatch_1', en: 'Check for accounts that were skipped or mapped incorrectly', fr: 'Vérifiez les comptes qui ont été ignorés ou mappés incorrectement' },
    { key: 'verify_mismatch_2', en: 'Check for rounding differences', fr: 'Vérifiez les différences d\'arrondi' },
    { key: 'verify_mismatch_3', en: 'Review the journal entry in QBO to see individual line items', fr: 'Examinez l\'écriture de journal dans QBO pour voir les lignes individuelles' },

    { key: 'errors_title', en: '**Common QBO Import Errors**', fr: '**Erreurs d\'importation QBO courantes**' },

    { key: 'error_notfound', en: '**"Account not found"** - The journal entry references an account that doesn\'t exist in QBO. Solution: Import the Chart of Accounts first, then retry the Journal Entry import.', fr: '**"Compte non trouvé"** - L\'écriture de journal fait référence à un compte qui n\'existe pas dans QBO. Solution: Importez d\'abord le plan comptable, puis réessayez l\'importation de l\'écriture de journal.' },

    { key: 'error_duplicate', en: '**"Duplicate account"** - An account with that name already exists in QBO. Solution: Either rename the account in your import file, or delete/merge the existing account in QBO.', fr: '**"Compte en double"** - Un compte portant ce nom existe déjà dans QBO. Solution: Renommez le compte dans votre fichier d\'importation, ou supprimez/fusionnez le compte existant dans QBO.' },

    { key: 'error_type', en: '**"Invalid account type"** - The account type in the import doesn\'t match QBO\'s expected types. Solution: Go back to Step 4 and verify account type mappings.', fr: '**"Type de compte invalide"** - Le type de compte dans l\'importation ne correspond pas aux types attendus par QBO. Solution: Retournez à l\'étape 4 et vérifiez les mappages de types de comptes.' },

    { key: 'error_name', en: '**"Name required" (for A/R or A/P lines)** - A/R lines require a Customer name, A/P lines require a Vendor name. Solution: Create "zCustomer" and/or "zVendor" in QBO as described in the setup checklist.', fr: '**"Nom requis" (pour les lignes A/R ou A/P)** - Les lignes A/R nécessitent un nom de Client, les lignes A/P nécessitent un nom de Fournisseur. Solution: Créez "zCustomer" et/ou "zVendor" dans QBO comme décrit dans la liste de contrôle de configuration.' },

    { key: 'error_balance', en: '**"Out of balance"** - Journal entry debits don\'t equal credits. Solution: Check your original trial balance - total debits should equal total credits.', fr: '**"Non équilibré"** - Les débits de l\'écriture de journal ne sont pas égaux aux crédits. Solution: Vérifiez votre balance de vérification originale - le total des débits devrait égaler le total des crédits.' },

    { key: 'error_date', en: '**"Invalid date format"** - The date format is not recognized. Solution: The JE_IMPORT.csv uses MM/DD/YYYY format - ensure your QBO regional settings accept this.', fr: '**"Format de date invalide"** - Le format de date n\'est pas reconnu. Solution: Le fichier JE_IMPORT.csv utilise le format MM/JJ/AAAA - assurez-vous que vos paramètres régionaux QBO acceptent ce format.' }
  ]
};

/**
 * Generate the help_content.xlsx file
 */
function generateHelpExcel() {
  // Check if XLSX is available
  if (typeof XLSX === 'undefined') {
    console.error('XLSX library not loaded. Please include SheetJS first.');
    return;
  }

  // Create workbook
  const wb = XLSX.utils.book_new();

  // Create sheets for each step
  const sheets = ['Step1', 'Step2', 'Step3', 'Step4', 'Step5', 'Step6', 'QBOInstructions'];

  sheets.forEach(sheetName => {
    const data = [['Key', 'EN', 'FR']];
    HELP_CONTENT[sheetName].forEach(row => {
      data.push([row.key, row.en, row.fr]);
    });

    const sheet = XLSX.utils.aoa_to_sheet(data);

    // Set column widths
    sheet['!cols'] = [
      { wch: 20 },  // Key
      { wch: 100 }, // EN
      { wch: 100 }  // FR
    ];

    XLSX.utils.book_append_sheet(wb, sheet, sheetName);
  });

  // Write file
  XLSX.writeFile(wb, 'help_content.xlsx');
  console.log('help_content.xlsx generated successfully!');
}

// For Node.js usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HELP_CONTENT, generateHelpExcel };
}

// Auto-run if in browser with XLSX available
if (typeof window !== 'undefined' && typeof XLSX !== 'undefined') {
  console.log('Help content generator loaded. Run generateHelpExcel() to create the file.');
}
