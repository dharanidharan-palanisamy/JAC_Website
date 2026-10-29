import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Code2, Smartphone, Palette, TrendingUp, Search, Share2, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import CTASection from '../components/home/CTASection';

const iconMap = {
  Code2: Code2,
  Smartphone: Smartphone,
  Palette: Palette,
  TrendingUp: TrendingUp,
  Search: Search,
  Share2: Share2
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.getServices();
        if (res.success) {
          setServices(res.data);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="w-full">
      {/* Services Hero */}
      <section className="nutz-hero-gradient pt-16 pb-8 sm:pb-10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-2xl sm:text-3xl md:text-4xl block mb-3">
            <span className="font-serif-italic font-normal text-neutral-800">Our</span>{' '}
            <span className="font-sans font-extrabold text-neutral-900 tracking-tight">Services</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6 font-sans-tight">
            Comprehensive IT solutions{' '}
            <span className="font-serif-italic font-normal block sm:inline">
              tailored for growth.
            </span>
          </h1>
          <p className="text-neutral-700 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            From modern responsive web applications and mobile apps to brand identity and technical SEO, we engineer high-impact solutions that scale with your ambitions.
          </p>
        </div>
      </section>

      {/* Services Catalog */}
      <section className="pt-4 pb-20 sm:pt-6 sm:pb-24 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Code2;

              return (
                <div
                  key={service._id || service.slug}
                  id={service.slug}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-500"
                >
                  {/* Text Content */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-widest text-neutral-400">
                        0{index + 1} • {service.tagline}
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                      {service.title}
                    </h2>

                    <p className="text-neutral-600 text-base sm:text-lg leading-relaxed mb-6">
                      {service.fullDescription || service.shortDescription}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="mb-8">
                      <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider block mb-3">
                        Key Deliverables:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {(service.deliverables || []).map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-sm text-neutral-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Tags & CTA Link */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-neutral-100">
                      <div className="flex flex-wrap gap-2">
                        {(service.tags || []).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs font-medium bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-neutral-700 group"
                      >
                        <span>Explore {service.title}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Imagery */}
                  <div className="lg:col-span-5">
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-900 shadow-lg group">
                      <img
                        src={service.featuredImage}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="text-xs font-mono uppercase text-amber-300">JAC MediaLand Standard</span>
                        <h4 className="text-lg font-bold">{service.title} Solutions</h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Other Services Callout Banner */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-neutral-800 shadow-2xl">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-300 font-bold block mb-2">
                Specialized Enterprise Solutions
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Need Cloud DevOps, Custom AI, or Cyber Security?
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1 leading-relaxed">
                Explore our extended technology offerings including Kubernetes infrastructure, LLM integrations, vulnerability testing, and 24/7 managed SLA support.
              </p>
            </div>
            <Link
              to="/other-services"
              className="px-7 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm transition-colors shrink-0 inline-flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>Explore Other Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default ServicesPage;
