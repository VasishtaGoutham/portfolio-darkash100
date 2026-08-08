import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

// Scroll reveal heading component: reveals white text over a grey base as user scrolls (no icons, exact 28px font size & 30% white opacity base color)
function ScrollRevealHeading({ children }) {
  const targetRef = useRef(null);
  
  // Track scroll progress of the heading element in the viewport
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.9", "end 0.6"]
  });

  // Map progress to clip width
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={targetRef} className="relative flex items-center justify-center select-none w-fit mx-auto mb-16">
      {/* Base heading (muted grey, exact 30% white opacity (#FFFFFF4D), size exactly 28px) */}
      <h3 
        className="font-semibold pb-3 text-left"
        style={{ 
          fontSize: "28px", 
          color: "rgba(255, 255, 255, 0.3)", 
          fontFamily: "'Poppins', Arial, sans-serif" 
        }}
      >
        <span>{children}</span>
      </h3>

      {/* Overlaid heading (fully white, revealed via clip width) */}
      <motion.div 
        style={{ width }}
        className="absolute top-0 left-0 overflow-hidden whitespace-nowrap select-none"
      >
        <h3 
          className="font-semibold pb-3 text-left"
          style={{ 
            fontSize: "28px", 
            color: "#ffffff", 
            fontFamily: "'Poppins', Arial, sans-serif" 
          }}
        >
          <span>{children}</span>
        </h3>
      </motion.div>
    </div>
  );
}

export default function Resume() {
  const { education, experience } = portfolioData;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <div className="select-none">
      
      {/* SECTION 1: Resume Call To Action (background flat bg-black, no gradients/glows to ensure 100% matching background color) */}
      <section id="resume" className="py-36 md:py-48 bg-black text-white px-6 md:px-12 lg:px-24 relative overflow-hidden flex flex-col justify-center items-center">
        
        {/* Soft backdrop radial blur glow (halo directly behind the text block) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_70%)] blur-3xl pointer-events-none z-0" />
        
        {/* Spotlight overhead blur glow effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),transparent_65%)] pointer-events-none z-0" />
        
        {/* Background ambient decorator glow */}
        <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] rounded-full bg-brandYellow/5 blur-[120px] pointer-events-none" />

        {/* Content wrapper relative z-10 */}
        <div className="max-w-7xl mx-auto text-center relative z-10 w-full" style={{ fontFamily: "'Poppins', sans-serif" }}>
          
          {/* Overlapping Section Title Area (height determined naturally by foreground heading for correct paragraph spacing) */}
          <div 
            className="relative flex justify-center items-center overflow-visible min-h-[50px] md:min-h-[75px]"
            style={{ marginBottom: "48px" }}
          >
            {/* Giant background word - same capitalization and standard tracking as foreground, just scaled up */}
            <span 
              className="select-none absolute z-0 pointer-events-none whitespace-nowrap"
              style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(120px, 20vw, 240px)",
                color: "rgba(255, 255, 255, 0.05)",
                letterSpacing: "normal",
                fontWeight: 700,
                lineHeight: "1"
              }}
            >
              Resume
            </span>
            {/* Centered foreground section title (50px Poppins white) - relative to define container height */}
            <h2 
              className="tracking-tight relative z-10"
              style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(32px, 5vw, 50px)",
                color: "#ffffff",
                fontWeight: 700,
                lineHeight: "1"
              }}
            >
              Resume
            </h2>
          </div>

          {/* Paragraph description (16px Poppins color #999999, exact font weight and line height matching reference) */}
          <p 
            className="max-w-3xl mx-auto mb-12"
            style={{ 
              fontFamily: "'Poppins', Arial, sans-serif",
              fontSize: "16px",
              color: "#999999",
              lineHeight: "30px",
              fontWeight: 300,
              letterSpacing: "0.02em"
            }}
          >
            Fueled by innovation and creativity, I thrive at the intersection of AI, data science,<br className="hidden md:block" /> and full-stack development&mdash;crafting solutions that make a real impact.
          </p>

          {/* Yellow Pill View Resume Button */}
          <a 
            href="https://drive.google.com/file/d/1JKs4nHmbNHRXk7vKaP4HfNoPV0SBbTkv/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#ffbd39] text-black font-bold text-xs md:text-sm tracking-wider uppercase px-8 py-4 rounded-full hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
          >
            View Resume
          </a>
        </div>
      </section>

      {/* SECTION 2: Education Details (Rendered as a separate full section below) */}
      <section id="education" className="py-36 md:py-48 bg-black text-white px-6 md:px-12 lg:px-24 relative overflow-hidden">
        
        <div className="max-w-4xl mx-auto text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
          
          {/* Education Timeline (Logo Left, Details Right card structure styled via timeline-card class) */}
          <div className="max-w-3xl mx-auto">
            {/* Scroll Reveal Heading */}
            <ScrollRevealHeading>
              Education Details
            </ScrollRevealHeading>

            <div className="flex flex-col max-w-3xl mx-auto text-left">
              {education.map((edu, idx) => {
                // Return logo images with public folder sourcing and SVG fallbacks
                const getLogo = (index) => {
                  if (index === 0) {
                    return (
                      <img 
                        src="/MBU.png" 
                        alt="Mohan Babu University Logo" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    );
                  } else if (index === 1) {
                    return (
                      <img 
                        src="/sri chaitanya.jpg" 
                        alt="Sri Chaitanya Logo" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    );
                  } else {
                    return (
                      <img 
                        src="/Bhashayam.jpg" 
                        alt="Bhashyam Logo" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    );
                  }
                };

                const getFallbackLogo = (index) => {
                  if (index === 0) {
                    return (
                      <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600 hidden">
                        <path d="M50 15 L20 30 V60 C20 75 50 85 50 85 C50 85 80 75 80 60 V30 L50 15 Z" fill="none" stroke="currentColor" strokeWidth="6" />
                        <text x="50" y="54" fontSize="22" fontWeight="bold" textAnchor="middle" fill="currentColor" fontFamily="sans-serif">MBU</text>
                        <circle cx="50" cy="71" r="3.5" fill="currentColor" />
                      </svg>
                    );
                  } else if (index === 1) {
                    return (
                      <svg viewBox="0 0 100 100" className="w-full h-full text-orange-500 hidden">
                        <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="6" />
                        <path d="M50 20 L58 42 L80 50 L58 58 L50 80 L42 58 L20 50 L42 42 Z" fill="currentColor" />
                        <text x="50" y="55" fontSize="14" fontWeight="900" textAnchor="middle" fill="white" fontFamily="sans-serif">SC</text>
                      </svg>
                    );
                  } else {
                    return (
                      <svg viewBox="0 0 100 100" className="w-full h-full text-blue-600 hidden">
                        <path d="M30 20 H70 V55 C70 70 50 80 50 80 C50 80 30 70 30 55 V20 Z" fill="none" stroke="currentColor" strokeWidth="6" />
                        <text x="50" y="52" fontSize="20" fontWeight="bold" textAnchor="middle" fill="currentColor" fontFamily="sans-serif">BPS</text>
                      </svg>
                    );
                  }
                };

                return (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="timeline-card flex-row items-center gap-6 group"
                  >
                    {/* Logo box */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center p-3 shadow-md flex-shrink-0 relative overflow-hidden">
                      {getLogo(idx)}
                      {getFallbackLogo(idx)}
                    </div>

                    {/* Details (font sizes adjusted to match reference screenshot precisely) */}
                    <div className="flex flex-col">
                      <span className="text-[13px] sm:text-[15px] font-bold text-brandYellow mb-2 tracking-wider uppercase">
                        {edu.year}
                      </span>
                      <h4 className="text-[20px] sm:text-[24px] font-bold text-white mb-1.5 tracking-wide leading-snug">
                        {edu.degree}
                      </h4>
                      <p className="text-neutral-400 text-[13px] sm:text-[15px] font-bold uppercase tracking-widest">
                        {edu.school}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: Experience Details (Rendered as a separate full section with matching overlapping header block) */}
      <section id="experience" className="py-36 md:py-48 bg-black text-white px-6 md:px-12 lg:px-24 relative overflow-hidden flex flex-col justify-center items-center">
        
        {/* Soft backdrop radial blur glow (halo directly behind the text block) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_70%)] blur-3xl pointer-events-none z-0" />
        
        {/* Spotlight overhead blur glow effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),transparent_65%)] pointer-events-none z-0" />
        
        {/* Background ambient decorator glow */}
        <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] rounded-full bg-brandYellow/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10 w-full" style={{ fontFamily: "'Poppins', sans-serif" }}>
          
          {/* Overlapping Section Title Area for Experience (looks exactly same as Resume title block) */}
          <div 
            className="relative flex justify-center items-center overflow-visible min-h-[50px] md:min-h-[75px]"
            style={{ marginBottom: "48px" }}
          >
            {/* Giant background word - same capitalization and standard tracking, just scaled up */}
            <span 
              className="select-none absolute z-0 pointer-events-none whitespace-nowrap"
              style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(120px, 20vw, 240px)",
                color: "rgba(255, 255, 255, 0.05)",
                letterSpacing: "normal",
                fontWeight: 700,
                lineHeight: "1"
              }}
            >
              Experience
            </span>
            {/* Centered foreground section title (50px Poppins white) - relative to define container height */}
            <h2 
              className="tracking-tight relative z-10"
              style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(32px, 5vw, 50px)",
                color: "#ffffff",
                fontWeight: 700,
                lineHeight: "1"
              }}
            >
              Experience
            </h2>
          </div>

          {/* Paragraph description (exact text from user's request, 16px Poppins color #999999, line height 30px) */}
          <p 
            className="max-w-3xl mx-auto mb-20"
            style={{ 
              fontFamily: "'Poppins', Arial, sans-serif",
              fontSize: "16px",
              color: "#999999",
              lineHeight: "30px",
              fontWeight: 300,
              letterSpacing: "0.02em"
            }}
          >
            Passionate about AI, data, and full-stack development, I craft solutions that empower people and drive meaningful impact.
          </p>

          {/* Experience Cards container (rendered inline below the header block) */}
          <div className="flex flex-col max-w-3xl mx-auto text-left w-full mt-8">
            {experience.map((exp, idx) => {
              // Return logo image for EduSkills Academy and fallbacks
              const getLogo = () => {
                return (
                  <img 
                    src="/eduskills_logo.png" 
                    alt="EduSkills Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                );
              };

              const getFallbackLogo = () => {
                return (
                  <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-600 hidden">
                    <path d="M50 15 L80 32 V62 L50 82 L20 62 V32 Z" fill="none" stroke="currentColor" strokeWidth="6" />
                    <text x="50" y="58" fontSize="20" fontWeight="bold" textAnchor="middle" fill="currentColor" fontFamily="sans-serif">ES</text>
                  </svg>
                );
              };

              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="timeline-card flex-col gap-4 group"
                >
                  {/* Header Row: Logo + Main Details */}
                  <div className="flex flex-row items-center gap-6">
                    {/* Logo box */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center p-3 shadow-md flex-shrink-0 relative overflow-hidden">
                      {getLogo()}
                      {getFallbackLogo()}
                    </div>

                    {/* Title & Company (font sizes adjusted to match reference screenshot precisely) */}
                    <div className="flex flex-col">
                      <span className="text-[13px] sm:text-[15px] font-bold text-brandYellow mb-2 tracking-wider uppercase">
                        {exp.date}
                      </span>
                      <h4 className="text-[20px] sm:text-[24px] font-bold text-white mb-1 tracking-wide leading-snug">
                        {exp.title}
                      </h4>
                      <p className="text-neutral-400 text-[13px] sm:text-[15px] font-bold uppercase tracking-widest">
                        {exp.company}
                      </p>
                      {exp.project && (
                        <p 
                          className="text-neutral-300 text-sm font-medium italic mt-2"
                          style={{ fontFamily: "'Poppins', Arial, sans-serif" }}
                        >
                          {exp.project}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bullets List (rendered below the logo alignment row) */}
                  <ul className="flex flex-col gap-2.5 text-neutral-400 text-sm font-light pl-22 sm:pl-26">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex gap-2 items-start">
                        <span className="text-brandYellow mt-1.5 flex-shrink-0 font-bold">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
