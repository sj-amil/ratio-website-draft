/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Sukuk {
  id: string;
  name: string;
  issuer: string;
  type: 'Sovereign' | 'Corporate' | 'T-Sukuk' | 'Mutual Fund';
  yield: number; // e.g. 5.75 for 5.75%
  tenure: string; // e.g. "6 Months", "5 Years"
  structure: 'Ijarah' | 'Murabaha' | 'Wakalah' | 'Mudharabah' | 'Hybrid';
  shariahCertifier: string; // e.g. "AAOIFI Shariah Council"
  minInvestment: number; // in USD
  rating: string; // e.g. "AA-"
  frequency: 'Monthly' | 'Quarterly' | 'Semi-Annual' | 'On Maturity';
  aboutCheck: string; // Detailed description of underlying brick-and-mortar or trade assets
  status: 'Available' | 'Secondary Market' | 'Subscription Closed';
  underlyingAsset: string; // e.g., "Leased Infrastructure Portfolio"
  riskLevel: 'Low' | 'Moderate' | 'Conservative';
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Shariah' | 'Liquidity' | 'General' | 'Security';
}
