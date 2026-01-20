/**
 * UI Strings for bilingual support (English/French)
 */
const UI_STRINGS = {
  'app.title': { en: 'Trial Balance Import Tool', fr: 'Outil d\'importation de balance de vérification' },
  'app.subtitle': { en: 'QuickBooks Online Import Converter', fr: 'Convertisseur d\'importation QuickBooks Online' },
  'app.footer': { en: 'Trial Balance Import Tool • Version 1.0', fr: 'Outil d\'importation de balance de vérification • Version 1.0' },

  // Step names
  'step.1.name': { en: 'Setup', fr: 'Configuration' },
  'step.2.name': { en: 'Structure', fr: 'Structure' },
  'step.3.name': { en: 'Upload', fr: 'Téléverser' },
  'step.4.name': { en: 'Verify', fr: 'Vérifier' },
  'step.5.name': { en: 'Special', fr: 'Spéciaux' },
  'step.6.name': { en: 'Download', fr: 'Télécharger' },

  // Step 1 - Setup
  'step.1.title': { en: 'Trial Balance Setup', fr: 'Configuration de la balance de vérification' },
  'step.1.description': { en: 'Enter basic information about your trial balance data', fr: 'Entrez les informations de base sur votre balance de vérification' },
  'step.1.date.label': { en: 'Trial Balance Date', fr: 'Date de la balance de vérification' },
  'step.1.date.help': { en: 'The "As of" date for your trial balance', fr: 'La date "Au" de votre balance de vérification' },
  'step.1.acctLength.label': { en: 'Account Number Length', fr: 'Longueur du numéro de compte' },
  'step.1.acctLength.help': { en: 'How many digits are in your account numbers?', fr: 'Combien de chiffres contiennent vos numéros de compte?' },

  // Step 2 - Structure
  'step.2.title': { en: 'Chart of Accounts Structure', fr: 'Structure du plan comptable' },
  'step.2.description': { en: 'Define how your account numbers map to account types', fr: 'Définissez comment vos numéros de compte correspondent aux types de comptes' },
  'step.2.digitMapping.title': { en: 'First Digit Mapping', fr: 'Mappage du premier chiffre' },
  'step.2.digitMapping.description': { en: 'What category does each first digit represent?', fr: 'Quelle catégorie représente chaque premier chiffre?' },
  'step.2.specialAccounts.title': { en: 'Special Accounts', fr: 'Comptes spéciaux' },
  'step.2.specialAccounts.description': { en: 'Enter account numbers for these special accounts (if they exist)', fr: 'Entrez les numéros de compte pour ces comptes spéciaux (s\'ils existent)' },
  'step.2.ar.label': { en: 'Accounts Receivable (A/R)', fr: 'Comptes clients (A/R)' },
  'step.2.ap.label': { en: 'Accounts Payable (A/P)', fr: 'Comptes fournisseurs (A/P)' },
  'step.2.re.label': { en: 'Retained Earnings', fr: 'Bénéfices non répartis' },

  // Step 3 - Upload
  'step.3.title': { en: 'Upload Trial Balance Data', fr: 'Téléversez les données de la balance de vérification' },
  'step.3.description': { en: 'Upload your trial balance file or paste the data', fr: 'Téléversez votre fichier de balance de vérification ou collez les données' },
  'step.3.dropzone.text': { en: 'Drag and drop your file here', fr: 'Glissez et déposez votre fichier ici' },
  'step.3.dropzone.subtext': { en: 'or click to browse (Excel or CSV)', fr: 'ou cliquez pour parcourir (Excel ou CSV)' },
  'step.3.paste.label': { en: 'Or paste from clipboard', fr: 'Ou collez depuis le presse-papiers' },
  'step.3.columnMapping.title': { en: 'Column Mapping', fr: 'Mappage des colonnes' },
  'step.3.preview.title': { en: 'Data Preview', fr: 'Aperçu des données' },

  // Step 4 - Verify
  'step.4.title': { en: 'Verify Account Mapping', fr: 'Vérifier le mappage des comptes' },
  'step.4.description': { en: 'Review and correct the automatic account type assignments', fr: 'Examinez et corrigez les attributions automatiques de types de comptes' },
  'step.4.summary.mapped': { en: 'Mapped', fr: 'Mappés' },
  'step.4.summary.review': { en: 'Need Review', fr: 'À vérifier' },
  'step.4.summary.errors': { en: 'Errors', fr: 'Erreurs' },
  'step.4.filter.all': { en: 'Show All', fr: 'Afficher tout' },
  'step.4.filter.review': { en: 'Show Review', fr: 'Afficher à vérifier' },
  'step.4.filter.errors': { en: 'Show Errors', fr: 'Afficher erreurs' },

  // Step 5 - Special Accounts
  'step.5.title': { en: 'Special Accounts', fr: 'Comptes spéciaux' },
  'step.5.description': { en: 'Select the accounts that serve special purposes in QuickBooks', fr: 'Sélectionnez les comptes ayant des fonctions spéciales dans QuickBooks' },
  'step.5.ar.label': { en: 'Accounts Receivable (A/R)', fr: 'Comptes clients (A/R)' },
  'step.5.ar.help': { en: 'Used for customer invoices and payments', fr: 'Utilisé pour les factures et paiements clients' },
  'step.5.ap.label': { en: 'Accounts Payable (A/P)', fr: 'Comptes fournisseurs (A/P)' },
  'step.5.ap.help': { en: 'Used for vendor bills and payments', fr: 'Utilisé pour les factures et paiements fournisseurs' },
  'step.5.re.label': { en: 'Retained Earnings', fr: 'Bénéfices non répartis' },
  'step.5.re.help': { en: 'Accumulated profits from prior periods', fr: 'Bénéfices accumulés des périodes antérieures' },
  'step.5.none': { en: 'None / Not Applicable', fr: 'Aucun / Non applicable' },
  'step.5.info': { en: 'These accounts have special behavior in QuickBooks. If you don\'t have these accounts, select "None".', fr: 'Ces comptes ont un comportement spécial dans QuickBooks. Si vous n\'avez pas ces comptes, sélectionnez "Aucun".' },

  // Step 5 - A/R multiple/single
  'step.5.ar.none': { en: 'No A/R accounts found in your trial balance', fr: 'Aucun compte client trouvé dans votre balance de vérification' },
  'step.5.ar.multiple.question': { en: 'Do you want multiple A/R accounts?', fr: 'Voulez-vous plusieurs comptes clients?' },
  'step.5.ar.multiple.yes': { en: 'Yes, keep all as A/R', fr: 'Oui, garder tous comme A/R' },
  'step.5.ar.multiple.no': { en: 'No, select one', fr: 'Non, sélectionner un seul' },
  'step.5.ar.fallback': { en: 'Other accounts will be remapped to {type}', fr: 'Les autres comptes seront remappés vers {type}' },

  // Step 5 - A/P multiple/single
  'step.5.ap.none': { en: 'No A/P accounts found in your trial balance', fr: 'Aucun compte fournisseur trouvé dans votre balance de vérification' },
  'step.5.ap.multiple.question': { en: 'Do you want multiple A/P accounts?', fr: 'Voulez-vous plusieurs comptes fournisseurs?' },
  'step.5.ap.multiple.yes': { en: 'Yes, keep all as A/P', fr: 'Oui, garder tous comme A/P' },
  'step.5.ap.multiple.no': { en: 'No, select one', fr: 'Non, sélectionner un seul' },
  'step.5.ap.fallback': { en: 'Other accounts will be remapped to {type}', fr: 'Les autres comptes seront remappés vers {type}' },

  // Step 5 - RE (always single)
  'step.5.re.none': { en: 'No Retained Earnings accounts found in your trial balance', fr: 'Aucun compte de bénéfices non répartis trouvé dans votre balance de vérification' },
  'step.5.re.warning': { en: 'Only one account can be Retained Earnings in QuickBooks. Select which one:', fr: 'Un seul compte peut être Bénéfices non répartis dans QuickBooks. Sélectionnez lequel:' },
  'step.5.re.fallback': { en: 'Other accounts will be remapped to {type}', fr: 'Les autres comptes seront remappés vers {type}' },

  // Step 6 - Download
  'step.6.title': { en: 'Download Import Files', fr: 'Télécharger les fichiers d\'importation' },
  'step.6.description': { en: 'Your files are ready to download and import into QuickBooks Online', fr: 'Vos fichiers sont prêts à être téléchargés et importés dans QuickBooks Online' },
  'step.6.summary.title': { en: 'Import Summary', fr: 'Résumé de l\'importation' },
  'step.6.coa.title': { en: 'Chart of Accounts', fr: 'Plan comptable' },
  'step.6.coa.button': { en: 'Download COA_IMPORT.xlsx', fr: 'Télécharger COA_IMPORT.xlsx' },
  'step.6.je.title': { en: 'Opening Balance Journal Entry', fr: 'Écriture de journal d\'ouverture' },
  'step.6.je.button': { en: 'Download JE_IMPORT.csv', fr: 'Télécharger JE_IMPORT.csv' },

  // Buttons
  'btn.next': { en: 'Next', fr: 'Suivant' },
  'btn.back': { en: 'Back', fr: 'Retour' },
  'btn.cancel': { en: 'Cancel', fr: 'Annuler' },
  'btn.save': { en: 'Save', fr: 'Enregistrer' },
  'btn.download': { en: 'Download', fr: 'Télécharger' },
  'btn.startOver': { en: 'Start Over', fr: 'Recommencer' },

  // Validation messages
  'validation.required': { en: 'This field is required', fr: 'Ce champ est requis' },
  'validation.invalidDate': { en: 'Please enter a valid date', fr: 'Veuillez entrer une date valide' },
  'validation.futureDate': { en: 'Date cannot be in the future', fr: 'La date ne peut pas être dans le futur' },
  'validation.invalidAcctNum': { en: 'Invalid account number format', fr: 'Format de numéro de compte invalide' },
  'validation.noFile': { en: 'Please upload a file or paste data', fr: 'Veuillez téléverser un fichier ou coller des données' },
  'validation.unresolved': { en: 'Please resolve all flagged accounts', fr: 'Veuillez résoudre tous les comptes signalés' },

  // Table headers
  'table.acctNum': { en: 'Account #', fr: 'N° de compte' },
  'table.acctName': { en: 'Account Name', fr: 'Nom du compte' },
  'table.debit': { en: 'Debit', fr: 'Débit' },
  'table.credit': { en: 'Credit', fr: 'Crédit' },
  'table.type': { en: 'Type', fr: 'Type' },
  'table.detailType': { en: 'Detail Type', fr: 'Type détaillé' },
  'table.status': { en: 'Status', fr: 'Statut' },
  'table.gifi': { en: 'GIFI', fr: 'IGRF' },
  'table.skip': { en: 'Skip', fr: 'Ignorer' },

  // Categories
  'category.Asset': { en: 'Asset', fr: 'Actif' },
  'category.Liability': { en: 'Liability', fr: 'Passif' },
  'category.Equity': { en: 'Equity', fr: 'Capitaux propres' },
  'category.Income': { en: 'Income', fr: 'Revenus' },
  'category.COGS': { en: 'Cost of Goods Sold', fr: 'Coût des marchandises vendues' },
  'category.Expense': { en: 'Expense', fr: 'Dépenses' },
  'category.Skip': { en: 'Skip / Not Used', fr: 'Ignorer / Non utilisé' },

  // Errors
  'error.loadingData': { en: 'Error loading reference data', fr: 'Erreur lors du chargement des données de référence' },
  'error.parsingFile': { en: 'Error parsing file', fr: 'Erreur lors de l\'analyse du fichier' },
  'error.exportFailed': { en: 'Error generating export file', fr: 'Erreur lors de la génération du fichier d\'exportation' },

  // Parse options
  'parse.headerRow.title': { en: 'Select Header Row', fr: 'Sélectionner la ligne d\'en-tête' },
  'parse.headerRow.help': { en: 'Click the row that contains your column headers', fr: 'Cliquez sur la ligne contenant les en-têtes de colonnes' },

  // Multi-Currency
  'mc.toggle': { en: 'Multi-Currency Chart of Accounts', fr: 'Plan comptable multi-devises' },
  'mc.homeCurrency': { en: 'Home Currency', fr: 'Devise locale' },
  'mc.currency': { en: 'Currency', fr: 'Devise' },
  'table.currency': { en: 'Currency', fr: 'Devise' }
};
