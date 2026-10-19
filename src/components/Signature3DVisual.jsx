import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Signature3DVisual.jsx
 *
 * Lightweight, high-performance Three.js technical visual:
 * - Geometric software node lattice with glowing vertices and filament lines
 * - Lazy-initialized, throttled pixel ratio (max 1.75 for battery & GPU efficiency)
 * - Auto-pauses animation loop when scrolled out of viewport (IntersectionObserver)
 * - Responds smoothly to mouse movements with dampening
 * - Accessible: Respects prefers-reduced-motion
 */
export default function Signature3DVisual({ className = '' }) {
  const mountRef = useRef(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    // Accessibility check: reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 3. Central Wireframe Geometry (Icosahedron Software Node Core)
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x84cc16, // Electric lime
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Inner glowing polyhedral ring
    const innerGeo = new THREE.OctahedronGeometry(0.7, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Restrained cyan
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // 4. Point Cloud Nodes (Architecture Node Network)
    const particleCount = 48;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const lime = new THREE.Color(0x84cc16);
    const cyan = new THREE.Color(0x38bdf8);
    const white = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.35 + Math.random() * 0.4;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const pickColor = i % 3 === 0 ? lime : i % 3 === 1 ? cyan : white;
      colors[i * 3] = pickColor.r;
      colors[i * 3 + 1] = pickColor.g;
      colors[i * 3 + 2] = pickColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);

    // 5. Mouse Parallax Target
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = nx * 0.4;
      mouse.targetY = ny * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. Pause rendering when offscreen (IntersectionObserver)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 7. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const delta = clock.getDelta();

      if (!prefersReducedMotion) {
        // Continuous organic rotation
        coreMesh.rotation.y += delta * 0.18;
        coreMesh.rotation.x += delta * 0.09;

        innerMesh.rotation.y -= delta * 0.28;
        innerMesh.rotation.z += delta * 0.14;

        particleMesh.rotation.y += delta * 0.12;

        // Mouse dampening
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        scene.rotation.y = mouse.x * 0.6;
        scene.rotation.x = -mouse.y * 0.6;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 300;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Ambient electric lime glow behind 3D object */}
      <div className="absolute w-44 h-44 rounded-full bg-lime-500/10 blur-3xl pointer-events-none -z-10" />
    </div>
  );
}
