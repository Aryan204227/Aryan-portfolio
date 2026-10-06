import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Server, Cpu, Brain, Briefcase, Star, ArrowUpRight } from 'lucide-react';

const DISCIPLINES = [
  {
    id: '01',
    title: 'Full Stack Development',
    tag: 'END-TO-END WEB APPLICATIONS',
    icon: Layers,
    projects: '3 PROJECTS',
    experience: 'MERN STACK',
    description: 'Engineering responsive single-page applications connected to robust REST APIs and persistent databases. From wireframing to cloud production deployment on Render.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Vite'],
  },
  {
    id: '02',
    title: 'Backend & API Engineering',
    tag: 'SCALABLE DISTRIBUTED SERVICES',
    icon: Server,
    projects: '2 DEPLOYMENTS',
    experience: 'NODE & REST',
    description: 'Architecting decoupled client-server micro-architectures with stateless RESTful endpoints, structured middleware, and persistent MongoDB collections.',
    stack: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'Render Cloud'],
  },
  {
    id: '03',
    title: 'Data Structures & Algorithms',
    tag: 'OPTIMIZED COMPUTATIONAL LOGIC',
    icon: Cpu,
    projects: 'JAVA ENGINE',
    experience: 'DFS & RECURSION',
    description: 'Systematic algorithmic problem solving using Java. Extensive experience with recursive backtracking, graph traversal (DFS/BFS), and Big-O computational time complexity.',
    stack: ['Java', 'DFS', 'Backtracking', 'Recursion', 'Java2D / Swing', 'OOP'],
  },
  {
    id: '04',
    title: 'AI-Driven Web Systems',
    tag: 'INTELLIGENT APPLICATION INTERFACES',
    icon: Brain,
    projects: 'STOCKSENSE AI',
    experience: 'NLP INSIGHTS',
    description: 'Integrating conversational AI engines and weighted scoring evaluation systems to extract practical insights from unstructured sentiment and user aptitude data.',
    stack: ['JavaScript', 'Sentiment Analysis', 'Chatbot UI', 'Scoring Engines'],
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="relative bg-[#0a0a0a] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-lime-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* ── Pill Badge: "✦ MY CORE EXPERTISE" (Exact Match to Screenshot 3) ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161616] border border-lime-500/30 text-lime-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(132,204,22,0.15)]"
        >
          <span className="w-4 h-4 rounded-full bg-lime-500/20 flex items-center justify-center text-[10px] text-lime-400 font-bold">
            ✦
          </span>
          <span>MY CORE EXPERTISE</span>
        </motion.div>

        {/* ── Giant Heading (Exact Match to Screenshot 3) ── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold tracking-tight text-center leading-[1.05] text-white max-w-4xl mb-16"
          style={{ fontSize: 'clamp(36px, 5.5vw, 68px)' }}
        >
          Professional disciplines engineered for high performance.
        </motion.h2>

        {/* ── Grid Layout (Matching Screenshot 3 Bento Structure) ── */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Summary Card (4 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
                Architectural focus spanning production web development, distributed backend APIs,
                and systematic algorithmic problem solving in Java.
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
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="rounded-3xl bg-[#121214] border border-white/10 p-6 sm:p-7 shadow-xl hover:border-lime-500/40 transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-lime-400 group-hover:scale-105 group-hover:bg-lime-500/20 transition-all">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-lime-300 transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-mono tracking-widest text-lime-400 uppercase font-semibold">
                          {item.tag}
                        </span>
                      </div>
                    </div>

                    {/* Metric Badges (Matching Screenshot 3) */}
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
                  <p className="text-neutral-400 text-sm font-light leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Tech stack pill strip */}
                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.06]">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] text-neutral-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
