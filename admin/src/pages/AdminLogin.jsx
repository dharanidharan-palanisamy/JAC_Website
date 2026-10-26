import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@jacmedialand.com');
  const [password, setPassword] = useState('Admin@JAC2026!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-neutral-900">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neutral-200/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="inline-block mb-4">
            <span className="text-2xl font-bold tracking-tight text-neutral-950 font-sans-tight">
              JAC <span className="font-serif-italic font-normal text-neutral-900">MediaLand</span>
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-neutral-600 font-mono mt-0.5">
              Dedicated Management Console
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-neutral-950 tracking-tight font-sans-tight">
            Administrator Portal
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Sign in to manage services, portfolio case studies, and incoming client enquiries.
          </p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-xl backdrop-blur-md">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jacmedialand.com"
                  className="w-full px-4 py-3 pl-10 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 placeholder-neutral-400 text-sm focus:outline-none focus:border-black transition-colors"
                />
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 pl-10 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 placeholder-neutral-400 text-sm focus:outline-none focus:border-black transition-colors"
                />
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Console'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Reminder */}
          <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
            <span className="text-[11px] text-neutral-500 block mb-1">Default Root Credentials:</span>
            <code className="text-[11px] font-mono text-neutral-900/80 bg-neutral-50 px-2.5 py-1 rounded-md border border-neutral-200">
              admin@jacmedialand.com / Admin@JAC2026!
            </code>
          </div>
        </div>

        <div className="text-center">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-500 hover:text-neutral-950 transition-colors inline-flex items-center gap-1.5"
          >
            <span>Visit Client Website (Port 5173)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
