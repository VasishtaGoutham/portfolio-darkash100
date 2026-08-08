import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' }
];

export default function ScrollNav() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      const detectSections = [
        { id: 'home', target: 'home' },
        { id: 'about', target: 'about' },
        { id: 'resume', target: 'resume' },
        { id: 'education', target: 'education' },
        { id: 'experience', target: 'experience' },
        { id: 'skills', target: 'skills' },
        { id: 'projects', target: 'projects' },
        { id: 'certifications', target: 'certifications' },
        { id: 'contact', target: 'contact' }
      ];
      
      for (const section of detectSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.target);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4 py-4 px-2 bg-neutral-900/10 backdrop-blur-md rounded-full border border-white/5 shadow-2xl select-none">
      {/* Decorative vertical background line */}
      <div className="absolute top-6 bottom-6 w-[1.5px] bg-white/10 -z-10" />

      {sections.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => smoothScrollTo(sec.id, 2500)}
            className="group relative flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300"
            aria-label={`Scroll to ${sec.label}`}
          >
            {/* The Dot Indicator with Framer Motion slide layout transition */}
            <span className="relative flex items-center justify-center w-full h-full">
              <AnimatePresence>
                {isActive ? (
                  <motion.span 
                    className="w-3 h-3 bg-brandYellow rounded-full ring-4 ring-brandYellow/25 shadow-[0_0_12px_rgba(255,189,57,0.6)]"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  />
                ) : (
                  <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full group-hover:bg-white group-hover:scale-125 transition-all duration-300" />
                )}
              </AnimatePresence>
            </span>

            {/* Hover Tooltip (Section name) */}
            <span className="absolute right-7 px-2.5 py-1 rounded bg-neutral-900 border border-white/10 text-neutral-300 text-xs font-medium tracking-wide whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-md">
              {sec.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
