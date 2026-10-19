import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, Terminal as TerminalIcon,
  Github, Linkedin, Mail, FileText, ChevronDown, MessageCircle,
  ExternalLink, Sparkles
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import TerminalDrawer from '../components/TerminalDrawer';
import TypeWriter from '../components/TypeWriter';

const { personalInfo, socialLinks } = portfolioData;
const EASE = [0.16, 1, 0.3, 1];

function AnimatedWord({ text, delay = 0, className = '' }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: 100, opacity: 0, rotateX: 40 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.92, delay, ease: EASE }}
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

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.85, 0]);

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

  // Authentic reference stats
  const STATS = [
    { value: '02+',   label: 'Major Projects'  },
    { value: 'MERN',  label: 'Tech Stack'      },
    { value: 'AI',    label: 'Interests'       },
    { value: 'DSA',   label: 'Problem Solving' },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative scroll-mt-28 min-h-screen flex flex-col justify-between overflow-hidden select-none px-6 sm:px-10 lg:px-16 pt-28 pb-10"
      style={{ background: 'transparent' }}
    >
      {/* Pointer-responsive subtle glow */}
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
            background: 'radial-gradient(circle, rgba(132,204,22,0.06) 0%, rgba(56,189,248,0.02) 45%, transparent 70%)',
          }}
        />
      )}

      {/* Top subtle ambient halo */}
      <div
        className="absolute top-0 left-1/3 -translate-x-1/2 pointer-events-none z-0"
        style={{
          width: 900,
          height: 400,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(132,204,22,0.08) 0%, transparent 70%)',
        }}
      />

      {/* ── Main Hero Content Grid ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative my-auto w-full max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 lg:py-10"
      >
        {/* Left Column — Editorial Typography (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">

          {/* Academic Credential Tag */}
          <motion.div
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/30 text-[11px] font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(132,204,22,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-lime-300 font-semibold">B.TECH CSE • LOVELY PROFESSIONAL UNIVERSITY</span>
          </motion.div>

          {/* Name Display: ARYAN (white) / DADWAL (neon lime) */}
          <div className="mb-1">
            <AnimatedWord
              text="ARYAN"
              delay={0.16}
              className="font-black tracking-[-0.03em] font-display text-white text-hero leading-[0.88]"
            />
          </div>
          <div className="mb-5">
            <AnimatedWord
              text="DADWAL"
              delay={0.28}
              className="font-black tracking-[-0.03em] font-display text-lime-400 text-hero leading-[0.88] drop-shadow-[0_0_35px_rgba(132,204,22,0.4)]"
            />
          </div>

          {/* Typing subtitle with stable height */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-4 flex items-center"
            style={{ minHeight: '2.2rem' }}
          >
            <span className="text-lg sm:text-2xl font-mono tracking-wide text-neutral-200">
              <TypeWriter />
            </span>
          </motion.div>

          {/* Bio text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.6, ease: EASE }}
            className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl mb-8"
          >
            Building modern web applications, exploring AI, and solving real-world problems through code.
          </motion.p>

          {/* CTAs matching reference */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <motion.a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector('#work');
                if (target) {
                  if (window.__lenis) {
                    window.__lenis.scrollTo(target, { offset: -95, duration: 1.1 });
                  } else {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-lime-400 text-black font-bold text-sm tracking-wide shadow-[0_0_32px_rgba(132,204,22,0.4)] hover:bg-lime-300 transition-all"
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

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.8 }}
            className="flex items-center gap-3"
          >
            {SOCIAL.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-[#0d0f17]/80 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-lime-400/50 hover:shadow-[0_0_15px_rgba(132,204,22,0.25)] transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}

            <button
              onClick={() => setTerminalOpen(true)}
              className="ml-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-lime-400/40 text-[11px] font-mono text-neutral-400 hover:text-lime-300 transition-colors flex items-center gap-1.5"
            >
              <TerminalIcon className="w-3.5 h-3.5 text-lime-400" />
              <span>CLI</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column (5 cols) — Open window framing the real 3D CPU core & metropolis */}
        <div className="lg:col-span-5 hidden lg:flex flex-col items-end justify-center pointer-events-none">
          {/* Subtle HUD corner frame indicating live 3D view */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="w-72 p-5 rounded-2xl bg-[#090d12]/40 border border-white/[0.08] backdrop-blur-[2px] shadow-2xl relative"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-lime-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                CORE TELEMETRY
              </span>
              <span className="text-[9px] font-mono text-neutral-500">64-BIT DUAL TIER</span>
            </div>
            <div className="space-y-1.5 text-[11px] font-mono text-neutral-400">
              <div className="flex justify-between">
                <span>PROCESSOR:</span>
                <span className="text-white font-semibold">AD COMPUTATIONAL CORE</span>
              </div>
              <div className="flex justify-between">
                <span>ARCHITECTURE:</span>
                <span className="text-lime-300">ISOMETRIC 3D METROPOLIS</span>
              </div>
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className="text-lime-400">ONLINE · LIVE FLIGHT</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Bottom Reference Stats Strip (Glass Cards) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.95 }}
        className="w-full max-w-7xl mx-auto z-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/[0.06]"
      >
        <div className="flex flex-wrap items-center gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="px-5 py-2.5 rounded-2xl bg-[#0d1017]/80 border border-white/[0.08] backdrop-blur-md shadow-lg flex items-center gap-3"
            >
              <span className="font-mono text-sm sm:text-base font-bold text-lime-400">
                {s.value}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll down indicator */}
        <div
          onClick={() => {
            const target = document.querySelector('#about');
            if (target) {
              if (window.__lenis) {
                window.__lenis.scrollTo(target, { offset: -95, duration: 1.1 });
              } else {
                target.scrollIntoView({ behavior: 'smooth' });
              }
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
