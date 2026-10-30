import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Sparkles, Layers, ShieldCheck, Zap, BarChart3, Database, Play, X } from 'lucide-react';
import CTASection from '../components/home/CTASection';
import { api } from '../services/api';

const defaultProducts = [
  {
    id: 'jac-nexus-erp',
    name: 'JAC Nexus ERP',
    tagline: 'Intelligent Enterprise Resource Planning',
    category: 'Enterprise SaaS',
    badge: 'Flagship Platform',
    description: 'A unified operations operating system designed for mid-market and enterprise businesses. Seamlessly manages inventory, automated financial accounting, human resources, and supply chain logistics.',
    icon: Layers,
    color: 'from-amber-500/20 to-orange-500/10',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    features: [
      'Multi-entity accounting and automated tax compliance',
      'Real-time inventory sync across multiple warehouses',
      'Role-based granular access control & SOC2 compliant audit logs',
      'Custom workflow automation and API webhook integrations'
    ],
    stats: { metric: '42%', label: 'Efficiency Improvement' }
  },
  {
    id: 'jac-payflow',
    name: 'JAC PayFlow',
    tagline: 'High-Throughput Global Payments Gateway',
    category: 'FinTech Solution',
    badge: 'Sub-50ms Processing',
    description: 'Enterprise payment infrastructure built for mission-critical e-commerce and subscription platforms. Processes transactions in 135+ currencies with automated fraud detection and smart retry logic.',
    icon: Zap,
    color: 'from-emerald-500/20 to-teal-500/10',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    features: [
      'Universal checkout widget with 1-click payment credentials',
      'Recurring billing, prorated subscriptions & dunning management',
      'AI-powered fraud risk scoring reducing chargebacks by 68%',
      'Direct reconciliation integration with QuickBooks & SAP'
    ],
    stats: { metric: '99.99%', label: 'Uptime Reliability' }
  },
  {
    id: 'jac-pulse-crm',
    name: 'JAC Pulse CRM',
    tagline: 'Omnichannel Client Engagement & Pipeline Intelligence',
    category: 'Growth & CRM',
    badge: 'AI Enabled',
    description: 'Empower your sales and customer success teams with automated lead capture, predictive deal scoring, unified email/WhatsApp sequences, and real-time revenue forecasting.',
    icon: BarChart3,
    color: 'from-blue-500/20 to-cyan-500/10',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    features: [
      'Automated lead qualification and intelligent routing',
      'Unified inbox connecting WhatsApp, Email, and SMS',
      'Visual drag-and-drop pipeline with stage probability analytics',
      'Automated email nurture sequences and trigger-based tasks'
    ],
    stats: { metric: '3.4x', label: 'Faster Deal Velocity' }
  },
  {
    id: 'jac-clouddesk',
    name: 'JAC CloudDesk',
    tagline: 'Zero-Trust Secure Enterprise Workspace',
    category: 'Cloud Infrastructure',
    badge: 'Zero-Trust',
    description: 'Encrypted document collaboration, digital contract signing, and virtual workspaces built for distributed enterprise teams with end-to-end cryptographic confidentiality.',
    icon: Database,
    color: 'from-neutral-800/10 to-neutral-700/5',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    features: [
      'AES-256 military-grade client-side file encryption',
      'Legally binding digital signature workflows',
      'Granular permission expiration and watermark protection',
      'Instant cloud syncing with offline caching'
    ],
    stats: { metric: '100%', label: 'Compliance Audit Pass' }
  }
];

const iconMap = {
  Layers,
  Zap,
  BarChart3,
  Database,
  ShieldCheck,
  Sparkles
};

const ProductsPage = () => {
  const [products, setProducts] = useState(defaultProducts);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.getProducts();
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          // Merge with fallback demo video if product has none
          setProducts(res.data.filter((p) => p.isActive !== false).map((p, idx) => ({
            ...p,
            videoUrl: p.videoUrl || defaultProducts[idx % defaultProducts.length]?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
          })));
        }
      } catch (err) {
        console.error('Failed to load products from API, using fallback:', err);
      }
    };
    loadProducts();
  }, []);

  const categories = [
    'All',
    ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))
  ];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => (p.category || '').toLowerCase() === selectedCategory.toLowerCase());

  // Close on Escape & Lock body scroll when modal is active
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedVideo(null);
    };
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedVideo]);

  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/embed/')) return `${url}${url.includes('?') ? '&' : '?'}autoplay=1`;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
      : url;
  };

  return (
    <div className="w-full">
      {/* Products Hero */}
      <section className="nutz-hero-gradient pt-16 pb-8 sm:pb-10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-2xl sm:text-3xl md:text-4xl block mb-3">
            <span className="font-serif-italic font-normal text-neutral-800">Our</span>{' '}
            <span className="font-sans font-extrabold text-neutral-900 tracking-tight">Products</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6 font-sans-tight">
            Software products engineered{' '}
            <span className="font-serif-italic font-normal block sm:inline">
              for competitive advantage.
            </span>
          </h1>
          <p className="text-neutral-700 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Beyond bespoke client engineering, JAC MediaLand creates high-performance enterprise platforms and developer products used by ambitious organizations globally.
          </p>

          {/* Dynamic Categories Filter */}
          {categories.length > 2 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-white/80 hover:bg-white text-neutral-700 border border-black/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Showcase List */}
      <section className="pt-4 pb-20 sm:pt-6 sm:pb-24 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          {filteredProducts.map((product, idx) => {
            const Icon = typeof product.icon === 'string' ? (iconMap[product.icon] || Layers) : (product.icon || Layers);
            const prodKey = product._id || product.id || product.slug || idx;
            const featuresList = Array.isArray(product.features)
              ? product.features
              : typeof product.features === 'string'
              ? product.features.split('\n').filter(Boolean)
              : [];
            const metric = product.stats?.metric || product.statMetric;
            const label = product.stats?.label || product.statLabel;

            return (
              <div
                key={prodKey}
                id={product.slug || product.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-10 lg:p-12 rounded-3xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-500 scroll-mt-24"
              >
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs uppercase font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-neutral-200/80 text-neutral-800">
                      {product.category || 'Enterprise Platform'}
                    </span>
                    {product.badge && (
                      <span className="text-xs uppercase font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-amber-400 text-black">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight font-sans-tight mb-3">
                    {product.name}
                  </h2>
                  <p className="font-serif-italic text-xl text-neutral-700 mb-6">
                    {product.tagline}
                  </p>

                  <p className="text-neutral-600 text-base leading-relaxed mb-8">
                    {product.description}
                  </p>

                  {featuresList.length > 0 && (
                    <div className="space-y-3 mb-8">
                      {featuresList.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-neutral-900 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-sm text-neutral-700 font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
                    >
                      <span>Request a Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    {metric && (
                      <div className="pl-4 border-l border-neutral-300">
                        <span className="text-2xl font-extrabold text-neutral-900 block leading-none">
                          {metric}
                        </span>
                        <span className="text-[11px] text-neutral-500 font-medium">
                          {label}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div
                    onClick={() => setSelectedVideo(product)}
                    className="relative rounded-2xl overflow-hidden bg-neutral-900 aspect-[4/3] shadow-lg border border-neutral-200/80 group cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.92] group-hover:brightness-100"
                    />

                    {/* Centered Video Play Icon Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className="relative flex items-center justify-center">
                        <span className="absolute inset-0 rounded-full bg-white/40 animate-ping pointer-events-none" />
                        <div
                          className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white/95 text-neutral-900 flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-115 group-hover:bg-white"
                        >
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-black text-black ml-1 transition-transform group-hover:scale-110" />
                        </div>
                      </div>
                    </div>

                    {/* Top-Right "Watch Demo" Pill */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium tracking-wide">
                        <Play className="w-3 h-3 fill-amber-300 text-amber-300" />
                        <span>Watch Demo</span>
                      </span>
                    </div>

                    {/* Bottom Label Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white z-10 pointer-events-none">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold">{product.name}</h4>
                          <span className="text-xs text-neutral-300">Live Enterprise Edition • Click to play video</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Video Popup Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/90">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-sans">
                    {selectedVideo.name} — Interactive Product Demo
                  </h3>
                  <p className="text-xs text-neutral-400 font-serif-italic">
                    {selectedVideo.tagline}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="p-2 rounded-full bg-neutral-800 hover:bg-white text-neutral-300 hover:text-black transition-all cursor-pointer"
                aria-label="Close video demo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Viewport */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {selectedVideo.videoUrl && (selectedVideo.videoUrl.includes('youtube.com') || selectedVideo.videoUrl.includes('youtu.be')) ? (
                <iframe
                  src={getEmbedUrl(selectedVideo.videoUrl)}
                  title={selectedVideo.name}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  key={selectedVideo.videoUrl || selectedVideo.name}
                  src={selectedVideo.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Bottom Modal Footer */}
            <div className="px-6 py-3.5 bg-neutral-900/60 border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-400">
              <span>JAC MediaLand Enterprise Platform Demo</span>
              <Link
                to="/contact"
                onClick={() => setSelectedVideo(null)}
                className="font-semibold text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1"
              >
                <span>Schedule Live Technical Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <CTASection />
    </div>
  );
};

export default ProductsPage;
