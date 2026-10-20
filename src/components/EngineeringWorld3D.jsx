import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * EngineeringWorld3D — Premium Isometric Computing Environment
 *
 * Scene composition (left-to-right viewport, isometric view):
 *   • Hero text occupies LEFT 40% of viewport — scene clears that region
 *   • Central CPU processor is positioned CENTRE-RIGHT — large & dominant
 *   • PCB motherboard spreads under everything
 *   • 4 computing tower modules in foreground / midground / background
 *   • 3D conduit pipes carry light pulses between modules and CPU
 *   • Holographic info panels float above modules
 *   • Fine ambient particle cloud
 *   • Scroll-driven camera path with smooth lerp
 *
 * Design rules:
 *   ✓ NO diagonal lines crossing the screen
 *   ✓ NO hollow wireframe cubes as main scene elements
 *   ✓ NO planets, humans, or robots
 *   ✓ NO fabricated telemetry or fake stats
 *   ✓ Solid geometry with metallic PBR materials
 *   ✓ Neon-lime primary glow, cyan accent, gold traces
 *   ✓ CPU is large, layered, unmistakably a processor
 */

// ─────────────────────────────────────────────────────────────────────────────
// TEXTURE FACTORIES
// ─────────────────────────────────────────────────────────────────────────────

/** High-resolution silicon die canvas texture with realistic block layout */
function makeCpuTexture() {
  const S = 1024;
  const c = document.createElement('canvas');
  c.width = S; c.height = S;
  const g = c.getContext('2d');

  // Dark silicon substrate
  g.fillStyle = '#101a17';
  g.fillRect(0, 0, S, S);

  // Very subtle substrate gradient
  const grad = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S * 0.7);
  grad.addColorStop(0, 'rgba(28,66,39,0.78)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, S, S);

  // Outer PCB substrate frame (green-tinted fiberglass look)
  g.fillStyle = '#071a0a';
  g.fillRect(0, 0, S, 60);
  g.fillRect(0, S - 60, S, 60);
  g.fillRect(0, 0, 60, S);
  g.fillRect(S - 60, 0, 60, S);

  // Gold trace border
  g.strokeStyle = '#d97706';
  g.lineWidth = 4;
  g.strokeRect(30, 30, S - 60, S - 60);

  // Lime inner border
  g.strokeStyle = '#84cc16';
  g.lineWidth = 6;
  g.strokeRect(52, 52, S - 104, S - 104);

  // Corner HUD brackets
  const bk = (x, y, dx, dy) => {
    g.beginPath();
    g.moveTo(x, y + dy * 56); g.lineTo(x, y); g.lineTo(x + dx * 56, y);
    g.stroke();
  };
  g.strokeStyle = '#a3e635';
  g.lineWidth = 10;
  bk(52, 52, 1, 1); bk(S - 52, 52, -1, 1);
  bk(52, S - 52, 1, -1); bk(S - 52, S - 52, -1, -1);

  // LGA contact pad grid on substrate margins
  g.fillStyle = '#d97706';
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 3; col++) {
      const px = 68 + col * 16;
      const py = 68 + row * 58;
      g.fillRect(px, py, 8, 8);
      g.fillRect(S - px - 8, py, 8, 8);
    }
  }

  // Silicon die area
  const DIE = { x: 170, y: 170, w: S - 340, h: S - 340 };
  g.fillStyle = '#0b1b13';
  g.fillRect(DIE.x, DIE.y, DIE.w, DIE.h);
  g.strokeStyle = '#84cc16';
  g.lineWidth = 4;
  g.strokeRect(DIE.x, DIE.y, DIE.w, DIE.h);

  // Functional block grid (resembles real die photo)
  const cols = 7, rows = 7;
  const bw = DIE.w / cols, bh = DIE.h / rows;
  const blockColors = [
    'rgba(132,204,22,0.14)', 'rgba(56,189,248,0.10)', 'rgba(132,204,22,0.08)',
    'rgba(163,230,53,0.12)', 'rgba(14,165,233,0.09)', 'rgba(132,204,22,0.16)',
  ];
  // Fill blocks with slightly varied shades
  for (let r = 0; r < rows; r++) {
    for (let cc = 0; cc < cols; cc++) {
      const bx = DIE.x + cc * bw + 2;
      const by = DIE.y + r * bh + 2;
      g.fillStyle = blockColors[(r * cols + cc) % blockColors.length];
      g.fillRect(bx, by, bw - 4, bh - 4);
    }
  }

  // Die grid lines
  g.strokeStyle = 'rgba(132,204,22,0.22)';
  g.lineWidth = 1.5;
  for (let r = 1; r < rows; r++) {
    g.beginPath();
    g.moveTo(DIE.x, DIE.y + r * bh);
    g.lineTo(DIE.x + DIE.w, DIE.y + r * bh);
    g.stroke();
  }
  for (let cc = 1; cc < cols; cc++) {
    g.beginPath();
    g.moveTo(DIE.x + cc * bw, DIE.y);
    g.lineTo(DIE.x + cc * bw, DIE.y + DIE.h);
    g.stroke();
  }

  // Central "AD" monogram over die
  const cx = DIE.x + DIE.w / 2, cy = DIE.y + DIE.h / 2;
  g.shadowColor = '#84cc16';
  g.shadowBlur = 40;
  g.fillStyle = '#84cc16';
  g.font = '900 190px system-ui, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('AD', cx, cy - 18);
  g.shadowBlur = 0;

  g.fillStyle = 'rgba(255,255,255,0.70)';
  g.font = '700 20px monospace';
  g.fillText('COMPUTATIONAL CORE', cx, cy + 110);

  g.fillStyle = '#84cc16';
  g.font = '600 16px monospace';
  g.fillText('ARYAN DADWAL  ·  v1.0', cx, cy + 138);

  // Discreet processor label; avoid fabricated live telemetry.
  g.fillStyle = 'rgba(132,204,22,0.16)';
  g.fillRect(DIE.x, DIE.y + DIE.h - 50, DIE.w, 50);
  g.fillStyle = '#c4f58a';
  g.font = '700 17px monospace';
  g.fillText('PROCESSOR DIE  ·  AD', cx, DIE.y + DIE.h - 22);

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Motherboard PCB surface texture */
function makePcbTexture() {
  const S = 512;
  const c = document.createElement('canvas');
  c.width = S; c.height = S;
  const g = c.getContext('2d');

  g.fillStyle = '#10251a';
  g.fillRect(0, 0, S, S);

  // Horizontal trace lines
  g.strokeStyle = 'rgba(132,204,22,0.19)';
  g.lineWidth = 1.5;
  for (let y = 12; y < S; y += 28) {
    g.beginPath();
    g.moveTo(0, y); g.lineTo(S, y);
    g.stroke();
  }
  // Vertical trace lines
  for (let x = 12; x < S; x += 28) {
    g.beginPath();
    g.moveTo(x, 0); g.lineTo(x, S);
    g.stroke();
  }

  // Via holes at intersections
  g.fillStyle = 'rgba(217,119,6,0.5)';
  for (let y = 12; y < S; y += 56) {
    for (let x = 12; x < S; x += 56) {
      g.beginPath();
      g.arc(x, y, 3, 0, Math.PI * 2);
      g.fill();
    }
  }

  const t = new THREE.CanvasTexture(c);
  t.anisotropy = 4;
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(6, 6);
  return t;
}

/** Holographic panel canvas texture */
function makeHudTexture(title, number, lines) {
  const W = 640, H = 300;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');

  // Dark glass background
  g.fillStyle = 'rgba(3,10,6,0.93)';
  g.fillRect(0, 0, W, H);

  // Lime outer border
  g.strokeStyle = '#84cc16';
  g.lineWidth = 4;
  g.strokeRect(7, 7, W - 14, H - 14);
  // Inner hairline
  g.strokeStyle = 'rgba(132,204,22,0.28)';
  g.lineWidth = 1.5;
  g.strokeRect(16, 16, W - 32, H - 32);

  // Corner brackets
  const bk = (x, y, dx, dy) => {
    g.beginPath();
    g.moveTo(x, y + dy * 26); g.lineTo(x, y); g.lineTo(x + dx * 26, y);
    g.stroke();
  };
  g.strokeStyle = '#a3e635';
  g.lineWidth = 7;
  bk(7, 7, 1, 1); bk(W - 7, 7, -1, 1);
  bk(7, H - 7, 1, -1); bk(W - 7, H - 7, -1, -1);

  // Number tag
  g.fillStyle = '#84cc16';
  g.font = '700 13px monospace';
  g.textAlign = 'left';
  g.textBaseline = 'top';
  g.fillText(number, 26, 28);

  // Title
  g.fillStyle = '#ffffff';
  g.font = '800 28px system-ui, sans-serif';
  g.fillText(title, 26, 50);

  // Divider
  g.strokeStyle = 'rgba(132,204,22,0.38)';
  g.lineWidth = 1.5;
  g.beginPath(); g.moveTo(26, 92); g.lineTo(W - 26, 92); g.stroke();

  // List items
  let y = 115;
  lines.forEach(item => {
    g.fillStyle = 'rgba(132,204,22,0.11)';
    g.fillRect(26, y - 12, W - 52, 28);
    g.strokeStyle = 'rgba(132,204,22,0.24)';
    g.lineWidth = 1;
    g.strokeRect(26, y - 12, W - 52, 28);
    g.fillStyle = '#a3e635';
    g.font = '700 13px monospace';
    g.fillText('◈  ' + item, 38, y + 3);
    y += 40;
  });

  const t = new THREE.CanvasTexture(c);
  t.anisotropy = 4;
  return t;
}

// ─────────────────────────────────────────────────────────────────────────────
// GEOMETRY HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Build an orthogonal (Manhattan) trace path as LineSegments */
function buildTraceLines(points, mat) {
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  return new THREE.LineSegments(geo, mat);
}

/** Simple box mesh helper */
function box(w, h, d, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  return m;
}

/** Cylinder mesh helper */
function cyl(rt, rb, h, seg, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
  m.position.set(x, y, z);
  return m;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function EngineeringWorld3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // WebGL check
    try {
      const t = document.createElement('canvas');
      const gl = t.getContext('webgl') || t.getContext('experimental-webgl');
      if (!gl) return;
    } catch (_) { return; }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile  = window.matchMedia('(pointer: coarse)').matches;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      alpha: false, antialias: !mobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.7));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;
    renderer.setClearColor(0x07110d, 1);
    renderer.shadowMap.enabled = false; // keep draw calls low
    container.appendChild(renderer.domElement);

    // ── Scene & fog ───────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07110d);
    scene.fog = new THREE.FogExp2(0x07110d, 0.0045);

    // ── Camera ────────────────────────────────────────────────────────────
    // Elevated isometric-ish perspective; CPU sits to the right of hero text
    const CAM_FOV = 36;
    const camera = new THREE.PerspectiveCamera(CAM_FOV, window.innerWidth / window.innerHeight, 0.5, 700);
    // Keep the computational core to the right of the text column and expose
    // enough of the top surfaces to read the 3D hardware.
    const BASE_POS  = new THREE.Vector3(20, 34, 34);
    const BASE_LOOK = new THREE.Vector3(-3, 1, 0);
    camera.position.copy(BASE_POS);
    camera.lookAt(BASE_LOOK);

    // ── Lighting ──────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x7b9687, 1.35));
    const hemiLight = new THREE.HemisphereLight(0xdcebe2, 0x1a2730, 1.65);
    scene.add(hemiLight);

    // Main core light reveals actual surfaces, not only green outlines.
    const coreLight = new THREE.PointLight(0x9eea45, 25, 54);
    coreLight.position.set(0, 6, 0);
    scene.add(coreLight);

    const fillLow = new THREE.PointLight(0x84cc16, 6.5, 32);
    fillLow.position.set(0, -3, 0);
    scene.add(fillLow);

    // Broad cool key light reveals metal bevels and top surfaces.
    const keyDir = new THREE.DirectionalLight(0xddeeff, 2.8);
    keyDir.position.set(28, 48, -20);
    scene.add(keyDir);

    const rimDir = new THREE.DirectionalLight(0x84cc16, 2.0);
    rimDir.position.set(-24, 32, 28);
    scene.add(rimDir);

    const fillDir = new THREE.DirectionalLight(0x4aaed0, 1.15);
    fillDir.position.set(-30, 16, 24);
    scene.add(fillDir);

    const backDir = new THREE.DirectionalLight(0x263b36, 1.8);
    backDir.position.set(0, -12, -40);
    scene.add(backDir);

    // ── Materials ─────────────────────────────────────────────────────────
    const M = {
      // Lighter, less mirror-metallic materials stay visible without relying on bloom.
      darkMetal : new THREE.MeshStandardMaterial({ color: 0x2b3942, roughness: 0.42, metalness: 0.55 }),
      heatsink  : new THREE.MeshStandardMaterial({ color: 0x657681, roughness: 0.34, metalness: 0.58 }),
      chassis   : new THREE.MeshStandardMaterial({ color: 0x293943, roughness: 0.46, metalness: 0.48 }),
      chassisDk : new THREE.MeshStandardMaterial({ color: 0x18262e, roughness: 0.50, metalness: 0.42 }),
      gold      : new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.28, metalness: 0.78 }),
      copper    : new THREE.MeshStandardMaterial({ color: 0xb96c27, roughness: 0.28, metalness: 0.72 }),
      silicon   : new THREE.MeshStandardMaterial({ color: 0x102719, emissive: 0x477d24, emissiveIntensity: 0.28, roughness: 0.38, metalness: 0.36 }),
      conduit   : new THREE.MeshStandardMaterial({ color: 0x1a321c, emissive: 0x84cc16, emissiveIntensity: 0.52, roughness: 0.40, metalness: 0.38 }),
      lime      : new THREE.MeshBasicMaterial({ color: 0xa3e635 }),
      limeDim   : new THREE.MeshBasicMaterial({ color: 0x4d7c0f }),
      cyan      : new THREE.MeshBasicMaterial({ color: 0x38bdf8 }),
      cyanDim   : new THREE.MeshBasicMaterial({ color: 0x0e7490 }),
      trLime    : new THREE.LineBasicMaterial({ color: 0x84cc16, transparent: true, opacity: 0.32 }),
      trCyan    : new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.38 }),
      trGold    : new THREE.LineBasicMaterial({ color: 0xd97706, transparent: true, opacity: 0.22 }),
      frontPanel: new THREE.MeshStandardMaterial({ color: 0x233541, roughness: 0.48, metalness: 0.34 }),
      pcbGreen  : new THREE.MeshStandardMaterial({ color: 0x173723, roughness: 0.62, metalness: 0.22 }),
    };

    // ─────────────────────────────────────────────────────────────────────
    // 1. MOTHERBOARD FLOOR  (large PCB slab with surface texture)
    // ─────────────────────────────────────────────────────────────────────
    const pcbTex = makePcbTexture();
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x1a3524, map: pcbTex, roughness: 0.64, metalness: 0.22,
    });

    const board = new THREE.Mesh(new THREE.BoxGeometry(72, 0.55, 72), pcbMat);
    board.position.y = -0.28;
    scene.add(board);

    // PCB edge strips (show layering like a real multi-layer PCB)
    const edgeMat = new THREE.MeshStandardMaterial({ color: 0x294432, roughness: 0.55, metalness: 0.30 });
    const edgeGeo = new THREE.BoxGeometry(72, 0.18, 72);
    const edgeBot = new THREE.Mesh(edgeGeo, edgeMat);
    edgeBot.position.y = -0.64;
    scene.add(edgeBot);

    // ── Orthogonal circuit traces on the board (NO diagonals)
    const trPts = [];
    // Grid of Manhattan traces radiating from centre
    const gridCoords = [-20, -12, -5, 5, 12, 20];
    gridCoords.forEach(v => {
      // Longitudinal (Z direction)
      trPts.push(new THREE.Vector3(v, 0.12, -32), new THREE.Vector3(v, 0.12, v * 0.3 - 0.5));
      trPts.push(new THREE.Vector3(v, 0.12, v * 0.3 - 0.5), new THREE.Vector3(Math.sign(v) * 34, 0.12, v * 0.3 - 0.5));
      // Latitudinal (X direction)
      trPts.push(new THREE.Vector3(-32, 0.12, v), new THREE.Vector3(v * 0.3 + 0.5, 0.12, v));
      trPts.push(new THREE.Vector3(v * 0.3 + 0.5, 0.12, v), new THREE.Vector3(v * 0.3 + 0.5, 0.12, Math.sign(v) * 32));
    });
    // Dense cluster around CPU socket area
    for (let i = -5; i <= 5; i++) {
      trPts.push(new THREE.Vector3(i * 1.3, 0.12, -7.5), new THREE.Vector3(i * 1.3, 0.12, -12));
      trPts.push(new THREE.Vector3(-7.5, 0.12, i * 1.3), new THREE.Vector3(-12, 0.12, i * 1.3));
      trPts.push(new THREE.Vector3(i * 1.3, 0.12, 7.5), new THREE.Vector3(i * 1.3, 0.12, 12));
      trPts.push(new THREE.Vector3(7.5, 0.12, i * 1.3), new THREE.Vector3(12, 0.12, i * 1.3));
    }
    scene.add(buildTraceLines(trPts, M.trLime));

    // Gold bus traces (wider, fewer)
    const busPts = [];
    [-16, 16].forEach(v => {
      busPts.push(new THREE.Vector3(v, 0.13, -28), new THREE.Vector3(v, 0.13, 28));
      busPts.push(new THREE.Vector3(-28, 0.13, v), new THREE.Vector3(28, 0.13, v));
    });
    scene.add(buildTraceLines(busPts, M.trGold));

    // ── Solder pads & SMD chips (instanced for performance)
    const padGeo   = new THREE.CylinderGeometry(0.20, 0.20, 0.08, 10);
    const padMesh  = new THREE.InstancedMesh(padGeo, M.gold, 48);
    const smdGeo   = new THREE.BoxGeometry(0.42, 0.20, 0.26);
    const smdMesh  = new THREE.InstancedMesh(smdGeo, M.heatsink, 48);
    const dummy    = new THREE.Object3D();
    let pi = 0;
    for (let px = -26; px <= 26; px += 6) {
      for (let pz = -26; pz <= 26; pz += 6) {
        if (Math.abs(px) < 8 && Math.abs(pz) < 8) continue;
        if (pi < 48) {
          dummy.position.set(px, 0.04, pz);
          dummy.rotation.y = (pi * 0.7) % (Math.PI * 2);
          dummy.updateMatrix();
          padMesh.setMatrixAt(pi, dummy.matrix);
          dummy.position.set(px + 0.6, 0.10, pz + 0.3);
          dummy.updateMatrix();
          smdMesh.setMatrixAt(pi, dummy.matrix);
          pi++;
        }
      }
    }
    padMesh.instanceMatrix.needsUpdate = true;
    smdMesh.instanceMatrix.needsUpdate = true;
    scene.add(padMesh, smdMesh);

    // PCIe slot connectors along board edges
    [{ x: 0, z: -30 }, { x: 0, z: 28 }].forEach(({ x, z }) => {
      const slot = new THREE.Mesh(new THREE.BoxGeometry(20, 0.35, 0.60), M.chassisDk);
      slot.position.set(x, 0.18, z);
      scene.add(slot);
      for (let ci = -9; ci <= 9; ci += 2) {
        const contact = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.24, 0.55), M.gold);
        contact.position.set(x + ci, 0.19, z);
        scene.add(contact);
      }
    });

    // ─────────────────────────────────────────────────────────────────────
    // 2. CENTRAL CPU PROCESSOR — Large, multi-layer, immediately recognisable
    // ─────────────────────────────────────────────────────────────────────
    const cpu = new THREE.Group();
    scene.add(cpu);

    // Layer 0: Reinforcement back-plate (sits under board)
    const bPlate = new THREE.Mesh(new THREE.BoxGeometry(13.5, 0.4, 13.5), M.darkMetal);
    bPlate.position.y = -0.55;
    cpu.add(bPlate);

    // Layer 1: LGA Socket body (thickest layer)
    const socket = new THREE.Mesh(new THREE.BoxGeometry(13, 0.80, 13), M.darkMetal);
    socket.position.y = 0.40;
    cpu.add(socket);

    // Socket frame border ridge
    const socketRidge = new THREE.Mesh(new THREE.BoxGeometry(13, 0.16, 13), M.heatsink);
    socketRidge.position.y = 0.88;
    cpu.add(socketRidge);

    // LGA contact pins (dense 2D grid)
    const pinGeo = new THREE.BoxGeometry(0.11, 0.28, 0.11);
    for (let px = -5.5; px <= 5.5; px += 0.50) {
      for (let pz = -5.5; pz <= 5.5; pz += 0.50) {
        const pin = new THREE.Mesh(pinGeo, M.gold);
        pin.position.set(px, 0.14, pz);
        cpu.add(pin);
      }
    }

    // Layer 2: Green PCB substrate
    const substrate = new THREE.Mesh(new THREE.BoxGeometry(12.2, 0.45, 12.2), M.pcbGreen);
    substrate.position.y = 1.22;
    cpu.add(substrate);

    // Substrate edge glow (emissive strip)
    const subEdge = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(12.2, 0.45, 12.2)),
      M.trLime
    );
    subEdge.position.y = 1.22;
    cpu.add(subEdge);

    // Layer 3: IHS — Integrated Heat Spreader
    const ihs = new THREE.Mesh(new THREE.BoxGeometry(10.8, 0.90, 10.8), M.heatsink);
    ihs.position.y = 1.90;
    cpu.add(ihs);

    // Keep the heat-spreader face uncluttered so the processor's real layers read clearly.

    // Layer 4: Heatsink base plate
    const hsBase = new THREE.Mesh(new THREE.BoxGeometry(10.0, 0.55, 10.0), M.heatsink);
    hsBase.position.y = 2.62;
    cpu.add(hsBase);

    // Cooling fins sit around the package perimeter, never above the die.
    const coolingFinMat = new THREE.MeshStandardMaterial({
      color: 0x71838b, roughness: 0.40, metalness: 0.46,
    });
    for (let p = -3.45; p <= 3.46; p += 0.78) {
      const northFin = box(0.48, 0.58, 0.18, coolingFinMat, p, 3.18, -4.42);
      const southFin = box(0.48, 0.58, 0.18, coolingFinMat, p, 3.18, 4.42);
      const westFin  = box(0.18, 0.58, 0.48, coolingFinMat, -4.42, 3.18, p);
      const eastFin  = box(0.18, 0.58, 0.48, coolingFinMat, 4.42, 3.18, p);
      cpu.add(northFin, southFin, westFin, eastFin);
    }

    // Exposed silicon die with a high-contrast etched top texture.
    const dieTex = makeCpuTexture();
    const dieTopMat = new THREE.MeshBasicMaterial({ map: dieTex });
    const die = new THREE.Mesh(
      new THREE.BoxGeometry(7.8, 0.52, 7.8),
      [M.silicon, M.silicon, dieTopMat, M.silicon, M.silicon, M.silicon]
    );
    die.position.y = 3.16;
    cpu.add(die);

    // Orbital traces around, not across, the exposed processor surface.
    const ringGeo = new THREE.TorusGeometry(6.25, 0.075, 8, 96);
    const trimRing = new THREE.Mesh(ringGeo, M.lime);
    trimRing.rotation.x = Math.PI / 2;
    trimRing.position.y = 3.02;
    cpu.add(trimRing);

    const ring2Geo = new THREE.TorusGeometry(5.58, 0.045, 8, 88);
    const innerRing = new THREE.Mesh(ring2Geo, M.cyan);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.y = 3.04;
    cpu.add(innerRing);

    // Capacitor array around socket (16 positions in a ring)
    const capGeo    = new THREE.CylinderGeometry(0.38, 0.38, 1.50, 12);
    const capMat    = new THREE.MeshStandardMaterial({ color: 0x1a2b40, roughness: 0.35, metalness: 0.70 });
    const capTopGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.10, 12);
    const capTopMat = new THREE.MeshStandardMaterial({ color: 0x60a5fa, roughness: 0.28, metalness: 0.88, emissive: 0x1e3a8a, emissiveIntensity: 0.4 });
    const capRing = 7.8;
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const cx = Math.cos(angle) * capRing;
      const cz = Math.sin(angle) * capRing;
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(cx, 0.75, cz);
      cpu.add(cap);
      const capTop = new THREE.Mesh(capTopGeo, capTopMat);
      capTop.position.set(cx, 1.56, cz);
      cpu.add(capTop);
    }

    // MOSFET power regulators (8 rectangular packages around socket)
    const mfGeo = new THREE.BoxGeometry(1.4, 0.55, 1.0);
    const mfMat = new THREE.MeshStandardMaterial({ color: 0x0c1625, roughness: 0.30, metalness: 0.88 });
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
      const mx = Math.cos(angle) * 9.2;
      const mz = Math.sin(angle) * 9.2;
      const mf = new THREE.Mesh(mfGeo, mfMat);
      mf.position.set(mx, 0.28, mz);
      mf.rotation.y = angle;
      cpu.add(mf);
    }

    // Power inductor chokes (4 large square inductors)
    const indGeo = new THREE.BoxGeometry(1.1, 0.90, 1.1);
    const indMat = new THREE.MeshStandardMaterial({ color: 0x18202e, roughness: 0.40, metalness: 0.75 });
    [[-8.5, 0.45, -8.5], [8.5, 0.45, -8.5], [-8.5, 0.45, 8.5], [8.5, 0.45, 8.5]].forEach(([ix, iy, iz]) => {
      const ind = new THREE.Mesh(indGeo, indMat);
      ind.position.set(ix, iy, iz);
      cpu.add(ind);
      // Glowing status dot on top
      const dot = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.10, 10), M.lime);
      dot.position.set(ix, iy + 0.50, iz);
      cpu.add(dot);
    });

    // ─────────────────────────────────────────────────────────────────────
    // 3. COMPUTING TOWER MODULES — solid server-rack aesthetics
    // ─────────────────────────────────────────────────────────────────────
    const MODULE_DEFS = [
      // Left-front (About sector)
      { x: -14, z: -12, w: 6.0, h: 5.2, d: 6.0, name: 'about' },
      // Right-front (Skills sector)
      { x:  14, z: -13, w: 6.2, h: 5.8, d: 6.2, name: 'skills' },
      // Left-back (Projects sector)
      { x: -16, z:  10, w: 6.4, h: 6.4, d: 6.4, name: 'projects' },
      // Right-back (Architecture sector)
      { x:  15, z:  11, w: 6.2, h: 6.8, d: 6.2, name: 'arch' },
      // Background skyline left
      { x:  -8, z: -22, w: 4.8, h: 6.6, d: 4.8, name: 'bg1' },
      // Background platforms frame the core rather than towering over it.
      { x:   0, z: -26, w: 6.2, h: 7.4, d: 6.2, name: 'bg2' },
      // Background skyline right
      { x:   8, z: -22, w: 4.8, h: 6.8, d: 4.8, name: 'bg3' },
    ];

    const moduleGroups = [];
    MODULE_DEFS.forEach(mod => {
      const g = new THREE.Group();
      g.position.set(mod.x, 0, mod.z);

      // Main chassis
      const body = new THREE.Mesh(new THREE.BoxGeometry(mod.w, mod.h, mod.d), M.chassis);
      body.position.y = mod.h / 2;
      g.add(body);

      // Front panel (slightly different shade for depth)
      const front = new THREE.Mesh(
        new THREE.BoxGeometry(mod.w * 0.88, mod.h * 0.86, 0.14), M.frontPanel
      );
      front.position.set(0, mod.h / 2, mod.d / 2 + 0.06);
      g.add(front);

      // Heatsink cap (two stepped layers)
      const cap1 = new THREE.Mesh(new THREE.BoxGeometry(mod.w * 0.85, 0.50, mod.d * 0.85), M.heatsink);
      cap1.position.y = mod.h + 0.25;
      g.add(cap1);
      const cap2 = new THREE.Mesh(new THREE.BoxGeometry(mod.w * 0.68, 0.32, mod.d * 0.68), M.heatsink);
      cap2.position.y = mod.h + 0.57;
      g.add(cap2);

      // Status light on cap
      const dot = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.14, 10), M.lime);
      dot.position.y = mod.h + 0.72;
      g.add(dot);

      // Server vent slots (horizontal lines of emissive light — lime/cyan alternating)
      const ventCount = Math.min(5, Math.floor(mod.h / 1.2));
      for (let v = 1; v <= ventCount; v++) {
        const vy   = (mod.h / (ventCount + 1)) * v;
        const vent = new THREE.Mesh(
          new THREE.BoxGeometry(mod.w * 0.78, 0.09, mod.d + 0.06),
          v % 2 === 0 ? M.limeDim : M.cyanDim
        );
        vent.position.y = vy;
        g.add(vent);
      }

      // Front-face SMD chip row
      for (let ci = -1.8; ci <= 1.8; ci += 1.2) {
        const chip = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.24, 0.20), M.silicon);
        chip.position.set(ci, mod.h * 0.22, mod.d / 2 + 0.18);
        g.add(chip);
      }

      // Side heatsink fins (on two sides for key modules)
      if (['about', 'skills', 'projects', 'arch'].includes(mod.name)) {
        const sFinGeo = new THREE.BoxGeometry(0.12, mod.h * 0.7, mod.d * 0.75);
        for (let fi = 0; fi < 5; fi++) {
          const offset = -mod.w / 2 - 0.06 - fi * 0.24;
          const fin = new THREE.Mesh(sFinGeo, M.heatsink);
          fin.position.set(offset, mod.h * 0.5, 0);
          g.add(fin);
          const fin2 = new THREE.Mesh(sFinGeo, M.heatsink);
          fin2.position.set(-offset, mod.h * 0.5, 0);
          g.add(fin2);
        }
      }

      scene.add(g);
      moduleGroups.push({ group: g, mod, baseY: g.position.y, phase: moduleGroups.length * 0.82 });
    });

    // ─────────────────────────────────────────────────────────────────────
    // 4. 3D CONDUIT PIPES & LIGHT RUNNERS
    // ─────────────────────────────────────────────────────────────────────
    // Strictly orthogonal (L-shaped) conduit curves connecting CPU to modules
    const CONDUIT_DEFS = [
      // CPU → About (left-front)
      [new THREE.Vector3(-6.5, 1.0, -3.0), new THREE.Vector3(-10.0, 1.0, -3.0),
       new THREE.Vector3(-10.0, 1.4, -9.0), new THREE.Vector3(-14.0, 1.4, -9.5)],
      // CPU → Skills (right-front)
      [new THREE.Vector3(6.5, 1.0, -3.0), new THREE.Vector3(10.0, 1.0, -3.0),
       new THREE.Vector3(10.0, 1.4, -9.5), new THREE.Vector3(13.5, 1.4, -10.0)],
      // CPU → Projects (left-back)
      [new THREE.Vector3(-6.5, 1.0, 3.0), new THREE.Vector3(-10.0, 1.0, 3.0),
       new THREE.Vector3(-10.0, 1.4, 8.0), new THREE.Vector3(-15.0, 1.4, 8.5)],
      // CPU → Arch (right-back)
      [new THREE.Vector3(6.5, 1.0, 3.0), new THREE.Vector3(10.0, 1.0, 3.0),
       new THREE.Vector3(10.0, 1.4, 8.5), new THREE.Vector3(14.0, 1.4, 9.0)],
      // Cross-link About ↔ Projects
      [new THREE.Vector3(-14, 2.6, -9), new THREE.Vector3(-14, 2.6, 8)],
      // Cross-link Skills ↔ Arch
      [new THREE.Vector3(13, 2.8, -10), new THREE.Vector3(13, 2.8, 9)],
    ];

    const conduitCurves = CONDUIT_DEFS.map(pts =>
      new THREE.CatmullRomCurve3(pts.map(p => p.clone()))
    );
    const conduitGeos = conduitCurves.map(curve => {
      const geo = new THREE.TubeGeometry(curve, 48, 0.11, 8, false);
      scene.add(new THREE.Mesh(geo, M.conduit));
      return geo;
    });

    // Light runner packets
    const runnerGeo  = new THREE.SphereGeometry(0.24, 8, 8);
    const NUM_RUN    = mobile ? 12 : 28;
    const runners    = [];
    for (let r = 0; r < NUM_RUN; r++) {
      const ci   = r % conduitCurves.length;
      const lime = r % 3 !== 0;
      const run  = new THREE.Mesh(runnerGeo, lime ? M.lime : M.cyan);
      scene.add(run);
      runners.push({
        mesh: run, curve: conduitCurves[ci],
        t: r / NUM_RUN,
        speed: 0.08 + (r % 5) * 0.022,
      });
    }

    // ─────────────────────────────────────────────────────────────────────
    // 5. HOLOGRAPHIC HUD PANELS
    // ─────────────────────────────────────────────────────────────────────
    const HUD_DEFS = [
      { title: 'ABOUT',        num: '01', lines: ['B.TECH CSE · LPU PHAGWARA', 'CGPA: 7.07', 'CLASS OF 2028'],
        x: -11.0, y: 9.5, z: -10.5, ry: 0.38 },
      { title: 'SKILLS',       num: '02', lines: ['MERN STACK · REACT.JS', 'JAVA · DSA · DFS', 'REST APIs · MONGODB'],
        x:  12.5, y: 10.2, z: -11.0, ry: -0.38 },
      { title: 'PROJECTS',     num: '03', lines: ['CAREER GUIDANCE SYSTEM', 'STOCKSENSE AI', 'MAZE SOLVER (JAVA/DFS)'],
        x: -14.5, y: 10.8, z:  8.8, ry: 0.42 },
      { title: 'ARCHITECTURE', num: '04', lines: ['DECOUPLED REST TIERS', 'RENDER CLOUD CI/CD', 'WEIGHTED-SUM SCORING'],
        x:  13.5, y: 11.0, z:  9.5, ry: -0.42 },
      { title: 'CONTACT',      num: '05', lines: ['ARYANDADWAL709@GMAIL.COM', '+91 8626963353', 'LINKEDIN · GITHUB'],
        x:   0,  y: 8.0,  z: 18.0, ry: 0 },
    ];

    const panelGeo  = new THREE.PlaneGeometry(5.5, 2.9);
    const frameGeo  = new THREE.EdgesGeometry(panelGeo);
    const hudPanels = [];
    HUD_DEFS.forEach((h, i) => {
      const tex  = makeHudTexture(h.title, h.num, h.lines);
      const mesh = new THREE.Mesh(panelGeo,
        new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.92, side: THREE.DoubleSide })
      );
      mesh.position.set(h.x, h.y, h.z);
      mesh.rotation.y = h.ry;
      mesh.rotation.x = -0.12;
      mesh.add(new THREE.LineSegments(frameGeo, M.trLime));
      scene.add(mesh);
      hudPanels.push({ mesh, baseY: h.y, phase: i * 1.3 });
    });

    // ─────────────────────────────────────────────────────────────────────
    // 6. AMBIENT PARTICLE FIELD
    // ─────────────────────────────────────────────────────────────────────
    const pCount = mobile ? 260 : 900;
    const pPos   = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 72;
      pPos[i * 3 + 1] = Math.random() * 32 + 0.3;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 72;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xa3e635, size: 0.085, transparent: true, opacity: 0.42, depthWrite: false });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ─────────────────────────────────────────────────────────────────────
    // 7. SCROLL-DRIVEN CAMERA WAYPOINTS
    // ─────────────────────────────────────────────────────────────────────
    // Each waypoint: { s: scrollRatio, pos, look }
    // Camera starts elevated-isometric, gradually descends & circles through scene
    const WAYPOINTS = [
      { s: 0.00, pos: new THREE.Vector3(20, 34, 34), look: new THREE.Vector3(-3, 1, 0)  },  // Hero
      { s: 0.18, pos: new THREE.Vector3(12, 26, 22), look: new THREE.Vector3(-8, 2, -5) }, // About
      { s: 0.36, pos: new THREE.Vector3(18, 28, 14), look: new THREE.Vector3(8, 2, -6)  }, // Skills
      { s: 0.54, pos: new THREE.Vector3(10, 22, 24), look: new THREE.Vector3(-8, 1, 7)  }, // Projects
      { s: 0.72, pos: new THREE.Vector3(20, 28, 18), look: new THREE.Vector3(8, 1, 8)   }, // Architecture
      { s: 1.00, pos: new THREE.Vector3(26, 42, 34), look: new THREE.Vector3(0, 0, 0)   }, // End
    ];

    const scrollRatio = { current: 0 };
    const mouse       = { x: 0, y: 0 };
    const curPos      = BASE_POS.clone();
    const curLook     = BASE_LOOK.clone();
    const tgtPos      = new THREE.Vector3();
    const tgtLook     = new THREE.Vector3();

    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollRatio.current = Math.min(1, Math.max(0, window.scrollY / max));
    };
    const onMouse = e => {
      if (mobile) return;
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouse, { passive: true });

    // ─────────────────────────────────────────────────────────────────────
    // 8. ANIMATION LOOP
    // ─────────────────────────────────────────────────────────────────────
    let raf = null;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const t  = clock.getElapsedTime();

      if (!reduced) {
        // The chip illumination breathes gently without washing out its surface.
        coreLight.intensity = 24 + 7 * Math.sin(t * 2.1);
        fillLow.intensity   = 6.5 + 2.0 * Math.sin(t * 1.65 + 1.2);

        // Rotate the edge traces and animate the die by a barely perceptible amount.
        trimRing.rotation.y  += dt * 0.20;
        innerRing.rotation.y -= dt * 0.28;
        die.position.y = 3.16 + 0.018 * Math.sin(t * 1.5);

        // Hardware modules get individually phased, restrained movement.
        moduleGroups.forEach(({ group, baseY, phase }) => {
          group.position.y = baseY + Math.sin(t * 0.48 + phase) * 0.035;
        });

        // Light runners travel along conduits
        runners.forEach(r => {
          r.t = (r.t + dt * r.speed) % 1.0;
          r.mesh.position.copy(r.curve.getPointAt(r.t));
        });

        // HUD panels hover sinusoidally
        hudPanels.forEach(p => {
          p.mesh.position.y = p.baseY + Math.sin(t * 1.3 + p.phase) * 0.26;
        });

        // Particles drift slowly
        particles.rotation.y += dt * 0.018;
      }

      // ── Camera scroll interpolation ──
      const s = scrollRatio.current;
      let wpA = WAYPOINTS[0], wpB = WAYPOINTS[WAYPOINTS.length - 1];
      for (let w = 0; w < WAYPOINTS.length - 1; w++) {
        if (s >= WAYPOINTS[w].s && s <= WAYPOINTS[w + 1].s) {
          wpA = WAYPOINTS[w]; wpB = WAYPOINTS[w + 1]; break;
        }
      }
      const rawFrac = wpB.s > wpA.s ? (s - wpA.s) / (wpB.s - wpA.s) : 0;
      const frac = rawFrac * rawFrac * (3 - 2 * rawFrac); // ease between camera waypoints
      tgtPos.lerpVectors(wpA.pos, wpB.pos, frac);
      tgtLook.lerpVectors(wpA.look, wpB.look, frac);

      // Mouse parallax
      if (!mobile) {
        tgtPos.x  += mouse.x * 2.8;
        tgtPos.y  += mouse.y * 1.8;
        tgtLook.x += mouse.x * 0.28;
      }

      const cameraEase = 1 - Math.exp(-dt * 4.4);
      curPos.lerp(tgtPos, cameraEase);
      curLook.lerp(tgtLook, cameraEase);
      camera.position.copy(curPos);
      camera.lookAt(curLook);

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ──
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      conduitGeos.forEach(g => g.dispose());
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
