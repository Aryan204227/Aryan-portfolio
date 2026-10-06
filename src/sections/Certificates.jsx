import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { certificates } = portfolioData;

export default function Certificates() {
  return (
    <section id="certificates" className="relative bg-[#0a0a0a] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">

        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161616] border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
        >
          <span className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center text-[10px] text-orange-400 font-bold">
            📜
          </span>
          <span>CREDENTIALS</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold tracking-tight text-center leading-[1.05] text-white max-w-3xl mb-16"
          style={{ fontSize: 'clamp(36px, 5.5vw, 68px)' }}
        >
          Verified industry certifications &amp; milestones.
        </motion.h2>

        {/* 3 Certificates Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="rounded-3xl bg-[#121214] border border-white/10 p-7 shadow-2xl flex flex-col justify-between hover:border-orange-500/40 transition-all duration-300 group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-orange-400 uppercase font-semibold">
                    CREDENTIAL 0{idx + 1}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-orange-300 transition-colors">
                  {cert.title}
                </h3>

                <p className="text-xs font-mono text-neutral-400 mb-1">
                  {cert.organization}
                </p>

                {cert.date && (
                  <span className="text-[10px] font-mono text-neutral-500 block">
                    {cert.date}
                  </span>
                )}
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-white/[0.05] hover:bg-orange-500/20 text-neutral-300 hover:text-orange-400 border border-white/10 hover:border-orange-500/30 text-xs font-mono uppercase tracking-wider transition-all"
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
