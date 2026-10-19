import React from 'react';
import {
  Atom, Server, Network, Database, Code2,
  Coffee, Webhook, Zap, Sparkles, Brain,
  Repeat, Boxes, GitBranch, Cloud, HardDrive,
  Layout, Palette, GitFork
} from 'lucide-react';

/**
 * TechMarquee.jsx — Verified Technology Streams
 *
 * Sourced exclusively from Aryan Dadwal's authentic profile and codebases:
 * Track 1: Web & Full-Stack Stream (Right → Left)
 * Track 2: Core CS, Architecture & Databases (Left → Right)
 *
 * Continuous motion independent of hover or scroll.
 */

export const STREAM_1 = [
  { name: 'React.js',      tag: 'UI Library',         icon: Atom,       color: '#38bdf8' },
  { name: 'Node.js',       tag: 'Backend Runtime',    icon: Server,     color: '#22c55e' },
  { name: 'Express.js',    tag: 'REST Framework',      icon: Network,    color: '#e2e8f0' },
  { name: 'JavaScript',    tag: 'Core Language',      icon: Code2,      color: '#facc15' },
  { name: 'MERN Stack',    tag: 'Full-Stack Solution', icon: Server,     color: '#84cc16' },
  { name: 'REST APIs',     tag: 'API Architecture',   icon: Webhook,    color: '#a3e635' },
  { name: 'Tailwind CSS',  tag: 'Styling Engine',     icon: Sparkles,   color: '#38bdf8' },
  { name: 'Vite',          tag: 'Build System',       icon: Zap,        color: '#c084fc' },
  { name: 'HTML5',         tag: 'Semantic Markup',    icon: Layout,     color: '#f97316' },
  { name: 'CSS3',          tag: 'Modern Layouts',     icon: Palette,    color: '#60a5fa' },
];

export const STREAM_2 = [
  { name: 'Java',                         tag: 'Core OOP & DSA',     icon: Coffee,     color: '#ea580c' },
  { name: 'Data Structures & Algorithms', tag: 'Core CS',            icon: Brain,      color: '#c084fc' },
  { name: 'DFS Algorithm',                tag: 'Maze & Graph Search', icon: GitFork,   color: '#f43f5e' },
  { name: 'Backtracking',                 tag: 'State-Space Logic',  icon: Repeat,     color: '#fb923c' },
  { name: 'Recursion',                    tag: 'Algorithmic State',  icon: Repeat,     color: '#38bdf8' },
  { name: 'OOP Principles',               tag: 'Modular Architecture', icon: Boxes,    color: '#e879f9' },
  { name: 'MongoDB',                      tag: 'NoSQL Document DB',  icon: Database,   color: '#10b981' },
  { name: 'DBMS & SQL',                   tag: 'Relational Schemas', icon: HardDrive,  color: '#3b82f6' },
  { name: 'Git & GitHub',                 tag: 'Version Control',    icon: GitBranch,  color: '#f97316' },
  { name: 'Render Cloud',                 tag: 'Production Hosting', icon: Cloud,      color: '#38bdf8' },
];

function StreamChip({ item }) {
  const Icon = item.icon;
  return (
    <div
      className="inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 mx-2.5 rounded-full border border-white/[0.08] hover:border-lime-400/50 transition-colors duration-200 select-none group"
      style={{
        background: 'linear-gradient(135deg, rgba(14,18,26,0.85) 0%, rgba(9,12,18,0.92) 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}
    >
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundColor: `${item.color}20`, color: item.color }}
      >
        <Icon className="w-3.5 h-3.5 stroke-[2]" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-white tracking-tight whitespace-nowrap group-hover:text-lime-300 transition-colors">
          {item.name}
        </span>
        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider whitespace-nowrap hidden sm:inline">
          · {item.tag}
        </span>
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div
      className="relative w-full py-4 overflow-hidden select-none"
      aria-label="Verified technology streams"
    >
      {/* Side Fade Vignettes */}
      <div
        className="absolute top-0 bottom-0 left-0 w-20 sm:w-36 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(7,8,10,0.95), transparent)' }}
      />
      <div
        className="absolute top-0 bottom-0 right-0 w-20 sm:w-36 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, rgba(7,8,10,0.95), transparent)' }}
      />

      {/* Track 1: Right → Left (Continuous) */}
      <div className="flex mb-3.5 overflow-hidden">
        <div className="marquee-left flex items-center">
          <div className="flex shrink-0">
            {STREAM_1.map((item, i) => (
              <StreamChip key={`s1-a-${i}`} item={item} />
            ))}
          </div>
          <div className="flex shrink-0" aria-hidden="true">
            {STREAM_1.map((item, i) => (
              <StreamChip key={`s1-b-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Track 2: Left → Right (Continuous) */}
      <div className="flex overflow-hidden">
        <div className="marquee-right flex items-center">
          <div className="flex shrink-0">
            {STREAM_2.map((item, i) => (
              <StreamChip key={`s2-a-${i}`} item={item} />
            ))}
          </div>
          <div className="flex shrink-0" aria-hidden="true">
            {STREAM_2.map((item, i) => (
              <StreamChip key={`s2-b-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
