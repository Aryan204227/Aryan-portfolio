import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { training } = portfolioData;
const bootCamp = training[0];

export default function Training() {
  return (
    <section id="training" className="relative bg-[#0a0a0a] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden">
      
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
          <span>SPECIALIZED TRAINING</span>
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
          Intensive software engineering training.
        </motion.h2>

        {/* Featured Training Card (Bento Style) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-4xl rounded-3xl bg-[#121214] border border-white/10 p-8 sm:p-10 shadow-2xl relative overflow-hidden group hover:border-orange-500/40 transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-orange-400 uppercase font-semibold block">
                COMPREHENSIVE BOOT CAMP
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
                <Calendar className="w-3.5 h-3.5 text-orange-400" />
                <span>{bootCamp.duration}</span>
              </span>

              <a
                href={bootCamp.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full btn-orange text-xs font-bold uppercase tracking-wider shadow-lg"
              >
                <span>View Certificate</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed mb-8">
            {bootCamp.description}
          </p>

          {/* Topics Covered */}
          <div className="border-t border-white/10 pt-6">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-3">
              CURRICULUM MODULES
            </span>
            <div className="flex flex-wrap gap-2">
              {bootCamp.topics.map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/5 text-neutral-300 text-xs font-mono flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-orange-400" />
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
