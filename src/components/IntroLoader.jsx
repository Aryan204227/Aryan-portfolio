import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader({ onComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Check if user already saw intro in this session or prefers reduced motion
    const seen = sessionStorage.getItem('aryan_portfolio_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (seen || prefersReducedMotion) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setStep(1), 350); // ARYAN
    const t2 = setTimeout(() => setStep(2), 700); // DADWAL
    const t3 = setTimeout(() => setStep(3), 1050); // FULL-STACK DEVELOPER
    const t4 = setTimeout(() => {
      sessionStorage.setItem('aryan_portfolio_intro_seen', 'true');
      onComplete();
    }, 1450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center select-none"
    >
      <div className="relative text-center space-y-2">
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={step >= 1 ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl font-black text-white tracking-tighter"
          >
            ARYAN
          </motion.div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={step >= 2 ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl font-black tracking-tighter"
            style={{
              WebkitTextStroke: '1.5px rgba(255,255,255,0.85)',
              WebkitTextFillColor: 'transparent',
            }}
          >
            DADWAL
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={step >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35 }}
          className="pt-3 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-orange-400 uppercase"
        >
          FULL-STACK DEVELOPER
        </motion.div>
      </div>

      <div className="absolute bottom-10 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
        <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase">INITIALIZING</span>
      </div>
    </motion.div>
  );
}
