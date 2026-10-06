import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MessageCircle, Github, Linkedin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { personalInfo, socialLinks } = portfolioData;

const links = [
  {
    label: 'EMAIL',
    href: socialLinks.email,
    Icon: Mail,
    value: 'aryandadwal709@gmail.com',
    color: 'rgba(56,189,248,0.15)',
    border: 'rgba(56,189,248,0.2)',
  },
  {
    label: 'WHATSAPP',
    href: personalInfo.whatsAppUrl,
    Icon: MessageCircle,
    value: '+91 86269 63353',
    color: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.2)',
    external: true,
  },
  {
    label: 'GITHUB',
    href: socialLinks.github,
    Icon: Github,
    value: 'github.com/Aryan204227',
    color: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.1)',
    external: true,
  },
  {
    label: 'LINKEDIN',
    href: socialLinks.linkedin,
    Icon: Linkedin,
    value: 'linkedin.com/in/aryan-dadwal-cse',
    color: 'rgba(59,130,246,0.1)',
    border: 'rgba(59,130,246,0.2)',
    external: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #07080c 0%, #08091000 100%)' }}>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Ambient bottom glow */}
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none"
        style={{ height: '60%', background: 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(56,189,248,0.06) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-32">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-[11px] tracking-[0.22em] text-white/30 uppercase">10 / Contact</span>
          <div className="flex-1 h-px bg-white/8 max-w-[60px]" />
        </motion.div>

        {/* Giant CTA headline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <div
            className="font-black leading-[0.88] tracking-tight"
            style={{ fontSize: 'clamp(52px, 10vw, 130px)' }}
          >
            <div className="text-white">LET'S BUILD</div>
            <div style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.75)', WebkitTextFillColor: 'transparent' }}>
              SOMETHING
            </div>
            <div className="text-white">USEFUL.</div>
          </div>
        </motion.div>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-white/40 font-light mb-16 max-w-lg"
          style={{ fontSize: 'clamp(14px, 1.4vw, 17px)' }}
        >
          Available for internships &amp; full-time software engineering roles.
          I'm open to collaborations, opportunities, and conversations.
        </motion.p>

        {/* Contact links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((link, i) => {
            const { Icon } = link;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="group relative rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 cursor-pointer"
                style={{
                  background: link.color,
                  border: `1px solid ${link.border}`,
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <Icon className="w-4.5 h-4.5 text-white/60" />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.22em] text-white/30 uppercase mb-1">{link.label}</div>
                  <div className="font-medium text-white/80 text-sm leading-snug break-all">{link.value}</div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Bottom stamp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-20 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="font-mono text-[10px] tracking-[0.22em] text-white/20 uppercase">
            ARYAN DADWAL — FULL STACK DEVELOPER — 2026
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.18em] text-emerald-500/70 uppercase">
              OPEN TO OPPORTUNITIES
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
