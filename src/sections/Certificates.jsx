import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { certificates } = portfolioData;

export default function Certificates() {
  return (
    <section id="certificates" className="relative scroll-mt-28 bg-[#07080a]/75 backdrop-blur-[2px] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-white/[0.06]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-lime-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12141a] border border-lime-500/30 text-lime-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(132,204,22,0.15)]"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
          <span>VERIFIED CREDENTIALS</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold tracking-tight text-center leading-[1.05] text-white max-w-3xl mb-4"
          style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}
        >
          Industry credentials &amp; certifications.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-neutral-400 text-sm sm:text-base text-center max-w-xl mb-16 font-light"
        >
          Verified milestones in systems programming, cyber hygiene, and hackathon problem solving.
        </motion.p>

        {/* 3 Certificates Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-[#0d0f17] border border-white/[0.08] p-7 shadow-2xl flex flex-col justify-between hover:border-lime-500/40 transition-all duration-300 group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-lime-400 uppercase font-semibold">
                    CREDENTIAL 0{idx + 1}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-lime-300 transition-colors">
                  {cert.title}
                </h3>

                <p className="text-xs font-mono text-neutral-300 mb-1">
                  {cert.organization}
                </p>

                {cert.date && (
                  <span className="text-[10px] font-mono text-neutral-500 block mb-3">
                    {cert.date}
                  </span>
                )}

                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/[0.06] mt-6">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-white/[0.04] hover:bg-lime-500/10 text-neutral-300 hover:text-lime-400 border border-white/10 hover:border-lime-500/30 text-xs font-mono uppercase tracking-wider transition-all"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
