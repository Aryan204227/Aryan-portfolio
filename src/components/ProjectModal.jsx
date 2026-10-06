import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Layers, CheckCircle2, BarChart2 } from 'lucide-react';

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
      className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0f0f12] border border-white/10 shadow-2xl p-6 sm:p-8 text-neutral-200 z-10 custom-scrollbar">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono text-orange-400 font-semibold uppercase tracking-wider bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Project {project.number}
              </span>
              <span className="text-xs text-neutral-500 font-mono">{project.date}</span>
            </div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 mt-1 font-light">
              {project.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6">
          {/* Summary */}
          <div>
            <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
              Project Overview
            </h3>
            <p className="text-neutral-300 leading-relaxed text-sm sm:text-base font-light">
              {project.summary}
            </p>
          </div>

          {/* Architecture */}
          {project.architecture && (
            <div className="rounded-2xl bg-[#141418] border border-white/10 p-5">
              <div className="flex items-center gap-2 text-orange-400 mb-2 text-xs font-mono uppercase tracking-wider font-semibold">
                <Layers className="w-4 h-4" />
                <span>System Architecture</span>
              </div>
              <p className="text-sm text-neutral-300 font-mono">
                {project.architecture}
              </p>
            </div>
          )}

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
                Key Features & Engineering Highlights
              </h3>
              <ul className="space-y-2.5">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300 font-light">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Verified Testing Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
                <BarChart2 className="w-4 h-4 text-orange-400" />
                <span>Verified Testing Benchmarks &amp; Architecture Metrics</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-[#141418] border border-white/10 rounded-2xl p-3 text-center">
                    <div className="text-base sm:text-lg font-bold text-white font-mono">
                      {metric.value}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] text-neutral-300 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18181c] hover:bg-[#202026] text-white font-semibold text-xs tracking-wider uppercase border border-white/10 hover:border-white/20 transition-all shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full btn-orange font-bold text-xs tracking-wider uppercase transition-all shadow-md"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
