import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { api } from '../services/api';

const defaultSections = [
  {
    heading: '1. Scope of Engagement',
    content: 'By accessing the website and contracting JAC MediaLand IT Solutions for software engineering, design, or consulting services, you agree to comply with the terms set forth herein and within each respective Statement of Work (SOW).'
  },
  {
    heading: '2. Intellectual Property Rights',
    content: 'Upon final settlement of project invoices according to project milestones, all custom code, design assets, and source repositories created specifically for the client become the exclusive property of the client.'
  },
  {
    heading: '3. Service Warranties & Bug Fixes',
    content: 'We provide a 30-day post-launch warranty window for all custom web applications to resolve defects or regressions stemming from our code release.'
  },
  {
    heading: '4. Limitation of Liability',
    content: 'In no event shall JAC MediaLand IT Solutions be liable for consequential, indirect, or punitive damages arising from the use or inability to use deployed software platforms beyond the total value of fees paid under the applicable contract.'
  }
];

const TermsPage = () => {
  const [doc, setDoc] = useState({
    title: 'Terms of Service',
    lastUpdated: 'January 2026',
    sections: defaultSections
  });

  useEffect(() => {
    const loadLegal = async () => {
      try {
        const res = await api.getPageContent('legal');
        if (res.success && res.data?.termsOfService) {
          setDoc(res.data.termsOfService);
        }
      } catch (err) {
        console.error('Failed to load terms of service from API:', err);
      }
    };
    loadLegal();
  }, []);

  return (
    <div className="w-full py-20 bg-[#FBFBFA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-black">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 tracking-tight font-sans-tight mb-4">
            {doc.title || 'Terms of Service'}
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

export default TermsPage;
