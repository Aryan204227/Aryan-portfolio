/**
 * MagneticButton.jsx
 * 
 * A premium magnetic-pull button component.
 * On hover, the button gently follows the cursor.
 * Disabled on mobile (touch) devices.
 * 
 * Props:
 *   - as: element type (default 'button')
 *   - href: if provided, renders as <a>
 *   - className, children, ...rest
 */
import React from 'react';
import { motion } from 'framer-motion';
import useMagneticHover from '../hooks/useMagneticHover';

export default function MagneticButton({
  as: Tag = 'button',
  href,
  className = '',
  children,
  strength = 0.28,
  ...rest
}) {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const { ref, x, y, handlers } = useMagneticHover({ strength: isMobile ? 0 : strength });

  const MotionTag = motion[href ? 'a' : Tag] ?? motion.button;

  return (
    <MotionTag
      ref={ref}
      href={href}
      style={{ x: isMobile ? 0 : x, y: isMobile ? 0 : y }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
      {...(isMobile ? {} : handlers)}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
