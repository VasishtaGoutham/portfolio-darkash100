import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { greetings } from '../data/greetings';

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  // Update dimension states on mount
  useEffect(() => {
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Loop through greetings
  useEffect(() => {
    if (index === greetings.length - 1) {
      // Hold the last greeting briefly, then trigger the exit sequence
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000); // Hold last greeting
      return () => clearTimeout(timeout);
    }

    const interval = setTimeout(() => {
      setIndex((prevIndex) => prevIndex + 1);
    }, index === 0 ? 600 : 450); // Slowed down from 250ms to 450ms for better readability

    return () => clearTimeout(interval);
  }, [index, onComplete]);

  // Framer Motion variants for greeting text transition (in-place fade replace)
  const textVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
  };

  // SVG morphing curve calculations
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} Z`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} Z`;

  const slideUp = {
    initial: {
      top: 0,
    },
    exit: {
      top: "-130vh",
      transition: {
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2,
      },
    },
  };

  const curve = {
    initial: {
      d: initialPath,
    },
    exit: {
      d: targetPath,
      transition: {
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[100] bg-black cursor-wait"
      style={{ height: 'calc(100vh + 300px)' }}
    >
      {dimension.width > 0 && (
        <>
          {/* Centered Content Wrapper (exactly 100vh viewport height) */}
          <div className="absolute top-0 left-0 w-full h-[100vh] flex items-center justify-center">
            <div className="relative z-10 flex items-center gap-4 md:gap-5 select-none">
              {/* Small Ivory Circular Dot */}
              <motion.span
                animate={{
                  scale: [0.9, 1.2, 0.9],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-accent inline-block"
              />

              {/* Dynamic Greeting Text */}
              <div className="flex items-center justify-start">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={index}
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    dir={greetings[index].isRtl ? 'rtl' : 'ltr'}
                    className="text-white text-3xl md:text-5xl font-normal font-sans tracking-tight leading-none"
                    style={{ color: '#ECE7E1' }}
                  >
                    {greetings[index].text}
                  </motion.h1>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Morphing Curtain Background SVG */}
          <svg className="absolute top-0 left-0 w-full pointer-events-none fill-black" style={{ height: 'calc(100% + 300px)' }}>
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
}
