import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  Code2,
  Briefcase,
  HelpCircle,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Layers,
  Sparkles,
  Users,
  Compass,
  GraduationCap,
  Home,
  Shield,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navGroups = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard Overview', path: '/', icon: LayoutDashboard },
      { name: 'Client Enquiries', path: '/enquiries', icon: Inbox }
    ]
  },
  {
    title: 'Pages & Content Management',
    items: [
      { name: 'Home Page Content', path: '/home-content', icon: Home },
      { name: 'Core Services', path: '/services', icon: Code2 },
      { name: 'Proprietary Products', path: '/products', icon: Layers },
      { name: 'Other Services', path: '/other-services', icon: Sparkles },
      { name: 'Portfolio Projects', path: '/portfolio', icon: Briefcase },
      { name: 'About & Team', path: '/about', icon: Users },
      { name: 'Careers & Jobs', path: '/careers', icon: Briefcase },
      { name: 'Process & Standards', path: '/process', icon: Compass },
      { name: 'Programs & Labs', path: '/programs', icon: GraduationCap },
      { name: 'FAQs Management', path: '/faqs', icon: HelpCircle },
      { name: 'Website Settings', path: '/settings', icon: Settings },
      { name: 'Legal Policies', path: '/legal', icon: Shield }
    ]
  }
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-neutral-900 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="font-bold text-neutral-950 tracking-tight">JAC MediaLand</span>
          <span className="text-[10px] font-mono bg-black text-white px-1.5 py-0.5 rounded font-bold">ADMIN CONSOLE</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-neutral-200 flex flex-col justify-between p-4 sm:p-5 z-40 transition-transform duration-300 md:translate-x-0 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto pr-1">
          {/* Brand */}
          <div className="pb-4 mb-4 border-b border-neutral-200 shrink-0">
            <Link to="/" className="block">
              <span className="text-xl font-bold tracking-tight text-neutral-950 font-sans-tight">
                JAC <span className="font-serif-italic font-normal text-neutral-800">MediaLand</span>
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 font-semibold">
                  Dedicated Admin
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Groups */}
          <div className="space-y-5 flex-1">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold px-3 block">
                  {group.title}
                </span>

                <nav className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                          active
                            ? 'bg-black text-white font-bold shadow-xs'
                            : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="truncate">{item.name}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                              active
                                ? 'bg-white text-black'
                                : 'bg-neutral-100 text-neutral-800 border border-neutral-200'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* User Profile & Actions */}
        <div className="pt-4 mt-3 border-t border-neutral-200 space-y-2 shrink-0">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-300 flex items-center justify-center font-bold text-neutral-900 text-xs">
              {admin?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-semibold text-neutral-900 block truncate">
                {admin?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-neutral-500 block truncate">
                {admin?.email || 'admin@jacmedialand.com'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-1.5 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              title="Open public website in a new tab"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleLogout}
              className="py-1.5 px-3 rounded-lg bg-neutral-100 hover:bg-rose-50 border border-neutral-200 text-neutral-600 hover:text-rose-600 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-5 sm:p-8 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
