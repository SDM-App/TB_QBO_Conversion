/**
 * Help Panel Module
 * Manages the collapsible help sidebar with bilingual, step-sensitive content loaded from Excel
 */

const HelpPanel = (function() {
  'use strict';

  // State
  let _isOpen = false;
  let _isLoaded = false;
  let _isLoading = false;
  let _currentTab = 'app'; // 'app' or 'qbo'
  let _currentStep = 1;

  // Content storage - keyed by step
  let _helpContent = {
    steps: {}, // { 1: { en: [], fr: [] }, 2: { en: [], fr: [] }, ... }
    qbo: { en: [], fr: [] }
  };

  // Default content used as fallback if Excel file not found
  const DEFAULT_CONTENT = {
    steps: {
      1: {
        en: [
          { key: 'title', content: 'Step 1: Upload & Setup' },
          { key: 'summary', content: 'Upload your trial balance file and configure basic settings.' }
        ],
        fr: [
          { key: 'title', content: 'Étape 1: Téléversement et configuration' },
          { key: 'summary', content: 'Téléversez votre fichier de balance de vérification et configurez les paramètres de base.' }
        ]
      },
      2: {
        en: [
          { key: 'title', content: 'Step 2: Column Mapping' },
          { key: 'summary', content: 'Map columns to identify account numbers, names, and amounts.' }
        ],
        fr: [
          { key: 'title', content: 'Étape 2: Mappage des colonnes' },
          { key: 'summary', content: 'Mappez les colonnes pour identifier les numéros de compte, noms et montants.' }
        ]
      },
      3: {
        en: [
          { key: 'title', content: 'Step 3: Account Categories' },
          { key: 'summary', content: 'Define how account numbers map to categories (Asset, Liability, etc.).' }
        ],
        fr: [
          { key: 'title', content: 'Étape 3: Catégories de comptes' },
          { key: 'summary', content: 'Définissez comment les numéros de compte correspondent aux catégories.' }
        ]
      },
      4: {
        en: [
          { key: 'title', content: 'Step 4: Verify Mappings' },
          { key: 'summary', content: 'Review and fix any accounts flagged for review.' }
        ],
        fr: [
          { key: 'title', content: 'Étape 4: Vérifier les mappages' },
          { key: 'summary', content: 'Examinez et corrigez les comptes signalés.' }
        ]
      },
      5: {
        en: [
          { key: 'title', content: 'Step 5: Special Accounts' },
          { key: 'summary', content: 'Identify special accounts (A/R, A/P, Retained Earnings).' }
        ],
        fr: [
          { key: 'title', content: 'Étape 5: Comptes spéciaux' },
          { key: 'summary', content: 'Identifiez les comptes spéciaux (A/R, A/P, Bénéfices non répartis).' }
        ]
      },
      6: {
        en: [
          { key: 'title', content: 'Step 6: Download' },
          { key: 'summary', content: 'Download the import files for QuickBooks Online.' }
        ],
        fr: [
          { key: 'title', content: 'Étape 6: Téléchargement' },
          { key: 'summary', content: 'Téléchargez les fichiers d\'importation.' }
        ]
      }
    },
    qbo: {
      en: [
        { key: 'title', content: 'Importing into QuickBooks Online' },
        { key: 'intro', content: 'Follow these steps to import your files into QuickBooks Online.' },
        { key: 'warning', content: '<strong>Important:</strong> Import the Chart of Accounts FIRST, then the Journal Entry.' }
      ],
      fr: [
        { key: 'title', content: 'Importation dans QuickBooks Online' },
        { key: 'intro', content: 'Suivez ces étapes pour importer vos fichiers dans QuickBooks Online.' },
        { key: 'warning', content: '<strong>Important:</strong> Importez le Plan comptable EN PREMIER, puis l\'Écriture de journal.' }
      ]
    }
  };

  // DOM elements (cached after init)
  let _panel = null;
  let _overlay = null;

  /**
   * Initialize the help panel
   */
  function init() {
    // Create panel HTML structure
    createPanelHTML();

    // Cache DOM references
    _panel = document.getElementById('help-panel');
    _overlay = document.getElementById('help-panel-overlay');

    // Set up event listeners
    setupEventListeners();

    // Listen for language changes from AppState
    AppState.on('langChange', () => {
      if (_isOpen) {
        renderContent();
      }
    });

    // Listen for step changes from AppState
    AppState.on('stepChange', ({ to }) => {
      _currentStep = to;
      if (_isOpen) {
        renderContent();
      }
    });

    // Get current step
    _currentStep = AppState.getCurrentStep() || 1;

    console.log('HelpPanel initialized');
  }

  /**
   * Create the help panel HTML structure
   */
  function createPanelHTML() {
    // Create overlay for mobile
    const overlay = document.createElement('div');
    overlay.id = 'help-panel-overlay';
    overlay.className = 'help-panel-overlay';
    document.body.appendChild(overlay);

    // Create panel
    const panel = document.createElement('div');
    panel.id = 'help-panel';
    panel.className = 'help-panel';
    panel.setAttribute('role', 'complementary');
    panel.setAttribute('aria-label', 'Help Panel');
    panel.innerHTML = `
      <div class="help-panel-header">
        <div class="help-panel-title">
          <svg class="help-panel-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span id="help-panel-title-text">Help</span>
        </div>
        <div class="help-panel-actions">
          <div class="help-panel-lang-toggle">
            <button class="help-panel-lang-btn" data-lang="en">EN</button>
            <button class="help-panel-lang-btn" data-lang="fr">FR</button>
          </div>
          <button class="help-panel-close" aria-label="Close help panel">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <div class="help-panel-tabs">
        <button class="help-panel-tab active" data-tab="app">
          <span data-string="help.tab.app">App Guide</span>
        </button>
        <button class="help-panel-tab" data-tab="qbo">
          <span data-string="help.tab.qbo">QBO Instructions</span>
        </button>
      </div>
      <div class="help-panel-content">
        <div class="help-panel-section active" data-section="app" id="help-section-app">
          <!-- Content loaded dynamically -->
        </div>
        <div class="help-panel-section" data-section="qbo" id="help-section-qbo">
          <!-- Content loaded dynamically -->
        </div>
      </div>
      <div class="help-panel-footer">
        <button class="help-panel-download-btn" id="help-download-pdf">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span data-string="help.downloadPdf">Download PDF</span>
        </button>
      </div>
    `;

    document.body.appendChild(panel);
  }

  /**
   * Set up event listeners
   */
  function setupEventListeners() {
    // Close button
    const closeBtn = _panel.querySelector('.help-panel-close');
    closeBtn.addEventListener('click', close);

    // Overlay click to close (mobile)
    _overlay.addEventListener('click', close);

    // Tab switching
    const tabs = _panel.querySelectorAll('.help-panel-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        switchTab(tabName);
      });
    });

    // Language toggle within panel
    const langBtns = _panel.querySelectorAll('.help-panel-lang-btn');
    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        AppState.setLanguage(lang);
        updateLangToggleUI();
      });
    });

    // PDF download
    const downloadBtn = document.getElementById('help-download-pdf');
    downloadBtn.addEventListener('click', downloadPDF);

    // Keyboard escape to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && _isOpen) {
        close();
      }
    });
  }

  /**
   * Open the help panel
   */
  async function open() {
    if (_isOpen) return;

    // Load content if not already loaded
    if (!_isLoaded && !_isLoading) {
      await loadContent();
    }

    _isOpen = true;
    _panel.classList.add('open');
    document.body.classList.add('help-panel-open');
    updateLangToggleUI();
    renderContent();

    // Update toggle button state
    const toggleBtn = document.getElementById('help-toggle-btn');
    if (toggleBtn) {
      toggleBtn.classList.add('active');
    }
  }

  /**
   * Close the help panel
   */
  function close() {
    if (!_isOpen) return;

    _isOpen = false;
    _panel.classList.remove('open');
    document.body.classList.remove('help-panel-open');

    // Update toggle button state
    const toggleBtn = document.getElementById('help-toggle-btn');
    if (toggleBtn) {
      toggleBtn.classList.remove('active');
    }
  }

  /**
   * Toggle the help panel
   */
  function toggle() {
    if (_isOpen) {
      close();
    } else {
      open();
    }
  }

  /**
   * Switch between tabs
   */
  function switchTab(tabName) {
    if (tabName === _currentTab) return;

    _currentTab = tabName;

    // Update tab buttons
    const tabs = _panel.querySelectorAll('.help-panel-tab');
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    // Update sections
    const sections = _panel.querySelectorAll('.help-panel-section');
    sections.forEach(section => {
      section.classList.toggle('active', section.dataset.section === tabName);
    });
  }

  /**
   * Update language toggle UI to reflect current language
   */
  function updateLangToggleUI() {
    const lang = AppState.getLanguage();
    const langBtns = _panel.querySelectorAll('.help-panel-lang-btn');
    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update title text
    const titleText = document.getElementById('help-panel-title-text');
    if (titleText) {
      titleText.textContent = lang === 'fr' ? 'Aide' : 'Help';
    }

    // Update tab labels
    const appTab = _panel.querySelector('[data-tab="app"] span');
    const qboTab = _panel.querySelector('[data-tab="qbo"] span');
    if (appTab) appTab.textContent = lang === 'fr' ? 'Guide de l\'app' : 'App Guide';
    if (qboTab) qboTab.textContent = lang === 'fr' ? 'Instructions QBO' : 'QBO Instructions';

    // Update download button
    const downloadSpan = _panel.querySelector('#help-download-pdf span');
    if (downloadSpan) downloadSpan.textContent = lang === 'fr' ? 'Télécharger PDF' : 'Download PDF';
  }

  /**
   * Load help content from Excel file
   */
  async function loadContent() {
    _isLoading = true;
    showLoadingState();

    try {
      const response = await fetch('data/help_content.xlsx');
      if (!response.ok) {
        throw new Error('Help content file not found');
      }

      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array', cellStyles: true, cellHTML: true });

      // Parse each step sheet (Step1, Step2, etc.)
      for (let step = 1; step <= 6; step++) {
        const sheetName = `Step${step}`;
        if (workbook.SheetNames.includes(sheetName)) {
          const sheet = workbook.Sheets[sheetName];
          _helpContent.steps[step] = parseHelpSheet(sheet);
        }
      }

      // Parse QBOInstructions sheet
      if (workbook.SheetNames.includes('QBOInstructions')) {
        const sheet = workbook.Sheets['QBOInstructions'];
        _helpContent.qbo = parseHelpSheet(sheet);
      }

      _isLoaded = true;
      console.log('Help content loaded successfully');

    } catch (error) {
      console.warn('Could not load help_content.xlsx, using default content:', error.message);
      // Use default content as fallback
      _helpContent = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
      _isLoaded = true;
    } finally {
      _isLoading = false;
    }
  }

  /**
   * Parse a help sheet from the workbook
   * Expected columns: Key, EN, FR
   */
  function parseHelpSheet(sheet) {
    const result = { en: [], fr: [] };

    // Get sheet data as array of arrays
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

    if (rows.length < 2) return result;

    // First row is header (Key, EN, FR)
    const header = rows[0].map(h => String(h).toLowerCase().trim());
    const keyIndex = header.indexOf('key');
    const enIndex = header.findIndex(h => h === 'en' || h === 'english');
    const frIndex = header.findIndex(h => h === 'fr' || h === 'french' || h === 'français');

    if (enIndex === -1 && frIndex === -1) {
      console.warn('No EN or FR columns found in help sheet');
      return result;
    }

    // Parse each row
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const key = keyIndex >= 0 ? String(row[keyIndex] || '').trim() : `row_${i}`;

      // Get cell references for rich text
      const enCellRef = XLSX.utils.encode_cell({ r: i, c: enIndex });
      const frCellRef = XLSX.utils.encode_cell({ r: i, c: frIndex });

      // Try to get rich text HTML, fallback to plain text
      const enContent = getCellHTML(sheet, enCellRef) || String(row[enIndex] || '');
      const frContent = getCellHTML(sheet, frCellRef) || String(row[frIndex] || '');

      if (enContent || frContent) {
        result.en.push({ key, content: enContent });
        result.fr.push({ key, content: frContent || enContent }); // Fallback to EN if FR missing
      }
    }

    return result;
  }

  /**
   * Get HTML content from a cell (for rich text support)
   */
  function getCellHTML(sheet, cellRef) {
    const cell = sheet[cellRef];
    if (!cell) return '';

    // If cell has HTML representation, use it
    if (cell.h) {
      return cell.h;
    }

    // If cell has rich text array
    if (cell.r && Array.isArray(cell.r)) {
      return cell.r.map(part => {
        let text = part.t || '';
        if (part.s) {
          // Apply styles
          if (part.s.bold) text = `<strong>${text}</strong>`;
          if (part.s.italic) text = `<em>${text}</em>`;
          if (part.s.underline) text = `<u>${text}</u>`;
        }
        return text;
      }).join('');
    }

    // Plain text - convert markdown-like syntax
    let text = cell.v !== undefined ? String(cell.v) : '';
    text = convertMarkdownToHTML(text);

    return text;
  }

  /**
   * Convert simple markdown-like syntax to HTML
   * Supports: **bold**, *italic*, [link](url), `code`
   */
  function convertMarkdownToHTML(text) {
    if (!text) return '';

    // Escape HTML first
    text = escapeHTML(text);

    // Bold: **text** or __text__
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');

    // Italic: *text* or _text_
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    text = text.replace(/_(.+?)_/g, '<em>$1</em>');

    // Links: [text](url)
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Code: `text`
    text = text.replace(/`(.+?)`/g, '<code>$1</code>');

    // Line breaks
    text = text.replace(/\n/g, '<br>');

    return text;
  }

  /**
   * Escape HTML special characters
   */
  function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Render content for current language, step, and tab
   */
  function renderContent() {
    const lang = AppState.getLanguage();

    // Render App Guide (step-specific content)
    const appSection = document.getElementById('help-section-app');
    if (appSection) {
      const stepContent = _helpContent.steps[_currentStep];
      if (stepContent && stepContent[lang]) {
        appSection.innerHTML = renderSectionContent(stepContent[lang]);
      } else {
        appSection.innerHTML = `<p class="text-muted">${lang === 'fr' ? 'Contenu non disponible pour cette étape.' : 'Content not available for this step.'}</p>`;
      }
    }

    // Render QBO Instructions (only on Step 6, otherwise show message)
    const qboSection = document.getElementById('help-section-qbo');
    if (qboSection) {
      if (_currentStep === 6) {
        qboSection.innerHTML = renderSectionContent(_helpContent.qbo[lang]);
      } else {
        qboSection.innerHTML = `
          <div class="help-panel-not-available">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>${lang === 'fr' ? 'Les instructions QBO seront disponibles à l\'étape 6 (Téléchargement).' : 'QBO instructions will be available at Step 6 (Download).'}</p>
          </div>
        `;
      }
    }
  }

  /**
   * Render content items to HTML
   */
  function renderSectionContent(items) {
    if (!items || items.length === 0) {
      const lang = AppState.getLanguage();
      return `<p class="text-muted">${lang === 'fr' ? 'Contenu non disponible.' : 'Content not available.'}</p>`;
    }

    let html = '';

    items.forEach(item => {
      const key = item.key.toLowerCase();
      const content = item.content;

      if (!content.trim()) return;

      // Determine type based on key prefix
      if (key === 'title' || key.endsWith('_title') || key.startsWith('h1')) {
        html += `<h3>${content}</h3>`;
      } else if (key === 'summary') {
        html += `<p class="help-summary">${content}</p>`;
      } else if (key.includes('warning')) {
        html += `
          <div class="help-warning">
            <div class="help-warning-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              ${AppState.getLanguage() === 'fr' ? 'Important' : 'Important'}
            </div>
            <p>${content}</p>
          </div>
        `;
      } else if (key.includes('flag')) {
        html += `
          <div class="help-tip">
            <div class="help-tip-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                <line x1="4" y1="22" x2="4" y2="15"></line>
              </svg>
              ${AppState.getLanguage() === 'fr' ? 'Note' : 'Note'}
            </div>
            <p>${content}</p>
          </div>
        `;
      } else if (key.includes('error_')) {
        // Error items from QBO section
        html += `<div class="help-error-item"><p>${content}</p></div>`;
      } else {
        // Regular paragraph with bullet if it looks like a list item
        if (content.match(/^[\d]+\.\s/) || content.startsWith('- ')) {
          html += `<p class="help-list-item">${content}</p>`;
        } else {
          html += `<p>${content}</p>`;
        }
      }
    });

    return html || '<p class="text-muted">No content available.</p>';
  }

  /**
   * Show loading state in panel
   */
  function showLoadingState() {
    const sections = _panel.querySelectorAll('.help-panel-section');
    sections.forEach(section => {
      section.innerHTML = `
        <div class="help-panel-loading">
          <div class="spinner"></div>
          <p>Loading help content...</p>
        </div>
      `;
    });
  }

  /**
   * Show error state in panel
   */
  function showErrorState(message) {
    const sections = _panel.querySelectorAll('.help-panel-section');
    sections.forEach(section => {
      section.innerHTML = `
        <div class="help-panel-error">
          <svg class="help-panel-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p>Failed to load help content.</p>
          <p class="text-sm">${escapeHTML(message)}</p>
        </div>
      `;
    });
  }

  /**
   * Download help content as PDF using jsPDF
   */
  async function downloadPDF() {
    const lang = AppState.getLanguage();

    // Check if jsPDF is loaded
    if (typeof jspdf === 'undefined' && typeof jsPDF === 'undefined') {
      alert(lang === 'fr'
        ? 'Erreur: La bibliothèque PDF n\'est pas chargée.'
        : 'Error: PDF library not loaded.');
      return;
    }

    const { jsPDF } = window.jspdf || { jsPDF: window.jsPDF };

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      let yPos = margin;

      // Helper function to add text with word wrap
      function addText(text, fontSize, isBold = false, color = [0, 0, 0]) {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        doc.setTextColor(...color);

        const lines = doc.splitTextToSize(stripHTML(text), contentWidth);

        lines.forEach(line => {
          if (yPos + 10 > pageHeight - margin) {
            doc.addPage();
            yPos = margin;
          }
          doc.text(line, margin, yPos);
          yPos += fontSize * 0.5;
        });

        yPos += 4; // Add spacing after paragraph
      }

      // Helper to strip HTML tags
      function stripHTML(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
      }

      // Title
      const title = lang === 'fr'
        ? 'Guide - Outil d\'importation de balance de vérification'
        : 'Guide - Trial Balance Import Tool';
      addText(title, 18, true, [35, 108, 255]);
      yPos += 5;

      // Add all steps content
      for (let step = 1; step <= 6; step++) {
        const stepContent = _helpContent.steps[step];
        if (stepContent && stepContent[lang]) {
          stepContent[lang].forEach(item => {
            if (item.content.trim()) {
              const isTitle = item.key === 'title' || item.key.endsWith('_title');
              addText(item.content, isTitle ? 12 : 10, isTitle);
            }
          });
          yPos += 5;
        }
      }

      // Add page break before QBO section
      doc.addPage();
      yPos = margin;

      // QBO Instructions section
      addText(lang === 'fr' ? 'Instructions QuickBooks Online' : 'QuickBooks Online Instructions', 14, true);
      yPos += 2;

      const qboContent = _helpContent.qbo[lang] || [];
      qboContent.forEach(item => {
        if (item.content.trim()) {
          const isTitle = item.key === 'title' || item.key.endsWith('_title');
          addText(item.content, isTitle ? 12 : 10, isTitle);
        }
      });

      // Add footer to all pages
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(
          `${lang === 'fr' ? 'Page' : 'Page'} ${i} / ${totalPages}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
      }

      // Save the PDF
      const filename = lang === 'fr'
        ? 'Guide_Importation_TB.pdf'
        : 'TB_Import_Guide.pdf';
      doc.save(filename);

    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert(lang === 'fr'
        ? 'Erreur lors de la génération du PDF.'
        : 'Error generating PDF.');
    }
  }

  /**
   * Check if panel is currently open
   */
  function isOpen() {
    return _isOpen;
  }

  // Public API
  return {
    init,
    open,
    close,
    toggle,
    isOpen
  };

})();

// Export for ES modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HelpPanel;
}
