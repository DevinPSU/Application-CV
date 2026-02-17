/**
 * Research Gallery Module
 * GLightbox integration for research image gallery
 * Includes lazy loading with Intersection Observer
 */

let lightbox = null;

/**
 * Initialize research gallery with GLightbox
 */
export function initGallery() {
  // Check if GLightbox is available
  if (typeof GLightbox === 'undefined') {
    console.warn('GLightbox library not loaded');
    return null;
  }

  // Check if gallery exists
  const galleryContainer = document.querySelector('.research-gallery');
  if (!galleryContainer) {
    console.log('Gallery container not found');
    return null;
  }

  // Check if there are gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length === 0) {
    console.log('No gallery items found');
    return null;
  }

  // Initialize GLightbox
  lightbox = GLightbox({
    selector: '.gallery-item',
    touchNavigation: true,
    loop: true,
    autoplayVideos: false,
    skin: 'clean',
    closeButton: true,
    keyboardNavigation: true,
  });

  // Setup lazy loading for gallery images
  setupLazyLoading();

  console.log('✓ Research gallery initialized');
  return lightbox;
}

/**
 * Setup lazy loading for gallery images using Intersection Observer
 */
function setupLazyLoading() {
  const images = document.querySelectorAll('.gallery-item img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // Load the image
          img.onload = () => {
            img.classList.add('loaded');
          };

          // If image is already loaded
          if (img.complete) {
            img.classList.add('loaded');
          }

          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px',
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      img.classList.add('loaded');
    });
  }
}

/**
 * Get lightbox instance
 */
export function getLightbox() {
  return lightbox;
}

/**
 * Destroy lightbox instance
 */
export function destroyGallery() {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
}

export default { initGallery, getLightbox, destroyGallery };
