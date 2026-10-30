import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Globe, 
  Mail, 
  Phone
} from 'lucide-react';

const Footer = () => {

  return (
    <footer className="w-full bg-[#111111] text-white pt-16 pb-12 mt-auto border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header: Brand Name & Logo with White Scribble Mark */}
        <div className="pb-6">
          <Link to="/" className="inline-flex items-center gap-3 sm:gap-3.5 group mb-3">
            <img
              src="/scribble-mark-white.png"
              alt="JAC MediaLand Symbol"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-neutral-200 transition-colors font-sans">
                JAC MediaLand
              </span>
              <span className="text-xs sm:text-sm font-medium text-neutral-400 tracking-normal mt-1">
                IT Solutions
              </span>
            </div>
          </Link>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-none">
            Engineering high-performance web applications, enterprise products, and digital brands worldwide.
          </p>
        </div>

        {/* Links Navigation (Equal Spacing Between Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 xl:gap-12 py-8">
          {/* Core Services */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white mb-4 flex items-center gap-1.5 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="font-serif-italic capitalize text-sm font-normal text-neutral-300">Our</span> <span className="font-sans font-bold">Services</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
              <li>
                <Link to="/services/web-development" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/services/mobile-app-development" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  App Development
                </Link>
              </li>
              <li>
                <Link to="/services/ui-ux-design" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link to="/services/digital-marketing" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link to="/services/seo" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  SEO &amp; Growth
                </Link>
              </li>
              <li>
                <Link to="/services/social-media-management" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Social Media
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Products */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white mb-4 flex items-center gap-1.5 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="font-serif-italic capitalize text-sm font-normal text-neutral-300">Our</span> <span className="font-sans font-bold">Products</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
              <li>
                <Link to="/products#jac-nexus-erp" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  JAC Nexus ERP
                </Link>
              </li>
              <li>
                <Link to="/products#jac-payflow" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  JAC PayFlow
                </Link>
              </li>
              <li>
                <Link to="/products#jac-pulse-crm" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  JAC Pulse CRM
                </Link>
              </li>
              <li>
                <Link to="/products#jac-clouddesk" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  JAC CloudDesk
                </Link>
              </li>
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white mb-4 flex items-center gap-1.5 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="font-sans font-bold">Menu</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
              <li>
                <Link to="/services" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Our Work
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Our Programs
                </Link>
              </li>

              <li>
                <Link to="/other-services" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Other Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations (Address) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Locations
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
                <span className="leading-snug">Tech Innovation Hub, Coimbatore, India</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
                <span className="leading-snug">OMR IT Corridor, Chennai, India</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
                <span className="leading-snug">Global Remote Delivery</span>
              </li>
            </ul>
          </div>

          {/* Contact (Separately near Locations) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex flex-col gap-2.5">
                <a
                  href="mailto:contact@jacmedialand.com"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">contact@jacmedialand.com</span>
                </a>

                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>+91 98765 43210</span>
                </a>
              </div>

              {/* Social Media Circular Buttons */}
              <div className="flex items-center gap-2.5 pt-2">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Chat on WhatsApp"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow on Instagram"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-pink-400 hover:border-pink-500/50 hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow on X"
                  aria-label="Twitter / X"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Connect on LinkedIn"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-blue-400 hover:border-blue-500/50 hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.761-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Functional Bottom Bar */}
        <div className="pt-8 flex items-center justify-center text-center text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} JAC MediaLand IT Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
