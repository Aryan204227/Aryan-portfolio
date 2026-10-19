import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { training } = portfolioData;
const bootCamp = training[0];

export default function Training() {
  return (
    <section id="training" className="relative bg-[#07080a]/75 backdrop-blur-[2px] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-white/[0.06]">
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
          <Award className="w-3.5 h-3.5 text-lime-400" />
          <span>SPECIALIZED BOOTCAMP</span>
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
          Structured engineering training.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-neutral-400 text-sm sm:text-base text-center max-w-xl mb-16 font-light"
        >
          Rigorous problem-solving and algorithmic training in Java with LeetCode.
        </motion.p>

        {/* Featured Training Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="w-full max-w-4xl rounded-3xl bg-[#0d0f17] border border-white/10 p-8 sm:p-10 shadow-2xl relative overflow-hidden group hover:border-lime-500/40 transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-lime-400 uppercase font-semibold block">
                COMPREHENSIVE DSA BOOT CAMP
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {bootCamp.title}
              </h3>

              <p className="text-sm font-mono text-neutral-400">
                {bootCamp.organization}
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-neutral-300">
                <Calendar className="w-3.5 h-3.5 text-lime-400" />
                <span>{bootCamp.duration}</span>
              </span>

              {bootCamp.certificateUrl && (
                <a
                  href={bootCamp.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-lime-500/10 hover:bg-lime-500/20 text-lime-400 border border-lime-500/30 text-xs font-mono uppercase tracking-wider transition-all"
                >
                  <span>Verify Certificate</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          <p className="text-neutral-300 text-sm font-light leading-relaxed mb-6">
            {bootCamp.description}
          </p>

          <div className="pt-6 border-t border-white/[0.08]">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-3">
              CURRICULUM MODULES &amp; COMPETENCIES:
            </span>
            <div className="flex flex-wrap gap-2">
              {bootCamp.topics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-neutral-200 border border-white/[0.06]"
                >
                  <CheckCircle2 className="w-3 h-3 text-lime-400" />
                  <span>{topic}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
