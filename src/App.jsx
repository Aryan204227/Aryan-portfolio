import React from 'react';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

import Hero from './sections/Hero';
import About from './sections/About';
import Capabilities from './sections/Capabilities';
import TechStack from './sections/TechStack';
import Projects from './sections/Projects';
import Training from './sections/Training';
import Certificates from './sections/Certificates';
import Education from './sections/Education';
import Contact from './sections/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300 relative">
      {/* Subtle Film Grain Atmosphere */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Real-time reading progress */}
      <ScrollProgress />

      {/* Sticky Cinematic Navigation */}
      <Navbar />

      {/* Editorial Story Flow */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Capabilities />
        <TechStack />
        <Projects />
        <Training />
        <Certificates />
        <Education />
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Floating Direct WhatsApp Action */}
      <WhatsAppFloat />
    </div>
  );
}
