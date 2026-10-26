import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const defaultClientLogos = [
  { id: 1, src: '/Logos/optimized/1.png', alt: 'Client Partner 1' },
  { id: 2, src: '/Logos/optimized/2.png', alt: 'Client Partner 2' },
  { id: 3, src: '/Logos/optimized/3.png', alt: 'Client Partner 3' },
  { id: 4, src: '/Logos/optimized/4.png', alt: 'Client Partner 4' },
  { id: 5, src: '/Logos/optimized/5.png', alt: 'Client Partner 5' },
  { id: 6, src: '/Logos/optimized/6.png', alt: 'Client Partner 6' },
  { id: 7, src: '/Logos/optimized/7.png', alt: 'Client Partner 7' },
  { id: 8, src: '/Logos/optimized/8.png', alt: 'Client Partner 8' },
  { id: 9, src: '/Logos/optimized/9.png', alt: 'Client Partner 9' },
  { id: 10, src: '/Logos/optimized/10.png', alt: 'Client Partner 10' },
  { id: 11, src: '/Logos/optimized/11.png', alt: 'Client Partner 11' },
  { id: 12, src: '/Logos/optimized/12.png', alt: 'Client Partner 12' },
  { id: 13, src: '/Logos/optimized/13.png', alt: 'Client Partner 13' },
  { id: 14, src: '/Logos/optimized/14.png', alt: 'Client Partner 14' },
];

const LogosMarquee = () => {
  const [logos, setLogos] = useState(defaultClientLogos);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await api.getLogos();
        if (res.success && res.data && res.data.length > 0) {
          setLogos(res.data.map((l) => ({
            id: l.id || l._id,
            src: l.src,
            alt: l.name || 'Client Partner'
          })));
        }
      } catch (err) {
        console.error('Error fetching partner logos from API, using default fallback:', err);
      }
    };
    fetchLogos();
  }, []);

  const row1Logos = logos;
  const row2Logos = [...logos].reverse();
  return (
    <section className="py-14 sm:py-20 bg-[#FBFBFA] border-y border-neutral-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12 sm:mb-14">
        <span className="text-xs uppercase font-semibold tracking-widest text-neutral-400">
          Trusted by Innovative Startups &amp; Enterprise Teams Across the Globe
        </span>
      </div>

      <div className="flex flex-col gap-10 sm:gap-14">
        {/* Line 1: Right to Left */}
        <div className="relative w-full overflow-hidden flex">
          <div className="animate-marquee flex items-center gap-8 sm:gap-12 whitespace-nowrap">
            {[...row1Logos, ...row1Logos].map((logo, index) => (
              <div
                key={`r1-${logo.id}-${index}`}
                className="flex items-center justify-center shrink-0 px-2 sm:px-3 group cursor-pointer transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-105"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-9 sm:h-11 max-w-[140px] sm:max-w-[170px] w-auto object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Line 2: Left to Right */}
        <div className="relative w-full overflow-hidden flex">
          <div className="animate-marquee-reverse flex items-center gap-8 sm:gap-12 whitespace-nowrap">
            {[...row2Logos, ...row2Logos].map((logo, index) => (
              <div
                key={`r2-${logo.id}-${index}`}
                className="flex items-center justify-center shrink-0 px-2 sm:px-3 group cursor-pointer transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-105"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-9 sm:h-11 max-w-[140px] sm:max-w-[170px] w-auto object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogosMarquee;
