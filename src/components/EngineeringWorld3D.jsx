import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * EngineeringWorld3D.jsx — Authentic Isometric 3D Engineering Environment
 *
 * Visually faithful to the reference design:
 * ─ Solid, physically-rich hardware geometry with metallic shaders, bevels & heatsinks
 * ─ Multi-tiered central "AD" CPU Processor package with illuminated silicon die
 * ─ Strictly orthogonal (Manhattan) motherboard bus traces with gold pads & SMD chips
 * ─ 3D physical conduit pipes connecting core to peripheral computing modules
 * ─ 20+ illuminated light runners streaming continuously along data pathways
 * ─ Suspended transparent holographic HUD panels (About, Skills, Projects, Architecture, Contact)
 * ─ Floating data cube cages with rotating inner chips
 * ─ Coordinated scroll-driven camera choreography interpolating smoothly between sectors
 * ─ Mouse pointer parallax for physical depth
 * ─ 100% genuine 3D objects — NO hollow wireframe skyscrapers, NO random diagonal lines
 */

function createCpuDieTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep obsidian carbon background
  ctx.fillStyle = '#060a08';
  ctx.fillRect(0, 0, 512, 512);

  // Concentric metallic circuit border rings
  ctx.strokeStyle = '#84cc16';
  ctx.lineWidth = 5;
  ctx.strokeRect(18, 18, 476, 476);

  ctx.strokeStyle = 'rgba(132, 204, 22, 0.45)';
  ctx.lineWidth = 2;
  ctx.strokeRect(32, 32, 448, 448);
  ctx.strokeRect(46, 46, 420, 420);

  // Corner HUD alignment brackets
  ctx.strokeStyle = '#a3e635';
  ctx.lineWidth = 8;
  const b = 36;
  ctx.beginPath();
  ctx.moveTo(18, 18 + b); ctx.lineTo(18, 18); ctx.lineTo(18 + b, 18);
  ctx.moveTo(494 - b, 18); ctx.lineTo(494, 18); ctx.lineTo(494, 18 + b);
  ctx.moveTo(18, 494 - b); ctx.lineTo(18, 494); ctx.lineTo(18 + b, 494);
  ctx.moveTo(494 - b, 494); ctx.lineTo(494, 494); ctx.lineTo(494, 494 - b);
  ctx.stroke();

  // Fine orthogonal silicon traces
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(132, 204, 22, 0.4)';
  for (let y = 72; y <= 440; y += 28) {
    ctx.beginPath();
    ctx.moveTo(56, y); ctx.lineTo(136, y);
    ctx.moveTo(376, y); ctx.lineTo(456, y);
    ctx.stroke();
  }

  // Silicon Core Die Center Container
  ctx.fillStyle = '#0a1a0d';
  ctx.fillRect(136, 136, 240, 240);
  ctx.strokeStyle = '#84cc16';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(136, 136, 240, 240);

  // "AD" Monogram
  ctx.fillStyle = '#84cc16';
  ctx.font = '900 115px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#84cc16';
  ctx.shadowBlur = 24;
  ctx.fillText('AD', 256, 246);
  ctx.shadowBlur = 0;

  // Silicon Core Label
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 12px "JetBrains Mono", monospace';
  ctx.letterSpacing = '3px';
  ctx.fillText('COMPUTATIONAL CORE', 256, 332);

  ctx.fillStyle = '#84cc16';
  ctx.font = '600 10px "JetBrains Mono", monospace';
  ctx.fillText('ARYAN DADWAL', 256, 350);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  return texture;
}

function createHudPanelTexture(title, number, items = []) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 290;
  const ctx = canvas.getContext('2d');

  // Dark green tinted glass surface
  ctx.fillStyle = 'rgba(7, 14, 10, 0.92)';
  ctx.fillRect(0, 0, 512, 290);

  // Border frame
  ctx.strokeStyle = '#84cc16';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(8, 8, 496, 274);

  // Corner brackets
  ctx.strokeStyle = '#a3e635';
  ctx.lineWidth = 6;
  const b = 24;
  ctx.beginPath();
  ctx.moveTo(8, 8 + b); ctx.lineTo(8, 8); ctx.lineTo(8 + b, 8);
  ctx.moveTo(504 - b, 8); ctx.lineTo(504, 8); ctx.lineTo(504, 8 + b);
  ctx.moveTo(8, 282 - b); ctx.lineTo(8, 282); ctx.lineTo(8 + b, 282);
  ctx.moveTo(504 - b, 282); ctx.lineTo(504, 282); ctx.lineTo(504, 282 - b);
  ctx.stroke();

  // Number and Title
  ctx.fillStyle = '#84cc16';
  ctx.font = '700 14px "JetBrains Mono", monospace';
  ctx.fillText(number, 24, 38);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(title, 24, 68);

  // Divider
  ctx.strokeStyle = 'rgba(132, 204, 22, 0.35)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(24, 80); ctx.lineTo(488, 80);
  ctx.stroke();

  // Metadata chips
  let y = 118;
  items.forEach((item) => {
    ctx.fillStyle = 'rgba(132, 204, 22, 0.12)';
    ctx.fillRect(24, y - 14, 464, 26);
    ctx.strokeStyle = 'rgba(132, 204, 22, 0.28)';
    ctx.strokeRect(24, y - 14, 464, 26);

    ctx.fillStyle = '#84cc16';
    ctx.font = '700 12px "JetBrains Mono", monospace';
    ctx.fillText('◈ ' + item, 36, y + 4);
    y += 36;
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  return texture;
}

export default function EngineeringWorld3D() {
  const mountRef = useRef(null);
  const scrollRatioRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // WebGL check
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

    // ── RENDERER ──
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75));
    renderer.setClearColor(0x040608, 1);
    container.appendChild(renderer.domElement);

    // ── SCENE & FOG ──
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040608, 0.012);

    // ── CAMERA (Elevated Isometric Perspective) ──
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(36, aspect, 0.5, 500);
    // Base position frames central core on center-right, hero typography on left
    const baseCamPos = new THREE.Vector3(26, 32, 26);
    const baseLookAt = new THREE.Vector3(2, 2, 0);
    camera.position.copy(baseCamPos);
    camera.lookAt(baseLookAt);

    // ── ATMOSPHERIC & KEY LIGHTING ──
    const ambientLight = new THREE.AmbientLight(0x0a1410, 1.2);
    scene.add(ambientLight);

    // Core point light (pulsing neon-lime)
    const coreLight = new THREE.PointLight(0x84cc16, 26, 38);
    coreLight.position.set(0, 3.8, 0);
    scene.add(coreLight);

    // Key directional light reflecting off metallic bevels
    const keyDirLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    keyDirLight.position.set(22, 34, -16);
    scene.add(keyDirLight);

    // Warm lime directional fill from opposite side
    const fillDirLight = new THREE.DirectionalLight(0x84cc16, 1.2);
    fillDirLight.position.set(-22, 28, 22);
    scene.add(fillDirLight);

    // Deep underglow
    const underLight = new THREE.PointLight(0x132a18, 10, 50);
    underLight.position.set(0, -6, 0);
    scene.add(underLight);

    // ── SOLID PHYSICAL MATERIALS ──
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x0c1117,
      roughness: 0.32,
      metalness: 0.86,
    });

    const heatsinkMat = new THREE.MeshStandardMaterial({
      color: 0x161e2b,
      roughness: 0.22,
      metalness: 0.95,
    });

    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x121722,
      roughness: 0.4,
      metalness: 0.8,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.25,
      metalness: 0.95,
    });

    const siliconMat = new THREE.MeshStandardMaterial({
      color: 0x071609,
      emissive: 0x84cc16,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.85,
    });

    const conduitMat = new THREE.MeshStandardMaterial({
      color: 0x122415,
      emissive: 0x84cc16,
      emissiveIntensity: 0.9,
      roughness: 0.3,
      metalness: 0.7,
    });

    const runnerLimeMat = new THREE.MeshBasicMaterial({ color: 0xa3e635 });
    const runnerCyanMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    const lineMatLime = new THREE.LineBasicMaterial({
      color: 0x84cc16,
      transparent: true,
      opacity: 0.75,
    });

    const lineMatCyan = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
    });

    // ─────────────────────────────────────────────────────────────
    // 1. MOTHERBOARD FLOOR & ORTHOGONAL CIRCUIT TRACES
    // ─────────────────────────────────────────────────────────────
    // Solid dark motherboard slab
    const groundGeo = new THREE.BoxGeometry(64, 0.4, 64);
    const groundMesh = new THREE.Mesh(groundGeo, darkMetalMat);
    groundMesh.position.y = -0.2;
    scene.add(groundMesh);

    // Strictly orthogonal circuit trace network (Manhattan routing)
    const tracePoints = [];
    const traceCoords = [-24, -20, -16, -12, 12, 16, 20, 24];
    traceCoords.forEach((val) => {
      // Longitudinal traces with 90° bends
      tracePoints.push(new THREE.Vector3(val, 0.05, -28));
      tracePoints.push(new THREE.Vector3(val, 0.05, val * 0.4));

      tracePoints.push(new THREE.Vector3(val, 0.05, val * 0.4));
      tracePoints.push(new THREE.Vector3(Math.sign(val) * 28, 0.05, val * 0.4));

      // Latitudinal traces with 90° bends
      tracePoints.push(new THREE.Vector3(-28, 0.05, val));
      tracePoints.push(new THREE.Vector3(val * 0.4, 0.05, val));

      tracePoints.push(new THREE.Vector3(val * 0.4, 0.05, val));
      tracePoints.push(new THREE.Vector3(val * 0.4, 0.05, Math.sign(val) * 28));
    });
    const traceGeo = new THREE.BufferGeometry().setFromPoints(tracePoints);
    const traceLines = new THREE.LineSegments(traceGeo, lineMatLime);
    scene.add(traceLines);

    // Solid Gold Solder Pads & Surface-Mount (SMD) Components
    const padGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.08, 12);
    const padMesh = new THREE.InstancedMesh(padGeo, goldMat, 28);
    const smdGeo = new THREE.BoxGeometry(0.35, 0.18, 0.2);
    const smdMesh = new THREE.InstancedMesh(smdGeo, heatsinkMat, 28);

    const dummy = new THREE.Object3D();
    let padCount = 0;
    for (let px = -22; px <= 22; px += 7) {
      for (let pz = -22; pz <= 22; pz += 7) {
        if (Math.abs(px) < 6 && Math.abs(pz) < 6) continue;
        if (padCount < 28) {
          dummy.position.set(px, 0.04, pz);
          dummy.updateMatrix();
          padMesh.setMatrixAt(padCount, dummy.matrix);

          dummy.position.set(px + 0.5, 0.09, pz);
          dummy.updateMatrix();
          smdMesh.setMatrixAt(padCount, dummy.matrix);
          padCount++;
        }
      }
    }
    padMesh.instanceMatrix.needsUpdate = true;
    smdMesh.instanceMatrix.needsUpdate = true;
    scene.add(padMesh);
    scene.add(smdMesh);

    // ─────────────────────────────────────────────────────────────
    // 2. CENTRAL MULTI-TIER "AD" CPU PROCESSOR PACKAGE
    // ─────────────────────────────────────────────────────────────
    const cpuGroup = new THREE.Group();
    scene.add(cpuGroup);

    // Tier 1: Heavy Base Socket Frame (10.5 x 0.6 x 10.5)
    const socketGeo = new THREE.BoxGeometry(10.5, 0.6, 10.5);
    const socketMesh = new THREE.Mesh(socketGeo, darkMetalMat);
    socketMesh.position.y = 0.3;
    cpuGroup.add(socketMesh);

    // Gold Pin Contacts lining all 4 socket perimeter sides
    const pinGeo = new THREE.BoxGeometry(0.14, 0.25, 0.14);
    for (let i = -4.5; i <= 4.5; i += 0.5) {
      [-5.15, 5.15].forEach((edge) => {
        const pinA = new THREE.Mesh(pinGeo, goldMat);
        pinA.position.set(i, 0.22, edge);
        cpuGroup.add(pinA);

        const pinB = new THREE.Mesh(pinGeo, goldMat);
        pinB.position.set(edge, 0.22, i);
        cpuGroup.add(pinB);
      });
    }

    // Tier 2: Stepped Heat Spreader (8.2 x 0.7 x 8.2) with Solid Fins
    const spreaderGeo = new THREE.BoxGeometry(8.2, 0.7, 8.2);
    const spreaderMesh = new THREE.Mesh(spreaderGeo, heatsinkMat);
    spreaderMesh.position.y = 0.95;
    cpuGroup.add(spreaderMesh);

    // Solid Heatsink Louver Fins on Spreader Sides
    const finGeo = new THREE.BoxGeometry(7.8, 0.08, 0.15);
    for (let f = 0.7; f <= 1.2; f += 0.16) {
      [-4.05, 4.05].forEach((fz) => {
        const finZ = new THREE.Mesh(finGeo, heatsinkMat);
        finZ.position.set(0, f, fz);
        cpuGroup.add(finZ);
      });
    }

    // 4 Corner Solid Power Inductor Chokes
    const chokeGeo = new THREE.BoxGeometry(0.9, 1.4, 0.9);
    const chokePositions = [
      [-3.3, 1.3, -3.3], [3.3, 1.3, -3.3],
      [-3.3, 1.3, 3.3],  [3.3, 1.3, 3.3],
    ];
    chokePositions.forEach(([cx, cy, cz]) => {
      const choke = new THREE.Mesh(chokeGeo, chassisMat);
      choke.position.set(cx, cy, cz);
      cpuGroup.add(choke);

      // Glowing indicator ring atop choke
      const ringGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 12);
      const ringMesh = new THREE.Mesh(ringGeo, runnerLimeMat);
      ringMesh.position.set(cx, cy + 0.75, cz);
      cpuGroup.add(ringMesh);
    });

    // Tier 3: Silicon Core Die with Dynamic High-Res "AD" Canvas Texture
    const cpuDieTexture = createCpuDieTexture();
    const dieGeo = new THREE.BoxGeometry(5.6, 0.75, 5.6);
    const dieTopMat = new THREE.MeshBasicMaterial({ map: cpuDieTexture });
    const dieMaterials = [
      siliconMat, siliconMat,
      dieTopMat,  siliconMat,
      siliconMat, siliconMat,
    ];
    const dieMesh = new THREE.Mesh(dieGeo, dieMaterials);
    dieMesh.position.y = 1.68;
    cpuGroup.add(dieMesh);

    // Rotating Mechanical Perimeter Ring
    const mechRingGeo = new THREE.TorusGeometry(4.7, 0.07, 8, 48);
    const mechRingMesh = new THREE.Mesh(mechRingGeo, runnerLimeMat);
    mechRingMesh.rotation.x = Math.PI / 2;
    mechRingMesh.position.y = 1.68;
    cpuGroup.add(mechRingMesh);

    // ─────────────────────────────────────────────────────────────
    // 3. SOLID INTERCONNECTED COMPUTING PLATFORMS & TOWERS
    // ─────────────────────────────────────────────────────────────
    const modules = [
      // Sector 1: About Hardware Unit (Left Midground)
      { x: -12, z: -10, w: 5.0, h: 4.5, d: 5.0, name: 'AboutUnit' },
      // Sector 2: Skills Server Module (Right Midground)
      { x:  12, z: -11, w: 5.0, h: 5.0, d: 5.0, name: 'SkillsUnit' },
      // Sector 3: Projects Computational Node (Left Foreground)
      { x: -14, z:   8, w: 5.4, h: 5.2, d: 5.4, name: 'ProjectsUnit' },
      // Sector 4: Architecture Server Rack (Right Foreground)
      { x:  13, z:   9, w: 5.2, h: 5.6, d: 5.2, name: 'ArchUnit' },
      // Background Computing Skyline Blocks
      { x:  -7, z: -18, w: 4.2, h: 8.5, d: 4.2, name: 'Sky1' },
      { x:   7, z: -18, w: 4.2, h: 9.5, d: 4.2, name: 'Sky2' },
      { x:   0, z: -21, w: 5.5, h: 11.0, d: 5.5, name: 'SkyCenter' },
    ];

    const hardwareGroups = [];
    modules.forEach((mod) => {
      const group = new THREE.Group();
      group.position.set(mod.x, 0, mod.z);

      // Solid chassis block
      const bGeo = new THREE.BoxGeometry(mod.w, mod.h, mod.d);
      const bMesh = new THREE.Mesh(bGeo, chassisMat);
      bMesh.position.y = mod.h / 2;
      group.add(bMesh);

      // Stepped heatsink cap on top
      const capGeo = new THREE.BoxGeometry(mod.w * 0.8, 0.4, mod.d * 0.8);
      const capMesh = new THREE.Mesh(capGeo, heatsinkMat);
      capMesh.position.y = mod.h + 0.2;
      group.add(capMesh);

      // Horizontal solid server vent slots
      const numVents = Math.min(4, Math.floor(mod.h / 1.6));
      for (let v = 1; v <= numVents; v++) {
        const ventY = (mod.h / (numVents + 1)) * v;
        const ventGeo = new THREE.BoxGeometry(mod.w * 0.72, 0.1, mod.d + 0.04);
        const ventMesh = new THREE.Mesh(ventGeo, v % 2 === 0 ? runnerLimeMat : runnerCyanMat);
        ventMesh.position.y = ventY;
        group.add(ventMesh);
      }

      scene.add(group);
      hardwareGroups.push({ group, mod });
    });

    // ─────────────────────────────────────────────────────────────
    // 4. PHYSICAL 3D CONDUIT PIPES & CONTINUOUS LIGHT PULSES
    // ─────────────────────────────────────────────────────────────
    // Defined 3D curve paths connecting CPU to the 4 main hardware units
    const conduitCurves = [
      // To About platform
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-5.3, 0.8, -2.5),
        new THREE.Vector3(-8.5, 0.8, -2.5),
        new THREE.Vector3(-8.5, 1.2, -7.5),
        new THREE.Vector3(-11.5, 1.2, -7.5),
      ]),
      // To Skills platform
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(5.3, 0.8, -2.5),
        new THREE.Vector3(8.5, 0.8, -2.5),
        new THREE.Vector3(8.5, 1.2, -8.0),
        new THREE.Vector3(11.5, 1.2, -8.0),
      ]),
      // To Projects platform
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-5.3, 0.8, 2.5),
        new THREE.Vector3(-8.5, 0.8, 2.5),
        new THREE.Vector3(-8.5, 1.2, 6.5),
        new THREE.Vector3(-13.0, 1.2, 6.5),
      ]),
      // To Architecture platform
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(5.3, 0.8, 2.5),
        new THREE.Vector3(8.5, 0.8, 2.5),
        new THREE.Vector3(8.5, 1.2, 7.0),
        new THREE.Vector3(12.5, 1.2, 7.0),
      ]),
    ];

    // Build solid 3D conduit pipes
    const conduitGeos = [];
    conduitCurves.forEach((curve) => {
      const pipeGeo = new THREE.TubeGeometry(curve, 36, 0.09, 8, false);
      const pipeMesh = new THREE.Mesh(pipeGeo, conduitMat);
      scene.add(pipeMesh);
      conduitGeos.push(pipeGeo);
    });

    // Light Runner Packets (20 glowing packets streaming along paths)
    const runnerGeo = new THREE.SphereGeometry(0.2, 8, 8);
    const runners = [];
    const NUM_RUNNERS = isMobile ? 10 : 20;

    for (let r = 0; r < NUM_RUNNERS; r++) {
      const cIdx = r % conduitCurves.length;
      const isLime = r % 3 !== 0;
      const runner = new THREE.Mesh(runnerGeo, isLime ? runnerLimeMat : runnerCyanMat);
      scene.add(runner);

      runners.push({
        mesh: runner,
        curve: conduitCurves[cIdx],
        progress: r / NUM_RUNNERS,
        speed: 0.12 + (r % 4) * 0.03,
      });
    }

    // ─────────────────────────────────────────────────────────────
    // 5. SUSPENDED HOLOGRAPHIC 3D HUD PANELS
    // ─────────────────────────────────────────────────────────────
    const hudConfigs = [
      {
        title: 'ABOUT',
        number: '01',
        items: ['B.TECH CSE · LPU', 'CGPA: 7.07 (EXACT)', 'CLASS OF 2028'],
        x: -9.2, y: 7.2, z: -8.0, rotY: 0.35,
      },
      {
        title: 'SKILLS',
        number: '02',
        items: ['MERN STACK & REACT.JS', 'JAVA & DSA (DFS/RECURSION)', 'REST APIS & MONGODB'],
        x: 10.5, y: 7.8, z: -8.5, rotY: -0.38,
      },
      {
        title: 'PROJECTS',
        number: '03',
        items: ['CAREER GUIDANCE SYSTEM', 'STOCKSENSE AI', 'MAZE SOLVER (JAVA/DFS)'],
        x: -12.5, y: 8.2, z: 7.2, rotY: 0.42,
      },
      {
        title: 'ARCHITECTURE',
        number: '04',
        items: ['DECOUPLED REST TIERS', 'WEIGHTED-SUM SCORING', 'RENDER CLOUD CI/CD'],
        x: 11.8, y: 8.5, z: 7.8, rotY: -0.42,
      },
      {
        title: 'CONTACT',
        number: '05',
        items: ['ARYANDADWAL709@GMAIL.COM', '+91 8626963353', 'LINKEDIN & GITHUB'],
        x: 0, y: 7.0, z: 14.5, rotY: 0,
      },
    ];

    const hudPanels = [];
    const panelGeo = new THREE.PlaneGeometry(4.8, 2.7);
    const panelFrameGeo = new THREE.EdgesGeometry(panelGeo);

    hudConfigs.forEach((cfg, idx) => {
      const tex = createHudPanelTexture(cfg.title, cfg.number, cfg.items);
      const pMat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });
      const pMesh = new THREE.Mesh(panelGeo, pMat);
      pMesh.position.set(cfg.x, cfg.y, cfg.z);
      pMesh.rotation.y = cfg.rotY;
      pMesh.rotation.x = -0.16; // tilted slightly towards elevated camera

      const frameMesh = new THREE.LineSegments(panelFrameGeo, lineMatLime);
      pMesh.add(frameMesh);

      scene.add(pMesh);
      hudPanels.push({
        mesh: pMesh,
        texture: tex,
        material: pMat,
        baseY: cfg.y,
        phase: idx * 1.3,
      });
    });

    // ─────────────────────────────────────────────────────────────
    // 6. SOLID DATA CUBE CAGES WITH ROTATING CHIPS
    // ─────────────────────────────────────────────────────────────
    const cubeConfigs = [
      { x: -5, y: 4.8, z: -5, s: 1.2 },
      { x:  6, y: 5.5, z: -4, s: 1.4 },
      { x: -7, y: 6.2, z:  6, s: 1.3 },
      { x:  7, y: 5.8, z:  6, s: 1.1 },
    ];
    const dataCubes = [];
    cubeConfigs.forEach(({ x, y, z, s }, i) => {
      const group = new THREE.Group();
      group.position.set(x, y, z);

      // Solid outer bracket cage
      const cageGeo = new THREE.BoxGeometry(s, s, s);
      const cageEdges = new THREE.EdgesGeometry(cageGeo);
      const cageLine = new THREE.LineSegments(cageEdges, i % 2 === 0 ? lineMatLime : lineMatCyan);
      group.add(cageLine);

      // Solid inner chip
      const chipGeo = new THREE.BoxGeometry(s * 0.45, s * 0.45, s * 0.45);
      const chipMesh = new THREE.Mesh(chipGeo, i % 2 === 0 ? runnerLimeMat : runnerCyanMat);
      group.add(chipMesh);

      scene.add(group);
      dataCubes.push({
        group,
        baseY: y,
        phase: i * 1.5,
        rotSpeedX: 0.5 + i * 0.2,
        rotSpeedY: 0.7 + i * 0.15,
      });
    });

    // ─────────────────────────────────────────────────────────────
    // 7. AMBIENT DATA PARTICLES
    // ─────────────────────────────────────────────────────────────
    const pCount = isMobile ? 400 : 900;
    const pPositions = new Float32Array(pCount * 3);
    for (let p = 0; p < pCount; p++) {
      pPositions[p * 3]     = (Math.random() - 0.5) * 56;
      pPositions[p * 3 + 1] = Math.random() * 26 + 0.5;
      pPositions[p * 3 + 2] = (Math.random() - 0.5) * 56;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x84cc16,
      size: 0.12,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ─────────────────────────────────────────────────────────────
    // 8. COORDINATED SCROLL CHOREOGRAPHY & WAYPOINTS
    // ─────────────────────────────────────────────────────────────
    const WAYPOINTS = [
      { scroll: 0.00, pos: new THREE.Vector3(26, 32, 26), look: new THREE.Vector3(2, 2, 0) },    // Hero
      { scroll: 0.20, pos: new THREE.Vector3(18, 25, 20), look: new THREE.Vector3(-4, 3, -3) },  // About
      { scroll: 0.40, pos: new THREE.Vector3(22, 26, 16), look: new THREE.Vector3(5, 3, -4) },   // Skills
      { scroll: 0.60, pos: new THREE.Vector3(15, 22, 24), look: new THREE.Vector3(-5, 3, 4) },   // Projects
      { scroll: 0.80, pos: new THREE.Vector3(24, 27, 18), look: new THREE.Vector3(5, 3, 4) },    // Architecture
      { scroll: 1.00, pos: new THREE.Vector3(28, 34, 28), look: new THREE.Vector3(0, 2, 0) },    // Contact / End
    ];

    const currentCamPos = new THREE.Vector3().copy(baseCamPos);
    const currentLookAt = new THREE.Vector3().copy(baseLookAt);
    const targetCamPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollRatioRef.current = Math.min(1, Math.max(0, scrollY / maxScroll));
    };

    const handleMouseMove = (e) => {
      if (isMobile) return;
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ─────────────────────────────────────────────────────────────
    // 9. ANIMATION LOOP (INDEPENDENT CONTINUOUS MOTION)
    // ─────────────────────────────────────────────────────────────
    let rafId = null;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // 1. Core Pulsing & Mechanical Rotation
      if (!prefersReducedMotion) {
        mechRingMesh.rotation.z += delta * 0.45;
        coreLight.intensity = 22 + 8 * Math.sin(elapsed * 2.8);
        dieMesh.position.y = 1.68 + 0.035 * Math.sin(elapsed * 1.8);
      }

      // 2. Light Packets Moving Along Conduits
      if (!prefersReducedMotion) {
        runners.forEach((r) => {
          r.progress = (r.progress + delta * r.speed) % 1.0;
          const pos = r.curve.getPointAt(r.progress);
          r.mesh.position.copy(pos);
        });
      }

      // 3. Floating HUD Panels Sinusoidal Hovering
      if (!prefersReducedMotion) {
        hudPanels.forEach((p) => {
          p.mesh.position.y = p.baseY + Math.sin(elapsed * 1.5 + p.phase) * 0.22;
        });
      }

      // 4. Data Cube Cages Rotation & Floating
      if (!prefersReducedMotion) {
        dataCubes.forEach((c) => {
          c.group.rotation.x += delta * c.rotSpeedX;
          c.group.rotation.y += delta * c.rotSpeedY;
          c.group.position.y = c.baseY + Math.sin(elapsed * 1.4 + c.phase) * 0.28;
        });
      }

      // 5. Ambient Particles Drift
      if (!prefersReducedMotion) {
        particles.rotation.y += delta * 0.02;
      }

      // 6. Camera Scroll Trajectory Interpolation
      const s = scrollRatioRef.current;
      let wpA = WAYPOINTS[0];
      let wpB = WAYPOINTS[WAYPOINTS.length - 1];
      for (let w = 0; w < WAYPOINTS.length - 1; w++) {
        if (s >= WAYPOINTS[w].scroll && s <= WAYPOINTS[w + 1].scroll) {
          wpA = WAYPOINTS[w];
          wpB = WAYPOINTS[w + 1];
          break;
        }
      }
      const t = wpB.scroll > wpA.scroll ? (s - wpA.scroll) / (wpB.scroll - wpA.scroll) : 0;
      targetCamPos.lerpVectors(wpA.pos, wpB.pos, t);
      targetLookAt.lerpVectors(wpA.look, wpB.look, t);

      // Subtle Pointer Parallax
      if (!isMobile) {
        const mx = mouseRef.current.x * 2.2;
        const my = mouseRef.current.y * 1.5;
        targetCamPos.x += mx;
        targetCamPos.y += my;
        targetLookAt.x += mx * 0.25;
      }

      // Smooth Camera Lerp
      currentCamPos.lerp(targetCamPos, 0.048);
      currentLookAt.lerp(targetLookAt, 0.048);
      camera.position.copy(currentCamPos);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    // ─────────────────────────────────────────────────────────────
    // 10. RESIZE LISTENER
    // ─────────────────────────────────────────────────────────────
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // ─────────────────────────────────────────────────────────────
    // 11. CLEANUP ON UNMOUNT
    // ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Geometries
      [groundGeo, traceGeo, padGeo, smdGeo, socketGeo, pinGeo,
       spreaderGeo, finGeo, chokeGeo, dieGeo, mechRingGeo, runnerGeo,
       panelGeo, panelFrameGeo, particleGeo]
        .forEach((g) => g.dispose());

      conduitGeos.forEach((cg) => cg.dispose());

      // Dispose Textures & Materials
      cpuDieTexture.dispose();
      hudPanels.forEach((p) => {
        p.texture.dispose();
        p.material.dispose();
      });

      [darkMetalMat, heatsinkMat, chassisMat, goldMat, siliconMat,
       conduitMat, runnerLimeMat, runnerCyanMat, lineMatLime, lineMatCyan, particleMat]
        .forEach((m) => m.dispose());

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
