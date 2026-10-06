import React, { useRef, useCallback, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Layers, Server, Cpu, Brain, Briefcase, Star } from 'lucide-react';

const DISCIPLINES = [
  {
    id: '01',
    title: 'Full Stack Web Development',
    tag: 'MERN STACK WEB APPLICATIONS',
    icon: Layers,
    projects: '3 PROJECTS',
    experience: 'MERN STACK',
    description: 'Building complete web applications from the frontend UI to backend APIs and database. I use React for the client, Node.js/Express for the server, and MongoDB for data storage.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Vite'],
  },
  {
    id: '02',
    title: 'REST API & Backend Development',
    tag: 'CLIENT-SERVER ARCHITECTURE',
    icon: Server,
    projects: '2 DEPLOYED APIs',
    experience: 'NODE & REST',
    description: 'Designing and building REST APIs using Node.js and Express. I structure independent client and server modules with clean separation of concerns and organized endpoints.',
    stack: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'Render'],
  },
  {
    id: '03',
    title: 'Data Structures & Algorithms',
    tag: 'JAVA — DSA & PROBLEM SOLVING',
    icon: Cpu,
    projects: 'JAVA — DSA BOOTCAMP',
    experience: 'DFS & RECURSION',
    description: 'Practising algorithmic problem solving in Java through structured DSA training and LeetCode. Core focus areas include recursion, DFS, backtracking, and array-based algorithms.',
    stack: ['Java', 'DFS', 'Backtracking', 'Recursion', 'OOP'],
  },
  {
    id: '04',
    title: 'AI-Integrated Projects',
    tag: 'AI-POWERED WEB PROJECTS',
    icon: Brain,
    projects: 'STOCKSENSE AI',
    experience: 'SENTIMENT ANALYSIS',
    description: 'Building projects that integrate AI capabilities into web applications. StockSense AI uses a client-server architecture to deliver stock sentiment analysis through a conversational interface.',
    stack: ['JavaScript', 'Node.js', 'Express.js', 'Sentiment Analysis'],
  },
];

function ExpertiseCard({ item, idx, IconComp }) {
  const cardRef = useRef(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [glowVisible, setGlowVisible] = useState(false);

  const rawRX = useMotionValue(0);
  const rawRY = useMotionValue(0);
  const rotateX = useSpring(rawRX, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(rawRY, { stiffness: 220, damping: 22 });

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  const handleMouseMove = useCallback((e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    rawRY.set((nx - 0.5) * 8);
    rawRX.set(-(ny - 0.5) * 8);
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, [rawRX, rawRY, isMobile]);

  const handleMouseLeave = useCallback(() => {
    rawRX.set(0);
    rawRY.set(0);
    setGlowVisible(false);
  }, [rawRX, rawRY]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformPerspective: 900,
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setGlowVisible(true)}
      onMouseLeave={handleMouseLeave}
      className="rounded-3xl bg-[#121214] border border-white/10 p-6 sm:p-7 shadow-xl hover:border-lime-500/40 hover:shadow-[0_12px_40px_rgba(132,204,22,0.1)] transition-[border-color,box-shadow] duration-300 group relative overflow-hidden"
    >
      {glowVisible && !isMobile && (
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 260,
            height: 260,
            left: glowPos.x - 130,
            top: glowPos.y - 130,
            background: 'radial-gradient(circle, rgba(132,204,22,0.12) 0%, transparent 65%)',
            zIndex: 0,
          }}
        />
      )}

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 relative z-[1]">
        <div className="flex items-center gap-3.5">
          <motion.div 
            whileHover={{ scale: 1.12, rotate: 4 }}
            className="w-11 h-11 rounded-2xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-lime-400 group-hover:bg-lime-500/20 transition-all cursor-default"
          >
            <IconComp className="w-5 h-5" />
          </motion.div>
          <div>
            <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-lime-300 transition-colors">
              {item.title}
            </h4>
            <span className="text-[10px] font-mono tracking-widest text-lime-400 uppercase font-semibold">
              {item.tag}
            </span>
          </div>
        </div>

        {/* Metric Badges */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18181c] border border-white/10 text-[10px] font-mono text-neutral-300">
            <Briefcase className="w-3 h-3 text-lime-400" />
            <span>{item.projects}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18181c] border border-white/10 text-[10px] font-mono text-neutral-300">
            <Star className="w-3 h-3 text-orange-400" />
            <span>{item.experience}</span>
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-neutral-400 text-sm font-light leading-relaxed mb-4 relative z-[1]">
        {item.description}
      </p>

      {/* Tech stack pill strip */}
      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.06] relative z-[1]">
        {item.stack.map((tech, i) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.1 + i * 0.04 }}
            className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] text-neutral-300 border border-white/5"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Expertise() {
  return (
    <section id="expertise" className="relative bg-[#0a0a0a] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-lime-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161616] border border-lime-500/30 text-lime-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(132,204,22,0.15)]"
        >
          <span className="w-4 h-4 rounded-full bg-lime-500/20 flex items-center justify-center text-[10px] text-lime-400 font-bold">✦</span>
          <span>MY CORE FOCUS AREAS</span>
        </motion.div>

        {/* Honest heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold tracking-tight text-center leading-[1.05] text-white max-w-4xl mb-16"
          style={{ fontSize: 'clamp(36px, 5.5vw, 68px)' }}
        >
          What I build and what I focus on.
        </motion.h2>

        {/* Bento Structure */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 rounded-3xl bg-[#121214] border border-white/10 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div>
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-2">
                DISCIPLINES
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight mb-4">
                Expertise Areas
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-light">
                My focus areas as a B.Tech CSE student: full stack web development with MERN, REST APIs with Node.js and Express, and algorithmic problem solving with Java and DSA.
              </p>
            </div>

            <div className="pt-8 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">TOTAL DOMAINS</span>
                <span className="text-lime-400 font-bold">04 DISCIPLINES</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">CORE FOCUS</span>
                <span className="text-white">MERN &amp; JAVA DSA</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">CGPA (LPU)</span>
                <span className="text-orange-400 font-bold">7.07 / 10</span>
              </div>
            </div>
          </motion.div>

          {/* Right Disciplines List (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            {DISCIPLINES.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <ExpertiseCard key={item.id} item={item} idx={idx} IconComp={IconComp} />
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
