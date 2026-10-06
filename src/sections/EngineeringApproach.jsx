import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Compass, GitMerge, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'UNDERSTAND & SCOPE',
    description: 'Deconstruct requirements and constraints before writing a single line of code. Clarity first.',
    icon: Compass,
  },
  {
    number: '02',
    title: 'ARCHITECT & DECOUPLE',
    description: 'Design decoupled client-server data flows, REST endpoints, and modular database schemas.',
    icon: GitMerge,
  },
  {
    number: '03',
    title: 'BUILD & BENCHMARK',
    description: 'Develop structured components with clean types, recursion logic, and real-time execution feedback.',
    icon: Wrench,
  },
  {
    number: '04',
    title: 'REFINE & DEPLOY',
    description: 'Optimize time complexity, polish responsive UX, and ship production-ready cloud builds on Render.',
    icon: ShieldCheck,
  },
];

export default function EngineeringApproach() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="approach" className="relative bg-[#0a0a0a] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">

        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161616] border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
        >
          <span className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center text-[10px] text-orange-400 font-bold">
            ⚙️
          </span>
          <span>ENGINEERING APPROACH</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold tracking-tight text-center leading-[1.05] text-white max-w-3xl mb-16"
          style={{ fontSize: 'clamp(36px, 5.5vw, 68px)' }}
        >
          How I engineer &amp; deliver software solutions.
        </motion.h2>

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
                className="rounded-3xl bg-[#121214] border border-white/10 p-7 shadow-2xl flex flex-col justify-between hover:border-orange-500/40 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
                      STEP {step.number}
                    </span>
                    <Icon className="w-5 h-5 text-neutral-400 group-hover:text-orange-400 transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-orange-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>DISCIPLINE</span>
                  <span className="text-white group-hover:text-orange-400 transition-colors">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Engineering Philosophy Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 text-center max-w-2xl px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          <p className="font-light text-neutral-300 italic text-sm sm:text-base leading-relaxed">
            "The goal is not simply to write more code. The goal is to solve the problem correctly with clean architecture."
          </p>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-2 block">
            — Engineering Principle
          </span>
        </motion.div>

      </div>
    </section>
  );
}
