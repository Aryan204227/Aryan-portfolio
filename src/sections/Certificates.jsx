import React from 'react';
import { ShieldCheck, ExternalLink, Calendar, Building, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Certificates() {
  const { certificates } = portfolioData;

  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8 relative border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>05 / Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications & Hackathons
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Official technical credentials and hackathon participation verified via issuing organizations.
          </p>
        </div>

        {/* 3-Column Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group relative rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20"
            >
              <div className="space-y-4">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:text-cyan-300 transition-all">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-850">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {cert.date}
                  </span>
                </div>

                {/* Title & Org */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{cert.organization}</span>
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-6 mt-4 border-t border-slate-800/80">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 hover:border-cyan-500/50 transition-all shadow-sm"
                >
                  <span>View Certificate</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
