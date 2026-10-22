import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="w-full py-20 bg-[#FBFBFA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-black">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 tracking-tight font-sans-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-neutral-500 text-sm">Last updated: January 2026</p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-8 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">1. Information We Collect</h2>
            <p>
              When you visit JAC MediaLand IT Solutions or submit project inquiries through our contact forms, we may collect personal identifiable details including your name, corporate email address, phone number, and project descriptions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">2. How We Use Your Information</h2>
            <p>
              Your contact details are strictly utilized to respond to technical inquiries, generate service proposals, execute nondisclosure agreements, and maintain communications regarding ongoing product development.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">3. Data Confidentiality & Non-Disclosure</h2>
            <p>
              We treat all client specifications, architecture diagrams, and software requirements with strict confidentiality. JAC MediaLand does not sell, rent, or trade your personal or project data to third-party marketing entities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">4. Security Measures</h2>
            <p>
              We employ HTTPS encryption, rate limiting, and secure access protocols to safeguard all submitted data against unauthorized interception or breach.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">5. Contact Our Data Controller</h2>
            <p>
              For privacy-related inquiries or to request data deletion, contact us at{' '}
              <a href="mailto:privacy@jacmedialand.com" className="font-semibold text-black underline">
                privacy@jacmedialand.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
