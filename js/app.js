/**
 * Main Application Controller
 * Initializes the app and coordinates between modules
 */

const App = (function() {
  'use strict';

  let _initialized = false;

  /**
   * Initialize the application
   */
  async function init() {
    if (_initialized) return;

    console.log('Initializing TB Import Tool...');

    try {
      // Show loading state
      showLoadingState();

      // Load reference data
      await DataLoader.load();
      console.log('Reference data loaded');

      // Set up event listeners
      setupEventListeners();

      // Render initial UI
      UI.init();

      // Hide loading, show app
      hideLoadingState();

      _initialized = true;
      console.log('App initialized successfully');

    } catch (error) {
      console.error('Failed to initialize app:', error);
      showErrorState(error.message);
    }
  }

  /**
   * Show loading state while data loads
   */
  function showLoadingState() {
    const main = document.querySelector('.app-main');
    if (main) {
      main.innerHTML = `
        <div class="loading-container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px;">
          <div class="spinner spinner-lg"></div>
          <p class="mt-lg text-muted">Loading reference data...</p>
        </div>
      `;
    }
  }

  /**
   * Hide loading state
   */
  function hideLoadingState() {
    // UI.init() will replace the loading content
  }

  /**
   * Show error state
   */
  function showErrorState(message) {
    const main = document.querySelector('.app-main');
    if (main) {
      const lang = AppState.getLanguage();
      const errorTitle = DataLoader.isLoaded()
        ? DataLoader.getString('error.loadingData', lang)
        : 'Error Loading Data';

      main.innerHTML = `
        <div class="container">
          <div class="alert alert-error">
            <div class="alert-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div class="alert-content">
              <div class="alert-title">${errorTitle}</div>
              <div class="alert-message">${message}</div>
            </div>
          </div>
          <button class="btn btn-primary mt-lg" onclick="location.reload()">
            Reload Page
          </button>
        </div>
      `;
    }
  }

  /**
   * Set up global event listeners
   */
  function setupEventListeners() {
    // Language toggle in header
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.addEventListener('click', () => {
        AppState.toggleLanguage();
      });
    }

    // Listen for language changes
    AppState.on('langChange', (lang) => {
      updateLanguageUI(lang);
      UI.render(); // Re-render current step
    });

    // Listen for step changes
    AppState.on('stepChange', ({ from, to }) => {
      // When entering Step 4 (Verify), trigger account mapping
      // This works whether coming from Step 3 or skipping from Step 2
      if (to === 4) {
        AccountMapper.mapAllAccounts();
      }
      UI.renderStep(to);
      updateStepperUI(to);
    });

    // Initial language UI update
    updateLanguageUI(AppState.getLanguage());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      // Enter to proceed (if valid)
      if (e.key === 'Enter' && !e.target.matches('textarea, select')) {
        if (AppState.canProceed()) {
          AppState.nextStep();
        }
      }
    });
  }

  /**
   * Update language toggle button and translatable elements
   */
  function updateLanguageUI(lang) {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.textContent = lang === 'en' ? 'FR' : 'EN';
      langToggle.setAttribute('aria-label', lang === 'en' ? 'Switch to French' : 'Switch to English');
    }

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update header title
    const appTitle = document.getElementById('app-title');
    if (appTitle) {
      appTitle.textContent = DataLoader.getString('app.title', lang);
    }

    // Update footer
    const appFooter = document.getElementById('app-footer');
    if (appFooter) {
      appFooter.textContent = DataLoader.getString('app.footer', lang);
    }

    // Update page title
    document.title = DataLoader.getString('app.pageTitle', lang);
  }

  /**
   * Update stepper UI to reflect current step
   */
  function updateStepperUI(currentStep) {
    const steps = document.querySelectorAll('.wizard-stepper .step');
    const connectors = document.querySelectorAll('.wizard-stepper .step-connector');

    steps.forEach((step, index) => {
      const stepNum = index + 1;
      step.classList.remove('active', 'complete');

      if (stepNum === currentStep) {
        step.classList.add('active');
      } else if (stepNum < currentStep) {
        step.classList.add('complete');
      }
    });

    connectors.forEach((conn, index) => {
      const afterStep = index + 1;
      conn.classList.toggle('complete', afterStep < currentStep);
    });
  }

  /**
   * Navigate to a specific step (if allowed)
   */
  function goToStep(step) {
    const current = AppState.getCurrentStep();

    // Can always go back
    if (step < current) {
      AppState.setCurrentStep(step);
      return;
    }

    // Can only go forward if current step is valid
    if (step > current) {
      // Validate all steps in between
      for (let s = current; s < step; s++) {
        AppState.setCurrentStep(s);
        if (!AppState.canProceed()) {
          return; // Stop at first invalid step
        }
      }
      AppState.setCurrentStep(step);
    }
  }

  /**
   * Start over - reset all state
   */
  function startOver() {
    if (confirm(DataLoader.getString('confirm.startOver', AppState.getLanguage()) || 'Are you sure you want to start over? All data will be lost.')) {
      AppState.reset();
      UI.render();
    }
  }

  // Public API
  return {
    init,
    goToStep,
    startOver
  };

})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
