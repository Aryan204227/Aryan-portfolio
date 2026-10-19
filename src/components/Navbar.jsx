import React, { useState, useEffect } from 'react';
import { Home, User, Code2, Briefcase, Mail, Download, Menu, X, ArrowUpRight, Network, Github } from 'lucide-react';
import MonogramLogo from './MonogramLogo';
import { portfolioData } from '../data/portfolioData';

const NAV_ITEMS = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Skills', href: '#stack', icon: Code2 },
  { label: 'Projects', href: '#work', icon: Briefcase },
  { label: 'Architecture', href: '#architecture', icon: Network },
  { label: 'GitHub', href: '#github', icon: Github },
  { label: 'Contact', href: '#contact', icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = ['home', 'about', 'expertise', 'stack', 'work', 'architecture', 'github', 'training', 'contact'];
      const scrollPos = window.scrollY + 280;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          if (sectionIds[i] === 'expertise' || sectionIds[i] === 'training') {
            setActiveSection('about');
          } else {
            setActiveSection(sectionIds[i]);
          }
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
      {/* Top Left Monogram Logo */}
      <div className="fixed top-6 left-6 lg:left-10 z-50 pointer-events-auto">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group block"
          aria-label="Aryan Dadwal Home"
        >
          <MonogramLogo className="w-10 h-8 transition-transform group-hover:scale-105" />
        </a>
      </div>

      {/* Desktop Floating Pill Navbar */}
      <nav 
        className="fixed top-6 left-0 right-0 z-50 hidden lg:flex justify-center pointer-events-none px-6"
        aria-label="Main Navigation"
      >
        <div className={`relative pill-nav px-3 py-1.5 flex items-center gap-1 pointer-events-auto shadow-[0_16px_36px_rgba(0,0,0,0.7)] transition-all duration-300 ${
          scrolled ? 'scale-95 bg-[#0b0d13]/95 py-1 border-white/15' : 'bg-[#0f1118]/85'
        }`}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            const IconComp = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative text-[12px] px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 font-mono tracking-wider ${
                  isActive
                    ? 'text-black font-bold bg-lime-400 shadow-[0_0_12px_rgba(132,204,22,0.4)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-neutral-400'}`} />
                <span>{item.label}</span>
              </a>
            );
          })}

          {/* Quick Resume Link inside pill */}
          <div className="pl-2 ml-1 border-l border-white/10">
            <a
              href={portfolioData.personalInfo.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-semibold text-lime-400 bg-lime-500/10 hover:bg-lime-500/20 border border-lime-500/30 transition-all"
              title="View Aryan Dadwal Resume (PDF)"
            >
              <Download className="w-3 h-3" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Top Header */}
      <header className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between lg:hidden pointer-events-none">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="pointer-events-auto p-2 rounded-full bg-[#0c0e14]/90 backdrop-blur-xl border border-white/10 shadow-xl"
        >
          <MonogramLogo className="w-8 h-7" />
        </a>

        <div className="flex items-center gap-2 pointer-events-auto">
          <a
            href={portfolioData.personalInfo.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#0c0e14]/90 backdrop-blur-xl border border-white/10 flex items-center justify-center text-lime-400 shadow-xl"
            aria-label="View Resume"
          >
            <Download className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-10 h-10 rounded-full bg-[#0c0e14]/90 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white shadow-xl focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#07080a]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-24 lg:hidden animate-fadeIn">
          <div className="space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
              PORTFOLIO NAVIGATION
            </span>
            <div className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => {
                const IconComp = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-neutral-200 hover:text-lime-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <IconComp className="w-4 h-4 text-lime-400" />
                      <span className="font-semibold text-base">{item.label}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-600" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <a
              href={portfolioData.personalInfo.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-lime-400 text-black text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(132,204,22,0.3)]"
            >
              <Download className="w-4 h-4" />
              <span>VIEW RESUME (PDF)</span>
            </a>
            <a
              href={portfolioData.personalInfo.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 text-white text-xs uppercase tracking-wider font-semibold"
            >
              <span>MESSAGE ON WHATSAPP</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
