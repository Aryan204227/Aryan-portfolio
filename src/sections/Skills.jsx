import React, { useState } from 'react';
import { 
  Code2, 
  Layers, 
  Database, 
  Cpu, 
  Sparkles, 
  Terminal, 
  FileCode, 
  Coffee, 
  Binary, 
  Atom, 
  Server, 
  Network, 
  Layout, 
  Palette, 
  Zap, 
  Webhook, 
  GitBranch, 
  GitCommit, 
  Cloud, 
  HardDrive, 
  Brain, 
  Repeat, 
  GitFork, 
  Boxes, 
  TableProperties, 
  Workflow, 
  CheckCircle2, 
  Clock, 
  Compass 
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Icon mapping lookup
const ICON_MAP = {
  JavaScript: FileCode,
  TypeScript: FileCode,
  Java: Coffee,
  "C++": Cpu,
  C: Binary,
  Python: Terminal,
  "React.js": Atom,
  "Node.js": Server,
  "Express.js": Network,
  HTML5: Layout,
  CSS3: Palette,
  Vite: Zap,
  "Tailwind CSS": Sparkles,
  "REST APIs": Webhook,
  Git: GitBranch,
  GitHub: GitCommit,
  Render: Cloud,
  MongoDB: Database,
  DBMS: HardDrive,
  "Data Structures & Algorithms": Brain,
  "Recursion & Backtracking": Repeat,
  "DFS (Depth First Search)": GitFork,
  "Object-Oriented Programming (OOP)": Boxes,
  "DBMS & SQL": TableProperties,
  Multithreading: Workflow,
  "Problem-Solving": CheckCircle2,
  "Time Management": Clock,
  Adaptability: Compass
};

export default function Skills() {
  const { skills } = portfolioData;
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'languages', label: 'Languages' },
    { id: 'webFrameworks', label: 'Web & Frameworks' },
    { id: 'toolsDatabase', label: 'Tools & Database' },
    { id: 'csFundamentals', label: 'CS Fundamentals' },
    { id: 'softSkills', label: 'Strengths' },
  ];

  // Helper to get skills for active category
  const getDisplayedSkillGroups = () => {
    if (activeCategory === 'all') {
      return [
        { title: 'Programming Languages', items: skills.languages, color: 'from-amber-500/20 to-orange-500/20' },
        { title: 'Web & Frameworks', items: skills.webFrameworks, color: 'from-cyan-500/20 to-blue-500/20' },
        { title: 'Tools & Database', items: skills.toolsDatabase, color: 'from-emerald-500/20 to-teal-500/20' },
        { title: 'Computer Science Fundamentals', items: skills.csFundamentals, color: 'from-indigo-500/20 to-purple-500/20' },
        { title: 'Professional Strengths', items: skills.softSkills, color: 'from-sky-500/20 to-cyan-500/20' },
      ];
    }
    const catMap = {
      languages: { title: 'Programming Languages', items: skills.languages, color: 'from-amber-500/20 to-orange-500/20' },
      webFrameworks: { title: 'Web & Frameworks', items: skills.webFrameworks, color: 'from-cyan-500/20 to-blue-500/20' },
      toolsDatabase: { title: 'Tools & Database', items: skills.toolsDatabase, color: 'from-emerald-500/20 to-teal-500/20' },
      csFundamentals: { title: 'Computer Science Fundamentals', items: skills.csFundamentals, color: 'from-indigo-500/20 to-purple-500/20' },
      softSkills: { title: 'Professional Strengths', items: skills.softSkills, color: 'from-sky-500/20 to-cyan-500/20' },
    };
    return [catMap[activeCategory]];
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative border-t border-slate-800/60 bg-[#0a0d14]/70">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2">
              <Cpu className="w-4 h-4" />
              <span>02 / Technical Competencies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Verified Technical Skills
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Technologies and computer science foundations actively practiced in projects and algorithmic training.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Groups */}
        <div className="space-y-8">
          {getDisplayedSkillGroups().map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-3">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>{group.title}</span>
                <span className="text-slate-600 font-normal">({group.items.length})</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {group.items.map((skill, idx) => {
                  const IconComp = ICON_MAP[skill.name] || Code2;
                  return (
                    <div
                      key={idx}
                      className="group relative flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/95 transition-all duration-200 cursor-default shadow-sm hover:shadow-cyan-500/10 hover:-translate-y-0.5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 transition-transform shrink-0">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white block truncate">
                          {skill.name}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block truncate">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
