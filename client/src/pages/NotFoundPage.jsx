import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-[#FBFBFA]">
      <div className="max-w-md w-full text-center p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200/80 shadow-lg">
        <span className="text-7xl sm:text-8xl font-black font-sans-tight text-neutral-900 block mb-2">
          404
        </span>
        <h1 className="text-2xl font-bold text-neutral-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-neutral-600 text-sm mb-8 leading-relaxed">
          The page or digital asset you are seeking might have been moved, renamed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-100 text-neutral-800 text-sm font-semibold hover:bg-neutral-200 transition-colors"
          >
            <span>View Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
