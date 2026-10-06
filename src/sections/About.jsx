import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { personalInfo } = portfolioData;

const BADGES = [
  { label: 'CGPA 7.07', color: 'text-orange-400' },
  { label: 'B.Tech CSE', color: 'text-neutral-300' },
  { label: 'Class of 2028', color: 'text-neutral-300' },
  { label: 'LPU', color: 'text-neutral-300' },
];

export default function About() {
  return (
    <section id="about" className="relative bg-[#0a0a0a] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden">
      
      {/* Top Arc */}
      <div className="absolute top-0 left-0 right-0 h-36 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[-140px] w-[130%] max-w-[1400px] h-[240px] rounded-[100%] border-b border-orange-500/60"
          style={{ boxShadow: '0 8px 40px rgba(249,115,22,0.5)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161616] border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
        >
          <span className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center text-[10px] text-orange-400 font-bold">✦</span>
          <span>GET TO KNOW ME</span>
        </motion.div>

        {/* Heading — honest */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold tracking-tight text-center leading-[1.05]"
          style={{ fontSize: 'clamp(38px, 6vw, 76px)' }}
        >
          <span className="text-white">Turning ideas into </span>
          <span className="text-neutral-400">reality</span>
        </motion.h2>

        {/* Accurate, honest subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-neutral-400 italic text-base sm:text-lg lg:text-xl text-center max-w-2xl mt-4 mb-16 font-light"
        >
          Developer and problem solver by nature. Let's build something together.
        </motion.p>

        {/* Bento Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Profile Card — Sequential 1-4 elements */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-3xl bg-[#121214] border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 shadow-2xl relative overflow-hidden group hover:border-orange-500/30 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* 1. Photo: subtle scale & fade */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="relative w-36 h-44 sm:w-44 sm:h-52 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-lg"
            >
              <img
                src={personalInfo.profileImage}
                alt="Aryan Dadwal — B.Tech CSE student and Full Stack Developer"
                className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center py-1 rounded bg-black/60 backdrop-blur-md text-[9px] font-mono text-emerald-400 uppercase tracking-wider">
                ● LPU CSE
              </div>
            </motion.div>

            {/* Content Beside Photo */}
            <div className="flex-1 space-y-3 text-left">
              {/* 2. Name & Title reveal */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase block"
              >
                B.TECH CSE STUDENT &amp; FULL STACK DEVELOPER
              </motion.span>
              
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
              >
                Aryan Dadwal.
              </motion.h3>

              {/* 3. Description reveal */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-neutral-400 text-sm leading-relaxed font-light"
              >
                I build modern web applications and AI-focused projects using the MERN stack, Java and REST APIs. I enjoy turning ideas into practical, responsive and well-structured software projects.
              </motion.p>

              {/* 4. Badges staggered */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
                {BADGES.map((b, i) => (
                  <motion.span
                    key={b.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.45 + i * 0.06 }}
                    className={`px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 ${b.color}`}
                  >
                    {b.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Identity pill strip */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="rounded-2xl bg-[#121214] border border-white/10 p-4 flex items-center justify-center text-center shadow-xl"
            >
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-300 flex flex-wrap items-center justify-center gap-2">
                <span>FULL STACK</span>
                <span className="text-orange-500">•</span>
                <span>MERN STACK</span>
                <span className="text-orange-500">•</span>
                <span>JAVA &amp; DSA</span>
                <span className="text-orange-500">•</span>
                <span>AI PROJECTS</span>
              </span>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">

              {/* 5. Stats Card reveal */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="rounded-3xl bg-[#121214] border border-white/10 p-6 flex flex-col justify-between shadow-xl hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <span className="text-[10px] uppercase tracking-widest">ACADEMIC</span>
                </div>

                <div className="my-4">
                  <div className="text-4xl font-extrabold text-white tracking-tight">
                    7.07
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase mt-1">
                    CGPA — LOVELY PROFESSIONAL UNIVERSITY
                  </div>
                </div>

                <div className="text-xs text-neutral-400 font-light border-t border-white/10 pt-3">
                  B.Tech CSE • Class of 2028
                </div>
              </motion.div>

              {/* 6. Project Showcase reveal */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="rounded-3xl bg-[#121214] border border-white/10 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-orange-500/30 transition-colors"
              >
                <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  PROJECTS BUILT
                </div>

                <div className="my-3">
                  <div className="text-4xl font-extrabold text-white tracking-tight">
                    3
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase mt-1">
                    MERN • JAVA • AI
                  </div>
                </div>

                <div className="text-[11px] font-mono text-neutral-400 flex items-center justify-between border-t border-white/10 pt-3">
                  <span>Featured Projects</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-orange-400 transition-colors" />
                </div>
              </motion.div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
