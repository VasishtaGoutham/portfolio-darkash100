import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API request send
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-36 md:py-48 bg-black text-white px-6 md:px-12 lg:px-24 relative overflow-hidden flex flex-col justify-center items-center">
      {/* Background glow decorator */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-brandYellow/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10 w-full" style={{ fontFamily: "'Poppins', sans-serif" }}>
        
        {/* Overlapping Section Title Area for Contact (looks exactly same as Resume/Experience title block) */}
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
            Contact
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
            Get In Touch
          </h2>
        </div>

        {/* Paragraph description with yellow email link (using user specific email: vasishtagouthamkrishna@gmail.com) */}
        <p 
          className="max-w-3xl mx-auto mb-20 px-4"
          style={{ 
            fontFamily: "'Poppins', Arial, sans-serif",
            fontSize: "16px",
            color: "#999999",
            lineHeight: "30px",
            fontWeight: 300,
            letterSpacing: "0.02em"
          }}
        >
          Get in touch or shoot me an email directly on <a href="mailto:vasishtagouthamkrishna@gmail.com" className="text-brandYellow hover:underline transition-colors duration-300 font-semibold">vasishtagouthamkrishna@gmail.com</a>
        </p>

        {/* Centered Form Card */}
        <div className="max-w-xl mx-auto bg-[#111111] border border-white/5 p-8 md:p-12 rounded-2xl text-left shadow-2xl backdrop-blur-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Name Input */}
            <div className="flex flex-col gap-2.5">
              <label className="text-white text-sm font-semibold tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>Name</label>
              <input 
                type="text" 
                name="name" 
                required
                value={formData.name}
                onChange={handleChange}
                className="bg-white text-black py-4 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandYellow w-full transition-all duration-300 font-medium"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2.5">
              <label className="text-white text-sm font-semibold tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>Email</label>
              <input 
                type="email" 
                name="email" 
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-white text-black py-4 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandYellow w-full transition-all duration-300 font-medium"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />
            </div>

            {/* Message Input */}
            <div className="flex flex-col gap-2.5">
              <label className="text-white text-sm font-semibold tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>Message</label>
              <textarea 
                name="message" 
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                className="bg-white text-black py-4 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandYellow w-full transition-all duration-300 resize-none font-medium"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />
            </div>

            {/* Submit CTA (dark charcoal button matching reference, left-aligned) */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-[#2d2d2d] text-white hover:bg-brandYellow hover:text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-md self-start mt-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}
