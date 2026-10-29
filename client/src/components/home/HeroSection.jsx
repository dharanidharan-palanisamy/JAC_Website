import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = ({ settings, homeContent }) => {
  return (
    <section className="relative overflow-hidden nutz-hero-gradient pt-16 md:pt-24 pb-20 md:pb-32 text-center">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/25 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center min-w-0">
        {/* Sub-badge / Motto */}
        <div className="mb-4 sm:mb-6 max-w-2xl w-full px-2 text-center min-w-0">
          <span className="font-serif-italic text-base sm:text-2xl md:text-3xl text-neutral-800/90 tracking-tight font-normal block leading-snug">
            {homeContent?.heroTagline || 'Creative Design & Full-Stack IT Solutions Agency'}
          </span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="w-full max-w-4xl min-w-0 text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px] text-neutral-900 leading-[1.18] sm:leading-[1.08] tracking-tight mb-6 font-sans px-2 text-center">
          <span className="font-extrabold tracking-[-0.035em] block sm:inline">
            {homeContent?.heroHeading || 'Innovating Digital Possibilities,'}
          </span>{' '}
          <span className="font-serif-italic font-normal block sm:inline text-neutral-800 tracking-[-0.01em]">
            {homeContent?.heroHeadingItalic || 'Engineering Enterprise Growth.'}
          </span>
        </h1>

        {/* Sub-headline description */}
        <p className="w-full max-w-2xl min-w-0 mx-auto text-sm sm:text-lg md:text-xl text-neutral-700 leading-relaxed font-sans font-normal mb-8 px-2 text-center">
          {homeContent?.heroDescription ||
            settings?.heroSubheading ||
            'From Coimbatore & Chennai, we engineer websites, mobile apps, and iconic digital products for startups and enterprises across India and worldwide.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-md sm:max-w-2xl mx-auto px-2">
          <Link
            to={homeContent?.primaryCtaLink || '/contact'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base md:text-lg font-semibold rounded-full border-2 border-black bg-black text-white hover:bg-neutral-800 hover:border-neutral-800 transition-all duration-300 shadow-md group cursor-pointer text-center"
          >
            <span>{homeContent?.primaryCtaText || 'Explore Services'}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            to={homeContent?.secondaryCtaLink || '/portfolio'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base md:text-lg font-semibold rounded-full bg-white hover:bg-neutral-100 text-black border border-neutral-300 transition-all duration-300 shadow-xs text-center"
          >
            <span>{homeContent?.secondaryCtaText || 'Schedule Technical Consultation'}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
