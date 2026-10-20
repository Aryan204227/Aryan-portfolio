import React from 'react';
import {
  Atom, Server, Network, Database, Code2,
  Coffee, Webhook, Zap, Sparkles, Brain,
  Repeat, GitBranch, Cloud,
  Layout, Palette, GitFork, FileCode, Cpu, Terminal
} from 'lucide-react';

/**
 * TechMarquee.jsx — Continuous Bidirectional Technology Tracks
 * Sourced directly from Aryan Dadwal's authentic resume:
 *
 * Track 1: Web & Full-Stack Technologies (Right → Left)
 * Track 2: Languages, Tools & CS Fundamentals (Left → Right)
 *
 * Runs continuously and infinitely independent of hover or scroll.
 */

export const STREAM_1 = [
  { name: 'React.js',      tag: 'Web & Frameworks',   icon: Atom,       color: '#38bdf8' },
  { name: 'Node.js',       tag: 'Web & Frameworks',   icon: Server,     color: '#22c55e' },
  { name: 'Express.js',    tag: 'Web & Frameworks',   icon: Network,    color: '#e2e8f0' },
  { name: 'JavaScript',    tag: 'Languages',          icon: Code2,      color: '#facc15' },
  { name: 'REST APIs',     tag: 'Web & Frameworks',   icon: Webhook,    color: '#a3e635' },
  { name: 'Tailwind CSS',  tag: 'Web & Frameworks',   icon: Sparkles,   color: '#38bdf8' },
  { name: 'Vite',          tag: 'Web & Frameworks',   icon: Zap,        color: '#c084fc' },
  { name: 'HTML5',         tag: 'Web & Frameworks',   icon: Layout,     color: '#f97316' },
  { name: 'CSS3',          tag: 'Web & Frameworks',   icon: Palette,    color: '#60a5fa' },
  { name: 'MongoDB',       tag: 'Tools & Database',   icon: Database,   color: '#10b981' },
];

export const STREAM_2 = [
  { name: 'Java',                         tag: 'Languages',          icon: Coffee,     color: '#ea580c' },
  { name: 'Data Structures & Algorithms', tag: 'CS Fundamentals',    icon: Brain,      color: '#c084fc' },
  { name: 'DFS',                          tag: 'CS Fundamentals',    icon: GitFork,    color: '#f43f5e' },
  { name: 'Backtracking',                 tag: 'CS Fundamentals',    icon: Repeat,     color: '#fb923c' },
  { name: 'Recursion',                    tag: 'CS Fundamentals',    icon: Repeat,     color: '#38bdf8' },
  { name: 'TypeScript',                   tag: 'Languages',          icon: FileCode,   color: '#60a5fa' },
  { name: 'C++',                          tag: 'Languages',          icon: Cpu,        color: '#3b82f6' },
  { name: 'Python',                       tag: 'Languages',          icon: Terminal,   color: '#38bdf8' },
  { name: 'Git & GitHub',                 tag: 'Tools & Database',   icon: GitBranch,  color: '#f97316' },
  { name: 'Render',                       tag: 'Tools & Database',   icon: Cloud,      color: '#38bdf8' },
];

function StreamChip({ item }) {
  const Icon = item.icon;
  return (
    <div
      className="inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 mx-2 rounded-full border border-white/[0.08] hover:border-lime-400/40 transition-colors duration-200 select-none group"
      style={{
        background: 'linear-gradient(135deg, rgba(14,18,26,0.88) 0%, rgba(9,12,18,0.95) 100%)',
        boxShadow: '0 4px 18px rgba(0,0,0,0.35)',
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
      className="relative w-full py-3 overflow-hidden select-none"
      aria-label="Verified technology streams"
    >
      {/* Edge Fade Vignettes */}
      <div
        className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(7,8,10,0.95), transparent)' }}
      />
      <div
        className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, rgba(7,8,10,0.95), transparent)' }}
      />

      {/* Track 1: Right → Left (Continuous) */}
      <div className="flex mb-3 overflow-hidden">
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
