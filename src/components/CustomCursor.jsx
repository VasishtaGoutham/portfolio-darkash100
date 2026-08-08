import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth trail spring configuration for fluid trailing trail
  const springConfig = { damping: 28, stiffness: 300, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      // Calculate offset based on hover state (large circle vs small dot)
      const offset = isHovered ? 35 : 6;
      cursorX.set(e.clientX - offset);
      cursorY.set(e.clientY - offset);
    };

    window.addEventListener('mousemove', moveCursor);

    // Dynamic hover detector for all clickable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      // Stop the hover effect (scaling up & arrow icon) when hovering on "Let's Talk."
      const isLetsTalk = target.closest('.lets-talk-btn');

      if (isLetsTalk) {
        setIsHovered(false);
        return;
      }

      const isClickable = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.clickable') || 
        window.getComputedStyle(target).cursor === 'pointer';

      if (isClickable) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      setIsHovered(false);
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, isHovered]);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full bg-brandYellow pointer-events-none z-[9999] hidden md:flex items-center justify-center shadow-lg"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: isHovered ? 70 : 12,
        height: isHovered ? 70 : 12,
      }}
      layout
    >
      {/* Show the arrow icon inside the solid golden circle when hovering */}
      {isHovered && (
        <motion.svg
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0c0c0c"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </motion.svg>
      )}
    </motion.div>
  );
}
