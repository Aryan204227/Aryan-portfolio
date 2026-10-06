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
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
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
      }
    };

    const leave = () => {
      setHovered(false);
      setLabel('');
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
        className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-white pointer-events-none mix-blend-difference"
        style={{ willChange: 'transform', transition: 'opacity 0.2s' }}
      />
      {/* Lagging ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: hovered ? 56 : 40,
          height: hovered ? 56 : 40,
          marginLeft: hovered ? -8 : 0,
          marginTop: hovered ? -8 : 0,
          willChange: 'transform',
          transition: 'width 0.3s, height 0.3s, opacity 0.2s',
        }}
      >
        <div
          className="w-full h-full rounded-full border border-white/30 flex items-center justify-center"
          style={{ transition: 'border-color 0.3s' }}
        >
          {label && (
            <span className="font-mono text-[8px] text-white/70 tracking-widest uppercase whitespace-nowrap">
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
