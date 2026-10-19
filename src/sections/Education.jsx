import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { education } = portfolioData;

export default function Education() {
  return (
    <section id="education" className="relative bg-[#07080a]/75 backdrop-blur-[2px] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-white/[0.06]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-lime-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12141a] border border-lime-500/30 text-lime-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(132,204,22,0.15)]"
        >
          <GraduationCap className="w-3.5 h-3.5 text-lime-400" />
          <span>ACADEMIC FOUNDATION</span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold tracking-tight text-center leading-[1.05] text-white max-w-3xl mb-4"
          style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}
        >
          Educational journey &amp; academic milestones.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-neutral-400 text-sm sm:text-base text-center max-w-xl mb-16 font-light"
        >
          Formal coursework in computer science principles, algorithms, and computational mathematics.
        </motion.p>

        {/* Timeline Stack */}
        <div className="w-full max-w-3xl space-y-6">
          {education.map((item, idx) => (
            <motion.div
              key={item.institution}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -3 }}
              className={`rounded-3xl bg-[#0d0f17] border p-7 sm:p-8 shadow-2xl transition-all duration-300 ${
                item.isCurrent
                  ? 'border-lime-500/40 shadow-[0_0_30px_rgba(132,204,22,0.08)]'
                  : 'border-white/[0.08]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <span className="text-xs font-mono tracking-widest text-lime-400 uppercase font-semibold">
                  {item.period}
                </span>

                {item.isCurrent && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-wider self-start sm:self-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>CURRENT PROGRAM</span>
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

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-white/[0.06] text-sm">
                <span className="text-neutral-300 font-light">
                  {item.degree} • {item.field}
                </span>
                <span className="font-mono text-xs text-lime-400 font-bold px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20 self-start sm:self-center">
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
