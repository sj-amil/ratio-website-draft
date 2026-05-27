/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, Users, Calendar } from 'lucide-react';

interface WaitlistFormProps {
  idPrefix?: string;
  sourceLocation?: string;
}

export default function WaitlistForm({ idPrefix = 'footer', sourceLocation = 'Footer' }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [tier, setTier] = useState('Under $5,000');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waitlistSpot, setWaitlistSpot] = useState(45712);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Look up existing submission or previous counter in LocalStorage
    const saved = localStorage.getItem('shariah_sukuk_waitlist_registered');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.email) {
        setEmail(data.email);
        setTier(data.tier || 'Under $5,000');
        setWaitlistSpot(data.spot || 45712);
        setIsSubmitted(true);
      }
    } else {
      // Simulate simple spot number drift
       const baseSpot = Math.floor(Math.random() * 500) + 45300;
       setWaitlistSpot(baseSpot);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid Shariah-partner email address.');
      return;
    }
    setErrorMsg('');
    const spotNum = waitlistSpot + 1;
    const submission = { email, tier, spot: spotNum, registeredAt: new Date().toISOString(), source: sourceLocation };
    localStorage.setItem('shariah_sukuk_waitlist_registered', JSON.stringify(submission));
    setWaitlistSpot(spotNum);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    localStorage.removeItem('shariah_sukuk_waitlist_registered');
    setEmail('');
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="bg-emerald-50/90 border border-emerald-200 p-6 sm:p-8 rounded-2xl text-center space-y-4 max-w-md mx-auto animate-fadeIn shadow-lg shadow-emerald-700/5">
        <div className="mx-auto w-12 h-12 bg-emerald-100 flex items-center justify-center rounded-full text-emerald-600">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h4 className="font-display font-bold text-slate-900 text-lg">
            Registration Complete
          </h4>
          <p className="text-xs text-slate-600 font-medium">
            We registered <span className="text-slate-900 font-mono font-bold bg-white/60 px-1.5 py-0.5 rounded border border-slate-100">{email}</span>
          </p>
        </div>
        
        <div className="bg-white/80 rounded-xl p-4 border border-emerald-100 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              Priority Placement Spot
            </span>
            <span className="font-mono font-bold text-shariah-green-medium">#{waitlistSpot.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-100 pt-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              Beta Phase Launch
            </span>
            <span className="font-display font-medium text-slate-800">Q3 2026 Priority</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
          *A Shariah audit brief, sample portfolio sheet, and partner broker credentials packet was successfully dispatched to your email. No fees collected.
        </p>

        <button 
          id={`${idPrefix}-wb-reset`} 
          onClick={handleReset} 
          className="text-[10px] text-slate-400 font-mono underline hover:text-slate-600 cursor-pointer block mx-auto"
        >
          Register another email or clear
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl border border-shariah-border shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor={`${idPrefix}-email`} className="block text-[11px] font-mono font-bold uppercase tracking-wider text-shariah-navy mb-1.5">
            Institutional or Retail Security Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-shariah-slate" />
            <input
              id={`${idPrefix}-email`}
              type="email"
              placeholder="name@institution.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              required
              className="w-full bg-shariah-cream/40 border border-shariah-border rounded-xl pl-10 pr-4 py-3 text-sm text-shariah-navy placeholder:text-shariah-slate focus:outline-none focus:border-shariah-green focus:ring-1 focus:ring-shariah-green font-sans"
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-tier`} className="block text-[11px] font-mono font-bold uppercase tracking-wider text-shariah-navy mb-1.5">
            Expected Initial Portfolio Range
          </label>
          <select
            id={`${idPrefix}-tier`}
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="w-full bg-white border border-shariah-border rounded-xl px-3 py-3 text-xs text-shariah-navy focus:outline-none focus:border-shariah-green cursor-pointer"
          >
            <option value="Under $5,000">Under $5,000 USD</option>
            <option value="$5,000 - $25,000">$5,000 - $25,000 USD</option>
            <option value="$25,000 - $100,000">$25,000 - $100,000 USD</option>
            <option value="Over $100,000">Institutional Acc. (Over $100,000 USD)</option>
          </select>
        </div>

        {errorMsg && (
          <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100 font-mono">
            {errorMsg}
          </p>
        )}

        <button
          id={`${idPrefix}-submit-waitlist`}
          type="submit"
          className="w-full bg-shariah-navy hover:bg-shariah-navy-light text-white font-display font-semibold hover:text-shariah-gold text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-md shadow-shariah-navy/10 flex items-center justify-center gap-1.5 cursor-pointer leading-tight uppercase tracking-wider"
        >
          <span>Claim Initial Priority Access</span>
        </button>
      </form>
    </div>
  );
}
