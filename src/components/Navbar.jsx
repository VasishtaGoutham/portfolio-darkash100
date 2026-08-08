import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onReplay }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'about', href: '#about' },
    { label: 'resume', href: '#resume' },
    { label: 'projects', href: '#projects' },
    { label: 'certifications', href: '#certifications' }
  ];

  // Smooth scroll helper with custom duration (decreased speed) and premium easeInOut cubic curve
  const smoothScrollTo = (targetId, duration = 2500) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const targetPosition = target.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const easeInOutCubic = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    smoothScrollTo(targetId, 2500); // 2.5 seconds for premium slow scroll speed
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = ['home', 'about', 'resume', 'education', 'experience', 'skills', 'projects', 'certifications', 'contact'];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/65 backdrop-blur-md border-b border-white/5 px-6 py-4 md:px-12 md:py-5 flex justify-between items-center select-none transition-all duration-300">
      <div 
        onClick={onReplay}
        className="cursor-pointer text-xl md:text-2xl font-bold text-white hover:text-brandYellow transition-colors duration-300"
      >
        ᐯ卂丂丨丂卄ㄒ卂Ꮆㄖㄩㄒ卄卂爪Ҝ尺丨丂卄几卂
      </div>

      {/* Desktop Nav Links and Let's Talk CTA */}
      <div className="flex items-center gap-8 lg:gap-10">
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a 
                key={item.label}
                href={item.href} 
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative py-1 text-white hover:text-brandYellow transition-colors duration-300`}
                style={{
                  fontFamily: "'Poppins', Arial, sans-serif",
                  fontSize: "17.6px",
                  fontWeight: isActive ? "700" : "400"
                }}
              >
                {item.label}
                <AnimatePresence>
                  {isActive && (
                    <motion.span 
                      className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-brandYellow rounded-full" 
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    />
                  )}
                </AnimatePresence>
              </a>
            );
          })}
        </nav>

        <a 
          href="#contact" 
          onClick={(e) => handleNavClick(e, '#contact')}
          className="lets-talk-btn bg-brandYellow text-black font-semibold text-xs md:text-sm px-6 py-2.5 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 active:scale-95 shadow-md"
        >
          Let's Talk.
        </a>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white hover:text-brandYellow transition-colors duration-300 ml-4"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation Drawer Overlay */}
      {isOpen && (
        <div className="absolute top-[65px] left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 flex flex-col items-center py-8 gap-6 md:hidden z-40 transition-all duration-300">
          {navItems.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a 
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative text-lg font-medium tracking-wide py-2 text-white hover:text-brandYellow transition-colors duration-300"
                style={{ fontFamily: "'Poppins', Arial, sans-serif" }}
              >
                {item.label}
                <AnimatePresence>
                  {isActive && (
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-brandYellow rounded-full" 
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    />
                  )}
                </AnimatePresence>
              </a>
            );
          })}
          <a 
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="bg-brandYellow text-black font-semibold text-sm px-8 py-3 rounded-full hover:bg-white transition-colors duration-300 shadow-md"
          >
            Let's Talk.
          </a>
        </div>
      )}
    </header>
  );
}
