import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Layout, Code2, ShieldCheck, Rocket } from 'lucide-react';
import { api } from '../../services/api';

const defaultProcessSteps = [
  {
    step: '01',
    title: 'Discovery & Product Strategy',
    icon: Compass,
    summary: 'Deep dive into your business model, target audiences, and technical requirements.',
    details: [
      'Stakeholder interviews and requirement gathering',
      'Competitor landscape and technical feasibility analysis',
      'Information architecture and user persona creation',
      'Sprint roadmap and milestone timeline alignment'
    ]
  },
  {
    step: '02',
    title: 'Human-Centered UI/UX Design',
    icon: Layout,
    summary: 'Transforming complex product logic into elegant, intuitive interactive interfaces.',
    details: [
      'Low-fidelity wireframing and user flow diagrams',
      'High-fidelity interactive prototypes in Figma',
      'Design tokens and accessible component systems',
      'Iterative client reviews and usability refinement'
    ]
  },
  {
    step: '03',
    title: 'High-Performance Development',
    icon: Code2,
    summary: 'Building fast, clean, and modular codebases using modern frameworks.',
    details: [
      'Component-driven frontend development (React / Next.js / Tailwind)',
      'Robust backend APIs, database modeling, and auth guards',
      'Micro-animations and fluid GSAP/Framer interactions',
      'Sub-second Core Web Vitals optimization'
    ]
  },
  {
    step: '04',
    title: 'Rigorous Testing & QA',
    icon: ShieldCheck,
    summary: 'Ensuring absolute stability across devices, screen sizes, and network conditions.',
    details: [
      'End-to-end responsiveness checks across mobile and desktop',
      'Security headers, rate limiting, and input sanitization',
      'Cross-browser compatibility validation',
      'SEO schema markup and accessibility (WCAG) audits'
    ]
  },
  {
    step: '05',
    title: 'Deployment & Growth Scaling',
    icon: Rocket,
    summary: 'Flawless production launch with continuous monitoring and proactive maintenance.',
    details: [
      'Zero-downtime production deployment and DNS configuration',
      'Analytics and telemetry tracking setup',
      'Staff admin training and documentation handoff',
      'Post-launch SLA support and ongoing feature scaling'
    ]
  }
];

const processIconMap = {
  Compass,
  Layout,
  Code2,
  ShieldCheck,
  Rocket
};

const ProcessSection = () => {
  const [processSteps, setProcessSteps] = useState(defaultProcessSteps);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const loadSteps = async () => {
      try {
        const res = await api.getProcessSteps();
        if (res.success && res.data?.steps && res.data.steps.length > 0) {
          setProcessSteps(res.data.steps);
        }
      } catch (err) {
        console.error('Failed to load process steps from API:', err);
      }
    };
    loadSteps();
  }, []);

  return (
    <section className="py-24 sm:py-32 bg-[#F1F1EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 block mb-3">
            How We Deliver
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
            A transparent 5-step process{' '}
            <span className="font-serif-italic font-normal text-neutral-800">
              from idea to impact.
            </span>
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg mt-4">
            No guesswork. Our structured agile delivery framework guarantees timely launches, clear communication, and impeccable code quality.
          </p>
        </div>

        {/* Step Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {processSteps.map((s, index) => {
            const Icon = typeof s.icon === 'string' ? (processIconMap[s.icon] || Compass) : (s.icon || Compass);
            const isActive = activeStep === index;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(index)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-md scale-102'
                    : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-200/80 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-amber-300' : 'text-neutral-400'}`}>
                    STEP {s.step}
                  </span>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                </div>
                <h4 className="text-sm font-semibold leading-tight line-clamp-2">
                  {s.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Step Highlight Showcase */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200/80 shadow-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold block mb-2">
                  Phase {processSteps[activeStep].step}
                </span>
                <h3 className="text-2xl sm:text-4xl font-bold text-neutral-900 mb-4">
                  {processSteps[activeStep].title}
                </h3>
                <p className="text-neutral-600 text-base sm:text-lg leading-relaxed mb-6">
                  {processSteps[activeStep].summary}
                </p>

                <div className="space-y-3">
                  <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider block">
                    Key Milestones & Deliverables:
                  </span>
                  {processSteps[activeStep].details.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-3 text-sm text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                  <span className="text-6xl sm:text-8xl font-black font-mono text-white/10 absolute -top-4 -right-4">
                    {processSteps[activeStep].step}
                  </span>

                  <h4 className="text-lg font-semibold text-amber-200 mb-2">
                    Why our process works:
                  </h4>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                    By combining design sprints with modular software development, our teams reduce feedback turnaround by 60% and eliminate mid-project surprises.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
                    <div>
                      <span className="text-neutral-400 block">Communication</span>
                      <span className="text-white font-medium">Daily Updates & Weekly Demos</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block">Code Ownership</span>
                      <span className="text-white font-medium">100% Client Intellectual Property</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
