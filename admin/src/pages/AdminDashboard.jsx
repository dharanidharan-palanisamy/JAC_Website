import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Code2,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  Layers,
  Sparkles,
  Users,
  Compass,
  GraduationCap,
  Home,
  Shield,
  HelpCircle,
  Settings,
  ChevronRight,
  RefreshCw,
  Edit3,
  ExternalLink
} from 'lucide-react';
import { api } from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.getDashboardStats();
      if (res.success) {
        setStats(res.data);
      } else {
        setError(res.message || 'Failed to load statistics');
      }
    } catch (err) {
      setError('Network error while loading metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Enquiries',
      value: stats?.totalEnquiries || 0,
      sub: `${stats?.newEnquiries || 0} requiring review`,
      icon: Inbox,
      color: 'text-amber-400',
      link: '/enquiries'
    },
    {
      title: 'Portfolio Case Studies',
      value: stats?.totalProjects || 6,
      sub: 'Live featured showcases',
      icon: Briefcase,
      color: 'text-emerald-400',
      link: '/portfolio'
    },
    {
      title: 'Active Services',
      value: stats?.totalServices || 6,
      sub: 'All core disciplines live',
      icon: Code2,
      color: 'text-blue-400',
      link: '/services'
    },
    {
      title: 'Proprietary Products',
      value: stats?.totalProducts || 4,
      sub: 'Flagship platforms active',
      icon: Sparkles,
      color: 'text-purple-400',
      link: '/products'
    }
  ];

  const quickPages = [
    { name: 'Home Page', route: '/home-content', icon: Home, desc: 'Hero, Narrative tabs & 16 Industries' },
    { name: 'Core Services', route: '/services', icon: Code2, desc: 'Web, Mobile, UI/UX, SEO, Marketing' },
    { name: 'Products', route: '/products', icon: Layers, desc: 'JAC Nexus ERP, PayFlow, CRM, CloudDesk' },
    { name: 'Other Services', route: '/other-services', icon: Sparkles, desc: 'DevOps, AI Automation, Cybersecurity, QA' },
    { name: 'Portfolio', route: '/portfolio', icon: Briefcase, desc: 'Case studies, live metrics & results' },
    { name: 'About & Team', route: '/about', icon: Users, desc: 'Leadership members, core values & mission' },
    { name: 'Careers & Hiring', route: '/careers', icon: Briefcase, desc: 'Job postings, compensation & perks' },
    { name: 'Engineering Process', route: '/process', icon: Compass, desc: '5-step agile framework & standards' },
    { name: 'Programs & Labs', route: '/programs', icon: GraduationCap, desc: 'Incubation pods & developer cohort' },
    { name: 'FAQs Management', route: '/faqs', icon: HelpCircle, desc: 'Categorized client questions & answers' },
    { name: 'Website Settings', route: '/settings', icon: Settings, desc: 'Emails, phone, office addresses & stats' },
    { name: 'Legal Policies', route: '/legal', icon: Shield, desc: 'Privacy Policy & Terms of Service' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-800 font-bold bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200 inline-block mb-2">
            Standalone Admin Portal • Full Website CMS
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-950 font-sans-tight">
            Executive Dashboard
          </h1>
          <p className="text-neutral-600 text-sm mt-1">
            Manage, edit, update, or delete details across every client page from this unified control center.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-neutral-200 text-neutral-700 text-xs font-medium hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="group p-6 rounded-2xl bg-white border border-neutral-200 hover:border-black transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 group-hover:bg-black group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
              </div>
              <div>
                <span className="text-xs text-neutral-500 font-medium block">{card.title}</span>
                <span className="text-3xl font-bold text-neutral-950 tracking-tight mt-1 block font-sans-tight">
                  {card.value}
                </span>
                <span className="text-[11px] text-neutral-500 mt-2 block">{card.sub}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Master Client Pages Management Directory */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
          <div>
            <h2 className="text-xl font-bold text-neutral-950 tracking-tight font-sans-tight">
              Edit & Manage Website Pages
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
              Click any page below to edit, update, or delete its live details, copy, and items.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickPages.map((page, pIdx) => {
            const Icon = page.icon;
            return (
              <Link
                key={pIdx}
                to={page.route}
                className="group p-4 rounded-2xl bg-neutral-50/70 border border-neutral-200 hover:border-black hover:bg-white transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 group-hover:bg-black group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <Edit3 className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-950 group-hover:text-black transition-colors font-sans-tight">
                    {page.name}
                  </h3>
                  <p className="text-[11px] text-neutral-600 leading-snug mt-1 line-clamp-2">
                    {page.desc}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-neutral-200 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-black font-bold">Edit Details →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Recent Inquiries + Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-neutral-950 tracking-tight font-sans-tight">Recent Client Inquiries</h2>
              <p className="text-xs text-neutral-600 mt-0.5">Incoming leads from the public website</p>
            </div>
            <Link
              to="/enquiries"
              className="text-xs text-black hover:underline font-bold flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-100">
            {stats?.recentEnquiries && stats.recentEnquiries.length > 0 ? (
              stats.recentEnquiries.map((enq) => (
                <div key={enq._id || enq.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-neutral-950">{enq.name}</span>
                      <span className="text-xs text-neutral-500 font-mono">({enq.company || 'Direct'})</span>
                    </div>
                    <p className="text-xs text-neutral-600 truncate max-w-md mt-1">{enq.message}</p>
                    <span className="text-[11px] text-neutral-500 mt-1 block">
                      Budget: {enq.budget || 'Custom'} • {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        enq.status === 'New' || enq.status === 'new'
                          ? 'bg-black text-white'
                          : 'bg-neutral-100 text-neutral-800 border border-neutral-200'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-neutral-500 text-xs">
                No recent inquiries found. Leads submitted through the contact form appear here.
              </div>
            )}
          </div>
        </div>

        {/* Quick Operations Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-xs">
            <h3 className="text-sm font-bold text-neutral-950 mb-4 font-sans-tight">Quick Operations</h3>
            <div className="space-y-2">
              <Link
                to="/products"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-black text-xs text-neutral-800 font-medium transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-neutral-900" />
                  <span>Manage Proprietary Products</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              </Link>

              <Link
                to="/other-services"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-black text-xs text-neutral-800 font-medium transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-neutral-900" />
                  <span>Specialized Services</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              </Link>

              <Link
                to="/about"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-black text-xs text-neutral-800 font-medium transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-neutral-900" />
                  <span>Leadership & Core Values</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              </Link>

              <Link
                to="/careers"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-black text-xs text-neutral-800 font-medium transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-neutral-900" />
                  <span>Job Postings & Hiring</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-100 border border-neutral-200 text-neutral-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950 mb-1 font-mono">
              Live Architecture Synchronization
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed mt-1">
              Every edit, update, or deletion saved in this Admin Console is instantly reflected across the public website via our centralized REST API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
