import React, { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Info, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { projects } = portfolioData;

const EASE = [0.16, 1, 0.3, 1];

// ── 3D Tilt + Cursor-Glow card wrapper ───────────────────────────
function TiltCard({ delay, idx, project, onSelectProject, children }) {
  const cardRef = useRef(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [glowVisible, setGlowVisible] = useState(false);

  const rawRX = useMotionValue(0);
  const rawRY = useMotionValue(0);
  const rotateX = useSpring(rawRX, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(rawRY, { stiffness: 220, damping: 22 });

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  const handleMouseMove = useCallback((e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;  // 0→1
    const ny = (e.clientY - rect.top) / rect.height;   // 0→1
    rawRY.set((nx - 0.5) * 10);
    rawRX.set(-(ny - 0.5) * 10);
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, [rawRX, rawRY, isMobile]);

  const handleMouseLeave = useCallback(() => {
    rawRX.set(0);
    rawRY.set(0);
    setGlowVisible(false);
  }, [rawRX, rawRY]);

  return (
    <motion.div
      ref={cardRef}
      key={project.id}
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformPerspective: 900,
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setGlowVisible(true)}
      onMouseLeave={handleMouseLeave}
      className="rounded-3xl bg-[#121214] border border-white/10 overflow-hidden shadow-2xl hover:border-orange-500/40 hover:shadow-[0_20px_60px_rgba(249,115,22,0.14)] transition-[border-color,box-shadow] duration-300 flex flex-col justify-between group relative"
    >
      {/* Cursor-following glow */}
      {glowVisible && !isMobile && (
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 280,
            height: 280,
            left: glowPos.x - 140,
            top: glowPos.y - 140,
            background: 'radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 65%)',
            zIndex: 0,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

// ── Magnetic CTA button ───────────────────────────────────────────
function MagCTA({ href, onClick, orange, children }) {
  const btnRef = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 250, damping: 22 });
  const y = useSpring(rawY, { stiffness: 250, damping: 22 });
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  const handleMove = (e) => {
    if (isMobile || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    rawX.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    rawY.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const handleLeave = () => { rawX.set(0); rawY.set(0); };

  const cls = orange
    ? 'flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full btn-orange text-xs font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(249,115,22,0.3)] hover:shadow-[0_4px_28px_rgba(249,115,22,0.55)] transition-shadow'
    : 'flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-[#18181c] hover:bg-[#202026] border border-white/10 hover:border-white/25 text-neutral-200 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all';

  const Tag = href ? motion.a : motion.button;
  return (
    <Tag
      ref={btnRef}
      href={href}
      onClick={onClick}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      style={{ x: isMobile ? 0 : x, y: isMobile ? 0 : y, position: 'relative', zIndex: 1 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cls}
    >
      {children}
    </Tag>
  );
}

// ── Main Projects Section ────────────────────────────────────────
export default function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState('All');
  const filterTabs = ['All', 'Full-Stack', 'AI & ML', 'Java & Algorithms'];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'Full-Stack') return p.id === 'career-guidance-system';
    if (filter === 'AI & ML') return p.id === 'stocksense-ai';
    if (filter === 'Java & Algorithms') return p.id === 'maze-solver';
    return true;
  });

  return (
    <section id="work" className="relative bg-[#0a0a0a] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-orange-500/[0.025] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          {filterTabs.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setFilter(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-250 ${
                filter === tab
                  ? 'bg-white text-black font-bold shadow-xl'
                  : 'bg-[#141416] text-neutral-400 hover:text-white border border-white/10 hover:border-white/25'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EASE }}
          className="font-extrabold tracking-tight text-center leading-[1.05] text-white max-w-3xl mb-16"
          style={{ fontSize: 'clamp(36px, 5.5vw, 68px)' }}
        >
          Selected projects I've built.
        </motion.h2>

        {/* 3-Column grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, idx) => {
              const isCareer = project.id === 'career-guidance-system';
              const isStock  = project.id === 'stocksense-ai';
              const isMaze   = project.id === 'maze-solver';

              return (
                <TiltCard
                  key={project.id}
                  delay={idx * 0.12}
                  idx={idx}
                  project={project}
                  onSelectProject={onSelectProject}
                >
                  {/* ── Browser Mockup ── */}
                  <div className="p-4 sm:p-5 pb-0 relative z-[1]">
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0.5 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: idx * 0.12 + 0.12 }}
                      className="w-full h-52 sm:h-56 rounded-2xl bg-[#08080a] border border-white/10 overflow-hidden relative shadow-inner flex flex-col"
                    >
                      {/* Browser chrome */}
                      <div className="h-7 px-3 bg-[#111114] border-b border-white/[0.08] flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                        </div>
                        <span className="font-mono text-[9px] text-neutral-500 truncate max-w-[160px]">
                          {isCareer ? 'career-guidance-system.onrender.com'
                           : isStock ? 'stocksense-ai.onrender.com'
                           : 'MazeSolver.java (Java2D — Desktop App)'}
                        </span>
                        <div className="w-3" />
                      </div>

                      {/* Window body */}
                      <div className="flex-1 p-4 flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-[#0c0d12] to-[#07080a]">

                        {isCareer && (
                          <div className="w-full space-y-2.5 text-center">
                            <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                              APTITUDE ASSESSMENT PLATFORM
                            </div>
                            <div className="text-sm font-bold text-white tracking-tight">
                              12 Questions • 4 Domains • 22 Career Paths
                            </div>
                            <div className="grid grid-cols-3 gap-1.5 pt-1 text-[9px] font-mono">
                              {[['Analytical','94%'],['Technical','91%'],['Creative','82%']].map(([k,v])=>(
                                <div key={k} className="p-1.5 rounded bg-white/[0.04] border border-white/5 text-neutral-300">{k} {v}</div>
                              ))}
                            </div>
                            <div className="pt-1 flex items-center justify-center gap-1 text-[9px] font-mono text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span>MERN Stack · Deployed on Render</span>
                            </div>
                          </div>
                        )}

                        {isStock && (
                          <div className="w-full space-y-2.5 text-center">
                            <div className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase flex items-center justify-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              AI SENTIMENT ANALYSIS
                            </div>
                            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300">
                              BULLISH SIGNAL: +0.74 CONFIDENCE
                            </div>
                            <p className="text-[10px] text-neutral-400 font-mono leading-tight">
                              "Semiconductor equity sentiment driven by AI compute demand."
                            </p>
                            <div className="text-[9px] font-mono text-neutral-500">
                              Client-Server · Node.js + Express
                            </div>
                          </div>
                        )}

                        {isMaze && (
                          <div className="w-full space-y-2 text-center">
                            <div className="text-[10px] font-mono tracking-widest text-orange-400 uppercase">
                              JAVA2D — DFS BACKTRACKING VISUALIZER
                            </div>
                            <div className="grid grid-cols-8 gap-1 w-36 mx-auto p-1.5 bg-[#050508] rounded-lg border border-white/10">
                              {Array.from({ length: 24 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-3 h-3 rounded-[2px] ${
                                    i === 0 ? 'bg-emerald-400'
                                    : i === 23 ? 'bg-red-400'
                                    : i % 3 === 0 ? 'bg-orange-500/80 shadow-[0_0_6px_rgba(249,115,22,0.8)]'
                                    : 'bg-neutral-800'
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-[9px] font-mono text-neutral-300">
                              15×15 Grid · 172 Nodes Visited · 29-Step Path
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* ── Content Area ── */}
                  <div className="p-6 flex-1 flex flex-col justify-between relative z-[1]">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono tracking-widest text-orange-400 uppercase font-semibold">
                          {isCareer ? 'MERN FULL-STACK'
                           : isStock ? 'AI-POWERED WEB APP'
                           : 'JAVA DESKTOP APP'}
                        </span>
                        <button
                          onClick={() => onSelectProject(project)}
                          className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                          title="View Case Study"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>

                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: idx * 0.12 + 0.2 }}
                        className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-orange-300 transition-colors"
                      >
                        {project.title}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: idx * 0.12 + 0.28 }}
                        className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed mb-4"
                      >
                        {project.summary}
                      </motion.p>

                      {/* Tech Pills — staggered */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((t, ti) => (
                          <motion.span
                            key={t}
                            initial={{ opacity: 0, scale: 0.88 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.12 + 0.3 + ti * 0.04 }}
                            className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/[0.04] text-neutral-300 border border-white/5"
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* ── Magnetic Action Buttons ── */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.12 + 0.4 }}
                      className="flex items-center gap-3 pt-2"
                    >
                      {project.live ? (
                        <MagCTA href={project.live} orange>
                          <span>Live App</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </MagCTA>
                      ) : (
                        <MagCTA onClick={() => onSelectProject(project)} orange>
                          <span>View Details</span>
                          <Info className="w-3.5 h-3.5" />
                        </MagCTA>
                      )}
                      <MagCTA href={project.github}>
                        <Github className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Source</span>
                      </MagCTA>
                    </motion.div>
                  </div>
                </TiltCard>
              );
            })}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
