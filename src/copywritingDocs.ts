/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SpecSection {
  title: string;
  headline?: string;
  description: string;
  copywriterConcept: string;
  suggestedAssets: string;
  fullCopy: { [key: string]: string | string[] };
}

export const copywritingSpecifications: SpecSection[] = [
  {
    title: "1. Hero Section Specs",
    headline: "Ethical Yields. Built on Tangible Assets.",
    description: "Build immediate authority and trust with high-intent retail investors who normally avoid conventional interest bonds.",
    copywriterConcept: "Special emphasis on Shariah compliance as asset ownership, not speculative debt. Keeping the hero headline benefit-driven and exactly 7 words, well under the 8-word restriction.",
    suggestedAssets: "High-contrast dynamic preview of a retail portfolio dashboard with elegant gold and forest-green yield charts, and structural geometric Islamic arches. Ample padding and off-white background.",
    fullCopy: {
      "Headline": "Ethical Yields. Built on Tangible Assets.",
      "Subheadline": "The global hub to discover, track, and apply for premium Shariah-certified Sukuk. Diversify into sovereign-backed savings and institutional real estate without conventional debt or interest.",
      "Primary CTA": "Browse Available Sukuk",
      "Secondary CTA": "See How It Works",
      "Social Proof Line": "Trusted by over 45,000 ethical investors globally. Launching in partnership with tier-1 digital brokers in Q3 2026."
    }
  },
  {
    title: "2. How It Works (3-Step Flow)",
    description: "Frictionless conversion funnel designed to combat onboarding anxiety.",
    copywriterConcept: "Keep explanations under 15 words per step. Directly addresses the user journey from curiosity to investment execution.",
    suggestedAssets: "Sleek animated visual cards with interactive highlight states and high-quality Lucide indicators (Search, Globe, ShieldCheck).",
    fullCopy: {
      "Step 1: Discover": "Filter global Sukuk listings by yield, tenure, and AAOIFI Shariah structure. (12 words)",
      "Step 2: Apply": "Securely submit applications directly through our integrated partner banks and licensed brokers. (13 words)",
      "Step 3: Track & Manage": "Monitor distributions, claim certificates, and access short-term secondary market T-Sukuk liquidity. (13 words)"
    }
  },
  {
    title: "3. Key Features Grid (5 Cards)",
    description: "Bento-grid feature breakdown designed to show functional richness without cognitive overload.",
    copywriterConcept: "No confusing fiqh terms. Simple, literal, high-utility phrases like 'profit distribution' and 'cost-plus markup' instead of inaccessible terminology.",
    suggestedAssets: "Clean container boxes with micro-animations on hover, subtle fine borders, and warm numeric statistics.",
    fullCopy: {
      "Card 1: Global Sukuk Directory": "Discover sovereign-backed government savings and green corporate lease structures in one place.",
      "Card 2: Direct Partner Access": "Submit purchase approvals seamlessly to licensed custodians and partner brokers with no extra markup.",
      "Card 3: Unified Portfolio Tracker": "Consolidate multiple broker statements. Live dashboard displays cumulative profit payouts and audit trails.",
      "Card 4: Short-Term T-Sukuk Trading": "Access highly tradable 3-to-12-month treasury bills tailored for capital preservation and active exit flexibility.",
      "Card 5: Diversified Sukuk Mutual Fund": "Build passive ethical wealth. Auto-invest starting with only $100 in diversified global indices (optional)."
    }
  },
  {
    title: "4. Trust & Compliance Specs",
    description: "The primary psychological anchor to overcome structural skepticism about online fintech and Shariah compliance.",
    copywriterConcept: "Explicit decoupling of information-brokering and investment custody. Highlights deep transparency and licensing.",
    suggestedAssets: "Secure padlock and regulatory approval checkmark illustrations. Minimal grays and gold accent hues.",
    fullCopy: {
      "Trust Proposition": "Shariah Transparency. Bank-Grade Safeguards.",
      "Bullet 1: Downloadable Scholars Fatwa": "Review comprehensive, public, signed Shariah pronouncements and audit papers for every single listing.",
      "Bullet 2: Zero Custodian Risk": "We never touch your capital. All transactions are securely handled inside licensed tier-1 partner institutions.",
      "Bullet 3: End-To-End Data Security": "We employ AES-256 financial-grade encryption templates to secure your personal application details.",
      "Regulatory Disclaimer": "We are an information and access platform. All transactions, custody, and execution are handled by licensed financial partners in your jurisdiction. Capital at risk."
    }
  },
  {
    title: "5. Target Personas / Who It's For",
    description: "Enables segment-specific validation so diverse user avatars feel instantly recognized.",
    copywriterConcept: "Identifies clear, real-world investor niches without relying on boring finance clichés.",
    suggestedAssets: "Visual checklist cards with deep emerald badges and subtle user icons.",
    fullCopy: {
      "Persona 1: First-Time Sukuk Investors": "People seeking high safety with premium return profiles who are tired of basic yields or complicated stock speculation.",
      "Persona 2: Ethical & Fixed-Income Seekers": "Investors prioritizing real-world, non-speculative sustainable assets that yield clean cash flow.",
      "Persona 3: Shariah-Compliant Wealth Builders": "Devout Muslims looking to optimize their retirement capital using legitimate non-Riba products.",
      "Persona 4: Diaspora & Global Citizens": "International investors looking to quickly move capital into stable sovereign assets in high-yield emerging sectors."
    }
  }
];

export const TechnicalChecklist = {
  seo: [
    { tag: "meta description", value: "Discover and compare premium retail Sukuk and Shariah-compliant short-term savings bills. Track portfolio yields and apply securely through licensed banking partners." },
    { tag: "canonical url", value: "https://yourplatformsDomain.com" },
    { tag: "open graph og:title", value: "Ethical Yields. Built on Tangible Assets | Retail Sukuk Access Platform" },
    { tag: "keywords", value: "Islamic bonds, retail Sukuk lists, T-Sukuk short term, Shariah fixed income, Halal investment tracker, ethical fund, AAOIFI compliant" }
  ],
  analytics: [
    { tracker: "Google Tag Manager", action: "Trigger custom pixel fire on outgoing broker reference clicks (partner outbound conversion tracking)." },
    { tracker: "Conversion Funnel Goals", action: "Track scroll-depth milestones (50%, 90%) and button clicks on the primary directory search queries to gather demand metrics." }
  ],
  regulatory: [
    { check: "Disclaimers", value: "Mandatory placement in footer: The platform is not registered as a broker-dealer or investment advisor. Content is purely educational." },
    { check: "Jurisdiction Gates", value: "IP-based visual warning or soft modal for US/UK/EU retail suitability to comply with regional marketing standards for foreign sovereign issuers." }
  ],
  multicurrency: [
    { feature: "Simulated Cross-Exchange Rates", value: "Real-time or daily cache of SAR, AED, USD, MYR currency pairs. Show values with simple base USD toggle to normalize yields comparison." },
    { feature: "Shariah Purification Calculator", value: "Automated calculation if a minor percentage of non-compliant operational interest is present in a corporate Sukuk asset portfolio." }
  ]
};
