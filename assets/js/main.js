/**
 * Main JavaScript Entry Point
 * Orchestrates initialization of all interactive modules
 */

import themeSwitcher from './modules/theme-switcher.js';
import { initScrollAnimations } from './modules/scroll-animations.js';
import { initGallery } from './modules/gallery.js';
import { initCarousel } from './modules/carousel.js';
import { initSkillsViz } from './modules/skills-viz.js';

/**
 * Initialize all modules in correct order
 */
function init() {
  console.log('Initializing interactive CV...');

  // 1. Theme system (already initialized on import)
  console.log('✓ Theme system loaded');

  // 2. Scroll animations
  initScrollAnimations();
  console.log('✓ Scroll animations initialized');

  // 3. Interactive components
  // These are initialized conditionally based on DOM elements

  // Research gallery
  const galleryContainer = document.querySelector('.research-gallery');
  if (galleryContainer) {
    initGallery();
  }

  // Project timeline carousel
  const timelineContainer = document.querySelector('.project-timeline');
  if (timelineContainer) {
    initCarousel();
  }

  // Skills visualization
  const skillsCanvas = document.querySelector('#skills-chart');
  if (skillsCanvas) {
    initSkillsViz();
  }

  console.log('Interactive CV ready!');
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Refresh scroll triggers on resize
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }, 250);
});

// Export for debugging
window.CV = {
  version: '1.0.0',
  themeSwitcher,
};
