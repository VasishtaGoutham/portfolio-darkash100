import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const { skills } = portfolioData;
  const [activeRow, setActiveRow] = useState(null);

  return (
    <section id="skills" className="bg-white text-black relative overflow-hidden select-none w-full pb-24">
      {/* Subtle light ambient decorative glow */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-neutral-100 blur-[120px] pointer-events-none" />

      {/* Header Container (matching div.skills-header inspect specifications) */}
      <div 
        className="skills-header w-full text-left"
        style={{ 
          padding: '96px 71.16px 48px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '16px'
        }}
      >
        {/* Section Headers */}
        <span 
          className="text-neutral-500 text-xs uppercase tracking-[0.2em] font-semibold block" 
          style={{ marginBottom: '16px', fontFamily: "'Poppins', sans-serif" }}
        >
          Skills & Philosophy
        </span>
        
        <blockquote 
          className="skills-header-quote font-bold tracking-tight text-black"
          style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontSize: 'clamp(32px, 5.5vw, 72px)',
            lineHeight: '1.1',
            marginBottom: '16px'
          }}
        >
          "GREAT SOFTWARE HIDES COMPLEXITY AND REVEALS SIMPLICITY."
        </blockquote>
        
        <p className="text-neutral-500 text-sm font-light italic" style={{ fontFamily: "'Poppins', sans-serif" }}>
          — Anonymous
        </p>
      </div>

      {/* Flowing Menu Container (Spans 100% edge-to-edge screen width) */}
      <div className="w-full border-t border-black/10">
        {skills.map((skillGroup, groupIdx) => {
          const isHovered = activeRow === groupIdx;
          
          // Triple the items array to ensure it spans full width and loops infinitely
          const doubledItems = [...skillGroup.items, ...skillGroup.items, ...skillGroup.items];

          return (
            <div
              key={groupIdx}
              onMouseEnter={() => setActiveRow(groupIdx)}
              onMouseLeave={() => setActiveRow(null)}
              // Touch support for mobile devices
              onTouchStart={() => setActiveRow(groupIdx === activeRow ? null : groupIdx)}
              className="group relative overflow-hidden border-b border-black/10 flex items-center transition-all duration-300 cursor-pointer w-full"
              style={{ height: '128.29px' }}
            >
              {/* Initial Category Title State (a.fm-item-link with exact inspect specifications) */}
              <a 
                className={`fm-item-link flex items-center w-full h-full transition-all duration-500 z-10 pl-6 md:pl-20 xl:pl-[142.312px] ${
                  isHovered ? 'opacity-10 pointer-events-none translate-x-4' : 'opacity-100 translate-x-0'
                }`}
                style={{
                  height: '128.29px'
                }}
              >
                <span 
                  className="font-extrabold uppercase tracking-wide text-black mr-3.5"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '41.076px',
                    fontWeight: '800',
                    lineHeight: '1'
                  }}
                >
                  {skillGroup.category}
                </span>
                <ArrowUpRight className="w-7 h-7 md:w-[36px] md:h-[36px] text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ strokeWidth: '2.5px' }} />
              </a>

              {/* Sliding Overlay containing the infinite Scrolling Marquee (Spans full screen edge-to-edge) */}
              <div 
                className={`absolute inset-0 bg-black flex items-center overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-20 w-full ${
                  isHovered ? 'translate-y-0 pointer-events-auto' : 'translate-y-[101%] pointer-events-none'
                }`}
              >
                {/* Marquee Inner Scroll Track */}
                <div className="flex whitespace-nowrap h-full items-center animate-marquee scroll-smooth w-full">
                  {doubledItems.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center gap-3 md:gap-4 mx-6 md:mx-10 flex-shrink-0">
                      {/* Icon Image */}
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="h-8 w-8 md:h-12 md:w-12 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      {/* Tech Name */}
                      <span className="text-white text-base md:text-xl font-bold uppercase tracking-wider">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
