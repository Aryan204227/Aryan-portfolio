import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroLoader from './components/IntroLoader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import CommandPalette from './components/CommandPalette';
import TerminalDrawer from './components/TerminalDrawer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ProjectModal from './components/ProjectModal';
import InteractiveBackground from './components/InteractiveBackground';
import useSmoothScroll from './hooks/useSmoothScroll';

import Hero from './sections/Hero';
import About from './sections/About';
import Expertise from './sections/Expertise';
import TechArsenal from './sections/TechArsenal';
import Projects from './sections/Projects';
import Training from './sections/Training';
import Certificates from './sections/Certificates';
import Education from './sections/Education';
import EngineeringApproach from './sections/EngineeringApproach';
import Contact from './sections/Contact';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Lenis smooth inertial scroll
  useSmoothScroll();

  // Global Ctrl+K / Cmd+K Command Palette Shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Cinematic intro screen */}
      <AnimatePresence>
        {loading && <IntroLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Interactive particle background — fixed, behind everything */}
      <InteractiveBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="min-h-screen flex flex-col font-sans relative overflow-x-hidden bg-[#0a0a0a] text-white"
        style={{ zIndex: 2, position: 'relative' }}
      >
        {/* Premium custom cursor (desktop only) */}
        <CustomCursor />

        {/* Reading progress bar */}
        <ScrollProgress />

        {/* Global Developer Command Palette (Ctrl+K) */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        {/* Interactive Developer CLI Terminal Drawer */}
        <TerminalDrawer
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
        />

        {/* Floating navigation */}
        <Navbar />

        {/* Main experience */}
        <main className="flex-grow">
          <Hero />
          <About />
          <Expertise />
          <TechArsenal />
          <Projects onSelectProject={setActiveProjectModal} />
          <Training />
          <Certificates />
          <Education />
          <EngineeringApproach />
          <Contact />
        </main>

        <Footer />
        <WhatsAppFloat />

        {/* Detailed Case Study Modal */}
        <ProjectModal
          project={activeProjectModal}
          isOpen={Boolean(activeProjectModal)}
          onClose={() => setActiveProjectModal(null)}
        />
      </motion.div>
    </>
  );
}
