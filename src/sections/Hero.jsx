import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, Terminal as TerminalIcon,
  Github, Linkedin, Mail, FileText, ChevronDown, MessageCircle
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import TerminalDrawer from '../components/TerminalDrawer';

const { personalInfo, socialLinks } = portfolioData;
const EASE = [0.16, 1, 0.3, 1];

// ─── Typing hook ─────────────────────────────────────────────────────────────
// Returns { display, done }. Starts when `active` is true.
function useTyping(text, speed = 75, active = true) {
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    setDisplay('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplay(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active]);

  return { display, done };
}

// ─── Looping subtitle typewriter ─────────────────────────────────────────────
const SUBTITLE_PHRASES = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'Java & DSA Enthusiast',
  'AI Project Developer',
];

function LoopingTypeWriter() {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [phraseIdx, setPhraseIdx] = useState(0);
  const [display, setDisplay]   = useState('');
  const [deleting, setDeleting] = useState(false);
  const [cursor, setCursor]     = useState(true);

  // Cursor blink
  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => setCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, [prefersReduced]);

  useEffect(() => {
    if (prefersReduced) {
      setDisplay(SUBTITLE_PHRASES[0]);
      return;
    }
    const phrase = SUBTITLE_PHRASES[phraseIdx];

    if (!deleting && display.length < phrase.length) {
      const id = setTimeout(
        () => setDisplay(phrase.slice(0, display.length + 1)),
        55 + Math.random() * 50
      );
      return () => clearTimeout(id);
    }
    if (!deleting && display.length === phrase.length) {
      const id = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(id);
    }
    if (deleting && display.length > 0) {
      const id = setTimeout(
        () => setDisplay(phrase.slice(0, display.length - 1)),
        35
      );
      return () => clearTimeout(id);
    }
    if (deleting && display.length === 0) {
      const id = setTimeout(() => {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % SUBTITLE_PHRASES.length);
      }, 350);
      return () => clearTimeout(id);
    }
  }, [display, deleting, phraseIdx, prefersReduced]);

  if (prefersReduced) {
    return <span className="text-lime-400 font-semibold">{SUBTITLE_PHRASES[0]}</span>;
  }

  return (
    <span className="inline-flex items-center">
      <span className="text-lime-400 font-semibold">{display}</span>
      <span
        className="ml-0.5 inline-block w-[2px] rounded-full bg-lime-400"
        style={{
          height: '1.1em',
          opacity: cursor ? 1 : 0,
          transition: 'opacity 0.08s',
          verticalAlign: 'middle',
        }}
        aria-hidden="true"
      />
    </span>
  );
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
export default function Hero() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const sectionRef = useRef(null);
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Pointer light ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX  = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const glowY  = useSpring(mouseY, { stiffness: 45, damping: 22 });

  useEffect(() => {
    if (isMobile) return;
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    el.addEventListener('mousemove', onMove, { passive: true });
    return () => el.removeEventListener('mousemove', onMove);
  }, [isMobile, mouseX, mouseY]);

  // ── Scroll parallax ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY       = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.85, 0]);

  // ── Typing sequence ──
  // Phase 1: type name. Phase 2 (after name done): type title once. Phase 3: looping subtitle.
  const nameTyping  = useTyping('ARYAN DADWAL', 80, !prefersReduced);
  const nameDone    = prefersReduced || nameTyping.done;
  const titleTyping = useTyping('FULL STACK DEVELOPER', 70, nameDone && !prefersReduced);
  const titleDone   = prefersReduced || titleTyping.done;

  // ── Social links ──
  const SOCIAL = [
    { href: socialLinks.github,       Icon: Github,        label: 'GitHub'   },
    { href: socialLinks.linkedin,     Icon: Linkedin,      label: 'LinkedIn' },
    { href: socialLinks.email,        Icon: Mail,          label: 'Email'    },
    { href: personalInfo.whatsAppUrl, Icon: MessageCircle, label: 'WhatsApp' },
  ];

  const STATS = [
    { value: String(portfolioData.projects.length).padStart(2, '0'), label: 'Projects' },
    { value: 'MERN', label: 'Tech Stack' },
    { value: 'AI',   label: 'Interests' },
    { value: 'DSA',  label: 'Problem Solving' },
  ];

  // Blinking cursor shown while name is still typing
  const [nameCursor, setNameCursor] = useState(true);
  useEffect(() => {
    if (nameDone) return;
    const id = setInterval(() => setNameCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, [nameDone]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative scroll-mt-28 min-h-screen flex flex-col justify-between overflow-hidden select-none px-6 sm:px-10 lg:px-16 pt-28 pb-10"
      style={{ background: 'transparent' }}
    >
      {/* Pointer-reactive ambient glow */}
      {!isMobile && (
        <motion.div
          className="absolute pointer-events-none rounded-full z-0"
          style={{
            width: 650,
            height: 650,
            x: glowX,
            y: glowY,
            translateX: '-50%',
            translateY: '-50%',
            background:
              'radial-gradient(circle, rgba(132,204,22,0.06) 0%, rgba(56,189,248,0.015) 50%, transparent 70%)',
          }}
        />
      )}

      {/* ── Main content grid ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative my-auto w-full max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 lg:py-10"
      >
        {/* Left column — typography */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/30 text-[11px] font-mono uppercase tracking-widest mb-8 shadow-[0_0_15px_rgba(132,204,22,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-lime-300 font-semibold">B.TECH CSE • LOVELY PROFESSIONAL UNIVERSITY</span>
          </motion.div>

          {/* ── NAME — always on its own row, never overlaps title ── */}
          <div className="mb-3 w-full">
            <h1 className="font-black text-white tracking-tight leading-none"
                style={{ fontSize: 'clamp(42px, 8vw, 92px)', lineHeight: 1 }}>
              {prefersReduced ? 'ARYAN DADWAL' : (
                <>
                  {nameTyping.display}
                  {!nameDone && (
                    <span
                      className="inline-block w-[3px] rounded-full bg-white ml-1"
                      style={{ height: '0.85em', opacity: nameCursor ? 1 : 0, verticalAlign: 'baseline' }}
                      aria-hidden="true"
                    />
                  )}
                </>
              )}
            </h1>
          </div>

          {/* ── TITLE — its own row, shows ONLY after name finishes ── */}
          <div className="mb-6 w-full" style={{ minHeight: 'clamp(40px, 7vw, 84px)' }}>
            {nameDone && (
              <h2
                className="font-black text-lime-400 tracking-tight leading-none drop-shadow-[0_0_30px_rgba(132,204,22,0.4)]"
                style={{ fontSize: 'clamp(36px, 6.5vw, 80px)', lineHeight: 1 }}
              >
                {prefersReduced ? 'FULL STACK DEVELOPER' : (
                  <>
                    {titleTyping.display}
                    {!titleDone && (
                      <span
                        className="inline-block w-[3px] rounded-full bg-lime-400 ml-1"
                        style={{ height: '0.85em', opacity: 1, verticalAlign: 'baseline' }}
                        aria-hidden="true"
                      />
                    )}
                  </>
                )}
              </h2>
            )}
          </div>

          {/* ── Looping subtitle — shows only after title finishes ── */}
          {titleDone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 flex items-center"
              style={{ minHeight: '2rem' }}
            >
              <span className="text-base sm:text-xl font-mono tracking-wide text-neutral-300">
                <LoopingTypeWriter />
              </span>
            </motion.div>
          )}

          {/* Bio paragraph */}
          {titleDone && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-xl mb-8"
            >
              Building modern web applications, exploring AI, and solving real-world problems through code.
            </motion.p>
          )}

          {/* CTA buttons */}
          {titleDone && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <motion.a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector('#work');
                  if (target) {
                    window.__lenis
                      ? window.__lenis.scrollTo(target, { offset: -95, duration: 1.1 })
                      : target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-lime-400 text-black font-bold text-sm tracking-wide shadow-[0_0_28px_rgba(132,204,22,0.35)] hover:bg-lime-300 transition-all"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                href={personalInfo.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d0f17]/90 hover:bg-[#181b24] text-white border border-white/15 hover:border-lime-400/40 text-sm font-semibold tracking-wide transition-all shadow-lg backdrop-blur-sm"
              >
                <FileText className="w-4 h-4 text-lime-400" />
                <span>View Resume</span>
              </motion.a>
            </motion.div>
          )}

          {/* Social links + CLI button */}
          {titleDone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3"
            >
              {SOCIAL.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-[#0d0f17]/80 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-lime-400/50 hover:shadow-[0_0_14px_rgba(132,204,22,0.25)] transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}

              <button
                onClick={() => setTerminalOpen(true)}
                className="ml-1 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-lime-400/40 text-[11px] font-mono text-neutral-400 hover:text-lime-300 transition-colors flex items-center gap-1.5"
              >
                <TerminalIcon className="w-3.5 h-3.5 text-lime-400" />
                <span>CLI</span>
              </button>
            </motion.div>
          )}
        </div>

        {/* Right column — transparent, lets 3D canvas show through */}
        <div className="lg:col-span-5 hidden lg:block pointer-events-none" aria-hidden="true" />
      </motion.div>

      {/* ── Bottom metadata strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="w-full max-w-7xl mx-auto z-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/[0.06]"
      >
        <div className="flex flex-wrap items-center gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="px-5 py-2.5 rounded-2xl bg-[#0d1017]/85 border border-white/[0.08] backdrop-blur-md shadow-lg flex items-center gap-3"
            >
              <span className="font-mono text-sm sm:text-base font-bold text-lime-400">{s.value}</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Scroll arrow */}
        <div
          onClick={() => {
            const target = document.querySelector('#about');
            if (target) {
              window.__lenis
                ? window.__lenis.scrollTo(target, { offset: -95, duration: 1.1 })
                : target.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2 cursor-pointer text-neutral-400 hover:text-lime-300 transition-colors"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-lime-400" />
          </motion.div>
        </div>
      </motion.div>

      <TerminalDrawer isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </section>
  );
}
