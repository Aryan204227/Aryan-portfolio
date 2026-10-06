import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const categories = [
  {
    label: 'LANGUAGES',
    items: ['JavaScript', 'TypeScript', 'Java', 'C++', 'C', 'Python'],
  },
  {
    label: 'FRONTEND',
    items: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'],
  },
  {
    label: 'BACKEND',
    items: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    label: 'DATABASE & TOOLS',
    items: ['MongoDB', 'Git', 'GitHub', 'Render', 'DBMS'],
  },
  {
    label: 'CS CORE',
    items: ['Data Structures & Algorithms', 'OOP', 'Recursion & Backtracking', 'DFS', 'Multithreading'],
  },
];

const allTech = [
  'JavaScript', 'Java', 'React.js', 'Node.js', 'Express.js', 'MongoDB',
  'TypeScript', 'C++', 'Python', 'Tailwind CSS', 'Git', 'GitHub',
  'REST APIs', 'Vite', 'HTML5', 'CSS3', 'DSA', 'OOP', 'Render', 'DFS',
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function TechArsenal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const marqueeItems = [...allTech, ...allTech];

  return (
    <section id="stack" className="relative overflow-hidden bg-[#07080c]">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Ghost number */}
      <div
        className="absolute top-0 left-0 select-none pointer-events-none font-black"
        style={{ fontSize: 'clamp(140px, 20vw, 280px)', color: 'rgba(255,255,255,0.022)', lineHeight: 1 }}
        aria-hidden
      >
        04
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
            <span className="font-mono text-[11px] tracking-[0.22em] text-white/30 uppercase">04 / Tech Stack</span>
            <div className="flex-1 h-px bg-white/8 max-w-[60px]" />
          </div>
          <div
            className="font-black leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(44px, 7vw, 88px)' }}
          >
            <span className="text-white">TECHNICAL </span>
            <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.7)', WebkitTextFillColor: 'transparent' }}>
              ARSENAL
            </span>
          </div>
        </motion.div>

        {/* Category groups */}
        <div className="space-y-14">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              custom={ci}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="font-mono text-[10px] tracking-[0.24em] text-white/25 uppercase">
                  {cat.label}
                </span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
              <div className="flex flex-wrap gap-2.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="group px-4 py-2 rounded-full font-mono text-xs text-white/55 border border-white/[0.08] cursor-default
                      hover:text-white hover:border-white/25 hover:bg-white/[0.04] transition-all duration-200 tracking-wide"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Infinite marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative overflow-hidden border-t border-b border-white/[0.06] py-4"
        style={{ background: 'rgba(255,255,255,0.015)' }}
      >
        <div className="animate-marquee select-none pointer-events-none">
          {marqueeItems.map((item, i) => (
            <span key={i} className="font-mono text-[11px] tracking-[0.2em] text-white/20 uppercase whitespace-nowrap">
              {item}&nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
