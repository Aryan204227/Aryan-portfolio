import React from 'react';
import { 
  Code2, 
  Terminal, 
  FileCode, 
  Coffee, 
  Cpu, 
  Binary, 
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
  Boxes, 
  TableProperties, 
  Workflow, 
  CheckCircle2, 
  Clock, 
  Compass,
  Layers
} from 'lucide-react';

const ICON_MAP = {
  Code2,
  Terminal,
  FileCode,
  Coffee,
  Cpu,
  Binary,
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
  Boxes,
  TableProperties,
  Workflow,
  CheckCircle2,
  Clock,
  Compass,
  Layers
};

export default function TechBadge({ name, icon, size = 'sm', className = '' }) {
  const IconComponent = (icon && ICON_MAP[icon]) ? ICON_MAP[icon] : Code2;

  const sizeClasses = {
    xs: 'text-xs px-2.5 py-1 gap-1.5',
    sm: 'text-xs md:text-sm px-3 py-1.5 gap-2',
    md: 'text-sm px-4 py-2 gap-2.5',
  }[size] || 'text-xs px-3 py-1.5 gap-2';

  return (
    <span 
      className={`inline-flex items-center font-medium rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-slate-800/90 transition-all duration-200 select-none shadow-sm ${sizeClasses} ${className}`}
    >
      <IconComponent className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
      <span>{name}</span>
    </span>
  );
}
