import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Info, ArrowUpRight, CheckCircle2, Play } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { projects } = portfolioData;

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

        {/* ── Filter Pills at Top (Exact Match to Screenshot 5) ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                filter === tab
                  ? 'bg-white text-black font-bold shadow-xl'
                  : 'bg-[#141416] text-neutral-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-extrabold tracking-tight text-center leading-[1.05] text-white max-w-3xl mb-16"
          style={{ fontSize: 'clamp(36px, 5.5vw, 68px)' }}
        >
          Featured production engineering projects.
        </motion.h2>

        {/* ── 3 Project Cards Grid (Exact Match to Screenshot 5 Layout) ── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const isCareer = project.id === 'career-guidance-system';
            const isStock = project.id === 'stocksense-ai';
            const isMaze = project.id === 'maze-solver';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="rounded-3xl bg-[#121214] border border-white/10 overflow-hidden shadow-2xl hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* ── Top Mockup Window (Matching Screenshot 5) ── */}
                <div className="p-4 sm:p-5 pb-0">
                  <div className="w-full h-52 sm:h-56 rounded-2xl bg-[#08080a] border border-white/10 overflow-hidden relative shadow-inner flex flex-col">
                    
                    {/* Browser chrome header bar */}
                    <div className="h-7 px-3 bg-[#111114] border-b border-white/[0.08] flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                      </div>
                      <span className="font-mono text-[9px] text-neutral-500 truncate max-w-[160px]">
                        {isCareer
                          ? 'career-guidance-system.onrender.com'
                          : isStock
                          ? 'stocksense-ai.onrender.com'
                          : 'MazeSolver.java (Java2D)'}
                      </span>
                      <div className="w-3" />
                    </div>

                    {/* Window Visual Body */}
                    <div className="flex-1 p-4 flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-[#0c0d12] to-[#07080a]">
                      
                      {/* Career Guidance System Mockup */}
                      {isCareer && (
                        <div className="w-full space-y-2.5 text-center">
                          <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                            APTITUDE ASSESSMENT PLATFORM
                          </div>
                          <div className="text-sm font-bold text-white tracking-tight">
                            12 Questions • 4 Domains • 22 Paths
                          </div>
                          <div className="grid grid-cols-3 gap-1.5 pt-1 text-[9px] font-mono">
                            <div className="p-1.5 rounded bg-white/[0.04] border border-white/5 text-neutral-300">
                              Analytical 94%
                            </div>
                            <div className="p-1.5 rounded bg-white/[0.04] border border-white/5 text-neutral-300">
                              Technical 91%
                            </div>
                            <div className="p-1.5 rounded bg-white/[0.04] border border-white/5 text-neutral-300">
                              Creative 82%
                            </div>
                          </div>
                          <div className="pt-1 flex items-center justify-center gap-1 text-[9px] font-mono text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>MERN Architecture Live on Render</span>
                          </div>
                        </div>
                      )}

                      {/* StockSense AI Mockup */}
                      {isStock && (
                        <div className="w-full space-y-2.5 text-center">
                          <div className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase flex items-center justify-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            MARKET SENTIMENT MONITOR
                          </div>
                          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300">
                            BULLISH SCORE: +0.74 (AI ANALYSIS)
                          </div>
                          <p className="text-[10px] text-neutral-400 font-mono leading-tight">
                            "Semiconductor equity sentiment positive on AI compute demand."
                          </p>
                          <div className="text-[9px] font-mono text-neutral-400">
                            Decoupled Node.js + Express
                          </div>
                        </div>
                      )}

                      {/* Maze Solver Mockup */}
                      {isMaze && (
                        <div className="w-full space-y-2 text-center">
                          <div className="text-[10px] font-mono tracking-widest text-orange-400 uppercase">
                            JAVA2D DFS BACKTRACKING
                          </div>
                          {/* Mini Grid Visual */}
                          <div className="grid grid-cols-8 gap-1 w-36 mx-auto p-1.5 bg-[#050508] rounded-lg border border-white/10">
                            {Array.from({ length: 24 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 rounded-[2px] ${
                                  i === 0
                                    ? 'bg-emerald-400'
                                    : i === 23
                                    ? 'bg-red-400'
                                    : i % 3 === 0
                                    ? 'bg-orange-500/80 shadow-[0_0_6px_rgba(249,115,22,0.8)]'
                                    : 'bg-neutral-800'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-[9px] font-mono text-neutral-300">
                            15×15 Grid • 172 Visited Nodes • 17.259s
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </div>

                {/* ── Content Area ── */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  
                  {/* Category + Info Icon Row (Matching Screenshot 5) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono tracking-widest text-orange-400 uppercase font-semibold">
                        {isCareer
                          ? 'MERN FULL-STACK ARCHITECTURE'
                          : isStock
                          ? 'REAL-TIME SENTIMENT AI'
                          : 'ALGORITHMIC VISUALIZATION'}
                      </span>
                      <button
                        onClick={() => onSelectProject(project)}
                        className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="View Detailed Case Study"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-orange-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed mb-4">
                      {project.summary}
                    </p>

                    {/* Tech Pills (Matching Screenshot 5) */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/[0.04] text-neutral-300 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ── Action Buttons at Bottom (Exact Match to Screenshot 5) ── */}
                  <div className="flex items-center gap-3 pt-2">
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full btn-orange text-xs font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(249,115,22,0.3)] hover:shadow-[0_4px_24px_rgba(249,115,22,0.5)] transition-all"
                      >
                        <span>Live App</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        onClick={() => onSelectProject(project)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold uppercase tracking-wider hover:bg-orange-500/30 transition-all"
                      >
                        <span>Desktop App</span>
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-[#18181c] hover:bg-[#202026] border border-white/10 hover:border-white/20 text-neutral-200 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all"
                    >
                      <Github className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Source</span>
                    </a>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
