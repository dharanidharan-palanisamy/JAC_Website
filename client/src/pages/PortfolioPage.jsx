import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import CTASection from '../components/home/CTASection';

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.getProjects();
        if (res.success && Array.isArray(res.data)) {
          setProjects(res.data.filter((p) => p.isPublished !== false));
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = [
    'All',
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))
  ];

  const filtered = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => (p.category || '').toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="w-full">
      {/* Portfolio Hero */}
      <section className="nutz-hero-gradient pt-16 pb-8 sm:pb-10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-2xl sm:text-3xl md:text-4xl block mb-3">
            <span className="font-serif-italic font-normal text-neutral-800">Our</span>{' '}
            <span className="font-sans font-extrabold text-neutral-900 tracking-tight">Work</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6 font-sans-tight">
            Proof in our pixels,{' '}
            <span className="font-serif-italic font-normal block sm:inline">
              power in our code.
            </span>
          </h1>
          <p className="text-neutral-700 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Explore our curated portfolio of enterprise web apps, high-growth mobile applications, and design systems delivered for clients worldwide.
          </p>

          {/* Categories Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-white/80 hover:bg-white text-neutral-700 border border-black/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pt-4 pb-20 sm:pt-6 sm:pb-24 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
            {filtered.map((project, idx) => (
              <div
                key={project._id || project.slug}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-white/95 backdrop-blur-md text-neutral-900 text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-2xs">
                      {project.category}
                    </span>
                    <span className="bg-black/70 backdrop-blur-md text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      {project.year || '2025'}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 flex flex-col justify-between grow">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-1.5 group-hover:text-neutral-700 transition-colors">
                      <Link to={`/portfolio/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-3 line-clamp-2">
                      {project.summary}
                    </p>
                  </div>

                  {/* Highlights and Tags */}
                  <div className="pt-3 border-t border-neutral-100 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {(project.techStack || []).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-mono bg-neutral-100 text-neutral-700 px-2.5 py-0.5 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-end pt-1">
                      <Link
                        to={`/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black bg-white text-xs font-semibold text-black hover:bg-black hover:text-white transition-all duration-200 group/btn shrink-0"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default PortfolioPage;
