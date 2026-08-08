import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const sentenceVariants = {
    hidden: { opacity: 0.2, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section id="about" className="pt-36 md:pt-48 pb-36 md:pb-48 bg-black text-white px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-[#ffbd39]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Heading and Scroll-Highlight Paragraph */}
          <div className="flex flex-col items-start text-left">
            
            
            <h2 className="text-3xl md:text-[38px] font-semibold tracking-tight leading-tight text-white mb-6">
              Who Am I??
            </h2>
            
            {/* Scroll-Driven Highlight Text (splits lines for staggered highlight) */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="text-lg md:text-[22px] font-medium leading-relaxed mt-4 flex flex-col gap-2 text-white/95"
              style={{ fontFamily: "'Poppins', Arial, sans-serif" }}
            >
              <motion.span variants={sentenceVariants} className="block">
                I'm a web designer with a passion for
              </motion.span>
              <motion.span variants={sentenceVariants} className="block">
                crafting unique, responsive, and user-
              </motion.span>
              <motion.span variants={sentenceVariants} className="block">
                friendly websites. I strive to bring a perfect
              </motion.span>
              <motion.span variants={sentenceVariants} className="block">
                balance between creativity and technology
              </motion.span>
              <motion.span variants={sentenceVariants} className="block">
                in every project.
              </motion.span>
            </motion.div>
          </div>

          {/* Right Column: About details table & projects completed count */}
          <div className="flex flex-col items-start lg:pl-12 text-left" style={{ fontFamily: "'Poppins', Arial, sans-serif" }}>
            <h2 className="text-4xl md:text-[54px] font-bold tracking-tight text-white mb-6">
              About Me
            </h2>

            <p className="text-neutral-400 font-light leading-relaxed max-w-xl mb-10 text-sm md:text-base">
              I am passionate about technology and design, creating innovative solutions that combine both aesthetics and functionality.
            </p>

            {/* Structured details list (no cards, matching flat list) */}
            <div className="grid grid-cols-[100px_1fr] gap-y-4 gap-x-4 text-sm md:text-base mb-12">
              <span className="font-bold text-white">Name:</span>
              <span className="text-neutral-400">Vasishta Goutham Krishna</span>
              
              <span className="font-bold text-white">Address:</span>
              <span className="text-neutral-400 font-light">Guntur, Andhra Pradesh, India</span>
              
              <span className="font-bold text-white">Email:</span>
              <a 
                href="mailto:vasishtagouthamkrishna@gmail.com" 
                className="text-neutral-400 hover:text-[#ffbd39] transition-colors duration-300 break-all font-light"
              >
                vasishtagouthamkrishna@gmail.com
              </a>
            </div>

            {/* Flat styled projects completed count */}
            <div className="flex items-center gap-2.5 text-lg md:text-xl font-bold tracking-tight">
              <span className="text-[#ffbd39] text-2xl md:text-3xl font-extrabold">7</span>
              <span className="text-white">Projects Completed</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
