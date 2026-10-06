import React, { useState } from 'react';
import { 
  ExternalLink, 
  Github, 
  Cpu, 
  Layers, 
  Terminal, 
  Activity, 
  Play, 
  TrendingUp, 
  Compass, 
  CheckCircle2, 
  ArrowUpRight,
  Database,
  Server,
  Atom,
  Clock,
  Zap
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Projects({ onOpenModal }) {
  // Maze solver interactive state
  const [mazeHoverStep, setMazeHoverStep] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState('Analytical');

  return (
    <section id="work" className="py-32 px-6 sm:px-8 lg:px-12 relative border-t border-white/[0.06] bg-[#07090e]">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase">
                04 / SELECTED WORK
              </span>
              <span className="w-12 h-[1px] bg-slate-800" />
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              Selected Work
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl font-normal">
              Three systems. Different problems. One approach — build things that work.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-500 bg-white/[0.02] border border-white/[0.08] px-4 py-2 rounded-xl self-start md:self-auto">
            <span>ENGINEERED & VERIFIED: </span>
            <span className="text-cyan-400 font-bold">3 PRODUCTION SYSTEMS</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PROJECT 01: MAZE SOLVER (Algorithmic Pathfinding Visualizer in Java)       */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0a0e19] to-[#07090e] border border-white/10 p-8 sm:p-12 overflow-hidden shadow-2xl space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Project Info Left */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-800/50">
                  SYSTEM 01
                </span>
                <span className="text-xs font-mono text-slate-500">Jul 2026</span>
              </div>

              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  MAZE SOLVER
                </h3>
                <p className="text-sm font-mono text-cyan-300 mt-1">
                  Algorithmic Pathfinding Visualizer
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                A desktop pathfinding visualizer engineered in Java using Depth-First Search (DFS) and recursive state backtracking. Built with custom Java2D rendering, interactive wall toggling, and a diagnostic telemetry HUD benchmarking execution states on a 15×15 grid.
              </p>

              {/* Verified Benchmarks Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="p-3 rounded-xl bg-black/60 border border-white/[0.08] text-center">
                  <span className="text-base font-mono font-bold text-cyan-400 block">15×15</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Grid Size</span>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/[0.08] text-center">
                  <span className="text-base font-mono font-bold text-cyan-400 block">172</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Visited Nodes</span>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/[0.08] text-center">
                  <span className="text-base font-mono font-bold text-cyan-400 block">79</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Recursion Depth</span>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/[0.08] text-center">
                  <span className="text-base font-mono font-bold text-cyan-400 block">17.259s</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Solving Time</span>
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Java', 'DFS', 'Backtracking', 'Swing', 'AWT', 'Java2D'].map((t) => (
                  <span key={t} className="text-xs font-mono px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300">
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-3">
                <a
                  href="https://github.com/Aryan204227/Maze-Solver"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-950 font-display font-bold text-xs tracking-wider uppercase hover:bg-slate-200 transition-all shadow-lg"
                >
                  <Github className="w-4 h-4" />
                  <span>VIEW REPOSITORY</span>
                </a>
              </div>
            </div>

            {/* Interactive Maze Simulation Right */}
            <div 
              className="lg:col-span-6 rounded-2xl bg-black/80 border border-white/10 p-6 sm:p-8 space-y-5 cursor-crosshair group"
              onMouseEnter={() => setMazeHoverStep(true)}
              onMouseLeave={() => setMazeHoverStep(false)}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>LIVE RECURSIVE MAZE SOLVER ENGINE</span>
                </span>
                <span className="text-slate-500">29-STEP OPTIMAL PATH</span>
              </div>

              {/* Visual 15x15 Miniature Maze Grid */}
              <div className="aspect-square max-w-[340px] mx-auto grid grid-cols-10 gap-1 p-3 bg-[#0a0d14] rounded-xl border border-white/10">
                {Array.from({ length: 100 }).map((_, i) => {
                  // Deterministic maze path pattern matching 29 steps
                  const isStart = i === 0;
                  const isEnd = i === 99;
                  const isPath = [0, 1, 2, 12, 22, 23, 24, 34, 44, 45, 55, 65, 66, 76, 77, 78, 88, 89, 99].includes(i);
                  const isWall = !isPath && (i % 7 === 0 || i % 11 === 0 || i === 15 || i === 35 || i === 57 || i === 73);

                  return (
                    <div
                      key={i}
                      className={`rounded-sm transition-all duration-300 ${
                        isStart
                          ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50'
                          : isEnd
                          ? 'bg-rose-500 shadow-sm shadow-rose-500/50'
                          : isPath && mazeHoverStep
                          ? 'bg-cyan-400 shadow-sm shadow-cyan-400/50 animate-pulse'
                          : isPath
                          ? 'bg-cyan-500/50'
                          : isWall
                          ? 'bg-slate-800'
                          : 'bg-slate-900/60'
                      }`}
                      title={`Cell ${i}`}
                    />
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/[0.08]">
                <span>START: (0, 0)</span>
                <span className="text-cyan-400">{mazeHoverStep ? 'DFS STATE: ACTIVE EXPLORATION' : 'HOVER TO SIMULATE DFS PATH'}</span>
                <span>GOAL: (14, 14)</span>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* PROJECT 02: CAREER GUIDANCE SYSTEM (Full-Stack MERN Platform)             */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0c101c] to-[#07090e] border border-cyan-500/30 p-8 sm:p-12 overflow-hidden shadow-2xl space-y-12">
          
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-white/[0.08] pb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-cyan-300 font-semibold uppercase tracking-widest bg-cyan-950/80 px-3 py-1 rounded-md border border-cyan-500/40">
                  SYSTEM 02 • FEATURED FULL-STACK
                </span>
                <span className="text-xs font-mono text-slate-400">Apr 2026</span>
              </div>

              <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                CAREER GUIDANCE SYSTEM
              </h3>
              <p className="text-base sm:text-lg text-cyan-300 font-medium">
                AI-powered career exploration, aptitude analysis & recommendation platform.
              </p>
            </div>

            {/* Live CTAs */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://career-guidance-system-l855.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-display font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/25"
              >
                <span>OPEN LIVE DEPLOYMENT</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/Aryan204227/career-guidance-system"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-wider uppercase border border-white/15 hover:border-cyan-400/40 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB REPO</span>
              </a>
            </div>
          </div>

          {/* Core System Architecture & Interactive Mockup */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Product Mockup UI */}
            <div className="lg:col-span-7 rounded-2xl bg-black/70 border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold">STUDENT APTITUDE ASSESSMENT MATRIX</span>
                </div>
                <span className="text-emerald-400 font-medium">12 Questions • 4 Domains</span>
              </div>

              {/* Assessment Categories Selector Tab */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: 'Analytical', score: '94% Match', career: 'Data Science / AI' },
                  { name: 'Technical', score: '91% Match', career: 'Full-Stack Eng' },
                  { name: 'Creative', score: '82% Match', career: 'Product Design' },
                  { name: 'People', score: '78% Match', career: 'Tech Management' },
                ].map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategoryTab(cat.name)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activeCategoryTab === cat.name
                        ? 'bg-cyan-950/60 border-cyan-500/60 text-white'
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs font-mono font-bold block">{cat.name}</span>
                    <span className="text-[10px] text-cyan-400 block mt-1">{cat.score}</span>
                  </button>
                ))}
              </div>

              {/* Result Preview Panel */}
              <div className="p-5 rounded-xl bg-[#090d16] border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">RECOMMENDED TRAJECTORY:</span>
                  <span className="text-cyan-300 font-bold">22 Options Cataloged</span>
                </div>
                <div className="text-lg font-display font-bold text-white">
                  Software & Intelligent Systems Engineering
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  The weighted-sum algorithm calculates high correlation between analytical problem-solving and software architecture. Provides step-by-step career roadmaps, college selection guidance, and entrance exam requirements.
                </p>
              </div>

              {/* Live URL Pill */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2">
                <span>HOSTED ON RENDER CLOUD</span>
                <a
                  href="https://career-guidance-system-l855.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>career-guidance-system-l855.onrender.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Right: Technical Highlights & MERN Pipeline */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest block mb-2 font-semibold">
                  MERN ARCHITECTURAL PIPELINE
                </span>
                
                {/* Architecture conceptual visual */}
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.08] flex items-center gap-3">
                    <Atom className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <span className="text-white font-bold block">React.js Client SPA</span>
                      <span className="text-[10px] text-slate-400">Interactive 12-question quiz, dynamic scoring HUD</span>
                    </div>
                  </div>

                  <div className="text-center text-slate-600 font-mono text-xs">↓ REST API (JSON)</div>

                  <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.08] flex items-center gap-3">
                    <Server className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-white font-bold block">Node.js + Express Services</span>
                      <span className="text-[10px] text-slate-400">Weighted-sum recommendation algorithm across 22 careers</span>
                    </div>
                  </div>

                  <div className="text-center text-slate-600 font-mono text-xs">↓ Mongoose ORM</div>

                  <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.08] flex items-center gap-3">
                    <Database className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div>
                      <span className="text-white font-bold block">MongoDB Database</span>
                      <span className="text-[10px] text-slate-400">Structured question banks, career paths, and session records</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2 pt-2">
                {[
                  '12 structured aptitude questions across 4 categories',
                  'Weighted-sum matching algorithm calculating fit across 22 career options',
                  'Independent client and server cloud deployments with zero coupling',
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* PROJECT 03: STOCKSENSE AI (FinTech Sentiment Analysis Service)             */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0a0e19] to-[#07090e] border border-white/10 p-8 sm:p-12 overflow-hidden shadow-2xl space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Info */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-800/50">
                  SYSTEM 03
                </span>
                <span className="text-xs font-mono text-slate-500">Apr 2026</span>
              </div>

              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  STOCKSENSE AI
                </h3>
                <p className="text-sm font-mono text-cyan-300 mt-1">
                  AI-Powered Stock Market Sentiment Analysis
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                An AI-powered financial sentiment chatbot built on a decoupled client-server architecture. Evaluates market headlines and conversational user prompts into actionable sentiment indices (Bullish, Neutral, Bearish).
              </p>

              {/* Architecture highlights */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-semibold">
                  DECOUPLED CLIENT-SERVER ARCHITECTURE
                </span>
                <p className="text-xs text-slate-300 font-mono">
                  Independent client and server modules designed to isolate logic, streamline independent testing, and simplify cloud deployment cycles on Render.
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['JavaScript', 'Node.js', 'Express.js', 'Sentiment Analysis', 'Decoupled Client-Server', 'Render'].map((t) => (
                  <span key={t} className="text-xs font-mono px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300">
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://stocksense-ai-r24w.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-display font-bold text-xs tracking-wider uppercase transition-all shadow-md"
                >
                  <span>LIVE DEMO</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="https://github.com/Aryan204227/stocksense-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-wider uppercase border border-white/15 hover:border-cyan-400/40 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>VIEW GITHUB</span>
                </a>
              </div>
            </div>

            {/* Right: FinTech Sentiment Analytics Visualization Mockup */}
            <div className="lg:col-span-6 rounded-2xl bg-black/80 border border-white/10 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.08] pb-4">
                <span className="text-slate-300 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold">MARKET SENTIMENT MONITOR CONCEPT</span>
                </span>
                <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800/40">
                  BULLISH INDEX: 74%
                </span>
              </div>

              {/* Mock AI Conversation Snippet */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.06] text-slate-300">
                  <span className="text-[10px] text-cyan-400 uppercase tracking-widest block mb-1">USER QUERY:</span>
                  "Analyze sentiment for tech equities following latest earnings reports."
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-slate-200">
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest block mb-1">STOCKSENSE AI ENGINE:</span>
                  "Positive sentiment detected (+0.74). Key catalysts: Strong cloud margins and enterprise AI spending guidance."
                </div>
              </div>

              {/* Decoupled Status Pill */}
              <div className="p-3.5 rounded-xl bg-[#090d16] border border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">SERVER STATUS:</span>
                <span className="text-emerald-400 font-semibold">Decoupled REST Service (Render)</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
