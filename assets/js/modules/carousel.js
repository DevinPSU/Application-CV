/**
 * Project Timeline Carousel Module
 * Swiper integration for research timeline
 */

let swiperInstance = null;

/**
 * Initialize project timeline carousel
 */
export function initCarousel() {
  // Check if Swiper is available
  if (typeof Swiper === 'undefined') {
    console.warn('Swiper library not loaded');
    return null;
  }

  // Check if timeline exists
  const timelineContainer = document.querySelector('.project-timeline');
  if (!timelineContainer) {
    console.log('Timeline container not found');
    return null;
  }

  // Initialize Swiper
  swiperInstance = new Swiper('.project-timeline', {
    // Slides per view
    slidesPerView: 1,
    spaceBetween: 30,

    // Pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // Keyboard control
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    // Mouse wheel control
    mousewheel: {
      forceToAxis: true,
    },

    // Accessibility
    a11y: {
      enabled: true,
      prevSlideMessage: 'Previous research position',
      nextSlideMessage: 'Next research position',
    },

    // Breakpoints for responsive design
    breakpoints: {
      // When window width is >= 640px
      640: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      // When window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      // When window width is >= 1024px
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },

    // Auto height
    autoHeight: false,

    // Effect
    effect: 'slide',

    // Speed
    speed: 600,

    // Loop
    loop: false,

    // Grab cursor
    grabCursor: true,
  });

  console.log('✓ Timeline carousel initialized');
  return swiperInstance;
}

/**
 * Get Swiper instance
 */
export function getSwiper() {
  return swiperInstance;
}

/**
 * Destroy Swiper instance
 */
export function destroyCarousel() {
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
}

/**
 * Navigate to specific slide
 */
export function goToSlide(index) {
  if (swiperInstance) {
    swiperInstance.slideTo(index);
  }
}

export default { initCarousel, getSwiper, destroyCarousel, goToSlide };
