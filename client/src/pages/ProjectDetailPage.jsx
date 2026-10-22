import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, User, Layers, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import CTASection from '../components/home/CTASection';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await api.getProjectBySlug(slug);
        if (res.success && res.data) {
          setProject(res.data);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        setError('Error loading project');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Case Study Not Found</h2>
        <p className="text-neutral-600 mb-6">The requested project could not be found.</p>
        <Link to="/portfolio" className="px-6 py-3 rounded-full bg-black text-white text-sm font-semibold">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Project Header */}
      <section className="nutz-hero-gradient pt-16 pb-20 sm:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-black mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>All Case Studies</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-white/80 px-3 py-1 rounded-full text-black">
              {project.category}
            </span>
            <span className="text-xs font-mono text-neutral-600">
              Year: {project.year}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.08] mb-6 font-sans-tight">
            {project.title}
          </h1>

          <p className="text-neutral-700 text-lg sm:text-2xl leading-relaxed max-w-3xl">
            {project.summary}
          </p>

          {/* Quick Meta Row */}
          <div className="flex flex-wrap items-center gap-8 mt-10 pt-6 border-t border-black/10 text-sm">
            <div>
              <span className="text-neutral-500 block text-xs">Client</span>
              <span className="font-semibold text-neutral-900">{project.client}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs">Discipline</span>
              <span className="font-semibold text-neutral-900">{project.category}</span>
            </div>
            {project.liveUrl && (
              <div>
                <span className="text-neutral-500 block text-xs">Live Platform</span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-black hover:underline flex items-center gap-1"
                >
                  <span>Visit Product</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hero Showcase Image */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-16 relative z-20">
        <div className="rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 aspect-[16/9] border border-white/40">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Case Study Deep Dive */}
      <section className="py-24 bg-[#FBFBFA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Results Metric Banner */}
          {project.results && project.results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-8 rounded-3xl bg-neutral-900 text-white mb-20 shadow-xl">
              {project.results.map((res, rIdx) => (
                <div key={rIdx} className="text-center p-4">
                  <span className="text-3xl sm:text-5xl font-extrabold text-amber-300 block mb-1 font-sans-tight">
                    {res.metric}
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-300 uppercase tracking-wider font-medium">
                    {res.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Challenge and Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/80 shadow-xs">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 block mb-2">
                The Objective
              </span>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                The Challenge
              </h3>
              <p className="text-neutral-600 text-base leading-relaxed whitespace-pre-line">
                {project.challenge || 'Developing a high-performance solution that handles complex operational logic while maintaining a seamless user experience.'}
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/80 shadow-xs">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 block mb-2">
                Our Engineering
              </span>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                The Solution
              </h3>
              <p className="text-neutral-600 text-base leading-relaxed whitespace-pre-line">
                {project.solution || 'Engineered a modern modular architecture using clean component design, optimized state management, and robust backend integrations.'}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-20 text-center">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 block mb-4">
              Technologies & Infrastructure
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {(project.techStack || []).map((t, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-sm font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Gallery Showcase */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-8 mb-20">
              <h3 className="text-2xl font-bold text-neutral-900 text-center">
                Visual Artifacts & Interface Gallery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((imgUrl, gIdx) => (
                  <div key={gIdx} className="rounded-2xl overflow-hidden shadow-md aspect-[16/10]">
                    <img src={imgUrl} alt={`Screenshot ${gIdx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default ProjectDetailPage;
