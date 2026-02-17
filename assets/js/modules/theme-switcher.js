/**
 * Theme Switcher Module
 * Manages theme switching between dark, light, and academic modes
 * Persists user preference in localStorage
 */

class ThemeSwitcher {
  constructor() {
    this.themes = ['dark', 'light', 'academic'];
    this.currentTheme = this.getStoredTheme();
    this.container = null;
    this.init();
  }

  /**
   * Get theme from localStorage or detect system preference
   */
  getStoredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored && this.themes.includes(stored)) {
      return stored;
    }

    // Detect system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    return 'dark'; // Default
  }

  /**
   * Apply theme to document
   */
  applyTheme(theme) {
    if (!this.themes.includes(theme)) {
      console.warn(`Invalid theme: ${theme}`);
      return;
    }

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
    this.updateButtons();
  }

  /**
   * Create theme switcher UI
   */
  createUI() {
    const container = document.createElement('div');
    container.className = 'theme-switcher';
    container.setAttribute('role', 'group');
    container.setAttribute('aria-label', 'Theme Switcher');

    const themes = [
      { name: 'dark', icon: '🌙', label: 'Dark Theme' },
      { name: 'light', icon: '☀️', label: 'Light Theme' },
      { name: 'academic', icon: '🎓', label: 'Academic Theme' }
    ];

    themes.forEach(({ name, icon, label }) => {
      const button = document.createElement('button');
      button.className = 'theme-switcher-btn';
      button.setAttribute('data-theme', name);
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.textContent = icon;

      if (name === this.currentTheme) {
        button.classList.add('active');
      }

      button.addEventListener('click', () => this.applyTheme(name));

      // Keyboard support
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.applyTheme(name);
        }
      });

      container.appendChild(button);
    });

    this.container = container;
    return container;
  }

  /**
   * Update button active states
   */
  updateButtons() {
    if (!this.container) return;

    const buttons = this.container.querySelectorAll('.theme-switcher-btn');
    buttons.forEach(btn => {
      const theme = btn.getAttribute('data-theme');
      if (theme === this.currentTheme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  /**
   * Initialize theme switcher
   */
  init() {
    // Apply stored theme immediately (already done in _quarto.yml inline script)
    this.applyTheme(this.currentTheme);

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.mountUI());
    } else {
      this.mountUI();
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  /**
   * Mount UI to DOM
   */
  mountUI() {
    const ui = this.createUI();
    document.body.appendChild(ui);
  }
}

// Initialize theme switcher
const themeSwitcher = new ThemeSwitcher();

export default themeSwitcher;
