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
  Info 
} from 'lucide-react';

const ECOSYSTEM_GROUPS = [
  {
    title: 'CORE LANGUAGES',
    description: 'Algorithmic logic, systems programming, and modern scripting',
    technologies: [
      { name: 'Java', role: 'Object-Oriented & DSA', desc: 'Core language for algorithmic problem solving, recursion, DFS backtracking, and Maze Solver.', icon: Coffee },
      { name: 'JavaScript', role: 'Full-Stack Scripting', desc: 'Primary scripting language across client and Node.js backend services.', icon: FileCode },
      { name: 'TypeScript', role: 'Typed Web Development', desc: 'Type-safe contracts and scalable JavaScript codebases.', icon: FileCode },
      { name: 'C++', role: 'Systems & Problem Solving', desc: 'Certified via Infosys Springboard; foundational memory models and algorithmic efficiency.', icon: Cpu },
      { name: 'Python', role: 'Scripting & Prototyping', desc: 'Versatile language for automation, algorithms, and analytical scripts.', icon: Terminal },
    ]
  },
  {
    title: 'WEB & CLIENT ECOSYSTEM',
    description: 'Component architecture, reactive state, and responsive styling',
    technologies: [
      { name: 'React.js', role: 'Client SPA Framework', desc: 'Primary frontend library used in Career Guidance System with custom state hooks.', icon: Atom },
      { name: 'Tailwind CSS', role: 'Utility Design System', desc: 'High-performance responsive CSS token system with clean dark aesthetics.', icon: Sparkles },
      { name: 'Vite', role: 'Fast Build Tooling', desc: 'Next-generation bundling, instant HMR, and optimized production chunking.', icon: Zap },
      { name: 'HTML5 & CSS3', role: 'Semantic Web Standards', desc: 'Semantic document markup, accessibility patterns, and modern responsive layouts.', icon: Layout },
    ]
  },
  {
    title: 'BACKEND, CLOUD & STORAGE',
    description: 'Decoupled services, document databases, and cloud hosting',
    technologies: [
      { name: 'Node.js', role: 'Runtime Environment', desc: 'Asynchronous event-driven JavaScript server runtime powering REST endpoints.', icon: Server },
      { name: 'Express.js', role: 'Web API Framework', desc: 'Lightweight routing framework for modular microservices and backend endpoints.', icon: Network },
      { name: 'MongoDB', role: 'Document Database', desc: 'NoSQL datastore for user assessment profiles, career catalogs, and test results.', icon: Database },
      { name: 'Render', role: 'Cloud Deployment', desc: 'Production cloud host hosting Career Guidance and StockSense AI live services.', icon: Cloud },
    ]
  },
  {
    title: 'VERSION CONTROL & TOOLING',
    description: 'Disciplined workflows, collaboration, and repository governance',
    technologies: [
      { name: 'Git', role: 'Distributed VCS', desc: 'Branching, clean staging discipline, and version tagging.', icon: GitBranch },
      { name: 'GitHub', role: 'Code Hosting & CI', desc: 'Public repositories, collaboration, release artifacts, and open-source documentation.', icon: GitCommit },
    ]
  }
];

export default function TechStack() {
  const [selectedTech, setSelectedTech] = useState(ECOSYSTEM_GROUPS[0].technologies[0]);

  return (
    <section id="stack" className="py-28 px-6 sm:px-8 lg:px-12 relative border-t border-white/[0.06] bg-[#07090e]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Identifier */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase">
              03 / TECHNICAL ECOSYSTEM
            </span>
            <span className="w-12 h-[1px] bg-slate-800" />
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:inline">
            VERIFIED IN PROJECTS
          </span>
        </div>

        {/* Section Heading */}
        <div className="max-w-3xl space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Technical Stack & Ecosystem
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Technologies actively deployed across production web apps, desktop visualizers, and algorithmic problem solving. Click or hover any technology to inspect its role.
          </p>
        </div>

        {/* Ecosystem Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Clustered Technology Grid */}
          <div className="lg:col-span-8 space-y-8">
            {ECOSYSTEM_GROUPS.map((group, gIdx) => (
              <div key={gIdx} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                    {group.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-600">
                    {group.description}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {group.technologies.map((tech) => {
                    const IconComp = tech.icon;
                    const isSelected = selectedTech?.name === tech.name;
                    return (
                      <button
                        key={tech.name}
                        onClick={() => setSelectedTech(tech)}
                        onMouseEnter={() => setSelectedTech(tech)}
                        className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all duration-200 focus:outline-none ${
                          isSelected
                            ? 'bg-white/10 border-cyan-400/50 text-white shadow-lg shadow-cyan-950/20'
                            : 'bg-white/[0.02] border-white/[0.06] text-slate-300 hover:border-white/20 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-slate-400'
                        }`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs sm:text-sm font-display font-semibold block truncate">
                            {tech.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 block truncate">
                            {tech.role}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Selected Technology Deep Inspector */}
          <div className="lg:col-span-4 sticky top-28 rounded-2xl bg-[#090d16] border border-white/10 p-6 sm:p-7 space-y-6 shadow-2xl">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase">
              <Info className="w-3.5 h-3.5" />
              <span>TECHNOLOGY INSPECTOR</span>
            </div>

            {selectedTech ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-cyan-400">
                    {React.createElement(selectedTech.icon, { className: 'w-6 h-6' })}
                  </div>
                  <div>
                    <h4 className="font-display text-2xl font-bold text-white tracking-tight">
                      {selectedTech.name}
                    </h4>
                    <span className="text-xs font-mono text-cyan-400 block">
                      {selectedTech.role}
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/[0.08] pt-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">
                    ROLE & IMPLEMENTATION CONTEXT
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedTech.desc}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.05] text-[11px] font-mono text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Verified in codebase & projects</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-mono">
                Select or hover any technology on the left to inspect implementation details.
              </p>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
