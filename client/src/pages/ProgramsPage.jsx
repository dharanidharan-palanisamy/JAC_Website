import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Code2, 
  Cpu, 
  GraduationCap, 
  Clock, 
  Users, 
  MapPin, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  ArrowLeft 
} from 'lucide-react';
import CTASection from '../components/home/CTASection';
import { programsData } from '../data/programsData';
import { api } from '../services/api';

const iconMap = {
  incubation: Layers,
  fullstack: Code2,
  'executive-ai': Cpu,
  'campus-accelerator': GraduationCap,
  Layers,
  Code2,
  Cpu,
  GraduationCap
};

const ProgramsPage = () => {
  const [programs, setPrograms] = useState(programsData);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await api.getPrograms();
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setPrograms(res.data);
        }
      } catch (err) {
        // Fallback to static programsData already in state
      }
    };
    fetchPrograms();
  }, []);

  const availablePrograms = programs.filter((p) => {
    if (p.isActive === false) return false;
    const tag = (p.tag || '').toLowerCase();
    return !tag.includes('executive') && !tag.includes('leadership') && !tag.includes('academic');
  });

  const filterCategories = [
    'All',
    ...Array.from(new Set(availablePrograms.map((p) => p.tag).filter(Boolean)))
  ];

  const filteredPrograms = selectedCategory === 'All'
    ? availablePrograms
    : availablePrograms.filter((p) => (p.tag || '').toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="w-full bg-[#FBFBFA]">
      {/* Hero Section - Matching About & Careers Format */}
      <section className="nutz-hero-gradient min-h-[calc(100vh-76px)] flex items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto -mt-6 sm:-mt-8">
          <span className="text-2xl sm:text-3xl md:text-4xl block mb-2 sm:mb-3">
            <span className="font-serif-italic font-normal text-neutral-800">Our</span>{' '}
            <span className="font-sans font-extrabold text-neutral-900 tracking-tight">Programs</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-5 sm:mb-6 font-sans-tight">
            Empowering talent &{' '}
            <span className="font-serif-italic font-normal block sm:inline">
              pioneering innovation.
            </span>
          </h1>
          <p className="text-neutral-700 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            From enterprise co-innovation and startup incubation to intensive developer apprenticeships, explore our structured programs.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#programs-list"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-neutral-300 text-neutral-800 text-sm font-semibold hover:bg-neutral-100 transition-colors shadow-xs"
            >
              <span>Partner With Us</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Programs Catalog */}
      <section id="programs-list" className="scroll-mt-20 py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block text-sm sm:text-base tracking-wider mb-2">
              <span className="font-serif-italic font-normal text-lg sm:text-xl text-neutral-700">Available</span>{' '}
              <span className="font-sans font-extrabold uppercase tracking-widest text-xs sm:text-sm text-neutral-900">Tracks</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
              All Available Programs
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-xl">
              Choose the program tailored for your organization's technical ambitions or individual developer acceleration.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:text-black hover:border-neutral-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPrograms.map((p) => {
            const Icon = typeof p.icon === 'string' ? (iconMap[p.icon] || iconMap[p.id] || Layers) : (p.icon || iconMap[p.id] || Layers);
            return (
              <div
                key={p._id || p.id || p.slug}
                className="group p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-xl hover:border-neutral-400 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Badge & Icon Header */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-[11px] font-mono font-bold tracking-wider text-neutral-800 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      {p.tag || 'Specialized Track'}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-neutral-950 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-amber-300" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight leading-snug group-hover:text-black transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-neutral-600 text-xs sm:text-sm mt-3 leading-relaxed">
                      {p.summary || p.subtitle}
                    </p>
                  </div>

                  {/* Program Specs / Metadata Bar */}
                  <div className="grid grid-cols-2 gap-3 py-4 border-y border-neutral-100 text-xs">
                    <div>
                      <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">Duration</span>
                      <span className="font-semibold text-neutral-900 mt-0.5 block">{p.duration || 'Flexible'}</span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">Format</span>
                      <span className="font-semibold text-neutral-900 mt-0.5 block truncate">{p.format || 'Hybrid'}</span>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  {p.highlights && p.highlights.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold block">
                        Core Highlights
                      </span>
                      <ul className="space-y-2">
                        {p.highlights.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700 leading-normal">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-8 mt-8 border-t border-neutral-100 flex items-center justify-between gap-4">
                  <Link
                    to={`/programs/${p.slug || p._id || p.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 text-white text-xs sm:text-sm font-semibold hover:bg-neutral-800 transition-all shadow-xs cursor-pointer"
                  >
                    <span>View Program Details</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <span className="text-xs font-medium text-neutral-400 hidden sm:inline">
                    {p.badge || 'Cohort-Based'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default ProgramsPage;
