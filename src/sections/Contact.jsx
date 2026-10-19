import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Github, Linkedin, ArrowRight, Download, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { personalInfo, socialLinks } = portfolioData;

export default function Contact() {
  return (
    <section id="contact" className="relative bg-[#07080a]/75 backdrop-blur-[2px] pt-32 pb-44 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-white/[0.06]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-lime-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12141a] border border-lime-500/30 text-lime-400 text-xs font-mono uppercase tracking-widest mb-8 shadow-[0_0_15px_rgba(132,204,22,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span>OPEN FOR INTERNSHIPS &amp; FULL-TIME ROLES</span>
        </motion.div>

        {/* Editorial Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-extrabold tracking-tight text-white leading-[0.92] mb-6 font-display"
          style={{ fontSize: 'clamp(44px, 8.5vw, 108px)' }}
        >
          LET'S BUILD<br />
          SOMETHING<br />
          <span className="text-lime-400">IMPACTFUL.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-neutral-300 text-base sm:text-lg max-w-xl mb-12 font-light leading-relaxed"
        >
          Have an engineering opportunity, software development role, or technical collaboration?
          I am actively available and ready to deliver clean, maintainable code.
        </motion.p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {/* Email Me Button */}
          <motion.a
            href={socialLinks.email}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-lime-400 hover:bg-lime-300 text-black text-sm font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(132,204,22,0.35)] transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>EMAIL ME DIRECTLY</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          {/* WhatsApp Direct Button */}
          <motion.a
            href={personalInfo.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#12141a] hover:bg-[#181b24] border border-emerald-500/40 text-emerald-400 text-sm font-semibold tracking-wider transition-all shadow-xl"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WHATSAPP (+91 8626963353)</span>
          </motion.a>

          {/* Resume View Button */}
          <motion.a
            href={personalInfo.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#12141a] hover:bg-[#181b24] border border-white/10 text-white text-sm font-semibold tracking-wider transition-all shadow-xl"
          >
            <FileText className="w-4 h-4 text-lime-400" />
            <span>VIEW RESUME (PDF)</span>
          </motion.a>
        </div>

        {/* Quick Contacts Strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-neutral-400 pt-8 border-t border-white/[0.08] w-full max-w-2xl">
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4 text-lime-400" />
            <span>LINKEDIN: aryan-dadwal-cse</span>
          </a>

          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4 text-lime-400" />
            <span>GITHUB: Aryan204227</span>
          </a>
        </div>
      </div>
    </section>
  );
}
