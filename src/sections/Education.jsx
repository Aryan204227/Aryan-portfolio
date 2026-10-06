import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const { education } = portfolioData;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #07080c 0%, #090c14 100%)' }}>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Ghost number */}
      <div
        className="absolute top-0 right-0 select-none pointer-events-none font-black"
        style={{ fontSize: 'clamp(140px, 20vw, 280px)', color: 'rgba(255,255,255,0.022)', lineHeight: 1 }}
        aria-hidden
      >
        08
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
            <span className="font-mono text-[11px] tracking-[0.22em] text-white/30 uppercase">08 / Education</span>
            <div className="flex-1 h-px bg-white/8 max-w-[60px]" />
          </div>
          <div
            className="font-black leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(44px, 7vw, 88px)' }}
          >
            <span className="text-white">ACADEMIC </span>
            <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.7)', WebkitTextFillColor: 'transparent' }}>
              JOURNEY
            </span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute left-6 lg:left-8 top-0 bottom-0 w-px origin-top"
            style={{ background: 'linear-gradient(to bottom, rgba(56,189,248,0.5) 0%, rgba(255,255,255,0.06) 100%)' }}
          />

          <div className="space-y-0 pl-16 lg:pl-20">
            {education.map((edu, i) => (
              <motion.div
                key={edu.institution + edu.period}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="relative pb-14 last:pb-0"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[46px] lg:-left-[52px] top-1 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
                  style={{
                    background: edu.isCurrent ? '#07080c' : '#07080c',
                    borderColor: edu.isCurrent ? '#38bdf8' : 'rgba(255,255,255,0.2)',
                    boxShadow: edu.isCurrent ? '0 0 12px rgba(56,189,248,0.5)' : 'none',
                  }}
                >
                  {edu.isCurrent && (
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="font-mono text-[10px] tracking-[0.22em] text-white/30 uppercase">
                      {edu.period}
                    </span>
                    {edu.isCurrent && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[9px] tracking-widest uppercase"
                        style={{ background: 'rgba(56,189,248,0.08)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)' }}>
                        <span className="w-1 h-1 rounded-full bg-cyan-400 inline-block" />
                        CURRENT
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-lg sm:text-xl">
                      {edu.institution}
                    </h3>
                    <p className="font-mono text-[11px] text-white/40 tracking-wide mt-1">
                      {edu.location}
                    </p>
                  </div>

                  <p className="text-white/60 text-sm">
                    {edu.degree} — {edu.field}
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8"
                    style={{ background: 'rgba(255,255,255,0.025)' }}>
                    <span className="font-mono text-[11px] text-white/60 tracking-wider">{edu.grade}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
