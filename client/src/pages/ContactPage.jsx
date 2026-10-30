import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Mail, Phone, MapPin, Clock, ArrowRight, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

const defaultServicesOptions = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'Digital Marketing',
  'Search Engine Optimization (SEO)',
  'Social Media Management',
  'General Inquiry'
];

const defaultBudgetOptions = [
  'Under ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹2,50,000',
  '₹2,50,000+'
];

const ContactPage = () => {
  const [settings, setSettings] = useState(null);
  const [servicesList, setServicesList] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Development',
    budget: '₹50,000 - ₹1,00,000',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const activeBudgetOptions =
    settings?.budgetOptions && settings.budgetOptions.length > 0
      ? settings.budgetOptions
      : defaultBudgetOptions;

  const activeServicesOptions =
    servicesList.length > 0
      ? [...servicesList.map(s => s.title), 'General Inquiry']
      : defaultServicesOptions;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [setRes, srvRes] = await Promise.all([
          api.getSettings(),
          api.getServices()
        ]);

        if (srvRes.success && Array.isArray(srvRes.data) && srvRes.data.length > 0) {
          setServicesList(srvRes.data);
          setFormData((prev) => ({
            ...prev,
            service: srvRes.data[0]?.title || prev.service
          }));
        }

        if (setRes.success && setRes.data) {
          setSettings(setRes.data);
          if (setRes.data.budgetOptions && setRes.data.budgetOptions.length > 0) {
            setFormData((prev) => ({
              ...prev,
              budget: setRes.data.budgetOptions[1] || setRes.data.budgetOptions[0]
            }));
          }
        }
      } catch (err) {
        // Defaults are used as fallbacks
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.submitEnquiry(formData);
      if (res.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Web Development',
          budget: activeBudgetOptions[1] || activeBudgetOptions[0] || '₹50,000 - ₹1,00,000',
          message: ''
        });
      } else {
        setError(res.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please contact us directly at contact@jacmedialand.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Contact Hero */}
      <section className="nutz-hero-gradient pt-16 pb-8 sm:pb-10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-2xl sm:text-3xl md:text-4xl block mb-3">
            <span className="font-serif-italic font-normal text-neutral-800">Contact</span>{' '}
            <span className="font-sans font-extrabold text-neutral-900 tracking-tight">Us</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-4 font-sans-tight">
            Let’s build something{' '}
            <span className="font-serif-italic font-normal block sm:inline">
              extraordinary together.
            </span>
          </h1>
          <p className="text-neutral-700 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Tell us about your digital goals, timeline, and scope. Our lead architects review every inquiry and respond within 24 business hours.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Info */}
      <section className="pt-4 pb-20 sm:pt-6 sm:pb-24 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Contact Information & Offices */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="inline-block text-sm sm:text-base tracking-wider mb-2">
                  <span className="font-serif-italic font-normal text-lg sm:text-xl text-neutral-700">Direct</span>{' '}
                  <span className="font-sans font-extrabold uppercase tracking-widest text-xs sm:text-sm text-neutral-900">Inquiries</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
                  We'd love to hear from you.
                </h2>
                <p className="text-neutral-600 text-base leading-relaxed">
                  Whether you have an upcoming project blueprint or simply want advice on the right technology stack, we are here to help.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 font-medium block">Email Address</span>
                    <a
                      href={`mailto:${settings?.contactEmail || 'contact@jacmedialand.com'}`}
                      className="text-base font-semibold text-black hover:underline"
                    >
                      {settings?.contactEmail || 'contact@jacmedialand.com'}
                    </a>
                    <span className="text-xs text-neutral-500 block mt-0.5">Average response: &lt; 4 hours</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 font-medium block">Direct Telephone</span>
                    <a
                      href={`tel:${(settings?.contactPhone || '+91 98765 43210').replace(/\s+/g, '')}`}
                      className="text-base font-semibold text-black hover:underline"
                    >
                      {settings?.contactPhone || '+91 98765 43210'}
                    </a>
                    <span className="text-xs text-neutral-500 block mt-0.5">Mon - Fri: 9:00 AM - 7:00 PM IST</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 font-medium block">Our Locations</span>
                    <p className="text-sm font-semibold text-neutral-900 mt-1">
                      {settings?.address || 'Tech Innovation Hub, Coimbatore, Tamil Nadu, India'}
                    </p>
                    <p className="text-xs text-neutral-600 mt-1">
                      OMR Technology Corridor, Chennai, Tamil Nadu, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="p-6 rounded-2xl bg-neutral-100/70 border border-neutral-200/60">
                <h4 className="text-sm font-bold text-neutral-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Strict NDA & IP Protection</span>
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  We guarantee total confidentiality for your proprietary project concepts. We execute non-disclosure agreements prior to technical deep-dives.
                </p>
              </div>
            </div>

            {/* Interactive Form Card */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200/80 shadow-xl">
                <span className="inline-block text-sm tracking-wider mb-2">
                  <span className="font-serif-italic font-normal text-base text-neutral-700">Project</span>{' '}
                  <span className="font-sans font-extrabold uppercase tracking-widest text-xs text-neutral-900">Request</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                  Send Us a Message
                </h3>
                <p className="text-sm text-neutral-500 mb-8">
                  Fill in the form below and we will get back to you promptly.
                </p>

                {success ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold text-emerald-900">Inquiry Received Successfully!</h4>
                    <p className="text-sm text-emerald-700 max-w-md mx-auto">
                      Thank you for contacting JAC MediaLand IT Solutions. A dedicated engineering manager will review your submission and connect with you shortly.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-6 py-2.5 rounded-full bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-900 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Ramesh Krishnan"
                          className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-black focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-2">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. ramesh@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-black focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-2">
                          Phone / WhatsApp (Optional)
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-black focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-2">
                          Service Needed *
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-black focus:bg-white transition-all"
                        >
                          {activeServicesOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-2">
                        Estimated Budget *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {activeBudgetOptions.map((b) => (
                          <button
                            type="button"
                            key={b}
                            onClick={() => setFormData({ ...formData, budget: b })}
                            className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                              formData.budget === b
                                ? 'bg-black text-white border-black shadow-xs'
                                : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-2">
                        Project Scope & Goals *
                      </label>
                      <textarea
                        required
                        rows="4"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about what you want to build, existing technology challenges, and your desired target launch date..."
                        className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-black focus:bg-white transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-8 rounded-full bg-black text-white font-semibold text-base hover:bg-neutral-800 transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                    >
                      <span>{loading ? 'Submitting Details...' : 'Send Inquiry Now'}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
