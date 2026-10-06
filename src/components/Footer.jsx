import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, MessageCircle, Download, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#05070a] text-slate-400 py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Identity */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-xl text-white tracking-wider">
                ARYAN DADWAL
              </span>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-0.5 rounded">
                FULL STACK DEVELOPER
              </span>
            </div>
            <p className="text-xs font-mono text-slate-500 max-w-md">
              Computer Science & Engineering • Lovely Professional University (CGPA: 7.07)
            </p>
          </div>

          {/* Quick Verified Document CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={portfolioData.personalInfo.resumePdf}
              download="Aryan_Dadwal_Professional_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-wider uppercase border border-white/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>RESUME (PDF)</span>
            </a>
            <a
              href={portfolioData.personalInfo.cvPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-mono text-xs tracking-wider uppercase border border-white/10 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>ORIGINAL CV</span>
            </a>
          </div>
        </div>

        {/* Links bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/[0.05] text-xs font-mono">
          <div className="flex flex-wrap items-center gap-6 text-slate-400">
            {['ABOUT', 'CAPABILITIES', 'STACK', 'WORK', 'TRAINING', 'CERTIFICATES', 'EDUCATION', 'CONTACT'].map((s) => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                className="hover:text-white transition-colors"
              >
                {s}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={portfolioData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.personalInfo.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.socialLinks.email}
              className="hover:text-cyan-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.05] text-[11px] font-mono text-slate-600">
          <p>© {currentYear} Aryan Dadwal. Personal Developer Portfolio.</p>
          <div className="flex items-center gap-4">
            <span>PROD V2.0 // REACT + VITE + TAILWIND</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
