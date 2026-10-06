import React from 'react';
import { ShieldCheck, ExternalLink, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Certificates() {
  const { certificates } = portfolioData;

  return (
    <section id="certificates" className="py-28 px-6 sm:px-8 lg:px-12 relative border-t border-white/[0.06] bg-[#07090e]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Identifier */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase">
              06 / CERTIFICATIONS
            </span>
            <span className="w-12 h-[1px] bg-slate-800" />
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:inline">
            3 VERIFIED CREDENTIALS
          </span>
        </div>

        {/* Section Heading */}
        <div className="max-w-3xl space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Verified Certifications
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Official credentials verified by industry programs and technical hackathons.
          </p>
        </div>

        {/* Elegant Horizontal Credential Strip / Wall */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between space-y-8 hover:bg-white/[0.04]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 flex items-center gap-1.5 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>VERIFIED</span>
                  </span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {cert.date}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
                    {cert.organization}
                  </p>
                </div>
              </div>

              {/* View Certificate Link */}
              <div className="pt-4 border-t border-white/[0.06]">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-mono text-xs tracking-wider uppercase transition-colors"
                >
                  <span>VIEW CREDENTIAL</span>
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
