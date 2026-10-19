import React from 'react';
import { motion } from 'framer-motion';
import {
  Atom, Server, Network, Database, Code2, FileCode,
  Coffee, Webhook, Zap, Sparkles, Brain, Repeat,
  Cpu, Boxes, GitBranch, Cloud, HardDrive, Terminal
} from 'lucide-react';

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

const TRACK_2 = [
  { name: 'Data Structures & Algorithms', tag: 'Problem Solving', icon: Brain, color: '#c084fc' },
  { name: 'DFS & Backtracking', tag: 'Graph Algorithms', icon: Repeat, color: '#f43f5e' },
  { name: 'C++ Programming', tag: 'Systems & Algorithmic', icon: Cpu, color: '#3b82f6' },
  { name: 'OOP Principles', tag: 'Design Paradigms', icon: Boxes, color: '#e879f9' },
  { name: 'Git & GitHub', tag: 'Version Control', icon: GitBranch, color: '#f97316' },
  { name: 'Render Cloud', tag: 'Deployment', icon: Cloud, color: '#38bdf8' },
  { name: 'DBMS & SQL', tag: 'Relational DB', icon: HardDrive, color: '#3b82f6' },
  { name: 'Python', tag: 'Scripting', icon: Terminal, color: '#38bdf8' },
];

function MarqueeCard({ item }) {
  const Icon = item.icon;
  return (
    <div className="inline-flex items-center gap-3 px-5 py-2.5 mx-2 rounded-full bg-[#11131a]/85 border border-white/[0.08] backdrop-blur-md hover:border-white/20 transition-all select-none">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${item.color}15`, color: item.color }}
      >
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-white tracking-tight whitespace-nowrap">
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
  // Duplicate tracks to ensure seamless infinite loop
  const track1Items = [...TRACK_1, ...TRACK_1, ...TRACK_1];
  const track2Items = [...TRACK_2, ...TRACK_2, ...TRACK_2];

  return (
    <div className="relative w-full py-8 overflow-hidden select-none" aria-label="Technology Marquee">
      {/* Edge Vignette / Gradient Masks for editorial fade */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      {/* Track 1: Right to Left */}
      <div className="flex mb-3.5 overflow-hidden">
        <div className="animate-marquee-left">
          {track1Items.map((item, idx) => (
            <MarqueeCard key={`t1-${idx}`} item={item} />
          ))}
        </div>
      </div>

      {/* Track 2: Left to Right */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee-right">
          {track2Items.map((item, idx) => (
            <MarqueeCard key={`t2-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
