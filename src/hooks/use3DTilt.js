/**
 * use3DTilt.js
 * 
 * Returns ref + event handlers + rotateX/rotateY motion values
 * that create a subtle 3D perspective tilt on hover.
 * 
 * Usage:
 *   const { ref, rotateX, rotateY, handlers } = use3DTilt();
 *   <motion.div ref={ref} style={{ rotateX, rotateY, transformPerspective: 900 }} {...handlers} />
 */
import { useRef, useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export default function use3DTilt({ maxTilt = 8, springConfig = { stiffness: 200, damping: 18 } } = {}) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, springConfig);
  const rotateY = useSpring(rawY, springConfig);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (e.clientX - cx) / (rect.width / 2);   // -1 to +1
    const ny = (e.clientY - cy) / (rect.height / 2);  // -1 to +1
    rawY.set(nx * maxTilt);    // tilt left/right → rotateY
    rawX.set(-ny * maxTilt);   // tilt up/down   → rotateX (inverted for natural feel)
  }, [rawX, rawY, maxTilt]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return {
    ref,
    rotateX,
    rotateY,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}
