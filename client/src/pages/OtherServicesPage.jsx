import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Cloud,
  Cpu,
  ShieldCheck,
  Server,
  TestTube2,
  Headphones,
  ArrowRight,
  Check,
  Sparkles,
  ArrowUpRight,
  Send,
  X,
  CheckCircle2
} from 'lucide-react';
import CTASection from '../components/home/CTASection';
import { api } from '../services/api';

const defaultOtherServices = [
  {
    id: 'cloud-devops',
    title: 'Cloud Architecture & DevOps',
    category: 'Infrastructure',
    badge: '99.99% SLA',
    icon: Cloud,
    tagline: 'High-availability cloud migrations, automated CI/CD pipelines & container orchestration.',
    description: 'We design and manage resilient cloud infrastructure across AWS, Google Cloud, and Microsoft Azure. Our engineers implement automated zero-downtime deployment workflows, auto-scaling clusters, and cost-optimized serverless architectures.',
    deliverables: [
      'Multi-cloud architecture design & migration roadmap',
      'Docker containerization & Kubernetes (EKS/GKE) orchestration',
      'Automated CI/CD deployment pipelines (GitHub Actions, GitLab)',
      'Infrastructure as Code (Terraform, Ansible & Pulumi)',
      'Cloud spend audit & automated resource optimization'
    ],
    techStack: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions']
  },
  {
    id: 'ai-machine-learning',
    title: 'AI & Intelligent Automation',
    category: 'Next-Gen Tech',
    badge: 'AI Enabled',
    icon: Cpu,
    tagline: 'Custom LLM agents, predictive data pipelines & business process automation.',
    description: 'Transform manual enterprise workflows into lightning-fast automated systems. From conversational AI copilots and semantic document extraction to custom machine learning models for customer churn and demand forecasting.',
    deliverables: [
      'Private enterprise LLM integration & vector search (RAG)',
      'Custom conversational support agents & WhatsApp AI bots',
      'Intelligent document parsing & automated OCR pipelines',
      'Predictive customer analytics & recommendation engines',
      'API connectors connecting AI models to legacy databases'
    ],
    techStack: ['OpenAI / Claude', 'LangChain', 'Python', 'PyTorch', 'Pinecone', 'FastAPI']
  },
  {
    id: 'cybersecurity-compliance',
    title: 'Cybersecurity & Compliance Auditing',
    category: 'Security',
    badge: 'Zero-Trust',
    icon: ShieldCheck,
    tagline: 'Vulnerability assessments, penetration testing & compliance readiness.',
    description: 'Safeguard your digital assets against evolving threats. We conduct deep code security audits, ethical penetration testing, zero-trust network configurations, and compliance preparation for SOC 2, ISO 27001, and GDPR.',
    deliverables: [
      'Full-stack source code vulnerability & dependency analysis',
      'Web application & API penetration testing (OWASP Top 10)',
      'Zero-trust access policy & multi-factor authentication setup',
      'Automated daily offsite cryptographic backup systems',
      'Regulatory compliance audit (SOC2, GDPR, HIPAA ready)'
    ],
    techStack: ['OWASP ZAP', 'Burp Suite', 'Cloudflare WAF', 'AWS GuardDuty', 'SonarQube']
  },
  {
    id: 'api-legacy-modernization',
    title: 'API Engineering & Legacy Modernization',
    category: 'Enterprise Engineering',
    badge: 'Mission-Critical',
    icon: Server,
    tagline: 'Refactoring monolithic legacy systems into agile, high-throughput microservices.',
    description: 'Eliminate technical debt and bottlenecks without disrupting active business operations. We incrementally decouple legacy monoliths into modular services, build high-concurrency API gateways, and integrate disparate third-party enterprise tools.',
    deliverables: [
      'Monolith-to-microservice migration & strangler fig strategy',
      'High-throughput RESTful and GraphQL API gateways',
      'Real-time event streaming architectures with Apache Kafka / RabbitMQ',
      'Legacy database migrations (SQL Server / Oracle to PostgreSQL)',
      'Comprehensive OpenAPI documentation and developer developer SDKs'
    ],
    techStack: ['Node.js', 'Go', 'GraphQL', 'Kafka', 'Redis', 'PostgreSQL']
  },
  {
    id: 'qa-test-automation',
    title: 'Quality Assurance & Automated Testing',
    category: 'Software Quality',
    badge: 'Zero Regression',
    icon: TestTube2,
    tagline: 'End-to-end automated regression testing, load testing & cross-browser validation.',
    description: 'Guarantee bug-free releases with automated QA pipelines. We write comprehensive integration, unit, and end-to-end test suites that run on every pull request, preventing regressions and validating peak traffic capacity.',
    deliverables: [
      'Automated end-to-end testing with Cypress & Playwright',
      'High-concurrency load & stress testing (K6 / JMeter)',
      'Cross-device mobile test automation on real hardware',
      'Automated visual regression testing & design diffs',
      'Continuous QA reporting and telemetry alerts'
    ],
    techStack: ['Playwright', 'Cypress', 'K6', 'Jest', 'BrowserStack', 'Postman']
  },
  {
    id: 'managed-support-sla',
    title: '24/7 Managed IT Support & SLA Services',
    category: 'Maintenance',
    badge: '24/7/365 Support',
    icon: Headphones,
    tagline: 'Proactive server monitoring, emergency patch deployment & technical maintenance.',
    description: 'Never worry about server crashes or critical security bugs. Our round-the-clock engineering team actively monitors uptime, monitors anomaly logs, deploys critical zero-day patches, and provides dedicated phone support with 15-minute response guarantees.',
    deliverables: [
      '24/7 server health, uptime, and database telemetry monitoring',
      'Guaranteed 15-minute emergency SLA response times',
      'Scheduled security patches, OS upgrades & package updates',
      'Monthly performance audit reports and advisory roadmap calls',
      'Dedicated Slack/Teams channel with senior technical leads'
    ],
    techStack: ['Datadog', 'Prometheus', 'Grafana', 'PagerDuty', 'Sentry', 'New Relic']
  }
];

const otherIconMap = {
  Cloud,
  Cpu,
  ShieldCheck,
  Server,
  TestTube2,
  Headphones,
  Sparkles
};

const OtherServicesPage = () => {
  const [services, setServices] = useState(defaultOtherServices);
  const [selectedService, setSelectedService] = useState(null);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await api.getOtherServices();
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setServices(res.data.filter((s) => s.isActive !== false));
        }
      } catch (err) {
        console.error('Failed to load other services, using default:', err);
      }
    };
    loadServices();
  }, []);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setSelectedService(null);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    }, 2500);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="nutz-hero-gradient min-h-[calc(100vh-80px)] flex items-center justify-center text-center px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <span className="text-2xl sm:text-3xl md:text-4xl block mb-3">
            <span className="font-serif-italic font-normal text-neutral-800">Other</span>{' '}
            <span className="font-sans font-extrabold text-neutral-900 tracking-tight">Services</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6 font-sans-tight">
            Other enterprise IT services{' '}
            <span className="font-serif-italic font-normal block sm:inline">
              engineered for scale.
            </span>
          </h1>
          <p className="text-neutral-700 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Beyond our primary web and mobile disciplines, JAC MediaLand delivers cloud DevOps, generative AI integrations, cyber security auditing, and 24/7 managed SLAs.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/services"
              className="text-xs uppercase font-mono tracking-widest font-bold text-neutral-800 hover:text-black py-2.5 px-6 rounded-full bg-white/70 hover:bg-white border border-black/10 transition-colors"
            >
              ← View Core Disciplines
            </Link>
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white text-xs sm:text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
            >
              <span>Explore All {services.length} Extended Services</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="catalog" className="pt-20 pb-24 sm:pt-24 sm:pb-32 bg-[#FBFBFA] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 block mb-3 font-mono">
              Extended Solutions Catalog
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
              Tailored technology services{' '}
              <span className="font-serif-italic font-normal text-neutral-800">
                built for critical demands.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = typeof service.icon === 'string' ? (otherIconMap[service.icon] || Sparkles) : (service.icon || Sparkles);
              const sKey = service._id || service.id || idx;
              return (
                <div
                  key={sKey}
                  className="group rounded-3xl bg-white border border-neutral-200/80 p-8 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-neutral-100 group-hover:bg-amber-300 text-neutral-900 flex items-center justify-center transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono uppercase font-bold px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200/80">
                        {service.badge}
                      </span>
                    </div>

                    <span className="text-xs uppercase font-mono text-amber-700 font-bold block mb-1">
                      {service.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="space-y-2.5 mb-6 pt-4 border-t border-neutral-100">
                      <span className="text-[11px] font-mono uppercase text-neutral-400 font-bold block mb-2">
                        Key Capabilities:
                      </span>
                      {(service.deliverables || []).slice(0, 3).map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono bg-neutral-100 text-neutral-700 px-2.5 py-0.5 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="w-full py-3 px-4 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {inquirySuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900">Inquiry Received!</h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                  Thank you for your interest in our <strong className="text-black">{selectedService.title}</strong> service. A senior technology specialist from JAC MediaLand will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-700 font-bold block mb-1">
                    Custom Solution Request
                  </span>
                  <h3 className="text-2xl font-bold text-neutral-900">
                    Inquire: {selectedService.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Tell us about your technical timeline and project requirements.
                  </p>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="text-neutral-800 font-semibold block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Anand Sharma"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-neutral-800 font-semibold block mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="text-neutral-800 font-semibold block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-neutral-800 font-semibold block mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme Innovations"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-800 font-semibold block mb-1">Project Scope & Questions *</label>
                    <textarea
                      required
                      rows="3"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share current infrastructure details, timelines, or requirements..."
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedService(null)}
                      className="px-5 py-2.5 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 font-semibold cursor-pointer flex items-center gap-2"
                    >
                      <span>Submit Inquiry</span>
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

export default OtherServicesPage;
