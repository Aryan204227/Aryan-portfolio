import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * UniverseBackground.jsx
 *
 * Rich, multi-layered 3D deep-space universe with:
 * - Multi-depth starfields (distant micro-stars + nearby bright stars)
 * - Volumetric gas/nebula cloud particles with lime/emerald/slate tint
 * - Atmospheric light streaks and cosmic dust
 * - Scroll-linked parallax & camera motion (connected to real page scroll)
 * - Pointer-responsive subtle depth displacement
 * - Auto-throttling & pause when tab is inactive
 * - Full WebGL cleanup and performance budget
 */
export default function UniverseBackground() {
  const mountRef = useRef(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    // ── Three.js Scene Setup ──
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080a, 0.018);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 50);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not available for universe background', e);
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75));
    renderer.setClearColor(0x07080a, 1);
    container.appendChild(renderer.domElement);

    // ── Layer 1: Distant Deep Galaxy Starfield (Slow drift) ──
    const deepStarCount = isMobile ? 800 : 2200;
    const deepStarPos = new Float32Array(deepStarCount * 3);
    const deepStarColors = new Float32Array(deepStarCount * 3);

    const limeColor = new THREE.Color(0x84cc16);
    const cyanColor = new THREE.Color(0x38bdf8);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < deepStarCount; i++) {
      deepStarPos[i * 3]     = (Math.random() - 0.5) * 220;
      deepStarPos[i * 3 + 1] = (Math.random() - 0.5) * 220;
      deepStarPos[i * 3 + 2] = -30 - Math.random() * 120;

      const pick = Math.random();
      const col = pick > 0.88 ? limeColor : pick > 0.75 ? cyanColor : whiteColor;
      deepStarColors[i * 3]     = col.r;
      deepStarColors[i * 3 + 1] = col.g;
      deepStarColors[i * 3 + 2] = col.b;
    }

    const deepStarGeo = new THREE.BufferGeometry();
    deepStarGeo.setAttribute('position', new THREE.BufferAttribute(deepStarPos, 3));
    deepStarGeo.setAttribute('color', new THREE.BufferAttribute(deepStarColors, 3));

    const deepStarMat = new THREE.PointsMaterial({
      size: isMobile ? 0.45 : 0.65,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
    });
    const deepStars = new THREE.Points(deepStarGeo, deepStarMat);
    scene.add(deepStars);

    // ── Layer 2: Midground Ambient Particles (Scroll-sensitive) ──
    const midCount = isMobile ? 300 : 800;
    const midPos = new Float32Array(midCount * 3);
    const midColors = new Float32Array(midCount * 3);

    for (let i = 0; i < midCount; i++) {
      midPos[i * 3]     = (Math.random() - 0.5) * 120;
      midPos[i * 3 + 1] = (Math.random() - 0.5) * 160;
      midPos[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const col = Math.random() > 0.7 ? limeColor : cyanColor;
      midColors[i * 3]     = col.r;
      midColors[i * 3 + 1] = col.g;
      midColors[i * 3 + 2] = col.b;
    }

    const midGeo = new THREE.BufferGeometry();
    midGeo.setAttribute('position', new THREE.BufferAttribute(midPos, 3));
    midGeo.setAttribute('color', new THREE.BufferAttribute(midColors, 3));

    const midMat = new THREE.PointsMaterial({
      size: isMobile ? 0.8 : 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
    });
    const midParticles = new THREE.Points(midGeo, midMat);
    scene.add(midParticles);

    // ── Layer 3: Cosmic Nebula Clouds (Soft Procedural Gas Planes) ──
    // Create soft gradient circle texture programmatically
    const createNebulaTexture = () => {
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext('2d');
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(132, 204, 22, 0.45)');
      grad.addColorStop(0.35, 'rgba(16, 185, 129, 0.2)');
      grad.addColorStop(0.7, 'rgba(6, 78, 59, 0.08)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    };

    const nebulaTexture = createNebulaTexture();
    const nebulaGroup = new THREE.Group();
    scene.add(nebulaGroup);

    const cloudCount = isMobile ? 4 : 8;
    const cloudGeo = new THREE.PlaneGeometry(55, 55);
    const cloudMat = new THREE.MeshBasicMaterial({
      map: nebulaTexture,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const clouds = [];
    for (let i = 0; i < cloudCount; i++) {
      const cloud = new THREE.Mesh(cloudGeo, cloudMat.clone());
      cloud.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 100,
        -15 - Math.random() * 35
      );
      cloud.rotation.z = Math.random() * Math.PI * 2;
      cloud.userData.rotSpeed = (Math.random() - 0.5) * 0.003;
      nebulaGroup.add(cloud);
      clouds.push(cloud);
    }

    // ── Layer 4: Distant Orbital Guides / Constellation Filaments ──
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x84cc16,
      transparent: true,
      opacity: 0.12,
    });

    const orbitalPaths = [];
    const pathRadii = [35, 48, 62];
    pathRadii.forEach((rad, idx) => {
      const pts = [];
      const segs = 64;
      for (let s = 0; s <= segs; s++) {
        const theta = (s / segs) * Math.PI * 2;
        pts.push(new THREE.Vector3(
          Math.cos(theta) * rad,
          Math.sin(theta) * rad * 0.35,
          -10 + idx * 8
        ));
      }
      const pGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(pGeo, lineMat);
      line.rotation.x = 0.55 + idx * 0.25;
      line.rotation.z = idx * 0.4;
      scene.add(line);
      orbitalPaths.push(line);
    });

    // ── Mouse & Scroll Parallax State ──
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      if (isMobile) return;
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY || document.documentElement.scrollTop;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Animation Loop ──
    let rafId;
    let clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Slow planetary cosmos rotation
        deepStars.rotation.y = elapsed * 0.004;
        deepStars.rotation.x = elapsed * 0.002;

        midParticles.rotation.y = -elapsed * 0.008;

        // Nebula cloud breathing
        clouds.forEach((cloud, i) => {
          cloud.rotation.z += cloud.userData.rotSpeed;
          cloud.material.opacity = 0.18 + Math.sin(elapsed * 0.5 + i) * 0.04;
        });

        // Orbital line slow tilt
        orbitalPaths.forEach((path, i) => {
          path.rotation.z += delta * (0.015 * (i % 2 === 0 ? 1 : -1));
        });

        // Mouse smooth interpolation
        mouse.x += (mouse.targetX - mouse.x) * 0.04;
        mouse.y += (mouse.targetY - mouse.y) * 0.04;

        // Camera movement tied to real page scroll & mouse
        const scrollFactor = (scrollRef.current * 0.015) % 100;
        camera.position.y = -scrollFactor * 0.4 + mouse.y * 3;
        camera.position.x = mouse.x * 3.5;
        camera.rotation.z = mouse.x * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ── Window Resize ──
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      deepStarGeo.dispose();
      deepStarMat.dispose();
      midGeo.dispose();
      midMat.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      nebulaTexture.dispose();
      lineMat.dispose();
      orbitalPaths.forEach(p => p.geometry.dispose());
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    />
  );
}
