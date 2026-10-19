import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, FileCode, Coffee, Cpu, Binary, Terminal,
  Atom, Server, Network, Layout, Palette, Zap,
  Sparkles, Webhook, GitBranch, GitCommit, Cloud,
  Database, HardDrive, Brain, Repeat, GitFork, Boxes
} from 'lucide-react';
import TechMarquee from '../components/TechMarquee';

const TECH_ITEMS = [
  { name: 'React.js',         category: 'Frontend',  color: '#38bdf8', icon: Atom },
  { name: 'Node.js',          category: 'Backend',   color: '#22c55e', icon: Server },
  { name: 'Express.js',       category: 'Backend',   color: '#e2e8f0', icon: Network },
  { name: 'MongoDB',          category: 'Database',  color: '#10b981', icon: Database },
  { name: 'JavaScript',       category: 'Language',  color: '#facc15', icon: Code2 },
  { name: 'TypeScript',       category: 'Language',  color: '#60a5fa', icon: FileCode },
  { name: 'Java',             category: 'Language',  color: '#ea580c', icon: Coffee },
  { name: 'C++',              category: 'Language',  color: '#3b82f6', icon: Cpu },
  { name: 'Python',           category: 'Language',  color: '#38bdf8', icon: Terminal },
  { name: 'Tailwind CSS',     category: 'Frontend',  color: '#38bdf8', icon: Sparkles },
  { name: 'Vite',             category: 'Frontend',  color: '#a855f7', icon: Zap },
  { name: 'HTML5 & CSS3',     category: 'Frontend',  color: '#f97316', icon: Layout },
  { name: 'Git & GitHub',     category: 'Tools',     color: '#f97316', icon: GitBranch },
  { name: 'Render Cloud',     category: 'Tools',     color: '#38bdf8', icon: Cloud },
  { name: 'REST APIs',        category: 'Backend',   color: '#a3e635', icon: Webhook },
  { name: 'DBMS & SQL',       category: 'Database',  color: '#3b82f6', icon: HardDrive },
  { name: 'Data Structures',  category: 'Core CS',   color: '#c084fc', icon: Brain },
  { name: 'DFS Algorithm',    category: 'Core CS',   color: '#f43f5e', icon: GitFork },
  { name: 'Backtracking',     category: 'Core CS',   color: '#fb923c', icon: Repeat },
  { name: 'OOP Principles',   category: 'Core CS',   color: '#e879f9', icon: Boxes },
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Language', 'Database', 'Tools', 'Core CS'];

export default function TechArsenal() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? TECH_ITEMS : TECH_ITEMS.filter(t => t.category === filter);

  return (
    <section id="stack" className="relative bg-[#07080a]/75 backdrop-blur-[2px] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-white/[0.06]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-lime-500/[0.02] rounded-full blur-3xl pointer-events-none" />

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
          <span>TECHNICAL ARSENAL</span>
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
          Verified technologies &amp; core competencies.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-neutral-400 text-sm sm:text-base text-center max-w-xl mb-12 font-light"
        >
          Technologies applied across my genuine full-stack applications, algorithm visualizers, and academic projects.
        </motion.p>

        {/* ── Seamless Dual-Track Continuous Marquee ── */}
        <div className="w-full mb-16">
          <TechMarquee />
        </div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                filter === cat
                  ? 'bg-lime-400 text-black font-bold shadow-[0_0_15px_rgba(132,204,22,0.3)]'
                  : 'bg-[#12141c] text-neutral-400 hover:text-white border border-white/10 hover:border-white/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5"
          >
            {filtered.map((item, idx) => {
              const IconComp = item.icon;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-[#0f1118]/80 hover:bg-[#151822] border border-white/[0.07] hover:border-white/20 transition-all duration-300 shadow-xl cursor-default relative overflow-hidden"
                >
                  {/* Hover ambient color flare */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${item.color}15 0%, transparent 70%)`,
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                    }}
                  >
                    <IconComp className="w-5 h-5 stroke-[1.8]" />
                  </div>

                  {/* Name */}
                  <span className="text-xs sm:text-sm font-semibold text-white text-center leading-tight">
                    {item.name}
                  </span>

                  {/* Category */}
                  <span className="text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                    {item.category}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
