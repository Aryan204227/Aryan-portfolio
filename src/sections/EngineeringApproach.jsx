import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Compass, GitMerge, Wrench, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'UNDERSTAND & SCOPE',
    description: 'Deconstruct problem constraints, algorithmic requirements, and system boundaries before writing a single line of code.',
    icon: Compass,
  },
  {
    number: '02',
    title: 'ARCHITECT & DECOUPLE',
    description: 'Design decoupled client-server data flows, REST endpoints, clean component hierarchies, and normalized database schemas.',
    icon: GitMerge,
  },
  {
    number: '03',
    title: 'BUILD & BENCHMARK',
    description: 'Write modular code, practice recursive state analysis (DFS), and benchmark performance against real computational metrics.',
    icon: Wrench,
  },
  {
    number: '04',
    title: 'REFINE & SHIP',
    description: 'Optimize time and space complexity, polish responsive UX across viewport breakpoints, and deploy automated cloud builds.',
    icon: ShieldCheck,
  },
];

export default function EngineeringApproach() {
  const ref = useRef(null);

  return (
    <section id="approach" className="relative bg-[#07080a]/75 backdrop-blur-[2px] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-white/[0.06]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-lime-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12141a] border border-lime-500/30 text-lime-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(132,204,22,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span>ENGINEERING PHILOSOPHY</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold tracking-tight text-center leading-[1.05] text-white max-w-3xl mb-4"
          style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}
        >
          How I engineer &amp; deliver solutions.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-neutral-400 text-sm sm:text-base text-center max-w-xl mb-16 font-light"
        >
          A methodical four-stage workflow applied from concept to production deployment.
        </motion.p>

        {/* 4 Process Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-3xl bg-[#0d0f17] border border-white/[0.08] p-7 shadow-2xl flex flex-col justify-between hover:border-lime-500/40 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-lime-400 bg-lime-500/10 border border-lime-500/20 px-3 py-1 rounded-full">
                      STEP {step.number}
                    </span>
                    <Icon className="w-5 h-5 text-neutral-400 group-hover:text-lime-400 transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-lime-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.06] mt-6 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>DISCIPLINE</span>
                  <span className="text-lime-400">VERIFIED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 text-center max-w-2xl p-6 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          <p className="text-sm sm:text-base italic text-neutral-300 font-light">
            "The goal is not simply to write more code. The goal is to solve the problem correctly with clarity, reliability, and precision."
          </p>
          <span className="text-[11px] font-mono text-lime-400 uppercase tracking-widest mt-2 block font-semibold">
            — Engineering Principle
          </span>
        </motion.div>
      </div>
    </section>
  );
}
