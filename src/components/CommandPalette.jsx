import React, { useEffect, useState, useRef } from 'react';
import { 
  Home, 
  User, 
  Code2, 
  Briefcase, 
  Mail, 
  FileText, 
  Github, 
  Linkedin, 
  MessageCircle, 
  Search, 
  X, 
  Terminal,
  ArrowRight
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function CommandPalette({ isOpen, onClose, onOpenTerminal }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const actions = [
    {
      id: 'home',
      title: 'Go to Home',
      category: 'Navigation',
      icon: Home,
      action: () => {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'about',
      title: 'Go to About',
      category: 'Navigation',
      icon: User,
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'skills',
      title: 'Go to Skills',
      category: 'Navigation',
      icon: Code2,
      action: () => {
        document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'work',
      title: 'Go to Work / Projects',
      category: 'Navigation',
      icon: Briefcase,
      action: () => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'contact',
      title: 'Go to Contact',
      category: 'Navigation',
      icon: Mail,
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'resume',
      title: 'Open Verified Resume (PDF)',
      category: 'Actions',
      icon: FileText,
      action: () => {
        window.open(portfolioData.personalInfo.resumePdf, '_blank');
        onClose();
      }
    },
    {
      id: 'terminal',
      title: 'Launch Developer Terminal CLI',
      category: 'Tools',
      icon: Terminal,
      action: () => {
        onClose();
        onOpenTerminal();
      }
    },
    {
      id: 'github',
      title: 'Open GitHub Profile',
      category: 'External',
      icon: Github,
      action: () => {
        window.open(portfolioData.socialLinks.github, '_blank');
        onClose();
      }
    },
    {
      id: 'linkedin',
      title: 'Open LinkedIn Profile',
      category: 'External',
      icon: Linkedin,
      action: () => {
        window.open(portfolioData.socialLinks.linkedin, '_blank');
        onClose();
      }
    },
    {
      id: 'whatsapp',
      title: 'Chat on WhatsApp',
      category: 'External',
      icon: MessageCircle,
      action: () => {
        window.open(portfolioData.personalInfo.whatsAppUrl, '_blank');
        onClose();
      }
    },
    {
      id: 'email',
      title: 'Send Email to Aryan',
      category: 'Actions',
      icon: Mail,
      action: () => {
        window.location.href = portfolioData.socialLinks.email;
        onClose();
      }
    }
  ];

  const filteredActions = actions.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase()) || 
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredActions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9990] flex items-start justify-center pt-24 sm:pt-32 p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-xl bg-[#0e0e11] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#141418]">
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search (e.g. Work, Resume, GitHub)..."
            className="flex-1 bg-transparent text-white placeholder:text-neutral-500 text-sm focus:outline-none font-medium"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400">
            ESC
          </kbd>
          <button 
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filteredActions.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-neutral-500">
              No matching commands found.
            </div>
          ) : (
            filteredActions.map((action, idx) => {
              const Icon = action.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={action.id}
                  onClick={action.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs transition-colors ${
                    isSelected 
                      ? 'bg-orange-500/15 border border-orange-500/30 text-white' 
                      : 'text-neutral-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-orange-500/20 text-orange-400' : 'bg-white/5 text-neutral-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{action.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                      {action.category}
                    </span>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-orange-400" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 border-t border-white/5 bg-[#0a0a0d] flex items-center justify-between text-[10px] font-mono text-neutral-500">
          <span>Navigate with ↑ ↓ and Enter</span>
          <span>Aryan Dadwal Command Palette</span>
        </div>
      </div>
    </div>
  );
}
