import React, { useState, useEffect } from 'react';
import { Menu, X, Download, MessageCircle, FileText, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Training', href: '#training' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const currentScrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= currentScrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0d14]/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <nav 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
        aria-label="Main Navigation"
      >
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-2.5 focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 p-[1px] shadow-sm shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all">
            <div className="w-full h-full bg-[#0a0d14] rounded-[11px] flex items-center justify-center font-bold text-base text-cyan-400 font-mono">
              AD
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-100 tracking-tight text-sm sm:text-base group-hover:text-cyan-400 transition-colors">
              Aryan Dadwal
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-wider uppercase -mt-0.5">
              Full Stack Dev
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/60 shadow-sm border border-cyan-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Download Resume Button */}
          <a
            href={portfolioData.personalInfo.resumePdf}
            download="Aryan_Dadwal_Professional_Resume.pdf"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-500/40 transition-all shadow-sm active:scale-95"
            title="Download Professional Resume (PDF)"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Resume</span>
          </a>

          {/* Quick WhatsApp / Contact */}
          <a
            href={portfolioData.personalInfo.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-emerald-500/90 to-teal-600/90 hover:from-emerald-400 hover:to-teal-500 text-white shadow-sm shadow-emerald-500/20 transition-all active:scale-95"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={portfolioData.personalInfo.resumePdf}
            download="Aryan_Dadwal_Professional_Resume.pdf"
            className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-cyan-400 text-xs font-medium flex items-center"
            aria-label="Download Resume"
          >
            <Download className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Animated Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 border-b border-slate-800/80 bg-[#0a0d14]/98 backdrop-blur-xl shadow-2xl transition-all">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/50'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </a>
              );
            })}
          </div>

          <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-800/80">
            <a
              href={portfolioData.personalInfo.resumePdf}
              download="Aryan_Dadwal_Professional_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold border border-slate-700"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Professional Resume (PDF)</span>
            </a>
            <a
              href={portfolioData.personalInfo.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold shadow-md shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Message</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
