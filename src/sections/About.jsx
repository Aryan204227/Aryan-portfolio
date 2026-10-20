import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Award, FileText, CheckCircle2, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { personalInfo } = portfolioData;

const BADGES = [
  { label: 'CGPA 7.07 (EXACT)', color: 'text-lime-400', border: 'border-lime-500/30' },
  { label: 'B.TECH CSE', color: 'text-neutral-200', border: 'border-white/10' },
  { label: 'LPU PHAGWARA', color: 'text-neutral-200', border: 'border-white/10' },
  { label: 'CLASS OF 2028', color: 'text-neutral-200', border: 'border-white/10' },
];

export default function About() {
  const [profileImageFailed, setProfileImageFailed] = useState(false);

  return (
    <section id="about" className="relative scroll-mt-28 bg-[#07080a]/65 backdrop-blur-[2px] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-white/[0.06]">
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-lime-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12141a] border border-lime-500/30 text-lime-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(132,204,22,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span>ABOUT &amp; ACADEMIC FOUNDATION</span>
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
          Engineering mindset &amp; core identity.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-neutral-400 text-sm sm:text-base text-center max-w-xl mb-16 font-light"
        >
          Computer Science undergraduate combining algorithmic rigor with practical full-stack web engineering.
        </motion.p>

        {/* Asymmetric Bento Spread */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Portrait & Identity Profile (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-3xl bg-[#0d0f17] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-lime-500/30 transition-all"
          >
            <div>
              {/* Profile Image with subtle scale */}
              <div data-scroll-reveal className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-lg mb-6 bg-[#111722]">
                {profileImageFailed ? (
                  <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_32%,rgba(163,230,53,0.16),transparent_38%),linear-gradient(145deg,#111827,#07080a)]">
                    <div className="text-center">
                      <div className="mx-auto mb-3 grid h-24 w-24 place-items-center rounded-full border border-lime-400/40 bg-black/30 text-4xl font-black tracking-tight text-lime-300 shadow-[0_0_48px_rgba(163,230,53,0.14)]">AD</div>
                      <p className="font-mono text-[10px] tracking-[0.22em] text-white/45">PROFILE IMAGE</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={personalInfo.profileImage}
                    alt="Aryan Dadwal — Full Stack Developer & B.Tech CSE Student"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    onError={() => setProfileImageFailed(true)}
                    className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono">
                  <span className="text-white font-semibold">Aryan Dadwal</span>
                  <span className="text-lime-400 font-bold">LPU • B.Tech CSE</span>
                </div>
              </div>

              {/* Verified Badges Strip */}
              <div className="flex flex-wrap gap-2 mb-4">
                {BADGES.map((b) => (
                  <span
                    key={b.label}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.03] border ${b.border} ${b.color}`}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>LOCATION</span>
              <span className="text-neutral-200">Punjab / Himachal Pradesh, India</span>
            </div>
          </motion.div>

          {/* Right Column: Statement & Academic Architecture (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between gap-6"
          >
            {/* Primary Statement Card */}
            <div data-scroll-reveal className="rounded-3xl bg-[#0d0f17] border border-white/10 p-6 sm:p-8 shadow-2xl relative">
              <span className="text-[10px] font-mono tracking-widest text-lime-400 uppercase font-bold block mb-3">
                STATEMENT OF PURPOSE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-4">
                "I focus on writing clean, decoupled code and translating complex problem logic into resilient, performant software."
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                Currently pursuing my Bachelor of Technology in Computer Science and Engineering at Lovely Professional University (expected graduation 2028) with an exact CGPA of 7.07. My technical foundation spans MERN full-stack development, Java DSA and algorithmic problem solving, REST APIs, and AI integrations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/[0.08]">
                {[
                  'MERN Full-Stack Development',
                  'Algorithmic Problem Solving (Java)',
                  'Decoupled REST API Architecture',
                  'AI & Machine Learning Integrations',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* University & Degree Metric Bento Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div data-scroll-reveal className="p-5 rounded-2xl bg-[#0d0f17] border border-white/10 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">DEGREE</span>
                <span className="text-base font-bold text-white mt-1">B.Tech CSE</span>
                <span className="text-[10px] font-mono text-lime-400 mt-2">Class of 2028</span>
              </div>

              <div data-scroll-reveal className="p-5 rounded-2xl bg-[#0d0f17] border border-white/10 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">INSTITUTION</span>
                <span className="text-base font-bold text-white mt-1">LPU Phagwara</span>
                <span className="text-[10px] font-mono text-neutral-400 mt-2">Punjab, India</span>
              </div>

              <div data-scroll-reveal className="p-5 rounded-2xl bg-[#0d0f17] border border-white/10 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">EXACT CGPA</span>
                <span className="text-2xl font-black text-lime-400 mt-1">7.07</span>
                <span className="text-[10px] font-mono text-neutral-400 mt-2">Scale of 10.0</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
