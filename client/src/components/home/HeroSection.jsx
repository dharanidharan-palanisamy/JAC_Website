import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = ({ settings, homeContent }) => {
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
            {homeContent?.heroTagline || 'Innovating for You, Building for Us.'}
          </span>
        </motion.div>

        {/* Main Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-3xl sm:text-5xl md:text-6xl font-normal text-[#111111] leading-[1.14] tracking-tight mb-6 max-w-4xl"
        >
          <span className="font-sans-tight font-bold">
            {homeContent?.heroHeading || 'Creative Design'}
          </span>{' '}
          <span className="font-serif-italic font-normal block sm:inline">
            {homeContent?.heroHeadingItalic || '& Full-Stack Agency'}
          </span>
        </motion.h1>

        {/* Sub-headline description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[#111111]/80 leading-relaxed font-sans-tight font-normal mb-8 px-2"
        >
          {homeContent?.heroDescription ||
            settings?.heroSubheading ||
            'From Coimbatore & Chennai, we engineer websites, mobile apps, and iconic digital products for startups and enterprises across India and worldwide.'}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-2xl mx-auto"
        >
          <Link
            to={homeContent?.primaryCtaLink || '/contact'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 text-base sm:text-lg font-medium rounded-full border-2 border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-300 shadow-md group cursor-pointer whitespace-nowrap"
          >
            <span className="whitespace-nowrap">{homeContent?.primaryCtaText || 'Explore Services'}</span>
            <ArrowRight className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            to={homeContent?.secondaryCtaLink || '/portfolio'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base sm:text-lg font-medium rounded-full bg-white/70 hover:bg-white text-black border border-black/10 transition-all duration-300 backdrop-blur-xs whitespace-nowrap"
          >
            <span className="whitespace-nowrap">{homeContent?.secondaryCtaText || 'Schedule Technical Consultation'}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
