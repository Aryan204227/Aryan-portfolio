import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, Terminal as TerminalIcon,
  Github, Linkedin, Mail, FileText, ChevronDown, MessageCircle
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import TerminalDrawer from '../components/TerminalDrawer';
import TypeWriter from '../components/TypeWriter';

const { personalInfo, socialLinks } = portfolioData;
const EASE = [0.16, 1, 0.3, 1];

// One-time reveal for "ARYAN" and "DADWAL"
function AnimatedWord({ text, delay = 0, outlined = false, className = '' }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: 100, opacity: 0, rotateX: 40 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.92, delay, ease: EASE }}
        style={outlined ? {
          WebkitTextStroke: '1.5px rgba(255,255,255,0.8)',
          WebkitTextFillColor: 'transparent',
        } : undefined}
        className={className}
      >
        {text}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  const sectionRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  // Pointer light
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const glowY = useSpring(mouseY, { stiffness: 45, damping: 22 });

  // Scroll parallax — text fades up, content shifts
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.85, 0]);

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

  const SOCIAL = [
    { href: socialLinks.github,        Icon: Github,        label: 'GitHub'    },
    { href: socialLinks.linkedin,      Icon: Linkedin,      label: 'LinkedIn'  },
    { href: socialLinks.email,         Icon: Mail,          label: 'Email'     },
    { href: personalInfo.whatsAppUrl,  Icon: MessageCircle, label: 'WhatsApp'  },
  ];

  const META = [
    { label: 'B.TECH CSE', value: null },
    { label: 'LPU',        value: null },
    { label: 'CGPA',       value: '7.07' },
    { label: 'MERN',       value: 'Tech Stack' },
    { label: 'AI',         value: 'Interests' },
    { label: 'DSA',        value: 'Problem Solving' },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between items-center overflow-hidden select-none px-6 pt-28 pb-8"
      style={{ background: 'transparent' }}
    >
      {/* Pointer-responsive ambient glow */}
      {!isMobile && (
        <motion.div
          className="absolute pointer-events-none rounded-full z-0"
          style={{
            width: 700,
            height: 700,
            x: glowX,
            y: glowY,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, rgba(132,204,22,0.07) 0%, rgba(56,189,248,0.025) 45%, transparent 72%)',
          }}
        />
      )}

      {/* Top ambient light halo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        style={{
          width: 900,
          height: 420,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(132,204,22,0.1) 0%, rgba(56,189,248,0.03) 38%, transparent 68%)',
        }}
      />

      {/* ── Top identity strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="w-full max-w-7xl z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-5"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-neutral-300 uppercase">
            B.TECH CSE · LOVELY PROFESSIONAL UNIVERSITY
          </span>
        </div>
        <div className="flex items-center gap-6 text-[11px] font-mono text-neutral-400">
          <span>CGPA: <strong className="text-lime-400">7.07</strong></span>
          <span>CLASS OF <strong className="text-white">2028</strong></span>
          <button
            onClick={() => setTerminalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 hover:text-lime-300 transition-colors"
          >
            <TerminalIcon className="w-3.5 h-3.5 text-lime-400" />
            <span>CLI TERMINAL</span>
          </button>
        </div>
      </motion.div>

      {/* ── Main hero content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative my-auto w-full max-w-7xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8 lg:py-12"
      >
        {/* Left — all editorial text (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">

          {/* Credential badge */}
          <motion.div
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/30 text-[11px] font-mono uppercase tracking-widest mb-7"
          >
            <span className="text-lime-400">◈</span>
            <span className="text-lime-300">B.TECH CSE · LOVELY PROFESSIONAL UNIVERSITY</span>
          </motion.div>

          {/* ARYAN / DADWAL */}
          <div className="mb-2">
            <AnimatedWord
              text="ARYAN"
              delay={0.18}
              className="font-black tracking-[-0.03em] font-display text-white text-hero leading-[0.88]"
            />
          </div>
          <div className="mb-5">
            <AnimatedWord
              text="DADWAL"
              delay={0.32}
              outlined
              className="font-black tracking-[-0.03em] font-display text-hero leading-[0.88]"
            />
          </div>

          {/* Typing subtitle — guaranteed minimum height to prevent layout shift */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mb-5"
            style={{ minHeight: '2.1rem' }}
          >
            <span className="text-lg sm:text-xl font-mono tracking-wide text-neutral-200">
              <TypeWriter />
            </span>
          </motion.div>

          {/* Bio paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.65, ease: EASE }}
            className="text-base text-neutral-400 font-light leading-relaxed max-w-lg mb-9"
          >
            Building modern web applications, exploring AI, and solving real-world problems
            through code. Full-stack MERN developer with a strong foundation in Java &amp; DSA.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.78, ease: EASE }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <motion.a
              href="#work"
              onClick={e => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-lime-400 text-black font-bold text-sm tracking-wide shadow-[0_0_32px_rgba(132,204,22,0.4)] hover:bg-lime-300 transition-all"
            >
              <span>EXPLORE PROJECTS</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              href={personalInfo.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d0f17] hover:bg-[#181b24] text-white border border-white/10 hover:border-lime-400/40 text-sm font-semibold tracking-wide transition-all"
            >
              <FileText className="w-4 h-4 text-lime-400" />
              <span>VIEW RESUME</span>
            </motion.a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.9 }}
            className="flex items-center gap-3"
          >
            {SOCIAL.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-[#0d0f17] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-lime-400/50 hover:shadow-[0_0_12px_rgba(132,204,22,0.22)] transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right — purely decorative engineering world hint panel (5 cols) */}
        <div className="lg:col-span-5 flex items-center justify-center">
          {/* AD Monogram panel — glowing computed focal point */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
            className="relative flex items-center justify-center"
          >
            {/* Outer ring */}
            <div
              className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-lime-400/20 animate-spin"
              style={{ animationDuration: '18s' }}
            />
            <div
              className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-lime-400/15 animate-spin"
              style={{ animationDuration: '12s', animationDirection: 'reverse' }}
            />
            {/* AD Core */}
            <div
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl flex items-center justify-center border border-lime-500/50"
              style={{
                background: 'linear-gradient(135deg, #0a1a0a, #0d2010)',
                boxShadow: '0 0 40px rgba(132,204,22,0.35), inset 0 0 24px rgba(132,204,22,0.1)',
              }}
            >
              <span
                className="font-black text-5xl sm:text-6xl tracking-[-0.06em]"
                style={{
                  background: 'linear-gradient(135deg, #84cc16, #a3e635)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AD
              </span>
            </div>
            {/* Orbital dots */}
            {[0, 90, 180, 270].map(deg => (
              <div
                key={deg}
                className="absolute w-2 h-2 rounded-full bg-lime-400"
                style={{
                  transform: `rotate(${deg}deg) translateX(130px)`,
                  boxShadow: '0 0 6px rgba(132,204,22,0.8)',
                  animation: `spin ${10 + deg * 0.02}s linear infinite`,
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Bottom stats strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.05 }}
        className="w-full max-w-7xl z-10 border-t border-white/[0.05] pt-4 flex flex-wrap items-center gap-y-2"
      >
        {META.map((m, i) => (
          <React.Fragment key={m.label}>
            <div className="flex flex-col items-center px-4">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                {m.label}
              </span>
              {m.value && (
                <span className="text-[11px] font-semibold text-neutral-200 uppercase tracking-wide">
                  {m.value}
                </span>
              )}
            </div>
            {i < META.length - 1 && <span className="h-6 w-px bg-white/[0.08]" />}
          </React.Fragment>
        ))}
        <span className="h-6 w-px bg-white/[0.08]" />
        <div className="flex items-center gap-1.5 px-4">
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-lime-400 uppercase">AVAILABLE</span>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-lime-400" />
        </motion.div>
      </motion.div>

      <TerminalDrawer isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </section>
  );
}
