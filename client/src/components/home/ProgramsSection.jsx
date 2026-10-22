import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  Code2, 
  Cpu, 
  GraduationCap,
  Clock,
  CheckCircle2,
  Users
} from 'lucide-react';

const programs = [
  {
    id: 'incubation',
    tag: 'ENTERPRISE & STARTUPS',
    icon: Layers,
    title: 'Enterprise Tech Incubation & Co-Innovation Lab',
    summary:
      'Co-build mission-critical MVPs, generative AI workflows, and cloud-native digital infrastructure alongside JAC MediaLand senior engineers and principal architects.',
    duration: '12 – 24 Weeks',
    format: 'Hybrid / Dedicated Pods',
    targetAudience: 'High-Growth Startups, Enterprise Labs & Corporate Spin-offs',
    highlights: [
      'Rapid prototype-to-production sprint cycles',
      'Direct architecture advisory with senior CTOs',
      'Full CI/CD, AWS/GCP cloud setup and enterprise security audit'
    ],
    ctaText: 'Apply for Incubation',
    ctaLink: '/contact'
  },
  {
    id: 'fullstack',
    tag: 'TALENT & UPSKILLING',
    icon: Code2,
    title: 'Full-Stack & Cloud Engineering Immersion',
    summary:
      'An intensive hands-on apprenticeship bridging theory with real enterprise codebases. Master React, Node.js, distributed databases, cloud architecture, and modern DevOps pipelines.',
    duration: '16 Weeks Intensive',
    format: 'Live Immersive Sprints',
    targetAudience: 'Junior to Mid-level Developers & Lateral Career Switchers',
    highlights: [
      'Production codebase contribution under 1-on-1 tech lead review',
      'Microservices, containerization (Docker/K8s) & serverless focus',
      'Direct hiring pipeline into JAC MediaLand and client network'
    ],
    ctaText: 'Explore Immersion Cohort',
    ctaLink: '/careers'
  },
  {
    id: 'executive-ai',
    tag: 'EXECUTIVE & LEADERSHIP',
    icon: Cpu,
    title: 'Executive AI & Digital Transformation Suite',
    summary:
      'Strategic executive workshops and hands-on masterclasses designed to equip founders and tech directors with actionable frameworks for operationalizing AI and modern cloud systems.',
    duration: '4 – 8 Weeks Modular',
    format: 'Executive Masterclass Series',
    targetAudience: 'CTOs, Engineering Directors, Product Leaders & Founders',
    highlights: [
      'Cost-benefit blueprints for LLM and AI automation adoption',
      'Enterprise data governance, IP safety, and compliance audits',
      'Bespoke digital transformation roadmap for your business'
    ],
    ctaText: 'Request Corporate Brief',
    ctaLink: '/contact'
  },
  {
    id: 'campus-accelerator',
    tag: 'ACADEMIC PARTNERSHIPS',
    icon: GraduationCap,
    title: 'Campus-to-Corporate Tech Accelerator',
    summary:
      'Institutional collaboration program connecting universities with real tech ecosystem demands. Equips graduating engineers with industry best practices, Git collaboration, and product thinking.',
    duration: '8 – 12 Weeks',
    format: 'Campus Labs & Capstone Projects',
    targetAudience: 'Colleges, Universities & Final-Year Engineering Students',
    highlights: [
      'Practical software engineering curriculum crafted by active developers',
      'Live capstone project evaluations with industry engineering panels',
      'Internship opportunities and enterprise placement assistance'
    ],
    ctaText: 'Partner With Your College',
    ctaLink: '/contact'
  }
];

const ProgramsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? programs.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === programs.length - 1 ? 0 : prevIdx + 1));
  };

  const current = programs[currentIndex];
  const IconComponent = current.icon;

  return (
    <section className="py-24 sm:py-32 bg-[#FBFBFA]" id="programs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 block mb-3">
            Our Programs
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
            Empowering talent &amp;{' '}
            <span className="font-serif-italic font-normal text-neutral-800">
              pioneering innovation.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            From enterprise co-innovation and startup incubation to intensive developer apprenticeships, explore our structured programs.
          </p>
        </div>

        {/* Main Program Feature Card (matches dark card aesthetic from reference) */}
        <div className="relative rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 lg:p-14 shadow-2xl overflow-hidden border border-neutral-800">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-700/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between min-h-[380px]">
            {/* Top Row: Tag badge + Icon */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                {current.tag}
              </div>

              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-300">
                <IconComponent className="w-6 h-6" />
              </div>
            </div>

            {/* Program Title & Summary */}
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 leading-snug">
                {current.title}
              </h3>
              <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-4xl">
                {current.summary}
              </p>
            </div>

            {/* Highlights & Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5" /> Duration &amp; Format
                </div>
                <div className="text-sm font-semibold text-white">{current.duration}</div>
                <div className="text-xs text-neutral-400 mt-0.5">{current.format}</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                  <Users className="w-3.5 h-3.5" /> Audience
                </div>
                <div className="text-sm font-semibold text-white truncate">{current.targetAudience}</div>
                <div className="text-xs text-neutral-400 mt-0.5">Cohort-based selection</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> Key Focus
                </div>
                <div className="text-xs text-neutral-200 line-clamp-2 mt-0.5">
                  {current.highlights[0]}
                </div>
              </div>
            </div>

            {/* Footer / Controls Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-white/15">
              <div className="flex items-center gap-4">
                <Link
                  to={`/programs/${current.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-neutral-900 font-semibold text-sm hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  View Program Details
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="p-3 rounded-full bg-white/10 hover:bg-white hover:text-black transition-all cursor-pointer"
                  aria-label="Previous program"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono text-neutral-400 tracking-wider">
                  {currentIndex + 1} / {programs.length}
                </span>
                <button
                  onClick={next}
                  className="p-3 rounded-full bg-white/10 hover:bg-white hover:text-black transition-all cursor-pointer"
                  aria-label="Next program"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
