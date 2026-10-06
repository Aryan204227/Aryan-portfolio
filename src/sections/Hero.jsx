import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal as TerminalIcon, MessageCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import TerminalDrawer from '../components/TerminalDrawer';

const { personalInfo, socialLinks } = portfolioData;

export default function Hero() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between items-center bg-[#0a0a0a] overflow-hidden select-none px-6 pt-32 pb-16"
    >
      {/* ── Subtle Starfield Background Dots ── */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full" />
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-orange-400/40 rounded-full animate-ping" />
        <div className="absolute top-1/5 right-1/8 w-1 h-1 bg-white/60 rounded-full" />
        <div className="absolute bottom-1/3 right-1/5 w-1 h-1 bg-white/40 rounded-full" />
        <div className="absolute top-1/2 left-1/12 w-1 h-1 bg-white/30 rounded-full" />
      </div>

      {/* ── Fixed Right-Edge Badge ("AVAILABLE FOR OPPORTUNITY") as in reference ── */}
      <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden sm:flex items-center">
        <div className="side-label flex items-center gap-2 py-3 px-1.5 rounded-full border border-white/10 bg-[#121212]/80 backdrop-blur-md shadow-xl text-[10px] text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>AVAILABLE FOR OPPORTUNITY</span>
        </div>
      </div>

      {/* ── Top Section Text: Left Tagline ── */}
      <div className="w-full max-w-7xl flex flex-col sm:flex-row justify-between items-start pt-6 z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[11px] sm:text-xs font-mono tracking-widest text-neutral-400 uppercase leading-relaxed max-w-xs pointer-events-auto"
        >
          <span className="text-white font-semibold">ARYAN DADWAL</span> •<br />
          ARCHITECTING MODERN,<br />
          SCALABLE WEB PLATFORMS WITH<br />
          PREMIUM LOGIC.
        </motion.div>
      </div>

      {/* ── Center Massive Typography & Floating Watermark Icons (Reference Layout) ── */}
      <div className="relative my-auto flex flex-col items-center justify-center text-center z-10 w-full max-w-6xl py-8">
        
        {/* Floating LinkedIn Watermark on Left */}
        <motion.a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.35, scale: 1 }}
          whileHover={{ opacity: 0.95, scale: 1.15 }}
          transition={{ duration: 0.6 }}
          className="absolute -left-2 sm:left-4 lg:left-12 top-1/3 -translate-y-1/2 text-neutral-400 hover:text-white transition-all cursor-pointer z-20"
          title="Aryan Dadwal on LinkedIn"
          aria-label="LinkedIn"
        >
          <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </motion.a>

        {/* Floating GitHub Watermark on Top-Right */}
        <motion.a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.35, scale: 1 }}
          whileHover={{ opacity: 0.95, scale: 1.15 }}
          transition={{ duration: 0.6 }}
          className="absolute -right-2 sm:right-8 lg:right-16 top-1/6 text-neutral-400 hover:text-white transition-all cursor-pointer z-20"
          title="Aryan Dadwal on GitHub"
          aria-label="GitHub"
        >
          <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        </motion.a>

        {/* Floating WhatsApp / Contact Watermark on Lower-Right */}
        <motion.a
          href={personalInfo.whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.35, scale: 1 }}
          whileHover={{ opacity: 0.95, scale: 1.15 }}
          transition={{ duration: 0.6 }}
          className="absolute -right-2 sm:right-6 lg:right-12 bottom-1/4 text-neutral-400 hover:text-emerald-400 transition-all cursor-pointer z-20"
          title="Direct WhatsApp"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-10 h-10 sm:w-14 sm:h-14 stroke-[1.5]" />
        </motion.a>

        {/* Giant Centered Headline matching reference: "AI & WEB / SOFTWARE / DEVELOPER" -> "FULL STACK & / SOFTWARE / DEVELOPER" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-extrabold tracking-tight font-display text-white"
        >
          <div
            className="leading-[0.88] block text-white drop-shadow-[0_4px_30px_rgba(255,255,255,0.06)]"
            style={{ fontSize: 'clamp(52px, 11vw, 138px)' }}
          >
            FULL STACK &amp;
          </div>
          <div
            className="leading-[0.88] block text-white mt-1 drop-shadow-[0_4px_30px_rgba(255,255,255,0.06)]"
            style={{ fontSize: 'clamp(52px, 11vw, 138px)' }}
          >
            SOFTWARE
          </div>
          <div
            className="leading-[0.88] block text-white mt-1 drop-shadow-[0_4px_30px_rgba(255,255,255,0.06)]"
            style={{ fontSize: 'clamp(52px, 11vw, 138px)' }}
          >
            DEVELOPER
          </div>
        </motion.div>

        {/* Center Pill Button: "View Resume →" with subtle orange glow border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 z-20"
        >
          <a
            href={personalInfo.resumePdf}
            download="Aryan_Dadwal_Professional_Resume.pdf"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#141416] text-white text-xs sm:text-sm font-semibold tracking-wide border border-orange-500/40 hover:border-orange-500 shadow-[0_0_24px_rgba(249,115,22,0.25)] hover:shadow-[0_0_36px_rgba(249,115,22,0.45)] transition-all duration-300"
            title="Download Aryan Dadwal Official Resume (PDF)"
          >
            <span>View Resume</span>
            <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* ── Bottom Section Text: Right Tagline ── */}
      <div className="w-full max-w-7xl flex justify-end items-end pb-4 z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[11px] sm:text-xs font-mono tracking-widest text-neutral-400 uppercase leading-relaxed text-right max-w-xs pointer-events-auto"
        >
          CRAFTING ULTRA-FAST REACT<br />
          APPLICATIONS POWERED BY<br />
          NODE.JS &amp; JAVA.
        </motion.div>
      </div>

      {/* ── Glowing Planetary Horizon Arc at Bottom (Exact Match to Reference Screenshot) ── */}
      <div className="absolute bottom-0 left-0 right-0 h-44 overflow-hidden pointer-events-none z-0">
        {/* Curving bright arc line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[-180px] w-[140%] max-w-[1500px] h-[280px] rounded-[100%] border-t border-orange-500/70"
          style={{
            boxShadow: '0 -8px 45px rgba(249,115,22,0.65), 0 -2px 10px rgba(255,255,255,0.5)',
          }}
        />
        {/* Ambient rising bloom */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[-50px] w-[100%] max-w-[1100px] h-[160px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(249,115,22,0.45) 0%, rgba(234,88,12,0.18) 50%, transparent 80%)',
            filter: 'blur(16px)',
          }}
        />
      </div>

      {/* ── Bottom-Left Interactive CLI Terminal Button (`>_`) ── */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setTerminalOpen(true)}
          className="group w-12 h-12 rounded-full bg-[#121214]/90 border border-white/10 hover:border-orange-500/50 shadow-2xl backdrop-blur-xl flex items-center justify-center text-neutral-300 hover:text-orange-400 hover:scale-105 active:scale-95 transition-all"
          title="Open Developer CLI Terminal (>_)"
          aria-label="Open Terminal"
        >
          <TerminalIcon className="w-5 h-5 text-neutral-300 group-hover:text-orange-400" />
        </button>
      </div>



      {/* Interactive Developer Terminal Modal */}
      <TerminalDrawer isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </section>
  );
}
