import React, { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  Linkedin, 
  Github, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Send 
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { personalInfo, socialLinks } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [note, setNote] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const text = note.trim()
      ? `Hi Aryan, ${note}`
      : "Hi Aryan, I came across your portfolio and would like to connect with you.";
    const url = `https://wa.me/918626963353?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-32 px-6 sm:px-8 lg:px-12 relative border-t border-white/[0.06] bg-[#07090e] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative">
        
        {/* Section Identifier */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase">
            08 / GET IN TOUCH
          </span>
          <span className="w-12 h-[1px] bg-slate-800" />
        </div>

        {/* Huge Closing Statement */}
        <div className="space-y-4 max-w-4xl">
          <p className="text-sm sm:text-base font-mono uppercase tracking-widest text-slate-400">
            HAVE A PROBLEM WORTH BUILDING?
          </p>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Let's build <br />
            <span className="text-gradient-cyan">something great.</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl pt-2 font-normal">
            Currently open to software engineering internships, full-stack developer roles, and collaborative product engineering.
          </p>
        </div>

        {/* Primary Contact Action Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* WhatsApp Direct */}
          <a
            href={personalInfo.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 hover:border-emerald-500/60 hover:bg-emerald-950/40 transition-all duration-300 flex flex-col justify-between space-y-8"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                FASTEST RESPONSE
              </span>
              <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-mono block">Direct Mobile / Web</span>
              <h3 className="font-display text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mt-0.5">
                WhatsApp Chat
              </h3>
              <span className="text-xs font-mono text-emerald-400/80 block mt-1">+91 8626963353</span>
            </div>
          </a>

          {/* Email */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between space-y-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">
                EMAIL DIRECT
              </span>
              <button
                onClick={handleCopyEmail}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                title="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div>
              <a
                href={socialLinks.email}
                className="font-display text-lg sm:text-xl font-bold text-white hover:text-cyan-300 transition-colors block break-all"
              >
                {personalInfo.email}
              </a>
              <span className="text-xs font-mono text-slate-500 block mt-1">Open email client</span>
            </div>
          </div>

          {/* LinkedIn */}
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between space-y-8"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">
                PROFESSIONAL NETWORK
              </span>
              <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-mono block">Connect on</span>
              <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                LinkedIn
              </h3>
              <span className="text-xs font-mono text-slate-500 block mt-1">aryan-dadwal-cse</span>
            </div>
          </a>

          {/* GitHub */}
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between space-y-8"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">
                OPEN SOURCE
              </span>
              <Github className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-mono block">Code Repositories</span>
              <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                GitHub
              </h3>
              <span className="text-xs font-mono text-slate-500 block mt-1">Aryan204227</span>
            </div>
          </a>

        </div>

        {/* Instant WhatsApp Quick Note Dispatcher */}
        <div className="max-w-2xl mx-auto rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 font-semibold uppercase tracking-wider">
              DISPATCH A FAST NOTE TO ARYAN'S WHATSAPP
            </span>
            <span className="text-emerald-400 font-medium">Instant</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Hi Aryan, let's discuss an engineering role..."
              className="flex-1 px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-all"
            />
            <button
              onClick={handleSendWhatsApp}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
            >
              <span>SEND WHATSAPP</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
