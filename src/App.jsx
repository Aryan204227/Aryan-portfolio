import React, { useState } from 'react';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ProjectModal from './components/ProjectModal';

import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Training from './sections/Training';
import Certificates from './sections/Certificates';
import Education from './sections/Education';
import Highlights from './sections/Highlights';
import Contact from './sections/Contact';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenProject = (project) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Scroll Progress Bar at the top */}
      <ScrollProgress />

      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Hero onOpenProject={handleOpenProject} />
        <About />
        <Skills />
        <Projects onSelectProject={handleOpenProject} />
        <Training />
        <Certificates />
        <Education />
        <Highlights />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button for WhatsApp */}
      <WhatsAppFloat />

      {/* Modal for Deep Technical Architecture & Testing Metrics */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={handleCloseProject}
      />
    </div>
  );
}
