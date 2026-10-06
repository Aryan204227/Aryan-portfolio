import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Terminal as TerminalIcon } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import TerminalDrawer from '../components/TerminalDrawer';
import FloatingTechOrbit from '../components/FloatingTechOrbit';

const { personalInfo, socialLinks } = portfolioData;

// Floating particle component — GPU-only (transform/opacity)
function Particle({ x, y, size, delay, duration }) {
  return (
    <motion.div
      className="absolute rounded-full bg-orange-500/20 pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      animate={{ y: [0, -18, 0], opacity: [0.15, 0.45, 0.15] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

const PARTICLES = [
  { x: 12, y: 20, size: 3, delay: 0, duration: 4.2 },
  { x: 85, y: 15, size: 2, delay: 1.1, duration: 5.5 },
  { x: 70, y: 70, size: 4, delay: 0.6, duration: 3.8 },
  { x: 30, y: 80, size: 2, delay: 2, duration: 6 },
  { x: 55, y: 35, size: 2.5, delay: 0.3, duration: 4.8 },
  { x: 92, y: 55, size: 3, delay: 1.8, duration: 5.2 },
  { x: 8, y: 60, size: 2, delay: 0.9, duration: 4.4 },
];

// Easing for hero entry
const EASE = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.75, delay, ease: EASE },
});

export default function Hero() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Mouse-follow glow (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const glowY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  const sectionRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (isMobile) return;
    const el = sectionRef.current;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, [isMobile]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between items-center bg-[#0a0a0a] overflow-hidden select-none px-6 pt-32 pb-16"
    >
      {/* ── Mouse-follow glow (desktop) ── */}
      {!isMobile && (
        <motion.div
          className="absolute pointer-events-none rounded-full z-0"
          style={{
            width: 500,
            height: 500,
            x: glowX,
            y: glowY,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)',
          }}
        />
      )}

      {/* ── Floating Particles (subtle, GPU only) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
        {PARTICLES.slice(0, isMobile ? 3 : 7).map((p, i) => (
          <Particle key={i} {...p} />
        ))}
        {/* Static subtle dots */}
        <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-white/20 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/15 rounded-full" />
        <div className="absolute bottom-1/3 right-1/5 w-1 h-1 bg-white/10 rounded-full" />
      </div>

      {/* ── Floating Technology Ecosystem Orbit ── */}
      <FloatingTechOrbit />

      {/* ── Moving orange gradient ── */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.07) 0%, transparent 65%)',
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Right-Edge Availability Badge ── */}
      <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden sm:flex items-center">
        <div className="side-label flex items-center gap-2 py-3 px-1.5 rounded-full border border-white/10 bg-[#121212]/80 backdrop-blur-md shadow-xl text-[10px] text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>AVAILABLE FOR OPPORTUNITY</span>
        </div>
      </div>

      {/* ── Top Left Identity ── */}
      <motion.div
        {...fadeUp(0.1)}
        className="w-full max-w-7xl z-10 pt-6"
      >
        <div className="text-[11px] sm:text-xs font-mono tracking-widest text-neutral-400 uppercase leading-relaxed max-w-xs">
          <span className="text-white font-semibold">ARYAN DADWAL</span> •<br />
          B.TECH CSE STUDENT<br />
          FULL STACK DEVELOPER<br />
          LPU PHAGWARA
        </div>
      </motion.div>

      {/* ── Center: Giant Title + Social Icons ── */}
      <div className="relative my-auto flex flex-col items-center justify-center text-center z-10 w-full max-w-6xl py-8">

        {/* Floating LinkedIn */}
        <motion.a
          href={socialLinks.linkedin}
          target="_blank" rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.28, scale: 1 }}
          whileHover={{ opacity: 0.9, scale: 1.12, y: -3 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="absolute -left-2 sm:left-4 lg:left-12 top-1/3 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer z-20"
          aria-label="LinkedIn"
        >
          <svg className="w-11 h-11 sm:w-14 sm:h-14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </motion.a>

        {/* Floating GitHub */}
        <motion.a
          href={socialLinks.github}
          target="_blank" rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.28, scale: 1 }}
          whileHover={{ opacity: 0.9, scale: 1.12, y: -3 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="absolute -right-2 sm:right-8 lg:right-16 top-1/6 text-neutral-400 hover:text-white cursor-pointer z-20"
          aria-label="GitHub"
        >
          <svg className="w-11 h-11 sm:w-14 sm:h-14" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        </motion.a>

        {/* Main Title — staggered line-by-line with blur */}
        <div className="font-extrabold tracking-tight font-display text-white" aria-label="Full Stack Developer">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 60, opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
              className="leading-[0.88] text-white"
              style={{ fontSize: 'clamp(52px, 11vw, 138px)' }}
            >
              FULL STACK
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 60, opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.38, ease: EASE }}
              className="leading-[0.88] text-white mt-1"
              style={{ fontSize: 'clamp(52px, 11vw, 138px)' }}
            >
              DEVELOPER
            </motion.div>
          </div>
        </div>

        {/* Honest subtitle */}
        <motion.p
          {...fadeUp(0.55)}
          className="mt-5 text-sm sm:text-base text-neutral-400 font-light tracking-wide max-w-lg text-center"
        >
          Building modern web applications, AI-focused projects and practical software solutions.
        </motion.p>

        {/* Identity metadata row */}
        <motion.div
          {...fadeUp(0.65)}
          className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-mono tracking-widest text-neutral-500 uppercase"
        >
          <span>B.Tech CSE</span>
          <span className="text-orange-500/50">•</span>
          <span>LPU</span>
          <span className="text-orange-500/50">•</span>
          <span>MERN</span>
          <span className="text-orange-500/50">•</span>
          <span>Java</span>
          <span className="text-orange-500/50">•</span>
          <span>DSA</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.75)}
          className="mt-9 z-20 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#work"
            onClick={e => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full btn-orange text-xs sm:text-sm font-bold tracking-wide shadow-[0_0_24px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.55)] transition-shadow duration-300"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
          </motion.a>

          <motion.a
            href={personalInfo.resumePdf}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#141416] text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/15 hover:border-orange-500/50 shadow-lg transition-all duration-300"
            title="View Resume PDF"
          >
            <span>View Resume</span>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-orange-400 group-hover:translate-x-1.5 transition-all duration-200" />
          </motion.a>
        </motion.div>
      </div>

      {/* ── Bottom Right Tagline ── */}
      <motion.div
        {...fadeUp(0.45)}
        className="w-full max-w-7xl flex justify-end items-end pb-4 z-10"
      >
        <div className="text-[11px] sm:text-xs font-mono tracking-widest text-neutral-400 uppercase leading-relaxed text-right max-w-xs">
          BUILDING REACT APPS,<br />
          REST APIS &amp; JAVA<br />
          PROJECTS FROM SCRATCH.
        </div>
      </motion.div>

      {/* ── Orange Planetary Arc ── */}
      <div className="absolute bottom-0 left-0 right-0 h-44 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[-180px] w-[140%] max-w-[1500px] h-[280px] rounded-[100%] border-t border-orange-500/70"
          style={{ boxShadow: '0 -8px 45px rgba(249,115,22,0.65), 0 -2px 10px rgba(255,255,255,0.5)' }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[-50px] w-[100%] max-w-[1100px] h-[160px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(249,115,22,0.45) 0%, rgba(234,88,12,0.18) 50%, transparent 80%)',
            filter: 'blur(16px)',
          }}
        />
      </div>

      {/* ── Terminal Button ── */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          onClick={() => setTerminalOpen(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="w-12 h-12 rounded-full bg-[#121214]/90 border border-white/10 hover:border-orange-500/50 shadow-2xl backdrop-blur-xl flex items-center justify-center text-neutral-300 hover:text-orange-400 transition-colors"
          title="Open Developer CLI"
          aria-label="Open Terminal"
        >
          <TerminalIcon className="w-5 h-5" />
        </motion.button>
      </div>

      <TerminalDrawer isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </section>
  );
}
