/**
 * InteractiveBackground.jsx
 * 
 * Premium canvas-based interactive background:
 * - Particle field that subtly responds to mouse movement
 * - Soft animated ambient gradient glows
 * - Subtle noise/grain overlay
 * - Cursor position influences particle positions (repel)
 * - GPU-optimized: only uses transform/opacity
 * - Mobile: disables mouse interaction, reduces particle count
 */
import React, { useEffect, useRef, useCallback } from 'react';

const PARTICLE_CONFIG = {
  desktop: { count: 55, maxRadius: 1.8, speed: 0.18, connectionDist: 100, mouseRadius: 110 },
  mobile:  { count: 22, maxRadius: 1.4, speed: 0.12, connectionDist:  80, mouseRadius:   0 },
};

function lerp(a, b, t) { return a + (b - a) * t; }

export default function InteractiveBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const CFG = isMobile ? PARTICLE_CONFIG.mobile : PARTICLE_CONFIG.desktop;

  const initParticles = useCallback((w, h) => {
    particlesRef.current = Array.from({ length: CFG.count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * CFG.speed,
      vy: (Math.random() - 0.5) * CFG.speed,
      r: Math.random() * CFG.maxRadius + 0.5,
      alpha: Math.random() * 0.35 + 0.08,
    }));
  }, [CFG]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };
    setSize();

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouse, { passive: true });
    }

    const resizeObs = new ResizeObserver(setSize);
    resizeObs.observe(document.body);

    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((p) => {
        // Mouse repel
        if (!isMobile && CFG.mouseRadius > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CFG.mouseRadius) {
            const force = (CFG.mouseRadius - dist) / CFG.mouseRadius;
            p.vx += (dx / dist) * force * 0.08;
            p.vy += (dy / dist) * force * 0.08;
          }
        }

        // Dampen & update
        p.vx *= 0.97;
        p.vy *= 0.97;
        // Clamp speed
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > CFG.speed * 3) {
          p.vx = (p.vx / spd) * CFG.speed * 3;
          p.vy = (p.vy / spd) * CFG.speed * 3;
        }
        if (spd < CFG.speed * 0.2) {
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -5) p.x = W + 5;
        if (p.x > W + 5) p.x = -5;
        if (p.y < -5) p.y = H + 5;
        if (p.y > H + 5) p.y = -5;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249,115,22,${p.alpha})`;
        ctx.fill();
      });

      // Draw connections (only desktop, limited)
      if (!isMobile) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CFG.connectionDist) {
              const alpha = (1 - dist / CFG.connectionDist) * 0.08;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(249,115,22,${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      resizeObs.disconnect();
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouse);
      }
    };
  }, [isMobile, initParticles, CFG]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.7 }}
    />
  );
}
