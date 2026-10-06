import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <aside 
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
      aria-label="Direct WhatsApp Contact"
    >
      {/* Tooltip: Let's talk */}
      <div 
        className={`hidden sm:flex items-center gap-2 bg-[#0a0d14]/95 border border-white/10 text-white text-xs font-mono px-3.5 py-1.5 rounded-full shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3 pointer-events-none'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Let's talk</span>
      </div>

      {/* Action Button */}
      <a
        href={portfolioData.personalInfo.whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#0a0d14] text-white border border-emerald-500/40 hover:border-emerald-400 shadow-xl shadow-black/60 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#07090e]"
        aria-label="Chat with Aryan Dadwal on WhatsApp (+91 8626963353)"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-75" />
        <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
      </a>
    </aside>
  );
}
