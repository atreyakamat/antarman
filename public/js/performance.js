// Performance monitoring and optimization
(function() {  
  'use strict';
  
  // Performance observer for Core Web Vitals
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
        if (entry.entryType === 'layout-shift') {
          if (!entry.hadRecentInput) {
            console.log('CLS:', entry.value);
          }
        }
      }
    });
    
    observer.observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
  }
  
  // Lazy load images when they come into view
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px'
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // Preload critical resources on user interaction
  let preloadTriggered = false;
  
  function preloadCriticalResources() {
    if (preloadTriggered) return;
    preloadTriggered = true;
    
    // Preload fonts
    if (document.head) {
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      fontLink.as = 'style';
      fontLink.onload = function() {
        this.onload = null;
        this.rel = 'stylesheet';
      };
      document.head.appendChild(fontLink);
    }
  }
  
  // Trigger preload on first user interaction
  ['mousedown', 'touchstart', 'keydown'].forEach(event => {
    document.addEventListener(event, preloadCriticalResources, { once: true, passive: true });
  });
  
  // Service worker registration for caching
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed, continue without caching
      });
    });
  }
  
  // Optimize YouTube embeds
  function optimizeYouTubeEmbeds() {
    const iframes = document.querySelectorAll('iframe[src*="youtube"]');
    iframes.forEach(iframe => {
      const src = iframe.src;
      if (src.includes('youtube.com') && !src.includes('youtube-nocookie.com')) {
        iframe.src = src.replace('youtube.com', 'youtube-nocookie.com');
      }
    });
  }
  
  // Run optimizations when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizeYouTubeEmbeds);
  } else {
    optimizeYouTubeEmbeds();
  }
  
})();
