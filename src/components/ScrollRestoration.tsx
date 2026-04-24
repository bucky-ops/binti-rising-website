'use client';

import { useEffect } from 'react';

export default function ScrollRestoration() {
  useEffect(() => {
    // Ensure smooth scrolling behavior on page load
    const handleLoad = () => {
      // Small delay to ensure DOM is fully loaded
      setTimeout(() => {
        // Scroll to top smoothly if no hash in URL
        if (!window.location.hash) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    };

    // Handle browser back/forward navigation
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('load', handleLoad);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null;
}
