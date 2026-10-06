import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 relative border-t border-slate-800/60 bg-[#0a0d14]/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>06 / Academic History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Formal academic background in Computer Science & Engineering and foundational science.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 space-y-10 before:absolute before:left-[11px] sm:before:left-[19px] before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-cyan-500 before:via-slate-700 before:to-slate-800">
          {education.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Indicator Dot */}
              <div 
                className={`absolute -left-[30px] sm:-left-[38px] top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  item.isCurrent
                    ? 'bg-cyan-500 border-cyan-400 ring-4 ring-cyan-500/20'
                    : 'bg-slate-900 border-slate-600 group-hover:border-cyan-400'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${item.isCurrent ? 'bg-slate-950 animate-ping' : 'bg-slate-400'}`} />
              </div>

              {/* Timeline Card */}
              <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-7 hover:border-slate-700 transition-all duration-300 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-mono font-medium text-cyan-400 uppercase tracking-wide">
                      {item.degree}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">
                      {item.institution}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {item.period}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {item.location}
                  </span>
                  <span>•</span>
                  <span>{item.field}</span>
                  <span>•</span>
                  <span className="text-cyan-300 font-mono font-semibold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                    {item.grade}
                  </span>
                </div>

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="space-y-1.5 border-t border-slate-800/70 pt-3">
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
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
