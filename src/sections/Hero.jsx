import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { personalInfo, socialLinks } = portfolioData;

/* Per-character reveal */
function AnimatedWord({ word, outlined = false, startDelay = 0 }) {
  return (
    <span
      className="inline-flex overflow-hidden leading-none"
      style={{ perspective: '1000px', verticalAlign: 'bottom' }}
    >
      {word.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: '100%', rotateX: 45 }}
          animate={{ opacity: 1, y: '0%', rotateX: 0 }}
          transition={{
            delay: startDelay + i * 0.045,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={
            outlined
              ? {
                  WebkitTextStroke: '1.5px rgba(255,255,255,0.78)',
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
  const [cursorLight, setCursorLight] = useState({ x: -9999, y: -9999 });
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 700], [0, -80]);
  const titleY = useTransform(scrollY, [0, 700], [0, -30]);
  const bgY = useTransform(scrollY, [0, 700], [0, 40]);

  useEffect(() => {
    const onMove = (e) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      setCursorLight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#070809] select-none"
    >
      {/* Cursor ambient light — stays within section */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.045) 0%, transparent 65%)',
          transform: `translate(${cursorLight.x - 450}px, ${cursorLight.y - 450}px)`,
          transition: 'transform 0.5s ease',
          top: 0,
          left: 0,
        }}
      />

      {/* Static top ambient */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none z-0"
        style={{
          height: 500,
          background: 'radial-gradient(ellipse 70% 50% at 50% -5%, rgba(56,189,248,0.065) 0%, transparent 70%)',
        }}
      />

      {/* ── BACKGROUND GHOST TYPOGRAPHY ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 flex items-center justify-end pr-4 pointer-events-none z-0 overflow-hidden"
      >
        <div
          className="font-black tracking-tighter leading-none select-none"
          style={{
            fontSize: 'clamp(200px, 30vw, 420px)',
            color: 'rgba(255,255,255,0.018)',
            letterSpacing: '-0.04em',
            userSelect: 'none',
          }}
          aria-hidden
        >
          AD
        </div>
      </motion.div>

      {/* ── MAIN GRID ── */}
      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] items-stretch">

        {/* LEFT: typography + content */}
        <div className="flex flex-col justify-between px-6 sm:px-10 lg:px-14 xl:px-20 pt-28 pb-10">

          {/* Top eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-center gap-3 self-start"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'pulse 2s infinite' }} />
            <span className="font-mono text-[11px] tracking-[0.22em] text-slate-500 uppercase">
              Available for Opportunities
            </span>
          </motion.div>

          {/* Center: big name */}
          <motion.div style={{ y: titleY }} className="flex-1 flex flex-col justify-center py-8">
            {/* Name */}
            <div
              className="font-black leading-[0.85] tracking-tight"
              style={{ fontSize: 'clamp(72px, 12vw, 156px)' }}
            >
              <div className="overflow-hidden block">
                <AnimatedWord word="ARYAN" startDelay={0.2} />
              </div>
              <div className="overflow-hidden block">
                <AnimatedWord word="DADWAL" outlined startDelay={0.4} />
              </div>
            </div>

            {/* Role separator */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="w-full max-w-sm h-px bg-white/10 mt-7 mb-5"
            />

            {/* Role + desc */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.7 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[12px] tracking-[0.25em] text-white/50 uppercase">
                  Full Stack Developer
                </span>
              </div>
              <p
                className="text-slate-400 font-light leading-[1.7] max-w-md"
                style={{ fontSize: 'clamp(13px, 1.3vw, 16px)' }}
              >
                CS student building practical full-stack apps, AI-powered solutions
                &amp; algorithmic systems with Java and the MERN stack.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.7 }}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              <a
                href="#work"
                data-cursor="VIEW"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-[#07080c] font-bold text-xs tracking-[0.14em] uppercase hover:bg-white/90 transition-colors shadow-lg"
              >
                View Work
                <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
              </a>
              <a
                href={personalInfo.resumePdf}
                download="Aryan_Dadwal_Professional_Resume.pdf"
                data-cursor="PDF"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white text-xs tracking-[0.14em] uppercase font-medium hover:border-white/40 hover:bg-white/[0.04] transition-all"
              >
                <Download className="w-3.5 h-3.5 opacity-60" />
                Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Bottom: metadata strip + socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.9 }}
            className="space-y-5"
          >
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-0">
              {['B.TECH CSE', 'LPU', 'CGPA 7.07', 'JAVA · MERN'].map((item, i, arr) => (
                <span key={item} className="flex items-center">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-slate-600 uppercase px-4 first:pl-0">
                    {item}
                  </span>
                  {i < arr.length - 1 && <span className="w-px h-2.5 bg-white/12" />}
                </span>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-6">
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
                  aria-label={label}
                  data-cursor={label.toUpperCase()}
                  className="text-slate-600 hover:text-white/80 transition-colors duration-200 flex items-center gap-1.5"
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-mono text-[10px] tracking-wider hidden sm:inline text-slate-500 hover:text-white/70 transition-colors">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT: editorial portrait */}
        <div className="relative hidden lg:flex items-end overflow-hidden">
          {/* Portrait */}
          <motion.div
            style={{ y: portraitY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.1 }}
            className="relative w-full h-full"
          >
            <img
              src={personalInfo.profileImage}
              alt="Aryan Dadwal"
              className="w-full h-full object-cover object-top"
              style={{ minHeight: '100vh', maxHeight: '100vh' }}
              loading="eager"
            />

            {/* Left edge gradient — blends into background */}
            <div
              className="absolute inset-y-0 left-0 w-24 pointer-events-none"
              style={{ background: 'linear-gradient(to right, #070809 0%, transparent 100%)' }}
            />

            {/* Bottom gradient fade */}
            <div
              className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
              style={{ background: 'linear-gradient(to top, #070809 0%, transparent 100%)' }}
            />

            {/* Subtle vignette right edge */}
            <div
              className="absolute inset-y-0 right-0 w-8 pointer-events-none"
              style={{ background: 'linear-gradient(to left, rgba(7,8,9,0.6) 0%, transparent 100%)' }}
            />

            {/* Floating metadata labels on portrait */}
            <div className="absolute top-28 left-0 -translate-x-0 space-y-1.5 pl-4">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-mono tracking-widest uppercase"
                style={{ background: 'rgba(7,8,9,0.75)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" style={{ animation: 'pulse 2s infinite' }} />
                Open to Work
              </div>
            </div>

            {/* Bottom-left corner tech stamp */}
            <div
              className="absolute bottom-8 left-4 space-y-0.5"
            >
              <div className="font-mono text-[9px] tracking-[0.2em] text-white/25 uppercase">FULL STACK DEV</div>
              <div className="font-mono text-[9px] tracking-[0.2em] text-white/15 uppercase">LPU · B.TECH CSE</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile portrait strip */}
      <div className="lg:hidden relative mt-8 mx-6 sm:mx-10 rounded-2xl overflow-hidden" style={{ maxHeight: 340 }}>
        <img
          src={personalInfo.profileImage}
          alt="Aryan Dadwal"
          className="w-full object-cover object-top"
          style={{ height: 340 }}
          loading="eager"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #070809 0%, transparent 100%)' }}
        />
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)' }}
      />
    </section>
  );
}
