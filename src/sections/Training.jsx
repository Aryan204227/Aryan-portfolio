import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { training } = portfolioData;
const t = training[0];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Training() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="training" className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #07080c 0%, #090b14 100%)' }}>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Ghost number */}
      <div
        className="absolute top-0 right-0 select-none pointer-events-none font-black"
        style={{ fontSize: 'clamp(140px, 20vw, 280px)', color: 'rgba(255,255,255,0.022)', lineHeight: 1 }}
        aria-hidden
      >
        06
      </div>

      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-32"
      >
        {/* Section header */}
        <motion.div variants={fadeUp} className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[11px] tracking-[0.22em] text-white/30 uppercase">06 / Training</span>
            <div className="flex-1 h-px bg-white/8 max-w-[60px]" />
          </div>
          <div
            className="font-black leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(44px, 7vw, 88px)' }}
          >
            <span className="text-white">TRAINING &</span>
            <br />
            <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.7)', WebkitTextFillColor: 'transparent' }}>
              JOURNEY
            </span>
          </div>
        </motion.div>

        {/* Training card — editorial style */}
        <motion.div variants={fadeUp}>
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Subtle glow */}
            <div
              className="absolute top-0 left-0 w-full h-1 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent)' }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left: headline */}
              <div className="lg:col-span-4 p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col justify-between gap-8">
                <div className="space-y-4">
                  <span className="font-mono text-[10px] tracking-[0.22em] text-cyan-400/60 uppercase block">
                    INTENSIVE BOOT CAMP
                  </span>
                  <h3 className="font-black text-white leading-tight text-xl sm:text-2xl">
                    Job Ready DSA Boot Camp<br />Using Java
                  </h3>
                  <p className="font-light text-white/50 text-sm leading-relaxed">
                    {t.organization}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="text-white/40 uppercase tracking-widest">{t.duration}</span>
                  </div>
                  <a
                    href={t.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-widest text-white border border-white/14 hover:border-white/35 hover:bg-white/5 transition-all uppercase"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>VIEW CERTIFICATE</span>
                  </a>
                </div>
              </div>

              {/* Right: description + topics */}
              <div className="lg:col-span-8 p-8 sm:p-10 space-y-8">
                <p className="text-white/55 font-light text-sm sm:text-base leading-relaxed">
                  {t.description}
                </p>

                <div>
                  <span className="font-mono text-[10px] tracking-[0.22em] text-white/25 uppercase block mb-4">
                    TOPICS COVERED
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {t.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1.5 rounded-full font-mono text-[11px] text-white/50 border border-white/8 tracking-wide"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
