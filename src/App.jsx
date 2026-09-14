import { useState } from 'react';
import BackgroundEffects from './components/BackgroundEffects';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Resume from './components/Resume';

function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      <div className="main-content">
        <BackgroundEffects />
        <Navbar onResumeClick={() => setIsResumeOpen(true)} />
        <Hero onResumeClick={() => setIsResumeOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Certifications />
        <Contact />
        <Footer />
        <WhatsAppFloat />
      </div>
      <Resume isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
}

export default App;
