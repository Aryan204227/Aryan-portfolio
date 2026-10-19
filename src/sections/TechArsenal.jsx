import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Atom, Server, Network, Database, Code2,
  Coffee, Webhook, Zap, Sparkles, Brain,
  Repeat, Boxes, GitBranch, GitCommit, Cloud,
  HardDrive, Layout, Palette, GitFork, Terminal,
  Cpu, CheckCircle2, Layers
} from 'lucide-react';
import TechMarquee from '../components/TechMarquee';

/**
 * 100% Verified Technical Competencies
 * Directly sourced from Aryan Dadwal's authentic codebases & projects:
 * - Career Guidance System (MERN Stack)
 * - StockSense AI (Node / Express / AI)
 * - Maze Solver (Java / Swing / DFS / Backtracking)
 */
export const ALL_VERIFIED_SKILLS = [
  // Frontend
  { id: 'react',     name: 'React.js',                     category: 'Frontend',  role: 'UI Component Architecture',  icon: Atom,       color: '#38bdf8' },
  { id: 'tailwind',  name: 'Tailwind CSS',                 category: 'Frontend',  role: 'Utility-First Design System', icon: Sparkles,   color: '#38bdf8' },
  { id: 'vite',      name: 'Vite',                         category: 'Frontend',  role: 'Next-Gen Build Tooling',      icon: Zap,        color: '#c084fc' },
  { id: 'html5',     name: 'HTML5',                        category: 'Frontend',  role: 'Semantic Document Structure', icon: Layout,     color: '#f97316' },
  { id: 'css3',      name: 'CSS3',                         category: 'Frontend',  role: 'Responsive & Keyframe Logic', icon: Palette,    color: '#60a5fa' },

  // Backend & APIs
  { id: 'node',      name: 'Node.js',                      category: 'Backend',   role: 'Asynchronous JavaScript Runtime', icon: Server, color: '#22c55e' },
  { id: 'express',   name: 'Express.js',                   category: 'Backend',   role: 'Modular REST API Framework',  icon: Network,    color: '#e2e8f0' },
  { id: 'rest',      name: 'REST APIs',                    category: 'Backend',   role: 'Client-Server Communication', icon: Webhook,    color: '#a3e635' },
  { id: 'mern',      name: 'MERN Stack',                   category: 'Backend',   role: 'Decoupled Full-Stack Architecture', icon: Layers, color: '#84cc16' },

  // Languages
  { id: 'js',        name: 'JavaScript (ES6+)',            category: 'Languages', role: 'Modern Frontend & Backend Core', icon: Code2,   color: '#facc15' },
  { id: 'java',      name: 'Java',                         category: 'Languages', role: 'OOP & Algorithmic Foundations', icon: Coffee,  color: '#ea580c' },

  // Databases
  { id: 'mongodb',   name: 'MongoDB',                      category: 'Databases', role: 'Document Database (NoSQL)',   icon: Database,   color: '#10b981' },
  { id: 'dbms',      name: 'DBMS & SQL',                   category: 'Databases', role: 'Relational Schemas & Queries', icon: HardDrive,  color: '#3b82f6' },

  // Core CS & Algorithms
  { id: 'dsa',       name: 'Data Structures & Algorithms', category: 'Core CS',   role: 'Time/Space Algorithmic Optimization', icon: Brain, color: '#c084fc' },
  { id: 'dfs',       name: 'DFS Algorithm',                category: 'Core CS',   role: 'Graph Traversal & Maze Engines', icon: GitFork, color: '#f43f5e' },
  { id: 'backtrack', name: 'Backtracking',                 category: 'Core CS',   role: 'State-Space Exploration',     icon: Repeat,     color: '#fb923c' },
  { id: 'recursion', name: 'Recursion',                    category: 'Core CS',   role: 'Recursive Subproblem Solving', icon: Repeat,     color: '#38bdf8' },
  { id: 'oop',       name: 'OOP Principles',               category: 'Core CS',   role: 'Encapsulation & Abstraction', icon: Boxes,      color: '#e879f9' },

  // Tools & Deployment
  { id: 'git',       name: 'Git',                          category: 'Tools',     role: 'Distributed Version Control', icon: GitBranch,  color: '#f97316' },
  { id: 'github',    name: 'GitHub',                       category: 'Tools',     role: 'Repo Collaboration & CI/CD',  icon: GitCommit,  color: '#e2e8f0' },
  { id: 'render',    name: 'Render Cloud',                 category: 'Tools',     role: 'Automated Web Service Hosting', icon: Cloud,    color: '#38bdf8' },
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Languages', 'Databases', 'Core CS', 'Tools'];

export default function TechArsenal() {
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return ALL_VERIFIED_SKILLS;
    return ALL_VERIFIED_SKILLS.filter(t => t.category === filter);
  }, [filter]);

  return (
    <section
      id="skills"
      className="relative scroll-mt-28 bg-[#07080a]/75 backdrop-blur-[2px] pt-32 pb-28 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Backwards-compatibility anchor for #stack */}
      <div id="stack" className="absolute -top-28 pointer-events-none" aria-hidden="true" />

      {/* Atmospheric Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[500px] bg-lime-500/[0.025] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12141a] border border-lime-500/30 text-lime-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(132,204,22,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span>02 / TECHNICAL ARSENAL</span>
        </motion.div>

        {/* Section Heading — Fully visible below floating navbar */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold tracking-tight text-center leading-[1.05] text-white max-w-3xl mb-4 font-display"
          style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}
        >
          Engineered technology ecosystem.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-neutral-400 text-sm sm:text-base text-center max-w-2xl mb-12 font-light leading-relaxed"
        >
          Synchronized across full-stack MERN web platforms, algorithmic problem-solving in Java,
          and production cloud deployments.
        </motion.p>

        {/* ── Continuous Bidirectional Streams ── */}
        <div className="w-full mb-14">
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
              LIVE TELEMETRY STREAMS
            </span>
            <span className="text-[10px] font-mono text-neutral-500">
              CONTINUOUS BIDIRECTIONAL BUS
            </span>
          </div>
          <TechMarquee />
        </div>

        {/* ── Interactive Skill Explorer HUD ── */}
        <div className="w-full rounded-3xl border border-white/[0.08] bg-[#090b10]/85 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Cyber HUD Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-lime-500/40 rounded-tl-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-lime-500/40 rounded-tr-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-lime-500/40 rounded-bl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-lime-500/40 rounded-br-3xl pointer-events-none" />

          {/* HUD Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.07] pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-lime-400 font-semibold">
                  INTERACTIVE SKILL MATRIX
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-light">
                Inspect verified technical competencies categorized by engineering domain.
              </p>
            </div>

            {/* Filter Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {CATEGORIES.map((cat) => {
                const count = cat === 'All' 
                  ? ALL_VERIFIED_SKILLS.length 
                  : ALL_VERIFIED_SKILLS.filter(s => s.category === cat).length;
                const isActive = filter === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-lime-400 text-black font-bold shadow-[0_0_15px_rgba(132,204,22,0.35)]'
                        : 'bg-[#12151e] text-neutral-400 hover:text-white border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/20 text-black' : 'bg-white/5 text-neutral-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid of Verified Hardware-Style Tech Chips */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filtered.map((item, idx) => {
                const IconComp = item.icon;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: idx * 0.02 }}
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                    className="group relative p-4 rounded-2xl bg-[#0e121a]/90 hover:bg-[#131924] border border-white/[0.08] hover:border-lime-500/40 transition-all duration-200 shadow-lg flex flex-col justify-between overflow-hidden"
                  >
                    {/* Top ambient color glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${item.color}18 0%, transparent 70%)`,
                      }}
                    />

                    {/* Top Row: Icon + Category Badge */}
                    <div className="flex items-center justify-between mb-3 relative z-10">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: `${item.color}18`,
                          color: item.color,
                        }}
                      >
                        <IconComp className="w-4 h-4 stroke-[2]" />
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-neutral-400 border border-white/[0.06] uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>

                    {/* Middle: Name */}
                    <div className="relative z-10 mb-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-lime-300 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-[11px] font-light text-neutral-400 leading-snug mt-0.5">
                        {item.role}
                      </p>
                    </div>

                    {/* Bottom Indicator */}
                    <div className="pt-2.5 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-neutral-500 relative z-10">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-lime-400/80" />
                        <span>VERIFIED</span>
                      </span>
                      <span className="text-neutral-500 group-hover:text-neutral-300">
                        NODE 0{idx + 1}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
