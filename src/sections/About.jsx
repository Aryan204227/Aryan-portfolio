import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { personalInfo } = portfolioData;

  const infoStrip = [
    { label: 'DEGREE', title: 'B.TECH CSE', meta: 'LOVELY PROFESSIONAL UNIVERSITY' },
    { label: 'ACADEMIC RECORD', title: 'CGPA 7.07', meta: 'CLASS OF 2024 — PRESENT' },
    { label: 'PRIMARY FOCUS', title: 'FULL STACK DEVELOPMENT', meta: 'MERN ARCHITECTURE' },
    { label: 'CORE DISCIPLINE', title: 'JAVA + DSA', meta: 'ALGORITHMS & PROBLEM SOLVING' },
  ];

  return (
    <section 
      id="about" 
      className="relative z-20 w-full bg-[#07080c] pt-24 pb-28 px-6 sm:px-8 lg:px-12 rounded-t-[32px] md:rounded-t-[48px] lg:rounded-t-[64px] border-t border-white/15 shadow-[0_-24px_48px_rgba(0,0,0,0.8)]"
      aria-label="About Aryan Dadwal - Full Stack Developer"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header Tag */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase">
            01 / ABOUT ME
          </span>
          <span className="w-12 h-[1px] bg-slate-800" />
        </div>

        {/* Narrative & Editorial Headline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Big Editorial Heading */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Building with curiosity. <br />
              <span className="text-slate-400">Learning by creating.</span>
            </h2>
            <div className="pt-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                COMPUTER SCIENCE & ENGINEERING • LPU
              </span>
            </div>
          </div>

          {/* Concise Personal Narrative */}
          <div className="lg:col-span-6 space-y-5 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            <p>
              I am a Computer Science student at <strong className="text-white font-medium">Lovely Professional University</strong>, focused on full-stack web engineering, algorithms, and practical software design.
            </p>
            <p>
              My work spans modern <strong className="text-white font-medium">MERN stack platforms</strong> (React.js, Node.js, Express.js, MongoDB) and rigorous <strong className="text-white font-medium">Java algorithmic problem solving</strong>. I prioritize building modular systems with clean separation of concerns — from cloud-deployed services to interactive pathfinding engines.
            </p>
            <p>
              Guided by a continuous learning mindset, I practice core patterns including recursion, backtracking, and depth-first search to ensure high coding efficiency and scalable solutions.
            </p>
          </div>

        </div>

        {/* Visual Information Strip (Horizontal Typography Bar, NOT 4 cards) */}
        <div className="pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {infoStrip.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">
                  {item.label}
                </span>
                <div className="font-display text-xl sm:text-2xl font-black text-white tracking-tight">
                  {item.title}
                </div>
                <span className="text-xs text-slate-400 font-mono block">
                  {item.meta}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
