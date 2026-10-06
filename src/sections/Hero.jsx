import React from 'react';
import { ArrowDownRight, Download, MessageCircle, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const { personalInfo, socialLinks } = portfolioData;

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-6 sm:px-8 lg:px-12 overflow-hidden bg-precision-grid"
    >
      {/* Cinematic subtle light pools */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Editorial Text Column */}
        <div className="lg:col-span-7 space-y-8 z-10 text-center lg:text-left">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase">
              COMPUTER SCIENCE ENGINEER • FULL STACK DEVELOPER
            </span>
          </div>

          {/* Huge Editorial Headline */}
          <div className="space-y-3">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
              Building software <br />
              <span className="text-gradient-editorial">that solves</span> <br />
              <span className="text-gradient-cyan">real problems.</span>
            </h1>
          </div>

          {/* Identity & Short Intro */}
          <div className="space-y-3 max-w-xl mx-auto lg:mx-0">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold">
                ARYAN DADWAL
              </span>
              <span className="w-8 h-[1px] bg-slate-700" />
              <span className="text-xs font-mono text-slate-400">
                LPU • CGPA: {personalInfo.cgpa}
              </span>
            </div>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Computer Science student focused on Full Stack Development, Java & DSA, and building practical digital products.
            </p>
          </div>

          {/* Editorial Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            {/* Explore My Work */}
            <a
              href="#work"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-slate-950 font-display font-bold text-xs tracking-wider uppercase hover:bg-slate-200 transition-all shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            {/* Download Resume */}
            <a
              href={personalInfo.resumePdf}
              download="Aryan_Dadwal_Professional_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-wider uppercase border border-white/15 hover:border-cyan-400/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
              title="Download Professional Resume PDF"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>DOWNLOAD RESUME</span>
            </a>

            {/* Let's Connect */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-slate-300 hover:text-white font-mono text-xs tracking-wider uppercase transition-colors"
            >
              <span>LET'S CONNECT</span>
            </a>
          </div>

          {/* Social Proof & Profiles */}
          <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-slate-400 text-xs font-mono">
            <span className="text-slate-600 uppercase tracking-widest text-[10px]">VERIFIED LINKS:</span>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GITHUB</span>
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LINKEDIN</span>
            </a>
            <a
              href={portfolioData.personalInfo.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WHATSAPP</span>
            </a>
          </div>
        </div>

        {/* Right Editorial Portrait Composition */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-full max-w-sm sm:max-w-md">
            
            {/* Oversized typography partially behind the portrait */}
            <div 
              className="absolute -top-10 -left-6 sm:-left-10 font-display font-black text-7xl sm:text-8xl text-white/[0.04] select-none pointer-events-none tracking-tighter"
              aria-hidden="true"
            >
              ARYAN
            </div>
            
            {/* Ambient lighting halo */}
            <div className="absolute inset-4 bg-gradient-to-tr from-cyan-500/20 via-transparent to-indigo-500/20 rounded-full blur-2xl opacity-60" />

            {/* Portrait Frame (Editorial cut, not a generic card) */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#090d16]">
              {/* Image */}
              <div className="relative aspect-[3.8/5] overflow-hidden">
                <img
                  src={personalInfo.profileImage}
                  alt="Aryan Dadwal — Full Stack Developer"
                  className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[0.98] transition-transform duration-700 ease-out hover:scale-105"
                  loading="eager"
                />

                {/* Subtle cinematic gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/40 via-transparent to-transparent pointer-events-none" />

                {/* Editorial minimal overlay badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-display font-bold text-white block">
                      Aryan Dadwal
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 block tracking-wider uppercase">
                      Full Stack Engineer
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle technical coordinate stamp */}
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-500 tracking-wider">
              <span>SYS // AD-2026</span>
              <span>LPU.CSE.707</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
