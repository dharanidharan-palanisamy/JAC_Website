import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ServicesShowcase = ({ services = [] }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-[#F1F1EF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 block mb-3">
              Capabilities & Services
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
              Digital solutions{' '}
              <span className="font-serif-italic font-normal text-neutral-800">
                engineered for scale.
              </span>
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg max-w-2xl mt-4">
              Explore our core disciplines. We bridge creative intuition with enterprise-grade engineering to deliver products that perform.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3.5 rounded-full bg-white hover:bg-neutral-900 hover:text-white text-neutral-800 transition-all border border-neutral-300/70 shadow-xs cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3.5 rounded-full bg-white hover:bg-neutral-900 hover:text-white text-neutral-800 transition-all border border-neutral-300/70 shadow-xs cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 sm:px-8 max-w-7xl mx-auto scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service, index) => {
          // Format title to have first word italicized like nutz.in
          const words = service.title.split(' ');
          const firstWord = words[0];
          const remainingWords = words.slice(1).join(' ');

          return (
            <motion.div
              key={service._id || service.slug}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="shrink-0 w-[290px] sm:w-[350px] h-[480px] sm:h-[520px] rounded-3xl relative overflow-hidden group shadow-lg snap-start cursor-pointer bg-neutral-900"
            >
              <Link to={`/services/${service.slug}`} className="block w-full h-full">
                {/* Background Image */}
                <img
                  src={
                    service.featuredImage ||
                    'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-75"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 group-hover:via-black/50 transition-colors" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white z-10">
                  {/* Top Bar with Number & Arrow */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-medium tracking-widest text-neutral-400 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
                      0{index + 1}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all duration-300 backdrop-blur-xs">
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-normal leading-tight mb-3">
                      <span className="font-serif-italic">{firstWord}</span>{' '}
                      <span className="font-sans font-semibold">{remainingWords}</span>
                    </h3>
                    <p className="text-neutral-300 text-xs sm:text-sm line-clamp-2 mb-5 font-normal leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      {(service.tags || []).slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-medium bg-white/15 px-2.5 py-1 rounded-full backdrop-blur-xs text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 text-center">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 text-sm font-semibold text-neutral-800 hover:bg-neutral-900 hover:text-white transition-all duration-300"
        >
          <span>View All 6 Core Services</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default ServicesShowcase;
