/**
 * Password Gate Module
 * Client-side password overlay for casual access control.
 * NOT real security — just a UX barrier for GitHub Pages.
 *
 * To change the password:
 *   1. Open browser console and run:
 *      crypto.subtle.digest('SHA-256', new TextEncoder().encode('NewPassword'))
 *        .then(b => console.log(Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2,'0')).join('')));
 *   2. Replace PASSWORD_HASH below with the output
 *   3. Bump PASSWORD_VERSION to invalidate all "Remember me" tokens
 */

const Auth = (function() {
  'use strict';

  const PASSWORD_HASH = '190e58e87c29ae39e7145137a8b622c0eb3c53966b090d44ff75100410e20c42';
  const PASSWORD_VERSION = 1;
  const REMEMBER_DAYS = 30;
  const STORAGE_KEY = 'tb_auth_session';

  /**
   * Hash a string with SHA-256 using Web Crypto API
   */
  async function sha256(text) {
    const data = new TextEncoder().encode(text);
    const buffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  /**
   * Check if a valid "Remember me" token exists in localStorage
   */
  function isAuthValid() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;

    try {
      const session = JSON.parse(stored);
      if (session.version !== PASSWORD_VERSION) {
        localStorage.removeItem(STORAGE_KEY);
        return false;
      }
      const expiryMs = (session.expiryDays || REMEMBER_DAYS) * 24 * 60 * 60 * 1000;
      if (Date.now() - session.timestamp > expiryMs) {
        localStorage.removeItem(STORAGE_KEY);
        return false;
      }
      return true;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }
  }

  /**
   * Store a "Remember me" token in localStorage
   */
  function setAuthToken() {
    const token = crypto.getRandomValues(new Uint8Array(32));
    const tokenHex = Array.from(token).map(b => b.toString(16).padStart(2, '0')).join('');
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      token: tokenHex,
      timestamp: Date.now(),
      expiryDays: REMEMBER_DAYS,
      version: PASSWORD_VERSION
    }));
  }

  /**
   * Hide the overlay and start the app
   */
  function unlock() {
    const overlay = document.getElementById('password-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
      overlay.addEventListener('animationend', () => overlay.remove(), { once: true });
    }
    App.init();
  }

  /**
   * Initialize auth gate on page load
   */
  function init() {
    if (isAuthValid()) {
      unlock();
      return;
    }

    // Show overlay (remove hidden class if present)
    const overlay = document.getElementById('password-overlay');
    if (overlay) overlay.classList.remove('hidden');

    const form = document.getElementById('password-form');
    const input = document.getElementById('password-input');
    const error = document.getElementById('password-error');

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const value = input.value.trim();
        if (!value) return;

        const hash = await sha256(value);
        if (hash === PASSWORD_HASH) {
          // Correct password
          const remember = document.getElementById('remember-checkbox');
          if (remember && remember.checked) {
            setAuthToken();
          }
          unlock();
        } else {
          // Wrong password
          input.classList.add('error');
          error.textContent = 'Incorrect password';
          error.style.display = 'block';
          input.value = '';
          input.focus();
          // Shake animation reset
          error.style.animation = 'none';
          error.offsetHeight; // trigger reflow
          error.style.animation = '';
        }
      });
    }

    if (input) input.focus();
  }

  return { init };

})();

// Initialize auth when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  Auth.init();
});
