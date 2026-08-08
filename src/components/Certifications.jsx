import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Certifications() {
  const { certifications } = portfolioData;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <section id="certifications" className="py-36 md:py-48 bg-black text-white px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] rounded-full bg-brandYellow/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="text-brandYellow text-xs uppercase tracking-[0.2em] font-semibold mb-2">Certifications</span>
          <h2 className="text-3xl md:text-5xl font-bold font-sans tracking-tight">Professional Credentials</h2>
          <p className="text-neutral-400 text-sm md:text-base font-light mt-4 max-w-lg">
            Courses and certifications demonstrating my dedication to continuous learning and technical mastery.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{ y: -6, borderColor: "rgba(230, 181, 45, 0.3)" }}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-[280px] transition-all duration-300 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(230,181,45,0.12)] hover:bg-white/[0.04] text-left"
            >
              {/* Year decorative background number */}
              <span className="absolute -right-4 -bottom-6 text-neutral-800/25 text-8xl font-black font-sans tracking-tight select-none pointer-events-none group-hover:text-brandYellow/10 transition-colors duration-300">
                {cert.year}
              </span>

              {/* Top half: Info */}
              <div className="flex flex-col gap-3 relative z-10">
                <span className="text-brandYellow text-xs font-semibold tracking-wider bg-brandYellow/10 px-2.5 py-0.5 rounded-md w-fit">
                  {cert.issuer}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-brandYellow transition-colors duration-300">
                  {cert.title}
                </h3>
                <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed mb-4">
                  {cert.description}
                </p>
              </div>

              {/* Bottom half: Link */}
              <div className="relative z-10">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-neutral-300 hover:text-white transition-colors duration-300"
                >
                  <span>View Credential</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
