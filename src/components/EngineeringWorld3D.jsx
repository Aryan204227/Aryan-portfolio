import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * EngineeringWorld3D.jsx
 *
 * Cinematic 3D Engineering / Computational World — inspired by the reference image.
 *
 * Scene architecture:
 * ─ Central Computational Core (glowing "AD" processor platform)
 * ─ 4 Corner Floating Sub-Platforms (independently bobbing)
 * ─ 8 Circuit Pathway Tubes (TubeGeometry, lime-green)
 * ─ 16 Light Runners (small spheres travelling along each circuit)
 * ─ 4 Holographic Panels (transparent planes near each platform)
 * ─ Geometric micro-structures (clusters of small cubes/pyramids)
 * ─ Ambient particle cloud (1 000+ points at multiple depths)
 * ─ Atmospheric lighting (ambient + strong lime point at core + cyan fill)
 * ─ Isometric-ish camera (25, 28, 25) looking at origin
 * ─ Slow continuous camera oscillation
 * ─ Scroll-linked camera zoom (pull back as user scrolls down)
 *
 * Resource hygiene:
 * ─ Full geometry / material / texture dispose on unmount
 * ─ Pauses RAF when tab is backgrounded
 * ─ Reduced-motion: disables movement, renders still scene
 * ─ WebGL check with graceful fallback
 * ─ Mobile: halved particle counts, disabled antialiasing, lower pixel ratio
 */
export default function EngineeringWorld3D() {
  const mountRef = useRef(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ── WebGL check ──
    try {
      const test = document.createElement('canvas');
      const gl = test.getContext('webgl') || test.getContext('experimental-webgl');
      if (!gl) return;
    } catch (_) {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75));
    renderer.setClearColor(0x07080a, 1);
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // ── Scene & Fog ──
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080a, 0.018);

    // ── Camera (isometric perspective) ──
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(38, aspect, 0.5, 400);
    camera.position.set(25, 30, 25);
    camera.lookAt(0, 0, 0);

    // ── Lights ──
    const ambientLight = new THREE.AmbientLight(0x091214, 1);
    scene.add(ambientLight);

    // Central core glow — strong lime-green
    const coreLight = new THREE.PointLight(0x84cc16, 30, 28);
    coreLight.position.set(0, 3, 0);
    scene.add(coreLight);

    // Cyan fill from upper-right
    const cyanLight = new THREE.PointLight(0x38bdf8, 8, 40);
    cyanLight.position.set(18, 20, -12);
    scene.add(cyanLight);

    // Atmospheric back fill
    const fillLight = new THREE.PointLight(0x1a3a20, 6, 50);
    fillLight.position.set(-20, 12, -18);
    scene.add(fillLight);

    // ── Helper: reusable materials ──
    const limeMat = new THREE.MeshStandardMaterial({
      color: 0x1a2a04,
      emissive: 0x84cc16,
      emissiveIntensity: 0.85,
      roughness: 0.35,
      metalness: 0.65,
    });

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x141820,
      roughness: 0.45,
      metalness: 0.85,
      envMapIntensity: 0.3,
    });

    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x0d1117,
      roughness: 0.6,
      metalness: 0.75,
    });

    const cyanMat = new THREE.MeshStandardMaterial({
      color: 0x0a2030,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.7,
      roughness: 0.3,
      metalness: 0.7,
    });

    const glassCircuitMat = new THREE.MeshBasicMaterial({
      color: 0x84cc16,
      transparent: true,
      opacity: 0.65,
    });

    const dimGlassMat = new THREE.MeshBasicMaterial({
      color: 0x84cc16,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });

    // Holographic panel material
    const panelMat = new THREE.MeshBasicMaterial({
      color: 0x84cc16,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
    });

    const panelEdgeMat = new THREE.MeshBasicMaterial({
      color: 0x84cc16,
      transparent: true,
      opacity: 0.55,
    });

    // ─────────────────────────────────────────────────
    // 1. CENTRAL COMPUTATIONAL PLATFORM
    // ─────────────────────────────────────────────────
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Base platform slab
    const baseGeo = new THREE.BoxGeometry(14, 0.35, 14);
    const base = new THREE.Mesh(baseGeo, platformMat);
    base.position.y = -0.175;
    coreGroup.add(base);

    // Base edges (circuit lines)
    const baseEdges = new THREE.EdgesGeometry(baseGeo);
    const baseLine = new THREE.LineSegments(baseEdges, glassCircuitMat);
    baseLine.position.y = -0.175;
    coreGroup.add(baseLine);

    // Inner raised plinth
    const plinthGeo = new THREE.BoxGeometry(6, 0.5, 6);
    const plinth = new THREE.Mesh(plinthGeo, darkMetalMat);
    plinth.position.y = 0.25;
    coreGroup.add(plinth);

    const plinthEdges = new THREE.EdgesGeometry(plinthGeo);
    const plinthLine = new THREE.LineSegments(plinthEdges, glassCircuitMat);
    plinthLine.position.y = 0.25;
    coreGroup.add(plinthLine);

    // Central CPU box (the "AD" processor)
    const cpuGeo = new THREE.BoxGeometry(3, 3, 3);
    const cpu = new THREE.Mesh(cpuGeo, limeMat.clone());
    cpu.position.y = 2;
    coreGroup.add(cpu);

    // CPU wireframe overlay
    const cpuEdges = new THREE.EdgesGeometry(cpuGeo);
    const cpuLine = new THREE.LineSegments(cpuEdges, glassCircuitMat);
    cpuLine.position.y = 2;
    coreGroup.add(cpuLine);

    // CPU inner glow shell (outer slightly larger back-side sphere)
    const cpuGlowGeo = new THREE.BoxGeometry(3.3, 3.3, 3.3);
    const cpuGlowMat = new THREE.MeshBasicMaterial({
      color: 0x84cc16,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const cpuGlow = new THREE.Mesh(cpuGlowGeo, cpuGlowMat);
    cpuGlow.position.y = 2;
    coreGroup.add(cpuGlow);

    // Small corner pillars on the CPU plinth
    const pillarGeo = new THREE.BoxGeometry(0.22, 1.2, 0.22);
    const pillarPositions = [
      [-2.5, 0.6, -2.5], [2.5, 0.6, -2.5],
      [-2.5, 0.6, 2.5],  [2.5, 0.6, 2.5],
    ];
    pillarPositions.forEach(([x, y, z]) => {
      const pillar = new THREE.Mesh(pillarGeo, darkMetalMat);
      pillar.position.set(x, y, z);
      coreGroup.add(pillar);
    });

    // ─────────────────────────────────────────────────
    // 2. CORNER FLOATING SUB-PLATFORMS
    // ─────────────────────────────────────────────────
    const PLATFORM_POSITIONS = [
      { x: -10, z: -10, label: 'About',    phase: 0,   bobAmp: 0.18 },
      { x:  10, z: -10, label: 'Skills',   phase: 1.6, bobAmp: 0.22 },
      { x: -10, z:  10, label: 'Projects', phase: 0.8, bobAmp: 0.16 },
      { x:  10, z:  10, label: 'Arch',     phase: 2.4, bobAmp: 0.20 },
    ];

    const subPlatforms = PLATFORM_POSITIONS.map(({ x, z, phase, bobAmp }) => {
      const group = new THREE.Group();
      group.position.set(x, 0, z);
      group.userData.phase = phase;
      group.userData.bobAmp = bobAmp;

      // Main platform slab
      const pGeo = new THREE.BoxGeometry(4.5, 0.28, 4.5);
      const p = new THREE.Mesh(pGeo, darkMetalMat);
      group.add(p);

      // Edge lines
      const pEdges = new THREE.EdgesGeometry(pGeo);
      const pLine = new THREE.LineSegments(pEdges, glassCircuitMat);
      group.add(pLine);

      // Small structure on top
      const topGeo = new THREE.BoxGeometry(1.5, 1.1, 1.5);
      const top = new THREE.Mesh(topGeo, cyanMat.clone());
      top.position.y = 0.7;
      group.add(top);

      const topEdges = new THREE.EdgesGeometry(topGeo);
      const topLine = new THREE.LineSegments(topEdges, new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 }));
      topLine.position.y = 0.7;
      group.add(topLine);

      // Holographic panel floating above
      const panelWidth = 3.5;
      const panelHeight = 2.2;
      const panel = new THREE.Mesh(
        new THREE.PlaneGeometry(panelWidth, panelHeight),
        panelMat.clone()
      );
      panel.position.set(0, 3.2, 0);
      panel.rotation.x = -0.25;
      group.add(panel);

      // Panel edge frame
      const edgeGeo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(panelWidth, panelHeight));
      const edgeLine = new THREE.LineSegments(edgeGeo, panelEdgeMat.clone());
      edgeLine.position.set(0, 3.2, 0);
      edgeLine.rotation.x = -0.25;
      group.add(edgeLine);

      scene.add(group);
      return group;
    });

    // ─────────────────────────────────────────────────
    // 3. CIRCUIT PATHWAYS
    // ─────────────────────────────────────────────────
    const circuitMat = new THREE.MeshBasicMaterial({
      color: 0x84cc16,
      transparent: true,
      opacity: 0.55,
    });

    const corePos = new THREE.Vector3(0, 0.35, 0);
    const curves = [];

    PLATFORM_POSITIONS.forEach(({ x, z }) => {
      const pTarget = new THREE.Vector3(x, 0, z);
      const mid1 = new THREE.Vector3(x * 0.35, 0.4, z * 0.15);
      const mid2 = new THREE.Vector3(x * 0.65, 0.4, z * 0.7);

      const curve = new THREE.CatmullRomCurve3([corePos, mid1, mid2, pTarget]);
      curves.push(curve);

      const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.05, 5, false);
      const tube = new THREE.Mesh(tubeGeo, circuitMat);
      scene.add(tube);
    });

    // ─────────────────────────────────────────────────
    // 4. LIGHT RUNNERS (animated spheres along circuits)
    // ─────────────────────────────────────────────────
    const runnerGeo = new THREE.SphereGeometry(0.14, 8, 8);
    const runners = [];

    curves.forEach((curve, ci) => {
      // 2 runners per circuit at different phases
      [0, 0.5].forEach((phaseOffset, ri) => {
        const runnerMat = new THREE.MeshBasicMaterial({
          color: ri === 0 ? 0x84cc16 : 0x38bdf8,
          transparent: true,
          opacity: 0.95,
        });
        const runner = new THREE.Mesh(runnerGeo, runnerMat);
        runner.userData = {
          curve,
          speed: 0.14 + ci * 0.02,
          t: phaseOffset,
        };
        scene.add(runner);
        runners.push(runner);
      });
    });

    // ─────────────────────────────────────────────────
    // 5. AMBIENT PARTICLE CLOUD
    // ─────────────────────────────────────────────────
    const particleCount = isMobile ? 600 : 1400;
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    const limeC = new THREE.Color(0x84cc16);
    const cyanC = new THREE.Color(0x38bdf8);
    const whiteC = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3]     = (Math.random() - 0.5) * 80;
      pPositions[i * 3 + 1] = -4 + Math.random() * 22;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const pick = Math.random();
      const col = pick > 0.8 ? limeC : pick > 0.6 ? cyanC : whiteC;
      pColors[i * 3]     = col.r;
      pColors[i * 3 + 1] = col.g;
      pColors[i * 3 + 2] = col.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.18 : 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ─────────────────────────────────────────────────
    // 6. MICRO-STRUCTURE DETAILS (scattered cubes)
    // ─────────────────────────────────────────────────
    const microGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const microEdgeGeo = new THREE.EdgesGeometry(microGeo);
    const microEdgeMat = new THREE.LineBasicMaterial({
      color: 0x84cc16,
      transparent: true,
      opacity: 0.45,
    });

    const microPositions = [
      [-7, 1.0, 0], [7, 1.0, 0], [0, 1.0, -7], [0, 1.0, 7],
      [-5, 0.5, 5], [5, 0.5, -5], [-5, 0.5, -5], [5, 0.5, 5],
    ];

    const microStructures = [];
    microPositions.forEach(([mx, my, mz]) => {
      const micro = new THREE.LineSegments(microEdgeGeo, microEdgeMat.clone());
      micro.position.set(mx, my, mz);
      micro.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      micro.userData.rotSpeed = {
        x: (Math.random() - 0.5) * 0.012,
        y: (Math.random() - 0.5) * 0.018,
        z: (Math.random() - 0.5) * 0.01,
      };
      scene.add(micro);
      microStructures.push(micro);
    });

    // ─────────────────────────────────────────────────
    // 7. SCROLL SYNCHRONIZATION
    // ─────────────────────────────────────────────────
    const handleScroll = () => {
      scrollRef.current = window.scrollY || document.documentElement.scrollTop;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ─────────────────────────────────────────────────
    // 8. MOUSE PARALLAX (desktop)
    // ─────────────────────────────────────────────────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const handleMouseMove = (e) => {
      if (isMobile) return;
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ─────────────────────────────────────────────────
    // 9. ANIMATION LOOP
    // ─────────────────────────────────────────────────
    let rafId;
    const clock = new THREE.Clock();
    // Camera base polar angles
    const CAM_BASE_RADIUS = Math.sqrt(25 * 25 + 25 * 25 + 30 * 30);
    const CAM_BASE_THETA = Math.atan2(25, 25);
    const CAM_BASE_PHI = Math.acos(30 / CAM_BASE_RADIUS);

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (document.hidden) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Central CPU rotation
        cpu.rotation.y += delta * 0.12;
        cpuLine.rotation.y = cpu.rotation.y;
        cpuGlow.rotation.y = -cpu.rotation.y * 0.5;

        // Pulse core light
        coreLight.intensity = 22 + Math.sin(elapsed * 2.2) * 8;

        // Sub-platform bobbing (independent)
        subPlatforms.forEach((platform, i) => {
          const { phase, bobAmp } = platform.userData;
          platform.position.y = Math.sin(elapsed * 0.8 + phase) * bobAmp;
        });

        // Animate light runners along circuits
        runners.forEach(runner => {
          runner.userData.t += delta * runner.userData.speed;
          if (runner.userData.t > 1) runner.userData.t -= 1;
          const pt = runner.userData.curve.getPoint(runner.userData.t);
          runner.position.copy(pt);
          runner.position.y += 0.35; // slight lift
        });

        // Micro-structures slow rotation
        microStructures.forEach(m => {
          m.rotation.x += delta * m.userData.rotSpeed.x;
          m.rotation.y += delta * m.userData.rotSpeed.y;
          m.rotation.z += delta * m.userData.rotSpeed.z;
        });

        // Particle slow drift
        particles.rotation.y += delta * 0.006;
        particles.rotation.x += delta * 0.002;

        // Camera smooth oscillation + mouse parallax + scroll pull-back
        mouse.x += (mouse.tx - mouse.x) * 0.03;
        mouse.y += (mouse.ty - mouse.y) * 0.03;

        const scrollFactor = scrollRef.current * 0.0015;
        const pullBack = Math.min(scrollFactor * 14, 18); // max 18 units back
        const oscX = Math.cos(elapsed * 0.12) * 1.5;
        const oscZ = Math.sin(elapsed * 0.12) * 1.5;

        const camX = 25 + oscX + mouse.x * 3 + pullBack * 0.5;
        const camY = 30 - mouse.y * 2 - scrollFactor * 5;
        const camZ = 25 + oscZ + pullBack;

        camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.028);
        camera.lookAt(0, 1.5, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // ─────────────────────────────────────────────────
    // 10. RESIZE
    // ─────────────────────────────────────────────────
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // ─────────────────────────────────────────────────
    // 11. CLEANUP
    // ─────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      // Dispose all geometries
      [baseGeo, plinthGeo, cpuGeo, cpuGlowGeo, pillarGeo,
       runnerGeo, microGeo, microEdgeGeo, particleGeo].forEach(g => g.dispose());

      // Dispose all materials
      [limeMat, darkMetalMat, platformMat, cyanMat,
       glassCircuitMat, dimGlassMat, panelMat, panelEdgeMat,
       circuitMat, particleMat, cpuGlowMat].forEach(m => m.dispose());

      // Dispose sub-platform geo & mats
      subPlatforms.forEach(sp => {
        sp.children.forEach(child => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      });

      runners.forEach(r => {
        if (r.material) r.material.dispose();
      });

      microStructures.forEach(m => {
        if (m.material) m.material.dispose();
      });

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
