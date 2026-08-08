import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const roles = ["Software", "Frontend", "Full Stack"];

export default function Hero({ preloaderCompleted }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Mouse move listener to calculate relative offset for concentric outer ring (magnetic parallax effect)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      
      const factor = 0.05; // parallax intensity shift factor
      setMouseOffset({
        x: dx * factor,
        y: dy * factor
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter letter-by-letter typing animation
  useEffect(() => {
    let timer;
    const currentFullWord = roles[roleIdx];

    if (!isDeleting) {
      // Typing
      timer = setTimeout(() => {
        setDisplayedText(currentFullWord.substring(0, displayedText.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);

      // Word fully typed
      if (displayedText === currentFullWord) {
        setTypingSpeed(2000); // long pause at end of word
        setIsDeleting(true);
      }
    } else {
      // Deleting
      timer = setTimeout(() => {
        setDisplayedText(currentFullWord.substring(0, displayedText.length - 1));
        setTypingSpeed(55);
      }, typingSpeed);

      // Word fully deleted
      if (displayedText === '') {
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
        setTypingSpeed(300); // pause before starting next word
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIdx, typingSpeed]);

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

  const handleHeroClick = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(targetId, 2500); // matching Navbar's slow scroll speed
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  const ringVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
    }
  };

  return (
    <motion.section
      id="home"
      variants={containerVariants}
      initial="hidden"
      animate={preloaderCompleted ? "visible" : "hidden"}
      className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 pt-24 pb-36 md:pb-48 relative overflow-hidden"
    >
      {/* Background ambient decorator glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-[#ffbd39]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-neutral-800/20 blur-[120px] pointer-events-none" />

      {/* Main Grid Layout */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1.1fr_1.2fr] items-center gap-12 lg:gap-0 relative z-10">
        
        {/* Left Column: Headline with Typewriter Role */}
        <motion.div 
          variants={fadeUpVariants} 
          className="flex flex-col items-start text-left order-2 lg:order-1 select-none relative z-30 lg:self-center"
          style={{ fontFamily: "'Poppins', Arial, sans-serif" }}
        >
          <span className="text-neutral-400 text-sm md:text-base font-normal tracking-wide mb-3 block">
            Hello, I'm Vasishta Goutham Krishna
          </span>
          
          {/* Static font size of 36px, with zero-width space holding text bounds to prevent moving up and down */}
          <h1 
            className="font-bold tracking-tight leading-none mb-6 text-white text-[36px]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="text-[#ffbd39] inline-block">
              {displayedText || "\u200b"}
            </span>
            <span className="animate-pulse text-[#ffbd39] mr-2 font-light">|</span>
            <span className="text-white">Engineer</span>
          </h1>

          <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-sm mb-8 font-light">
            I build intelligent, data-driven web applications.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              onClick={(e) => handleHeroClick(e, 'projects')}
              className="bg-brandYellow text-black font-semibold text-sm px-6 py-3.5 rounded-lg hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg flex items-center gap-1.5"
            >
              <span>View Projects</span>
            </a>
            <a
              href="#resume"
              onClick={(e) => handleHeroClick(e, 'resume')}
              className="bg-transparent border border-neutral-700 text-white font-medium text-sm px-6 py-3.5 rounded-lg hover:border-neutral-500 hover:bg-white/5 active:scale-95 transition-all duration-300"
            >
              View Resume
            </a>
          </div>
        </motion.div>

        {/* Center Column: Portrait avatar with sequential load effect (empty -> yellow circle -> face image slides up) */}
        <div className="flex justify-center items-center order-1 lg:order-2 lg:mx-[-80px] xl:mx-[-100px] relative z-10 lg:self-center">
          
          {/* Concentric Parallax/Magnetic Outer Ring */}
          <motion.div
            variants={ringVariants}
            initial="hidden"
            animate={preloaderCompleted ? { scale: 1, opacity: 1, x: mouseOffset.x, y: mouseOffset.y } : "hidden"}
            transition={{
              x: { type: 'spring', stiffness: 60, damping: 15 },
              y: { type: 'spring', stiffness: 60, damping: 15 },
              scale: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 },
              opacity: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }
            }}
            className="absolute w-[305px] h-[305px] sm:w-[390px] sm:h-[390px] md:w-[470px] md:h-[470px] lg:w-[530px] lg:h-[530px] rounded-full border border-white/10 pointer-events-none z-0"
          />

          {/* Wrapper container for the concentric circle and image (500x500 size) */}
          <div className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[440px] md:h-[440px] lg:w-[500px] lg:h-[500px] relative flex justify-center items-center z-10">
            
            {/* Step 1: Solid Yellow Circle (Scales up first) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={preloaderCompleted ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.4 }}
              className="absolute w-full h-full rounded-full bg-[#ffbd39] shadow-2xl z-10"
            />

            {/* Step 2: Portrait image clipped into circle (Slides up from down to up on top with delay) */}
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={preloaderCompleted ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1], delay: 1.1 }}
              className="absolute w-full h-full rounded-full overflow-hidden z-20"
            >
              {/* Render the square avatar.jpg directly inside the round clipped wrapper. We apply scale-[1.08] directly to the img element to crop out any baked-in black border line from sliding up */}
              <img 
                src="/avatar.jpg" 
                alt="Vasishta Goutham Krishna Portrait" 
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 scale-[1.08] hover:scale-[1.15]"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>

          </div>
        </div>

        {/* Right Column: Roles & Status list (z-30 overlay, lg:ml offset to position ONLY 'A' and green dot inside the circle, self-center for vertical center) */}
        <motion.div 
          variants={fadeUpVariants} 
          className="flex flex-col items-start lg:items-start text-left order-3 select-none relative z-30 lg:ml-[25px] xl:ml-[30px] lg:self-center"
          style={{ fontFamily: "'Poppins', Arial, sans-serif" }}
        >
          {/* AI • DATA • Full Stack on a single line, font Poppins, font weight bold (700), dots are normal/gray-ish to prevent bold thickness */}
          <div 
            className="flex items-center flex-nowrap whitespace-nowrap tracking-tight text-[#FFFFFFE6] mb-4 leading-none"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="minimalist-keyword text-[28px] sm:text-[34px] md:text-[40px] font-bold">AI</span>
            <span className="mx-2 sm:mx-3 text-[24px] sm:text-[30px] md:text-[36px] font-normal text-neutral-500 select-none">•</span>
            <span className="minimalist-keyword text-[28px] sm:text-[34px] md:text-[40px] font-bold">DATA</span>
            <span className="mx-2 sm:mx-3 text-[24px] sm:text-[30px] md:text-[36px] font-normal text-neutral-500 select-none">•</span>
            <span className="minimalist-keyword text-[28px] sm:text-[34px] md:text-[40px] font-bold">Full Stack</span>
          </div>

          {/* Open to Work and Based in India positioned side-by-side horizontally */}
          <div className="flex flex-row items-center gap-5 text-neutral-400 text-xs sm:text-sm font-medium tracking-wide mt-2 flex-wrap">
            {/* Status 1: Open to Work */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-white/95 font-semibold">Open to Work</span>
            </div>

            {/* Status 2: Location */}
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500 inline-block"></span>
              <span className="text-white/95 font-semibold">Based in India</span>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
