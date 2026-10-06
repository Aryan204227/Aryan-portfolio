import React from 'react';
import { Calendar, MapPin, GraduationCap } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-28 px-6 sm:px-8 lg:px-12 relative border-t border-white/[0.06] bg-[#07080c]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Identifier */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase">
            07 / EDUCATION & JOURNEY
          </span>
          <span className="w-12 h-[1px] bg-slate-800" />
        </div>

        {/* Section Heading */}
        <div className="max-w-3xl space-y-3">
          <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Academic Journey
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
            Formal computer science education and foundational science milestones.
          </p>
        </div>

        {/* Cinematic Vertical Timeline */}
        <div className="relative pl-8 sm:pl-12 space-y-12 before:absolute before:left-[13px] sm:before:left-[19px] before:top-3 before:bottom-3 before:w-[1.5px] before:bg-gradient-to-b before:from-cyan-400 before:via-white/20 before:to-transparent">
          {education.map((item, idx) => (
            <div key={idx} className="relative group space-y-2">
              
              {/* Timeline Indicator Node */}
              <div 
                className={`absolute -left-[32px] sm:-left-[38px] top-1.5 w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  item.isCurrent
                    ? 'bg-cyan-400 border-cyan-300 shadow-md shadow-cyan-500/50'
                    : 'bg-[#07080c] border-white/30 group-hover:border-white'
                }`}
              >
                {item.isCurrent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                )}
              </div>

              {/* Card Container */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all duration-300 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-cyan-400 font-bold uppercase tracking-wider">
                      {item.period}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {item.location}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/70 px-3 py-1 rounded-full border border-cyan-800/40">
                    {item.grade}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {item.institution}
                  </h3>
                  <p className="text-sm font-mono text-slate-300 mt-1">
                    {item.degree} — <span className="text-slate-400">{item.field}</span>
                  </p>
                </div>

                {item.highlights && (
                  <ul className="pt-2 border-t border-white/[0.06] space-y-1 text-xs text-slate-400 font-sans">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
