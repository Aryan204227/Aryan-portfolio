import React, { useEffect, useState } from 'react';

const CHAPTERS = [
  { id: 'home', label: 'HOME', number: '00' },
  { id: 'about', label: 'PROFILE', number: '01' },
  { id: 'skills', label: 'TECH STACK', number: '02' },
  { id: 'work', label: 'PROJECTS', number: '03' },
  { id: 'architecture', label: 'SYSTEMS', number: '04' },
  { id: 'github', label: 'GITHUB', number: '05' },
  { id: 'contact', label: 'CONTACT', number: '06' },
];

const SECTION_IDS = [
  'home', 'about', 'expertise', 'skills', 'work', 'architecture',
  'approach', 'education', 'training', 'certificates', 'github', 'contact',
];

const CHAPTER_ALIASES = {
  expertise: 'skills',
  education: 'about',
  training: 'about',
  certificates: 'about',
  approach: 'architecture',
};

const chapterFor = (sectionId) => CHAPTER_ALIASES[sectionId] || sectionId;

export default function ScrollStory() {
  const [activeChapter, setActiveChapter] = useState('home');

  useEffect(() => {
    let cancelled = false;
    let gsapContext = null;
    let activeFrame = 0;
    const addedRules = [];

    // Resolve explicit anchors instead of depending on a particular DOM nesting
    // pattern. This keeps the chapter rail working if a section gains a wrapper.
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((element) => element && element.tagName.toLowerCase() === 'section');

    const updateActiveChapter = () => {
      cancelAnimationFrame(activeFrame);
      activeFrame = requestAnimationFrame(() => {
        const marker = window.innerHeight * 0.38;
        const passed = sections.filter((section) => section.getBoundingClientRect().top <= marker);
        const chosen = passed[passed.length - 1] || sections[0];
        if (!chosen) return;

        const next = chapterFor(chosen.id);
        const nextChapter = CHAPTERS.some((chapter) => chapter.id === next) ? next : 'contact';
        setActiveChapter(nextChapter);

        // The floating right rail and the top navigation share one source of truth.
        window.dispatchEvent(new CustomEvent('portfolio:chapterchange', {
          detail: { sectionId: next },
        }));
      });
    };

    const refreshAnimations = () => {
      updateActiveChapter();
      if (window.ScrollTrigger?.refresh) window.ScrollTrigger.refresh();
    };

    window.addEventListener('scroll', updateActiveChapter, { passive: true });
    window.addEventListener('resize', refreshAnimations, { passive: true });
    window.addEventListener('portfolio:scroll', updateActiveChapter);
    window.addEventListener('portfolio:scroll-engine-ready', refreshAnimations);
    window.addEventListener('load', refreshAnimations, { once: true });
    updateActiveChapter();

    const initScrollScenes = async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);
        window.ScrollTrigger = ScrollTrigger;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        gsapContext = gsap.context(() => {
          sections.forEach((section) => {
            if (section.id === 'home') return;

            // A slightly stronger section entrance gives the page visible depth;
            // scrub keeps it directly tied to the user's scroll position.
            const shell = section.querySelector(':scope > .relative.z-10');
            if (shell && !reducedMotion) {
              gsap.fromTo(
                shell,
                { y: 92, scale: 0.965, autoAlpha: 0.38, filter: 'blur(6px)' },
                {
                  y: 0,
                  scale: 1,
                  autoAlpha: 1,
                  filter: 'blur(0px)',
                  ease: 'none',
                  immediateRender: false,
                  scrollTrigger: {
                    trigger: section,
                    start: 'top 94%',
                    end: 'top 38%',
                    scrub: 0.55,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }

            // Thin lime/cyan scan line shows continuous progress through each section.
            const rule = document.createElement('div');
            rule.className = 'cinematic-section-progress';
            rule.setAttribute('aria-hidden', 'true');
            section.prepend(rule);
            addedRules.push({ section, rule });

            gsap.fromTo(
              rule,
              { scaleX: 0, autoAlpha: 0.25 },
              {
                scaleX: 1,
                autoAlpha: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 94%',
                  end: 'bottom 8%',
                  scrub: 0.35,
                  invalidateOnRefresh: true,
                },
              }
            );

            // Every marked inner card has its own ScrollTrigger. Unlike a one-time
            // whileInView reveal, this reverses smoothly when scrolling back up.
            const reveals = Array.from(section.querySelectorAll('[data-scroll-reveal]'));
            reveals.forEach((element, index) => {
              if (reducedMotion) {
                gsap.fromTo(
                  element,
                  { autoAlpha: 0.72 },
                  {
                    autoAlpha: 1,
                    ease: 'none',
                    immediateRender: false,
                    scrollTrigger: {
                      trigger: element,
                      start: 'top 92%',
                      end: 'top 68%',
                      scrub: 0.25,
                      invalidateOnRefresh: true,
                    },
                  }
                );
                return;
              }

              gsap.fromTo(
                element,
                {
                  y: 64,
                  scale: 0.955,
                  autoAlpha: 0.12,
                  rotateX: 5,
                  filter: 'blur(8px)',
                  transformPerspective: 900,
                  transformOrigin: '50% 100%',
                },
                {
                  y: 0,
                  scale: 1,
                  autoAlpha: 1,
                  rotateX: 0,
                  filter: 'blur(0px)',
                  ease: 'none',
                  immediateRender: false,
                  scrollTrigger: {
                    trigger: element,
                    start: 'top 91%',
                    end: 'top 56%',
                    scrub: 0.48,
                    invalidateOnRefresh: true,
                  },
                }
              );
            });

            // Slow ambient glow drift adds depth without touching the 3D canvas.
            if (!reducedMotion) {
              const glows = section.querySelectorAll(
                ':scope > .absolute.rounded-full, :scope > .absolute.pointer-events-none'
              );
              glows.forEach((glow) => {
                gsap.to(glow, {
                  y: 46,
                  scale: 1.08,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.85,
                    invalidateOnRefresh: true,
                  },
                });
              });
            }
          });
        }, document.querySelector('main') || undefined);

        // Refresh again after images/fonts settle and on subsequent layout changes.
        requestAnimationFrame(() => {
          if (cancelled) return;
          ScrollTrigger.refresh();
          updateActiveChapter();
        });
        window.addEventListener('load', refreshAnimations, { once: true });
      } catch (error) {
        // Native scrolling and active navigation remain available without GSAP.
        console.warn('Scroll choreography unavailable; using native scrolling.', error);
      }
    };

    initScrollScenes();

    return () => {
      cancelled = true;
      cancelAnimationFrame(activeFrame);
      window.removeEventListener('scroll', updateActiveChapter);
      window.removeEventListener('resize', refreshAnimations);
      window.removeEventListener('portfolio:scroll', updateActiveChapter);
      window.removeEventListener('portfolio:scroll-engine-ready', refreshAnimations);
      window.removeEventListener('load', refreshAnimations);
      gsapContext?.revert();
      addedRules.forEach(({ section, rule }) => {
        if (section.contains(rule)) section.removeChild(rule);
      });
      if (window.ScrollTrigger) delete window.ScrollTrigger;
    };
  }, []);

  const navigateTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = window.__lenis;

    if (lenis?.scrollTo && !reducedMotion) {
      lenis.scrollTo(target, { offset: -96, duration: 1.25 });
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
