import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, FileCode, Coffee, Cpu, Binary, Terminal,
  Atom, Server, Network, Layout, Palette, Zap,
  Sparkles, Webhook, GitBranch, GitCommit, Cloud,
  Database, HardDrive, Brain, Repeat, GitFork, Boxes
} from 'lucide-react';

const TECH_ITEMS = [
  { name: 'React.js',         category: 'Frontend',  color: '#38bdf8', icon: Atom },
  { name: 'Node.js',          category: 'Backend',   color: '#22c55e', icon: Server },
  { name: 'Express.js',       category: 'Backend',   color: '#d1d5db', icon: Network },
  { name: 'MongoDB',          category: 'Database',  color: '#10b981', icon: Database },
  { name: 'JavaScript',       category: 'Language',  color: '#facc15', icon: Code2 },
  { name: 'TypeScript',       category: 'Language',  color: '#60a5fa', icon: FileCode },
  { name: 'Java',             category: 'Language',  color: '#ea580c', icon: Coffee },
  { name: 'C++',              category: 'Language',  color: '#3b82f6', icon: Cpu },
  { name: 'Python',           category: 'Language',  color: '#38bdf8', icon: Terminal },
  { name: 'Tailwind CSS',     category: 'Frontend',  color: '#38bdf8', icon: Sparkles },
  { name: 'Vite',             category: 'Frontend',  color: '#a855f7', icon: Zap },
  { name: 'HTML5',            category: 'Frontend',  color: '#f97316', icon: Layout },
  { name: 'CSS3',             category: 'Frontend',  color: '#60a5fa', icon: Palette },
  { name: 'Git',              category: 'Tools',     color: '#f97316', icon: GitBranch },
  { name: 'GitHub',           category: 'Tools',     color: '#d1d5db', icon: GitCommit },
  { name: 'Render',           category: 'Tools',     color: '#38bdf8', icon: Cloud },
  { name: 'REST APIs',        category: 'Backend',   color: '#84cc16', icon: Webhook },
  { name: 'DBMS & SQL',       category: 'Database',  color: '#3b82f6', icon: HardDrive },
  { name: 'Data Structures',  category: 'Core CS',   color: '#c084fc', icon: Brain },
  { name: 'DFS Algorithm',    category: 'Core CS',   color: '#f43f5e', icon: GitFork },
  { name: 'Backtracking',     category: 'Core CS',   color: '#fb923c', icon: Repeat },
  { name: 'OOP',              category: 'Core CS',   color: '#e879f9', icon: Boxes },
  { name: 'C Language',       category: 'Language',  color: '#94a3b8', icon: Binary },
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Language', 'Database', 'Tools', 'Core CS'];

// Subtle floating animation for select cards
const FLOAT_DELAY = [0, 0.4, 0.8, 1.2, 0.2, 0.6, 1.0, 0.3, 0.7, 1.1, 0.5, 0.9];

export default function TechArsenal() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? TECH_ITEMS : TECH_ITEMS.filter(t => t.category === filter);

  return (
    <section id="stack" className="relative bg-[#0a0a0a] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-orange-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161616] border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
        >
          <span className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center text-[10px] text-orange-400 font-bold">⚡</span>
          <span>TECH ARSENAL</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold tracking-tight text-center leading-[1.05] text-white max-w-3xl mb-8"
          style={{ fontSize: 'clamp(36px, 5.5vw, 68px)' }}
        >
          Technologies I use and study.
        </motion.h2>

        {/* Filter Pills — animated active state */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-16"
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                filter === cat
                  ? 'bg-white text-black font-bold shadow-lg'
                  : 'bg-[#141416] text-neutral-400 hover:text-white border border-white/10 hover:border-white/25'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Tech Grid — AnimatePresence for smooth filter transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 sm:gap-6 justify-items-center"
          >
            {filtered.map((item, idx) => {
              const IconComp = item.icon;
              const floatDelay = FLOAT_DELAY[idx % FLOAT_DELAY.length];
              // stagger entrance direction: alternate from bottom / slight sides
              const fromSide = idx % 3 === 0 ? -10 : idx % 3 === 2 ? 10 : 0;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 24, x: fromSide }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-[#121214]/60 hover:bg-[#161619] border border-white/[0.06] hover:border-white/20 transition-colors duration-300 w-full max-w-[170px] shadow-lg cursor-default relative overflow-hidden"
                  style={{
                    // hover glow via box-shadow transition (GPU via composited layer)
                    willChange: 'transform',
                  }}
                >
                  {/* Hover glow blob */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${item.color}18 0%, transparent 70%)` }}
                  />

                  {/* Icon with subtle float */}
                  <motion.div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 z-10"
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                    }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3.5 + floatDelay, delay: floatDelay, repeat: Infinity, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.15, transition: { duration: 0.15 } }}
                  >
                    <IconComp className="w-6 h-6 stroke-[1.75]" />
                  </motion.div>

                  {/* Name */}
                  <span className="text-xs sm:text-[13px] font-semibold text-neutral-200 group-hover:text-white transition-colors text-center z-10 leading-tight">
                    {item.name}
                  </span>

                  {/* Category */}
                  <span className="text-[10px] font-mono text-neutral-500 mt-1 uppercase tracking-wider z-10">
                    {item.category}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom ecosystem label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#141416] border border-white/10 text-neutral-400 text-xs font-mono uppercase tracking-widest shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>TECH ECOSYSTEM</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
