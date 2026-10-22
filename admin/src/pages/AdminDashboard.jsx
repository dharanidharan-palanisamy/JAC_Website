import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Code2,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  RefreshCw
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
      title: 'Active Services',
      value: stats?.totalServices || 0,
      sub: 'All core disciplines live',
      icon: Code2,
      color: 'text-blue-400',
      link: '/services'
    },
    {
      title: 'Portfolio Projects',
      value: stats?.totalProjects || 0,
      sub: 'Case studies published',
      icon: Briefcase,
      color: 'text-emerald-400',
      link: '/portfolio'
    },
    {
      title: 'Client Satisfaction',
      value: '98%',
      sub: 'Consistently rated 5 stars',
      icon: TrendingUp,
      color: 'text-purple-400',
      link: '/settings'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold block mb-1">
            Standalone Admin Portal
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white font-sans-tight">
            Executive Dashboard
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Welcome back to the JAC MediaLand administrative console.
          </p>
        </div>
        <div>
          <button
            onClick={fetchStats}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-medium hover:border-neutral-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Data</span>
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
              className="group p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all hover:bg-neutral-900/80 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-neutral-950 border border-neutral-800 ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-amber-400 transition-colors" />
              </div>
              <div>
                <span className="text-xs text-neutral-400 font-medium block">{card.title}</span>
                <span className="text-3xl font-bold text-white tracking-tight mt-1 block">
                  {card.value}
                </span>
                <span className="text-[11px] text-neutral-500 mt-2 block">{card.sub}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid: Recent Inquiries + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Recent Client Inquiries</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Incoming leads from the public website</p>
            </div>
            <Link
              to="/enquiries"
              className="text-xs text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-800/80">
            {stats?.recentEnquiries && stats.recentEnquiries.length > 0 ? (
              stats.recentEnquiries.map((enq) => (
                <div key={enq._id || enq.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{enq.name}</span>
                      <span className="text-xs text-neutral-500 font-mono">({enq.company || 'Direct'})</span>
                    </div>
                    <p className="text-xs text-neutral-400 truncate max-w-md mt-1">{enq.message}</p>
                    <span className="text-[11px] text-neutral-500 mt-1 block">
                      Budget: {enq.budget || 'Custom'} • {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        enq.status === 'new'
                          ? 'bg-amber-400/10 text-amber-300 border border-amber-400/20'
                          : enq.status === 'contacted'
                          ? 'bg-blue-400/10 text-blue-300 border border-blue-400/20'
                          : 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/20'
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
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
            <h3 className="text-sm font-bold text-white mb-4">Quick Shortcuts</h3>
            <div className="space-y-2">
              <Link
                to="/enquiries"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800/60 hover:border-neutral-700 text-xs text-neutral-300 font-medium transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Inbox className="w-4 h-4 text-amber-400" />
                  <span>Review Pending Leads</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
              </Link>

              <Link
                to="/services"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800/60 hover:border-neutral-700 text-xs text-neutral-300 font-medium transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span>Manage Capabilities</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
              </Link>

              <Link
                to="/portfolio"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800/60 hover:border-neutral-700 text-xs text-neutral-300 font-medium transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span>Add Project Showcase</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 text-neutral-300">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
              Architecture Separation
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed mt-1">
              This Admin Panel runs as a separate application on <strong className="text-white">Port 5174</strong> with direct REST synchronization to the backend. The public website operates on <strong className="text-white">Port 5173</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
