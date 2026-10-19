import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, GitBranch, Star, Code, Terminal, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const REPOSITORIES = [
  {
    name: 'career-guidance-system',
    description: 'AI-Based Career Counselling and Aptitude Analysis System — Full Stack MERN App.',
    language: 'JavaScript / MERN',
    langColor: '#facc15',
    url: 'https://github.com/Aryan204227/career-guidance-system',
    tag: 'FEATURED FULL-STACK',
  },
  {
    name: 'stocksense-ai',
    description: 'AI-powered stock market sentiment-analysis application built with decoupled client-server architecture.',
    language: 'JavaScript / Node',
    langColor: '#22c55e',
    url: 'https://github.com/Aryan204227/stocksense-ai',
    tag: 'AI / BACKEND',
  },
  {
    name: 'Maze-Solver',
    description: 'Desktop Java maze generator & pathfinding visualizer using DFS & recursive backtracking with Java2D.',
    language: 'Java',
    langColor: '#ea580c',
    url: 'https://github.com/Aryan204227/Maze-Solver',
    tag: 'ALGORITHMIC VISUALIZER',
  },
  {
    name: 'Food-Ordering',
    description: 'Online Food Ordering Website demonstrating Git branching, fetching, pulling, and multi-way merging workflows.',
    language: 'HTML & CSS',
    langColor: '#38bdf8',
    url: 'https://github.com/Aryan204227/Food-Ordering',
    tag: 'COLLABORATIVE GIT',
  },
];

export default function GitHubActivity() {
  const { socialLinks } = portfolioData;

  return (
    <section id="github" className="relative bg-[#07080a]/75 backdrop-blur-[2px] py-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-white/[0.06]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12141a] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-widest mb-6 shadow-xl"
        >
          <Github className="w-3.5 h-3.5 text-white" />
          <span>OPEN SOURCE &amp; CODEBASE</span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold tracking-tight text-center leading-[1.05] text-white max-w-3xl mb-4"
          style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}
        >
          Verified GitHub repositories.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-neutral-400 text-sm sm:text-base text-center max-w-xl mb-16 font-light"
        >
          Explore authentic codebases and problem-solving implementations hosted directly on my GitHub account.
        </motion.p>

        {/* Repository Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {REPOSITORIES.map((repo, idx) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-[#0f1118]/80 border border-white/[0.08] hover:border-white/25 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-lime-400 uppercase font-semibold">
                    {repo.tag}
                  </span>
                  <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <GitBranch className="w-4 h-4 text-neutral-400" />
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-lime-300 transition-colors">
                    {repo.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: repo.langColor }}
                  />
                  <span className="text-neutral-300">{repo.language}</span>
                </div>
                <span className="text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  Aryan204227/{repo.name}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Profile CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14"
        >
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#12141c] hover:bg-[#1a1e2a] border border-white/10 hover:border-white/30 text-white text-xs font-mono uppercase tracking-wider transition-all shadow-xl"
          >
            <Github className="w-4 h-4" />
            <span>VISIT GITHUB PROFILE (Aryan204227)</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
