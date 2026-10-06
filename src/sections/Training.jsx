import React from 'react';
import { Award, ExternalLink, Calendar, CheckCircle2, Terminal, BookOpen } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Training() {
  const { training } = portfolioData;
  const item = training[0];

  return (
    <section id="training" className="py-28 px-6 sm:px-8 lg:px-12 relative border-t border-white/[0.06] bg-[#07090e]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Identifier */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase">
            05 / LEARNING & TRAINING
          </span>
          <span className="w-12 h-[1px] bg-slate-800" />
        </div>

        {/* Large Editorial Headline */}
        <div className="max-w-3xl space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Algorithmic Problem-Solving Discipline
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Intensive guided training focused on algorithmic problem sets, patterns, and code optimization.
          </p>
        </div>

        {/* Cinematic Training Showcase Box */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0a0e19] to-[#07090e] border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-800/50 px-3 py-1 rounded-md font-semibold uppercase tracking-wider">
                  INTENSIVE DSA PROGRAM
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {item.duration}
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm font-mono text-slate-400 mt-1">
                  Issued by {item.organization}
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>

              {/* Core Topics Pills */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-semibold">
                  STRUCTURED PROBLEM PATTERNS
                </span>
                <div className="flex flex-wrap gap-2">
                  {item.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{topic}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Certificate Action on the right */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 rounded-2xl bg-black/60 border border-white/[0.08] text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-white">
                  Verified Boot Camp Credential
                </h4>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Issued upon LeetCode curriculum completion
                </p>
              </div>

              <a
                href={item.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white text-slate-950 font-display font-bold text-xs tracking-wider uppercase hover:bg-slate-200 transition-all shadow-md"
              >
                <span>VIEW CERTIFICATE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
