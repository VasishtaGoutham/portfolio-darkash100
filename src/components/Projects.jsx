import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-36 md:py-48 bg-black text-white px-6 md:px-12 lg:px-24 relative select-none">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] rounded-full bg-brandYellow/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-24">
          <span className="text-brandYellow text-xs uppercase tracking-[0.2em] font-semibold mb-2">My Projects</span>
          <h2 className="text-3xl md:text-5xl font-bold font-sans tracking-tight">Showcase & Solutions</h2>
          <p className="text-neutral-400 text-sm md:text-base font-light mt-4 max-w-lg">
            Real-world solutions built with modern web, AI, and database technologies.
          </p>
        </div>

        {/* Sticky Card Stacking container */}
        <div className="flex flex-col gap-12 md:gap-16">
          {projects.map((project, idx) => (
            <ProjectCard key={project.number} project={project} index={idx} total={projects.length} />
          ))}
        </div>

      </div>
    </section>
  );
}

function ProjectCard({ project, index, total }) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const nextImg = (e) => {
    e.preventDefault();
    setActiveImgIdx((prev) => (prev + 1) % project.images.length);
  };

  const prevImg = (e) => {
    e.preventDefault();
    setActiveImgIdx((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  // Stacking offset scales down earlier cards slightly when they are stacked underneath
  const scale = 1 - (total - 1 - index) * 0.005;

  return (
    <div
      className="sticky top-28 md:top-36 bg-[#0c0c0c]/90 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col lg:flex-row items-center gap-8 md:gap-12 min-h-[480px] backdrop-blur-xl transition-all duration-500 ease-out"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
    >
      {/* Absolute slide index number background decorative tag */}
      <span className="absolute top-6 right-8 text-neutral-800 text-6xl md:text-8xl font-black font-sans select-none pointer-events-none opacity-30 z-0">
        ({project.number})
      </span>

      {/* Left side: Image Slider Carousel */}
      <div className="w-full lg:w-1/2 flex flex-col gap-3 relative z-10">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-white/10 group">
          
          {/* Animated Image View */}
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImgIdx}
              src={project.images[activeImgIdx]}
              alt={`${project.title} Preview ${activeImgIdx + 1}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover select-none pointer-events-none"
              onError={(e) => {
                // If cloudinary/resource link fails, display fallback stylized icon/logo
                e.target.style.display = 'none';
              }}
            />
          </AnimatePresence>

          {/* Slider controls (Only visible if project has multiple images) */}
          {project.images.length > 1 && (
            <>
              <button 
                onClick={prevImg}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-brandYellow hover:text-black text-white p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextImg}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-brandYellow hover:text-black text-white p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-0 w-full flex justify-center gap-1.5 z-10">
              {project.images.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveImgIdx(dotIdx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeImgIdx === dotIdx ? 'bg-brandYellow w-5' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right side: Project Details & Tech Stack */}
      <div className="w-full lg:w-1/2 flex flex-col items-start text-left relative z-10">
        <span className="text-brandYellow text-xs font-semibold tracking-wider bg-brandYellow/10 px-3 py-1 rounded-full mb-4">
          {project.tech}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight leading-none group-hover:text-brandYellow">
          {project.title}
        </h3>
        <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed mb-6 max-w-lg">
          {project.description}
        </p>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 border border-neutral-800 hover:border-neutral-500 hover:bg-white/5 text-white font-medium text-sm px-6 py-3 rounded-lg transition-all duration-300 shadow-lg active:scale-95"
          >
            <span>Live Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        )}
      </div>

    </div>
  );
}
