/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Code, 
  Search, 
  Sparkles, 
  Layers, 
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { copywritingSpecifications, TechnicalChecklist } from '../copywritingDocs';

export default function CopySpecHub() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'copy' | 'specs' | 'checklist'>('copy');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 1800);
  };

  const filteredSpecs = copywritingSpecifications.filter(spec => 
    spec.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    spec.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="copy-spec-hub" className="bg-slate-900 text-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
      {/* Visual Header */}
      <div className="bg-gradient-to-r from-slate-950 to-slate-900 px-6 sm:px-8 py-6 border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-shariah-gold text-xs font-mono tracking-widest uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              Senior Copywriter & UX Blueprint
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Fintech Conversion Core Deck
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Fully customized for retail clients. Paste these exact copy blocks and parameters directly into Framer, Webflow, Figma, or custom React codebases.
            </p>
          </div>
          <div className="flex bg-slate-800/80 p-1 rounded-xl self-start">
            <button
              id="spec-tab-copy"
              onClick={() => setActiveTab('copy')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'copy' ? 'bg-shariah-gold text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Copy Blocks
            </button>
            <button
              id="spec-tab-checklist"
              onClick={() => setActiveTab('checklist')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'checklist' ? 'bg-shariah-gold text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tech Checklist
            </button>
          </div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="p-6 sm:p-8">
        {activeTab === 'copy' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-between">
              <span className="text-xs text-shariah-gold font-mono font-semibold uppercase tracking-wider">
                Full Page Layout Blocks ({filteredSpecs.length} Sections Loaded)
              </span>
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter sections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-shariah-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredSpecs.map((spec, sIdx) => (
                <div key={sIdx} className="bg-slate-950/60 rounded-2xl border border-slate-800/80 p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="font-display font-semibold text-white text-base">
                        {spec.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">{spec.description}</p>
                    </div>
                    <div className="flex items-center gap-2 gap-y-1 flex-wrap">
                      <span className="bg-slate-800 text-[10px] font-mono px-2 py-0.5 rounded text-slate-300">
                        UX Target: {spec.copywriterConcept.split('.')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Copy Details */}
                  <div className="space-y-4">
                    {Object.entries(spec.fullCopy).map(([key, val]) => {
                      const copyId = `${sIdx}-${key}`;
                      const textString = Array.isArray(val) ? val.join('\n') : val;
                      return (
                        <div key={key} className="bg-slate-950 rounded-xl p-4 border border-slate-900 relative group">
                          <div className="flex justify-between items-start gap-3 mb-1.5">
                            <span className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37]/90 uppercase">
                              {key}
                            </span>
                            <button
                              id={`btn-copy-${copyId}`}
                              onClick={() => copyToClipboard(textString, copyId)}
                              className="text-slate-500 hover:text-white transition-colors cursor-pointer p-1 rounded hover:bg-slate-900"
                              title="Copy to Clipboard"
                            >
                              {copiedText === copyId ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">{textString}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Visual assets note */}
                  <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-900 text-[11px] text-slate-400 flex items-start gap-2 italic">
                    <FileCheck className="w-3.5 h-3.5 text-shariah-gold flex-shrink-0 mt-0.5" />
                    <span><strong>Suggested Assets Placeholder:</strong> {spec.suggestedAssets}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="space-y-6">
            <span className="text-xs text-shariah-gold font-mono font-semibold uppercase tracking-wider block">
              Fintech Platform Implementation Audit Checklist
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SEO and Analytics Card */}
              <div className="bg-slate-950/60 rounded-2xl border border-slate-800/80 p-5 space-y-4">
                <div className="flex items-center gap-2 text-slate-200 font-display font-semibold border-b border-slate-800 pb-2">
                  <Code className="w-4 h-4 text-shariah-gold" />
                  SEO & Analytics Integration Tags
                </div>
                <div className="space-y-3.5">
                  {TechnicalChecklist.seo.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-400 uppercase">&lt;{item.tag}&gt;</span>
                        <span className="text-emerald-400">SEO Primary</span>
                      </div>
                      <div className="bg-slate-950 border border-slate-900 rounded p-2.5 text-xs text-slate-300 font-mono select-all">
                        {item.value}
                      </div>
                    </div>
                  ))}
                  {TechnicalChecklist.analytics.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-400">{item.tracker}</span>
                        <span className="text-indigo-400 font-medium">Analytics Pixel</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 border border-slate-900 rounded p-2.5">
                        {item.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regulatory and Multi-Currency */}
              <div className="bg-slate-950/60 rounded-2xl border border-slate-800/80 p-5 space-y-4">
                <div className="flex items-center gap-2 text-slate-200 font-display font-semibold border-b border-slate-800 pb-2">
                  <AlertCircle className="w-4 h-4 text-shariah-gold" />
                  Regulatory & Multi-Currency Gates
                </div>
                <div className="space-y-3.5">
                  {TechnicalChecklist.regulatory.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-red-400 uppercase font-semibold">{item.check}</span>
                        <span className="text-slate-400">Compliance</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 border border-slate-900 rounded p-2.5">
                        {item.value}
                      </p>
                    </div>
                  ))}
                  {TechnicalChecklist.multicurrency.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-shariah-gold font-medium uppercase font-mono">{item.feature}</span>
                        <span className="text-slate-400">Multi-Currency</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 border border-slate-900 rounded p-2.5 font-mono">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Framer/Webflow pastability hint */}
            <div className="bg-[#1D2230] text-[#D4AF37] px-5 py-4 rounded-xl border border-[#D4AF37]/20 text-xs">
              <span className="font-semibold block mb-1">💡 Conversion Marketing Tip</span>
              <p className="leading-relaxed text-slate-300">
                Place the Regulatory Disclaimer in high-contrast text directly below your primary buttons or in the site’s dynamic footer. Shariah-transparent assets should have unique, signed PDFs linked directly so users never have to browse third-party registries.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
