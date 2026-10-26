import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Wind,
  DollarSign,
  Droplet,
  Wrench,
  BookOpen,
  Heart,
  Shield,
  Truck,
  Video,
  Users,
  Home,
  ShoppingBag,
  Flag,
  Globe,
  Award,
  Map,
  FolderOpen,
  Mail,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../services/api';

const defaultIndustries = [
  {
    title: 'Agriculture',
    subtitle: 'SOLUTIONS & TECH',
    icon: Wind
  },
  {
    title: 'Bank',
    subtitle: 'SOLUTIONS & TECH',
    icon: DollarSign
  },
  {
    title: 'Chemical',
    subtitle: 'SOLUTIONS & TECH',
    icon: Droplet
  },
  {
    title: 'Construction',
    subtitle: 'SOLUTIONS & TECH',
    icon: Wrench
  },
  {
    title: 'Education',
    subtitle: 'SOLUTIONS & TECH',
    icon: BookOpen
  },
  {
    title: 'Health',
    subtitle: 'SOLUTIONS & TECH',
    icon: Heart
  },
  {
    title: 'Insurance',
    subtitle: 'SOLUTIONS & TECH',
    icon: Shield
  },
  {
    title: 'Logistics',
    subtitle: 'SOLUTIONS & TECH',
    icon: Truck
  },
  {
    title: 'Media',
    subtitle: 'SOLUTIONS & TECH',
    icon: Video
  },
  {
    title: 'NGOs',
    subtitle: 'SOLUTIONS & TECH',
    icon: Users
  },
  {
    title: 'Real Estate',
    subtitle: 'SOLUTIONS & TECH',
    icon: Home
  },
  {
    title: 'Retail Business',
    subtitle: 'SOLUTIONS & TECH',
    icon: ShoppingBag
  },
  {
    title: 'Social Network',
    subtitle: 'SOLUTIONS & TECH',
    icon: Flag
  },
  {
    title: 'Space',
    subtitle: 'SOLUTIONS & TECH',
    icon: Globe
  },
  {
    title: 'Sports',
    subtitle: 'SOLUTIONS & TECH',
    icon: Award
  },
  {
    title: 'Tourism',
    subtitle: 'SOLUTIONS & TECH',
    icon: Map
  }
];

const indIconMap = {
  Wind,
  DollarSign,
  Droplet,
  Wrench,
  BookOpen,
  Heart,
  Shield,
  Truck,
  Video,
  Users,
  Home,
  ShoppingBag,
  Flag,
  Globe,
  Award,
  Map
};

const IndustriesSection = () => {
  const [industries, setIndustries] = useState(defaultIndustries);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const loadIndustries = async () => {
      try {
        const res = await api.getIndustries();
        if (res.success && res.data && res.data.length > 0) {
          setIndustries(res.data.filter((i) => i.isActive !== false));
        }
      } catch (err) {
        console.error('Failed to load industries from API, using default:', err);
      }
    };
    loadIndustries();
  }, []);

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="flex justify-center mb-3">
            <span className="px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-600 font-bold bg-neutral-100 border border-neutral-200/80">
              Industry Experience
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 font-sans">
            Industries We Serve
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 mt-3 font-normal leading-relaxed">
            Flexible digital services shaped around the needs of different sectors.
          </p>
        </div>

        {/* 6-Column Industries Grid matching reference image */}
        <div
          onMouseLeave={() => setActiveIndex(0)}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5"
        >
          {industries.map((item, index) => {
            const Icon = typeof item.icon === 'string' ? (indIconMap[item.icon] || Wind) : (item.icon || Wind);
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={item.title || index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35, delay: index * 0.025 }}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`relative bg-white rounded-3xl p-5 sm:p-6 border transition-all duration-300 flex flex-col items-center justify-between min-h-[205px] text-center cursor-pointer group ${
                  isActive
                    ? 'border-neutral-300/90 shadow-xl shadow-black/8 -translate-y-1'
                    : 'border-neutral-200/70 hover:border-neutral-300 hover:shadow-md'
                }`}
              >
                {/* Circular Icon with highlight border on active */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'border-2 border-neutral-900 bg-white text-neutral-900 shadow-xs'
                      : 'bg-neutral-100/70 border border-neutral-200/50 text-neutral-700 group-hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>

                {/* Card Title & Subtitle */}
                <div className="my-2">
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase mt-0.5">
                    {item.subtitle}
                  </p>
                </div>

                {/* Bottom Action Row (Folder, Mail, Link) */}
                <div className="h-8 flex items-center justify-center w-full">
                  <div
                    className={`flex items-center gap-1.5 transition-all duration-200 ${
                      isActive
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 translate-y-1 pointer-events-none'
                    }`}
                  >
                    <Link
                      to="/portfolio"
                      title="View Case Studies"
                      onClick={(e) => e.stopPropagation()}
                      className="w-7 h-7 rounded-lg border border-neutral-200 hover:border-black hover:bg-neutral-900 hover:text-white flex items-center justify-center text-neutral-600 transition-colors"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to={`/contact?industry=${encodeURIComponent(item.title)}`}
                      title="Inquire for this Industry"
                      onClick={(e) => e.stopPropagation()}
                      className="w-7 h-7 rounded-lg border border-neutral-200 hover:border-black hover:bg-neutral-900 hover:text-white flex items-center justify-center text-neutral-600 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/services"
                      title="Explore Solutions"
                      onClick={(e) => e.stopPropagation()}
                      className="w-7 h-7 rounded-lg border border-neutral-200 hover:border-black hover:bg-neutral-900 hover:text-white flex items-center justify-center text-neutral-600 transition-colors"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
