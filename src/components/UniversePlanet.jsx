import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * UniversePlanet.jsx
 *
 * Cinematic 3D Celestial Planet with visible, continuous rotation:
 * - Visibly rotating textured Phong/Standard surface with craters & surface flow
 * - High-contrast electric lime neon rim light + ambient atmosphere
 * - 4 Independent orbital rings rotating at varied speeds and opposite directions
 * - Constellation node lattice layer on the outer sphere
 * - 8 Orbiting geometric satellite fragments with independent planetary paths
 * - Floating cosmic dust halo encircling the planet
 * - Pointer-reactive parallax tilt with smooth damping
 * - Automatically throttles and disposes gracefully
 */
export default function UniversePlanet({ className = '' }) {
  const mountRef = useRef(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL capability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch (_) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    const w = container.clientWidth || 520;
    const h = container.clientHeight || 520;

    // ── Scene & Camera ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    // ── WebGL Renderer ──
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Lighting Setup ──
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x0f172a, 0.6);
    scene.add(ambientLight);

    // Intense neon lime rim light (top-left rear)
    const rimLight = new THREE.PointLight(0x84cc16, 18, 25);
    rimLight.position.set(-5, 2.5, -2);
    scene.add(rimLight);

    // Key light (cool cyan front-right)
    const keyLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    keyLight.position.set(4, 3, 4);
    scene.add(keyLight);

    // Fill light (deep emerald under-glow)
    const fillLight = new THREE.PointLight(0x10b981, 6, 20);
    fillLight.position.set(2, -4, 1);
    scene.add(fillLight);

    // ── Planet Body ──
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    // Generate procedural surface texture for clear visual rotation cues
    const createPlanetTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Base dark graphite
      ctx.fillStyle = '#0a0d14';
      ctx.fillRect(0, 0, 1024, 512);

      // Distinct topographic bands & craters
      ctx.fillStyle = '#141a29';
      for (let i = 0; i < 40; i++) {
        const y = Math.random() * 512;
        const h = Math.random() * 40 + 10;
        ctx.fillRect(0, y, 1024, h);
      }

      // Neon-green energy veins & fissures
      ctx.strokeStyle = 'rgba(132, 204, 22, 0.6)';
      ctx.lineWidth = 2.5;
      for (let i = 0; i < 18; i++) {
        ctx.beginPath();
        let sx = Math.random() * 1024;
        let sy = Math.random() * 512;
        ctx.moveTo(sx, sy);
        for (let j = 0; j < 6; j++) {
          sx += (Math.random() - 0.5) * 140;
          sy += (Math.random() - 0.5) * 80;
          ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      // Luminous surface node points
      for (let i = 0; i < 90; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const rad = Math.random() * 3 + 1;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? '#84cc16' : '#38bdf8';
        ctx.shadowColor = '#84cc16';
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      return new THREE.CanvasTexture(canvas);
    };

    const planetTexture = createPlanetTexture();
    planetTexture.wrapS = THREE.RepeatWrapping;
    planetTexture.wrapT = THREE.ClampToEdgeWrapping;

    // Main Sphere
    const sphereGeo = new THREE.SphereGeometry(1.85, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      map: planetTexture,
      roughness: 0.65,
      metalness: 0.35,
      emissive: 0x051a05,
      emissiveIntensity: 0.4,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    planetGroup.add(sphereMesh);

    // Technical geodesic lattice shell
    const latticeGeo = new THREE.IcosahedronGeometry(1.88, 2);
    const latticeMat = new THREE.MeshBasicMaterial({
      color: 0x84cc16,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const latticeMesh = new THREE.Mesh(latticeGeo, latticeMat);
    planetGroup.add(latticeMesh);

    // Glowing atmospheric rim halo
    const haloGeo = new THREE.SphereGeometry(1.98, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x84cc16,
      transparent: true,
      opacity: 0.09,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    planetGroup.add(haloMesh);

    // ── Independent Multi-Axis Orbital Rings ──
    const rings = [];
    const ringConfigs = [
      { radius: 2.65, tube: 0.012, inclineX: 0.55, inclineY: 0.1,  inclineZ: 0.2,  speed: 0.28, color: 0x84cc16, opacity: 0.75 },
      { radius: 3.10, tube: 0.008, inclineX: -0.65, inclineY: 0.3, inclineZ: -0.15, speed: -0.22, color: 0x38bdf8, opacity: 0.55 },
      { radius: 3.60, tube: 0.006, inclineX: 1.15, inclineY: -0.2, inclineZ: 0.4,  speed: 0.16, color: 0x84cc16, opacity: 0.40 },
      { radius: 4.15, tube: 0.004, inclineX: -0.35, inclineY: 0.5, inclineZ: -0.6, speed: -0.12, color: 0xa3e635, opacity: 0.30 },
    ];

    ringConfigs.forEach((cfg) => {
      const rGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 8, 128);
      const rMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
      });
      const rMesh = new THREE.Mesh(rGeo, rMat);
      rMesh.rotation.set(cfg.inclineX, cfg.inclineY, cfg.inclineZ);
      rMesh.userData = { speed: cfg.speed };
      scene.add(rMesh);
      rings.push(rMesh);
    });

    // ── Orbiting Geometric Satellites ──
    const satellites = [];
    const satConfigs = [
      { geo: new THREE.IcosahedronGeometry(0.09, 0), color: 0x84cc16, dist: 2.45, speed: 0.75, offset: 0,    tilt: 0.55 },
      { geo: new THREE.OctahedronGeometry(0.08, 0),  color: 0x38bdf8, dist: 2.85, speed: -0.60, offset: 1.8, tilt: -0.45 },
      { geo: new THREE.TetrahedronGeometry(0.07, 0), color: 0xffffff, dist: 3.25, speed: 0.45, offset: 3.4, tilt: 0.90 },
      { geo: new THREE.IcosahedronGeometry(0.06, 0), color: 0x84cc16, dist: 3.75, speed: -0.35, offset: 5.1, tilt: -0.80 },
    ];

    satConfigs.forEach((sc) => {
      const sMat = new THREE.MeshBasicMaterial({ color: sc.color, wireframe: true });
      const sMesh = new THREE.Mesh(sc.geo, sMat);
      sMesh.userData = { ...sc, currentAngle: sc.offset };
      scene.add(sMesh);
      satellites.push(sMesh);
    });

    // ── Planetary Particle Halo ──
    const haloParticleCount = isMobile ? 120 : 350;
    const haloPositions = new Float32Array(haloParticleCount * 3);
    const haloColors = new Float32Array(haloParticleCount * 3);

    for (let i = 0; i < haloParticleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.1 + Math.random() * 2.2;
      const height = (Math.random() - 0.5) * 1.6;

      haloPositions[i * 3]     = Math.cos(angle) * radius;
      haloPositions[i * 3 + 1] = height;
      haloPositions[i * 3 + 2] = Math.sin(angle) * radius;

      const c = Math.random() > 0.4 ? new THREE.Color(0x84cc16) : new THREE.Color(0x38bdf8);
      haloColors[i * 3]     = c.r;
      haloColors[i * 3 + 1] = c.g;
      haloColors[i * 3 + 2] = c.b;
    }

    const haloPGeo = new THREE.BufferGeometry();
    haloPGeo.setAttribute('position', new THREE.BufferAttribute(haloPositions, 3));
    haloPGeo.setAttribute('color', new THREE.BufferAttribute(haloColors, 3));

    const haloPMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const haloParticles = new THREE.Points(haloPGeo, haloPMat);
    scene.add(haloParticles);

    // ── Pointer Parallax ──
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const handleMouseMove = (e) => {
      if (isMobile) return;
      const rect = container.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ── Intersection Observer ──
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // ── Active Animation Loop ──
    let rafId;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Continuous, visible planet rotation (cycle ~28s)
        sphereMesh.rotation.y += delta * 0.22;
        latticeMesh.rotation.y += delta * 0.18;
        latticeMesh.rotation.x += delta * 0.05;

        // Independent multi-speed ring rotations
        rings.forEach((ring) => {
          ring.rotation.z += delta * ring.userData.speed;
        });

        // Orbiting satellites
        satellites.forEach((sat) => {
          sat.userData.currentAngle += delta * sat.userData.speed;
          const a = sat.userData.currentAngle;
          const d = sat.userData.dist;
          const t = sat.userData.tilt;
          sat.position.set(
            Math.cos(a) * d,
            Math.sin(a) * d * Math.sin(t),
            Math.sin(a) * d * Math.cos(t)
          );
          sat.rotation.x += delta * 1.5;
          sat.rotation.y += delta * 1.8;
        });

        // Particle halo slow drift
        haloParticles.rotation.y += delta * 0.12;

        // Mouse orientation dampening
        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;

        planetGroup.rotation.y = mouse.x * 0.35;
        planetGroup.rotation.x = -mouse.y * 0.25;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ── Resize ──
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth || 520;
      const nh = container.clientHeight || 520;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      sphereGeo.dispose();
      sphereMat.dispose();
      planetTexture.dispose();
      latticeGeo.dispose();
      latticeMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      rings.forEach(r => { r.geometry.dispose(); r.material.dispose(); });
      satellites.forEach(s => { s.geometry.dispose(); s.material.dispose(); });
      haloPGeo.dispose();
      haloPMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full flex items-center justify-center select-none ${className}`}
      aria-label="3D Interactive Universe Planet"
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div
          className="w-72 sm:w-96 h-72 sm:h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(132, 204, 22, 0.18) 0%, rgba(56, 189, 248, 0.06) 45%, transparent 75%)',
            filter: 'blur(40px)',
          }}
        />
      </div>
    </div>
  );
}
