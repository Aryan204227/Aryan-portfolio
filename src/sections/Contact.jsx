import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Github, Linkedin, ArrowRight, Download, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { personalInfo, socialLinks } = portfolioData;

export default function Contact() {
  return (
    <section id="contact" className="relative bg-[#0a0a0a] pt-32 pb-44 px-6 sm:px-10 lg:px-16 overflow-hidden">
      
      {/* ── Top Curved Orange Planetary Arc ── */}
      <div className="absolute top-0 left-0 right-0 h-36 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[-140px] w-[130%] max-w-[1400px] h-[240px] rounded-[100%] border-b border-orange-500/60"
          style={{
            boxShadow: '0 8px 40px rgba(249,115,22,0.4)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">

        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161616] border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-widest mb-8 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>OPEN FOR INTERNSHIPS &amp; FULL-TIME ROLES</span>
        </motion.div>

        {/* ── Massive Heading (Reference Style) ── */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-extrabold tracking-tight text-white leading-[0.92] mb-6 font-display"
          style={{ fontSize: 'clamp(44px, 8.5vw, 108px)' }}
        >
          LET'S BUILD<br />
          SOMETHING<br />
          <span className="text-neutral-400">GREAT.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-neutral-400 text-base sm:text-lg max-w-xl mb-12 font-light leading-relaxed"
        >
          Have an engineering opportunity, product collaboration, or internship role?
          I am actively available and ready to deliver impactful code.
        </motion.p>

        {/* ── Action Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          {/* Email Me Button */}
          <a
            href={socialLinks.email}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full btn-orange text-sm font-bold uppercase tracking-wider shadow-[0_4px_24px_rgba(249,115,22,0.35)] hover:shadow-[0_4px_36px_rgba(249,115,22,0.55)] transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>EMAIL ME DIRECTLY</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* WhatsApp Direct Button */}
          <a
            href={personalInfo.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#161619] hover:bg-[#202025] border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 text-sm font-semibold tracking-wider transition-all shadow-xl"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WHATSAPP (+91 8626963353)</span>
          </a>

          {/* Resume Download Button */}
          <a
            href={personalInfo.resumePdf}
            download="Aryan_Dadwal_Professional_Resume.pdf"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#161619] hover:bg-[#202025] border border-white/10 hover:border-white/25 text-white text-sm font-semibold tracking-wider transition-all shadow-xl"
            title="Download Aryan Dadwal Official Resume (PDF)"
          >
            <Download className="w-4 h-4 text-orange-400" />
            <span>DOWNLOAD RESUME</span>
          </a>
        </motion.div>

        {/* ── Social Strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-8 text-neutral-400"
        >
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors text-xs font-mono tracking-wider"
          >
            <Github className="w-4 h-4" />
            <span>GITHUB</span>
          </a>
          <span className="text-neutral-700">•</span>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors text-xs font-mono tracking-wider"
          >
            <Linkedin className="w-4 h-4" />
            <span>LINKEDIN</span>
          </a>
          <span className="text-neutral-700">•</span>
          <span className="text-xs font-mono text-neutral-500">
            PUNJAB / HIMACHAL PRADESH, INDIA
          </span>
        </motion.div>

      </div>

      {/* ── Bottom Horizon Arc Glow ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[-160px] w-[140%] max-w-[1500px] h-[260px] rounded-[100%] border-t border-orange-500/60"
          style={{
            boxShadow: '0 -8px 45px rgba(249,115,22,0.5)',
          }}
        />
      </div>
    </section>
  );
}
