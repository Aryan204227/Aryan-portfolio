import React from 'react';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-28 px-6 sm:px-8 lg:px-12 relative border-t border-white/[0.06] bg-[#07090e]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Identifier */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase">
            07 / EDUCATION
          </span>
          <span className="w-12 h-[1px] bg-slate-800" />
        </div>

        {/* Section Heading */}
        <div className="max-w-3xl space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Academic Foundation
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Formal engineering degree and foundational sciences.
          </p>
        </div>

        {/* Minimal Editorial Vertical Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-[11px] sm:before:left-[19px] before:top-2 before:bottom-2 before:w-[1px] before:bg-gradient-to-b before:from-cyan-400 before:via-white/20 before:to-transparent">
          {education.map((item, idx) => (
            <div key={idx} className="relative group space-y-2">
              
              {/* Timeline Indicator */}
              <div 
                className={`absolute -left-[30px] sm:-left-[38px] top-1.5 w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  item.isCurrent
                    ? 'bg-cyan-400 border-cyan-300 shadow-md shadow-cyan-500/50'
                    : 'bg-[#07090e] border-white/30 group-hover:border-white'
                }`}
              >
                {item.isCurrent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                )}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider">
                    {item.period}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">{item.location}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                    {item.institution}
                  </h3>
                  <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-800/40 w-fit">
                    {item.grade}
                  </span>
                </div>

                <p className="text-sm font-mono text-slate-300">
                  {item.degree} — <span className="text-slate-400">{item.field}</span>
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
