/**
 * FloatingTechOrbit.jsx
 * 
 * A subtle floating technology ecosystem displayed as slowly drifting
 * tech badges in a contained area. Mouse hover slightly pushes them.
 * Reveals category on hover. Slow, elegant, professional.
 * Only renders on desktop (hidden on mobile for perf).
 */
import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const TECH_ORBIT = [
  { name: 'React',       cat: 'Frontend',  color: '#38bdf8', x: 12,  y: 18  },
  { name: 'Node.js',     cat: 'Backend',   color: '#22c55e', x: 82,  y: 25  },
  { name: 'MongoDB',     cat: 'Database',  color: '#10b981', x: 65,  y: 72  },
  { name: 'TypeScript',  cat: 'Language',  color: '#60a5fa', x: 28,  y: 68  },
  { name: 'Java',        cat: 'Language',  color: '#ea580c', x: 90,  y: 55  },
  { name: 'Express',     cat: 'Backend',   color: '#d1d5db', x: 45,  y: 12  },
  { name: 'Git',         cat: 'Tools',     color: '#f97316', x: 8,   y: 45  },
  { name: 'Tailwind',    cat: 'Frontend',  color: '#38bdf8', x: 75,  y: 85  },
  { name: 'JavaScript',  cat: 'Language',  color: '#facc15', x: 55,  y: 38  },
  { name: 'Python',      cat: 'Language',  color: '#a78bfa', x: 18,  y: 85  },
];

function FloatBadge({ tech, mouseX, mouseY, containerRef }) {
  const [hovered, setHovered] = useState(false);
  const baseX = tech.x;
  const baseY = tech.y;
  
  // Gentle autonomous float offset
  const phase = useRef(Math.random() * Math.PI * 2);
  const [floatY, setFloatY] = useState(0);
  const [floatX, setFloatX] = useState(0);

  useEffect(() => {
    let rafId;
    const speed = 0.0004 + Math.random() * 0.0003;
    const ampY = 5 + Math.random() * 6;
    const ampX = 3 + Math.random() * 4;
    let t = phase.current;
    const loop = (ts) => {
      t += speed * 16;
      setFloatY(Math.sin(t) * ampY);
      setFloatX(Math.cos(t * 0.7) * ampX);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Mouse repel
  const [repelX, setRepelX] = useState(0);
  const [repelY, setRepelY] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (baseX / 100) * rect.width + rect.left;
    const py = (baseY / 100) * rect.height + rect.top;
    const dx = mouseX - px;
    const dy = mouseY - py;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = 120;
    if (dist < radius && dist > 0) {
      const force = (radius - dist) / radius;
      setRepelX(-(dx / dist) * force * 22);
      setRepelY(-(dy / dist) * force * 22);
    } else {
      setRepelX(0);
      setRepelY(0);
    }
  }, [mouseX, mouseY, baseX, baseY, containerRef]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${baseX}%`,
        top: `${baseY}%`,
        x: floatX + repelX,
        y: floatY + repelY,
        transform: 'translate(-50%, -50%)',
        zIndex: hovered ? 10 : 1,
        willChange: 'transform',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ opacity: hovered ? 1 : 0.45 }}
      transition={{ opacity: { duration: 0.2 } }}
    >
      <motion.div
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative group flex flex-col items-center cursor-default"
      >
        <div
          className="px-3 py-1.5 rounded-full border text-[11px] font-mono font-semibold tracking-wider backdrop-blur-sm whitespace-nowrap"
          style={{
            borderColor: `${tech.color}50`,
            background: `${tech.color}12`,
            color: tech.color,
            boxShadow: hovered ? `0 0 18px ${tech.color}40` : 'none',
          }}
        >
          {tech.name}
        </div>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-6 text-[9px] font-mono text-neutral-500 uppercase tracking-widest whitespace-nowrap"
          >
            {tech.cat}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function FloatingTechOrbit() {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      {TECH_ORBIT.map((tech) => (
        <div key={tech.name} style={{ pointerEvents: 'auto' }}>
          <FloatBadge
            tech={tech}
            mouseX={mouse.x}
            mouseY={mouse.y}
            containerRef={containerRef}
          />
        </div>
      ))}
    </div>
  );
}
