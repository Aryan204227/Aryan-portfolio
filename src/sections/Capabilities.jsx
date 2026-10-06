import React, { useState } from 'react';
import { Layers, Binary, Cpu, Layout, ArrowRight, CheckCircle2 } from 'lucide-react';

const CAPABILITY_AREAS = [
  {
    number: '01',
    title: 'FULL STACK DEVELOPMENT',
    subtitle: 'End-to-end web applications with clean separation of concerns',
    description: 'Engineering responsive client-side SPAs coupled to modular REST APIs and document stores. Dedicated to maintainable architecture, structured state management, and production cloud setups.',
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Render Cloud'],
    diagram: 'React SPA (Client) ⇄ Express REST API ⇄ MongoDB Atlas',
    icon: Layers,
  },
  {
    number: '02',
    title: 'ALGORITHMIC PROBLEM SOLVING',
    subtitle: 'Mathematical intuition, recursion, and core computer science fundamentals',
    description: 'Disciplined problem solving practiced in Java with structured LeetCode patterns. Experienced in depth-first search, state-space tree exploration, recursive backtracking, and array manipulations.',
    skills: ['Java', 'Data Structures', 'Recursion', 'Backtracking', 'DFS', 'LeetCode Practice'],
    diagram: 'State Tree ➔ Branch Evaluation ➔ Pruning / Backtrack ➔ Solution',
    icon: Binary,
  },
  {
    number: '03',
    title: 'PRODUCT ENGINEERING',
    subtitle: 'Decoupled services, version control discipline, and cloud workflows',
    description: 'Structuring independent client and server modules to isolate points of failure and streamline testing cycles. Managing complete repository lifecycle with structured Git history on GitHub.',
    skills: ['Decoupled Architecture', 'Git & GitHub', 'Render CI/CD', 'DBMS', 'Modular Services'],
    diagram: 'Feature Branch ➔ Modular Build ➔ Automated Cloud Deploy (Render)',
    icon: Cpu,
  },
  {
    number: '04',
    title: 'UI & COMPONENT ARCHITECTURE',
    subtitle: 'Performant, accessible, and responsive user experiences',
    description: 'Crafting responsive layouts that scale seamlessly across viewport breakpoints. Implementing accessible semantic structure, design tokens, and smooth, non-intrusive micro-interactions.',
    skills: ['Tailwind CSS', 'Vite', 'Responsive UX', 'Semantic HTML5', 'CSS3', 'Modern Web Standards'],
    diagram: 'Design Tokens ➔ Reusable Components ➔ Accessible Responsive UI',
    icon: Layout,
  },
];

export default function Capabilities() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="capabilities" className="py-28 px-6 sm:px-8 lg:px-12 relative border-t border-white/[0.06] bg-[#07090e]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Identifier */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase">
              02 / CAPABILITIES
            </span>
            <span className="w-12 h-[1px] bg-slate-800" />
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:inline">
            CORE DOMAINS
          </span>
        </div>

        {/* Section Heading */}
        <div className="max-w-3xl space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Engineering Domains & Competencies
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Four specialized technical pillars combining systems architecture, algorithmic precision, and practical delivery.
          </p>
        </div>

        {/* Interactive Capability Layout (Not 4 identical plain cards!) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Capability Selector List */}
          <div className="lg:col-span-6 space-y-3">
            {CAPABILITY_AREAS.map((cap, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={cap.number}
                  onClick={() => setActiveIdx(idx)}
                  className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-white/[0.04] border-white/20 shadow-xl'
                      : 'bg-transparent border-white/[0.05] hover:border-white/10 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-mono font-bold ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                          {cap.number}
                        </span>
                        <h3 className={`font-display text-lg sm:text-xl font-bold tracking-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>
                          {cap.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 font-mono pl-7">
                        {cap.subtitle}
                      </p>
                    </div>

                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 mt-1 shrink-0 ${
                      isActive ? 'text-cyan-400 translate-x-1' : 'text-slate-600'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep Architectural Inspector of Active Capability */}
          <div className="lg:col-span-6 rounded-2xl bg-[#0a0e17] border border-white/10 p-8 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                    DOMAIN {CAPABILITY_AREAS[activeIdx].number} SPECIFICATION
                  </span>
                  <h4 className="font-display text-2xl font-bold text-white tracking-tight">
                    {CAPABILITY_AREAS[activeIdx].title}
                  </h4>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {CAPABILITY_AREAS[activeIdx].description}
              </p>

              {/* Architectural Relationship Flow Diagram */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/[0.08] space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  SYSTEM / PIPELINE FLOW
                </span>
                <div className="text-xs sm:text-sm font-mono text-cyan-300 font-medium">
                  {CAPABILITY_AREAS[activeIdx].diagram}
                </div>
              </div>

              {/* Applied Skills */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                  DEMONSTRATED TECHNOLOGIES & CONCEPTS
                </span>
                <div className="flex flex-wrap gap-2">
                  {CAPABILITY_AREAS[activeIdx].skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
