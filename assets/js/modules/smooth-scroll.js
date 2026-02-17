/**
 * Smooth Scroll Module
 * Implements momentum-based smooth scrolling using Lenis
 * Integrated with GSAP for scroll-linked animations
 */

let lenisInstance = null;

/**
 * Initialize Lenis smooth scrolling
 */
export function initSmoothScroll() {
  // Check if we're on mobile or if user prefers reduced motion
  const isMobile = window.innerWidth <= 768;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isMobile || prefersReducedMotion) {
    console.log('Smooth scroll disabled (mobile or reduced motion preference)');
    return null;
  }

  // Check if Lenis is available
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis library not loaded');
    return null;
  }

  // Initialize Lenis
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false, // Disable on touch devices
    touchMultiplier: 2,
  });

  // Request animation frame loop
  function raf(time) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Integrate with GSAP ScrollTrigger if available
  if (typeof gsap !== 'undefined' && gsap.registerPlugin && typeof ScrollTrigger !== 'undefined') {
    lenisInstance.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // Anchor link smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenisInstance.scrollTo(target, {
          offset: -80, // Account for navbar height
          duration: 1.5,
        });
      }
    });
  });

  console.log('Smooth scroll initialized');
  return lenisInstance;
}

/**
 * Get Lenis instance
 */
export function getLenis() {
  return lenisInstance;
}

/**
 * Destroy Lenis instance
 */
export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export default { initSmoothScroll, getLenis, destroySmoothScroll };
