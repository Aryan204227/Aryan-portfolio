import React from 'react';
import { ArrowDown, Download, MessageCircle, Github, Linkedin, Mail, Sparkles, Code2, Database, Coffee, Server } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero({ onOpenProject }) {
  const { personalInfo, socialLinks } = portfolioData;

  return (
    <section 
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Personal Brand & Intro */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-mono text-slate-300 font-medium tracking-wide">
              {personalInfo.status}
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <p className="text-sm sm:text-base font-mono text-cyan-400 font-semibold tracking-wider uppercase">
              Hello, I'm
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
              Aryan Dadwal
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              {personalInfo.title}
            </h2>
          </div>

          {/* Supporting Statement (Strictly based on CV) */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal">
            {personalInfo.summary}
          </p>

          {/* Education pill */}
          <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono text-slate-400 bg-slate-900/60 border border-slate-800/80 px-3.5 py-2 rounded-xl">
            <span className="text-slate-200 font-medium">B.Tech CSE</span>
            <span className="text-slate-600">•</span>
            <span>Lovely Professional University</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400 font-semibold">CGPA: {personalInfo.cgpa}</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            {/* View Projects */}
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <span>View Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            {/* Download Professional Resume (PDF) */}
            <a
              href={personalInfo.resumePdf}
              download="Aryan_Dadwal_Professional_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 font-semibold text-sm border border-slate-700 hover:border-cyan-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-md"
              title="Download Professional Resume PDF"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Resume</span>
            </a>

            {/* WhatsApp Me */}
            <a
              href={personalInfo.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 font-semibold text-sm border border-emerald-500/40 hover:border-emerald-400 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-sm"
              title="Direct message on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Me</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Connect:
            </span>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800 transition-all"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800 transition-all"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={socialLinks.email}
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-all"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Column: Authentic Professional Portrait with Subtle Tech Halo */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm sm:max-w-md">
            {/* Subtle Gradient Backing Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500/30 via-indigo-500/20 to-teal-500/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-all duration-700" />

            {/* Portrait Frame */}
            <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden p-2.5 backdrop-blur-xl">
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-slate-950">
                <img
                  src={personalInfo.profileImage}
                  alt="Aryan Dadwal — Full Stack Developer"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500 ease-out"
                  loading="eager"
                />

                {/* Subtle bottom vignette gradient for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                {/* Card overlay info */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Aryan Dadwal</p>
                    <p className="text-[11px] text-cyan-400 font-mono">B.Tech CSE • LPU</p>
                  </div>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                    Full Stack Dev
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle Floating Technical Badges */}
            <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-slate-700 text-slate-200 text-xs font-mono shadow-lg backdrop-blur-md">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>React & Node.js</span>
            </div>

            <div className="absolute -bottom-3 -left-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-slate-700 text-slate-200 text-xs font-mono shadow-lg backdrop-blur-md">
              <Coffee className="w-3.5 h-3.5 text-amber-400" />
              <span>Java & DSA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
