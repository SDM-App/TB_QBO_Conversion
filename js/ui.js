/**
 * UI Rendering Module
 * Renders wizard steps and handles UI updates
 */

const UI = (function() {
  'use strict';

  // DOM element references
  let _mainEl = null;
  let _stepperEl = null;

  /**
   * Initialize the UI
   */
  function init() {
    _mainEl = document.querySelector('.app-main');
    _stepperEl = document.querySelector('.wizard-stepper');

    if (!_mainEl) {
      console.error('Could not find .app-main element');
      return;
    }

    // Initial render
    render();
  }

  /**
   * Render the current step
   */
  function render() {
    const step = AppState.getCurrentStep();
    renderStep(step);
    renderStepper(step);
  }

  /**
   * Render the stepper (progress indicator)
   */
  function renderStepper(currentStep) {
    const lang = AppState.getLanguage();
    const steps = [
      { num: 1, key: 'step.1.name' },
      { num: 2, key: 'step.2.name' },
      { num: 3, key: 'step.3.name' },
      { num: 4, key: 'step.4.name' },
      { num: 5, key: 'step.5.name' },
      { num: 6, key: 'step.6.name' }
    ];

    let html = '';
    steps.forEach((step, index) => {
      const isActive = step.num === currentStep;
      const isComplete = step.num < currentStep;
      const statusClass = isActive ? 'active' : (isComplete ? 'complete' : '');

      html += `
        <div class="step ${statusClass}" data-step="${step.num}">
          <div class="step-number">${isComplete ? '✓' : step.num}</div>
          <div class="step-label">${DataLoader.getString(step.key, lang)}</div>
        </div>
      `;

      // Add connector between steps (except after last)
      if (index < steps.length - 1) {
        const connectorComplete = step.num < currentStep ? 'complete' : '';
        html += `<div class="step-connector ${connectorComplete}"></div>`;
      }
    });

    if (_stepperEl) {
      _stepperEl.innerHTML = html;

      // Add click handlers for step navigation
      _stepperEl.querySelectorAll('.step').forEach(stepEl => {
        stepEl.addEventListener('click', () => {
          const stepNum = parseInt(stepEl.dataset.step, 10);
          App.goToStep(stepNum);
        });
        stepEl.style.cursor = 'pointer';
      });
    }
  }

  /**
   * Render a specific step
   */
  function renderStep(step) {
    if (!_mainEl) return;

    const lang = AppState.getLanguage();

    switch (step) {
      case 1:
        renderStep1(lang);
        break;
      case 2:
        renderStep2(lang);
        break;
      case 3:
        renderStep3(lang);
        break;
      case 4:
        renderStep4(lang);
        break;
      case 5:
        renderStep5(lang);
        break;
      case 6:
        renderStep6(lang);
        break;
      default:
        _mainEl.innerHTML = '<p>Unknown step</p>';
    }
  }

  /**
   * Get common navigation buttons HTML
   */
  function getNavButtons(step, lang, canProceed = true) {
    const backBtn = step > 1
      ? `<button class="btn btn-secondary" id="btn-back">
           ${DataLoader.getString('btn.back', lang)}
         </button>`
      : '';

    const nextBtn = step < 6
      ? `<button class="btn btn-primary" id="btn-next" ${canProceed ? '' : 'disabled'}>
           ${DataLoader.getString('btn.next', lang)}
         </button>`
      : '';

    return { backBtn, nextBtn };
  }

  /**
   * Attach navigation button handlers
   */
  function attachNavHandlers() {
    const backBtn = document.getElementById('btn-back');
    const nextBtn = document.getElementById('btn-next');

    if (backBtn) {
      backBtn.addEventListener('click', () => AppState.prevStep());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (AppState.canProceed()) {
          AppState.nextStep();
        }
      });
    }
  }

  /**
   * Update the Next button state
   */
  function updateNextButton() {
    const nextBtn = document.getElementById('btn-next');
    if (nextBtn) {
      nextBtn.disabled = !AppState.canProceed();
    }
  }

  // ============================================
  // STEP 1: Upload & Parse Configuration (NEW FLOW)
  // ============================================

  function renderStep1(lang) {
    const setup = AppState.getSetup();
    const uploadedData = AppState.getUploadedData();
    const nav = getNavButtons(1, lang, AppState.canProceed());

    // Format date for input
    const dateValue = setup.trialBalanceDate
      ? setup.trialBalanceDate.toISOString().split('T')[0]
      : '';

    // Check if we have uploaded data (check both rawData and originalRawData)
    const hasData = (uploadedData.rawData && uploadedData.rawData.length > 0) ||
                    (uploadedData.originalRawData && uploadedData.originalRawData.length > 0) ||
                    (uploadedData.fileName && uploadedData.fileName !== '');

    _mainEl.innerHTML = `
      <div class="wizard">
        <div class="wizard-header">
          <div class="wizard-stepper" id="wizard-stepper"></div>
          <h1 class="wizard-title">${DataLoader.getString('step.1.title', lang)}</h1>
          <p class="wizard-description">${DataLoader.getString('step.1.description', lang)}</p>
        </div>

        <div class="wizard-content">
          <!-- Section A: Trial Balance Date -->
          <div class="step-section">
            <div class="card">
              <div class="card-body">
                <div class="form-group">
                  <label class="form-label form-label-required" for="tb-date">
                    ${DataLoader.getString('step.1.date.label', lang)}
                  </label>
                  <input
                    type="date"
                    id="tb-date"
                    class="form-input"
                    value="${dateValue}"
                    max="${new Date().toISOString().split('T')[0]}"
                    style="max-width: 300px;"
                  >
                  <span class="form-help">${DataLoader.getString('step.1.date.help', lang)}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Section B: File Upload -->
          <div class="step-section">
            <div class="step-section-header">
              <h3 class="step-section-title">${lang === 'fr' ? 'Importer les donnees' : 'Upload Data'}</h3>
            </div>

            <div class="card">
              <div class="card-body">
                <div class="dropzone" id="dropzone">
                  ${hasData ? renderUploadedState(uploadedData, lang) : renderDropzoneEmpty(lang)}
                </div>

                <div class="divider mt-lg mb-lg">${lang === 'fr' ? 'OU' : 'OR'}</div>

                <div class="form-group">
                  <label class="form-label" for="paste-area">
                    ${DataLoader.getString('step.3.paste.label', lang)}
                  </label>
                  <textarea
                    id="paste-area"
                    class="form-input paste-area"
                    placeholder="${lang === 'fr' ? 'Collez vos donnees ici...' : 'Paste your data here...'}"
                    rows="4"
                  ></textarea>
                </div>

                <input type="file" id="file-input" class="dropzone-input" accept=".xlsx,.xls,.csv" style="display:none;">
              </div>
            </div>
          </div>
        </div>

        <div class="wizard-footer">
          <div class="wizard-footer-left">
            ${nav.backBtn}
          </div>
          <div class="wizard-footer-right">
            ${nav.nextBtn}
          </div>
        </div>
      </div>
    `;

    // Re-render stepper
    _stepperEl = document.getElementById('wizard-stepper');
    renderStepper(1);

    // Attach event handlers
    attachNavHandlers();
    setupStep1Handlers(lang);
  }

  function renderDropzoneEmpty(lang) {
    return `
      <svg class="dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/>
        <line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
      <div class="dropzone-text">${DataLoader.getString('step.3.dropzone.text', lang)}</div>
      <div class="dropzone-subtext">${DataLoader.getString('step.3.dropzone.subtext', lang)}</div>
    `;
  }

  function renderUploadedState(uploadedData, lang) {
    return `
      <svg class="dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      <div class="dropzone-text">${uploadedData.fileName || 'Pasted Data'}</div>
      <div class="dropzone-subtext">${(uploadedData.rawData || []).length || (uploadedData.originalRawData || []).length} ${lang === 'fr' ? 'lignes chargees' : 'rows loaded'}</div>
      <button class="btn btn-secondary btn-sm mt-md" id="btn-clear-upload">
        ${lang === 'fr' ? 'Effacer' : 'Clear'}
      </button>
    `;
  }

  function setupStep1Handlers(lang) {
    // Date handler
    const dateInput = document.getElementById('tb-date');
    if (dateInput) {
      dateInput.addEventListener('change', (e) => {
        const date = e.target.value ? new Date(e.target.value + 'T00:00:00') : null;
        AppState.setTrialBalanceDate(date);
        updateNextButton();
      });
    }

    // File upload handlers
    setupFileUploadHandlers();

    // Clear button
    const clearBtn = document.getElementById('btn-clear-upload');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        AppState.clearUploadedData();
        renderStep1(lang);
      });
    }
  }

  function reparseData(lang) {
    // Just re-render Step 2 - it will call processForStep2() which handles everything
    renderStep2(lang);
    updateNextButton();
  }

  // ============================================
  // STEP 2: Column Mapping & Preview (NEW FLOW)
  // ============================================

  function renderStep2(lang) {
    // Prepare raw data for mapping (applies skipRows, detects columns, extracts accounts)
    FileReader.prepareForMapping();

    const uploadedData = AppState.getUploadedData();
    const parseConfig = AppState.getParseConfig();
    const nav = getNavButtons(2, lang, AppState.canProceed());

    const previewData = FileReader.getDataPreview(8);
    const mappingConfidence = FileReader.calculateMappingConfidence(uploadedData.columnMapping, parseConfig);

    let confidenceClass = 'badge-success';
    if (mappingConfidence < 50) {
      confidenceClass = 'badge-error';
    } else if (mappingConfidence < 80) {
      confidenceClass = 'badge-warning';
    }

    // Get original data for header row selection (first 10 rows)
    const originalData = uploadedData.originalRawData || [];
    const headerRowPreview = originalData.slice(0, 10);
    const currentHeaderRow = parseConfig.skipRows + 1; // 1-based for display

    // Find first column with actual data across all preview rows
    let firstDataCol = Infinity;
    for (const row of headerRowPreview) {
      const idx = row.findIndex(cell => cell !== null && cell !== undefined && String(cell).trim() !== '');
      if (idx >= 0 && idx < firstDataCol) {
        firstDataCol = idx;
      }
    }
    if (firstDataCol === Infinity) firstDataCol = 0;

    _mainEl.innerHTML = `
      <div class="wizard">
        <div class="wizard-header">
          <div class="wizard-stepper" id="wizard-stepper"></div>
          <h1 class="wizard-title">${lang === 'fr' ? 'Mappage des colonnes' : 'Column Mapping'}</h1>
          <p class="wizard-description">${lang === 'fr' ? 'Verifiez et ajustez le mappage des colonnes' : 'Verify and adjust the column mapping'}</p>
        </div>

        <div class="wizard-content">
          <!-- Header Row Selection -->
          <div class="step-section">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">${DataLoader.getString('parse.headerRow.title', lang)}</h3>
              </div>
              <div class="card-body">
                <p class="text-muted mb-md">${DataLoader.getString('parse.headerRow.help', lang)}</p>
                <div class="table-wrapper">
                  <table class="table table-sm table-hover" id="header-row-table">
                    <tbody>
                      ${headerRowPreview.map((row, idx) => `
                        <tr class="header-row-option ${idx + 1 === currentHeaderRow ? 'selected' : ''}" data-row="${idx + 1}">
                          <td class="row-number"><strong>${idx + 1}</strong></td>
                          ${row.slice(firstDataCol, firstDataCol + 6).map(cell => `<td>${cell !== null && cell !== undefined ? cell : ''}</td>`).join('')}
                          ${row.length > firstDataCol + 6 ? '<td>...</td>' : ''}
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Parse Options -->
          <div class="step-section">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">${lang === 'fr' ? 'Options de lecture' : 'Parse Options'}</h3>
              </div>
              <div class="card-body">
                <div class="form-row">
                  <!-- Combined Column -->
                  <div class="form-group">
                    <div class="form-check">
                      <input type="checkbox" id="use-combined" class="form-checkbox" ${parseConfig.useCombinedColumn ? 'checked' : ''}>
                      <label class="form-check-label" for="use-combined">
                        ${lang === 'fr' ? 'Numero et nom dans une seule colonne' : 'Account # and name in one column'}
                      </label>
                    </div>
                    <div id="delimiter-config" class="mt-sm ${parseConfig.useCombinedColumn ? '' : 'hidden'}">
                      <label class="form-label" for="delimiter">${lang === 'fr' ? 'Delimiteur' : 'Delimiter'}</label>
                      <input type="text" id="delimiter" class="form-input" value="${parseConfig.combinedDelimiter}" style="max-width: 100px;">
                    </div>
                  </div>

                  <!-- Amount Type -->
                  <div class="form-group">
                    <label class="form-label">${lang === 'fr' ? 'Format des montants' : 'Amount Format'}</label>
                    <div class="form-radio-group">
                      <div class="form-radio">
                        <input type="radio" id="amount-auto" name="amount-type" value="auto" ${parseConfig.amountType === 'auto' ? 'checked' : ''}>
                        <label for="amount-auto">${lang === 'fr' ? 'Auto' : 'Auto'}</label>
                      </div>
                      <div class="form-radio">
                        <input type="radio" id="amount-single" name="amount-type" value="single" ${parseConfig.amountType === 'single' ? 'checked' : ''}>
                        <label for="amount-single">${lang === 'fr' ? 'Colonne unique' : 'Single column'}</label>
                      </div>
                      <div class="form-radio">
                        <input type="radio" id="amount-separate" name="amount-type" value="separate" ${parseConfig.amountType === 'separate' ? 'checked' : ''}>
                        <label for="amount-separate">${lang === 'fr' ? 'Debit/Credit separes' : 'Separate debit/credit'}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Column Mapping Section -->
          <div class="step-section">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">${lang === 'fr' ? 'Mappage des colonnes' : 'Column Assignment'}</h3>
                <span class="badge ${confidenceClass}">${lang === 'fr' ? 'Confiance' : 'Confidence'}: ${mappingConfidence}%</span>
              </div>
              <div class="card-body">
                ${renderColumnMappingUI(previewData, uploadedData.columnMapping, lang)}
              </div>
            </div>
          </div>

        </div>

        <div class="wizard-footer">
          <div class="wizard-footer-left">
            ${nav.backBtn}
          </div>
          <div class="wizard-footer-right">
            ${nav.nextBtn}
          </div>
        </div>
      </div>
    `;

    // Re-render stepper
    _stepperEl = document.getElementById('wizard-stepper');
    renderStepper(2);

    // Attach handlers
    attachNavHandlers();
    attachColumnMappingHandlers();
    setupStep2ParseHandlers(lang);
  }

  function setupStep2ParseHandlers(lang) {
    // Header row selection
    document.querySelectorAll('.header-row-option').forEach(row => {
      row.addEventListener('click', () => {
        const rowNum = parseInt(row.dataset.row, 10);
        const skipRows = rowNum - 1; // Convert 1-based row to 0-based skipRows
        AppState.setSkipRows(skipRows);
        reparseData(lang);
      });
    });

    // Combined column checkbox
    const useCombinedCheckbox = document.getElementById('use-combined');
    const delimiterConfig = document.getElementById('delimiter-config');
    if (useCombinedCheckbox) {
      useCombinedCheckbox.addEventListener('change', (e) => {
        const enabled = e.target.checked;
        AppState.setCombinedColumn(enabled);
        if (delimiterConfig) {
          delimiterConfig.classList.toggle('hidden', !enabled);
        }
        reparseData(lang);
      });
    }

    // Delimiter input
    const delimiterInput = document.getElementById('delimiter');
    if (delimiterInput) {
      delimiterInput.addEventListener('change', (e) => {
        AppState.setCombinedColumn(true, e.target.value);
        reparseData(lang);
      });
    }

    // Amount type radios
    document.querySelectorAll('input[name="amount-type"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        AppState.setAmountType(e.target.value);
        reparseData(lang);
      });
    });
  }

  function renderParsedAccountsPreview(accounts, lang) {
    if (accounts.length === 0) {
      return `<p class="text-muted">${lang === 'fr' ? 'Aucun compte detecte' : 'No accounts detected'}</p>`;
    }

    const previewAccounts = accounts.slice(0, 5);
    return `
      <div class="table-wrapper">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>${lang === 'fr' ? 'Numero' : 'Number'}</th>
              <th>${lang === 'fr' ? 'Nom' : 'Name'}</th>
              <th>${lang === 'fr' ? 'Solde' : 'Balance'}</th>
              <th>${lang === 'fr' ? 'Premier chiffre' : 'First Digit'}</th>
            </tr>
          </thead>
          <tbody>
            ${previewAccounts.map(acct => `
              <tr>
                <td><code>${acct.accountNumber || '-'}</code></td>
                <td>${acct.accountName || '-'}</td>
                <td class="${acct.balance >= 0 ? 'text-success' : 'text-error'}">${formatCurrency(acct.balance)}</td>
                <td><code>${acct.firstDigit || '-'}</code></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ${accounts.length > 5 ? `<p class="text-muted text-sm mt-sm">${lang === 'fr' ? 'Et' : 'And'} ${accounts.length - 5} ${lang === 'fr' ? 'autres comptes...' : 'more accounts...'}</p>` : ''}
    `;
  }

  function formatCurrency(value) {
    if (value === null || value === undefined) return '-';
    return value.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' });
  }

  // ============================================
  // STEP 3: Account Categories (First Digit Mapping - SIMPLIFIED)
  // ============================================

  function renderStep3(lang) {
    const structure = AppState.getStructure();
    const detectedDigits = AppState.getDetectedFirstDigits();
    const categories = DataLoader.getCategories(lang);
    const nav = getNavButtons(3, lang, AppState.canProceed());

    // Only show digits that are actually in the data
    const digitsToShow = detectedDigits.length > 0 ? detectedDigits : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    // Build category options
    const categoryOptions = categories.map(c =>
      `<option value="${c.id}">${c.name}</option>`
    ).join('');
    const categoryOptionsWithSkip = `<option value="Skip">${DataLoader.getString('category.Skip', lang)}</option>` + categoryOptions;

    // Build digit mapping rows - vertical list, only detected digits
    const digitRows = digitsToShow.map(d => {
      const digit = parseInt(d, 10);
      const selected = structure.digitMapping[digit];
      const optionsHtml = categoryOptionsWithSkip.replace(`value="${selected}"`, `value="${selected}" selected`);

      return `
        <div class="digit-row">
          <div class="digit-row-label">
            <span class="digit-badge">${d}</span>
            <span class="digit-hint">${lang === 'fr' ? 'Comptes commen\u00E7ant par' : 'Accounts starting with'} ${d}</span>
          </div>
          <select class="form-select digit-mapping-select" data-digit="${digit}">
            ${optionsHtml}
          </select>
        </div>
      `;
    }).join('');

    _mainEl.innerHTML = `
      <div class="wizard">
        <div class="wizard-header">
          <div class="wizard-stepper" id="wizard-stepper"></div>
          <h1 class="wizard-title">${DataLoader.getString('step.2.digitMapping.title', lang)}</h1>
          <p class="wizard-description">${DataLoader.getString('step.2.digitMapping.description', lang)}</p>
        </div>

        <div class="wizard-content">
          <div class="step-section">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">${lang === 'fr' ? 'Categories par premier chiffre' : 'Categories by First Digit'}</h3>
                ${detectedDigits.length > 0 ? `<span class="badge badge-info">${detectedDigits.length} ${lang === 'fr' ? 'chiffres detectes' : 'digits detected'}</span>` : ''}
              </div>
              <div class="card-body">
                <p class="text-sm text-muted mb-lg">
                  ${lang === 'fr' ? 'Attribuez une categorie de compte a chaque premier chiffre trouve dans vos donnees.' : 'Assign an account category to each first digit found in your data.'}
                </p>
                <div class="digit-mapping-list">
                  ${digitRows}
                </div>
              </div>
            </div>
          </div>

          <!-- Validation Message -->
          <div class="step-section">
            <div class="alert alert-info">
              <span class="alert-icon">i</span>
              <div class="alert-content">
                <div class="alert-message">
                  ${lang === 'fr'
                    ? 'Vous devez avoir au moins un chiffre attribue a Actif, Passif et Capitaux propres.'
                    : 'You must have at least one digit assigned to Asset, Liability, and Equity.'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="wizard-footer">
          <div class="wizard-footer-left">
            ${nav.backBtn}
          </div>
          <div class="wizard-footer-right">
            ${nav.nextBtn}
          </div>
        </div>
      </div>
    `;

    _stepperEl = document.getElementById('wizard-stepper');
    renderStepper(3);
    attachNavHandlers();

    // Digit mapping handlers
    document.querySelectorAll('.digit-mapping-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const digit = parseInt(e.target.dataset.digit, 10);
        AppState.setDigitMapping(digit, e.target.value);
        updateNextButton();
      });
    });
  }

  /**
   * Setup file upload handlers
   */
  function setupFileUploadHandlers() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('file-input');
    const pasteArea = document.getElementById('paste-area');

    if (!dropzone) return;

    // Click to browse (but not on the clear button)
    dropzone.addEventListener('click', (e) => {
      if (e.target.id === 'btn-clear-upload') return;
      if (fileInput) fileInput.click();
    });

    // File selected
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          handleFileUpload(e.target.files[0]);
        }
      });
    }

    // Drag and drop
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('active');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('active');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('active');
      if (e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files[0]);
      }
    });

    // Paste handler
    if (pasteArea) {
      pasteArea.addEventListener('paste', (e) => {
        // Let the paste happen, then process
        setTimeout(() => {
          const text = pasteArea.value.trim();
          if (text) {
            handlePastedData(text);
          }
        }, 100);
      });

      // Also handle manual input
      pasteArea.addEventListener('input', (e) => {
        const text = e.target.value.trim();
        if (text && text.includes('\n')) {
          handlePastedData(text);
        }
      });
    }
  }

  /**
   * Handle file upload
   */
  function handleFileUpload(file) {
    const lang = AppState.getLanguage();
    const readConfig = AppState.getParseConfig();
    showUploadProgress(true);

    FileReader.readFile(file, readConfig)
      .then(result => {
        showUploadProgress(false);

        // Check if we need sheet selection (multiple sheets)
        if (result.needsSheetSelection) {
          renderSheetSelector(result.sheets, result.workbook, result.fileName, result.fileType, lang);
          return;
        }

        renderStep1(lang);
        updateNextButton();
      })
      .catch(error => {
        showUploadProgress(false);
        showUploadError(error.message);
      });
  }

  /**
   * Render sheet selector when Excel has multiple sheets
   */
  function renderSheetSelector(sheets, workbook, fileName, fileType, lang) {
    const dropzone = document.getElementById('dropzone');
    if (!dropzone) return;

    // Sort sheets by cell count (most data first)
    const sortedSheets = [...sheets].sort((a, b) => b.cellCount - a.cellCount);

    dropzone.innerHTML = `
      <div class="sheet-selector">
        <h3 class="sheet-selector-title">${lang === 'fr' ? 'Plusieurs feuilles detectees' : 'Multiple sheets found'}</h3>
        <p class="sheet-selector-subtitle">${lang === 'fr' ? 'Selectionnez la feuille avec vos donnees:' : 'Select the sheet with your data:'}</p>
        <div class="sheet-list">
          ${sortedSheets.map(sheet => `
            <button class="sheet-option" data-sheet="${sheet.name}">
              <span class="sheet-name">${sheet.name}</span>
              <span class="sheet-cells">${sheet.cellCount} ${lang === 'fr' ? 'cellules' : 'cells'}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    // Attach click handlers
    dropzone.querySelectorAll('.sheet-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent dropzone click from opening file picker
        const sheetName = btn.dataset.sheet;
        showUploadProgress(true);

        try {
          const result = FileReader.readSheet(workbook, sheetName, fileName, fileType);
          showUploadProgress(false);
          renderStep1(lang);
          updateNextButton();
        } catch (error) {
          showUploadProgress(false);
          showUploadError(error.message);
        }
      });
    });
  }

  /**
   * Handle pasted data
   */
  function handlePastedData(text) {
    const lang = AppState.getLanguage();
    const readConfig = AppState.getParseConfig();
    showUploadProgress(true);

    FileReader.readText(text, readConfig)
      .then(result => {
        showUploadProgress(false);
        // Re-render Step 1 to show uploaded state
        renderStep1(lang);
        updateNextButton();
      })
      .catch(error => {
        showUploadProgress(false);
        showUploadError(error.message);
      });
  }

  /**
   * Show/hide upload progress spinner
   */
  function showUploadProgress(show) {
    const dropzone = document.getElementById('dropzone');
    if (!dropzone) return;

    if (show) {
      dropzone.innerHTML = `
        <div class="spinner"></div>
        <div class="dropzone-text mt-md">Processing...</div>
      `;
    }
  }

  /**
   * Show upload error
   */
  function showUploadError(message) {
    const preview = document.getElementById('data-preview');
    if (preview) {
      preview.innerHTML = `
        <div class="alert alert-error mt-lg">
          <span class="alert-icon">!</span>
          <div class="alert-content">
            <div class="alert-title">Error</div>
            <div class="alert-message">${message}</div>
          </div>
        </div>
      `;
    }
  }


  /**
   * Render column mapping UI
   */
  function renderColumnMappingUI(previewData, mapping, lang) {
    const parseConfig = AppState.getParseConfig();

    // Build fields based on configuration
    let fields = [];

    if (parseConfig.useCombinedColumn) {
      fields.push({ key: 'combined', label: lang === 'fr' ? 'Compte combine' : 'Combined Account', required: false });
    } else {
      fields.push({ key: 'accountNumber', label: lang === 'fr' ? 'Numero de compte' : 'Account Number', required: false });
      fields.push({ key: 'accountName', label: lang === 'fr' ? 'Nom du compte' : 'Account Name', required: false });
    }

    if (parseConfig.amountType === 'single') {
      fields.push({ key: 'balance', label: lang === 'fr' ? 'Solde' : 'Balance', required: true });
    } else if (parseConfig.amountType === 'separate') {
      fields.push({ key: 'debit', label: lang === 'fr' ? 'Debit' : 'Debit', required: true });
      fields.push({ key: 'credit', label: lang === 'fr' ? 'Credit' : 'Credit', required: true });
    } else {
      // Auto mode - show all
      fields.push({ key: 'debit', label: lang === 'fr' ? 'Debit' : 'Debit', required: false });
      fields.push({ key: 'credit', label: lang === 'fr' ? 'Credit' : 'Credit', required: false });
      fields.push({ key: 'balance', label: lang === 'fr' ? 'Solde' : 'Balance', required: false });
    }

    fields.push({ key: 'gifi', label: 'GIFI', required: false });

    // Handle empty headers - show "No columns available" message
    const headers = previewData.headers || [];
    if (headers.length === 0) {
      return `<div class="alert alert-warning">${lang === 'fr' ? 'Aucune colonne disponible. Verifiez le fichier.' : 'No columns available. Check the file.'}</div>`;
    }

    const options = headers.map((h, i) => {
      const colLetter = String.fromCharCode(65 + i); // A, B, C, etc.
      const label = (h && h.trim()) || `Column ${colLetter}`;
      return `<option value="${i}">${label}</option>`;
    }).join('');

    return `
      <div class="column-mapping">
        <div class="form-grid form-grid-3">
          ${fields.map(field => {
            const selectedValue = mapping[field.key];
            let optionsHtml = `<option value="">${lang === 'fr' ? 'Non mappe' : 'Not mapped'}</option>` + options;
            if (selectedValue !== null && selectedValue !== undefined) {
              optionsHtml = optionsHtml.replace(`value="${selectedValue}"`, `value="${selectedValue}" selected`);
            }
            return `
              <div class="form-group">
                <label class="form-label ${field.required ? 'form-label-required' : ''}">
                  ${field.label}
                </label>
                <select class="form-select column-map-select" data-field="${field.key}">
                  ${optionsHtml}
                </select>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Update just the confidence badge (without full re-render)
   */
  function updateMappingConfidence() {
    const uploadedData = AppState.getUploadedData();
    const parseConfig = AppState.getParseConfig();
    const confidence = FileReader.calculateMappingConfidence(uploadedData.columnMapping, parseConfig);

    let badgeClass = 'badge-success';
    if (confidence < 50) {
      badgeClass = 'badge-error';
    } else if (confidence < 80) {
      badgeClass = 'badge-warning';
    }

    const lang = AppState.getLanguage();
    const badgeEl = document.querySelector('.card-header .badge');
    if (badgeEl) {
      badgeEl.className = `badge ${badgeClass}`;
      badgeEl.textContent = `${lang === 'fr' ? 'Confiance' : 'Confidence'}: ${confidence}%`;
    }
  }

  /**
   * Update just the detected accounts preview (without full re-render)
   */
  function updateDetectedAccountsPreview() {
    const lang = AppState.getLanguage();
    const uploadedData = AppState.getUploadedData();

    // Find the detected accounts card body
    const accountsCard = document.querySelector('.card:last-of-type .card-body');
    if (accountsCard) {
      accountsCard.innerHTML = renderParsedAccountsPreview(uploadedData.parsedAccounts, lang);
    }

    // Also update the badge showing account count
    const accountsBadge = document.querySelector('.card:last-of-type .badge-info');
    if (accountsBadge) {
      accountsBadge.textContent = `${uploadedData.parsedAccounts.length} ${lang === 'fr' ? 'comptes' : 'accounts'}`;
    }
  }

  /**
   * Attach column mapping change handlers
   */
  function attachColumnMappingHandlers() {
    document.querySelectorAll('.column-map-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const field = e.target.dataset.field;
        const value = e.target.value === '' ? null : parseInt(e.target.value, 10);

        // Update state
        const mapping = AppState.getUploadedData().columnMapping;
        mapping[field] = value;
        AppState.setColumnMapping(mapping);

        // Re-extract accounts with new mapping
        FileReader.updateColumnMapping(field, value);

        // Update just the parts that changed (NOT full re-render)
        updateMappingConfidence();
        updateDetectedAccountsPreview();
        updateNextButton();
      });
    });
  }

  // ============================================
  // STEP 4: Verify Mappings with Special Accounts (NEW FLOW)
  // ============================================

  function renderStep4(lang) {
    const nav = getNavButtons(4, lang, AppState.canProceed());
    const results = AppState.getMappingResults();
    const setup = AppState.getSetup();
    const isMultiCurrency = setup.multiCurrency;

    // Currency options for dropdown
    const currencies = ['CAD', 'USD', 'EUR', 'GBP', 'AUD', 'JPY', 'CHF', 'CNY', 'MXN', 'INR', 'BRL', 'NZD'];
    const currencyOptions = currencies.map(c => `<option value="${c}" ${c === setup.homeCurrency ? 'selected' : ''}>${c}</option>`).join('');

    _mainEl.innerHTML = `
      <div class="wizard">
        <div class="wizard-header">
          <div class="wizard-stepper" id="wizard-stepper"></div>
          <h1 class="wizard-title">${DataLoader.getString('step.4.title', lang)}</h1>
          <p class="wizard-description">${DataLoader.getString('step.4.description', lang)}</p>
        </div>

        <div class="wizard-content">
          <!-- Multi-Currency Toggle -->
          <div class="mc-toggle-wrapper mb-lg">
            <label class="toggle-label">
              <input type="checkbox" id="mc-toggle" ${isMultiCurrency ? 'checked' : ''}>
              <span class="toggle-text">${DataLoader.getString('mc.toggle', lang)}</span>
            </label>
            <div class="mc-home-currency ${isMultiCurrency ? '' : 'hidden'}" id="mc-home-currency">
              <label>${DataLoader.getString('mc.homeCurrency', lang)}:</label>
              <select class="form-select form-select-sm" id="home-currency-select">
                ${currencyOptions}
              </select>
            </div>
          </div>

          <!-- Summary bar -->
          <div class="mapping-summary">
            <div class="mapping-summary-item">
              <span class="badge badge-success">${results.summary.mapped}</span>
              <span>${DataLoader.getString('step.4.summary.mapped', lang)}</span>
            </div>
            <div class="mapping-summary-item">
              <span class="badge badge-warning">${results.summary.needsReview}</span>
              <span>${DataLoader.getString('step.4.summary.review', lang)}</span>
            </div>
            <div class="mapping-summary-item">
              <span class="badge badge-error">${results.summary.errors}</span>
              <span>${DataLoader.getString('step.4.summary.errors', lang)}</span>
            </div>
          </div>

          <!-- Filter buttons -->
          <div class="mapping-filters">
            <button class="filter-btn active" data-filter="all">${DataLoader.getString('step.4.filter.all', lang)}</button>
            <button class="filter-btn" data-filter="review">${DataLoader.getString('step.4.filter.review', lang)}</button>
            <button class="filter-btn" data-filter="errors">${DataLoader.getString('step.4.filter.errors', lang)}</button>
          </div>

          <!-- Mapping table -->
          <div class="mapping-table-wrapper">
            <div class="table-wrapper">
              <table class="table" id="mapping-table">
                <thead>
                  <tr>
                    <th class="th-skip">${DataLoader.getString('table.skip', lang) || (lang === 'fr' ? 'Ignorer' : 'Skip')}</th>
                    <th>${DataLoader.getString('table.acctNum', lang)}</th>
                    <th>${DataLoader.getString('table.acctName', lang)}</th>
                    <th>${DataLoader.getString('table.type', lang)}</th>
                    <th>${DataLoader.getString('table.detailType', lang)}</th>
                    ${isMultiCurrency ? `<th>${DataLoader.getString('table.currency', lang)}</th>` : ''}
                    <th>${DataLoader.getString('table.status', lang)}</th>
                  </tr>
                </thead>
                <tbody id="mapping-tbody">
                  ${results.accounts.length === 0
                    ? `<tr><td colspan="${isMultiCurrency ? 7 : 6}" class="text-center text-muted p-xl">${lang === 'fr' ? 'Aucune donnee. Retournez a l\'etape 1 pour importer des donnees.' : 'No data. Go back to Step 1 to upload data.'}</td></tr>`
                    : renderMappingRows(results.accounts, lang, isMultiCurrency, setup.homeCurrency)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="wizard-footer">
          <div class="wizard-footer-left">
            ${nav.backBtn}
          </div>
          <div class="wizard-footer-right">
            ${nav.nextBtn}
          </div>
        </div>
      </div>
    `;

    _stepperEl = document.getElementById('wizard-stepper');
    renderStepper(4);
    attachNavHandlers();

    // Multi-currency toggle handler
    document.getElementById('mc-toggle')?.addEventListener('change', (e) => {
      AppState.setMultiCurrency(e.target.checked);
      // Re-render to show/hide currency column
      renderStep4(lang);
    });

    // Home currency change handler
    document.getElementById('home-currency-select')?.addEventListener('change', (e) => {
      AppState.setHomeCurrency(e.target.value);
      // Update all account currencies to new home currency (unless manually changed)
      const results = AppState.getMappingResults();
      results.accounts.forEach((acct, idx) => {
        if (!acct.currencyOverride) {
          acct.currency = e.target.value;
        }
      });
      AppState.setMappingResults(results.accounts);
      // Re-render table
      const tbody = document.getElementById('mapping-tbody');
      if (tbody) {
        tbody.innerHTML = renderMappingRows(results.accounts, lang, true, e.target.value);
        attachMappingDropdownHandlers(lang);
        attachSkipCheckboxHandlers(lang);
        attachCurrencyHandlers(lang);
      }
    });

    // Filter button handlers
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterMappingTable(btn.dataset.filter);
      });
    });

    // Type dropdown handlers
    attachMappingDropdownHandlers(lang);

    // Skip checkbox handlers
    attachSkipCheckboxHandlers(lang);

    // Currency dropdown handlers (if MC enabled)
    if (isMultiCurrency) {
      attachCurrencyHandlers(lang);
    }
  }

  /**
   * Attach handlers for currency dropdowns
   */
  function attachCurrencyHandlers(lang) {
    document.querySelectorAll('.currency-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        const currency = e.target.value;
        const results = AppState.getMappingResults();
        if (results.accounts[index]) {
          results.accounts[index].currency = currency;
          results.accounts[index].currencyOverride = true; // Mark as manually changed
          AppState.setMappingResults(results.accounts);
        }
      });
    });
  }

  /**
   * Attach handlers for type and detail type dropdowns in mapping table
   */
  function attachMappingDropdownHandlers(lang) {
    // Type selection change
    document.querySelectorAll('.type-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        const typeName = e.target.value;

        // Update detail type dropdown
        const detailSelect = document.querySelector(`.detail-type-select[data-index="${index}"]`);
        if (detailSelect) {
          if (typeName) {
            const detailTypes = AccountMapper.getDetailTypesForType(typeName);
            // Auto-select first detail type as default
            const defaultDetail = detailTypes.length > 0 ? detailTypes[0] : null;
            detailSelect.innerHTML = `
              <option value="">${lang === 'fr' ? 'Selectionnez...' : 'Select...'}</option>
              ${detailTypes.map(dt => `<option value="${dt.code}" ${defaultDetail && dt.code === defaultDetail.code ? 'selected' : ''}>${dt.name}</option>`).join('')}
            `;
            detailSelect.disabled = false;

            // Auto-update the mapping with the default detail type
            if (defaultDetail) {
              AccountMapper.updateAccountMapping(index, typeName, defaultDetail.code);
            } else {
              AccountMapper.updateAccountMapping(index, typeName, null);
            }
          } else {
            detailSelect.innerHTML = `<option value="">${lang === 'fr' ? 'Choisir le type d\'abord' : 'Select type first'}</option>`;
            detailSelect.disabled = true;
            AccountMapper.updateAccountMapping(index, typeName, null);
          }
        }

        updateRowStatus(index);
        updateSummaryBadges();
        updateNextButton();
      });
    });

    // Detail type selection change
    document.querySelectorAll('.detail-type-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        const detailTypeCode = e.target.value;
        const typeSelect = document.querySelector(`.type-select[data-index="${index}"]`);
        const typeName = typeSelect ? typeSelect.value : null;

        if (typeName && detailTypeCode) {
          AccountMapper.updateAccountMapping(index, typeName, detailTypeCode);
          updateRowStatus(index);
          updateSummaryBadges();
          updateNextButton();
        }
      });
    });
  }

  /**
   * Update a single row's status styling after mapping change
   */
  function updateRowStatus(index) {
    const results = AppState.getMappingResults();
    const account = results.accounts[index];
    if (!account) return;

    const row = document.querySelector(`#mapping-tbody tr[data-index="${index}"]`);
    if (!row) return;

    // Update row class
    row.className = `row-status-${account.status}`;
    row.dataset.status = account.status;

    // Update status badge
    const lang = AppState.getLanguage();
    const statusCell = row.querySelector('td:last-child');
    if (statusCell) {
      statusCell.innerHTML = `
        <span class="badge badge-${getStatusBadgeClass(account.status)}">
          ${getStatusLabel(account.status, lang)}
        </span>
      `;
    }
  }

  /**
   * Update summary badges in Step 4
   */
  function updateSummaryBadges() {
    const results = AppState.getMappingResults();

    const mappedBadge = document.querySelector('.mapping-summary-item:nth-child(1) .badge');
    const reviewBadge = document.querySelector('.mapping-summary-item:nth-child(2) .badge');
    const errorBadge = document.querySelector('.mapping-summary-item:nth-child(3) .badge');

    if (mappedBadge) mappedBadge.textContent = results.summary.mapped;
    if (reviewBadge) reviewBadge.textContent = results.summary.needsReview;
    if (errorBadge) errorBadge.textContent = results.summary.errors;
  }

  /**
   * Render mapping table rows
   */
  function renderMappingRows(accounts, lang, showCurrency = false, homeCurrency = 'CAD') {
    const currencies = ['CAD', 'USD', 'EUR', 'GBP', 'AUD', 'JPY', 'CHF', 'CNY', 'MXN', 'INR', 'BRL', 'NZD'];

    return accounts.map((acct, index) => {
      const rowClass = `row-status-${acct.status}`;
      const isSkipped = acct.status === 'skip';
      const isEditable = acct.status !== 'locked' && acct.status !== 'skip';
      const isLocked = acct.status === 'locked';

      // Build type dropdown
      let typeCell = acct.typeName || '-';
      let detailTypeCell = acct.detailTypeName || '-';

      if (isEditable) {
        // Get types - prioritize types for the category, then show all
        const allTypes = AccountMapper.getAllTypes();
        const typeOptions = allTypes.map(t =>
          `<option value="${t.id}" ${t.id === acct.typeCode ? 'selected' : ''}>${t.name}</option>`
        ).join('');

        typeCell = `
          <select class="form-select form-select-sm type-select" data-index="${index}">
            <option value="">${lang === 'fr' ? 'Selectionnez...' : 'Select...'}</option>
            ${typeOptions}
          </select>
        `;

        // Detail type dropdown (depends on type selection)
        let detailOptions = '';
        if (acct.typeCode) {
          const detailTypes = AccountMapper.getDetailTypesForType(acct.typeCode);
          detailOptions = detailTypes.map(dt =>
            `<option value="${dt.code}" ${dt.code === acct.qboCode ? 'selected' : ''}>${dt.name}</option>`
          ).join('');
        }

        detailTypeCell = `
          <select class="form-select form-select-sm detail-type-select" data-index="${index}" ${!acct.typeCode ? 'disabled' : ''}>
            <option value="">${acct.typeCode ? (lang === 'fr' ? 'Selectionnez...' : 'Select...') : (lang === 'fr' ? 'Type d\'abord' : 'Type first')}</option>
            ${detailOptions}
          </select>
        `;
      } else if (isLocked) {
        typeCell = `<span class="text-muted">${acct.typeName || '-'}</span>`;
        detailTypeCell = `<span class="text-muted">${acct.detailTypeName || '-'}</span>`;
      }

      // Currency dropdown (only if multi-currency enabled)
      let currencyCell = '';
      if (showCurrency) {
        const currentCurrency = acct.currency || homeCurrency;
        const currencyOptions = currencies.map(c =>
          `<option value="${c}" ${c === currentCurrency ? 'selected' : ''}>${c}</option>`
        ).join('');
        currencyCell = `
          <td>
            <select class="form-select form-select-sm currency-select" data-index="${index}">
              ${currencyOptions}
            </select>
          </td>
        `;
      }

      // Status label
      const statusLabel = getStatusLabel(acct.status, lang);

      // Skip checkbox (disabled for locked accounts or accounts with balances)
      const hasBalance = acct.balance !== 0;
      const skipDisabled = isLocked || hasBalance;
      const skipTitle = isLocked
        ? (lang === 'fr' ? 'Compte verrouillé' : 'Locked account')
        : hasBalance
          ? (lang === 'fr' ? 'Impossible d\'ignorer - compte avec solde' : 'Cannot skip - account has balance')
          : (lang === 'fr' ? 'Ignorer ce compte' : 'Skip this account');

      const skipCheckbox = `<input type="checkbox" class="skip-checkbox" data-index="${index}" tabindex="-1" ${isSkipped ? 'checked' : ''} ${skipDisabled ? 'disabled' : ''} title="${skipTitle}">`;

      return `
        <tr class="${rowClass}" data-index="${index}" data-status="${acct.status}">
          <td class="td-skip">${skipCheckbox}</td>
          <td><code>${acct.accountNumber || '-'}</code></td>
          <td>${acct.accountName}</td>
          <td>${typeCell}</td>
          <td>${detailTypeCell}</td>
          ${currencyCell}
          <td>
            <span class="badge badge-${getStatusBadgeClass(acct.status)}">
              ${statusLabel}
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }

  /**
   * Get localized status label
   */
  function getStatusLabel(status, lang) {
    const labels = {
      mapped: lang === 'fr' ? 'Mappe' : 'Mapped',
      locked: lang === 'fr' ? 'Verrouille' : 'Locked',
      review: lang === 'fr' ? 'A revoir' : 'Review',
      error: lang === 'fr' ? 'Erreur' : 'Error',
      skip: lang === 'fr' ? 'Ignore' : 'Skipped'
    };
    return labels[status] || status;
  }

  function getStatusBadgeClass(status) {
    switch (status) {
      case 'mapped': return 'success';
      case 'locked': return 'neutral';
      case 'review': return 'warning';
      case 'error': return 'error';
      case 'skip': return 'neutral';
      default: return 'neutral';
    }
  }

  /**
   * Attach handlers for skip checkboxes
   */
  function attachSkipCheckboxHandlers(lang) {
    document.querySelectorAll('.skip-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        if (e.target.checked) {
          AccountMapper.skipAccount(index);
        } else {
          AccountMapper.unskipAccount(index);
        }
        updateRowStatus(index);
        updateSummaryBadges();

        // Also update the row's editable state
        const row = document.querySelector(`#mapping-tbody tr[data-index="${index}"]`);
        if (row) {
          const isSkipped = e.target.checked;
          // Disable/enable dropdowns in this row
          row.querySelectorAll('select').forEach(select => {
            if (!select.classList.contains('skip-checkbox')) {
              select.disabled = isSkipped;
            }
          });
        }
      });
    });
  }

  function filterMappingTable(filter) {
    const rows = document.querySelectorAll('#mapping-tbody tr');
    rows.forEach(row => {
      const status = row.dataset.status;
      if (filter === 'all') {
        row.style.display = '';
      } else if (filter === 'review' && status === 'review') {
        row.style.display = '';
      } else if (filter === 'errors' && status === 'error') {
        row.style.display = '';
      } else if (filter !== 'all') {
        row.style.display = 'none';
      }
    });
  }

  // ============================================
  // STEP 5: Special Accounts Confirmation
  // ============================================

  function renderStep5(lang) {
    const nav = getNavButtons(5, lang, AppState.canProceed());
    const results = AppState.getMappingResults();
    const structure = AppState.getStructure();

    // Get accounts that could be special accounts based on their detail type
    const arCandidates = results.accounts.filter(a => a.qboCode === 'AR');
    const apCandidates = results.accounts.filter(a => a.qboCode === 'AP');
    const reCandidates = results.accounts.filter(a => a.qboCode === 'RE');

    // Build dropdown options
    const buildOptions = (candidates, currentValue, noneLabel) => {
      let options = `<option value="">${noneLabel}</option>`;
      candidates.forEach(acct => {
        const selected = currentValue === acct.accountNumber ? 'selected' : '';
        const label = acct.accountNumber ? `${acct.accountNumber} - ${acct.accountName}` : acct.accountName;
        options += `<option value="${acct.accountNumber || acct.index}" ${selected}>${label}</option>`;
      });
      return options;
    };

    const noneLabel = DataLoader.getString('step.5.none', lang);

    _mainEl.innerHTML = `
      <div class="wizard">
        <div class="wizard-header">
          <div class="wizard-stepper" id="wizard-stepper"></div>
          <h1 class="wizard-title">${DataLoader.getString('step.5.title', lang)}</h1>
          <p class="wizard-description">${DataLoader.getString('step.5.description', lang)}</p>
        </div>

        <div class="wizard-content">
          <div class="special-accounts-form">
            <!-- A/R -->
            <div class="special-account-item">
              <label class="special-account-label">${DataLoader.getString('step.5.ar.label', lang)}</label>
              <p class="special-account-help">${DataLoader.getString('step.5.ar.help', lang)}</p>
              <select class="form-select special-account-select" id="special-ar">
                ${buildOptions(arCandidates, structure.specialAccounts.ar, noneLabel)}
              </select>
              ${arCandidates.length === 0 ? `<p class="special-account-note">${lang === 'fr' ? 'Aucun compte de type A/R trouve' : 'No accounts with A/R type found'}</p>` : ''}
            </div>

            <!-- A/P -->
            <div class="special-account-item">
              <label class="special-account-label">${DataLoader.getString('step.5.ap.label', lang)}</label>
              <p class="special-account-help">${DataLoader.getString('step.5.ap.help', lang)}</p>
              <select class="form-select special-account-select" id="special-ap">
                ${buildOptions(apCandidates, structure.specialAccounts.ap, noneLabel)}
              </select>
              ${apCandidates.length === 0 ? `<p class="special-account-note">${lang === 'fr' ? 'Aucun compte de type A/P trouve' : 'No accounts with A/P type found'}</p>` : ''}
            </div>

            <!-- Retained Earnings -->
            <div class="special-account-item">
              <label class="special-account-label">${DataLoader.getString('step.5.re.label', lang)}</label>
              <p class="special-account-help">${DataLoader.getString('step.5.re.help', lang)}</p>
              <select class="form-select special-account-select" id="special-re">
                ${buildOptions(reCandidates, structure.specialAccounts.re, noneLabel)}
              </select>
              ${reCandidates.length === 0 ? `<p class="special-account-note">${lang === 'fr' ? 'Aucun compte de type RE trouve' : 'No accounts with Retained Earnings type found'}</p>` : ''}
            </div>
          </div>

          <!-- Info alert -->
          <div class="alert alert-info mt-lg">
            <span class="alert-icon">i</span>
            <div class="alert-content">
              <div class="alert-message">${DataLoader.getString('step.5.info', lang)}</div>
            </div>
          </div>
        </div>

        <div class="wizard-footer">
          <div class="wizard-footer-left">
            ${nav.backBtn}
          </div>
          <div class="wizard-footer-right">
            ${nav.nextBtn}
          </div>
        </div>
      </div>
    `;

    _stepperEl = document.getElementById('wizard-stepper');
    renderStepper(5);
    attachNavHandlers();

    // Special account selection handlers
    document.getElementById('special-ar')?.addEventListener('change', (e) => {
      AppState.setSpecialAccount('ar', e.target.value);
    });
    document.getElementById('special-ap')?.addEventListener('change', (e) => {
      AppState.setSpecialAccount('ap', e.target.value);
    });
    document.getElementById('special-re')?.addEventListener('change', (e) => {
      AppState.setSpecialAccount('re', e.target.value);
    });

    // Auto-select if only one candidate
    if (arCandidates.length === 1 && !structure.specialAccounts.ar) {
      const sel = document.getElementById('special-ar');
      if (sel) {
        sel.value = arCandidates[0].accountNumber || arCandidates[0].index;
        AppState.setSpecialAccount('ar', sel.value);
      }
    }
    if (apCandidates.length === 1 && !structure.specialAccounts.ap) {
      const sel = document.getElementById('special-ap');
      if (sel) {
        sel.value = apCandidates[0].accountNumber || apCandidates[0].index;
        AppState.setSpecialAccount('ap', sel.value);
      }
    }
    if (reCandidates.length === 1 && !structure.specialAccounts.re) {
      const sel = document.getElementById('special-re');
      if (sel) {
        sel.value = reCandidates[0].accountNumber || reCandidates[0].index;
        AppState.setSpecialAccount('re', sel.value);
      }
    }
  }

  // ============================================
  // STEP 6: Download
  // ============================================

  function renderStep6(lang) {
    const setup = AppState.getSetup();
    const results = AppState.getMappingResults();

    // Format date for display
    const dateStr = setup.trialBalanceDate
      ? setup.trialBalanceDate.toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA')
      : '-';

    _mainEl.innerHTML = `
      <div class="wizard">
        <div class="wizard-header">
          <div class="wizard-stepper" id="wizard-stepper"></div>
          <h1 class="wizard-title">${DataLoader.getString('step.6.title', lang)}</h1>
          <p class="wizard-description">${DataLoader.getString('step.6.description', lang)}</p>
        </div>

        <div class="wizard-content">
          <!-- Summary -->
          <div class="download-summary">
            <div class="download-summary-header">
              <svg class="download-summary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <h2 class="download-summary-title">${DataLoader.getString('step.6.summary.title', lang)}</h2>
            </div>

            <div class="download-summary-grid">
              <div class="download-summary-item">
                <span class="download-summary-label">${DataLoader.getString('step.1.date.label', lang)}</span>
                <span class="download-summary-value">${dateStr}</span>
              </div>
              <div class="download-summary-item">
                <span class="download-summary-label">${lang === 'fr' ? 'Comptes totaux' : 'Total Accounts'}</span>
                <span class="download-summary-value">${results.summary.total}</span>
              </div>
            </div>
          </div>

          <!-- Download cards -->
          <div class="download-buttons">
            <div class="download-card hover-lift">
              <svg class="download-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <line x1="9" y1="15" x2="12" y2="18"/>
                <line x1="15" y1="15" x2="12" y2="18"/>
              </svg>
              <h3 class="download-card-title">${DataLoader.getString('step.6.coa.title', lang)}</h3>
              <div class="download-card-filename">COA_IMPORT.xlsx</div>
              <button class="btn btn-primary btn-block" id="btn-download-coa">
                ${DataLoader.getString('step.6.coa.button', lang)}
              </button>
            </div>

            <div class="download-card hover-lift">
              <svg class="download-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <line x1="9" y1="15" x2="12" y2="18"/>
                <line x1="15" y1="15" x2="12" y2="18"/>
              </svg>
              <h3 class="download-card-title">${DataLoader.getString('step.6.je.title', lang)}</h3>
              <div class="download-card-filename">JE_IMPORT.csv</div>
              <button class="btn btn-primary btn-block" id="btn-download-je">
                ${DataLoader.getString('step.6.je.button', lang)}
              </button>
            </div>
          </div>

          <!-- Start over -->
          <div class="text-center mt-xxl">
            <button class="btn btn-secondary" id="btn-start-over">
              ${DataLoader.getString('btn.startOver', lang)}
            </button>
          </div>
        </div>
      </div>
    `;

    _stepperEl = document.getElementById('wizard-stepper');
    renderStepper(6);

    // Download handlers
    document.getElementById('btn-download-coa')?.addEventListener('click', () => {
      if (typeof Exporter !== 'undefined' && Exporter.exportCOA) {
        Exporter.exportCOA();
      } else {
        alert('Export module not loaded');
      }
    });

    document.getElementById('btn-download-je')?.addEventListener('click', () => {
      if (typeof Exporter !== 'undefined' && Exporter.exportJE) {
        Exporter.exportJE();
      } else {
        alert('Export module not loaded');
      }
    });

    document.getElementById('btn-start-over')?.addEventListener('click', () => {
      App.startOver();
    });
  }

  // Public API
  return {
    init,
    render,
    renderStep,
    updateNextButton
  };

})();

// Export for ES modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UI;
}
