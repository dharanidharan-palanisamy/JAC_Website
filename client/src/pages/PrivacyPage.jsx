import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

const defaultSections = [
  {
    heading: '1. Information We Collect',
    content: 'When you visit JAC MediaLand IT Solutions or submit project inquiries through our contact forms, we may collect personal identifiable details including your name, corporate email address, phone number, and project descriptions.'
  },
  {
    heading: '2. How We Use Your Information',
    content: 'Your contact details are strictly utilized to respond to technical inquiries, generate service proposals, execute nondisclosure agreements, and maintain communications regarding ongoing product development.'
  },
  {
    heading: '3. Data Confidentiality & Non-Disclosure',
    content: 'We treat all client specifications, architecture diagrams, and software requirements with strict confidentiality. JAC MediaLand does not sell, rent, or trade your personal or project data to third-party marketing entities.'
  },
  {
    heading: '4. Security Measures',
    content: 'We employ HTTPS encryption, rate limiting, and secure access protocols to safeguard all submitted data against unauthorized interception or breach.'
  },
  {
    heading: '5. Contact Our Data Controller',
    content: 'For privacy-related inquiries or to request data deletion, contact us at privacy@jacmedialand.com.'
  }
];

const PrivacyPage = () => {
  const [doc, setDoc] = useState({
    title: 'Privacy Policy',
    lastUpdated: 'January 2026',
    sections: defaultSections
  });

  useEffect(() => {
    const loadLegal = async () => {
      try {
        const res = await api.getPageContent('legal');
        if (res.success && res.data?.privacyPolicy) {
          setDoc(res.data.privacyPolicy);
        }
      } catch (err) {
        console.error('Failed to load privacy policy from API:', err);
      }
    };
    loadLegal();
  }, []);

  return (
    <div className="w-full py-20 bg-[#FBFBFA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-black">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 tracking-tight font-sans-tight mb-4">
            {doc.title || 'Privacy Policy'}
          </h1>
          <p className="text-neutral-500 text-sm">Last updated: {doc.lastUpdated || 'January 2026'}</p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-8 text-neutral-700 text-sm sm:text-base leading-relaxed">
          {(doc.sections || defaultSections).map((sec, idx) => (
            <section key={idx}>
              <h2 className="text-xl font-bold text-neutral-900 mb-3">{sec.heading}</h2>
              <p>{sec.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
