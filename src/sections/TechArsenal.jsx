import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  FileCode, 
  Coffee, 
  Cpu, 
  Binary, 
  Terminal, 
  Atom, 
  Server, 
  Network, 
  Layout, 
  Palette, 
  Zap, 
  Sparkles, 
  Webhook, 
  GitBranch, 
  GitCommit, 
  Cloud, 
  Database, 
  HardDrive, 
  Brain, 
  Repeat, 
  GitFork, 
  Boxes 
} from 'lucide-react';

const TECH_ITEMS = [
  // Row 1: Core Web & Languages
  { name: 'React.js', category: 'Frontend', color: '#38bdf8', icon: Atom },
  { name: 'Node.js', category: 'Backend', color: '#22c55e', icon: Server },
  { name: 'Express.js', category: 'Backend', color: '#ffffff', icon: Network },
  { name: 'MongoDB', category: 'Database', color: '#10b981', icon: Database },
  { name: 'JavaScript', category: 'Language', color: '#facc15', icon: Code2 },
  { name: 'TypeScript', category: 'Language', color: '#60a5fa', icon: FileCode },
  { name: 'Java', category: 'Language', color: '#ea580c', icon: Coffee },
  { name: 'C++', category: 'Language', color: '#3b82f6', icon: Cpu },
  { name: 'Python', category: 'Language', color: '#38bdf8', icon: Terminal },
  { name: 'Tailwind CSS', category: 'Frontend', color: '#38bdf8', icon: Sparkles },
  { name: 'Vite', category: 'Frontend', color: '#a855f7', icon: Zap },
  { name: 'HTML5', category: 'Frontend', color: '#f97316', icon: Layout },

  // Row 2: Tools, Systems & CS
  { name: 'Git', category: 'Tools', color: '#f97316', icon: GitBranch },
  { name: 'GitHub', category: 'Tools', color: '#ffffff', icon: GitCommit },
  { name: 'Render Cloud', category: 'Tools', color: '#38bdf8', icon: Cloud },
  { name: 'REST APIs', category: 'Backend', color: '#84cc16', icon: Webhook },
  { name: 'DBMS & SQL', category: 'Database', color: '#3b82f6', icon: HardDrive },
  { name: 'Data Structures', category: 'Core CS', color: '#c084fc', icon: Brain },
  { name: 'DFS Algorithm', category: 'Core CS', color: '#f43f5e', icon: GitFork },
  { name: 'Backtracking', category: 'Core CS', color: '#fb923c', icon: Repeat },
  { name: 'OOP', category: 'Core CS', color: '#e879f9', icon: Boxes },
  { name: 'C Language', category: 'Language', color: '#94a3b8', icon: Binary },
  { name: 'CSS3', category: 'Frontend', color: '#60a5fa', icon: Palette },
];

export default function TechArsenal() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Language', 'Database', 'Tools', 'Core CS'];

  const filteredItems = filter === 'All' 
    ? TECH_ITEMS 
    : TECH_ITEMS.filter(item => item.category === filter);

  return (
    <section id="stack" className="relative bg-[#0a0a0a] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-orange-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161616] border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
        >
          <span className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center text-[10px] text-orange-400 font-bold">
            ⚡
          </span>
          <span>TECH ARSENAL</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold tracking-tight text-center leading-[1.05] text-white max-w-3xl mb-8"
          style={{ fontSize: 'clamp(36px, 5.5vw, 68px)' }}
        >
          Technologies engineered for scale and speed.
        </motion.h2>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                filter === cat
                  ? 'bg-white text-black font-bold shadow-lg'
                  : 'bg-[#141416] text-neutral-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Brand Icon Grid (Exact Match to Screenshot 4 Layout) ── */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 justify-items-center">
          {filteredItems.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.03 }}
                className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-[#121214]/60 hover:bg-[#161619] border border-white/[0.06] hover:border-white/20 transition-all duration-300 w-full max-w-[170px] shadow-lg"
              >
                {/* Glowing Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                    boxShadow: `0 0 20px ${item.color}20`,
                  }}
                >
                  <IconComp className="w-6 h-6 stroke-[1.75]" />
                </div>

                {/* Name */}
                <span className="text-xs sm:text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors text-center">
                  {item.name}
                </span>

                {/* Category tag */}
                <span className="text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                  {item.category}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom Pill: "PORTFOLIO" (Exact Match to Screenshot 4) ── */}
        <div className="mt-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#141416] border border-white/10 text-neutral-400 text-xs font-mono uppercase tracking-widest shadow-xl">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>PORTFOLIO TECH ECOSYSTEM</span>
          </div>
        </div>

      </div>
    </section>
  );
}
