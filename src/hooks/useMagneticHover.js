/**
 * useMagneticHover.js
 * 
 * Returns ref + event handlers + spring-animated x/y offsets
 * that create a magnetic-pull effect on hover.
 * 
 * Usage:
 *   const { ref, x, y, handlers } = useMagneticHover({ strength: 0.35 });
 *   <motion.div ref={ref} style={{ x, y }} {...handlers} />
 */
import { useRef, useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export default function useMagneticHover({ strength = 0.35, springConfig = { stiffness: 180, damping: 20 } } = {}) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) * strength);
    rawY.set((e.clientY - cy) * strength);
  }, [rawX, rawY, strength]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return {
    ref,
    x,
    y,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}
