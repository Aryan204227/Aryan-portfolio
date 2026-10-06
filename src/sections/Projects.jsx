import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { projects } = portfolioData;
const careerP = projects.find((p) => p.id === 'career-guidance-system');
const stockP  = projects.find((p) => p.id === 'stocksense-ai');
const mazeP   = projects.find((p) => p.id === 'maze-solver');

/* ── Reusable tech chip ───────────────────────── */
const Chip = ({ label }) => (
  <span className="px-3 py-1 rounded-full font-mono text-[10px] tracking-wider text-white/40 border border-white/[0.08]">
    {label}
  </span>
);

/* ── Section/project fade-in ─────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Maze DFS mini-grid ───────────────────────── */
const PATH = new Set([0,1,2,3,13,23,22,32,42,43,44,54,64,74,73,83,93,94,95,96,97,98,99]);
const WALL = new Set([5,7,15,17,25,27,35,37,45,47,57,67,77]);

function MazeDemoGrid({ active }) {
  return (
    <div
      className="grid rounded-xl overflow-hidden border border-white/[0.07]"
      style={{ gridTemplateColumns: 'repeat(10, 1fr)', gap: '2px', padding: '12px', background: '#060810' }}
    >
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="rounded-[2px]"
          style={{
            aspectRatio: '1',
            background:
              i === 0
                ? '#34d399'
                : i === 99
                ? '#f87171'
                : PATH.has(i) && active
                ? 'rgba(56,189,248,0.7)'
                : PATH.has(i)
                ? 'rgba(56,189,248,0.2)'
                : WALL.has(i)
                ? '#1c2237'
                : '#0c1020',
            boxShadow: PATH.has(i) && active && i !== 0 && i !== 99
              ? '0 0 5px rgba(56,189,248,0.4)'
              : 'none',
            transition: 'background 0.35s ease, box-shadow 0.35s ease',
          }}
        />
      ))}
    </div>
  );
}

/* ── Project meta row ─────────────────────────── */
function ProjectMeta({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[9px] tracking-[0.2em] text-white/25 uppercase">{label}</span>
      <span className="text-white/60 text-xs font-light">{value}</span>
    </div>
  );
}

export default function Projects({ onSelectProject }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const [mazeActive, setMazeActive] = useState(false);
  const [activeTab, setActiveTab] = useState('Analytical');

  return (
    <section id="work" className="relative bg-[#07080c]">
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)' }} />

      {/* ── Section header ── */}
      <div ref={headerRef} className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-[11px] tracking-[0.22em] text-white/25 uppercase block mb-5">
            05 / Selected Work
          </span>
          <div style={{ fontSize: 'clamp(44px, 7vw, 92px)' }} className="font-black tracking-tight leading-[0.9]">
            <span className="text-white">SELECTED </span>
            <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.65)', WebkitTextFillColor: 'transparent' }}>WORK</span>
          </div>
          <p className="text-white/35 font-light text-sm mt-4 max-w-md">
            Three projects. Three different problems. Built to work.
          </p>
        </motion.div>
      </div>

      {/* ================================================================
          PROJECT 01 — CAREER GUIDANCE SYSTEM
          Layout: info LEFT · visual RIGHT
          Accent: cyan
      ================================================================ */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 pb-32"
      >
        {/* Giant project number */}
        <div
          className="font-black leading-none tracking-tighter select-none pointer-events-none mb-6"
          style={{
            fontSize: 'clamp(80px, 14vw, 160px)',
            WebkitTextStroke: '1px rgba(255,255,255,0.07)',
            WebkitTextFillColor: 'transparent',
          }}
          aria-hidden
        >
          01
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(56,189,248,0.1)', background: 'rgba(255,255,255,0.015)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: info */}
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col gap-6">
              {/* Category + date */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-cyan-400/70">
                  FULL STACK · MERN
                </span>
                <span className="font-mono text-[10px] text-white/20">{careerP.date}</span>
              </div>

              {/* Title */}
              <div>
                <h3
                  className="font-black text-white tracking-tight leading-[0.92]"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
                >
                  CAREER GUIDANCE<br />SYSTEM
                </h3>
              </div>

              {/* Description */}
              <p className="text-white/50 font-light text-sm leading-[1.75] max-w-sm">
                An AI-driven career counselling and aptitude-analysis platform
                on the MERN stack — 12 questions, 4 domains, 22 career trajectories,
                weighted matching algorithm, roadmaps, and PDF reports.
              </p>

              {/* Meta grid */}
              <div className="grid grid-cols-2 gap-5 py-5 border-t border-b border-white/[0.06]">
                <ProjectMeta label="Architecture" value="MERN Stack" />
                <ProjectMeta label="Deployment" value="Render Cloud" />
                <ProjectMeta label="Questions" value="12 Aptitude Qs" />
                <ProjectMeta label="Career Paths" value="22 Options" />
              </div>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-2">
                {careerP.tags.map((t) => <Chip key={t} label={t} />)}
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={careerP.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="VISIT"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[#07080c] font-bold text-xs tracking-widest uppercase transition-opacity"
                  style={{ background: '#38bdf8' }}
                >
                  LIVE DEMO <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={careerP.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="CODE"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white text-xs tracking-widest uppercase font-mono hover:border-white/35 hover:bg-white/[0.04] transition-all"
                >
                  <Github className="w-3.5 h-3.5" /> GITHUB
                </a>
              </div>
            </div>

            {/* Right: product UI mockup */}
            <div
              className="p-8 sm:p-10 flex flex-col gap-5 border-t lg:border-t-0 lg:border-l border-white/[0.06]"
              style={{ background: 'rgba(0,0,0,0.25)' }}
            >
              {/* Mockup chrome bar */}
              <div className="flex items-center gap-2 pb-4 border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="flex-1 mx-3 h-5 rounded-md bg-white/[0.04] flex items-center px-2">
                  <span className="font-mono text-[9px] text-white/20 tracking-wider">career-guidance-system-l855.onrender.com</span>
                </div>
              </div>

              {/* Category selector */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { name: 'Analytical', match: '94%' },
                  { name: 'Technical',  match: '91%' },
                  { name: 'Creative',   match: '82%' },
                  { name: 'People',     match: '78%' },
                ].map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveTab(cat.name)}
                    className="p-2.5 rounded-xl text-left transition-all text-xs"
                    style={{
                      background: activeTab === cat.name ? 'rgba(56,189,248,0.08)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${activeTab === cat.name ? 'rgba(56,189,248,0.3)' : 'rgba(255,255,255,0.06)'}`,
                    }}
                  >
                    <span className="font-mono font-bold text-[10px] block"
                      style={{ color: activeTab === cat.name ? '#fff' : 'rgba(255,255,255,0.35)' }}>
                      {cat.name}
                    </span>
                    <span className="text-cyan-400/50 text-[9px] block mt-0.5">{cat.match}</span>
                  </button>
                ))}
              </div>

              {/* Result panel */}
              <div
                className="flex-1 p-5 rounded-xl space-y-3"
                style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="font-mono text-[9px] tracking-widest text-white/25 uppercase">
                  RECOMMENDED CAREER TRAJECTORY
                </div>
                <div className="font-bold text-white text-sm">
                  Software Engineering & Intelligent Systems
                </div>
                <p className="text-white/40 text-[11px] font-light leading-relaxed">
                  Weighted-sum algorithm maps aptitude scores across 22 career trajectories,
                  generating personalized roadmaps and entrance guidance.
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2">
                {[['12', 'Questions'], ['4', 'Domains'], ['22', 'Paths']].map(([v, l]) => (
                  <div
                    key={l}
                    className="text-center py-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <div className="font-mono font-bold text-cyan-400 text-base">{v}</div>
                    <div className="font-mono text-[9px] text-white/25 uppercase tracking-widest">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================================================================
          PROJECT 02 — STOCKSENSE AI
          Layout: visual LEFT · info RIGHT
          Accent: emerald
      ================================================================ */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 pb-32"
      >
        <div
          className="font-black leading-none tracking-tighter select-none pointer-events-none mb-6"
          style={{
            fontSize: 'clamp(80px, 14vw, 160px)',
            WebkitTextStroke: '1px rgba(255,255,255,0.07)',
            WebkitTextFillColor: 'transparent',
          }}
          aria-hidden
        >
          02
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(16,185,129,0.1)', background: 'rgba(255,255,255,0.015)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: AI chat mockup */}
            <div
              className="p-8 sm:p-10 flex flex-col gap-4 order-2 lg:order-1 border-t lg:border-t-0 lg:border-r border-white/[0.06]"
              style={{ background: 'rgba(0,0,0,0.25)' }}
            >
              {/* Terminal header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'pulse 2s infinite' }} />
                  <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                    MARKET SENTIMENT ENGINE
                  </span>
                </div>
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded-full font-bold"
                  style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}
                >
                  BULLISH +0.74
                </span>
              </div>

              {/* Chat bubbles */}
              <div className="space-y-3 flex-1">
                <div
                  className="p-4 rounded-xl font-mono text-[11px] text-white/50 leading-relaxed"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <span className="text-[9px] text-white/20 uppercase tracking-widest block mb-1.5">USER</span>
                  "Analyze semiconductor equity sentiment for Q3."
                </div>

                <div
                  className="p-4 rounded-xl font-mono text-[11px] text-white/65 leading-relaxed"
                  style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.12)' }}
                >
                  <span className="text-[9px] text-emerald-400/50 uppercase tracking-widest block mb-1.5">STOCKSENSE AI</span>
                  Sentiment Score: +0.74 (Bullish). Drivers: AI hardware demand, data center expansion, enterprise cloud growth guidance.
                </div>
              </div>

              {/* Server status */}
              <div
                className="flex items-center justify-between p-3 rounded-xl font-mono text-[10px]"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <span className="text-white/25">ARCHITECTURE</span>
                <span style={{ color: '#34d399', opacity: 0.6 }}>Decoupled · Node.js · Render</span>
              </div>

              <a
                href={stockP.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-white/25 hover:text-white/50 flex items-center gap-1 transition-colors"
              >
                stocksense-ai-r24w.onrender.com <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Right: info */}
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col gap-6 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: '#34d399', opacity: 0.7 }}>
                  AI · FINTECH
                </span>
                <span className="font-mono text-[10px] text-white/20">{stockP.date}</span>
              </div>

              <h3
                className="font-black text-white tracking-tight leading-[0.92]"
                style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
              >
                STOCKSENSE<br />AI
              </h3>

              <p className="text-white/50 font-light text-sm leading-[1.75] max-w-sm">
                AI-powered stock market sentiment-analysis chatbot on a clean
                decoupled client-server architecture. Provides contextual
                market insight through a conversational AI interface.
              </p>

              <div className="grid grid-cols-2 gap-5 py-5 border-t border-b border-white/[0.06]">
                <ProjectMeta label="Architecture" value="Decoupled" />
                <ProjectMeta label="Runtime" value="Node.js" />
                <ProjectMeta label="Deployment" value="Render Cloud" />
                <ProjectMeta label="Interface" value="AI Chatbot" />
              </div>

              <div className="flex flex-wrap gap-2">
                {stockP.tags.map((t) => <Chip key={t} label={t} />)}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={stockP.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="VISIT"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase text-[#07080c]"
                  style={{ background: '#10b981' }}
                >
                  LIVE DEMO <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={stockP.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="CODE"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white text-xs tracking-widest uppercase font-mono hover:border-white/35 hover:bg-white/[0.04] transition-all"
                >
                  <Github className="w-3.5 h-3.5" /> GITHUB
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================================================================
          PROJECT 03 — MAZE SOLVER
          Layout: info LEFT · interactive grid RIGHT
          Accent: amber
      ================================================================ */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 pb-32"
      >
        <div
          className="font-black leading-none tracking-tighter select-none pointer-events-none mb-6"
          style={{
            fontSize: 'clamp(80px, 14vw, 160px)',
            WebkitTextStroke: '1px rgba(255,255,255,0.07)',
            WebkitTextFillColor: 'transparent',
          }}
          aria-hidden
        >
          03
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(245,158,11,0.1)', background: 'rgba(255,255,255,0.015)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: info */}
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-amber-400/70">
                  JAVA · ALGORITHMIC
                </span>
                <span className="font-mono text-[10px] text-white/20">{mazeP.date}</span>
              </div>

              <h3
                className="font-black text-white tracking-tight leading-[0.92]"
                style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
              >
                MAZE<br />SOLVER
              </h3>

              <p className="text-white/50 font-light text-sm leading-[1.75] max-w-sm">
                Desktop Java application visualizing DFS-based pathfinding with
                real-time animation and live execution diagnostics. Benchmarked
                on a 15×15 grid: 172 nodes visited, 79 recursion depth, 17.259s solve time.
              </p>

              <div className="grid grid-cols-2 gap-5 py-5 border-t border-b border-white/[0.06]">
                <ProjectMeta label="Grid" value="15×15" />
                <ProjectMeta label="Nodes Visited" value="172" />
                <ProjectMeta label="Recursion Depth" value="79 levels" />
                <ProjectMeta label="Solve Time" value="17.259s" />
              </div>

              <div className="flex flex-wrap gap-2">
                {mazeP.tags.map((t) => <Chip key={t} label={t} />)}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={mazeP.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="CODE"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase text-[#07080c]"
                  style={{ background: '#f59e0b' }}
                >
                  <Github className="w-3.5 h-3.5" /> GITHUB REPO
                </a>
                <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
                  Desktop app — no web demo
                </span>
              </div>
            </div>

            {/* Right: interactive DFS maze */}
            <div
              className="p-8 sm:p-10 flex flex-col gap-5 border-t lg:border-t-0 lg:border-l border-white/[0.06] cursor-crosshair"
              style={{ background: 'rgba(0,0,0,0.25)' }}
              onMouseEnter={() => setMazeActive(true)}
              onMouseLeave={() => setMazeActive(false)}
              data-cursor={mazeActive ? 'DFS' : 'HOVER'}
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full transition-colors duration-400"
                    style={{ background: mazeActive ? '#38bdf8' : '#374151' }}
                  />
                  <span className="font-mono text-[10px] tracking-widest text-white/35 uppercase">
                    DFS PATHFINDING GRID
                  </span>
                </div>
                <span className="font-mono text-[10px] text-amber-400/50 uppercase tracking-widest">
                  {mazeActive ? 'EXPLORING...' : 'HOVER TO SIMULATE'}
                </span>
              </div>

              <MazeDemoGrid active={mazeActive} />

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4">
                {[
                  ['#34d399', 'START'],
                  ['#f87171', 'END'],
                  ['rgba(56,189,248,0.6)', 'PATH'],
                  ['#1c2237', 'WALL'],
                ].map(([color, label]) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                    <span className="font-mono text-[9px] text-white/25 tracking-widest uppercase">{label}</span>
                  </div>
                ))}
              </div>

              {/* Benchmark pills */}
              <div className="grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-4">
                {[
                  ['29 STEPS', 'Optimal path'],
                  ['172 NODES', 'Visited'],
                  ['79', 'Max recursion depth'],
                  ['17.259s', 'Benchmark time'],
                ].map(([v, l]) => (
                  <div
                    key={l}
                    className="py-2.5 px-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <div className="font-mono font-bold text-amber-400/80 text-xs">{v}</div>
                    <div className="font-mono text-[9px] text-white/25 uppercase tracking-wider mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
