import React, { useEffect, useState } from 'react';

const CHAPTERS = [
  { id: 'home', label: 'HOME', number: '00' },
  { id: 'about', label: 'PROFILE', number: '01' },
  { id: 'skills', label: 'TECH STACK', number: '02' },
  { id: 'work', label: 'PROJECTS', number: '03' },
  { id: 'architecture', label: 'SYSTEMS', number: '04' },
  { id: 'contact', label: 'CONTACT', number: '05' },
];

const CHAPTER_ALIASES = {
  expertise: 'skills',
  education: 'about',
  training: 'about',
  certificates: 'about',
  approach: 'architecture',
  github: 'contact',
};

const chapterFor = (sectionId) => CHAPTER_ALIASES[sectionId] || sectionId;

export default function ScrollStory() {
  const [activeChapter, setActiveChapter] = useState('home');

  useEffect(() => {
    let cancelled = false;
    let gsapContext = null;
    let activeFrame = 0;
    const addedRules = [];
    const sections = Array.from(document.querySelectorAll('main > section[id]'));

    // Determine the current chapter from the section crossing a fixed reading
    // line. This stays correct even for very tall sections and fast scrolls.
    const updateActiveChapter = () => {
      cancelAnimationFrame(activeFrame);
      activeFrame = requestAnimationFrame(() => {
        const marker = window.innerHeight * 0.43;
        let chosen = null;
        let chosenDistance = Number.POSITIVE_INFINITY;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const distance = marker < rect.top
            ? rect.top - marker
            : marker > rect.bottom
              ? marker - rect.bottom
              : 0;

          if (distance < chosenDistance) {
            chosen = section;
            chosenDistance = distance;
          }
        });

        if (chosen) {
          const next = chapterFor(chosen.id);
          setActiveChapter(CHAPTERS.some((chapter) => chapter.id === next) ? next : 'contact');
        }
      });
    };

    window.addEventListener('scroll', updateActiveChapter, { passive: true });
    window.addEventListener('resize', updateActiveChapter, { passive: true });
    updateActiveChapter();

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

              // Main section enters with a controlled cinematic rise instead
              // of an abrupt one-time fade. Scrubbing makes it follow the wheel.
              const shell = section.querySelector(':scope > .relative.z-10');
              if (shell) {
                gsap.fromTo(
                  shell,
                  { y: 68, scale: 0.988, autoAlpha: 0.62 },
                  {
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                    ease: 'none',
                    immediateRender: false,
                    scrollTrigger: {
                      trigger: section,
                      start: 'top 94%',
                      end: 'top 48%',
                      scrub: 0.72,
                      invalidateOnRefresh: true,
                    },
                  }
                );
              }

              // A luminous scan rule fills across the width while a section is
              // traversed, giving the page a coherent motion language.
              const rule = document.createElement('div');
              rule.className = 'cinematic-section-progress';
              rule.setAttribute('aria-hidden', 'true');
              section.prepend(rule);
              addedRules.push({ section, rule });

              gsap.fromTo(
                rule,
                { scaleX: 0, autoAlpha: 0.32 },
                {
                  scaleX: 1,
                  autoAlpha: 0.95,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: section,
                    start: 'top 92%',
                    end: 'bottom 12%',
                    scrub: 0.45,
                    invalidateOnRefresh: true,
                  },
                }
              );

              // Ambient light pools shift at a slower rate than content, adding
              // depth without moving or repainting the fixed Three.js canvas.
              const glows = section.querySelectorAll(
                ':scope > .absolute.rounded-full, :scope > .absolute.pointer-events-none'
              );
              glows.forEach((glow) => {
                gsap.to(glow, {
                  y: 54,
                  scale: 1.08,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.9,
                    invalidateOnRefresh: true,
                  },
                });
              });

              // Cards marked explicitly avoid fighting with Framer Motion's
              // existing hover and entrance transforms elsewhere on the page.
              const reveals = Array.from(section.querySelectorAll('[data-scroll-reveal]'));
              if (reveals.length) {
                gsap.fromTo(
                  reveals,
                  {
                    autoAlpha: 0,
                    y: 34,
                    scale: 0.965,
                    rotateX: 4,
                    transformPerspective: 900,
                    transformOrigin: '50% 100%',
                  },
                  {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    stagger: 0.095,
                    ease: 'power2.out',
                    immediateRender: false,
                    scrollTrigger: {
                      trigger: reveals[0],
                      start: 'top 92%',
                      end: 'top 46%',
                      scrub: 0.6,
                      invalidateOnRefresh: true,
                    },
                  }
                );
              }
            });
          }, document.querySelector('main'));

          requestAnimationFrame(() => {
            if (!cancelled) ScrollTrigger.refresh();
          });
        }
      } catch (error) {
        // Native scroll remains usable if GSAP cannot load in the current host.
        console.warn('Scroll choreography unavailable; using native scrolling.', error);
      }
    };

    initScrollScenes();

    return () => {
      cancelled = true;
      cancelAnimationFrame(activeFrame);
      window.removeEventListener('scroll', updateActiveChapter);
      window.removeEventListener('resize', updateActiveChapter);
      gsapContext?.revert();
      addedRules.forEach(({ section, rule }) => {
        if (section.contains(rule)) section.removeChild(rule);
      });
    };
  }, []);

  const navigateTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = window.__lenis;

    if (lenis?.scrollTo && !reducedMotion) {
      lenis.scrollTo(target, { offset: -88, duration: 1.38 });
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
