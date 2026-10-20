import React, { useEffect, useState } from 'react';

const CHAPTERS = [
  { id: 'home', label: 'HOME', number: '00' },
  { id: 'about', label: 'PROFILE', number: '01' },
  { id: 'skills', label: 'TECH STACK', number: '02' },
  { id: 'work', label: 'PROJECTS', number: '03' },
  { id: 'architecture', label: 'SYSTEMS', number: '04' },
  { id: 'contact', label: 'CONTACT', number: '05' },
];

export default function ScrollStory() {
  const [activeChapter, setActiveChapter] = useState('home');

  useEffect(() => {
    let cancelled = false;
    let gsapContext = null;
    let observer = null;

    const sections = Array.from(document.querySelectorAll('main > section[id]'));

    // The 3D world camera and chapter rail follow real section anchors rather
    // than guessed percentages, so changing content height stays in sync.
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        const candidates = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aCenter = a.boundingClientRect.top + a.boundingClientRect.height * 0.35;
            const bCenter = b.boundingClientRect.top + b.boundingClientRect.height * 0.35;
            return Math.abs(aCenter - window.innerHeight * 0.48) -
              Math.abs(bCenter - window.innerHeight * 0.48);
          });

        if (candidates[0]) setActiveChapter(candidates[0].target.id);
      }, {
        rootMargin: '-28% 0px -48% 0px',
        threshold: [0, 0.08, 0.2],
      });

      sections.forEach((section) => observer.observe(section));
    }

    const initScrollScenes = async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          gsapContext = gsap.context(() => {
            sections.forEach((section) => {
              if (section.id === 'home') return;

              // Animate the section's content shell, not the individual
              // Framer Motion cards inside it, to avoid transform conflicts.
              const shell = section.querySelector(':scope > .relative.z-10');
              if (!shell) return;

              const travel = window.matchMedia('(min-width: 1024px)').matches ? 52 : 24;
              gsap.fromTo(
                shell,
                { y: travel, autoAlpha: 0.58 },
                {
                  y: 0,
                  autoAlpha: 1,
                  ease: 'none',
                  immediateRender: false,
                  scrollTrigger: {
                    trigger: section,
                    start: 'top 92%',
                    end: 'top 44%',
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                  },
                }
              );
            });
          });

          requestAnimationFrame(() => {
            if (!cancelled) ScrollTrigger.refresh();
          });
        }
      } catch (error) {
        // The portfolio remains fully usable with native scrolling if GSAP
        // cannot load (for example, when a preview sandbox is offline).
        console.warn('Scroll choreography unavailable; using native motion.', error);
      }
    };

    initScrollScenes();

    return () => {
      cancelled = true;
      observer?.disconnect();
      gsapContext?.revert();
    };
  }, []);

  const navigateTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = window.__lenis;

    if (lenis?.scrollTo && !reducedMotion) {
      lenis.scrollTo(target, { offset: -88, duration: 1.35 });
      return;
    }

    target.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <nav
      aria-label="Scroll chapters"
      className="fixed right-5 top-1/2 z-[80] hidden -translate-y-1/2 flex-col items-end gap-2.5 2xl:flex"
    >
      <span className="mb-1 pr-1 font-mono text-[9px] tracking-[0.24em] text-white/35 [writing-mode:vertical-rl]">
        NAVIGATE
      </span>

      {CHAPTERS.map((chapter) => {
        const active = activeChapter === chapter.id;

        return (
          <button
            key={chapter.id}
            type="button"
            title={`${chapter.number} · ${chapter.label}`}
            aria-label={`Scroll to ${chapter.label.toLowerCase()}`}
            aria-current={active ? 'location' : undefined}
            onClick={() => navigateTo(chapter.id)}
            className="group flex min-h-5 items-center justify-end gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-lime-400/70"
          >
            <span
              className={`overflow-hidden whitespace-nowrap font-mono text-[9px] tracking-[0.16em] transition-all duration-300 group-hover:max-w-28 group-hover:opacity-100 group-focus-visible:max-w-28 group-focus-visible:opacity-100 ${active ? 'max-w-24 opacity-100 text-lime-300' : 'max-w-0 opacity-0 text-white/45'}`}
            >
              {chapter.number} / {chapter.label}
            </span>
            <span
              className={`relative grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border transition-all duration-300 ${active ? 'border-lime-300/60 bg-lime-300/10 shadow-[0_0_16px_rgba(163,230,53,0.22)]' : 'border-white/20 bg-black/30 group-hover:border-lime-300/60'}`}
            >
              <span
                className={`rounded-full transition-all duration-300 ${active ? 'h-1.5 w-1.5 bg-lime-300 shadow-[0_0_8px_rgba(163,230,53,0.9)]' : 'h-1 w-1 bg-white/45 group-hover:bg-lime-200'}`}
              />
            </span>
          </button>
        );
      })}
    </nav>
  );
}
