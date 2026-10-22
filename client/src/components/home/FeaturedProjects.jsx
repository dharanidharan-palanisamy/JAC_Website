import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Web Development', 'App Development', 'UI/UX Design'];

const FeaturedProjects = ({ projects = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section className="py-24 sm:py-32 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 block mb-3">
              Case Studies & Portfolio
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
              Work that creates{' '}
              <span className="font-serif-italic font-normal text-neutral-800">
                measurable results.
              </span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filtered.slice(0, 3).map((project, idx) => (
              <motion.div
                key={project._id || project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-neutral-200/70 shadow-xs hover:shadow-lg transition-all duration-300"
              >
                {/* Media Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-white/90 backdrop-blur-md text-neutral-900 text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-2xs">
                      {project.category}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      {project.year || '2025'}
                    </span>
                  </div>
                </div>

                {/* Information Card Body */}
                <div className="p-5 sm:p-6 flex flex-col justify-between grow">
                  <div>
                    <span className="text-xs font-mono font-medium text-neutral-400 block mb-1.5 uppercase tracking-wider">
                      Client: {project.client}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 group-hover:text-neutral-700 transition-colors">
                      <Link to={`/portfolio/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.summary}
                    </p>
                  </div>

                  {/* Highlights / Results Badges */}
                  <div className="pt-3.5 border-t border-neutral-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {(project.results || []).slice(0, 2).map((res, rIdx) => (
                        <div key={rIdx} className="flex flex-col">
                          <span className="text-base sm:text-lg font-bold text-black font-sans-tight">{res.metric}</span>
                          <span className="text-[10px] sm:text-[11px] text-neutral-500 uppercase">{res.label}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="text-xs font-semibold text-neutral-900 hover:text-black flex items-center gap-1 group/btn"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-300 font-medium text-base shadow-xs"
          >
            <span>Explore Full Case Studies Archive</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
