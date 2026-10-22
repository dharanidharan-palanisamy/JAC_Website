import React from 'react';
import { FileText } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="w-full py-20 bg-[#FBFBFA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-black">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 tracking-tight font-sans-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-neutral-500 text-sm">Last updated: January 2026</p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-8 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">1. Scope of Engagement</h2>
            <p>
              By accessing the website and contracting JAC MediaLand IT Solutions for software engineering, design, or consulting services, you agree to comply with the terms set forth herein and within each respective Statement of Work (SOW).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">2. Intellectual Property Rights</h2>
            <p>
              Upon final settlement of project invoices according to project milestones, all custom code, design assets, and source repositories created specifically for the client become the exclusive property of the client.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">3. Service Warranties & Bug Fixes</h2>
            <p>
              We provide a 30-day post-launch warranty window for all custom web applications to resolve defects or regressions stemming from our code release.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">4. Limitation of Liability</h2>
            <p>
              In no event shall JAC MediaLand IT Solutions be liable for consequential, indirect, or punitive damages arising from the use or inability to use deployed software platforms beyond the total value of fees paid under the applicable contract.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
