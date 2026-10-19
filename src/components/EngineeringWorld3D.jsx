import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * EngineeringWorld3D.jsx
 *
 * Cinematic Real-Time 3D Engineering Metropolis & Computational World
 * Visually targeted to the reference design:
 *
 * ─ Deep obsidian / graphite motherboard city environment
 * ─ Central Multi-Tiered "AD" CPU Processor Package with illuminated silicon die
 * ─ Dense computing towers, server racks, and memory modules of varying heights
 * ─ Orthogonal circuit trace network on the ground with solder pads & micro-chips
 * ─ Interconnected 3D circuit conduits with continuous neon-lime light streams
 * ─ Floating holographic 3D HUD panels (01 About, 02 Skills, 03 Projects, 04 Architecture, 05 Contact)
 * ─ Floating rotating data cube cages
 * ─ Cinematic scroll-choreographed camera flight interpolating smoothly between sectors
 * ─ Mouse pointer parallax for physical depth
 * ─ NO humans, NO planets, NO robots — 100% genuine digital engineering architecture
 */

// Helper to generate dynamic canvas texture for the "AD" Processor Top Face
function createCpuTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Background — dark metallic carbon
  ctx.fillStyle = '#080d08';
  ctx.fillRect(0, 0, 512, 512);

  // Concentric circuit border lines
  ctx.strokeStyle = '#84cc16';
  ctx.lineWidth = 6;
  ctx.strokeRect(16, 16, 480, 480);

  ctx.strokeStyle = 'rgba(132, 204, 22, 0.4)';
  ctx.lineWidth = 2;
  ctx.strokeRect(32, 32, 448, 448);
  ctx.strokeRect(48, 48, 416, 416);

  // Corner HUD brackets
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#a3e635';
  const bracketLen = 40;
  // Top-left
  ctx.beginPath();
  ctx.moveTo(16, 16 + bracketLen); ctx.lineTo(16, 16); ctx.lineTo(16 + bracketLen, 16);
  ctx.stroke();
  // Top-right
  ctx.beginPath();
  ctx.moveTo(496 - bracketLen, 16); ctx.lineTo(496, 16); ctx.lineTo(496, 16 + bracketLen);
  ctx.stroke();
  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(16, 496 - bracketLen); ctx.lineTo(16, 496); ctx.lineTo(16 + bracketLen, 496);
  ctx.stroke();
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(496 - bracketLen, 496); ctx.lineTo(496, 496); ctx.lineTo(496, 496 - bracketLen);
  ctx.stroke();

  // Fine orthogonal circuit traces
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(132, 204, 22, 0.5)';
  for (let i = 80; i < 440; i += 32) {
    ctx.beginPath();
    ctx.moveTo(56, i); ctx.lineTo(140, i);
    ctx.moveTo(372, i); ctx.lineTo(456, i);
    ctx.stroke();
  }

  // Central illuminated die container
  ctx.fillStyle = '#0a1a0c';
  ctx.fillRect(140, 140, 232, 232);
  ctx.strokeStyle = '#84cc16';
  ctx.lineWidth = 4;
  ctx.strokeRect(140, 140, 232, 232);

  // "AD" Logo in center
  ctx.fillStyle = '#84cc16';
  ctx.font = '900 110px "Plus Jakarta Sans", -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#84cc16';
  ctx.shadowBlur = 24;
  ctx.fillText('AD', 256, 252);
  ctx.shadowBlur = 0;

  // Subtitle micro-text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.font = '700 13px "JetBrains Mono", monospace';
  ctx.letterSpacing = '2px';
  ctx.fillText('QUANTUM CORE 01', 256, 335);

  ctx.fillStyle = '#84cc16';
  ctx.font = '600 10px "JetBrains Mono", monospace';
  ctx.fillText('ARYAN DADWAL ARCHITECTURE', 256, 352);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  return texture;
}

// Helper to create holographic HUD panel textures
function createHudTexture(title, number, subtitle, items = []) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');

  // Semi-transparent dark green HUD background
  ctx.fillStyle = 'rgba(6, 12, 8, 0.9)';
  ctx.fillRect(0, 0, 512, 300);

  // Outer neon frame
  ctx.strokeStyle = '#84cc16';
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, 496, 284);

  // Corner brackets
  ctx.strokeStyle = '#a3e635';
  ctx.lineWidth = 6;
  const b = 24;
  ctx.beginPath();
  ctx.moveTo(8, 8 + b); ctx.lineTo(8, 8); ctx.lineTo(8 + b, 8);
  ctx.moveTo(504 - b, 8); ctx.lineTo(504, 8); ctx.lineTo(504, 8 + b);
  ctx.moveTo(8, 292 - b); ctx.lineTo(8, 292); ctx.lineTo(8 + b, 292);
  ctx.moveTo(504 - b, 292); ctx.lineTo(504, 292); ctx.lineTo(504, 292 - b);
  ctx.stroke();

  // Number & Title
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

  // Subtitle
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '400 12px "JetBrains Mono", monospace';
  ctx.fillText(subtitle, 24, 104);

  // Items / tags
  let y = 136;
  items.forEach((item) => {
    ctx.fillStyle = 'rgba(132, 204, 22, 0.15)';
    ctx.fillRect(24, y - 14, 464, 26);
    ctx.strokeStyle = 'rgba(132, 204, 22, 0.3)';
    ctx.strokeRect(24, y - 14, 464, 26);

    ctx.fillStyle = '#84cc16';
    ctx.font = '700 12px "JetBrains Mono", monospace';
    ctx.fillText('◈ ' + item, 36, y + 3);
    y += 34;
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

    // WebGL support test
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

    // ── CAMERA (Isometric Perspective) ──
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(36, aspect, 0.5, 500);
    // Base position frames the AD core in center-right, leaving hero space on left
    const baseCamPos = new THREE.Vector3(26, 32, 26);
    const baseLookAt = new THREE.Vector3(2, 2, 0);
    camera.position.copy(baseCamPos);
    camera.lookAt(baseLookAt);

    // ── LIGHTS ──
    const ambientLight = new THREE.AmbientLight(0x0c1510, 1.2);
    scene.add(ambientLight);

    // Central CPU core point light (pulsating neon lime)
    const coreLight = new THREE.PointLight(0x84cc16, 25, 35);
    coreLight.position.set(0, 3.5, 0);
    scene.add(coreLight);

    // Cyan rim light from top right
    const cyanLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    cyanLight.position.set(20, 30, -15);
    scene.add(cyanLight);

    // Lime accent directional from left
    const limeDirLight = new THREE.DirectionalLight(0x84cc16, 1.2);
    limeDirLight.position.set(-20, 25, 20);
    scene.add(limeDirLight);

    // Deep space fill light
    const fillLight = new THREE.PointLight(0x132a18, 10, 60);
    fillLight.position.set(0, -5, 0);
    scene.add(fillLight);

    // ── MATERIALS ──
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x0c1018,
      roughness: 0.28,
      metalness: 0.88,
    });

    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x121722,
      roughness: 0.35,
      metalness: 0.8,
    });

    const heatsinkMat = new THREE.MeshStandardMaterial({
      color: 0x18202d,
      roughness: 0.22,
      metalness: 0.92,
    });

    const limeGlowMat = new THREE.MeshBasicMaterial({
      color: 0x84cc16,
    });

    const cyanGlowMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

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
    // 1. GROUND MOTHERBOARD CITY & CIRCUIT NETWORK
    // ─────────────────────────────────────────────────────────────
    const groundGeo = new THREE.BoxGeometry(64, 0.4, 64);
    const groundMesh = new THREE.Mesh(groundGeo, darkMetalMat);
    groundMesh.position.y = -0.2;
    scene.add(groundMesh);

    // Orthogonal Ground Circuit Lines
    const circuitPoints = [];
    const step = 4;
    for (let x = -28; x <= 28; x += step) {
      if (Math.abs(x) < 4) continue;
      // Parallel bus lines with 90° turn
      circuitPoints.push(new THREE.Vector3(x, 0.05, -28));
      circuitPoints.push(new THREE.Vector3(x, 0.05, x * 0.5));
      circuitPoints.push(new THREE.Vector3(x, 0.05, x * 0.5));
      circuitPoints.push(new THREE.Vector3(Math.sign(x) * 28, 0.05, x * 0.5));
    }
    for (let z = -28; z <= 28; z += step) {
      if (Math.abs(z) < 4) continue;
      circuitPoints.push(new THREE.Vector3(-28, 0.05, z));
      circuitPoints.push(new THREE.Vector3(z * 0.5, 0.05, z));
      circuitPoints.push(new THREE.Vector3(z * 0.5, 0.05, z));
      circuitPoints.push(new THREE.Vector3(z * 0.5, 0.05, Math.sign(z) * 28));
    }
    const circuitGeo = new THREE.BufferGeometry().setFromPoints(circuitPoints);
    const circuitLines = new THREE.LineSegments(circuitGeo, lineMatLime);
    scene.add(circuitLines);

    // Glowing Solder Pads on Ground
    const padGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.06, 12);
    const padMat = new THREE.MeshBasicMaterial({ color: 0x84cc16 });
    const padInstanced = new THREE.InstancedMesh(padGeo, padMat, 32);
    const dummy = new THREE.Object3D();
    let padIdx = 0;
    for (let px = -24; px <= 24; px += 8) {
      for (let pz = -24; pz <= 24; pz += 8) {
        if (Math.abs(px) < 6 && Math.abs(pz) < 6) continue;
        if (padIdx < 32) {
          dummy.position.set(px, 0.08, pz);
          dummy.updateMatrix();
          padInstanced.setMatrixAt(padIdx++, dummy.matrix);
        }
      }
    }
    padInstanced.instanceMatrix.needsUpdate = true;
    scene.add(padInstanced);

    // ─────────────────────────────────────────────────────────────
    // 2. CENTRAL MULTI-TIER "AD" CPU PROCESSOR PACKAGE
    // ─────────────────────────────────────────────────────────────
    const cpuGroup = new THREE.Group();
    scene.add(cpuGroup);

    // Tier 1: Socket Substrate Frame (10 x 0.6 x 10)
    const socketGeo = new THREE.BoxGeometry(10.5, 0.6, 10.5);
    const socketMesh = new THREE.Mesh(socketGeo, darkMetalMat);
    socketMesh.position.y = 0.3;
    cpuGroup.add(socketMesh);

    const socketEdgeGeo = new THREE.EdgesGeometry(socketGeo);
    const socketEdge = new THREE.LineSegments(socketEdgeGeo, lineMatLime);
    socketEdge.position.y = 0.3;
    cpuGroup.add(socketEdge);

    // Golden Pin Rows along all 4 socket edges
    const pinGeo = new THREE.BoxGeometry(0.12, 0.25, 0.12);
    const pinMat = new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.95, roughness: 0.15 });
    for (let i = -4.5; i <= 4.5; i += 0.5) {
      [-5.1, 5.1].forEach((edge) => {
        const pin1 = new THREE.Mesh(pinGeo, pinMat);
        pin1.position.set(i, 0.2, edge);
        cpuGroup.add(pin1);

        const pin2 = new THREE.Mesh(pinGeo, pinMat);
        pin2.position.set(edge, 0.2, i);
        cpuGroup.add(pin2);
      });
    }

    // Tier 2: Stepped Heat Spreader (8.2 x 0.7 x 8.2) with Fin Slots
    const spreaderGeo = new THREE.BoxGeometry(8.2, 0.7, 8.2);
    const spreaderMesh = new THREE.Mesh(spreaderGeo, heatsinkMat);
    spreaderMesh.position.y = 0.95;
    cpuGroup.add(spreaderMesh);

    const spreaderEdgeGeo = new THREE.EdgesGeometry(spreaderGeo);
    const spreaderEdge = new THREE.LineSegments(spreaderEdgeGeo, lineMatCyan);
    spreaderEdge.position.y = 0.95;
    cpuGroup.add(spreaderEdge);

    // 4 Corner Power Inductor Choke Pillars
    const chokeGeo = new THREE.BoxGeometry(0.85, 1.4, 0.85);
    const chokeEdgeGeo = new THREE.EdgesGeometry(chokeGeo);
    const chokePositions = [
      [-3.3, 1.3, -3.3], [3.3, 1.3, -3.3],
      [-3.3, 1.3, 3.3],  [3.3, 1.3, 3.3],
    ];
    chokePositions.forEach(([cx, cy, cz]) => {
      const choke = new THREE.Mesh(chokeGeo, chassisMat);
      choke.position.set(cx, cy, cz);
      cpuGroup.add(choke);

      const chokeLine = new THREE.LineSegments(chokeEdgeGeo, lineMatLime);
      chokeLine.position.set(cx, cy, cz);
      cpuGroup.add(chokeLine);
    });

    // Tier 3: Silicon Core Die with Dynamic "AD" Canvas Texture
    const cpuTexture = createCpuTexture();
    const coreDieGeo = new THREE.BoxGeometry(5.6, 0.7, 5.6);
    // Multi-material: top has AD texture, sides have dark glowing emerald
    const dieSideMat = new THREE.MeshStandardMaterial({
      color: 0x07150a,
      emissive: 0x84cc16,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.85,
    });
    const dieTopMat = new THREE.MeshBasicMaterial({
      map: cpuTexture,
    });
    const coreMaterials = [
      dieSideMat, dieSideMat,
      dieTopMat,  dieSideMat,
      dieSideMat, dieSideMat,
    ];
    const coreDieMesh = new THREE.Mesh(coreDieGeo, coreMaterials);
    coreDieMesh.position.y = 1.65;
    cpuGroup.add(coreDieMesh);

    // Core Edge Highlighting
    const coreEdgeGeo = new THREE.EdgesGeometry(coreDieGeo);
    const coreEdge = new THREE.LineSegments(coreEdgeGeo, lineMatLime);
    coreEdge.position.y = 1.65;
    cpuGroup.add(coreEdge);

    // Floating Mechanical Core Ring
    const ringGeo = new THREE.TorusGeometry(4.8, 0.06, 8, 48);
    const ringMesh = new THREE.Mesh(ringGeo, limeGlowMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 1.65;
    cpuGroup.add(ringMesh);

    // ─────────────────────────────────────────────────────────────
    // 3. COMPUTING TOWERS & HARDWARE PLATFORMS (SKYLINE)
    // ─────────────────────────────────────────────────────────────
    const towerConfigs = [
      // Left sector (About / Projects)
      { x: -12, z: -10, w: 4.8, h: 4.5, d: 4.8, type: 'about' },
      { x: -14, z:   8, w: 5.2, h: 5.2, d: 5.2, type: 'projects' },
      { x: -16, z:  -2, w: 3.6, h: 7.0, d: 3.6, type: 'tall' },
      // Right sector (Skills / Architecture)
      { x:  12, z: -11, w: 4.8, h: 4.8, d: 4.8, type: 'skills' },
      { x:  13, z:   9, w: 5.0, h: 5.5, d: 5.0, type: 'arch' },
      { x:  16, z:  -2, w: 3.8, h: 8.0, d: 3.8, type: 'tall' },
      // Rear skyline towers
      { x:  -6, z: -18, w: 4.0, h: 9.5, d: 4.0, type: 'sky' },
      { x:   6, z: -18, w: 4.0, h: 10.5, d: 4.0, type: 'sky' },
      { x:   0, z: -20, w: 5.0, h: 12.0, d: 5.0, type: 'sky' },
      // Foreground corner nodes
      { x: -10, z:  18, w: 3.2, h: 2.8, d: 3.2, type: 'node' },
      { x:  10, z:  18, w: 3.2, h: 3.0, d: 3.2, type: 'node' },
    ];

    const towers = [];
    towerConfigs.forEach((cfg) => {
      const group = new THREE.Group();
      group.position.set(cfg.x, 0, cfg.z);

      const bGeo = new THREE.BoxGeometry(cfg.w, cfg.h, cfg.d);
      const bMesh = new THREE.Mesh(bGeo, chassisMat);
      bMesh.position.y = cfg.h / 2;
      group.add(bMesh);

      const bEdges = new THREE.EdgesGeometry(bGeo);
      const bLine = new THREE.LineSegments(bEdges, lineMatLime);
      bLine.position.y = cfg.h / 2;
      group.add(bLine);

      // Server rack horizontal slot lights
      const numSlots = Math.min(5, Math.floor(cfg.h / 1.5));
      for (let s = 1; s <= numSlots; s++) {
        const slotY = (cfg.h / (numSlots + 1)) * s;
        const slotGeo = new THREE.BoxGeometry(cfg.w * 0.75, 0.08, cfg.d + 0.05);
        const slotMesh = new THREE.Mesh(slotGeo, s % 2 === 0 ? limeGlowMat : cyanGlowMat);
        slotMesh.position.y = slotY;
        group.add(slotMesh);
      }

      // Top cap cooling unit
      const topGeo = new THREE.BoxGeometry(cfg.w * 0.7, 0.35, cfg.d * 0.7);
      const topMesh = new THREE.Mesh(topGeo, heatsinkMat);
      topMesh.position.y = cfg.h + 0.175;
      group.add(topMesh);

      scene.add(group);
      towers.push({ group, cfg });
    });

    // ─────────────────────────────────────────────────────────────
    // 4. INTERCONNECTED CIRCUIT CONDUITS & FLOWING LIGHT STREAMS
    // ─────────────────────────────────────────────────────────────
    // Defined 3D curve paths connecting CPU to the 4 main platforms
    const conduits = [
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

    // Build 3D conduit tubes (bundle of tubes)
    const conduitGeoList = [];
    conduits.forEach((curve) => {
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.08, 6, false);
      const tubeMesh = new THREE.Mesh(tubeGeo, lineMatLime);
      scene.add(tubeMesh);
      conduitGeoList.push(tubeGeo);
    });

    // Flowing Light Runners (24 packets moving along conduits)
    const runnerGeo = new THREE.SphereGeometry(0.18, 8, 8);
    const runners = [];
    const NUM_RUNNERS = isMobile ? 12 : 24;

    for (let r = 0; r < NUM_RUNNERS; r++) {
      const conduitIdx = r % conduits.length;
      const isLime = r % 3 !== 0;
      const runner = new THREE.Mesh(runnerGeo, isLime ? limeGlowMat : cyanGlowMat);
      scene.add(runner);

      runners.push({
        mesh: runner,
        conduit: conduits[conduitIdx],
        progress: (r / NUM_RUNNERS),
        speed: 0.12 + (r % 5) * 0.03,
      });
    }

    // ─────────────────────────────────────────────────────────────
    // 5. FLOATING HOLOGRAPHIC 3D HUD PANELS (MATCHING REFERENCE)
    // ─────────────────────────────────────────────────────────────
    const hudConfigs = [
      {
        title: 'ABOUT',
        number: '01',
        subtitle: 'B.TECH CSE · LPU PHAGWARA',
        items: ['CGPA: 7.07 (EXACT)', 'FULL-STACK MERN', 'CLASS OF 2028'],
        x: -9.5, y: 7.2, z: -8.5,
        rotY: 0.35,
      },
      {
        title: 'SKILLS',
        number: '02',
        subtitle: 'VERIFIED HARDWARE TECH MATRIX',
        items: ['REACT.JS & NODE.JS', 'JAVA & DSA (DFS/RECURSION)', 'MONGODB & REST APIS'],
        x: 10.5, y: 7.8, z: -9.0,
        rotY: -0.38,
      },
      {
        title: 'PROJECTS',
        number: '03',
        subtitle: 'PRODUCTION CODEBASES & LIVE DEMOS',
        items: ['CAREER GUIDANCE SYSTEM', 'STOCKSENSE AI', 'MAZE SOLVER (JAVA/DFS)'],
        x: -12.5, y: 8.4, z: 7.5,
        rotY: 0.42,
      },
      {
        title: 'ARCHITECTURE',
        number: '04',
        subtitle: 'CLIENT-SERVER DATA FLOW',
        items: ['DECOUPLED REST ENDPOINTS', 'SCORING ENGINE LOGIC', 'RENDER CLOUD HOSTING'],
        x: 11.5, y: 8.6, z: 8.0,
        rotY: -0.42,
      },
      {
        title: 'CONTACT',
        number: '05',
        subtitle: 'OPEN FOR IMMEDIATE ROLES',
        items: ['EMAIL & WHATSAPP DIRECT', 'GITHUB REPOSITORIES', 'LINKEDIN CONNECT'],
        x: 0, y: 7.0, z: 15.0,
        rotY: 0,
      },
    ];

    const hudPanels = [];
    const panelPlaneGeo = new THREE.PlaneGeometry(4.8, 2.8);
    const panelEdgeGeo = new THREE.EdgesGeometry(panelPlaneGeo);

    hudConfigs.forEach((cfg, idx) => {
      const tex = createHudTexture(cfg.title, cfg.number, cfg.subtitle, cfg.items);
      const pMat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });

      const pMesh = new THREE.Mesh(panelPlaneGeo, pMat);
      pMesh.position.set(cfg.x, cfg.y, cfg.z);
      pMesh.rotation.y = cfg.rotY;
      pMesh.rotation.x = -0.15; // angled slightly towards elevated camera

      const edgeMesh = new THREE.LineSegments(panelEdgeGeo, lineMatLime);
      pMesh.add(edgeMesh);

      scene.add(pMesh);
      hudPanels.push({
        mesh: pMesh,
        texture: tex,
        material: pMat,
        baseY: cfg.y,
        phase: idx * 1.2,
      });
    });

    // ─────────────────────────────────────────────────────────────
    // 6. FLOATING ROTATING DATA CUBE CAGES
    // ─────────────────────────────────────────────────────────────
    const cubeData = [
      { x: -5, y: 4.8, z: -5, size: 1.2 },
      { x:  6, y: 5.5, z: -4, size: 1.4 },
      { x: -7, y: 6.2, z:  6, size: 1.3 },
      { x:  7, y: 5.8, z:  6, size: 1.1 },
      { x:  0, y: 7.5, z: -7, size: 1.5 },
    ];
    const dataCubes = [];
    cubeData.forEach(({ x, y, z, size }, i) => {
      const group = new THREE.Group();
      group.position.set(x, y, z);

      // Outer wireframe cage
      const cageGeo = new THREE.BoxGeometry(size, size, size);
      const cageEdges = new THREE.EdgesGeometry(cageGeo);
      const cageLine = new THREE.LineSegments(cageEdges, i % 2 === 0 ? lineMatLime : lineMatCyan);
      group.add(cageLine);

      // Inner solid glowing chip
      const chipGeo = new THREE.BoxGeometry(size * 0.45, size * 0.45, size * 0.45);
      const chipMesh = new THREE.Mesh(chipGeo, i % 2 === 0 ? limeGlowMat : cyanGlowMat);
      group.add(chipMesh);

      scene.add(group);
      dataCubes.push({
        group,
        baseY: y,
        phase: i * 1.4,
        rotSpeedX: 0.5 + i * 0.2,
        rotSpeedY: 0.7 + i * 0.15,
      });
    });

    // ─────────────────────────────────────────────────────────────
    // 7. AMBIENT ATMOSPHERIC DATA PARTICLES
    // ─────────────────────────────────────────────────────────────
    const particleCount = isMobile ? 500 : 1200;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      particlePositions[p * 3]     = (Math.random() - 0.5) * 60;
      particlePositions[p * 3 + 1] = Math.random() * 28 + 0.5;
      particlePositions[p * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x84cc16,
      size: 0.12,
      transparent: true,
      opacity: 0.65,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // ─────────────────────────────────────────────────────────────
    // 8. SCROLL CHOREOGRAPHY & MOUSE PARALLAX
    // ─────────────────────────────────────────────────────────────
    // Waypoints for camera trajectory across page scroll (0.0 to 1.0)
    const WAYPOINTS = [
      { scroll: 0.00, pos: new THREE.Vector3(26, 32, 26), look: new THREE.Vector3(2, 2, 0) },    // Hero
      { scroll: 0.20, pos: new THREE.Vector3(18, 26, 20), look: new THREE.Vector3(-4, 3, -3) },  // About
      { scroll: 0.40, pos: new THREE.Vector3(22, 27, 16), look: new THREE.Vector3(5, 3, -4) },   // Skills
      { scroll: 0.60, pos: new THREE.Vector3(14, 23, 24), look: new THREE.Vector3(-5, 3, 4) },   // Projects
      { scroll: 0.80, pos: new THREE.Vector3(24, 28, 18), look: new THREE.Vector3(5, 3, 4) },    // Architecture
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
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.x = nx;
      mouseRef.current.y = ny;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ─────────────────────────────────────────────────────────────
    // 9. ANIMATION RENDER LOOP (SINGLE HIGH-PERFORMANCE LOOP)
    // ─────────────────────────────────────────────────────────────
    let rafId = null;
    let clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // 1. Core Pulsing & Mechanical Rotation
      if (!prefersReducedMotion) {
        ringMesh.rotation.z += delta * 0.4;
        coreLight.intensity = 20 + 8 * Math.sin(elapsed * 2.8);
        coreDieMesh.position.y = 1.65 + 0.04 * Math.sin(elapsed * 1.8);
      }

      // 2. Light Streams Travelling Along Circuit Conduits
      if (!prefersReducedMotion) {
        runners.forEach((r) => {
          r.progress = (r.progress + delta * r.speed) % 1.0;
          const pos = r.conduit.getPointAt(r.progress);
          r.mesh.position.copy(pos);
        });
      }

      // 3. Floating Holographic HUD Panels Hovering
      if (!prefersReducedMotion) {
        hudPanels.forEach((p) => {
          p.mesh.position.y = p.baseY + Math.sin(elapsed * 1.6 + p.phase) * 0.22;
        });
      }

      // 4. Data Cube Cages Rotation & Floating
      if (!prefersReducedMotion) {
        dataCubes.forEach((c) => {
          c.group.rotation.x += delta * c.rotSpeedX;
          c.group.rotation.y += delta * c.rotSpeedY;
          c.group.position.y = c.baseY + Math.sin(elapsed * 1.5 + c.phase) * 0.3;
        });
      }

      // 5. Ambient Particles Slow Drift
      if (!prefersReducedMotion) {
        particlePoints.rotation.y += delta * 0.02;
      }

      // 6. Camera Scroll Trajectory Interpolation
      const s = scrollRatioRef.current;
      // Find bounding waypoints
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

      // Add Mouse Parallax
      if (!isMobile) {
        const mx = mouseRef.current.x * 2.5;
        const my = mouseRef.current.y * 1.8;
        targetCamPos.x += mx;
        targetCamPos.y += my;
        targetLookAt.x += mx * 0.3;
      }

      // Smooth Lerp Camera
      currentCamPos.lerp(targetCamPos, 0.05);
      currentLookAt.lerp(targetLookAt, 0.05);
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
      [groundGeo, socketGeo, socketEdgeGeo, pinGeo, spreaderGeo,
       spreaderEdgeGeo, chokeGeo, chokeEdgeGeo, coreDieGeo, coreEdgeGeo,
       ringGeo, runnerGeo, panelPlaneGeo, panelEdgeGeo, particleGeo, circuitGeo, padGeo]
        .forEach((g) => g.dispose());

      conduitGeoList.forEach((cg) => cg.dispose());

      // Dispose Textures & Materials
      cpuTexture.dispose();
      hudPanels.forEach((p) => {
        p.texture.dispose();
        p.material.dispose();
      });

      [darkMetalMat, chassisMat, heatsinkMat, limeGlowMat, cyanGlowMat,
       lineMatLime, lineMatCyan, dieSideMat, dieTopMat, padMat, particleMat]
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
