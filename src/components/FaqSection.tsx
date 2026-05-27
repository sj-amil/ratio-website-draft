/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { faqData } from '../sukukData';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Shariah', 'Liquidity', 'Security', 'General'];

  const filteredFaqs = faqData.filter(faq => {
    if (selectedCategory === 'All') return true;
    return faq.category === selectedCategory;
  });

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div id="faq-interactive-accordion" className="space-y-6">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2.5 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`btn-faq-cat-${cat}`}
            onClick={() => {
              setSelectedCategory(cat);
              setOpenIndex(0); // auto open first FAQ under new category
            }}
            className={`px-4 py-2 rounded-full text-xs font-display font-medium transition-all cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-shariah-navy text-white border-shariah-navy shadow-sm'
                : 'bg-white hover:bg-shariah-cream/70 text-shariah-slate border-shariah-border'
            }`}
          >
            {cat} FAQs
          </button>
        ))}
      </div>

      {/* Accordion Questions */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                isOpen 
                  ? 'border-shariah-gold bg-shariah-cream/30 shadow-md shadow-shariah-gold/5' 
                  : 'border-shariah-border hover:border-shariah-green-medium/40'
              }`}
            >
              <button
                id={`faq-btn-toggle-${idx}`}
                onClick={() => toggleAccordion(idx)}
                className="w-full text-left p-5 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className={`w-4 h-4 flex-shrink-0 ${isOpen ? 'text-shariah-gold' : 'text-shariah-slate'}`} />
                  <span className="font-display font-semibold text-shariah-navy text-sm sm:text-base pr-4 leading-normal">
                    {faq.question}
                  </span>
                </div>
                <div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-shariah-gold flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-shariah-slate flex-shrink-0" />
                  )}
                </div>
              </button>

              <div 
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-40 border-t border-shariah-border/60 p-5' : 'max-h-0'
                } overflow-hidden`}
              >
                <p className="text-xs sm:text-sm text-shariah-slate leading-relaxed">
                  {faq.answer}
                </p>
                <div className="flex items-center justify-between mt-3 text-[10px] font-mono text-shariah-slate/80">
                  <span>Category: Shariah-Compliant {faq.category}</span>
                  <span className="text-[#D4AF37] font-semibold">AAOIFI Compliant</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
