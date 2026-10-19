import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Terminal as TerminalIcon, Github, Linkedin, Mail, FileText, ChevronDown, MessageCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import TerminalDrawer from '../components/TerminalDrawer';
import UniversePlanet from '../components/UniversePlanet';

const { personalInfo, socialLinks } = portfolioData;

const EASE = [0.16, 1, 0.3, 1];

// Staggered letter animation component
function AnimatedWord({ text, delay = 0, className = '', outlined = false }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: 90, opacity: 0, rotateX: 35 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
        style={outlined ? {
          WebkitTextStroke: '1.5px rgba(255,255,255,0.75)',
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

  // Pointer-responsive ambient light
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 50, damping: 22 });
  const glowY = useSpring(mouseY, { stiffness: 50, damping: 22 });

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

  const META_ITEMS = [
    'B.TECH CSE',
    'LPU PHAGWARA',
    'CGPA 7.07',
    'FULL STACK',
    'JAVA + DSA',
  ];

  const SOCIAL = [
    { href: socialLinks.github,    Icon: Github,        label: 'GitHub'    },
    { href: socialLinks.linkedin,  Icon: Linkedin,      label: 'LinkedIn'  },
    { href: socialLinks.email,     Icon: Mail,          label: 'Email'     },
    { href: personalInfo.whatsAppUrl, Icon: MessageCircle, label: 'WhatsApp' },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between items-center bg-[#07080a] overflow-hidden select-none px-6 pt-28 pb-12"
    >
      {/* ── Pointer-responsive ambient glow ── */}
      {!isMobile && (
        <motion.div
          className="absolute pointer-events-none rounded-full z-0"
          style={{
            width: 640,
            height: 640,
            x: glowX,
            y: glowY,
            translateX: '-50%',
            translateY: '-50%',
            background:
              'radial-gradient(circle, rgba(132,204,22,0.055) 0%, rgba(56,189,248,0.025) 40%, transparent 70%)',
          }}
        />
      )}

      {/* ── Top ambient radial at center ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(132,204,22,0.07) 0%, rgba(56,189,248,0.025) 35%, transparent 65%)' }}
      />

      {/* ── Planet edge ambient glow (right side on desktop) ── */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[520px] h-[520px] pointer-events-none z-0 hidden lg:block"
        style={{ background: 'radial-gradient(ellipse at 100% 50%, rgba(132,204,22,0.06) 0%, transparent 60%)' }}
      />

      {/* ── Availability ribbon ── */}
      <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center">
        <div className="flex items-center gap-2 py-3 px-1.5 rounded-full border border-white/10 bg-[#101218]/90 backdrop-blur-md shadow-2xl text-[10px] text-neutral-400"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '0.12em' }}>
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span>AVAILABLE FOR INTERNSHIPS &amp; ROLES</span>
        </div>
      </div>

      {/* ── Top identity strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="w-full max-w-7xl z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-lime-400" />
          <span className="text-[11px] font-mono tracking-widest text-neutral-300 uppercase">
            B.TECH CSE · LOVELY PROFESSIONAL UNIVERSITY
          </span>
        </div>
        <div className="flex items-center gap-6 text-[11px] font-mono text-neutral-400">
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

      {/* ── Main hero composition ── */}
      <div className="relative my-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center z-10 py-10 lg:py-14">

        {/* Left — editorial typography (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-[11px] font-mono uppercase tracking-widest mb-7"
          >
            <span className="text-lime-400">✦</span>
            <span>CREATIVE DEVELOPER &amp; SOFTWARE ENGINEER</span>
          </motion.div>

          {/* Giant name — ARYAN solid, DADWAL outlined */}
          <div className="mb-6">
            <AnimatedWord
              text="ARYAN"
              delay={0.22}
              className="font-black tracking-[-0.03em] font-display text-white text-hero leading-[0.88]"
            />
            <AnimatedWord
              text="DADWAL"
              delay={0.37}
              outlined
              className="font-black tracking-[-0.03em] font-display text-hero leading-[0.88]"
            />
          </div>

          {/* Role subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.52, ease: EASE }}
            className="text-sm sm:text-base font-mono tracking-widest text-lime-400 uppercase mb-4"
          >
            Full Stack Developer
          </motion.div>

          {/* Editorial bio */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.62, ease: EASE }}
            className="text-base sm:text-[1.05rem] text-neutral-300 font-light leading-relaxed max-w-lg mb-8"
          >
            Building full-stack MERN platforms, AI-driven applications, and algorithmic systems
            with systematic problem solving and modern engineering standards.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.75, ease: EASE }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <motion.a
              href="#work"
              onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-lime-400 text-black font-bold text-sm tracking-wide shadow-[0_0_32px_rgba(132,204,22,0.38)] hover:bg-lime-300 transition-all"
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
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#11131a] hover:bg-[#181b24] text-white border border-white/10 hover:border-lime-400/30 text-sm font-semibold tracking-wide transition-all shadow-xl"
            >
              <FileText className="w-4 h-4 text-lime-400" />
              <span>VIEW RESUME</span>
            </motion.a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.88 }}
            className="flex items-center gap-3"
          >
            {SOCIAL.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-[#11131a] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-lime-400/40 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right — 3D Universe Planet (5 cols) */}
        <div className="lg:col-span-5 relative flex items-center justify-center h-[320px] sm:h-[400px] lg:h-[520px] w-full">
          <UniversePlanet className="w-full h-full" />
        </div>

      </div>

      {/* ── Bottom metadata strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.0 }}
        className="w-full max-w-7xl z-10 border-t border-white/[0.05] pt-4 flex flex-wrap items-center gap-x-0 gap-y-2"
      >
        {META_ITEMS.map((item, i) => (
          <React.Fragment key={item}>
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase px-4">
              {item}
            </span>
            {i < META_ITEMS.length - 1 && (
              <span className="h-3 w-px bg-white/10" />
            )}
          </React.Fragment>
        ))}
        <span className="h-3 w-px bg-white/10" />
        <span className="text-[10px] font-mono tracking-widest text-lime-400 uppercase px-4 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse inline-block" />
          AVAILABLE
        </span>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.15 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 cursor-pointer"
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

      {/* CLI Terminal Drawer */}
      <TerminalDrawer isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </section>
  );
}
