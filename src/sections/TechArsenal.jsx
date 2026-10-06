import React, { useState } from 'react';
import { 
  Atom, 
  Server, 
  Network, 
  Database, 
  Coffee, 
  Cpu, 
  FileCode, 
  Terminal, 
  Layout, 
  Palette, 
  Sparkles, 
  GitBranch, 
  GitCommit, 
  Zap, 
  Cloud, 
  Binary, 
  Repeat, 
  HardDrive,
  Webhook
} from 'lucide-react';

const CATEGORIES = [
  'ALL',
  'LANGUAGES',
  'FRONTEND',
  'BACKEND',
  'DATABASE',
  'TOOLS',
  'FUNDAMENTALS'
];

const TECH_ITEMS = [
  // LANGUAGES
  { name: 'Java', category: 'LANGUAGES', icon: Coffee, desc: 'Object-oriented programming, data structures, recursion, DFS backtracking' },
  { name: 'JavaScript', category: 'LANGUAGES', icon: FileCode, desc: 'Core ES6+ client-side logic and asynchronous Node.js backend runtimes' },
  { name: 'TypeScript', category: 'LANGUAGES', icon: FileCode, desc: 'Static typing contracts, interfaces, and scalable JavaScript architecture' },
  { name: 'C++', category: 'LANGUAGES', icon: Cpu, desc: 'Memory models, pointers, and algorithmic problem solving (Infosys certified)' },
  { name: 'C', category: 'LANGUAGES', icon: Binary, desc: 'Low-level systems fundamentals, pointers, and memory manipulation' },
  { name: 'Python', category: 'LANGUAGES', icon: Terminal, desc: 'Scripting, algorithmic experimentation, and automation routines' },

  // FRONTEND
  { name: 'React.js', category: 'FRONTEND', icon: Atom, desc: 'Component architecture, custom hooks, virtual DOM, and SPA state flows' },
  { name: 'HTML5', category: 'FRONTEND', icon: Layout, desc: 'Semantic document structure, accessibility standards, and SEO hierarchy' },
  { name: 'CSS3', category: 'FRONTEND', icon: Palette, desc: 'Modern responsive layouts, Flexbox, CSS Grid, and custom animations' },
  { name: 'Tailwind CSS', category: 'FRONTEND', icon: Sparkles, desc: 'Utility-first styling tokens, responsive breakpoints, and dark mode' },
  { name: 'Vite', category: 'FRONTEND', icon: Zap, desc: 'Next-generation build tool with instant HMR and optimized asset bundling' },

  // BACKEND
  { name: 'Node.js', category: 'BACKEND', icon: Server, desc: 'Event-driven asynchronous runtime powering modular microservice backends' },
  { name: 'Express.js', category: 'BACKEND', icon: Network, desc: 'Minimalist web API framework for routing, middlewares, and controllers' },
  { name: 'REST APIs', category: 'BACKEND', icon: Webhook, desc: 'Stateless endpoints with clean HTTP verbs, JSON contracts, and error handling' },

  // DATABASE
  { name: 'MongoDB', category: 'DATABASE', icon: Database, desc: 'Document-oriented NoSQL database for flexible data schemas and user records' },
  { name: 'DBMS', category: 'DATABASE', icon: HardDrive, desc: 'Database management principles, normalization, indexing, and transactional integrity' },

  // TOOLS
  { name: 'Git', category: 'TOOLS', icon: GitBranch, desc: 'Distributed version control, branch management, and disciplined commit workflows' },
  { name: 'GitHub', category: 'TOOLS', icon: GitCommit, desc: 'Remote repository hosting, release versioning, and open-source collaboration' },
  { name: 'Render', category: 'TOOLS', icon: Cloud, desc: 'Cloud deployment platform for hosting production frontend and backend services' },

  // FUNDAMENTALS
  { name: 'Data Structures & Algorithms', category: 'FUNDAMENTALS', icon: Cpu, desc: 'Arrays, matrices, time/space complexity analysis, and pattern recognition' },
  { name: 'Recursion & Backtracking', category: 'FUNDAMENTALS', icon: Repeat, desc: 'State-space tree exploration, constraint satisfaction, and pruning' },
  { name: 'Depth-First Search (DFS)', category: 'FUNDAMENTALS', icon: GitBranch, desc: 'Graph and grid traversal algorithm verified in Maze Solver benchmark' },
];

export default function TechArsenal() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeTech, setActiveTech] = useState(null);

  const displayedTech = activeCategory === 'ALL'
    ? TECH_ITEMS
    : TECH_ITEMS.filter((t) => t.category === activeCategory);

  return (
    <section id="stack" className="py-28 px-6 sm:px-8 lg:px-12 relative border-t border-white/[0.06] bg-[#07080c]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Identifier */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase">
              03 / TECH ARSENAL
            </span>
            <span className="w-12 h-[1px] bg-slate-800" />
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:inline">
            ZERO FAKE PERCENTAGES
          </span>
        </div>

        {/* Section Heading & Category Filter Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              Technical Arsenal
            </h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
              A verified ecosystem of languages, platforms, databases, and core computer science fundamentals.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] self-start lg:self-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Technology Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {displayedTech.map((item) => {
            const IconComp = item.icon;
            const isHovered = activeTech?.name === item.name;

            return (
              <div
                key={item.name}
                onMouseEnter={() => setActiveTech(item)}
                onMouseLeave={() => setActiveTech(null)}
                className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer ${
                  isHovered
                    ? 'bg-white/10 border-white/30 -translate-y-1 shadow-xl shadow-cyan-950/20'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                    {item.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono mt-1 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Technology Marquee Tape (Subtle motion element) */}
        <div className="relative overflow-hidden py-4 border-y border-white/[0.06] select-none">
          <div className="flex items-center gap-8 whitespace-nowrap animate-marquee font-mono text-xs text-slate-500 uppercase tracking-widest">
            {['JAVA', 'REACT.JS', 'NODE.JS', 'MONGODB', 'EXPRESS.JS', 'DATA STRUCTURES', 'DFS', 'BACKTRACKING', 'TYPESCRIPT', 'TAILWIND CSS', 'VITE', 'RENDER CLOUD', 'GIT & GITHUB'].map((t, idx) => (
              <span key={idx} className="flex items-center gap-4">
                <span>{t}</span>
                <span className="text-cyan-500/40">•</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
