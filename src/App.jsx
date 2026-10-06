import React, { useState } from 'react';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ProjectModal from './components/ProjectModal';

import Hero from './sections/Hero';
import About from './sections/About';
import Expertise from './sections/Expertise';
import TechArsenal from './sections/TechArsenal';
import Projects from './sections/Projects';
import Training from './sections/Training';
import Certificates from './sections/Certificates';
import Education from './sections/Education';
import Contact from './sections/Contact';

export default function App() {
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const handleOpenProjectModal = (project) => {
    setActiveProjectModal(project);
  };

  const handleCloseProjectModal = () => {
    setActiveProjectModal(null);
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300 relative">
      {/* Subtle Atmospheric Film Grain */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Real-time reading progress */}
      <ScrollProgress />

      {/* Floating Centered Pill Navbar */}
      <Navbar />

      {/* Main Narrative Experience */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Expertise />
        <TechArsenal />
        <Projects onSelectProject={handleOpenProjectModal} />
        <Training />
        <Certificates />
        <Education />
        <Contact />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Subtle Floating WhatsApp Action */}
      <WhatsAppFloat />

      {/* Deep Dive Case Study Modal */}
      <ProjectModal
        project={activeProjectModal}
        isOpen={Boolean(activeProjectModal)}
        onClose={handleCloseProjectModal}
      />
    </div>
  );
}
