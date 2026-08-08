import React from 'react';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Custom smooth scroll helper with premium deceleration curve
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

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    smoothScrollTo(targetId, 2500);
  };

  return (
    <footer className="bg-black text-neutral-400 pt-20 pb-12 px-6 md:px-12 lg:px-24 border-t border-white/5 relative z-10 select-none" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-7xl mx-auto">
        {/* Three Columns Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 mb-16 text-left">
          
          {/* Column 1: About */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-lg font-bold tracking-wide">About</h3>
            <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed max-w-sm">
              Full-Stack Developer skilled in web apps, UI/UX design, and video content. Proficient in JavaScript, React, and Spring Boot, with a passion for creating user-friendly solutions.
            </p>
            {/* Circular Social Icons */}
            <div className="flex gap-4">
              <a 
                href="https://github.com/VasishtaGoutham" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full bg-white/[0.04] hover:bg-brandYellow hover:text-black transition-all duration-300 flex items-center justify-center text-neutral-400"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/vasishta-goutham-krishna-boligarla-091060301/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full bg-white/[0.04] hover:bg-brandYellow hover:text-black transition-all duration-300 flex items-center justify-center text-neutral-400"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-lg font-bold tracking-wide">Links</h3>
            <div className="flex flex-col gap-4 text-sm md:text-base font-light">
              <a 
                href="#home" 
                onClick={(e) => handleLinkClick(e, '#home')}
                className="hover:text-brandYellow transition-colors duration-300 flex items-center gap-2"
              >
                <span className="text-neutral-500 font-normal">&rarr;</span>
                <span>Home</span>
              </a>
              <a 
                href="#about" 
                onClick={(e) => handleLinkClick(e, '#about')}
                className="hover:text-brandYellow transition-colors duration-300 flex items-center gap-2"
              >
                <span className="text-neutral-500 font-normal">&rarr;</span>
                <span>About</span>
              </a>
              <a 
                href="#projects" 
                onClick={(e) => handleLinkClick(e, '#projects')}
                className="hover:text-brandYellow transition-colors duration-300 flex items-center gap-2"
              >
                <span className="text-neutral-500 font-normal">&rarr;</span>
                <span>Projects</span>
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="hover:text-brandYellow transition-colors duration-300 flex items-center gap-2"
              >
                <span className="text-neutral-500 font-normal">&rarr;</span>
                <span>Contact</span>
              </a>
            </div>
          </div>

          {/* Column 3: Have a Questions? */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-lg font-bold tracking-wide">Have a Questions?</h3>
            <div className="flex flex-col gap-5 text-sm md:text-base font-light">
              {/* Item 1: Location Address */}
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <span className="text-neutral-400">Guntur, Andhra Pradesh, India</span>
              </div>
              {/* Item 2: Email */}
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-white flex-shrink-0" />
                <a href="mailto:vasishtagouthamkrishna@gmail.com" className="text-neutral-400 hover:text-brandYellow transition-colors duration-300 break-all">
                  vasishtagouthamkrishna@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-white/5 pt-8 text-center text-sm font-light text-neutral-500">
          Copyright &copy; {currentYear} All rights reserved to Vasishta Goutham Krishna
        </div>

      </div>
    </footer>
  );
}
