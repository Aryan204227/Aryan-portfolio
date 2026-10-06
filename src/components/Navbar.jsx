import React, { useState, useEffect } from 'react';
import { Download, MessageCircle, Menu, X, ArrowUpRight, Home, User, Layers, CodeXml, Briefcase, Award, GraduationCap, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const NAV_ITEMS = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Expertise', href: '#expertise', icon: Layers },
  { label: 'Stack', href: '#stack', icon: CodeXml },
  { label: 'Work', href: '#work', icon: Briefcase },
  { label: 'Training', href: '#training', icon: Award },
  { label: 'Certificates', href: '#certificates', icon: GraduationCap },
  { label: 'Contact', href: '#contact', icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = ['home', 'about', 'expertise', 'stack', 'work', 'training', 'certificates', 'contact'];
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
      {/* Desktop Floating Centered Pill Navbar (Inspired by high-end developer portfolios) */}
      <nav 
        className="fixed top-6 left-0 right-0 z-50 hidden lg:flex justify-center pointer-events-none px-6"
        aria-label="Desktop Navigation"
      >
        <div className="relative rounded-full px-4 py-2 flex items-center gap-1.5 pointer-events-auto bg-[#0f1118]/80 backdrop-blur-xl border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.5)]">
          
          {/* Brand Icon Pill */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 pr-3 pl-1 border-r border-white/10 text-white font-bold text-xs tracking-wider font-mono hover:text-cyan-400 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[11px] font-display font-extrabold text-white">
              AD
            </div>
            <span>ARYAN</span>
          </a>

          {/* Nav Items */}
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              const IconComp = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative text-xs px-3.5 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 font-medium ${
                    isActive
                      ? 'text-white font-semibold bg-white/10 shadow-sm border border-white/15'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 pl-3 border-l border-white/10">
            <a
              href={portfolioData.personalInfo.resumePdf}
              download="Aryan_Dadwal_Professional_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-slate-950 text-xs font-bold font-display hover:bg-slate-200 transition-all shadow-sm"
              title="Download Professional Resume PDF"
            >
              <Download className="w-3 h-3" />
              <span>Resume</span>
            </a>

            <a
              href={portfolioData.personalInfo.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all"
              title="Chat on WhatsApp"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </nav>

      {/* Mobile Sticky Header */}
      <header className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between lg:hidden pointer-events-none">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="pointer-events-auto w-10 h-10 rounded-full bg-[#0f1118]/80 backdrop-blur-xl border border-white/10 flex items-center justify-center font-display font-bold text-xs text-white shadow-xl"
        >
          AD
        </a>

        <div className="flex items-center gap-2 pointer-events-auto">
          <a
            href={portfolioData.personalInfo.resumePdf}
            download="Aryan_Dadwal_Professional_Resume.pdf"
            className="w-10 h-10 rounded-full bg-[#0f1118]/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-cyan-400 shadow-xl"
            aria-label="Download Resume"
          >
            <Download className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-10 h-10 rounded-full bg-[#0f1118]/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white shadow-xl focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#07080c]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-24 lg:hidden animate-fadeIn">
          <div className="space-y-6">
            <span className="text-[11px] font-mono tracking-widest text-slate-500 uppercase block">
              PORTFOLIO INDEX
            </span>
            <div className="flex flex-col space-y-3">
              {NAV_ITEMS.map((item) => {
                const IconComp = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] text-slate-200 hover:text-cyan-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <IconComp className="w-4 h-4 text-cyan-400" />
                      <span className="font-display text-lg font-bold">{item.label}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-600" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <a
              href={portfolioData.personalInfo.resumePdf}
              download="Aryan_Dadwal_Professional_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-slate-950 font-display font-bold text-xs uppercase tracking-wider"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
            <a
              href={portfolioData.personalInfo.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 text-slate-950 font-display font-bold text-xs uppercase tracking-wider"
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
