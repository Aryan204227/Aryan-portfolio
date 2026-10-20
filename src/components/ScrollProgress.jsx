import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = document.documentElement;
        const total = Math.max(1, root.scrollHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, window.scrollY / total));
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${progress})`;
        }
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] overflow-hidden bg-white/[0.035]"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-lime-300 via-emerald-400 to-cyan-300 shadow-[0_0_16px_rgba(163,230,53,0.72)]"
        style={{ transform: 'scaleX(0)', transformOrigin: 'left center', willChange: 'transform' }}
      />
    </div>
  );
}
