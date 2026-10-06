import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const disciplines = [
  {
    number: '01',
    title: 'FULL STACK DEVELOPMENT',
    description: 'Building complete web products end-to-end — database design, server logic, and polished client interfaces.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    accent: 'rgba(56,189,248,0.06)',
  },
  {
    number: '02',
    title: 'BACKEND & API ENGINEERING',
    description: 'Designing clean, decoupled server-side architectures with structured endpoints and robust data handling.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'Render', 'REST'],
    accent: 'rgba(99,102,241,0.06)',
  },
  {
    number: '03',
    title: 'DATA STRUCTURES & ALGORITHMS',
    description: 'Solving complex computational problems with structured, efficient algorithmic thinking in Java.',
    tech: ['Java', 'DFS', 'Recursion', 'Backtracking', 'OOP'],
    accent: 'rgba(16,185,129,0.06)',
  },
  {
    number: '04',
    title: 'INTERACTIVE WEB EXPERIENCES',
    description: 'Crafting dynamic, responsive interfaces with modern tooling and attention to performance and detail.',
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'Vite', 'HTML5'],
    accent: 'rgba(245,158,11,0.06)',
  },
];

const rowVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Expertise() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hovered, setHovered] = useState(null);

  return (
    <section id="expertise" className="relative overflow-hidden bg-[#07080c]">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Ghost number watermark */}
      <div
        className="absolute top-0 right-0 select-none pointer-events-none font-black"
        style={{ fontSize: 'clamp(140px, 20vw, 280px)', color: 'rgba(255,255,255,0.022)', lineHeight: 1, userSelect: 'none' }}
        aria-hidden
      >
        03
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
            <span className="font-mono text-[11px] tracking-[0.22em] text-white/30 uppercase">03 / Expertise</span>
            <div className="flex-1 h-px bg-white/8 max-w-[60px]" />
          </div>
          <div
            className="font-black leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(44px, 7vw, 88px)' }}
          >
            <span className="text-white">WHAT I </span>
            <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.7)', WebkitTextFillColor: 'transparent' }}>
              BUILD
            </span>
          </div>
        </motion.div>

        {/* Discipline rows */}
        <div className="border-t border-white/[0.07]">
          {disciplines.map((d, i) => (
            <motion.div
              key={d.number}
              ref={ref}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="relative group border-b border-white/[0.07] cursor-default overflow-hidden"
              style={{
                background: hovered === i ? d.accent : 'transparent',
                transition: 'background 0.4s ease, padding-left 0.4s ease',
                paddingLeft: hovered === i ? '12px' : '0px',
              }}
            >
              <div className="flex items-start lg:items-center justify-between gap-6 py-7 lg:py-8">
                {/* Left: number + title */}
                <div className="flex items-start lg:items-center gap-6 lg:gap-10 flex-1 min-w-0">
                  <span
                    className="font-mono shrink-0 transition-colors duration-300"
                    style={{
                      fontSize: 'clamp(11px, 1vw, 13px)',
                      color: hovered === i ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)',
                      letterSpacing: '0.14em',
                      paddingTop: '4px',
                    }}
                  >
                    {d.number}
                  </span>
                  <div className="space-y-2 min-w-0">
                    <h3
                      className="font-black tracking-tight text-white transition-all duration-300 leading-tight"
                      style={{ fontSize: hovered === i ? 'clamp(22px, 3.2vw, 40px)' : 'clamp(20px, 2.8vw, 36px)' }}
                    >
                      {d.title}
                    </h3>
                    <AnimatePresence>
                      {hovered === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-white/50 font-light text-sm leading-relaxed max-w-xl"
                        >
                          {d.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right: tech tags + arrow */}
                <div className="flex items-center gap-4 shrink-0">
                  <AnimatePresence>
                    {hovered === i && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="hidden lg:flex flex-wrap gap-1.5 justify-end max-w-[260px]"
                      >
                        {d.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-full font-mono text-[10px] text-white/50 border border-white/10 tracking-wider"
                          >
                            {t}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.div
                    animate={{ x: hovered === i ? 4 : 0, opacity: hovered === i ? 1 : 0.2 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
