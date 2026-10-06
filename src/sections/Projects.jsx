import React from 'react';
import { FolderGit2, ExternalLink, Github, ChevronRight, Layers, Cpu, ArrowUpRight, BarChart3, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import TechBadge from '../components/TechBadge';

export default function Projects({ onSelectProject }) {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2">
              <FolderGit2 className="w-4 h-4" />
              <span>03 / Featured Engineering Work</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Curated full-stack web applications, algorithmic desktop solvers, and decoupled AI services built with clean code and verifiable benchmarks.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-500 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 self-start md:self-auto">
            <span>Verified Repositories: </span>
            <span className="text-cyan-400 font-bold">3 of 3 Active</span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`group relative rounded-2xl bg-slate-900/70 border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                project.isFeatured
                  ? 'border-cyan-500/40 shadow-xl shadow-cyan-950/20 lg:scale-[1.02]'
                  : 'border-slate-800 hover:border-slate-700 hover:shadow-xl hover:shadow-black/40'
              }`}
            >
              {/* Card top banner / badge */}
              <div className="p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/50 px-2.5 py-1 rounded">
                      {project.number}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {project.date}
                    </span>
                  </div>

                  {project.isFeatured && (
                    <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      Featured Full-Stack
                    </span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-400/90 font-medium mt-1">
                    {project.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.summary}
                </p>

                {/* Architecture Highlights Pill */}
                {project.architecture && (
                  <div className="rounded-xl bg-slate-950/80 border border-slate-800/80 p-3 text-xs text-slate-300 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                      Architecture
                    </span>
                    <span className="font-mono text-slate-200 line-clamp-2">
                      {project.architecture}
                    </span>
                  </div>
                )}

                {/* Metrics preview */}
                {project.metrics && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="bg-slate-950/50 rounded-lg p-2 border border-slate-800 text-center">
                        <span className="text-xs font-mono font-bold text-cyan-400 block truncate">
                          {m.value}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Badges */}
                <div className="pt-2">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-2 font-semibold">
                    Core Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800/90 border border-slate-700/60 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 border-t border-slate-850/80 bg-slate-950/30 space-y-3">
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-cyan-500/40 transition-all shadow-sm"
                        aria-label={`View ${project.title} on GitHub`}
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold text-xs transition-all shadow-sm"
                        title="Open Live Deployment on Render"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors py-2"
                  >
                    <span>Full Details</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
