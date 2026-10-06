import React from 'react';
import { Award, ExternalLink, Calendar, Building2, CheckCircle2, BookOpen } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Training() {
  const { training } = portfolioData;

  return (
    <section id="training" className="py-20 px-4 sm:px-6 lg:px-8 relative border-t border-slate-800/60 bg-[#0a0d14]/40">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2">
            <Award className="w-4 h-4" />
            <span>04 / Technical Training & Bootcamps</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Specialized DSA Training
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Structured algorithms program focused on high-efficiency problem solving and interview preparedness.
          </p>
        </div>

        {/* Training Cards */}
        <div className="space-y-6">
          {training.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 hover:border-slate-700 transition-all duration-300 shadow-xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Details */}
                <div className="space-y-4 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/50 text-cyan-300 text-xs font-mono font-medium">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      DSA & LeetCode
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {item.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-cyan-400 mt-1 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" />
                      <span>{item.organization}</span>
                    </p>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>

                  {/* Core Topics Covered */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                      Core Topics Practiced
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.topics.map((topic, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono"
                        >
                          <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                          <span>{topic}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Certificate CTA */}
                <div className="lg:self-center shrink-0">
                  <a
                    href={item.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 hover:border-cyan-500/50 transition-all shadow-md group"
                  >
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span>View Certificate</span>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
