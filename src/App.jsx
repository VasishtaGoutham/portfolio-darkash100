import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Prevent default browser scroll restoration on reload and force scroll to top
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Manage body scroll locking and scroll to top during the loading sequence
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      setShowContent(false);
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
      // Small timeout to allow the curtain exit slide to fully complete before starting hero entrance
      const timeout = setTimeout(() => {
        setShowContent(true);
        window.scrollTo(0, 0);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  // Restart the loader sequence
  const handleReplay = () => {
    setIsLoading(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0c0c0c] text-white">
      {/* Custom trail mouse cursor following dot */}
      <CustomCursor />

      {/* Multilingual Preloader Curtain Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col">
        <Navbar onReplay={handleReplay} />
        
        {/* Main Content Page Sections */}
        <main className="flex-grow">
          <Hero preloaderCompleted={showContent} />
          
          <AnimatePresence>
            {showContent && (
              <>
                <About />
                <Resume />
                <Skills />
                <Projects />
                <Certifications />
                <Contact />
              </>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      {/* Floating Vertical Social Sidebar (Fixed across the whole website) */}
      {showContent && (
        <div className="hidden md:flex fixed right-8 bottom-12 flex-col gap-6 text-neutral-500 z-40 select-none">
          <a 
            href="https://github.com/VasishtaGoutham" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-brandYellow hover:scale-125 transition-all duration-300"
          >
            <Github className="w-5.5 h-5.5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/vasishta-goutham-krishna-boligarla-091060301/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-brandYellow hover:scale-125 transition-all duration-300"
          >
            <Linkedin className="w-5.5 h-5.5" />
          </a>
          <a 
            href="mailto:vasishtagouthamkrishna@gmail.com" 
            className="hover:text-brandYellow hover:scale-125 transition-all duration-300"
          >
            <Mail className="w-5.5 h-5.5" />
          </a>
        </div>
      )}
    </div>
  );
}
