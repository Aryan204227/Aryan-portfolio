import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Terminal as TerminalIcon, Github, Linkedin, Mail, FileText, ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import TerminalDrawer from '../components/TerminalDrawer';
import Signature3DVisual from '../components/Signature3DVisual';

const { personalInfo, socialLinks } = portfolioData;

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Pointer-responsive lighting on desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const glowY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  const sectionRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (isMobile) return;
    const el = sectionRef.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    el.addEventListener('mousemove', handleMove, { passive: true });
    return () => el.removeEventListener('mousemove', handleMove);
  }, [isMobile, mouseX, mouseY]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between items-center bg-[#07080a] overflow-hidden select-none px-6 pt-32 pb-16"
    >
      {/* ── Interactive Pointer-Responsive Light on Desktop ── */}
      {!isMobile && (
        <motion.div
          className="absolute pointer-events-none rounded-full z-0"
          style={{
            width: 550,
            height: 550,
            x: glowX,
            y: glowY,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, rgba(132,204,22,0.06) 0%, rgba(56,189,248,0.03) 35%, transparent 70%)',
          }}
        />
      )}

      {/* ── Ambient Radial Lighting Top Center ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[500px] pointer-events-none z-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(132,204,22,0.08)_0%,rgba(56,189,248,0.03)_40%,transparent_70%)]" />

      {/* ── Right-Edge Availability Ribbon ── */}
      <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center">
        <div className="side-label flex items-center gap-2 py-3 px-1.5 rounded-full border border-white/10 bg-[#101218]/90 backdrop-blur-md shadow-2xl text-[10px] text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span>AVAILABLE FOR INTERNSHIPS &amp; ROLES</span>
        </div>
      </div>

      {/* ── Top Header / Role Identity Strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="w-full max-w-7xl z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-b border-white/[0.06] pb-6"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-lime-400" />
          <span className="text-xs font-mono tracking-widest text-neutral-300 uppercase">
            B.TECH CSE • LOVELY PROFESSIONAL UNIVERSITY
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-neutral-400">
          <span>CGPA: <strong className="text-lime-400">7.07</strong></span>
          <span>CLASS OF <strong className="text-white">2028</strong></span>
          <button
            onClick={() => setTerminalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
          >
            <TerminalIcon className="w-3.5 h-3.5 text-lime-400" />
            <span>CLI TERMINAL</span>
          </button>
        </div>
      </motion.div>

      {/* ── Main Hero Composition (Asymmetric Editorial + 3D Visual) ── */}
      <div className="relative my-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 py-12">
        
        {/* Left Column (Editorial Typography & Content) — 8 cols */}
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          
          {/* Subtle Monospace Pre-heading */}
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-widest mb-6"
          >
            <span className="text-lime-400">✦</span>
            <span>CREATIVE DEVELOPER &amp; SOFTWARE ENGINEER</span>
          </motion.div>

          {/* Staggered Name Reveal */}
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: 70, opacity: 0, filter: 'blur(12px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
              className="font-black tracking-[-0.03em] font-display text-white text-hero leading-[0.88]"
            >
              ARYAN
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-6">
            <motion.div
              initial={{ y: 70, opacity: 0, filter: 'blur(12px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, delay: 0.38, ease: EASE }}
              className="font-black tracking-[-0.03em] font-display text-hero leading-[0.88]"
              style={{
                WebkitTextStroke: '1.5px rgba(255,255,255,0.7)',
                WebkitTextFillColor: 'transparent',
              }}
            >
              DADWAL
            </motion.div>
          </div>

          {/* Editorial Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.55, ease: EASE }}
            className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl mb-8"
          >
            Building full-stack MERN platforms, AI-driven applications, and algorithmic systems with systematic problem solving and modern engineering standards.
          </motion.p>

          {/* Verified Stack Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-wrap items-center gap-2 mb-10 text-xs font-mono"
          >
            {['MERN STACK', 'JAVA & DSA', 'REST APIS', 'RENDER CLOUD', 'RECURSION / DFS'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-md bg-[#11131a] border border-white/[0.08] text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTAs & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.75, ease: EASE }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-lime-400 text-black font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_30px_rgba(132,204,22,0.35)] hover:bg-lime-300 transition-all"
            >
              <span>EXPLORE PROJECTS</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              href={personalInfo.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#11131a] hover:bg-[#181b24] text-white border border-white/10 hover:border-white/25 text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xl"
            >
              <FileText className="w-4 h-4 text-lime-400" />
              <span>VIEW RESUME</span>
            </motion.a>

            {/* Social Link Quick Row */}
            <div className="flex items-center gap-3 ml-2">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#11131a] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-lime-400/50 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#11131a] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-lime-400/50 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.email}
                className="w-10 h-10 rounded-full bg-[#11131a] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-lime-400/50 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

        </div>

        {/* Right Column (Signature 3D Software Architecture Lattice) — 4 cols */}
        <div className="lg:col-span-4 relative flex items-center justify-center h-[340px] sm:h-[420px] w-full">
          <Signature3DVisual />
        </div>

      </div>

      {/* ── Bottom Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-lime-400" />
        </motion.div>
      </motion.div>

      {/* CLI Terminal Drawer */}
      <TerminalDrawer
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </section>
  );
}
