import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, Github, Linkedin, Mail, MessageCircle, ArrowDownRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { personalInfo, socialLinks } = portfolioData;

/* ── Per-character animated word ─────────────────────── */
function SplitWord({ word, outlined = false, delay = 0 }) {
  return (
    <span className="inline-flex" style={{ perspective: '800px' }}>
      {word.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: 40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + i * 0.042,
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={
            outlined
              ? {
                  WebkitTextStroke: '1.5px rgba(255,255,255,0.82)',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }
              : { display: 'inline-block' }
          }
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  /* Cursor-reactive ambient glow */
  const [cursor, setCursor] = useState({ x: -9999, y: -9999 });
  useEffect(() => {
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* Parallax portrait on scroll */
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 600], [0, -60]);

  const metaItems = [
    'B.TECH CSE',
    'LPU',
    'CGPA 7.07',
    'FULL STACK',
    'JAVA + DSA',
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#07080c]"
    >
      {/* Cursor-reactive glow */}
      <div
        className="pointer-events-none fixed z-0"
        style={{
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.055) 0%, transparent 70%)',
          transform: `translate(${cursor.x - 350}px, ${cursor.y - 350}px)`,
          transition: 'transform 0.35s ease',
          top: 0,
          left: 0,
        }}
      />

      {/* Top ambient gradient */}
      <div className="absolute top-0 inset-x-0 h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(56,189,248,0.07) 0%, transparent 70%)' }} />

      {/* Main layout */}
      <div className="relative z-10 flex-1 max-w-[1600px] mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-28 pb-16 min-h-screen">

        {/* ── Left Column ── */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:space-y-8">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.22em] text-slate-400 uppercase">
              Available for internships &amp; full-time roles
            </span>
          </motion.div>

          {/* Giant name typography */}
          <div className="leading-[0.88] tracking-tight font-black font-display"
            style={{ fontSize: 'clamp(68px, 12vw, 148px)' }}>
            <div>
              <SplitWord word="ARYAN" delay={0.15} />
            </div>
            <div>
              <SplitWord word="DADWAL" outlined delay={0.35} />
            </div>
          </div>

          {/* Role line */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7 }}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-[1px] bg-white/30" />
            <span className="font-mono text-xs tracking-[0.2em] text-slate-300 uppercase">
              Full Stack Developer
            </span>
          </motion.div>

          {/* Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="text-slate-400 font-light leading-relaxed max-w-lg"
            style={{ fontSize: 'clamp(14px, 1.4vw, 17px)' }}
          >
            Computer Science student building practical full-stack applications,
            AI-powered solutions and algorithmic systems.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.7 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-slate-950 font-bold text-xs tracking-widest uppercase hover:bg-slate-100 transition-all shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>View Work</span>
              <ArrowDownRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href={personalInfo.resumePdf}
              download="Aryan_Dadwal_Professional_Resume.pdf"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/14 text-white text-xs tracking-widest uppercase font-medium hover:border-white/35 hover:bg-white/5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex items-center gap-6 pt-1"
          >
            {[
              { href: socialLinks.github, Icon: Github, label: 'GitHub' },
              { href: socialLinks.linkedin, Icon: Linkedin, label: 'LinkedIn' },
              { href: personalInfo.whatsAppUrl, Icon: MessageCircle, label: 'WhatsApp' },
              { href: socialLinks.email, Icon: Mail, label: 'Email' },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors duration-200 flex items-center gap-1.5 font-mono text-[11px] tracking-wider"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Right Column: Portrait ── */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative">
          {/* Ghost background word */}
          <div
            className="absolute select-none pointer-events-none font-black leading-none text-right right-0 bottom-0"
            style={{
              fontSize: 'clamp(80px, 14vw, 200px)',
              color: 'rgba(255,255,255,0.025)',
              letterSpacing: '-0.04em',
              userSelect: 'none',
            }}
            aria-hidden
          >
            DADWAL
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[380px] lg:max-w-[440px]"
          >
            {/* Atmospheric rim glow */}
            <div className="absolute -inset-6 rounded-[40px] blur-3xl opacity-40 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(56,189,248,0.18) 0%, rgba(99,102,241,0.1) 50%, transparent 80%)' }} />

            {/* Portrait with parallax */}
            <motion.div style={{ y: imgY }} className="relative" ref={imgRef}>
              <div className="relative overflow-hidden rounded-[28px]">
                <img
                  src={personalInfo.profileImage}
                  alt="Aryan Dadwal — Full Stack Developer"
                  className="w-full object-cover object-top"
                  style={{
                    aspectRatio: '3/4',
                    filter: 'contrast(1.04) brightness(0.97)',
                  }}
                  loading="eager"
                />
                {/* Bottom image gradient fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, #07080c 0%, transparent 100%)' }}
                />

                {/* Availability badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-white/70 tracking-widest uppercase">Open to work</span>
                </div>
              </div>

              {/* Index stamp below photo */}
              <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-slate-600 tracking-[0.16em] uppercase px-1">
                <span>IDENTITY // DEV-2026</span>
                <span>MERN · JAVA · DSA</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom metadata strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.7 }}
        className="relative z-10 border-t border-white/[0.06] w-full"
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-5 flex items-center justify-between overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-0 shrink-0">
            {metaItems.map((item, i) => (
              <span key={item} className="flex items-center">
                <span className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase px-5 whitespace-nowrap">
                  {item}
                </span>
                {i < metaItems.length - 1 && (
                  <span className="w-px h-3 bg-white/15 shrink-0" />
                )}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 pl-6 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.18em] text-emerald-500 uppercase">
              AVAILABLE
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
