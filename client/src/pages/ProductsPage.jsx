import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Sparkles, Layers, ShieldCheck, Zap, BarChart3, Database } from 'lucide-react';
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

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.getProducts();
        if (res.success && res.data && res.data.length > 0) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error('Failed to load products from API, using fallback:', err);
      }
    };
    loadProducts();
  }, []);

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
        </div>
      </section>

      {/* Products Showcase List */}
      <section className="pt-4 pb-20 sm:pt-6 sm:pb-24 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          {products.map((product, idx) => {
            const Icon = typeof product.icon === 'string' ? (iconMap[product.icon] || Layers) : (product.icon || Layers);
            const isReversed = idx % 2 === 1;
            const prodKey = product._id || product.id || idx;

            return (
              <div
                key={prodKey}
                id={product.slug || product.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center scroll-mt-24 ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs uppercase font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-neutral-200/80 text-neutral-800">
                      {product.category}
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

                  {product.features && product.features.length > 0 && (
                    <div className="space-y-3 mb-8">
                      {product.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-neutral-900 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-sm text-neutral-700 font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
                    >
                      <span>Request a Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    {product.stats?.metric && (
                      <div className="pl-4 border-l border-neutral-300">
                        <span className="text-2xl font-extrabold text-neutral-900 block leading-none">
                          {product.stats.metric}
                        </span>
                        <span className="text-[11px] text-neutral-500 font-medium">
                          {product.stats.label}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="relative rounded-3xl overflow-hidden bg-neutral-900 aspect-[4/3] shadow-xl border border-neutral-200/80 group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold">{product.name}</h4>
                          <span className="text-xs text-neutral-300">Live Enterprise Edition</span>
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

      <CTASection />
    </div>
  );
};

export default ProductsPage;
