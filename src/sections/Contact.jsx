import React, { useState } from 'react';
import { 
  Mail, 
  MessageCircle, 
  Linkedin, 
  Github, 
  Phone, 
  Copy, 
  Check, 
  Send, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { personalInfo, socialLinks } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderMessage, setSenderMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const text = senderMessage.trim() 
      ? `Hi Aryan, I am ${senderName || 'a visitor'}. ${senderMessage}`
      : "Hi Aryan, I came across your portfolio and would like to connect with you.";
    const url = `https://wa.me/918626963353?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Connecting with Aryan Dadwal${senderName ? ' - ' + senderName : ''}`);
    const body = encodeURIComponent(senderMessage || "Hi Aryan,\n\nI came across your portfolio and would like to connect regarding an opportunity.");
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-slate-800/60 bg-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-3 bg-cyan-950/40 border border-cyan-800/40 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>08 / Get in Touch</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Something Great.
          </h2>
          <p className="text-slate-300 text-base mt-3 leading-relaxed">
            I am currently open to internship opportunities, software engineering roles, and collaborative technical projects. Feel free to reach out directly via WhatsApp, email, or LinkedIn.
          </p>
        </div>

        {/* 2-Column Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 hover:border-emerald-500/60 transition-all group shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800/50 font-medium">
                  Fastest Response
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                WhatsApp Direct
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Reach out directly on mobile or web with pre-filled message support.
              </p>
              <a
                href={portfolioData.personalInfo.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp (+91 8626963353)</span>
              </a>
            </div>

            {/* Email Card with Copy button */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Direct Email
              </h3>
              <p className="text-xs text-slate-400 mb-4 font-mono select-all">
                {personalInfo.email}
              </p>
              <a
                href={socialLinks.email}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 hover:border-cyan-500/50 transition-all"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Open Mail Client</span>
              </a>
            </div>

            {/* LinkedIn & GitHub Cards */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-2">
                  <Linkedin className="w-5 h-5 text-cyan-400" />
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">LinkedIn</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Professional Network</p>
                </div>
              </a>

              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-2">
                  <Github className="w-5 h-5 text-slate-200" />
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">GitHub</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Open Source Repos</p>
                </div>
              </a>
            </div>
          </div>

          {/* Interactive Fast Contact Dispatcher */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">
              Send a Quick Message
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Write a message below and dispatch it instantly to my WhatsApp or Email with zero friction.
            </p>

            <form className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">
                  Your Name / Organization
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Recruiter, Hiring Manager, or Collaborator"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  placeholder="Hi Aryan, I reviewed your portfolio and would like to discuss an opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm transition-all shadow-md shadow-emerald-500/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 hover:border-cyan-500/50 transition-all"
                >
                  <Send className="w-4 h-4 text-cyan-400" />
                  <span>Send via Email</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
