/**
 * Scroll Animations Module
 * GSAP ScrollTrigger-based animations for parallax and fade effects
 */

let scrollTriggersInitialized = false;

/**
 * Initialize scroll-triggered animations
 */
export function initScrollAnimations() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    console.log('Scroll animations disabled (reduced motion preference)');
    return;
  }

  // Check if GSAP and ScrollTrigger are available
  if (typeof gsap === 'undefined') {
    console.warn('GSAP library not loaded');
    return;
  }

  if (typeof ScrollTrigger === 'undefined') {
    console.warn('ScrollTrigger plugin not loaded');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Parallax sections
  initParallax();

  // Fade-in sections
  initFadeIns();

  // Staggered list animations
  initStaggeredLists();

  // Heading animations
  initHeadingAnimations();

  scrollTriggersInitialized = true;
  console.log('Scroll animations initialized');
}

/**
 * Parallax background sections
 */
function initParallax() {
  const parallaxSections = document.querySelectorAll('[data-parallax]');

  parallaxSections.forEach(section => {
    const speed = parseFloat(section.getAttribute('data-parallax')) || 0.5;

    gsap.to(section, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  });
}

/**
 * Fade-in sections on scroll
 */
function initFadeIns() {
  const fadeElements = document.querySelectorAll('.fade-in, section');

  fadeElements.forEach(element => {
    // Skip if element is already visible
    if (element.classList.contains('no-fade')) return;

    gsap.fromTo(element,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none',
        }
      }
    );
  });
}

/**
 * Staggered list item animations
 */
function initStaggeredLists() {
  const lists = document.querySelectorAll('ul, ol');

  lists.forEach(list => {
    const items = list.querySelectorAll('li');

    if (items.length === 0) return;

    gsap.fromTo(items,
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: list,
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      }
    );
  });
}

/**
 * Heading animations with underline reveal
 */
function initHeadingAnimations() {
  const headings = document.querySelectorAll('h2');

  headings.forEach(heading => {
    // Animate heading text
    gsap.fromTo(heading,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );

    // Animate the orange underline (::after pseudo-element)
    // We'll use a wrapper approach for the pseudo-element animation
    const after = heading.querySelector('::after');
    if (heading.style.position !== 'relative') {
      heading.style.position = 'relative';
    }

    // Create a div to animate instead of pseudo-element
    const underline = document.createElement('div');
    underline.style.cssText = `
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: var(--accent-primary);
      transform-origin: left;
    `;

    // Only add if heading has the ::after style
    if (window.getComputedStyle(heading, '::after').getPropertyValue('display') !== 'none') {
      // Don't add the div, just animate the heading itself
      // The ::after will appear with the heading
    }
  });
}

/**
 * Refresh ScrollTrigger (call after DOM changes)
 */
export function refreshScrollTrigger() {
  if (scrollTriggersInitialized && typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
}

/**
 * Kill all ScrollTriggers
 */
export function destroyScrollAnimations() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    scrollTriggersInitialized = false;
  }
}

export default { initScrollAnimations, refreshScrollTrigger, destroyScrollAnimations };
