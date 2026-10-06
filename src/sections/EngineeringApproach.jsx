import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'UNDERSTAND',
    description: 'Define the problem clearly before writing a single line of code.',
  },
  {
    number: '02',
    title: 'ARCHITECT',
    description: 'Plan the system structure: components, data flow, dependencies.',
  },
  {
    number: '03',
    title: 'BUILD',
    description: 'Write clean, modular code. Test early. Iterate fast.',
  },
  {
    number: '04',
    title: 'REFINE',
    description: 'Optimize, clean up, and improve until the solution is complete.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function EngineeringApproach() {
  const ref = useRef(null);
  const lineRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="approach" className="relative overflow-hidden bg-[#07080c]">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Ghost number */}
      <div
        className="absolute top-0 left-0 select-none pointer-events-none font-black"
        style={{ fontSize: 'clamp(140px, 20vw, 280px)', color: 'rgba(255,255,255,0.022)', lineHeight: 1 }}
        aria-hidden
      >
        09
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
            <span className="font-mono text-[11px] tracking-[0.22em] text-white/30 uppercase">09 / Approach</span>
            <div className="flex-1 h-px bg-white/8 max-w-[60px]" />
          </div>
          <div
            className="font-black leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(44px, 7vw, 88px)' }}
          >
            <span className="text-white">HOW I </span>
            <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.7)', WebkitTextFillColor: 'transparent' }}>
              BUILD
            </span>
          </div>
        </motion.div>

        {/* Horizontal process — desktop */}
        <div className="relative hidden lg:block">
          {/* Connecting animated line */}
          <div className="absolute top-[2.5rem] left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <motion.div
            className="absolute top-[2.5rem] left-0 h-px"
            style={{ background: 'linear-gradient(90deg, rgba(56,189,248,0.6), rgba(56,189,248,0.1))' }}
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : { width: 0 }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="grid grid-cols-4 gap-8 pt-20">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="space-y-4"
              >
                {/* Step number with dot above (aligned with line) */}
                <div
                  className="absolute -top-[2rem] font-mono text-[10px] tracking-[0.22em] text-white/25 uppercase"
                  style={{ marginTop: '-4.5rem' }}
                />
                <div
                  className="font-black leading-none tracking-tight"
                  style={{
                    fontSize: 'clamp(48px, 6vw, 80px)',
                    WebkitTextStroke: '1px rgba(255,255,255,0.18)',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {step.number}
                </div>
                <h3 className="font-bold text-white text-lg tracking-tight">{step.title}</h3>
                <p className="text-white/40 font-light text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vertical process — mobile */}
        <div className="lg:hidden space-y-10 relative border-l border-white/[0.06] pl-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="relative space-y-2"
            >
              {/* Dot */}
              <div className="absolute -left-[2.35rem] top-1.5 w-3 h-3 rounded-full border border-white/20"
                style={{ background: '#07080c' }} />

              <div
                className="font-black"
                style={{
                  fontSize: 'clamp(36px, 8vw, 52px)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.18)',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                }}
              >
                {step.number}
              </div>
              <h3 className="font-bold text-white text-base tracking-tight">{step.title}</h3>
              <p className="text-white/40 font-light text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Philosophy quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-24 pt-12 border-t border-white/[0.06] max-w-2xl"
        >
          <p className="font-light text-white/45 italic leading-relaxed" style={{ fontSize: 'clamp(15px, 1.5vw, 18px)' }}>
            "The goal is not to write more code. The goal is to solve the problem correctly."
          </p>
          <p className="font-mono text-[10px] tracking-[0.22em] text-white/20 uppercase mt-3">
            — Engineering Philosophy
          </p>
        </motion.div>
      </div>
    </section>
  );
}
