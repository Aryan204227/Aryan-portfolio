import React from 'react';
import { ArrowDown, Download, MessageCircle, Github, Linkedin, Mail, ArrowUpRight, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const { personalInfo, socialLinks } = portfolioData;

  return (
    <section 
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-8 lg:px-12 overflow-hidden bg-[#07080c]"
    >
      {/* Subtle Top-Center Ambient Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-cyan-600/10 via-indigo-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Marginal / Corner Technical Metadata Stamps (Inspired by award-winning portfolio layouts) */}
      <div className="max-w-7xl mx-auto w-full flex items-start justify-between text-[9px] sm:text-[10px] font-mono tracking-widest text-slate-500 uppercase select-none pt-4">
        <div className="max-w-[260px] leading-relaxed hidden md:block">
          ARYAN DADWAL • ARCHITECTING PRACTICAL WEB PLATFORMS WITH CLEAN LOGIC.
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">AVAILABLE FOR ROLES & INTERNSHIPS</span>
        </div>
        <div className="max-w-[260px] text-right leading-relaxed hidden md:block">
          B.TECH CSE • LOVELY PROFESSIONAL UNIVERSITY • CGPA 7.07
        </div>
      </div>

      {/* Main Center Cinematic Composition */}
      <div className="max-w-7xl mx-auto w-full my-auto py-10 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Colossal Typography & Statement */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Role Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono tracking-widest text-cyan-400 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FULL STACK DEVELOPER</span>
            </div>

            {/* Colossal Name & Title Heading */}
            <div className="space-y-1">
              <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-white leading-[0.95]">
                ARYAN <br />
                <span className="text-stroke-title">DADWAL</span>
              </h1>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-400 tracking-tight pt-2">
                FULL STACK <span className="text-white">DEVELOPER</span>
              </h2>
            </div>

            {/* Concise CV-backed Statement */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed mx-auto lg:mx-0">
              Computer Science student building practical full-stack applications, AI-powered solutions and algorithmic systems.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#work"
                className="glowing-border-btn px-7 py-3.5 rounded-full text-white font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 shadow-xl"
              >
                <span>VIEW MY WORK</span>
                <ArrowDown className="w-4 h-4 text-cyan-400" />
              </a>

              <a
                href={personalInfo.resumePdf}
                download="Aryan_Dadwal_Professional_Resume.pdf"
                className="px-6 py-3.5 rounded-full bg-white text-slate-950 font-display font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all shadow-xl flex items-center gap-2"
                title="Download Professional Resume PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD RESUME</span>
              </a>

              <a
                href="#contact"
                className="px-5 py-3.5 rounded-full text-slate-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <span>LET'S CONNECT</span>
              </a>
            </div>

            {/* Social Icons Bar */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-2 text-slate-400">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-xs font-mono"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={personalInfo.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-xs font-mono"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href={socialLinks.email}
                className="hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>

          </div>

          {/* Right Column: Layered Editorial Portrait */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Giant background monogram letter */}
              <div 
                className="absolute -top-12 -right-6 font-display font-black text-9xl text-white/[0.03] select-none pointer-events-none tracking-tighter"
                aria-hidden="true"
              >
                AD
              </div>

              {/* Atmospheric rim lighting glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-indigo-500/20 rounded-3xl blur-2xl opacity-70" />

              {/* Portrait container with subtle curved styling */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d0f17]">
                <div className="relative aspect-[3.9/5] overflow-hidden">
                  <img
                    src={personalInfo.profileImage}
                    alt="Aryan Dadwal — Full Stack Developer"
                    className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[0.98] transition-transform duration-700 ease-out hover:scale-105"
                    loading="eager"
                  />

                  {/* Gradient overlays for cinematic depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-transparent to-transparent pointer-events-none" />

                  {/* Minimal glass overlay tag */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-[#0f1118]/80 backdrop-blur-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-display font-bold text-xs text-white block">
                        Aryan Dadwal
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 block tracking-wider uppercase">
                        B.Tech CSE • LPU (7.07 CGPA)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider">
                        Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical index badge below */}
              <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-500 tracking-widest uppercase">
                <span>IDENTITY // DEV-2026</span>
                <span>MERN + JAVA + DSA</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Atmospheric Horizon Curve Glow (Inspired by reference aesthetic) */}
      <div className="relative w-full h-24 overflow-hidden pointer-events-none mt-auto">
        <svg 
          className="absolute bottom-0 inset-x-0 w-full h-full" 
          viewBox="0 0 1200 200" 
          preserveAspectRatio="none" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="horizonGlow" cx="50%" cy="100%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="40%" stopColor="#6366f1" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#07080c" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="horizonLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 0 200 Q 600 110, 1200 200" fill="url(#horizonGlow)" />
          <path d="M 0 200 Q 600 110, 1200 200" fill="none" stroke="url(#horizonLine)" strokeWidth="1.5" />
        </svg>
      </div>

    </section>
  );
}
