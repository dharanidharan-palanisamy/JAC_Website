import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  HeartHandshake,
  Laptop,
  GraduationCap,
  Smile,
  Send,
  X,
  ArrowUpRight
} from 'lucide-react';
import CTASection from '../components/home/CTASection';

const perks = [
  {
    icon: Laptop,
    title: 'Top-Tier Hardware',
    desc: 'Latest MacBook Pros, 4K external displays, and premium software licenses chosen by you.'
  },
  {
    icon: HeartHandshake,
    title: 'Work-Life Balance',
    desc: 'Flexible hybrid hours between our Coimbatore & Chennai hubs, or 100% remote for select roles.'
  },
  {
    icon: GraduationCap,
    title: 'Growth & Learning Budget',
    desc: 'Annual allowances for books, engineering certifications, tech conferences, and workshops.'
  },
  {
    icon: Smile,
    title: 'Comprehensive Health & Wellness',
    desc: 'Premium health insurance for you and your dependents, plus generous paid time off.'
  }
];

const openJobs = [
  {
    id: 'fullstack-sr',
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Chennai / Coimbatore / Remote',
    experience: '4 - 7 Years',
    salary: '₹14L - ₹24L PA + Equity',
    description: 'We are seeking a seasoned Full-Stack Engineer to architect and build high-performance web applications using React, Next.js, Node.js, and PostgreSQL.',
    responsibilities: [
      'Architect robust backend services and resilient microservices in Node.js',
      'Engineer lightning-fast client interfaces with Next.js App Router and Tailwind CSS',
      'Optimize database queries and Core Web Vitals for high-traffic platforms',
      'Mentor junior engineers through code reviews and technical design documents'
    ],
    requirements: [
      'Strong proficiency in TypeScript, React, Next.js, and Node.js',
      'Hands-on experience with PostgreSQL, Prisma/TypeORM, and Redis caching',
      'Solid grasp of REST, GraphQL, Docker, and AWS/Vercel cloud deployments',
      'Passionate about software craft, clean architecture, and sub-second page performance'
    ]
  },
  {
    id: 'uiux-lead',
    title: 'Lead UI/UX & Motion Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'Coimbatore / Remote',
    experience: '3 - 6 Years',
    salary: '₹12L - ₹20L PA',
    description: 'Lead the visual design, tactile micro-interactions, and design systems for enterprise web portals and consumer-facing mobile products.',
    responsibilities: [
      'Craft end-to-end user journeys, wireframes, and high-fidelity Figma prototypes',
      'Define component libraries, typography tokens, and design systems',
      'Collaborate closely with frontend engineers to ensure 100% design fidelity',
      'Design micro-animations and motion choreography for web & mobile'
    ],
    requirements: [
      'Exceptional portfolio showcasing web/mobile UI design and typography sensibility',
      'Expertise in Figma, design systems, auto-layout, and interactive prototyping',
      'Familiarity with web motion principles (Framer Motion, GSAP, Lottie)',
      'Ability to articulate design decisions with business rationale'
    ]
  },
  {
    id: 'mobile-sr',
    title: 'Senior Flutter / Mobile Engineer',
    department: 'Mobile',
    type: 'Full-time',
    location: 'Chennai / Remote',
    experience: '3 - 5 Years',
    salary: '₹12L - ₹18L PA',
    description: 'Build native-grade cross-platform iOS and Android applications delivering 60FPS fluid animations and offline-first capabilities.',
    responsibilities: [
      'Develop robust cross-platform mobile apps using Flutter & Dart',
      'Implement biometric authentication, real-time WebSockets, and push notifications',
      'Manage app performance profiling and memory leak prevention',
      'Oversee release cycles for Apple App Store and Google Play Store'
    ],
    requirements: [
      'Proven track record publishing successful production apps on App Store & Play Store',
      'Deep knowledge of state management (Bloc, Riverpod, or Provider)',
      'Experience with native iOS (Swift) or Android (Kotlin) bridge integrations is a plus'
    ]
  },
  {
    id: 'devops-lead',
    title: 'Cloud DevOps & Infrastructure Engineer',
    department: 'Infrastructure',
    type: 'Full-time',
    location: 'Chennai / Coimbatore',
    experience: '3 - 6 Years',
    salary: '₹12L - ₹20L PA',
    description: 'Scale our cloud infrastructure, automated CI/CD deployment pipelines, and zero-trust security perimeter across global client apps.',
    responsibilities: [
      'Maintain Kubernetes clusters, Dockerized workloads, and terraform scripts',
      'Configure automated staging/production CI/CD workflows via GitHub Actions',
      'Implement distributed monitoring, logging (Grafana/Prometheus), and alert triggers',
      'Conduct security hardening and automated vulnerability scans'
    ],
    requirements: [
      'Strong hands-on experience with AWS / GCP cloud environments',
      'Proficiency in Linux, Bash, Docker, Kubernetes, and Terraform/Ansible',
      'Understanding of SSL/TLS certificates, CDN edge caches, and DDoS mitigation'
    ]
  }
];

const CareersPage = () => {
  const [selectedDept, setSelectedDept] = useState('All');
  const [applyingJob, setApplyingJob] = useState(null);
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    coverNote: ''
  });

  const departments = ['All', 'Engineering', 'Design', 'Mobile', 'Infrastructure'];

  const filteredJobs = selectedDept === 'All'
    ? openJobs
    : openJobs.filter((j) => j.department === selectedDept);

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setApplyingJob(null);
      setFormData({ name: '', email: '', phone: '', portfolio: '', coverNote: '' });
    }, 2500);
  };

  return (
    <div className="w-full">
      {/* Careers Hero */}
      <section className="nutz-hero-gradient pt-16 pb-8 sm:pb-10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="font-serif-italic text-2xl sm:text-3xl text-neutral-800 block mb-3">
            Careers at JAC MediaLand
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6 font-sans-tight">
            Build iconic software with{' '}
            <span className="font-serif-italic font-normal block sm:inline">
              craftsmen who care.
            </span>
          </h1>
          <p className="text-neutral-700 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            We are a high-autonomy, low-bureaucracy technology collective. If you obsess over clean code, beautiful aesthetics, and meaningful impact, you belong here.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href="#openings"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
            >
              <span>View Open Roles</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Perks & Culture Grid */}
      <section className="pt-4 pb-20 sm:pt-6 sm:pb-24 bg-[#FBFBFA] border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 block mb-3 font-mono">
              Life at JAC MediaLand
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
              Designed for focus, autonomy,{' '}
              <span className="font-serif-italic font-normal text-neutral-800">
                and rapid growth.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="openings" className="py-24 bg-[#FBFBFA] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 block mb-2 font-mono">
                Current Openings
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900">
                Join our engineering team
              </h2>
            </div>

            {/* Department Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedDept === dept
                      ? 'bg-neutral-900 text-white'
                      : 'bg-white border border-neutral-200 text-neutral-600 hover:text-black'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs uppercase font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-amber-400/20 text-neutral-900 border border-amber-400/30">
                      {job.department}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{job.type}</span>
                    </span>
                    <span className="text-xs text-neutral-500 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{job.location}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
                    {job.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs font-mono text-neutral-500">
                    <span>Exp: {job.experience}</span>
                    <span>•</span>
                    <span className="text-neutral-900 font-bold">{job.salary}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setApplyingJob(job)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* General Inquiries Box */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-300 font-bold block mb-2">
                Spontaneous Applications
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                Don't see your specific role?
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                We are always excited to connect with exceptional engineers, product designers, and technical writers. Send us your work and tell us what you'd love to build.
              </p>
            </div>

            <a
              href="mailto:careers@jacmedialand.com?subject=Spontaneous Application — JAC MediaLand"
              className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm transition-colors shrink-0 inline-flex items-center gap-2"
            >
              <span>Email careers@jacmedialand.com</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setApplyingJob(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {appliedSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900">Application Received!</h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                  Thank you for applying to JAC MediaLand for the <strong className="text-black">{applyingJob.title}</strong> role. Our engineering leadership team will review your portfolio and reach out within 48 hours.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-700 font-bold block mb-1">
                    Application Form
                  </span>
                  <h3 className="text-2xl font-bold text-neutral-900">
                    Apply: {applyingJob.title}
                  </h3>
                  <span className="text-xs text-neutral-500 mt-1 block">
                    {applyingJob.department} • {applyingJob.location}
                  </span>
                </div>

                <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs">
                  <div>
                    <label className="text-neutral-800 font-semibold block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-neutral-800 font-semibold block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="text-neutral-800 font-semibold block mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-neutral-800 font-semibold block mb-1">
                      Portfolio / GitHub / LinkedIn URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      placeholder="https://github.com/yourhandle or portfolio"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-800 font-semibold block mb-1">
                      Brief Note / What makes you excited about this role?
                    </label>
                    <textarea
                      rows="3"
                      value={formData.coverNote}
                      onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                      placeholder="Tell us about proud projects you've shipped..."
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setApplyingJob(null)}
                      className="px-5 py-2.5 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 font-semibold cursor-pointer flex items-center gap-2"
                    >
                      <span>Submit Application</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <CTASection />
    </div>
  );
};

export default CareersPage;
