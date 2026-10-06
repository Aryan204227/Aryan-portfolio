import React, { useState } from 'react';
import { ArrowUpRight, Layers, Binary, Server, Layout, CheckCircle2 } from 'lucide-react';

const DISCIPLINES = [
  {
    number: '01',
    title: 'FULL STACK DEVELOPMENT',
    tagline: 'End-to-end MERN architectures with decoupled cloud deployment',
    description: 'Engineering resilient web applications from dynamic single-page clients to RESTful backend endpoints and MongoDB datastores. Focused on modularity, clean state management, and reliable deployment.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Render Cloud'],
    icon: Layers,
    bgAccent: 'from-cyan-950/20 via-transparent to-transparent'
  },
  {
    number: '02',
    title: 'ALGORITHMIC PROBLEM SOLVING',
    tagline: 'Data structures, recursion, and search-space tree exploration',
    description: 'Developing mathematical and algorithmic solutions in Java. Experienced in recursion, state backtracking, and depth-first search (DFS) with live telemetry tracking.',
    technologies: ['Java', 'Data Structures', 'DFS', 'Recursion', 'Backtracking', 'LeetCode'],
    icon: Binary,
    bgAccent: 'from-blue-950/20 via-transparent to-transparent'
  },
  {
    number: '03',
    title: 'BACKEND & API ENGINEERING',
    tagline: 'Independent service layers, schema design, and asynchronous runtimes',
    description: 'Architecting decoupled server modules using Node.js and Express. Designing RESTful API routes, validation pipelines, and MongoDB schemas with zero frontend coupling.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Render', 'DBMS'],
    icon: Server,
    bgAccent: 'from-emerald-950/20 via-transparent to-transparent'
  },
  {
    number: '04',
    title: 'INTERFACE ENGINEERING',
    tagline: 'High-performance responsive design tokens and component systems',
    description: 'Crafting responsive user interfaces with semantic HTML5, modern CSS3, and Tailwind CSS. Implementing design tokens, accessible keyboard interactions, and subtle motion.',
    technologies: ['React.js', 'Tailwind CSS', 'Responsive UI', 'Modern UX', 'Vite', 'HTML5 & CSS3'],
    icon: Layout,
    bgAccent: 'from-indigo-950/20 via-transparent to-transparent'
  }
];

export default function Expertise() {
  const [hoveredIdx, setHoveredIdx] = useState(0);

  return (
    <section id="expertise" className="py-28 px-6 sm:px-8 lg:px-12 relative border-t border-white/[0.06] bg-[#07080c]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Identifier */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase">
              02 / EXPERTISE
            </span>
            <span className="w-12 h-[1px] bg-slate-800" />
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:inline">
            WHAT I BUILD
          </span>
        </div>

        {/* Section Heading */}
        <div className="max-w-3xl space-y-3">
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Engineering Disciplines
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
            Four specialized areas of technical focus spanning full-stack delivery and algorithmic rigor.
          </p>
        </div>

        {/* Interactive Editorial Discipline Accordion / Showcase */}
        <div className="space-y-4">
          {DISCIPLINES.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            const IconComp = item.icon;

            return (
              <div
                key={item.number}
                onMouseEnter={() => setHoveredIdx(idx)}
                className={`relative rounded-3xl border transition-all duration-500 p-8 sm:p-10 overflow-hidden cursor-pointer ${
                  isHovered
                    ? 'bg-gradient-to-r ' + item.bgAccent + ' bg-[#0c0f18] border-white/20 shadow-2xl scale-[1.01]'
                    : 'bg-white/[0.015] border-white/[0.06] hover:border-white/10'
                }`}
              >
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Title & Number */}
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-cyan-400 font-bold">
                        {item.number}
                      </span>
                      <h3 className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors ${
                        isHovered ? 'text-white' : 'text-slate-300'
                      }`}>
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-sm font-mono text-slate-400 pl-8">
                      {item.tagline}
                    </p>

                    {/* Expanded details visible on active/hover */}
                    <div className={`overflow-hidden transition-all duration-500 pl-8 pt-2 ${
                      isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-sm text-slate-300 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Technologies Pills */}
                  <div className="flex flex-wrap items-center gap-2 pl-8 lg:pl-0 shrink-0 lg:max-w-xs justify-start lg:justify-end">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`text-xs font-mono px-3 py-1 rounded-full border transition-all duration-300 ${
                          isHovered
                            ? 'bg-white/10 text-white border-white/20 shadow-sm'
                            : 'bg-white/[0.03] text-slate-400 border-white/[0.06]'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
