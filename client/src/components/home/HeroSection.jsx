import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = ({ settings }) => {
  return (
    <section className="relative overflow-hidden nutz-hero-gradient pt-16 md:pt-24 pb-20 md:pb-32 text-center">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/25 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        {/* Sub-badge / Motto */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 sm:mb-6"
        >
          <span className="font-serif-italic text-2xl sm:text-3xl md:text-4xl text-[#111111]/90 tracking-tight">
            Innovating for You, Building for Us.
          </span>
        </motion.div>

        {/* Main Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#111111] leading-[1.08] tracking-tight mb-8"
        >
          <span className="font-sans-tight font-bold">Creative Design</span>{' '}
          <span className="font-serif-italic font-normal block sm:inline">
            & Full-Stack Agency
          </span>
        </motion.h1>

        {/* Sub-headline description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-3xl mx-auto text-base sm:text-xl md:text-2xl text-[#111111]/80 leading-relaxed font-sans-tight font-normal mb-10 px-2"
        >
          {settings?.heroSubheading ||
            'From Coimbatore & Chennai, we engineer websites, mobile apps, and iconic digital products for startups and enterprises across India and worldwide.'}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto"
        >
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base sm:text-lg font-medium rounded-full border-2 border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-300 shadow-md group cursor-pointer"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            to="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg font-medium rounded-full bg-white/70 hover:bg-white text-black border border-black/10 transition-all duration-300 backdrop-blur-xs"
          >
            <span>Explore Our Work</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
