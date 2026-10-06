import React from 'react';
import { Layers, Binary, Cloud, GitBranch, Sparkles, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Highlights() {
  const { highlights } = portfolioData;

  const iconMap = {
    Layers: Layers,
    Binary: Binary,
    Cloud: Cloud,
    GitBranch: GitBranch,
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>07 / Core Engineering Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How I Approach Engineering
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Key principles grounded in full-stack architecture, clean separation of concerns, and verifiable algorithm design.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const IconComp = iconMap[item.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900/90 transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-105 group-hover:border-cyan-500/40 transition-all">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified via Projects</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
