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
import EngineeringApproach from './sections/EngineeringApproach';
import Contact from './sections/Contact';

export default function App() {
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      {/* Fine film grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
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

      {/* Project case study modal */}
      <ProjectModal
        project={activeProjectModal}
        isOpen={Boolean(activeProjectModal)}
        onClose={() => setActiveProjectModal(null)}
      />
    </div>
  );
}
