import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * UniversePlanet.jsx
 *
 * A cinematic Three.js 3D planet for the hero section.
 * Features:
 * - Sphere with phong shading + neon lime-green rim lighting
 * - Wireframe overlay layer for technical aesthetic
 * - Multiple inclined orbital rings (TorusGeometry)
 * - Dense starfield particle cloud
 * - Orbiting geometric fragments (icosahedra + octahedra)
 * - Pointer-responsive parallax on desktop
 * - Pauses when off-screen via IntersectionObserver
 * - Graceful WebGL fallback (glowing CSS circle)
 * - Respects prefers-reduced-motion
 */
export default function UniversePlanet({ className = '' }) {
  const mountRef = useRef(null);
  const isVisibleRef = useRef(true);
  const webglSupported = useRef(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ── WebGL capability check ──
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) { webglSupported.current = false; return; }
    } catch (_) {
      webglSupported.current = false;
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    const w = container.clientWidth || 480;
    const h = container.clientHeight || 480;

    // ── Scene ──
    const scene = new THREE.Scene();

    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 200);
    camera.position.set(0, 0, 6.5);

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // ── Lighting ──
    const ambient = new THREE.AmbientLight(0xffffff, 0.04);
    scene.add(ambient);

    // Primary rim light — neon lime-green, positioned left-back
    const rimLight = new THREE.PointLight(0x84cc16, 12, 30);
    rimLight.position.set(-4, 1.5, -2);
    scene.add(rimLight);

    // Secondary fill — cool cyan, right
    const fillLight = new THREE.PointLight(0x38bdf8, 3.5, 20);
    fillLight.position.set(4, -1, 2);
    scene.add(fillLight);

    // Faint top light for atmosphere
    const topLight = new THREE.DirectionalLight(0xffffff, 0.15);
    topLight.position.set(0, 5, 3);
    scene.add(topLight);

    // ── Planet Core ──
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    // Main sphere
    const sphereGeo = new THREE.SphereGeometry(1.75, 64, 64);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x0d1117,
      emissive: 0x050a05,
      shininess: 45,
      specular: new THREE.Color(0x84cc16).multiplyScalar(0.2),
      transparent: false,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    planetGroup.add(sphere);

    // Wireframe overlay — very subtle
    const wireGeo = new THREE.SphereGeometry(1.755, 22, 22);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x84cc16,
      wireframe: true,
      transparent: true,
      opacity: 0.045,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    planetGroup.add(wireMesh);

    // Rim glow shell — thin transparent sphere slightly larger
    const glowGeo = new THREE.SphereGeometry(1.82, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x84cc16,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    const glowShell = new THREE.Mesh(glowGeo, glowMat);
    planetGroup.add(glowShell);

    // ── Orbital Rings ──
    const ringData = [
      { radius: 2.55, tube: 0.008, inclineX: 0.4,  inclineZ: 0.1,  color: 0x84cc16, opacity: 0.55, speed: 0.12 },
      { radius: 2.95, tube: 0.005, inclineX: -0.6, inclineZ: 0.25, color: 0x84cc16, opacity: 0.35, speed: -0.09 },
      { radius: 3.4,  tube: 0.004, inclineX: 1.1,  inclineZ: -0.3, color: 0x38bdf8, opacity: 0.25, speed: 0.07  },
      { radius: 3.85, tube: 0.003, inclineX: -0.2, inclineZ: 0.7,  color: 0x84cc16, opacity: 0.18, speed: -0.05 },
    ];

    const rings = ringData.map(({ radius, tube, inclineX, inclineZ, color, opacity, speed }) => {
      const geo = new THREE.TorusGeometry(radius, tube, 8, 120);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = inclineX;
      mesh.rotation.z = inclineZ;
      mesh.userData.speed = speed;
      scene.add(mesh);
      return mesh;
    });

    // ── Starfield ──
    const starCount = isMobile ? 900 : 1800;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 18 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.06,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ── Orbiting Geometric Fragments ──
    const fragmentData = [
      { geo: new THREE.IcosahedronGeometry(0.08, 0), color: 0x84cc16, orbitR: 2.3, speed: 0.55, offsetAngle: 0,    incline: 0.4  },
      { geo: new THREE.OctahedronGeometry(0.065, 0), color: 0x38bdf8, orbitR: 2.7, speed: -0.4, offsetAngle: 1.2,  incline: -0.6 },
      { geo: new THREE.IcosahedronGeometry(0.06, 0), color: 0x84cc16, orbitR: 3.1, speed: 0.35, offsetAngle: 2.5,  incline: 1.0  },
      { geo: new THREE.OctahedronGeometry(0.055, 0), color: 0xffffff, orbitR: 2.5, speed: -0.28,offsetAngle: 4.0,  incline: -0.3 },
      { geo: new THREE.IcosahedronGeometry(0.05, 0), color: 0x84cc16, orbitR: 3.6, speed: 0.22, offsetAngle: 0.7,  incline: 0.75 },
      { geo: new THREE.OctahedronGeometry(0.045, 0), color: 0x38bdf8, orbitR: 2.2, speed: -0.18,offsetAngle: 3.3,  incline: -0.9 },
    ];

    const fragments = fragmentData.map(({ geo, color, orbitR, speed, offsetAngle, incline }) => {
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData = { orbitR, speed, offsetAngle, incline, angle: offsetAngle };
      scene.add(mesh);
      return mesh;
    });

    // ── Mouse Parallax ──
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const handleMouseMove = (e) => {
      if (isMobile) return;
      const rect = container.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ── IntersectionObserver pause ──
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // ── Animation ──
    let raf;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      const t = clock.getElapsedTime();
      const delta = clock.getDelta();

      if (!prefersReducedMotion) {
        // Planet slow rotation
        sphere.rotation.y = t * 0.06;
        wireMesh.rotation.y = t * 0.04;

        // Ring rotation
        rings.forEach(ring => {
          ring.rotation.y += delta * ring.userData.speed;
        });

        // Stars very slow drift
        stars.rotation.y = t * 0.005;

        // Mouse parallax — smooth damping
        mouse.x += (mouse.tx - mouse.x) * 0.04;
        mouse.y += (mouse.ty - mouse.y) * 0.04;
        scene.rotation.y = mouse.x * 0.18;
        scene.rotation.x = mouse.y * 0.12;

        // Orbiting fragments
        fragments.forEach(frag => {
          frag.userData.angle += delta * frag.userData.speed;
          const a = frag.userData.angle;
          const r = frag.userData.orbitR;
          const inc = frag.userData.incline;
          frag.position.set(
            r * Math.cos(a),
            r * Math.sin(a) * Math.sin(inc),
            r * Math.sin(a) * Math.cos(inc)
          );
          frag.rotation.x += delta * 0.8;
          frag.rotation.y += delta * 0.6;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // ── Resize ──
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth || 480;
      const nh = container.clientHeight || 480;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      // Dispose geometries & materials
      [sphereGeo, wireGeo, glowGeo, starGeo].forEach(g => g.dispose());
      [sphereMat, wireMat, glowMat, starMat].forEach(m => m.dispose());
      rings.forEach(r => { r.geometry.dispose(); r.material.dispose(); });
      fragments.forEach(f => { f.geometry.dispose(); f.material.dispose(); });
      fragmentData.forEach(fd => fd.geo.dispose());
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
      aria-hidden="true"
    >
      {/* Ambient lime glow beneath planet */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(132,204,22,0.12) 0%, rgba(132,204,22,0.04) 40%, transparent 70%)',
            filter: 'blur(32px)',
          }}
        />
      </div>
    </div>
  );
}
