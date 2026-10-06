import React, { useState, useEffect } from 'react';
import { Menu, X, Download, MessageCircle, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const NAV_ITEMS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'CAPABILITIES', href: '#capabilities' },
  { label: 'STACK', href: '#stack' },
  { label: 'WORK', href: '#work' },
  { label: 'TRAINING', href: '#training' },
  { label: 'CERTIFICATES', href: '#certificates' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section tracker
      const sectionIds = ['about', 'capabilities', 'stack', 'work', 'training', 'certificates', 'education', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand */}
          <a
            href="#home"
            className="group flex items-center gap-3 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center font-display font-bold text-sm tracking-wider text-white group-hover:border-cyan-400/50 transition-colors">
              AD
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold tracking-wider text-sm text-white group-hover:text-cyan-300 transition-colors">
                ARYAN DADWAL
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5">
                Full Stack Developer
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-xs font-mono tracking-widest transition-colors relative py-1 ${
                    isActive
                      ? 'text-cyan-400 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {/* Resume Button */}
            <a
              href={portfolioData.personalInfo.resumePdf}
              download="Aryan_Dadwal_Professional_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-xs font-mono tracking-wider text-slate-200 hover:text-white transition-all shadow-sm"
              title="Download Professional Resume PDF"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>RESUME</span>
            </a>

            {/* Direct WhatsApp */}
            <a
              href={portfolioData.personalInfo.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 transition-all"
              title="Chat on WhatsApp (+91 8626963353)"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2.5">
            <a
              href={portfolioData.personalInfo.resumePdf}
              download="Aryan_Dadwal_Professional_Resume.pdf"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-cyan-400 text-xs"
              aria-label="Download Resume"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
              aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#07090e]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 lg:hidden animate-fadeIn">
          <div className="space-y-6">
            <span className="text-[11px] font-mono tracking-widest text-slate-500 uppercase block">
              NAVIGATION
            </span>
            <div className="flex flex-col space-y-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-display text-2xl font-bold tracking-tight text-slate-300 hover:text-cyan-400 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-600" />
                </a>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <a
              href={portfolioData.personalInfo.resumePdf}
              download="Aryan_Dadwal_Professional_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/10 text-white font-mono text-xs tracking-wider border border-white/15"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
            <a
              href={portfolioData.personalInfo.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-display font-bold text-xs tracking-wider"
            >
              <MessageCircle className="w-4 h-4" />
              <span>MESSAGE ON WHATSAPP</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
