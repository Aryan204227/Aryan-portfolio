import React from 'react';
import {
  Atom, Server, Network, Database, Code2, FileCode,
  Coffee, Webhook, Zap, Sparkles, Brain, Repeat,
  Cpu, Boxes, GitBranch, Cloud, HardDrive, Terminal
} from 'lucide-react';

// Track 1: Web Frameworks, Core Languages & Backend
const TRACK_1 = [
  { name: 'React.js', tag: 'UI Library', icon: Atom, color: '#38bdf8' },
  { name: 'Node.js', tag: 'Runtime', icon: Server, color: '#22c55e' },
  { name: 'Express.js', tag: 'REST Framework', icon: Network, color: '#e2e8f0' },
  { name: 'MongoDB', tag: 'NoSQL Database', icon: Database, color: '#10b981' },
  { name: 'JavaScript (ES6+)', tag: 'Language', icon: Code2, color: '#facc15' },
  { name: 'TypeScript', tag: 'Typed JS', icon: FileCode, color: '#60a5fa' },
  { name: 'Java', tag: 'Core Language', icon: Coffee, color: '#ea580c' },
  { name: 'REST APIs', tag: 'Architecture', icon: Webhook, color: '#a3e635' },
  { name: 'Vite', tag: 'Build Tool', icon: Zap, color: '#c084fc' },
  { name: 'Tailwind CSS', tag: 'Styling', icon: Sparkles, color: '#38bdf8' },
];

// Track 2: CS Fundamentals, Problem Solving, Systems & Tooling
const TRACK_2 = [
  { name: 'Data Structures & Algorithms', tag: 'Core CS', icon: Brain, color: '#c084fc' },
  { name: 'DFS & Backtracking', tag: 'Algorithms', icon: Repeat, color: '#f43f5e' },
  { name: 'C++ Programming', tag: 'Systems', icon: Cpu, color: '#3b82f6' },
  { name: 'OOP Principles', tag: 'Software Design', icon: Boxes, color: '#e879f9' },
  { name: 'Git & GitHub', tag: 'Version Control', icon: GitBranch, color: '#f97316' },
  { name: 'Render Cloud', tag: 'Deployment', icon: Cloud, color: '#38bdf8' },
  { name: 'DBMS & SQL', tag: 'Relational DB', icon: HardDrive, color: '#3b82f6' },
  { name: 'Python', tag: 'Scripting', icon: Terminal, color: '#38bdf8' },
];

function MarqueeCard({ item }) {
  const Icon = item.icon;
  return (
    <div className="inline-flex items-center gap-3 px-5 py-2.5 mx-2 rounded-full bg-[#0d0f17]/90 border border-white/[0.08] backdrop-blur-md hover:border-lime-400/40 hover:bg-[#121520] transition-all duration-200 select-none group shadow-lg">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${item.color}18`, color: item.color }}
      >
        <Icon className="w-3.5 h-3.5 stroke-[2]" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-white tracking-tight whitespace-nowrap group-hover:text-lime-300 transition-colors">
          {item.name}
        </span>
        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider whitespace-nowrap">
          • {item.tag}
        </span>
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div className="relative w-full py-6 overflow-hidden select-none" aria-label="Verified Technology Showcase">
      {/* Side gradient vignettes for flawless fade */}
      <div className="absolute top-0 bottom-0 left-0 w-28 sm:w-48 bg-gradient-to-r from-[#07080a] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-28 sm:w-48 bg-gradient-to-l from-[#07080a] to-transparent z-10 pointer-events-none" />

      {/* Track 1: Right to Left */}
      <div className="flex mb-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-content marquee-left flex items-center">
          <div className="flex shrink-0">
            {TRACK_1.map((item, idx) => (
              <MarqueeCard key={`t1-a-${idx}`} item={item} />
            ))}
          </div>
          <div className="flex shrink-0" aria-hidden="true">
            {TRACK_1.map((item, idx) => (
              <MarqueeCard key={`t1-b-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Track 2: Left to Right */}
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-content marquee-right flex items-center">
          <div className="flex shrink-0">
            {TRACK_2.map((item, idx) => (
              <MarqueeCard key={`t2-a-${idx}`} item={item} />
            ))}
          </div>
          <div className="flex shrink-0" aria-hidden="true">
            {TRACK_2.map((item, idx) => (
              <MarqueeCard key={`t2-b-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
