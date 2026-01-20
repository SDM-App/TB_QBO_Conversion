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

      // Initialize help panel
      HelpPanel.init();

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
    // Theme toggle in header
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

    // Load saved theme preference
    loadSavedTheme();

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

    // Help panel toggle button
    const helpToggleBtn = document.getElementById('help-toggle-btn');
    if (helpToggleBtn) {
      helpToggleBtn.addEventListener('click', () => {
        HelpPanel.toggle();
      });
    }

    // Listen for step changes
    AppState.on('stepChange', ({ from, to }) => {
      // When entering Step 4 (Verify), trigger account mapping
      // This works whether coming from Step 3 or skipping from Step 2
      if (to === 4) {
        AccountMapper.mapAllAccounts();
      }
      // When entering Step 6 (Download), process special account remapping
      // This remaps non-selected AR/AP/RE accounts to their fallback types
      if (from === 5 && to === 6) {
        UI.processSpecialAccountRemapping();
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

  /**
   * Toggle between light and dark theme
   */
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  /**
   * Set the theme and save to localStorage
   */
  function setTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
    updateThemeToggleIcon(theme);
  }

  /**
   * Load saved theme from localStorage
   */
  function loadSavedTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(saved);
    } else {
      // Default is dark (no data-theme attribute)
      updateThemeToggleIcon('dark');
    }
  }

  /**
   * Update theme toggle button icon
   */
  function updateThemeToggleIcon(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    // Sun icon in dark mode (click to go light)
    // Moon icon in light mode (click to go dark)
    if (theme === 'light') {
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      btn.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      btn.setAttribute('aria-label', 'Switch to light mode');
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
