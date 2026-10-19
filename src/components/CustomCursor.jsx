import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState('');
  const pos = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafId = useRef(null);

  useEffect(() => {
    // Only on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.15);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.15);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      rafId.current = requestAnimationFrame(loop);
    };

    const enter = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) {
        setHovered(true);
        setLabel(el.dataset.cursor || '');
      } else if (e.target.closest('a, button, input, textarea')) {
        setHovered(true);
        setLabel('');
      }
    };

    const leave = (e) => {
      if (e.target.closest('[data-cursor], a, button, input, textarea')) {
        setHovered(false);
        setLabel('');
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', enter);
    document.addEventListener('mouseout', leave);
    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', enter);
      document.removeEventListener('mouseout', leave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Small dot — follows cursor directly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-lime-400 pointer-events-none shadow-[0_0_8px_#a3e635]"
        style={{ willChange: 'transform', transition: 'opacity 0.2s' }}
      />
      {/* Lagging ring with electric lime accent */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: hovered ? (label ? 64 : 48) : 36,
          height: hovered ? (label ? 64 : 48) : 36,
          marginLeft: hovered ? (label ? -12 : -4) : 2,
          marginTop: hovered ? (label ? -12 : -4) : 2,
          willChange: 'transform',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${
            hovered
              ? 'border border-lime-400/80 bg-lime-500/10 backdrop-blur-[2px]'
              : 'border border-white/20'
          }`}
        >
          {label && (
            <span className="font-mono text-[9px] text-lime-400 font-bold tracking-widest uppercase whitespace-nowrap">
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
