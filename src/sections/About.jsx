import React from 'react';
import { User, Terminal, Code, Cpu, GraduationCap, Award, MapPin, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { personalInfo } = portfolioData;

  const coreStrengths = [
    {
      title: "Full Stack Architecture",
      desc: "Building decoupled client-server applications with React.js, Node.js, Express, and MongoDB.",
      icon: Terminal,
    },
    {
      title: "Data Structures & Algorithms",
      desc: "Trained in arrays, recursion, backtracking, and DFS with structured LeetCode problem solving.",
      icon: Cpu,
    },
    {
      title: "Cloud & Deployment",
      desc: "Independent frontend/backend deployments on Render with production REST API integrations.",
      icon: Code,
    },
    {
      title: "Disciplined Version Control",
      desc: "Clean Git commits, modular codebases, and end-to-end repository management on GitHub.",
      icon: Award,
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2">
            <User className="w-4 h-4" />
            <span>01 / About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Practical Solutions with Code & Algorithms
          </h2>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Narrative Summary */}
          <div className="lg:col-span-6 space-y-5 text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              I am a <strong className="text-white font-semibold">Computer Science & Engineering student</strong> at Lovely Professional University, specializing in <span className="text-cyan-300">Full Stack Development</span> and algorithmic problem solving.
            </p>
            <p>
              My primary technical focus centers around the <strong className="text-white font-semibold">MERN stack</strong> (React.js, Node.js, Express.js, MongoDB) and <strong className="text-white font-semibold">Java</strong>. Rather than building surface-level demos, I focus on building reliable software with clean separation of concerns — from architecting decoupled cloud services to implementing algorithmic pathfinding visualizers using recursive backtracking and DFS.
            </p>
            <p>
              Alongside web engineering, I continuously refine my computer science fundamentals through guided training in Data Structures & Algorithms, solving structured problem sets on LeetCode with an emphasis on coding efficiency and pattern recognition.
            </p>

            {/* Quick Facts Card */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block mb-1">Education</span>
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  B.Tech CSE (2024–Present)
                </span>
                <span className="text-cyan-300 font-mono text-[11px] block mt-0.5">CGPA: 7.07</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block mb-1">Location</span>
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  Punjab / HP, India
                </span>
                <span className="text-slate-400 font-mono text-[11px] block mt-0.5">Open to Relocation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Competencies Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coreStrengths.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 group-hover:border-cyan-500/40 transition-all">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
