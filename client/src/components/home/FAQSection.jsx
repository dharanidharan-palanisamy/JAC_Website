import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQSection = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#F1F1EF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 block mb-3">
            Common Questions
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
            Frequently asked{' '}
            <span className="font-serif-italic font-normal text-neutral-800">
              questions.
            </span>
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg mt-4">
            Everything you need to know about our engineering standards, collaboration models, and billing.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq._id || index}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-white shadow-md border-neutral-300'
                    : 'bg-white/80 hover:bg-white border-neutral-200/70'
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-6 sm:p-7 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-neutral-900 pr-6">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full shrink-0 transition-colors ${
                    isOpen ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-700'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden px-6 sm:px-7 pb-6 sm:pb-7 text-neutral-600 text-sm sm:text-base leading-relaxed border-t border-neutral-100 pt-4"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
