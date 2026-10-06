import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const infoItems = [
  { label: 'EDUCATION', value: 'B.Tech CSE — Lovely Professional University' },
  { label: 'GRADE',     value: 'CGPA 7.07' },
  { label: 'FOCUS',     value: 'Full Stack Development · MERN Stack' },
  { label: 'CORE',      value: 'Java · JavaScript · Data Structures & Algorithms' },
  { label: 'STATUS',    value: 'Available — Internships & Full-time Roles' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #07080c 0%, #090b13 100%)' }}
    >
      {/* Top divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Giant watermark number */}
      <div
        className="absolute top-0 left-0 select-none pointer-events-none font-black leading-none"
        style={{ fontSize: 'clamp(160px, 22vw, 320px)', color: 'rgba(255,255,255,0.025)', lineHeight: 1, userSelect: 'none' }}
        aria-hidden
      >
        02
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-32"
      >

        {/* Big editorial headline */}
        <motion.div variants={fadeUp} className="mb-24 max-w-5xl">
          <div
            className="font-black leading-[0.88] tracking-tight"
            style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}
          >
            <div className="text-white">BUILDING WITH</div>
            <div style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.7)', WebkitTextFillColor: 'transparent' }}>
              CURIOSITY.
            </div>
            <div className="text-white">LEARNING BY</div>
            <div style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.7)', WebkitTextFillColor: 'transparent' }}>
              CREATING.
            </div>
          </div>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Left — personal paragraph */}
          <motion.div variants={fadeUp} className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <p
              className="text-white/75 font-light leading-[1.75]"
              style={{ fontSize: 'clamp(16px, 1.6vw, 20px)' }}
            >
              I'm a Computer Science student at Lovely Professional University with a deep
              focus on building full-stack web applications that solve real problems.
            </p>
            <p
              className="text-white/55 font-light leading-[1.75]"
              style={{ fontSize: 'clamp(14px, 1.3vw, 17px)' }}
            >
              I work with the MERN stack, write Java for algorithmic challenges, and
              build AI-integrated systems — always aiming for code that's clean, logical,
              and purposeful. My approach is to understand the problem first, architect
              a solution, then build and refine until it works correctly.
            </p>

            {/* Accent line */}
            <div className="flex items-center gap-4 pt-2">
              <div className="w-12 h-px bg-white/20" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-slate-500 uppercase">
                Computer Science &amp; Engineering · 2028
              </span>
            </div>
          </motion.div>

          {/* Right — info panel */}
          <motion.div variants={fadeUp} className="lg:col-span-6">
            <div className="space-y-0">
              {infoItems.map((item, i) => (
                <div
                  key={item.label}
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-8 py-5 border-b border-white/[0.06]"
                >
                  <span className="font-mono text-[10px] tracking-[0.22em] text-white/30 uppercase min-w-[100px] shrink-0">
                    {item.label}
                  </span>
                  <span className="text-white/70 text-sm font-light leading-relaxed">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div
          variants={fadeUp}
          className="mt-20 pt-8 border-t border-white/[0.06]"
        >
          <p className="font-mono text-[10px] tracking-[0.25em] text-white/20 uppercase">
            ARYAN DADWAL&nbsp;&nbsp;·&nbsp;&nbsp;FULL STACK DEVELOPER&nbsp;&nbsp;·&nbsp;&nbsp;LOVELY PROFESSIONAL UNIVERSITY, PHAGWARA&nbsp;&nbsp;·&nbsp;&nbsp;CLASS OF 2028
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
