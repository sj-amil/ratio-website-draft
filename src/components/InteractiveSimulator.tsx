/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Coins, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  Calculator, 
  CheckCircle2, 
  Lock, 
  AlertCircle,
  HelpCircle,
  Building2
} from 'lucide-react';
import { curatedSukuk } from '../sukukData';
import { Sukuk } from '../types';

interface InteractiveSimulatorProps {
  onApplyClick: (sukuk: Sukuk) => void;
  selectedJurisdiction: string;
}

export default function InteractiveSimulator({ onApplyClick, selectedJurisdiction }: InteractiveSimulatorProps) {
  const [selectedId, setSelectedId] = useState<string>(curatedSukuk[0].id);
  const [investmentAmount, setInvestmentAmount] = useState<number>(5000);
  const [activeTab, setActiveTab] = useState<'calculator' | 'structure'>('calculator');

  const selectedSukuk = useMemo(() => {
    return curatedSukuk.find(s => s.id === selectedId) || curatedSukuk[0];
  }, [selectedId]);

  // Adjust display of partner broker based on chosen jurisdiction
  const localPartner = useMemo(() => {
    switch (selectedJurisdiction) {
      case 'GCC_MID':
        return { bank: 'Al Rajhi Capital', regulator: 'SAMA Licensed' };
      case 'SEA_MAL':
        return { bank: 'Maybank Shariah Gateway', regulator: 'Securities Commission Malaysia Licensed' };
      case 'WEST_EU':
        return { bank: 'Amana Custodian Brokers (UK)', regulator: 'FCA & Shariah Board Supervised' };
      default:
        return { bank: 'Standard Chartered Saadiq', regulator: 'DFSA Licensed Broker' };
    }
  }, [selectedJurisdiction]);

  // Projected profit calculation
  const calculations = useMemo(() => {
    const yieldPercentage = selectedSukuk.yield / 100;
    const annualProfit = investmentAmount * yieldPercentage;
    const payoutAmount = selectedSukuk.frequency === 'Monthly' 
      ? annualProfit / 12 
      : selectedSukuk.frequency === 'Quarterly' 
        ? annualProfit / 4 
        : selectedSukuk.frequency === 'Semi-Annual'
          ? annualProfit / 2
          : annualProfit; // on maturity

    return {
      annualProfit,
      payoutAmount,
      yieldPercentage: selectedSukuk.yield,
      payoutLabel: selectedSukuk.frequency
    };
  }, [selectedSukuk, investmentAmount]);

  const handleAmountSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    // Bind to the specific Sukuk's minimum investment
    if (val >= selectedSukuk.minInvestment) {
      setInvestmentAmount(val);
    } else {
      setInvestmentAmount(selectedSukuk.minInvestment);
    }
  };

  const handleTabClick = (tabId: string) => {
    setSelectedId(tabId);
    // Automatically set investment amount if below the new Sukuk's minimum
    const newSukuk = curatedSukuk.find(s => s.id === tabId);
    if (newSukuk && investmentAmount < newSukuk.minInvestment) {
      setInvestmentAmount(newSukuk.minInvestment);
    }
  };

  return (
    <div id="interactive-simulator" className="bg-white rounded-3xl shadow-xl border border-shariah-border/60 overflow-hidden relative">
      {/* Top Banner highlighting simulated system status */}
      <div className="bg-shariah-navy px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-shariah-border/20">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono tracking-wider uppercase text-slate-300">Live Global Directory & Calculator</span>
        </div>
        <div className="text-xs font-mono text-slate-300">
          Partner Core Status: <span className="text-emerald-400 font-semibold uppercase">Operational ({localPartner.bank})</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: List selector of current active Sukuk */}
        <div className="lg:col-span-5 border-r border-shariah-border/60 bg-shariah-cream/50 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-shariah-green-medium mb-4">
              Step 1: Discover Active Offerings
            </h3>
            <div className="space-y-3">
              {curatedSukuk.map((sukuk) => {
                const isSelected = sukuk.id === selectedId;
                return (
                  <button
                    key={sukuk.id}
                    id={`btn-select-${sukuk.id}`}
                    onClick={() => handleTabClick(sukuk.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected 
                        ? 'border-shariah-green bg-white shadow-md shadow-shariah-green/5 ring-1 ring-shariah-green' 
                        : 'border-shariah-border bg-white hover:border-shariah-green/30 hover:bg-shariah-cream/80'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                        sukuk.type === 'Sovereign' || sukuk.type === 'T-Sukuk'
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-indigo-50 text-indigo-800'
                      }`}>
                        {sukuk.type}
                      </span>
                      <span className="text-sm font-mono font-bold text-shariah-green-medium">
                        {sukuk.yield.toFixed(2)}% <span className="text-[10px] font-normal text-shariah-slate">YTM</span>
                      </span>
                    </div>
                    <h4 className="font-display font-semibold text-sm text-shariah-navy mt-2 line-clamp-1">
                      {sukuk.name}
                    </h4>
                    <div className="flex justify-between text-[11px] text-shariah-slate mt-2 font-mono">
                      <span>Min: ${sukuk.minInvestment}</span>
                      <span>Tenure: {sukuk.tenure}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-shariah-border/80 text-[11px] text-shariah-slate flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-shariah-gold flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              *Yield values are indicative net annual percentages generated from legitimate asset rental income (Ijarah), deferred commodities markup (Murabaha), or management commission splits (Wakalah). No interest is paid.
            </p>
          </div>
        </div>

        {/* Right Column: Calculations and Asset Structure Visualizer */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Header of detailed card */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-shariah-border pb-5 mb-6">
              <div>
                <span className="text-xs text-shariah-slate font-mono uppercase tracking-widest block">Underlying Sovereign/Issuer</span>
                <span className="font-semibold text-shariah-navy text-base mt-1 flex items-center gap-1.5 font-display">
                  <Building2 className="w-4 h-4 text-shariah-gold" />
                  {selectedSukuk.issuer}
                </span>
              </div>
              <div className="flex items-center gap-1.5 self-start">
                <span className="text-xs bg-shariah-gold-light text-shariah-green-medium border border-shariah-gold/30 px-3 py-1 rounded-full font-mono text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-shariah-gold" />
                  {selectedSukuk.structure} Compliant
                </span>
              </div>
            </div>

            {/* Simulated Tabs (Calculator vs Shariah Structure Breakdown) */}
            <div className="flex border-b border-shariah-border/60 mb-6 gap-6">
              <button
                id="btn-tab-calc"
                onClick={() => setActiveTab('calculator')}
                className={`pb-3 font-display text-sm font-medium transition-all relative cursor-pointer ${
                  activeTab === 'calculator' 
                    ? 'text-shariah-green border-b-2 border-shariah-green font-semibold' 
                    : 'text-shariah-slate hover:text-shariah-navy'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" />
                  Profit Calculator
                </span>
              </button>
              <button
                id="btn-tab-struct"
                onClick={() => setActiveTab('structure')}
                className={`pb-3 font-display text-sm font-medium transition-all relative cursor-pointer ${
                  activeTab === 'structure' 
                    ? 'text-shariah-green border-b-2 border-shariah-green font-semibold' 
                    : 'text-shariah-slate hover:text-shariah-navy'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  Asset & Shariah Verification
                </span>
              </button>
            </div>

            {/* Tab Body CONTENT: CALCULATOR */}
            {activeTab === 'calculator' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="amount-slider" className="text-xs font-semibold uppercase tracking-wider text-shariah-navy font-display">
                      Simulation Investment Amount (USD)
                    </label>
                    <span className="font-mono text-lg font-bold text-shariah-green">
                      ${investmentAmount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    id="amount-slider"
                    type="range"
                    min={Math.max(100, selectedSukuk.minInvestment)}
                    max="100000"
                    step="100"
                    value={investmentAmount}
                    onChange={handleAmountSlider}
                    className="w-full h-2 bg-shariah-border rounded-lg appearance-none cursor-pointer accent-shariah-green focus:outline-none"
                  />
                  <div className="flex justify-between text-[11px] text-shariah-slate mt-1 font-mono">
                    <span>Min: ${selectedSukuk.minInvestment}</span>
                    <span>Max: $100,000</span>
                  </div>
                </div>

                {/* Return Output Box */}
                <div className="bg-shariah-cream rounded-2xl p-5 border border-shariah-gold/20 relative overflow-hidden">
                  <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-5">
                    <Coins className="w-32 h-32 text-shariah-gold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] sm:text-xs text-shariah-slate font-mono uppercase tracking-wider block">
                        Estimated Annual Profit
                      </span>
                      <span className="text-xl sm:text-2xl font-bold font-display text-shariah-green mt-1 block">
                        ${calculations.annualProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-[10px] text-shariah-slate mt-1 block font-mono">
                        Net Yield: {calculations.yieldPercentage.toFixed(2)}% p.a.
                      </span>
                    </div>

                    <div className="border-l border-shariah-border/80 pl-4">
                      <span className="text-[10px] sm:text-xs text-shariah-slate font-mono uppercase tracking-wider block">
                        Payout ({calculations.payoutLabel})
                      </span>
                      <span className="text-xl sm:text-2xl font-bold font-display text-shariah-navy mt-1 block">
                        ${calculations.payoutAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-[10px] text-shariah-slate mt-1 block">
                        Physical Rent Split
                      </span>
                    </div>
                  </div>
                </div>

                {/* Partner Integration Flow Details */}
                <div className="bg-slate-55 p-4 rounded-xl border border-shariah-border text-xs text-shariah-slate space-y-2">
                  <span className="font-semibold text-shariah-navy font-display flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    Secure Routing Profile
                  </span>
                  <p className="leading-relaxed">
                    Buying is handled securely by your local partner <strong className="text-shariah-navy font-medium">{localPartner.bank}</strong> ({localPartner.regulator}). Our directory has pre-cleared access so you do not need separate custody registration.
                  </p>
                </div>
              </div>
            )}

            {/* Tab Body CONTENT: SHARIAH STRUCTURE */}
            {activeTab === 'structure' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-shariah-cream p-4 rounded-xl border border-shariah-gold/20">
                  <span className="text-[11px] font-mono font-bold text-shariah-gold uppercase tracking-wider block">
                    Verified Shariah Certifier
                  </span>
                  <p className="font-display font-semibold text-shariah-navy text-sm mt-1">
                    {selectedSukuk.shariahCertifier}
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-shariah-slate font-mono uppercase tracking-wider block">
                      Tangible Underlying Assets
                    </span>
                    <p className="text-sm text-shariah-navy font-medium mt-1">
                      {selectedSukuk.underlyingAsset}
                    </p>
                  </div>

                  <div className="border-t border-shariah-border pt-3">
                    <span className="text-xs text-shariah-slate font-mono uppercase tracking-wider block">
                      Structure Explanation (Standard Fatwa Base)
                    </span>
                    <p className="text-xs text-shariah-slate leading-relaxed mt-1.5">
                      {selectedSukuk.aboutCheck}
                    </p>
                  </div>
                </div>

                {/* Scholar standard note badge */}
                <div className="flex items-center gap-2 bg-emerald-50/75 p-3 rounded-lg text-xs text-shariah-green-medium font-mono border border-emerald-100/50 mt-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Fully audits and complies with modern AAOIFI standards.</span>
                </div>
              </div>
            )}
          </div>

          {/* Core Access CTA */}
          <div className="mt-8 pt-4 border-t border-shariah-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-xs text-shariah-slate">
                <span>Minimum Investment Threshold: </span>
                <span className="font-mono font-bold text-shariah-navy">${selectedSukuk.minInvestment} USD</span>
              </div>
              <button
                id="btn-apply-simulator"
                onClick={() => onApplyClick(selectedSukuk)}
                className="bg-shariah-green hover:bg-shariah-green-medium text-white px-6 py-3 rounded-xl font-display font-semibold text-sm transition-all duration-200 shadow-md shadow-shariah-green/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Initiate Subscription Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
