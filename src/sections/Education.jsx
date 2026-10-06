import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { education } = portfolioData;

export default function Education() {
  return (
    <section id="education" className="relative bg-[#0a0a0a] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-orange-500/[0.02] rounded-full blur-3xl pointer-events-none" />

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
            🎓
          </span>
          <span>ACADEMIC FOUNDATION</span>
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
          Educational journey &amp; academic milestones.
        </motion.h2>

        {/* Timeline Stack */}
        <div className="w-full max-w-3xl space-y-6">
          {education.map((item, idx) => (
            <motion.div
              key={item.institution}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`rounded-3xl bg-[#121214] border p-7 sm:p-8 shadow-xl transition-all duration-300 ${
                item.isCurrent
                  ? 'border-orange-500/40 shadow-[0_0_30px_rgba(249,115,22,0.1)]'
                  : 'border-white/10'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <span className="text-xs font-mono tracking-widest text-orange-400 uppercase font-semibold">
                  {item.period}
                </span>

                {item.isCurrent && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-wider self-start sm:self-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>CURRENT DEGREE</span>
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                {item.institution}
              </h3>

              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-4">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                <span>{item.location}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-white/10 text-sm">
                <span className="text-neutral-300 font-light">
                  {item.degree} • {item.field}
                </span>
                <span className="font-mono text-xs text-orange-400 font-bold px-3 py-1 rounded-full bg-white/[0.04] self-start sm:self-center border border-white/5">
                  {item.grade}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
