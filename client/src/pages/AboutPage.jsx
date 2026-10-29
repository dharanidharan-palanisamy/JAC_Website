import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Cpu, Shield, Sparkles, Award, Globe2, Target, ArrowUpRight, Briefcase } from 'lucide-react';
import CTASection from '../components/home/CTASection';


import { api } from '../services/api';

const defaultTeamMembers = [
  {
    name: 'Anand Jayaraj',
    role: 'Founder & Managing Director',
    expertise: 'Strategic Vision & Enterprise Tech',
    bio: '12+ years directing high-impact digital transformations for fast-scaling global brands.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Dharani Kumar',
    role: 'Head of Engineering & Architecture',
    expertise: 'Full-Stack Systems & Cloud DevOps',
    bio: 'Spearheading robust backend pipelines, microservices, and modern JavaScript architectures.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Priya Sundaram',
    role: 'Lead UI/UX & Creative Director',
    expertise: 'Design Systems & Brand Identity',
    bio: 'Award-winning designer crafting editorial typography, tactile UI motion, and brand experiences.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Karthik Ranganathan',
    role: 'Principal Mobile Architect',
    expertise: 'Flutter, React Native & iOS',
    bio: 'Architecting ultra-responsive mobile applications servicing hundreds of thousands of active users.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sneha Balaji',
    role: 'Senior Creative Technologist',
    expertise: 'Interactive Animation & Frontend',
    bio: 'Specialist in smooth micro-interactions, GSAP motion choreography, and high-performance rendering.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Arun Prasath',
    role: 'Cloud Infrastructure & Security Lead',
    expertise: 'AWS, Kubernetes & Cyber Security',
    bio: 'Ensuring bank-grade encryption, automated CI/CD pipelines, and 99.99% high availability.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80'
  }
];

const defaultCoreValues = [
  {
    icon: Code,
    title: 'Zero Compromise on Craft',
    description: 'We believe clean code is poetry. We refuse shortcuts, templates, or bloated dependencies, building custom software engineered to last for years.'
  },
  {
    icon: Sparkles,
    title: 'Design that Moves People',
    description: 'Aesthetics and usability are not afterthoughts. We craft thoughtful micro-interactions, editorial typography, and visual systems that elevate brands.'
  },
  {
    icon: Cpu,
    title: 'Modern Architecture',
    description: 'We build with modern frameworks like React, Next.js, Node.js, and cloud microservices to ensure lightning-fast speeds and effortless scalability.'
  },
  {
    icon: Shield,
    title: 'Radical Transparency',
    description: 'No technical jargon smoke-screens. We operate as genuine partners with weekly demos, shared code repos, and honest counsel on roadmap trade-offs.'
  }
];

const aboutIconMap = {
  Code,
  Sparkles,
  Cpu,
  Shield,
  Award,
  Globe2,
  Target
};


const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState(defaultTeamMembers);
  const [coreValues, setCoreValues] = useState(defaultCoreValues);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const [tRes, cRes] = await Promise.all([
          api.getTeam(),
          api.getPageContent('about')
        ]);
        if (tRes.success && tRes.data && tRes.data.length > 0) {
          setTeamMembers(tRes.data);
        }
        if (cRes.success && cRes.data) {
          setContent(cRes.data);
          if (cRes.data.coreValues && cRes.data.coreValues.length > 0) {
            setCoreValues(cRes.data.coreValues);
          }
        }
      } catch (err) {
        console.error('Error loading about page data:', err);
      }
    };
    loadAboutData();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="nutz-hero-gradient min-h-[calc(100vh-76px)] flex items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto -mt-6 sm:-mt-8">
          <span className="text-2xl sm:text-3xl md:text-4xl block mb-2 sm:mb-3">
            <span className="font-serif-italic font-normal text-neutral-800">About</span>{' '}
            <span className="font-sans font-extrabold text-neutral-900 tracking-tight">JAC MediaLand</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-5 sm:mb-6 font-sans-tight">
            {content?.heroHeading || 'We exist to help ambitious brands'}{' '}
            <span className="font-serif-italic font-normal block sm:inline">
              {content?.heroHeadingItalic || 'dominate the digital world.'}
            </span>
          </h1>
          <p className="text-neutral-700 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            {content?.heroDescription || 'Founded with a vision to merge cutting-edge software engineering with award-winning creative design, JAC MediaLand is a full-service technology agency delivering transformative solutions across India and internationally.'}
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section id="our-narrative" className="scroll-mt-20 min-h-[calc(100vh-76px)] flex items-center pt-20 sm:pt-24 pb-20 sm:pb-28 bg-[#FBFBFA]">




        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <span className="inline-block text-sm sm:text-base tracking-wider mb-3">
                <span className="font-serif-italic font-normal text-lg sm:text-xl text-neutral-700">Our</span>{' '}
                <span className="font-sans font-extrabold uppercase tracking-widest text-xs sm:text-sm text-neutral-900">Narrative</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 leading-[1.15] mb-6">
                Bridging the gap between{' '}
                <span className="font-serif-italic font-normal text-neutral-800">
                  creative art and robust technology.
                </span>
              </h2>
              <div className="space-y-4 text-neutral-600 text-base sm:text-lg leading-relaxed">
                <p>
                  Most companies face a frustrating dilemma: traditional software development shops lack design sensibility, while creative design studios struggle with complex backend architecture and performance optimization.
                </p>
                <p>
                  JAC MediaLand was established to eliminate that compromise. Our multidisciplinary engineers and designers collaborate seamlessly under one roof, treating aesthetic polish and algorithmic efficiency with equal reverence.
                </p>
                <p>
                  From high-traffic e-commerce platforms and fintech applications to corporate web flagships, our mission is to craft digital products that captivate users and produce undeniable business ROI.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
                >
                  <span>Work With Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/careers"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-neutral-300 text-neutral-900 text-sm font-semibold hover:bg-neutral-100 transition-colors shadow-2xs"
                >
                  <Briefcase className="w-4 h-4 text-amber-700" />
                  <span>Careers</span>
                </Link>
                <Link
                  to="/portfolio"
                  className="text-sm font-semibold text-neutral-900 hover:text-black border-b border-black pb-0.5"
                >
                  View Case Studies
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="JAC MediaLand Team Collaboration"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                  <span className="text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
                    Headquartered in India
                  </span>
                  <h4 className="text-xl font-bold">Innovation Hubs in Coimbatore & Chennai</h4>
                  <p className="text-xs text-neutral-300 mt-1">Delivering solutions to clients globally</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-24 bg-[#F1F1EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sm sm:text-base tracking-wider mb-3">
              <span className="font-serif-italic font-normal text-lg sm:text-xl text-neutral-700">Our</span>{' '}
              <span className="font-sans font-extrabold uppercase tracking-widest text-xs sm:text-sm text-neutral-900">Core Values</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
              Core values that guide{' '}
              <span className="font-serif-italic font-normal text-neutral-800">
                every line of code.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = typeof val.icon === 'string' ? (aboutIconMap[val.icon] || Sparkles) : (val.icon || Sparkles);
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">{val.title}</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">{val.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership & Core Team Members Section */}
      <section className="py-24 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-sm sm:text-base tracking-wider mb-3">
              <span className="font-serif-italic font-normal text-lg sm:text-xl text-neutral-700">Our</span>{' '}
              <span className="font-sans font-extrabold uppercase tracking-widest text-xs sm:text-sm text-neutral-900">Team</span>
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
              Meet our team of{' '}
              <span className="font-serif-italic font-normal text-neutral-800">
                builders & designers.
              </span>
            </h2>
            <p className="mt-4 text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto">
              A collective of passionate engineers, visionary designers, and technical architects dedicated to engineering transformative digital products.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="group rounded-3xl bg-white border border-neutral-200/80 p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-[4/4.5] rounded-2xl overflow-hidden bg-neutral-100 mb-6">
                    <img
                      src={member.image}
                      alt={`${member.name} — ${member.role}`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-amber-200 font-semibold bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        {member.expertise}
                      </span>
                    </div>
                  </div>

                  {/* Member Details */}
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight font-sans-tight">
                        {member.name}
                      </h3>
                    </div>
                    <p className="text-sm font-semibold text-neutral-700">
                      {member.role}
                    </p>
                    <p className="text-xs text-neutral-500 leading-relaxed pt-1">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Bottom badge */}
                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-mono text-[11px] text-neutral-500">{member.expertise}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active Core Team" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <CTASection />
    </div>
  );
};

export default AboutPage;
