import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <aside 
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
      aria-label="Quick WhatsApp Contact"
    >
      {/* Tooltip */}
      <div 
        className={`hidden sm:flex items-center gap-2 bg-slate-900/95 border border-emerald-500/30 text-white text-xs px-3.5 py-2 rounded-xl shadow-xl backdrop-blur-md transition-all duration-300 ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Chat with Aryan on WhatsApp</span>
      </div>

      {/* Button */}
      <a
        href={portfolioData.personalInfo.whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative flex items-center justify-center w-13 h-13 p-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#0a0d14]"
        aria-label="Message Aryan Dadwal on WhatsApp (+91 8626963353)"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-20 animate-ping" />
        <MessageCircle className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-12" />
      </a>
    </aside>
  );
}
