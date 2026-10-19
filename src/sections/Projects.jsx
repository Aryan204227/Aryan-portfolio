import React, { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Info, ArrowUpRight, CheckCircle2, Terminal, Code2, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { projects } = portfolioData;

const EASE = [0.16, 1, 0.3, 1];

// ── 3D Perspective Tilt & Cursor Tracking Card ───────────────────
function EditorialProjectCard({ project, idx, onSelectProject }) {
  const cardRef = useRef(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [glowVisible, setGlowVisible] = useState(false);

  const rawRX = useMotionValue(0);
  const rawRY = useMotionValue(0);
  const rotateX = useSpring(rawRX, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(rawRY, { stiffness: 200, damping: 25 });

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  const handleMouseMove = useCallback((e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    rawRY.set((nx - 0.5) * 8);
    rawRX.set(-(ny - 0.5) * 8);
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, [rawRX, rawRY, isMobile]);

  const handleMouseLeave = useCallback(() => {
    rawRX.set(0);
    rawRY.set(0);
    setGlowVisible(false);
  }, [rawRX, rawRY]);

  const isCareer = project.id === 'career-guidance-system';
  const isStock  = project.id === 'stocksense-ai';
  const isMaze   = project.id === 'maze-solver';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: idx * 0.15, ease: EASE }}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformPerspective: 1000,
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setGlowVisible(true)}
      onMouseLeave={handleMouseLeave}
      className="w-full rounded-3xl bg-[#0c0e14] border border-white/[0.08] hover:border-lime-500/40 p-6 sm:p-10 shadow-2xl transition-all duration-300 relative overflow-hidden group mb-12"
    >
      {/* Dynamic Cursor Light Spot on Card Surface */}
      {glowVisible && !isMobile && (
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 380,
            height: 380,
            left: glowPos.x - 190,
            top: glowPos.y - 190,
            background: 'radial-gradient(circle, rgba(132,204,22,0.08) 0%, rgba(56,189,248,0.03) 40%, transparent 70%)',
            zIndex: 0,
          }}
        />
      )}

      {/* Large Ghost Numbering Behind Header */}
      <span className="absolute top-4 right-8 font-mono text-7xl sm:text-9xl font-black text-white/[0.02] pointer-events-none select-none">
        0{idx + 1}
      </span>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Project Overview & Specs (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            {/* Project Category Tag & Status */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono font-bold tracking-widest text-lime-400 uppercase">
                PROJECT 0{idx + 1} • {isCareer ? 'MERN FULL-STACK' : isStock ? 'AI WEB SERVICE' : 'JAVA DESKTOP APP'}
              </span>
              {project.live ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE ON RENDER
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] font-mono text-orange-400">
                  DESKTOP GUI
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 group-hover:text-lime-300 transition-colors">
              {project.title}
            </h3>

            {/* Summary */}
            <p className="text-neutral-300 text-sm leading-relaxed font-light mb-6">
              {project.summary}
            </p>

            {/* Key Authentic Features List */}
            <div className="space-y-2 mb-6">
              {project.features.slice(0, 3).map((feat, fi) => (
                <div key={fi} className="flex items-start gap-2 text-xs text-neutral-400 leading-snug">
                  <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Technology Pills */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-neutral-300 border border-white/[0.06]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.08]">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(132,204,22,0.25)]"
              >
                <span>Live App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#141620] hover:bg-[#1a1e2c] border border-white/10 hover:border-white/25 text-white text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <Github className="w-3.5 h-3.5 text-neutral-400" />
              <span>Source</span>
            </a>

            <button
              onClick={() => onSelectProject(project)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.04] text-xs font-mono uppercase tracking-wider transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Case Study</span>
            </button>
          </div>
        </div>

        {/* Right Column: High-Fidelity UI / Simulated Window (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-[#07090e] border border-white/10 overflow-hidden shadow-2xl flex flex-col">
            
            {/* Simulated Window Chrome Header */}
            <div className="h-8 px-4 bg-[#10121a] border-b border-white/[0.08] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="font-mono text-[10px] text-neutral-500 truncate max-w-[240px]">
                {isCareer
                  ? 'https://career-guidance-system-l855.onrender.com'
                  : isStock
                  ? 'https://stocksense-ai-r24w.onrender.com'
                  : 'MazeSolver.java — DFS Pathfinding Visualizer (15×15)'}
              </span>
              <div className="w-4" />
            </div>

            {/* Window Content Body */}
            <div className="p-6 sm:p-8 flex flex-col justify-center items-center min-h-[280px] sm:min-h-[320px] bg-gradient-to-b from-[#090b12] to-[#06070a] relative overflow-hidden">
              
              {/* Career Guidance System Simulated Dashboard */}
              {isCareer && (
                <div className="w-full space-y-4 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-mono uppercase tracking-widest">
                    <span>APTITUDE ASSESSMENT ENGINE</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    12 Aptitude Evaluation Questions • 4 Domains
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    {[
                      { domain: 'Analytical', score: '94%', color: '#38bdf8' },
                      { domain: 'Technical', score: '91%', color: '#a3e635' },
                      { domain: 'Creative', score: '82%', color: '#fb923c' },
                      { domain: 'Managerial', score: '78%', color: '#c084fc' },
                    ].map((d) => (
                      <div key={d.domain} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col items-center">
                        <span className="text-[10px] font-mono text-neutral-400">{d.domain}</span>
                        <span className="text-base font-bold font-mono mt-1" style={{ color: d.color }}>
                          {d.score}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>Weighted-Sum Algorithm</span>
                    <span className="text-emerald-400">22 Career Paths Matched</span>
                  </div>
                </div>
              )}

              {/* StockSense AI Simulated UI */}
              {isStock && (
                <div className="w-full space-y-4 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>AI SENTIMENT ANALYSIS ENGINE</span>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-left">
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                      <span>MARKET SIGNAL CLASSIFICATION</span>
                      <span className="font-bold">+0.74 CONFIDENCE</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
                      "Semiconductor and AI compute infrastructure sectors exhibit positive sentiment trajectory backed by enterprise cloud workload demand."
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-neutral-300">
                      Decoupled Client
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-neutral-300">
                      Express.js API
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-emerald-400">
                      Render Cloud
                    </div>
                  </div>
                </div>
              )}

              {/* Maze Solver Java2D Interactive Visualizer */}
              {isMaze && (
                <div className="w-full space-y-4 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-mono uppercase tracking-widest">
                    <span>JAVA2D DFS &amp; RECURSIVE BACKTRACKING</span>
                  </div>

                  {/* 15x15 Miniature Grid Visualizer */}
                  <div className="grid grid-cols-10 gap-1 w-44 mx-auto p-2 bg-[#050608] rounded-xl border border-white/10 shadow-inner">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-[2px] transition-colors ${
                          i === 0
                            ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                            : i === 39
                            ? 'bg-red-400 shadow-[0_0_8px_#f87171]'
                            : i % 4 === 0
                            ? 'bg-lime-400/80 shadow-[0_0_6px_rgba(132,204,22,0.8)]'
                            : i % 3 === 0
                            ? 'bg-neutral-800'
                            : 'bg-neutral-900'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 text-neutral-300">
                      15×15 Grid
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 text-neutral-300">
                      172 Nodes Visited
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 text-neutral-300">
                      79 Recursion
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 text-lime-400">
                      29-Step Path
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState('All');
  const filterTabs = ['All', 'Full-Stack MERN', 'AI & Web', 'Java & Algorithms'];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'Full-Stack MERN') return p.id === 'career-guidance-system';
    if (filter === 'AI & Web') return p.id === 'stocksense-ai';
    if (filter === 'Java & Algorithms') return p.id === 'maze-solver';
    return true;
  });

  return (
    <section id="work" className="relative bg-[#07080a] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-white/[0.06]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[550px] bg-lime-500/[0.025] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12141a] border border-lime-500/30 text-lime-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(132,204,22,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span>FEATURED WORK &amp; CODEBASES</span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold tracking-tight text-center leading-[1.05] text-white max-w-3xl mb-4"
          style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}
        >
          Engineered project showcase.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-neutral-400 text-sm sm:text-base text-center max-w-xl mb-12 font-light"
        >
          Production web applications and algorithm engines built with authentic code and verifiable deployments.
        </motion.p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full text-xs font-mono tracking-wide transition-all duration-200 ${
                filter === tab
                  ? 'bg-lime-400 text-black font-bold shadow-[0_0_15px_rgba(132,204,22,0.3)]'
                  : 'bg-[#12141c] text-neutral-400 hover:text-white border border-white/10 hover:border-white/25'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Editorial Project List */}
        <div className="w-full">
          {filteredProjects.map((project, idx) => (
            <EditorialProjectCard
              key={project.id}
              project={project}
              idx={idx}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
