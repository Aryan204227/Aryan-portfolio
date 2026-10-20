import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Atom, Server, Network, Database, Code2,
  Coffee, Webhook, Zap, Sparkles, Brain,
  Repeat, GitBranch, GitCommit, Cloud,
  Layout, Palette, GitFork, FileCode, Cpu, Terminal
} from 'lucide-react';
import TechMarquee from '../components/TechMarquee';

/**
 * Technical Skills Section
 * Sourced 100% from Aryan Dadwal's authentic resume:
 *
 * Languages: JavaScript, TypeScript, Java, C++, C, Python
 * Web development: React.js, Node.js, Express.js, HTML5, CSS3, Vite, Tailwind CSS, REST APIs
 * Tools & databases: Git, GitHub, Render, MongoDB
 * CS fundamentals: Data Structures & Algorithms, Recursion, DFS, Backtracking
 */

export const RESUME_SKILLS = [
  // Languages
  { id: 'js',         name: 'JavaScript',                   category: 'Languages',         icon: Code2,     color: '#facc15' },
  { id: 'ts',         name: 'TypeScript',                   category: 'Languages',         icon: FileCode,  color: '#60a5fa' },
  { id: 'java',       name: 'Java',                         category: 'Languages',         icon: Coffee,    color: '#ea580c' },
  { id: 'cpp',        name: 'C++',                          category: 'Languages',         icon: Cpu,       color: '#3b82f6' },
  { id: 'c',          name: 'C',                            category: 'Languages',         icon: Cpu,       color: '#94a3b8' },
  { id: 'python',     name: 'Python',                       category: 'Languages',         icon: Terminal,  color: '#38bdf8' },

  // Web & Frameworks
  { id: 'react',      name: 'React.js',                     category: 'Web & Frameworks',  icon: Atom,      color: '#38bdf8' },
  { id: 'node',       name: 'Node.js',                      category: 'Web & Frameworks',  icon: Server,    color: '#22c55e' },
  { id: 'express',    name: 'Express.js',                   category: 'Web & Frameworks',  icon: Network,   color: '#e2e8f0' },
  { id: 'html5',      name: 'HTML5',                        category: 'Web & Frameworks',  icon: Layout,    color: '#f97316' },
  { id: 'css3',       name: 'CSS3',                         category: 'Web & Frameworks',  icon: Palette,   color: '#60a5fa' },
  { id: 'vite',       name: 'Vite',                         category: 'Web & Frameworks',  icon: Zap,       color: '#c084fc' },
  { id: 'tailwind',   name: 'Tailwind CSS',                 category: 'Web & Frameworks',  icon: Sparkles,  color: '#38bdf8' },
  { id: 'rest',       name: 'REST APIs',                    category: 'Web & Frameworks',  icon: Webhook,   color: '#a3e635' },

  // Tools & Database
  { id: 'git',        name: 'Git',                          category: 'Tools & Database',  icon: GitBranch, color: '#f97316' },
  { id: 'github',     name: 'GitHub',                       category: 'Tools & Database',  icon: GitCommit, color: '#e2e8f0' },
  { id: 'render',     name: 'Render',                       category: 'Tools & Database',  icon: Cloud,     color: '#38bdf8' },
  { id: 'mongodb',    name: 'MongoDB',                      category: 'Tools & Database',  icon: Database,  color: '#10b981' },

  // CS Fundamentals
  { id: 'dsa',        name: 'Data Structures & Algorithms', category: 'CS Fundamentals',   icon: Brain,     color: '#c084fc' },
  { id: 'recursion',  name: 'Recursion',                    category: 'CS Fundamentals',   icon: Repeat,    color: '#38bdf8' },
  { id: 'dfs',        name: 'DFS',                          category: 'CS Fundamentals',   icon: GitFork,   color: '#f43f5e' },
  { id: 'backtrack',  name: 'Backtracking',                 category: 'CS Fundamentals',   icon: Repeat,    color: '#fb923c' },
];

const CATEGORIES = ['All', 'Languages', 'Web & Frameworks', 'Tools & Database', 'CS Fundamentals'];

export default function TechArsenal() {
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return RESUME_SKILLS;
    return RESUME_SKILLS.filter(s => s.category === filter);
  }, [filter]);

  return (
    <section
      id="skills"
      className="relative scroll-mt-28 bg-[#07080a]/75 backdrop-blur-[2px] pt-32 pb-28 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Anchor for #stack navigation */}
      <div id="stack" className="absolute -top-28 pointer-events-none" aria-hidden="true" />

      {/* Subtle background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-lime-500/[0.025] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">

        {/* Section Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12141a] border border-lime-500/30 text-lime-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(132,204,22,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span>02 / TECHNICAL ARSENAL</span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold tracking-tight text-center leading-[1.05] text-white max-w-3xl mb-4 font-display"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
        >
          Verified technical competencies.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-neutral-400 text-sm sm:text-base text-center max-w-xl mb-12 font-light leading-relaxed"
        >
          Documented skills applied across full-stack web applications, algorithmic problem solving in Java, and cloud services.
        </motion.p>

        {/* ── Continuous Bidirectional Streams ── */}
        <div data-scroll-reveal className="w-full mb-12">
          <TechMarquee />
        </div>

        {/* ── Compact Skill Explorer ── */}
        <div data-scroll-reveal className="w-full max-w-5xl rounded-3xl border border-white/[0.08] bg-[#090c12]/85 p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Header & Category Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.07] pb-6 mb-7">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-lime-400 font-semibold block mb-1">
                SKILL MATRIX EXPLORER
              </span>
              <p className="text-xs text-neutral-400 font-light">
                Categorized by engineering domain from verified resume and repository codebases.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {CATEGORIES.map((cat) => {
                const count = cat === 'All'
                  ? RESUME_SKILLS.length
                  : RESUME_SKILLS.filter(s => s.category === cat).length;
                const isActive = filter === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-lime-400 text-black font-bold shadow-[0_0_12px_rgba(132,204,22,0.35)]'
                        : 'bg-[#121620] text-neutral-400 hover:text-white border border-white/10 hover:border-white/20'
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

          {/* Compact Grid of Genuine Skills */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
            >
              {filtered.map((item) => {
                const IconComp = item.icon;

                return (
                  <div
                    key={item.id}
                    data-scroll-reveal
                    className="p-3 rounded-xl bg-[#0e131d]/90 hover:bg-[#141b28] border border-white/[0.08] hover:border-lime-400/40 transition-all duration-200 flex items-center gap-3 group select-none"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: `${item.color}18`,
                        color: item.color,
                      }}
                    >
                      <IconComp className="w-4 h-4 stroke-[2]" />
                    </div>

                    <div className="overflow-hidden">
                      <span className="text-xs font-semibold text-white group-hover:text-lime-300 transition-colors block truncate">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block truncate">
                        {item.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
