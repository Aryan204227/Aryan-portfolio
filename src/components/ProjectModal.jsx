import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Layers, Cpu, CheckCircle2, BarChart2 } from 'lucide-react';
import TechBadge from './TechBadge';

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0f172a] border border-slate-700/80 shadow-2xl p-6 sm:p-8 text-slate-200 z-10 custom-scrollbar">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
                Project {project.number}
              </span>
              <span className="text-xs text-slate-400 font-mono">{project.date}</span>
            </div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-cyan-300/90 mt-1 font-medium">
              {project.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6">
          {/* Summary */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Overview
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {project.summary}
            </p>
          </div>

          {/* Architecture */}
          {project.architecture && (
            <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4">
              <div className="flex items-center gap-2 text-cyan-400 mb-1.5 text-xs font-semibold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>System Architecture</span>
              </div>
              <p className="text-sm text-slate-300 font-mono">
                {project.architecture}
              </p>
            </div>
          )}

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Key Features & Engineering Highlights
              </h3>
              <ul className="space-y-2.5">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Metrics & Performance Testing Data */}
          {project.metrics && project.metrics.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                <span>Testing Benchmarks & Metrics (From Source)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
                    <div className="text-base sm:text-lg font-bold text-cyan-400 font-mono">
                      {metric.value}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 font-medium">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <TechBadge key={tag} name={tag} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-all shadow-sm border border-slate-700 hover:border-cyan-500/50"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-semibold text-sm transition-all shadow-md shadow-cyan-500/20"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
