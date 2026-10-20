/**
 * useSmoothScroll.js
 *
 * Lenis + GSAP ScrollTrigger integration with safe lifecycle cleanup,
 * reduced-motion support and a native-scroll fallback.
 */
import { useEffect } from 'react';

export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let disposed = false;
    let lenis = null;
    let gsapInstance = null;
    let tickerCallback = null;
    let scrollTrigger = null;
    let lenisScrollHandler = null;

    const initLenis = async () => {
      try {
        const [{ default: Lenis }, gsapModule, triggerModule] = await Promise.all([
          import('lenis'),
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);

        if (disposed) return;

        const { gsap } = gsapModule;
        const { ScrollTrigger } = triggerModule;
        gsapInstance = gsap;
        scrollTrigger = ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        lenis = new Lenis({
          duration: 1.18,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.88,
          touchMultiplier: 1.35,
          infinite: false,
          autoRaf: false,
        });

        lenisScrollHandler = () => ScrollTrigger.update();
        lenis.on('scroll', lenisScrollHandler);
        window.__lenis = lenis;

        tickerCallback = (time) => {
          if (lenis) lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
        // Avoid GSAP's long-frame catch-up producing a visible scroll jump.
        gsap.ticker.lagSmoothing(0);
        requestAnimationFrame(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
      } catch (error) {
        // Native browser scrolling remains available if a sandbox cannot load
        // one of the animation modules.
        console.warn('Lenis/GSAP could not initialise; using native scrolling.', error);
      }
    };

    initLenis();

    return () => {
      disposed = true;
      if (tickerCallback && gsapInstance) gsapInstance.ticker.remove(tickerCallback);
      if (lenis) {
        if (lenisScrollHandler) lenis.off('scroll', lenisScrollHandler);
        if (window.__lenis === lenis) delete window.__lenis;
        lenis.destroy();
      }
    };
  }, []);
}
