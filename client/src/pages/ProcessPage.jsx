import React from 'react';
import ProcessSection from '../components/home/ProcessSection';
import CTASection from '../components/home/CTASection';
import { CheckCircle2, ShieldCheck, Zap, GitBranch, Cpu, Lock } from 'lucide-react';

const standards = [
  {
    icon: Zap,
    title: 'Sub-Second Page Loads',
    desc: 'Every website and application is engineered to achieve 90+ Lighthouse and Core Web Vitals performance benchmarks.'
  },
  {
    icon: GitBranch,
    title: 'Clean Git CI/CD Pipelines',
    desc: 'Automated staging deployments, semantic pull requests, and multi-tier code reviews before every production release.'
  },
  {
    icon: Lock,
    title: 'Security-First Architecture',
    desc: 'Data sanitization, CSRF & XSS protections, secure HTTP-only cookies, and encrypted secrets management.'
  },
  {
    icon: Cpu,
    title: 'Modular & Reusable Components',
    desc: 'Scalable atomic component architecture that empowers your in-house teams to maintain and extend features smoothly.'
  }
];

const ProcessPage = () => {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="nutz-hero-gradient pt-16 pb-8 sm:pb-10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-2xl sm:text-3xl md:text-4xl block mb-3">
            <span className="font-serif-italic font-normal text-neutral-800">Our</span>{' '}
            <span className="font-sans font-extrabold text-neutral-900 tracking-tight">Process</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6 font-sans-tight">
            Our agile engineering{' '}
            <span className="font-serif-italic font-normal block sm:inline">
              methodology & standards.
            </span>
          </h1>
          <p className="text-neutral-700 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            From the initial architecture blueprint to post-launch scaling, our structured process removes friction, accelerates time-to-market, and guarantees enterprise quality.
          </p>
        </div>
      </section>

      {/* Interactive Process Section */}
      <ProcessSection />

      {/* Engineering Standards */}
      <section className="py-24 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 block mb-3">
              Code Quality & Guarantees
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
              Engineering standards that set us apart.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {standards.map((st, sIdx) => {
              const Icon = st.icon;
              return (
                <div key={sIdx} className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-black mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default ProcessPage;
