import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, Zap, Users2, Trophy } from 'lucide-react';

const storyItems = [
  {
    id: 1,
    title: 'Relentless Focus on Craft & Performance',
    content:
      'We never use bloated website builders or off-the-shelf templates. Every digital solution is meticulously crafted with modern frontend code, sub-second load times, and custom micro-animations that make your users take notice.',
    stat: '99/100',
    statLabel: 'Average Google PageSpeed'
  },
  {
    id: 2,
    title: 'Full-Stack Technical Capabilities Under One Roof',
    content:
      'From complex reactive web applications and mobile apps to brand strategy, conversion-optimized design systems, and cloud infrastructure, our multi-disciplinary team seamlessly connects design with rigorous software engineering.',
    stat: '100%',
    statLabel: 'In-House Delivery'
  },
  {
    id: 3,
    title: 'True Business Partnership, Not Just Vendors',
    content:
      'We invest the time to understand your unit economics, user psychology, and market landscape. We don’t just deliver code—we guide technical strategy to help you scale sustainably with high ROI.',
    stat: '98%',
    statLabel: 'Client Retention Rate'
  },
  {
    id: 4,
    title: 'Transparent Collaboration & Rapid Agility',
    content:
      'Real-time communication, weekly staging releases, and straightforward roadmaps. You always have full visibility into engineering milestones, code reviews, and launch timelines.',
    stat: '2-4 wks',
    statLabel: 'Rapid MVP Deployment'
  }
];

const StorySection = ({ stats }) => {
  const [activeTab, setActiveTab] = useState(1);

  const toggleTab = (id) => {
    setActiveTab((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-5">
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 block mb-3">
              Why JAC MediaLand?
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15] mb-6">
              Engineering with purpose,{' '}
              <span className="font-serif-italic font-normal text-neutral-800">
                designing with soul.
              </span>
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed mb-8">
              In an era of cookie-cutter digital templates, JAC MediaLand stands out by uniting human-centered design with rigorous full-stack engineering. We help ambitious companies build memorable digital experiences that turn visitors into brand advocates.
            </p>


            {/* Quick Stats Grid (2x2 Card Format) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 pt-8 border-t border-neutral-200">
              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-100/60 border border-neutral-200/50 hover:bg-neutral-100/80 transition-colors">
                <span className="text-2xl sm:text-3xl font-bold text-neutral-900 block font-sans-tight">
                  {stats?.projectsCompleted || '150+'}
                </span>
                <span className="text-xs sm:text-sm text-neutral-500 font-medium leading-tight block mt-1.5">
                  Projects Shipped
                </span>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-100/60 border border-neutral-200/50 hover:bg-neutral-100/80 transition-colors">
                <span className="text-2xl sm:text-3xl font-bold text-neutral-900 block font-sans-tight">
                  {stats?.happyClients || '98%'}
                </span>
                <span className="text-xs sm:text-sm text-neutral-500 font-medium leading-tight block mt-1.5">
                  Client Satisfaction
                </span>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-100/60 border border-neutral-200/50 hover:bg-neutral-100/80 transition-colors">
                <span className="text-2xl sm:text-3xl font-bold text-neutral-900 block font-sans-tight">
                  {stats?.yearsExperience || '8+'}
                </span>
                <span className="text-xs sm:text-sm text-neutral-500 font-medium leading-tight block mt-1.5">
                  Years in IT & Design
                </span>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-100/60 border border-neutral-200/50 hover:bg-neutral-100/80 transition-colors">
                <span className="text-2xl sm:text-3xl font-bold text-neutral-900 block font-sans-tight">
                  {stats?.expertDevelopers || '25+'}
                </span>
                <span className="text-xs sm:text-sm text-neutral-500 font-medium leading-tight block mt-1.5">
                  Engineers & Designers
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Story Accordion Items */}
          <div className="lg:col-span-7 space-y-4">
            {storyItems.map((item) => {
              const isOpen = activeTab === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => !isOpen && toggleTab(item.id)}
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? 'bg-white shadow-lg border-neutral-300/80 p-6 sm:p-8'
                      : 'bg-neutral-100/70 hover:bg-neutral-100 border-neutral-200/60 p-5 sm:p-6 cursor-pointer'
                  }`}
                >
                  <div
                    onClick={(e) => {
                      if (isOpen) {
                        e.stopPropagation();
                        toggleTab(item.id);
                      }
                    }}
                    className="flex items-center justify-between cursor-pointer select-none"
                  >
                    <span className="text-lg sm:text-xl font-semibold text-neutral-900 font-sans-tight flex items-center gap-3">
                      <span className="text-xs font-mono font-medium text-neutral-400">
                        0{item.id}
                      </span>
                      {item.title}
                    </span>
                    <button
                      type="button"
                      aria-label={isOpen ? "Collapse section" : "Expand section"}
                      className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors focus:outline-none"
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-black' : 'text-neutral-500'
                        }`}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mt-4 pt-4 border-t border-neutral-100">
                          {item.content}
                        </p>
                        <div className="mt-6 flex items-center gap-4 bg-neutral-50 p-3 rounded-xl border border-neutral-200/40 w-fit">
                          <span className="text-xl font-bold text-black font-sans-tight">
                            {item.stat}
                          </span>
                          <span className="text-xs text-neutral-500 font-medium">
                            {item.statLabel}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
