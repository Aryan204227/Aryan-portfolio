/**
 * useSmoothScroll.js
 * 
 * Implements Lenis smooth scrolling with RAF loop.
 * Falls back gracefully if Lenis is not available.
 * Respects prefers-reduced-motion.
 */
import { useEffect } from 'react';

export default function useSmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let lenis = null;
    let rafId = null;

    async function initLenis() {
      try {
        const { default: Lenis } = await import('lenis');
        lenis = new Lenis({
          duration: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.5,
          infinite: false,
        });

        function raf(time) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      } catch (e) {
        // Lenis not available, use native scroll
        console.warn('Lenis smooth scroll not available, using native scroll.');
      }
    }

    initLenis();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);
}
