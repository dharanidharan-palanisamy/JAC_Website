import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Code2,
  Smartphone,
  Palette,
  TrendingUp,
  Search,
  Share2,
  Layers,
  Zap,
  BarChart3,
  Database,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const servicesItems = [
  {
    name: 'Web Development',
    path: '/services/web-development',
    desc: 'High-speed Next.js & React web platforms',
    icon: Code2
  },
  {
    name: 'Mobile App Development',
    path: '/services/mobile-app-development',
    desc: 'Cross-platform iOS & Android mobile apps',
    icon: Smartphone
  },
  {
    name: 'UI/UX Design',
    path: '/services/ui-ux-design',
    desc: 'Tactile design systems & user experiences',
    icon: Palette
  },
  {
    name: 'Digital Marketing',
    path: '/services/digital-marketing',
    desc: 'Data-driven growth & paid acquisition funnels',
    icon: TrendingUp
  },
  {
    name: 'Technical SEO',
    path: '/services/seo',
    desc: 'Search ranking dominance & Core Web Vitals',
    icon: Search
  },
  {
    name: 'Social Media Management',
    path: '/services/social-media-management',
    desc: 'Brand storytelling & community growth',
    icon: Share2
  }
];

const productsItems = [
  {
    name: 'JAC Nexus ERP',
    path: '/products#jac-nexus-erp',
    desc: 'Intelligent enterprise resource planning & logistics',
    badge: 'Enterprise',
    icon: Layers
  },
  {
    name: 'JAC PayFlow',
    path: '/products#jac-payflow',
    desc: 'High-throughput global payments & checkout gateway',
    badge: 'FinTech',
    icon: Zap
  },
  {
    name: 'JAC Pulse CRM',
    path: '/products#jac-pulse-crm',
    desc: 'Omnichannel client pipeline & AI predictive scoring',
    badge: 'AI Enabled',
    icon: BarChart3
  },
  {
    name: 'JAC CloudDesk',
    path: '/products#jac-clouddesk',
    desc: 'Zero-trust encrypted enterprise collaboration suite',
    badge: 'Security',
    icon: Database
  }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'services' | 'products' | null
  const [mobileExpanded, setMobileExpanded] = useState({ services: false, products: false });

  const closeTimerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.hash]);

  const handleMouseEnter = (menu) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const isServicesActive = location.pathname.startsWith('/services');
  const isProductsActive = location.pathname.startsWith('/products');

  const standardNavLinks = [
    { name: 'Our Work', path: '/portfolio' },
    { name: 'About Us', path: '/about' },
    { name: 'Other Services', path: '/other-services' }
  ];

  return (
    <>
      <header
        className={`w-full sticky top-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-[#FBFBFA]/90 backdrop-blur-md py-3 border-b border-black/5 shadow-xs'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with Scribble Mark Symbol */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group z-[102]">
            <img
              src="/scribble-mark-black.png"
              alt="JAC MediaLand Symbol"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 group-hover:opacity-80 transition-opacity font-sans">
                JAC MediaLand
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-neutral-500 tracking-normal mt-0.5">
                IT Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {/* Services Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`text-sm font-medium transition-all duration-200 py-1.5 flex items-center gap-1 ${
                  isServicesActive || activeDropdown === 'services'
                    ? 'text-black font-semibold'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                <Link
                  to="/services"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-center gap-1.5 cursor-pointer"
                >
                  {/* Active/Reference Dot indicator matching reference */}
                  {(isServicesActive || activeDropdown === 'services') && (
                    <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                  )}
                  <span>Services</span>
                </Link>
                <button
                  type="button"
                  aria-label="Toggle Services menu"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === 'services' ? null : 'services');
                  }}
                  className="p-0.5 cursor-pointer flex items-center justify-center text-inherit hover:opacity-75 transition-opacity"
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'services' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Services Dropdown Menu */}
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/3 pt-3 w-[560px] z-[120]"
                  >
                    <div className="rounded-3xl bg-white border border-neutral-200/90 shadow-2xl p-6 backdrop-blur-xl">
                      <div className="pb-3 mb-3 border-b border-neutral-100">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                          Core Capabilities
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {servicesItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.name}
                              to={item.path}
                              onClick={() => setActiveDropdown(null)}
                              className="p-3 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200/80 transition-all flex items-start gap-3 group"
                            >
                              <div className="w-9 h-9 rounded-xl bg-neutral-100 group-hover:bg-amber-300 text-neutral-900 flex items-center justify-center shrink-0 transition-colors">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-black transition-colors">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-neutral-500 leading-snug line-clamp-1 mt-0.5">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Other Services Bottom Highlight Bar */}
                      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs bg-neutral-50 p-3 rounded-2xl">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                          <span className="text-neutral-700 font-medium">Need Cloud, AI, DevOps or Security?</span>
                        </div>
                        <Link
                          to="/other-services"
                          onClick={() => setActiveDropdown(null)}
                          className="font-bold text-neutral-900 hover:text-black flex items-center gap-1 group/os shrink-0"
                        >
                          <span>Other Services</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/os:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Products Dropdown Trigger (with Reference Dot Indicator) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`text-sm font-medium transition-all duration-200 py-1.5 flex items-center gap-1 ${
                  isProductsActive || activeDropdown === 'products'
                    ? 'text-black font-semibold'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                <Link
                  to="/products"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-center gap-1.5 cursor-pointer"
                >
                  {/* Active/Reference Dot indicator matching reference */}
                  {(isProductsActive || activeDropdown === 'products') && (
                    <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                  )}
                  <span>Products</span>
                </Link>
                <button
                  type="button"
                  aria-label="Toggle Products menu"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === 'products' ? null : 'products');
                  }}
                  className="p-0.5 cursor-pointer flex items-center justify-center text-inherit hover:opacity-75 transition-opacity"
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'products' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Products Dropdown Menu */}
              <AnimatePresence>
                {activeDropdown === 'products' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[520px] z-[120]"
                  >
                    <div className="rounded-3xl bg-white border border-neutral-200/90 shadow-2xl p-6 backdrop-blur-xl">
                      <div className="pb-3 mb-3 border-b border-neutral-100">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                          Proprietary Platforms
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {productsItems.map((prod) => {
                          const Icon = prod.icon;
                          return (
                            <Link
                              key={prod.name}
                              to={prod.path}
                              onClick={() => setActiveDropdown(null)}
                              className="p-3 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200/80 transition-all flex items-start gap-3 group"
                            >
                              <div className="w-9 h-9 rounded-xl bg-neutral-100 group-hover:bg-amber-300 text-neutral-900 flex items-center justify-center shrink-0 transition-colors">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-bold text-neutral-900 truncate">
                                    {prod.name}
                                  </h4>
                                </div>
                                <p className="text-xs text-neutral-500 leading-snug line-clamp-1 mt-0.5">
                                  {prod.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Bottom Banner */}
                      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs bg-neutral-50 p-3 rounded-2xl">
                        <span className="text-neutral-600 font-medium">Need a custom enterprise deployment?</span>
                        <Link
                          to="/contact"
                          onClick={() => setActiveDropdown(null)}
                          className="font-bold text-neutral-900 hover:underline flex items-center gap-1"
                        >
                          <span>Request Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Standard Nav Items */}
            {standardNavLinks.map((link) => {
              const active = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-all duration-200 relative py-1 flex items-center gap-1.5 ${
                    active ? 'text-black font-semibold' : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-300 shadow-xs cursor-pointer overflow-hidden"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center z-[102]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-full border border-black/15 text-neutral-800 hover:bg-black/5 transition-colors focus:outline-none cursor-pointer"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 top-0 z-[99] bg-[#FBFBFA] flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-4 mt-2">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
                Navigation
              </span>

              {/* Mobile Services Accordion */}
              <div className="border-b border-black/5 pb-2">
                <div className="w-full flex items-center justify-between text-2xl font-medium py-2 text-neutral-900">
                  <Link
                    to="/services"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 flex-1"
                  >
                    {isServicesActive && <span className="w-2 h-2 rounded-full bg-black shrink-0" />}
                    <span>Services</span>
                  </Link>
                  <button
                    type="button"
                    aria-label="Toggle Services submenu"
                    onClick={() =>
                      setMobileExpanded((prev) => ({ ...prev, services: !prev.services }))
                    }
                    className="p-2 -mr-2 text-neutral-600 hover:text-black cursor-pointer"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        mobileExpanded.services ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                {mobileExpanded.services && (
                  <div className="pl-4 space-y-2.5 py-3">
                    <Link
                      to="/services"
                      onClick={() => setIsOpen(false)}
                      className="text-xs uppercase font-mono font-bold text-amber-700 block mb-2"
                    >
                      → All Services Overview
                    </Link>
                    {servicesItems.map((s) => (
                      <Link
                        key={s.name}
                        to={s.path}
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-neutral-700 hover:text-black py-1 font-medium"
                      >
                        {s.name}
                      </Link>
                    ))}
                    <Link
                      to="/other-services"
                      onClick={() => setIsOpen(false)}
                      className="block text-sm text-amber-700 font-bold py-1 border-t border-black/5 mt-2 pt-2"
                    >
                      ★ Other Services (Cloud, AI & DevOps)
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Products Accordion */}
              <div className="border-b border-black/5 pb-2">
                <div className="w-full flex items-center justify-between text-2xl font-medium py-2 text-neutral-900">
                  <Link
                    to="/products"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 flex-1"
                  >
                    {isProductsActive && <span className="w-2 h-2 rounded-full bg-black shrink-0" />}
                    <span>Products</span>
                  </Link>
                  <button
                    type="button"
                    aria-label="Toggle Products submenu"
                    onClick={() =>
                      setMobileExpanded((prev) => ({ ...prev, products: !prev.products }))
                    }
                    className="p-2 -mr-2 text-neutral-600 hover:text-black cursor-pointer"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        mobileExpanded.products ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                {mobileExpanded.products && (
                  <div className="pl-4 space-y-2.5 py-3">
                    <Link
                      to="/products"
                      onClick={() => setIsOpen(false)}
                      className="text-xs uppercase font-mono font-bold text-amber-700 block mb-2"
                    >
                      → All Products Overview
                    </Link>
                    {productsItems.map((p) => (
                      <Link
                        key={p.name}
                        to={p.path}
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-neutral-700 hover:text-black py-1 font-medium"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Other standard mobile links */}
              {standardNavLinks.map((link) => (
                <div key={link.name} className="border-b border-black/5 pb-2">
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-medium block py-2 text-neutral-800 hover:text-black"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-black/10">
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-black text-white text-base font-medium shadow-md"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-center text-xs text-neutral-500">
                JAC MediaLand IT Solutions • +91 98765 43210
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
