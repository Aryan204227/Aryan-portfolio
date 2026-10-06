import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { certificates } = portfolioData;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const ACCENT_COLORS = [
  { line: 'rgba(56,189,248,0.5)', glow: 'rgba(56,189,248,0.06)' },
  { line: 'rgba(99,102,241,0.5)', glow: 'rgba(99,102,241,0.06)' },
  { line: 'rgba(245,158,11,0.5)', glow: 'rgba(245,158,11,0.06)' },
];

export default function Certificates() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certificates" className="relative overflow-hidden bg-[#07080c]">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Ghost number */}
      <div
        className="absolute top-0 left-0 select-none pointer-events-none font-black"
        style={{ fontSize: 'clamp(140px, 20vw, 280px)', color: 'rgba(255,255,255,0.022)', lineHeight: 1 }}
        aria-hidden
      >
        07
      </div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-32">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[11px] tracking-[0.22em] text-white/30 uppercase">07 / Credentials</span>
            <div className="flex-1 h-px bg-white/8 max-w-[60px]" />
          </div>
          <div
            className="font-black leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(44px, 7vw, 88px)' }}
          >
            <span className="text-white">PROFESSIONAL </span>
            <br />
            <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.7)', WebkitTextFillColor: 'transparent' }}>
              MILESTONES
            </span>
          </div>
        </motion.div>

        {/* Certificate grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert, i) => {
            const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
            return (
              <motion.a
                key={cert.id}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="group relative rounded-2xl overflow-hidden flex flex-col justify-between p-7 transition-all duration-300 cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                whileHover={{
                  scale: 1.02,
                  background: accent.glow,
                  borderColor: accent.line,
                  transition: { duration: 0.25 },
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent.line}, transparent)` }}
                />

                {/* Certificate number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] tracking-[0.22em] text-white/25 uppercase">
                    CERT {String(i + 1).padStart(2, '0')}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors" />
                </div>

                {/* Title */}
                <div className="space-y-2 flex-1">
                  <h3 className="font-bold text-white leading-tight text-base">
                    {cert.title}
                  </h3>
                  <p className="font-mono text-[11px] text-white/40 tracking-wide">
                    {cert.organization}
                  </p>
                  {cert.date && (
                    <p className="font-mono text-[10px] text-white/25 tracking-wider uppercase">
                      {cert.date}
                    </p>
                  )}
                </div>

                {/* View link */}
                <div className="mt-6 pt-5 border-t border-white/[0.06]">
                  <span className="font-mono text-[11px] text-white/30 group-hover:text-white/70 transition-colors uppercase tracking-widest flex items-center gap-1.5">
                    VIEW CERTIFICATE
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
