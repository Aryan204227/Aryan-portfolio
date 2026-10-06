import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader({ onComplete }) {
  const [step, setStep] = useState(0);
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('aryan_portfolio_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (seen || prefersReducedMotion) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setStep(1), 150);   // ARYAN blur->sharp + light sweep
    const t2 = setTimeout(() => setStep(2), 500);   // DADWAL
    const t3 = setTimeout(() => setStep(3), 850);   // role line + particle bloom
    const t4 = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        if (!doneRef.current) {
          doneRef.current = true;
          sessionStorage.setItem('aryan_portfolio_intro_seen', 'true');
          onComplete();
        }
      }, 480);
    }, 1250);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center select-none overflow-hidden"
        >
          {/* Subtle ambient glow behind text */}
          <div className="absolute w-[500px] h-[500px] bg-orange-500/[0.04] rounded-full blur-3xl pointer-events-none" />

          {/* Light sweep line */}
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={step >= 1 ? { x: '200%', opacity: [0, 0.4, 0] } : {}}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute top-1/2 -translate-y-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-orange-400 to-transparent pointer-events-none"
          />

          <div className="relative text-center z-10">

            {/* ARYAN — solid, blur-to-sharp */}
            <div className="overflow-hidden mb-1 relative">
              <motion.div
                initial={{ y: 40, opacity: 0, filter: 'blur(14px)' }}
                animate={step >= 1 ? { y: 0, opacity: 1, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="font-black text-white tracking-[-0.03em] relative"
                style={{ fontSize: 'clamp(52px, 12vw, 100px)', lineHeight: 0.9 }}
              >
                ARYAN
              </motion.div>
            </div>

            {/* DADWAL — outlined */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 40, opacity: 0, filter: 'blur(14px)' }}
                animate={step >= 2 ? { y: 0, opacity: 1, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="font-black tracking-[-0.03em]"
                style={{
                  fontSize: 'clamp(52px, 12vw, 100px)',
                  lineHeight: 0.9,
                  WebkitTextStroke: '1.5px rgba(255,255,255,0.85)',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                DADWAL
              </motion.div>
            </div>

            {/* Role line */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mt-5 flex items-center justify-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-mono text-[11px] sm:text-xs tracking-[0.24em] text-orange-400 uppercase">
                Full-Stack Developer
              </span>
            </motion.div>

          </div>

          {/* Bottom status badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={step >= 3 ? { opacity: 1 } : {}}
            transition={{ duration: 0.3 }}
            className="absolute bottom-10 flex items-center gap-2 font-mono text-[9px] text-neutral-500 tracking-widest uppercase"
          >
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
            <span>PORTFOLIO READY</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
