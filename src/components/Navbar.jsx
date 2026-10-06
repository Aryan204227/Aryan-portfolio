import React, { useState, useEffect } from 'react';
import { Home, User, Code2, Briefcase, Mail, ChevronDown, Download, MessageCircle, Menu, X, ArrowUpRight } from 'lucide-react';
import MonogramLogo from './MonogramLogo';
import { portfolioData } from '../data/portfolioData';

const NAV_ITEMS = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'About', href: '#about', icon: User, hasDropdown: true },
  { label: 'Skills', href: '#stack', icon: Code2 },
  { label: 'Work', href: '#work', icon: Briefcase },
  { label: 'Contact', href: '#contact', icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = ['home', 'about', 'expertise', 'stack', 'work', 'training', 'certificates', 'contact'];
      const scrollPos = window.scrollY + 280;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          if (sectionIds[i] === 'expertise' || sectionIds[i] === 'training' || sectionIds[i] === 'certificates') {
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
    setAboutDropdown(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Left Monogram Logo (Fixed on desktop as in reference screenshot) */}
      <div className="fixed top-6 left-6 lg:left-10 z-50 pointer-events-auto">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group block"
          aria-label="Aryan Dadwal Home"
        >
          <MonogramLogo className="w-11 h-9 transition-transform group-hover:scale-105" />
        </a>
      </div>

      {/* Desktop Centered Floating Pill Navbar (Matching reference) */}
      <nav 
        className="fixed top-6 left-0 right-0 z-50 hidden lg:flex justify-center pointer-events-none px-6"
        aria-label="Main Navigation"
      >
        <div className={`relative pill-nav px-3 py-1.5 flex items-center gap-1 pointer-events-auto shadow-[0_16px_36px_rgba(0,0,0,0.65)] transition-all duration-300 ${
          scrolled ? 'scale-95 bg-[#0e0e0e]/95 py-1' : 'bg-[#121212]/85'
        }`}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            const IconComp = item.icon;

            if (item.hasDropdown) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setAboutDropdown(true)}
                  onMouseLeave={() => setAboutDropdown(false)}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative text-[13px] px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-2 font-medium ${
                      isActive
                        ? 'text-white font-semibold bg-white/[0.08] border border-white/10'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                    <span>{item.label}</span>
                    <ChevronDown className="w-3 h-3 text-neutral-500" />
                  </a>

                  {/* About Submenu */}
                  {aboutDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 py-2 rounded-2xl bg-[#141414]/95 border border-white/10 shadow-2xl backdrop-blur-xl animate-fadeIn">
                      <a
                        href="#about"
                        onClick={(e) => handleNavClick(e, '#about')}
                        className="block px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-white/[0.06]"
                      >
                        About Story
                      </a>
                      <a
                        href="#expertise"
                        onClick={(e) => handleNavClick(e, '#expertise')}
                        className="block px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-white/[0.06]"
                      >
                        Core Expertise
                      </a>
                      <a
                        href="#training"
                        onClick={(e) => handleNavClick(e, '#training')}
                        className="block px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-white/[0.06]"
                      >
                        DSA Boot Camp
                      </a>
                      <a
                        href="#certificates"
                        onClick={(e) => handleNavClick(e, '#certificates')}
                        className="block px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-white/[0.06]"
                      >
                        Certificates
                      </a>
                      <a
                        href="#education"
                        onClick={(e) => handleNavClick(e, '#education')}
                        className="block px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-white/[0.06]"
                      >
                        Education (LPU)
                      </a>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative text-[13px] px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-2 font-medium ${
                  isActive
                    ? 'text-white font-semibold bg-white/[0.08] border border-white/10'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                <span>{item.label}</span>
              </a>
            );
          })}

          {/* Quick Resume Link right inside pill navbar */}
          <div className="pl-2 ml-1 border-l border-white/10">
            <a
              href={portfolioData.personalInfo.resumePdf}
              download="Aryan_Dadwal_Professional_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-white/[0.06] hover:bg-orange-500/20 hover:text-orange-400 border border-white/10 hover:border-orange-500/30 transition-all"
              title="Download Aryan Dadwal Resume (PDF)"
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
          className="pointer-events-auto p-2 rounded-full bg-[#121212]/90 backdrop-blur-xl border border-white/10 shadow-xl"
        >
          <MonogramLogo className="w-8 h-7" />
        </a>

        <div className="flex items-center gap-2 pointer-events-auto">
          <a
            href={portfolioData.personalInfo.resumePdf}
            download="Aryan_Dadwal_Professional_Resume.pdf"
            className="w-10 h-10 rounded-full bg-[#121212]/90 backdrop-blur-xl border border-white/10 flex items-center justify-center text-orange-400 shadow-xl"
            aria-label="Download Resume"
          >
            <Download className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-10 h-10 rounded-full bg-[#121212]/90 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white shadow-xl focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0a]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-24 lg:hidden animate-fadeIn">
          <div className="space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
              PORTFOLIO NAVIGATION
            </span>
            <div className="flex flex-col space-y-2">
              {[
                { label: 'Home', href: '#home', icon: Home },
                { label: 'About Story', href: '#about', icon: User },
                { label: 'Core Expertise', href: '#expertise', icon: Briefcase },
                { label: 'Technical Skills', href: '#stack', icon: Code2 },
                { label: 'Selected Work', href: '#work', icon: Briefcase },
                { label: 'Training (DSA)', href: '#training', icon: Award },
                { label: 'Certifications', href: '#certificates', icon: Award },
                { label: 'Contact', href: '#contact', icon: Mail },
              ].map((item) => {
                const IconComp = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-neutral-200 hover:text-orange-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <IconComp className="w-4 h-4 text-orange-400" />
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
              download="Aryan_Dadwal_Professional_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full btn-orange text-xs uppercase tracking-wider font-bold"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
            <a
              href={portfolioData.personalInfo.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 text-white text-xs uppercase tracking-wider font-semibold"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>MESSAGE ON WHATSAPP</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
