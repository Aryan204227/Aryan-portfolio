import React from 'react';
import {
  Atom, Server, Network, Database, Code2,
  Coffee, Webhook, Zap, Sparkles, Brain,
  Repeat, Boxes, GitBranch, Cloud, HardDrive,
  Layout, Palette
} from 'lucide-react';

/**
 * TechMarquee.jsx — Verified technology showcase
 *
 * Two tracks moving in opposite directions, continuously and seamlessly.
 * Track 1: Core languages + Web frameworks (right → left)
 * Track 2: Tools + CS Fundamentals (left → right)
 *
 * Skills sourced exclusively from portfolioData.js:
 * JavaScript, React.js, Node.js, Express.js, MongoDB, Java,
 * REST APIs, Vite, Tailwind CSS, HTML5, CSS3, Git, GitHub,
 * Render, DBMS, DSA, Recursion, DFS, Backtracking, OOP
 *
 * NOT included: Three.js, GSAP, TypeScript, Docker, Python (not primary), etc.
 */

// ── Track 1: Primary web stack and languages ─────────────────────
const TRACK_1 = [
  { name: 'React.js',      tag: 'UI Library',       icon: Atom,       color: '#38bdf8' },
  { name: 'JavaScript',    tag: 'Language',          icon: Code2,      color: '#facc15' },
  { name: 'Node.js',       tag: 'Runtime',           icon: Server,     color: '#22c55e' },
  { name: 'Express.js',    tag: 'REST Framework',    icon: Network,    color: '#e2e8f0' },
  { name: 'MongoDB',       tag: 'NoSQL Database',    icon: Database,   color: '#10b981' },
  { name: 'Java',          tag: 'Core Language',     icon: Coffee,     color: '#ea580c' },
  { name: 'REST APIs',     tag: 'Architecture',      icon: Webhook,    color: '#a3e635' },
  { name: 'Tailwind CSS',  tag: 'Styling',           icon: Sparkles,   color: '#38bdf8' },
  { name: 'HTML5',         tag: 'Markup',            icon: Layout,     color: '#f97316' },
  { name: 'CSS3',          tag: 'Styling',           icon: Palette,    color: '#60a5fa' },
  { name: 'Vite',          tag: 'Build Tool',        icon: Zap,        color: '#c084fc' },
];

// ── Track 2: CS fundamentals + tooling ───────────────────────────
const TRACK_2 = [
  { name: 'Data Structures & Algorithms', tag: 'Core CS',          icon: Brain,      color: '#c084fc' },
  { name: 'DFS & Backtracking',           tag: 'Algorithms',       icon: Repeat,     color: '#f43f5e' },
  { name: 'OOP Principles',               tag: 'Software Design',  icon: Boxes,      color: '#e879f9' },
  { name: 'Git & GitHub',                 tag: 'Version Control',  icon: GitBranch,  color: '#f97316' },
  { name: 'Render Cloud',                 tag: 'Deployment',       icon: Cloud,      color: '#38bdf8' },
  { name: 'MongoDB / DBMS',               tag: 'Databases',        icon: HardDrive,  color: '#3b82f6' },
  { name: 'Recursion',                    tag: 'CS Fundamentals',  icon: Repeat,     color: '#fb923c' },
  { name: 'MERN Stack',                   tag: 'Full Stack',       icon: Server,     color: '#84cc16' },
];

function MarqueeCard({ item }) {
  const Icon = item.icon;
  return (
    <div
      className="inline-flex items-center gap-3 px-5 py-2.5 mx-2 rounded-full border border-white/[0.07] backdrop-blur-sm hover:border-lime-400/40 hover:bg-[#0d1117]/60 transition-all duration-200 select-none group"
      style={{ background: 'rgba(10, 12, 18, 0.75)' }}
    >
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundColor: `${item.color}18`, color: item.color }}
      >
        <Icon className="w-3.5 h-3.5 stroke-[2]" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-white tracking-tight whitespace-nowrap group-hover:text-lime-300 transition-colors duration-200">
          {item.name}
        </span>
        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider whitespace-nowrap hidden sm:inline">
          · {item.tag}
        </span>
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div
      className="relative w-full py-5 overflow-hidden select-none"
      aria-label="Verified technology skills showcase"
    >
      {/* Edge fade vignettes */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #07080a, transparent)' }} />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #07080a, transparent)' }} />

      {/* Track 1: Right → Left */}
      <div className="flex mb-4 overflow-hidden">
        <div className="marquee-left flex items-center">
          <div className="flex shrink-0">
            {TRACK_1.map((item, i) => <MarqueeCard key={`t1a-${i}`} item={item} />)}
          </div>
          <div className="flex shrink-0" aria-hidden="true">
            {TRACK_1.map((item, i) => <MarqueeCard key={`t1b-${i}`} item={item} />)}
          </div>
        </div>
      </div>

      {/* Track 2: Left → Right */}
      <div className="flex overflow-hidden">
        <div className="marquee-right flex items-center">
          <div className="flex shrink-0">
            {TRACK_2.map((item, i) => <MarqueeCard key={`t2a-${i}`} item={item} />)}
          </div>
          <div className="flex shrink-0" aria-hidden="true">
            {TRACK_2.map((item, i) => <MarqueeCard key={`t2b-${i}`} item={item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
