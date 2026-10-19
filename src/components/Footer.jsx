import React from 'react';
import { Github, Linkedin, Mail, MessageCircle, ArrowUp } from 'lucide-react';
import MonogramLogo from './MonogramLogo';
import { portfolioData } from '../data/portfolioData';

const { personalInfo, socialLinks } = portfolioData;

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050608] border-t border-white/10 text-neutral-400 py-14 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Brand Monogram + Title */}
        <div className="flex items-center gap-4">
          <MonogramLogo className="w-10 h-8 text-white" />
          <div className="space-y-0.5 text-left">
            <div className="text-white font-bold tracking-tight text-sm">
              Aryan Dadwal
            </div>
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
              Full Stack Developer • Lovely Professional University
            </div>
          </div>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4 text-neutral-400">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:scale-110 transition-all p-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-lime-400/50"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:scale-110 transition-all p-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-lime-400/50"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 hover:scale-110 transition-all p-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-emerald-400/50"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <a
            href={socialLinks.email}
            className="hover:text-lime-400 hover:scale-110 transition-all p-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-lime-400/50"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Back to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#12141c] hover:bg-[#191c26] border border-white/10 text-xs font-mono tracking-wider text-neutral-300 hover:text-white transition-all shadow-lg group"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-lime-400" />
        </button>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-400 gap-4">
        <span>© {new Date().getFullYear()} Aryan Dadwal. All rights reserved.</span>
        <span>Engineered with React 18, Three.js, GSAP, Tailwind CSS &amp; Lenis</span>
      </div>
    </footer>
  );
}
