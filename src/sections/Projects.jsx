import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, ChevronRight, RotateCcw } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { projects } = portfolioData;
const careerProject = projects.find((p) => p.id === 'career-guidance-system');
const stockProject = projects.find((p) => p.id === 'stocksense-ai');
const mazeProject = projects.find((p) => p.id === 'maze-solver');

/* ── Maze grid visual ─────────────────────────────────── */
const GRID = 10;
// Pre-defined path + walls for a convincing DFS visualization
const PATH_CELLS = new Set([0,1,2,3,13,23,22,32,42,43,44,54,64,74,73,83,93,94,95,96,97,98,99]);
const WALL_CELLS = new Set([5,7,15,17,20,25,27,35,37,45,47,50,57,60,65,70,78,80,85,87,90]);

function MazeGrid({ active }) {
  return (
    <div
      className="aspect-square w-full max-w-[320px] mx-auto grid bg-[#070912] rounded-xl border border-white/8 p-3"
      style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)`, gap: '3px' }}
    >
      {Array.from({ length: GRID * GRID }).map((_, i) => {
        const isStart = i === 0;
        const isEnd = i === GRID * GRID - 1;
        const isPath = PATH_CELLS.has(i);
        const isWall = WALL_CELLS.has(i);
        return (
          <div
            key={i}
            className="rounded-[2px] transition-all"
            style={{
              background: isStart
                ? '#34d399'
                : isEnd
                ? '#f87171'
                : isPath && active
                ? 'rgba(56,189,248,0.75)'
                : isPath
                ? 'rgba(56,189,248,0.25)'
                : isWall
                ? '#1e2333'
                : '#0d1020',
              boxShadow: isPath && active ? '0 0 6px rgba(56,189,248,0.5)' : 'none',
              transition: 'all 0.4s ease',
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Card fade-up variant ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Project section heading ─────────────────────────── */
function ProjectHeading({ number, title, tagline, date, tags, live, github, onCaseStudy, accentColor }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: accentColor }}
        >
          PROJECT {number}
        </span>
        <div className="w-8 h-px" style={{ background: accentColor }} />
        <span className="font-mono text-[10px] tracking-wider text-white/30">{date}</span>
      </div>

      <h3
        className="font-black tracking-tight text-white leading-[0.9]"
        style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
      >
        {title}
      </h3>

      <p className="text-white/55 font-light text-sm sm:text-base leading-relaxed max-w-lg">
        {tagline}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="px-3 py-1 rounded-full font-mono text-[10px] text-white/40 border border-white/8 tracking-wider"
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA row */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-slate-950 transition-all"
            style={{ background: accentColor }}
          >
            <span>LIVE DEMO</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-widest text-white border border-white/14 hover:border-white/35 hover:bg-white/5 transition-all uppercase"
        >
          <Github className="w-3.5 h-3.5" />
          <span>GITHUB</span>
        </a>
        {onCaseStudy && (
          <button
            onClick={onCaseStudy}
            className="inline-flex items-center gap-1 px-4 py-2.5 rounded-full text-xs font-mono text-white/40 hover:text-white transition-colors uppercase tracking-widest"
          >
            <span>CASE STUDY</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function Projects({ onSelectProject }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [mazeHovered, setMazeHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Analytical');

  return (
    <section id="work" className="relative bg-[#07080c]">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Section header */}
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[11px] tracking-[0.22em] text-white/30 uppercase">05 / Selected Work</span>
            <div className="flex-1 h-px bg-white/8 max-w-[60px]" />
          </div>
          <div
            className="font-black leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(44px, 7vw, 88px)' }}
          >
            <span className="text-white">SELECTED </span>
            <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.7)', WebkitTextFillColor: 'transparent' }}>
              WORK
            </span>
          </div>
          <p className="text-white/40 font-light text-base mt-4 max-w-lg">
            Three projects. Three different problems. One focus — building things that work.
          </p>
        </motion.div>
      </div>

      {/* ================================================================ */}
      {/* PROJECT 01 — CAREER GUIDANCE SYSTEM                              */}
      {/* ================================================================ */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 pb-32"
      >
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #090e1e 0%, #07080c 100%)', border: '1px solid rgba(56,189,248,0.12)' }}
        >
          {/* Accent glow */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[300px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(56,189,248,0.08) 0%, transparent 70%)' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left info */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center">
              <ProjectHeading
                number="01"
                title="CAREER GUIDANCE SYSTEM"
                tagline="An AI-driven career counselling and aptitude-analysis platform built on the MERN stack — helping students make informed career choices."
                date={careerProject.date}
                tags={careerProject.tags}
                live={careerProject.live}
                github={careerProject.github}
                onCaseStudy={() => onSelectProject(careerProject)}
                accentColor="#38bdf8"
              />
            </div>

            {/* Right: Product UI mockup */}
            <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col gap-5 border-t lg:border-t-0 lg:border-l border-white/[0.06]">
              {/* UI mockup header */}
              <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.07] pb-4">
                <div className="flex items-center gap-3 text-white/60">
                  <span className="text-[10px] tracking-widest uppercase">APTITUDE ASSESSMENT</span>
                </div>
                <span className="text-cyan-400/80 text-[10px] tracking-widest">12 Questions · 4 Domains</span>
              </div>

              {/* Assessment category selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Analytical', 'Technical', 'Creative', 'People'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="p-3 rounded-xl border text-left transition-all text-xs font-mono"
                    style={{
                      background: activeCategory === cat ? 'rgba(56,189,248,0.07)' : 'rgba(255,255,255,0.02)',
                      borderColor: activeCategory === cat ? 'rgba(56,189,248,0.35)' : 'rgba(255,255,255,0.07)',
                      color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.35)',
                    }}
                  >
                    <span className="block font-bold">{cat}</span>
                    <span className="text-[10px] text-cyan-400/60 mt-1 block">
                      {cat === 'Analytical' ? '94% Match' : cat === 'Technical' ? '91% Match' : cat === 'Creative' ? '82% Match' : '78% Match'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Result panel */}
              <div className="p-5 rounded-xl border border-white/[0.06] space-y-2" style={{ background: 'rgba(0,0,0,0.3)' }}>
                <div className="flex items-center justify-between text-[10px] font-mono text-white/30">
                  <span>RECOMMENDED TRAJECTORY</span>
                  <span className="text-cyan-400/60">22 Career Options</span>
                </div>
                <div className="font-bold text-white text-base">Software Engineering & Intelligent Systems</div>
                <p className="text-[12px] text-white/45 leading-relaxed">
                  Weighted-sum algorithm translates aptitude scores into personalized roadmaps,
                  entrance exam requirements, and career trajectory projections.
                </p>
              </div>

              {/* Metric pills */}
              <div className="grid grid-cols-3 gap-3 text-center">
                {[['12', 'Questions'], ['4', 'Domains'], ['22', 'Career Paths']].map(([val, lbl]) => (
                  <div key={lbl} className="py-3 px-2 rounded-xl border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.018)' }}>
                    <div className="font-mono font-bold text-cyan-400 text-lg">{val}</div>
                    <div className="font-mono text-[10px] text-white/30 uppercase tracking-wider">{lbl}</div>
                  </div>
                ))}
              </div>

              {/* Live URL */}
              <div className="flex items-center justify-between text-[10px] font-mono text-white/25 border-t border-white/[0.06] pt-4">
                <span>HOSTED ON RENDER CLOUD</span>
                <a
                  href={careerProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400/60 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                >
                  career-guidance-system-l855.onrender.com
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================================================================ */}
      {/* PROJECT 02 — STOCKSENSE AI                                       */}
      {/* ================================================================ */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 pb-32"
      >
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #0b0e18 0%, #07080c 100%)', border: '1px solid rgba(16,185,129,0.1)' }}
        >
          {/* Accent glow */}
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Right: AI chat mockup — on desktop this appears right */}
            <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col gap-5 order-2 lg:order-1 border-t lg:border-t-0 lg:border-r border-white/[0.06]">
              <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.07] pb-4">
                <div className="flex items-center gap-2 text-white/60">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] tracking-widest uppercase">MARKET SENTIMENT MONITOR</span>
                </div>
                <span
                  className="text-[10px] tracking-widest px-2 py-0.5 rounded-full font-bold"
                  style={{ background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.25)' }}
                >
                  BULLISH: +0.74
                </span>
              </div>

              {/* Chat simulation */}
              <div className="space-y-3">
                <div
                  className="p-4 rounded-xl text-xs font-mono text-white/55 leading-relaxed"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span className="text-[10px] text-white/25 uppercase tracking-widest block mb-1.5">USER PROMPT</span>
                  "Analyze quarterly market sentiment for semiconductor equities."
                </div>
                <div
                  className="p-4 rounded-xl text-xs font-mono text-white/75 leading-relaxed"
                  style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}
                >
                  <span className="text-[10px] text-emerald-400/60 uppercase tracking-widest block mb-1.5">STOCKSENSE AI RESPONSE</span>
                  "Sentiment Score: +0.74 (Bullish). Core factors: Enterprise AI hardware demand and data center cloud expansion guidance."
                </div>
              </div>

              {/* Architecture info */}
              <div
                className="p-4 rounded-xl flex items-center justify-between text-[10px] font-mono"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-white/30">ARCHITECTURE</span>
                <span className="text-emerald-400/70">Decoupled Client-Server · Render Cloud</span>
              </div>
            </div>

            {/* Left info */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center order-1 lg:order-2">
              <ProjectHeading
                number="02"
                title="STOCKSENSE AI"
                tagline="An AI-powered stock market sentiment-analysis chatbot built on a decoupled client-server architecture."
                date={stockProject.date}
                tags={stockProject.tags}
                live={stockProject.live}
                github={stockProject.github}
                onCaseStudy={() => onSelectProject(stockProject)}
                accentColor="#10b981"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================================================================ */}
      {/* PROJECT 03 — MAZE SOLVER                                         */}
      {/* ================================================================ */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 pb-32"
      >
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #0a0b15 0%, #07080c 100%)', border: '1px solid rgba(245,158,11,0.1)' }}
        >
          {/* Accent glow */}
          <div
            className="absolute top-0 right-0 w-[400px] h-[300px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 70%)' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left info */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center">
              <ProjectHeading
                number="03"
                title="MAZE SOLVER"
                tagline="A Java desktop maze generator and DFS-based pathfinding visualizer with real-time animation and execution diagnostics."
                date={mazeProject.date}
                tags={mazeProject.tags}
                live={null}
                github={mazeProject.github}
                onCaseStudy={() => onSelectProject(mazeProject)}
                accentColor="#f59e0b"
              />

              {/* No live demo notice */}
              <p className="font-mono text-[10px] text-white/25 mt-4 uppercase tracking-widest">
                Desktop app — no browser demo available
              </p>
            </div>

            {/* Right: Maze visualization */}
            <div
              className="lg:col-span-7 p-8 sm:p-10 flex flex-col gap-5 border-t lg:border-t-0 lg:border-l border-white/[0.06]"
              onMouseEnter={() => setMazeHovered(true)}
              onMouseLeave={() => setMazeHovered(false)}
            >
              {/* Maze header */}
              <div className="flex items-center justify-between text-[10px] font-mono">
                <div className="flex items-center gap-2 text-white/50">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: mazeHovered ? '#38bdf8' : '#4b5563', transition: 'background 0.3s' }}
                  />
                  <span className="uppercase tracking-widest">DFS &amp; BACKTRACKING GRID</span>
                </div>
                <span className="text-amber-400/60 uppercase tracking-widest">
                  {mazeHovered ? 'EXPLORING PATH...' : 'HOVER TO SIMULATE'}
                </span>
              </div>

              {/* Maze grid */}
              <MazeGrid active={mazeHovered} />

              {/* Legend */}
              <div className="flex items-center justify-between text-[10px] font-mono">
                <div className="flex items-center gap-4">
                  {[
                    ['#34d399', 'START (0,0)'],
                    ['#f87171', 'END (9,9)'],
                    ['rgba(56,189,248,0.6)', 'DFS PATH'],
                    ['#1e2333', 'WALL'],
                  ].map(([color, label]) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                      <span className="text-white/30 tracking-wider">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified benchmarks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-white/[0.06]">
                {[
                  ['15×15', 'GRID SIZE'],
                  ['172', 'NODES VISITED'],
                  ['79', 'RECURSION DEPTH'],
                  ['17.259s', 'SOLVE TIME'],
                ].map(([val, lbl]) => (
                  <div key={lbl} className="text-center py-3 px-2 rounded-xl border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.018)' }}>
                    <div className="font-mono font-bold text-amber-400/80 text-sm">{val}</div>
                    <div className="font-mono text-[9px] text-white/25 uppercase tracking-wider mt-1">{lbl}</div>
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
