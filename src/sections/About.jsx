import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { personalInfo } = portfolioData;

  const profileStats = [
    { label: 'EDUCATION', value: 'B.TECH CSE', sub: '2024 — PRESENT' },
    { label: 'ACADEMIC CGPA', value: '7.07', sub: 'LOVELY PROFESSIONAL UNIV.' },
    { label: 'PRIMARY FOCUS', value: 'FULL STACK & DSA', sub: 'MERN + JAVA' },
    { label: 'LOCATION', value: 'INDIA', sub: 'OPEN TO RELOCATION' },
  ];

  return (
    <section id="about" className="py-28 px-6 sm:px-8 lg:px-12 relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Identifier */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase">
            01 / WHO I AM
          </span>
          <span className="w-12 h-[1px] bg-slate-800" />
        </div>

        {/* Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Engineering with curiosity. <br />
              <span className="text-gradient-editorial">Building with purpose.</span>
            </h2>

            <div className="space-y-5 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                I am a Computer Science & Engineering student at <strong className="text-white font-medium">Lovely Professional University</strong>, passionate about transforming abstract algorithmic concepts into resilient, user-facing digital applications.
              </p>
              <p>
                My development workflow bridges <strong className="text-white font-medium">MERN stack architecture</strong> with disciplined <strong className="text-white font-medium">Data Structures & Algorithms in Java</strong>. Rather than assembling fragile demos, I focus on clean separation of concerns — designing decoupled client-server micro-modules, writing recursive search engines, and optimizing data flow.
              </p>
              <p>
                From visualizing pathfinding algorithms with real-time recursion tracking to architecting career matching platforms with weighted algorithms, my goal is always the same: code that is structured, testable, and genuinely useful.
              </p>
            </div>
          </div>

          {/* Right Column: Identity Panel (Minimal information strip, NOT boxed cards) */}
          <div className="lg:col-span-5 border-l border-white/[0.08] pl-8 lg:pl-10 space-y-8">
            <span className="text-[11px] font-mono tracking-widest text-slate-500 uppercase block">
              PROFILE SPECIFICATIONS
            </span>

            <div className="space-y-6">
              {profileStats.map((item, idx) => (
                <div key={idx} className="group border-b border-white/[0.05] pb-5">
                  <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase block mb-1">
                    {item.label}
                  </span>
                  <div className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                    {item.value}
                  </div>
                  <span className="text-xs text-slate-400 font-mono block mt-0.5">
                    {item.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* University Tag */}
            <div className="pt-2 text-xs font-mono text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>LPU School of Computer Science & Engineering</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
