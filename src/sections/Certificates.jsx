import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { certificates } = portfolioData;

export default function Certificates() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <section id="certificates" className="relative bg-[#07080c]">
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)' }} />

      {/* Ghost number */}
      <div
        className="absolute top-0 left-0 select-none pointer-events-none font-black leading-none"
        style={{ fontSize: 'clamp(140px, 22vw, 300px)', color: 'rgba(255,255,255,0.02)' }}
        aria-hidden
      >
        07
      </div>

      <div ref={ref} className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-32">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="font-mono text-[11px] tracking-[0.22em] text-white/25 uppercase block mb-5">
            07 / Credentials
          </span>
          <div style={{ fontSize: 'clamp(44px, 7vw, 92px)' }} className="font-black tracking-tight leading-[0.9]">
            <span className="text-white">CERTIFICATES &</span><br />
            <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.65)', WebkitTextFillColor: 'transparent' }}>
              CREDENTIALS
            </span>
          </div>
        </motion.div>

        {/* Archive rows */}
        <div className="border-t border-white/[0.07]">
          {certificates.map((cert, i) => (
            <motion.a
              key={cert.id}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.65 }}
              className="group block border-b border-white/[0.07] cursor-pointer"
              style={{
                background: hoveredRow === i ? 'rgba(255,255,255,0.02)' : 'transparent',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
              data-cursor="VIEW"
            >
              <div className="flex items-center justify-between gap-6 py-7 sm:py-8">
                {/* Left: number + title + issuer */}
                <div className="flex items-center gap-6 sm:gap-10 min-w-0">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-white/20 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <div
                      className="font-bold text-white leading-tight truncate transition-all duration-300"
                      style={{ fontSize: hoveredRow === i ? 'clamp(17px, 2vw, 24px)' : 'clamp(15px, 1.8vw, 21px)' }}
                    >
                      {cert.title}
                    </div>
                    <div className="font-mono text-[11px] text-white/30 mt-1 tracking-wide">
                      {cert.organization}
                    </div>
                  </div>
                </div>

                {/* Right: date + view link */}
                <div className="flex items-center gap-6 shrink-0">
                  {cert.date && (
                    <span className="font-mono text-[11px] text-white/25 hidden sm:block tracking-wider">
                      {cert.date}
                    </span>
                  )}
                  <div
                    className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors duration-300"
                    style={{ color: hoveredRow === i ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)' }}
                  >
                    <span>VIEW</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
