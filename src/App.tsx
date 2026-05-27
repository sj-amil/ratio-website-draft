/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
	ShieldCheck,
	Coins,
	Search,
	Globe2,
	ArrowRight,
	ChevronRight,
	Sparkles,
	Building2,
	Lock,
	AlertCircle,
	TrendingUp,
	Award,
	BookOpen,
	CheckCircle2,
	Bookmark,
	ExternalLink,
	Layers,
	Terminal,
	Clock,
	Briefcase,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import InteractiveSimulator from "./components/InteractiveSimulator";
import CopySpecHub from "./components/CopySpecHub";
import FaqSection from "./components/FaqSection";
import WaitlistForm from "./components/WaitlistForm";
import { curatedSukuk } from "./sukukData";
import { Sukuk } from "./types";

export default function App() {
	const [activeTab, setActiveTab] = useState<"preview" | "docs">("preview");
	const [selectedJurisdiction, setSelectedJurisdiction] =
		useState<string>("GCC_MID");
	const [activeApplyModal, setActiveApplyModal] = useState<Sukuk | null>(null);
	const [simulateKyc, setSimulateKyc] = useState<boolean>(false);
	const [isKycPassed, setIsKycPassed] = useState<boolean>(false);
	const [kycProgress, setKycProgress] = useState<number>(0);

	// Auto-scroll anchor helper
	const scrollToSection = (id: string) => {
		setActiveTab("preview");
		setTimeout(() => {
			const el = document.getElementById(id);
			if (el) {
				el.scrollIntoView({ behavior: "smooth" });
			}
		}, 100);
	};

	// Simulate licensed partner detail based on Jurisdiction
	const partnerConfig = React.useMemo(() => {
		switch (selectedJurisdiction) {
			case "GCC_MID":
				return {
					regionLabel: "Middle East - GCC Hub",
					leadPartner: "Al Rajhi Capital",
					secondaryPartner: "Emirates NBD Securities",
					frameworkCert: "AAOIFI Shariah Governance Standard No. 12",
					regulatoryNote:
						"Fully authorized by Saudi Capital Market Authority (CMA) / UAE DFSA.",
				};
			case "SEA_MAL":
				return {
					regionLabel: "Southeast Asia - Kuala Lumpur Hub",
					leadPartner: "Maybank Shariah Gateway",
					secondaryPartner: "CIMB Islamic Securities",
					frameworkCert: "IFSA Malaysia 2013 Governance Standard",
					regulatoryNote:
						"Registered under Securities Commission Malaysia and Bank Negara Malaysia.",
				};
			case "WEST_EU":
				return {
					regionLabel: "Western Europe - London Gate",
					leadPartner: "Amana Custodian Brokers (UK)",
					secondaryPartner: "Gatehouse Shariah Trust",
					frameworkCert: "UK Shariah Supervisory Oversight Board",
					regulatoryNote:
						"Regulated by the UK Financial Conduct Authority (FCA).",
				};
			default:
				return {
					regionLabel: "Global Custody Node",
					leadPartner: "Standard Chartered Saadiq",
					secondaryPartner: "Sovereign Clearing Corp",
					frameworkCert: "AAOIFI Standards Board Compliance",
					regulatoryNote: "Authorised in respective legal booking centers.",
				};
		}
	}, [selectedJurisdiction]);

	// Handle fake KYC simulation
	const handleStartSimulatedApply = () => {
		setSimulateKyc(true);
		setKycProgress(10);
	};

	useEffect(() => {
		if (simulateKyc && kycProgress < 100) {
			const timer = setTimeout(() => {
				setKycProgress((prev) => {
					const next = prev + 30;
					return next > 100 ? 100 : next;
				});
			}, 500);
			return () => clearTimeout(timer);
		} else if (kycProgress === 100) {
			setIsKycPassed(true);
		}
	}, [simulateKyc, kycProgress]);

	const handleCloseModal = () => {
		setActiveApplyModal(null);
		setSimulateKyc(false);
		setIsKycPassed(false);
		setKycProgress(0);
	};

	return (
		<div
			id="sukuk-app-root"
			className="min-h-screen bg-shariah-cream text-shariah-navy font-sans antialiased selection:bg-shariah-gold/30 selection:text-shariah-navy"
		>
			{/* GLOBAL TOP NAVIGATION RAIL / HEADER */}
			<header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-shariah-border/60">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-20">
						{/* Branding Logo */}
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-xl bg-shariah-green flex items-center justify-center shadow-md shadow-shariah-green/10">
								<Coins className="w-5.5 h-5.5 text-shariah-gold" />
							</div>
							<div>
								<span className="font-display font-bold text-base sm:text-lg tracking-tight text-shariah-navy block">
									Ratio
								</span>
								<span className="text-[10px] font-mono font-medium text-emerald-800 tracking-wider uppercase block -mt-1">
									Sukuk Gateway
								</span>
							</div>
						</div>

						{/* Middle Nav Links */}
						<nav className="hidden lg:flex items-center gap-7">
							<button
								id="nav-link-discover"
								onClick={() => scrollToSection("interactive-simulator")}
								className="text-sm font-medium text-shariah-slate hover:text-shariah-navy transition-colors cursor-pointer"
							>
								Sukuk Explorer
							</button>
							<button
								id="nav-link-how"
								onClick={() => scrollToSection("how-it-works-flow")}
								className="text-sm font-medium text-shariah-slate hover:text-shariah-navy transition-colors cursor-pointer"
							>
								How It Works
							</button>
							<button
								id="nav-link-features"
								onClick={() => scrollToSection("key-features-grid")}
								className="text-sm font-medium text-shariah-slate hover:text-shariah-navy transition-colors cursor-pointer"
							>
								Features
							</button>
							<button
								id="nav-link-compliance"
								onClick={() => scrollToSection("trust-compliance-anchor")}
								className="text-sm font-medium text-shariah-slate hover:text-shariah-navy transition-colors cursor-pointer"
							>
								Trust & Compliance
							</button>
							<button
								id="nav-link-faq"
								onClick={() => scrollToSection("faq-interactive-accordion")}
								className="text-sm font-medium text-shariah-slate hover:text-shariah-navy transition-colors cursor-pointer"
							>
								FAQs
							</button>
						</nav>

						{/* Right Side: Launch Waitlist button */}
						<div className="flex items-center gap-3 sm:gap-4">
							<button
								id="header-btn-waitlist"
								onClick={() => scrollToSection("footer-waitlist-block")}
								className="hidden md:block bg-shariah-green hover:bg-shariah-green-medium text-white px-5 py-2.5 rounded-xl text-xs font-display font-bold hover:text-shariah-gold transition-all cursor-pointer"
							>
								Join Waitlist
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* VIEW PANEL 1: PREVIEW (THE FULL COMPREHENSIVE LANDING PAGE AS DESCRIBED BY USER) */}
			<AnimatePresence mode="wait">
				{activeTab === "preview" && (
					<motion.main
						key="landing-preview"
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -15 }}
						transition={{ duration: 0.3 }}
						className="space-y-24 pb-20"
					>
						{/* 1. HERO SECTION */}
						<section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 bg-gradient-to-b from-white to-shariah-cream/50 shariah-pattern">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								{/* Visual Accent Badge - Shariah Governance Indicator */}
								<div className="flex justify-center mb-6">
									<div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-mono font-bold border border-emerald-100/60 shadow-sm">
										<ShieldCheck className="w-4 h-4 text-emerald-600" />
										<span>Non-Speculative. Tangible Asset Ownership.</span>
									</div>
								</div>

								<div className="text-center max-w-4xl mx-auto space-y-6">
									{/* Headline: Under 8 words constraint ("Ethical Yields. Built on Tangible Assets." = 6 words) */}
									<h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-shariah-navy tracking-tight leading-none">
										Ethical Yields. <br className="hidden sm:inline" />
										<span className="text-shariah-green">
											Built on Tangible Assets.
										</span>
									</h1>

									{/* Subheadline: 1-2 sentences explaining role */}
									<p className="text-base sm:text-lg lg:text-xl text-shariah-slate font-sans max-w-3xl mx-auto leading-relaxed">
										The premium hub to discover, track, and apply for
										high-quality Shariah-certified Sukuk. Diversify into
										sovereign-backed savings and trade short-term Sukuk directly
										through licensed partner banks without conventional interest
										or debt.
									</p>

									{/* CTA Buttons */}
									<div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
										<button
											id="hero-cta-browse"
											onClick={() => scrollToSection("interactive-simulator")}
											className="w-full sm:w-auto bg-shariah-green hover:bg-shariah-green-medium text-white px-8 py-4 rounded-xl font-display font-bold text-sm transition-all shadow-lg shadow-shariah-green/10 flex items-center justify-center gap-2 cursor-pointer"
										>
											<span>Browse Available Sukuk</span>
											<ArrowRight className="w-4 h-4 text-shariah-gold" />
										</button>
										<button
											id="hero-cta-how"
											onClick={() => scrollToSection("how-it-works-flow")}
											className="w-full sm:w-auto bg-white hover:bg-shariah-cream/70 text-shariah-navy border border-shariah-border px-8 py-4 rounded-xl font-display font-semibold text-sm transition-all cursor-pointer"
										>
											See How It Works
										</button>
									</div>

									{/* Trust indicator line & Jurisdiction Selector */}
									<div className="pt-8 border-t border-shariah-border/60 max-w-lg mx-auto flex flex-col items-center gap-3">
										<p className="text-xs text-shariah-slate font-mono font-medium">
											CURATING SECURITY DIRECTORIES ACROSS JURISDICTIONS:
										</p>
										<div className="relative inline-block w-full max-w-xs">
											<select
												id="hero-jurisdiction-select"
												value={selectedJurisdiction}
												onChange={(e) =>
													setSelectedJurisdiction(e.target.value)
												}
												className="w-full bg-white border border-shariah-border rounded-xl px-3 py-2 text-xs font-semibold text-shariah-navy hover:border-shariah-green focus:outline-none focus:ring-1 focus:ring-shariah-green cursor-pointer"
											>
												<option value="GCC_MID">
													GCC / Middle East (Al Rajhi Securities)
												</option>
												<option value="SEA_MAL">
													Southeast Asia / Malaysia (Maybank Gateway)
												</option>
												<option value="WEST_EU">
													Western Europe / UK (Amana FCA-Supervised)
												</option>
											</select>
										</div>
									</div>
								</div>

								{/* THE CORE VISUAL HERO FEATURE - THE LANDING PAGE INTERACTIVE EXPLORER */}
								<div className="mt-16 max-w-5xl mx-auto">
									<div className="text-center mb-6">
										<h2 className="text-xs font-mono font-bold tracking-widest text-shariah-gold uppercase">
											Interactive Simulation Preview
										</h2>
										<p className="text-xs text-shariah-slate mt-1">
											Test-drive our real-time tracking engine and Shariah
											verification tools below:
										</p>
									</div>

									{/* Mounted Simulator Component */}
									<InteractiveSimulator
										selectedJurisdiction={selectedJurisdiction}
										onApplyClick={(sukuk) => setActiveApplyModal(sukuk)}
									/>
								</div>
							</div>
						</section>

						{/* 2. HOW IT WORKS FLOW */}
						<section
							id="how-it-works-flow"
							className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
						>
							<div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
								<span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase bg-[#FDFBF7] px-3.5 py-1 rounded-full border border-[#D4AF37]/20">
									Step-By-Step Onboarding
								</span>
								<h2 className="text-3xl sm:text-4xl font-display font-extrabold text-shariah-navy">
									Strategic Access Framework
								</h2>
								<p className="text-sm sm:text-base text-shariah-slate">
									Connecting ethically-minded retail capital directly with
									global solid-income asset pools securely and fully compliant
									with AAOIFI standards.
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
								{/* Horizontal flow line for large layout */}
								<div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-shariah-border/60 -z-10" />

								{/* Step 1 */}
								<div className="bg-white rounded-2xl p-6 sm:p-8 border border-shariah-border/80 text-center space-y-4 hover:shadow-lg transition-shadow relative">
									<div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-shariah-green font-mono font-bold text-sm">
										01
									</div>
									<div>
										<h3 className="font-display font-bold text-lg text-shariah-navy">
											Discover & Analyze
										</h3>
										<p className="text-xs text-shariah-slate leading-relaxed mt-2 max-w-xs mx-auto">
											Filter global Sukuk listings by yield, tenure, and audited
											Shariah structures with full transparency.
										</p>
									</div>
									<div className="text-[10px] font-mono text-slate-400">
										Suggested Asset: Filter Panel Icon
									</div>
								</div>

								{/* Step 2 */}
								<div className="bg-white rounded-2xl p-6 sm:p-8 border border-shariah-border/80 text-center space-y-4 hover:shadow-lg transition-shadow relative">
									<div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-shariah-green font-mono font-bold text-sm">
										02
									</div>
									<div>
										<h3 className="font-display font-bold text-lg text-shariah-navy">
											Direct Application
										</h3>
										<p className="text-xs text-shariah-slate leading-relaxed mt-2 max-w-xs mx-auto">
											Securely submit regulatory applications directly through
											our integrated licensed partner brokers in seconds.
										</p>
									</div>
									<div className="text-[10px] font-mono text-slate-400">
										Suggested Asset: Secured Form Lock Icon
									</div>
								</div>

								{/* Step 3 */}
								<div className="bg-white rounded-2xl p-6 sm:p-8 border border-shariah-border/80 text-center space-y-4 hover:shadow-lg transition-shadow relative">
									<div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-shariah-green font-mono font-bold text-sm">
										03
									</div>
									<div>
										<h3 className="font-display font-bold text-lg text-shariah-navy">
											Track & Withdraw
										</h3>
										<p className="text-xs text-shariah-slate leading-relaxed mt-2 max-w-xs mx-auto">
											Monitor distributions, claim certificates, and access
											short-term secondary market T-Sukuk liquidity.
										</p>
									</div>
									<div className="text-[10px] font-mono text-slate-400">
										Suggested Asset: Payout Dashboard Icon
									</div>
								</div>
							</div>
						</section>

						{/* 3. KEY FEATURES GRID (BENTO SYSTEM) */}
						<section
							id="key-features-grid"
							className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
						>
							<div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
								<span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
									Diversification Core
								</span>
								<h2 className="text-3xl sm:text-4xl font-display font-extrabold text-shariah-navy">
									Designed for Modern Asset Allocators
								</h2>
								<p className="text-sm sm:text-base text-shariah-slate">
									Say goodbye to complex spreadsheets. We provide a clean,
									mobile-optimized experience with solid-underlying asset
									safety.
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
								{/* Feature 1: Big Card (6 Cols) */}
								<div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-shariah-border/80 flex flex-col justify-between hover:shadow-lg transition-all">
									<div className="space-y-4">
										<div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-[#D4AF37]">
											<Globe2 className="w-5.5 h-5.5 text-shariah-green" />
										</div>
										<div>
											<h3 className="text-lg font-display font-bold text-shariah-navy">
												Global Curated Sukuk Directory
											</h3>
											<p className="text-xs sm:text-sm text-shariah-slate mt-2 leading-relaxed">
												Discover sovereign-backed government savings and green
												corporate lease structures in one place, normalized in
												USD pricing. Instantly review certificates and trust
												metrics.
											</p>
										</div>
									</div>
									<div className="mt-6 pt-4 border-t border-shariah-border/60 flex items-center justify-between text-xs text-shariah-green font-mono">
										<span>Includes Sovereigns and Corpos</span>
										<span className="flex items-center gap-1 font-bold">
											Standardized Indices{" "}
											<ArrowRight className="w-3.5 h-3.5" />
										</span>
									</div>
								</div>

								{/* Feature 2: Small Card (5 Cols) */}
								<div className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-shariah-border/80 flex flex-col justify-between hover:shadow-lg transition-all">
									<div className="space-y-4">
										<div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-shariah-green">
											<Lock className="w-5.5 h-5.5" />
										</div>
										<div>
											<h3 className="text-lg font-display font-bold text-shariah-navy">
												Direct Partner Bank Routing
											</h3>
											<p className="text-xs sm:text-sm text-shariah-slate mt-2 leading-relaxed">
												Submit purchase approvals seamlessly to integrated
												licensed custodians and partner brokers with zero added
												platform markups.
											</p>
										</div>
									</div>
									<div className="mt-6 pt-4 border-t border-shariah-border/60 flex items-center justify-between text-xs text-shariah-slate font-mono">
										<span>Authorized custodian gate</span>
										<span className="font-semibold text-emerald-700">
											Broker Direct
										</span>
									</div>
								</div>

								{/* Feature 3: Small Card (4 Cols) */}
								<div className="md:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-shariah-border/80 flex flex-col justify-between hover:shadow-lg transition-all">
									<div className="space-y-4">
										<div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-shariah-green">
											<TrendingUp className="w-5.5 h-5.5" />
										</div>
										<div>
											<h3 className="text-base font-display font-bold text-shariah-navy">
												Unified Portfolio Tracker
											</h3>
											<p className="text-xs text-shariah-slate mt-1.5 leading-relaxed">
												Consolidate multiple broker statements. Live dashboard
												displays cumulative profit payouts, rental collection
												logs, and audit trails.
											</p>
										</div>
									</div>
									<div className="mt-6 pt-4 border-t border-shariah-border/60 text-[11px] text-shariah-slate font-mono">
										Suggested Asset: Unified Pie Diagram
									</div>
								</div>

								{/* Feature 4: Small Card (4 Cols) */}
								<div className="md:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-shariah-border/80 flex flex-col justify-between hover:shadow-lg transition-all col-span-1">
									<div className="space-y-4">
										<div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-shariah-green">
											<Clock className="w-5.5 h-5.5" />
										</div>
										<div>
											<h3 className="text-base font-display font-bold text-shariah-navy">
												Short-Term T-Sukuk Bills
											</h3>
											<p className="text-xs text-shariah-slate mt-1.5 leading-relaxed">
												Access highly tradable 3-to-12-month treasury bills
												tailored for capital preservation and active exit
												flexibility in volatile markets.
											</p>
										</div>
									</div>
									<div className="mt-6 pt-4 border-t border-shariah-border/60 text-[11px] text-shariah-slate font-mono">
										Suggested Asset: Liquidity Exit Graph
									</div>
								</div>

								{/* Feature 5: Small Card (4 Cols) */}
								<div className="md:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-shariah-border/80 flex flex-col justify-between hover:shadow-lg transition-all col-span-1">
									<div className="space-y-4">
										<div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-[#D4AF37]">
											<Layers className="w-5.5 h-5.5 text-shariah-green animate-pulse" />
										</div>
										<div>
											<h3 className="text-base font-display font-bold text-shariah-navy">
												Diversified Sukuk Fund
											</h3>
											<p className="text-xs text-shariah-slate mt-1.5 leading-relaxed">
												Build passive ethical wealth. Auto-invest starting with
												only $100 in diversified global indices in partnership
												with high-tier managers.
											</p>
										</div>
									</div>
									<div className="mt-6 pt-4 border-t border-shariah-border/60 text-[11px] text-shariah-slate font-mono">
										Suggested Asset: Recurring Auto-Buy Widget
									</div>
								</div>
							</div>
						</section>

						{/* 4. TRUST & COMPLIANCE ANCHOR (THE CRITICAL SOCIAL PROOF LAYER) */}
						<section
							id="trust-compliance-anchor"
							className="bg-shariah-navy text-white py-20 relative overflow-hidden"
						>
							{/* Subtle background overlay patterns */}
							<div className="absolute inset-0 bg-gradient-to-br from-shariah-green/10 via-transparent to-shariah-navy -z-10" />

							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
									{/* Left block: Shariah declaration */}
									<div className="lg:col-span-6 space-y-6">
										<div className="inline-flex items-center gap-1.5 bg-shariah-green text-emerald-300 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-mono">
											<Award className="w-3.5 h-3.5 text-shariah-gold" />
											<span>Shariah Panel Certified Oversight</span>
										</div>
										<h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
											Zero compromise on compliance. <br />
											Complete asset transparency.
										</h2>
										<p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
											Each listed opportunity is thoroughly audited by renowned
											Shariah scholars, complying strictly with standard AAOIFI
											governance benchmarks. There are absolutely no hidden
											high-interest ratios (Riba), excessive speculation
											(Gharar), or funding of impermissible industries.
										</p>

										<div className="space-y-3.5 pt-4">
											<div className="flex items-start gap-3 text-xs">
												<CheckCircle2 className="w-4 h-4 text-shariah-gold flex-shrink-0 mt-0.5" />
												<span className="text-slate-200">
													<strong>Signed Fatwas:</strong> Download complete,
													transparent scholars certificates for every listing.
												</span>
											</div>
											<div className="flex items-start gap-3 text-xs">
												<CheckCircle2 className="w-4 h-4 text-shariah-gold flex-shrink-0 mt-0.5 text-white" />
												<span className="text-slate-200">
													<strong>Zero Custodian Risk:</strong> Capital remains
													entirely untouched by us, secured inside tier-1
													partner banks.
												</span>
											</div>
											<div className="flex items-start gap-3 text-xs">
												<CheckCircle2 className="w-4 h-4 text-shariah-gold flex-shrink-0 mt-0.5" />
												<span className="text-slate-200">
													<strong>Bank-Grade Access Gates:</strong> Multi-layer
													biometric and credential encryption protects your
													identity during partner routing.
												</span>
											</div>
										</div>
									</div>

									{/* Right block: Integrated Partner Custodians & Jurisdiction Certification */}
									<div className="lg:col-span-6 bg-[#162744] p-6 sm:p-8 rounded-3xl border border-slate-700/60 shadow-xl space-y-6">
										<div className="flex justify-between items-center border-b border-slate-700/80 pb-4">
											<div>
												<span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block">
													Current Geo Regulatory Profile
												</span>
												<span className="text-sm font-display font-semibold mt-1 block">
													{partnerConfig.regionLabel}
												</span>
											</div>
											<span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded">
												Active Selection
											</span>
										</div>

										<div className="space-y-4">
											<span className="text-xs text-slate-400 font-mono block">
												INTEGRATED CUSTODY PARTNERS & SECURED CLEARING:
											</span>

											{/* Monochromatic Simulated Partner Logos */}
											<div className="grid grid-cols-2 gap-4">
												<div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
													<span className="text-xs font-display font-bold text-[#D4AF37] block">
														{partnerConfig.leadPartner}
													</span>
													<span className="text-[9px] text-slate-400 font-mono block mt-1">
														Primary Direct Access Partner
													</span>
												</div>
												<div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
													<span className="text-xs font-display font-bold text-slate-300 block">
														{partnerConfig.secondaryPartner}
													</span>
													<span className="text-[9px] text-slate-400 font-mono block mt-1">
														Secondary Market Participant
													</span>
												</div>
											</div>

											<div className="bg-slate-900 p-4 rounded-xl space-y-2 border border-slate-800">
												<div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
													<CheckCircle2 className="w-4 h-4 text-emerald-400" />
													<span>Governance Standards Enforced:</span>
												</div>
												<p className="text-[10px] sm:text-xs text-slate-400 font-mono leading-relaxed">
													{partnerConfig.frameworkCert}.{" "}
													{partnerConfig.regulatoryNote}
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* Regulatory Disclaimer Text */}
								<div className="mt-16 pt-8 border-t border-slate-800 text-center text-[11px] sm:text-xs text-slate-400 max-w-4xl mx-auto space-y-1 leading-relaxed">
									<p className="font-semibold text-slate-300 uppercase tracking-widest text-[10px]">
										Regulatory Legal Disclaimer
									</p>
									<p>
										We are an information and access platform. All transactions,
										custody, and execution are handled exclusively by licensed
										financial partners in your jurisdiction. This website serves
										as an informational comparison and aggregation registry with
										zero asset management advisory discretion. Capital is at
										risk.
									</p>
								</div>
							</div>
						</section>

						{/* 5. WHO IT'S FOR (TARGET AUDIENCES USE CASES) */}
						<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
								<span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase bg-[#FDFBF7] px-3.5 py-1 rounded-full border border-[#D4AF37]/20">
									Visitor Segmentation
								</span>
								<h2 className="text-3xl sm:text-4xl font-display font-extrabold text-shariah-navy">
									Who is the Access Hub designed for?
								</h2>
								<p className="text-sm sm:text-base text-shariah-slate">
									Ensuring custom-built transparency for primary retail focus
									categories.
								</p>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
								{/* Use Case 1 */}
								<div className="bg-white p-6 rounded-2xl border border-shariah-border/80 flex flex-col justify-between hover:border-shariah-green transition-colors">
									<div className="space-y-3">
										<span className="text-xs font-mono font-bold text-shariah-green bg-emerald-50 px-2 py-0.5 rounded">
											01. Beginners
										</span>
										<h3 className="font-display font-bold text-shariah-navy text-sm sm:text-base">
											First-Time Sukuk Investors
										</h3>
										<p className="text-xs text-shariah-slate leading-relaxed">
											Eager for stable yields without standard stock volatility.
											Perfect starting blocks through our automated $100 Mutual
											Fund list.
										</p>
									</div>
									<div className="mt-4 pt-3 border-t border-shariah-border/60 text-[10px] text-slate-400 font-mono italic">
										Placeholder: User Icon
									</div>
								</div>

								{/* Use Case 2 */}
								<div className="bg-white p-6 rounded-2xl border border-shariah-border/80 flex flex-col justify-between hover:border-shariah-green transition-colors">
									<div className="space-y-3">
										<span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
											02. Ethicals
										</span>
										<h3 className="font-display font-bold text-shariah-navy text-sm sm:text-base">
											Ethical Yield Seekers
										</h3>
										<p className="text-xs text-shariah-slate leading-relaxed">
											Prioritizing non-leveraged sustainable ventures that drive
											actual physical world project construction, school, or
											logistics infrastructure.
										</p>
									</div>
									<div className="mt-4 pt-3 border-t border-shariah-border/60 text-[10px] text-slate-400 font-mono italic">
										Placeholder: Leaf Icon
									</div>
								</div>

								{/* Use Case 3 */}
								<div className="bg-white p-6 rounded-2xl border border-shariah-border/80 flex flex-col justify-between hover:border-shariah-green transition-colors">
									<div className="space-y-3">
										<span className="text-xs font-mono font-bold text-[#D4AF37] bg-shariah-gold-light px-2 py-0.5 rounded">
											03. Devouts
										</span>
										<h3 className="font-display font-bold text-shariah-navy text-sm sm:text-base">
											Shariah-Oversight Holders
										</h3>
										<p className="text-xs text-shariah-slate leading-relaxed">
											Devout Muslims wanting absolute, audited proof that no
											conventional financial speculation or ribawi interest
											filters into their portfolios.
										</p>
									</div>
									<div className="mt-4 pt-3 border-t border-shariah-border/60 text-[10px] text-slate-400 font-mono italic">
										Placeholder: Scholar Seals
									</div>
								</div>

								{/* Use Case 4 */}
								<div className="bg-white p-6 rounded-2xl border border-shariah-border/80 flex flex-col justify-between hover:border-shariah-green transition-colors">
									<div className="space-y-3">
										<span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
											04. Diaspora
										</span>
										<h3 className="font-display font-bold text-shariah-navy text-sm sm:text-base">
											Diaspora & Global Allocators
										</h3>
										<p className="text-xs text-shariah-slate leading-relaxed">
											Expats or international clients wanting streamlined access
											to stable high-grade sovereign yields from high-growth
											emerging economies.
										</p>
									</div>
									<div className="mt-4 pt-3 border-t border-shariah-border/60 text-[10px] text-slate-400 font-mono italic">
										Placeholder: Globe Compass
									</div>
								</div>
							</div>
						</section>

						{/* 6. FAQ SECTION accordion */}
						<section className="bg-white py-20 border-t border-b border-shariah-border/60">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								<div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
									<span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
										Platform Clarifications
									</span>
									<h2 className="text-3xl sm:text-4xl font-display font-extrabold text-shariah-navy">
										Frequently Answered Questions
									</h2>
									<p className="text-sm text-shariah-slate">
										Crucial structural queries cleared simply, without complex
										jargon. Keep your knowledge transparent.
									</p>
								</div>

								{/* FAQ Accordion Render */}
								<FaqSection />
							</div>
						</section>

						{/* 7. FINAL CTA + waitlist Form */}
						<section
							id="footer-waitlist-block"
							className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-8"
						>
							<div className="space-y-4">
								<span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest block">
									Private Registration Active
								</span>
								<h2 className="text-3xl sm:text-4xl font-display font-bold text-shariah-navy">
									Secure Your Priority Position
								</h2>
								<p className="text-xs sm:text-sm text-shariah-slate max-w-xl mx-auto leading-relaxed">
									Join 45,000+ ethical wealth builders. Launching officially in
									partnership with primary digital banking portals in Q3 2026.
									Submit your email below to lock your queue priority.
								</p>
							</div>

							{/* Renders Waitlist Form */}
							<WaitlistForm
								idPrefix="cta-section"
								sourceLocation="Main Hero Bottom CTA"
							/>
						</section>

						{/* 8. FOOTER */}
						<footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-shariah-border pt-12 text-xs text-shariah-slate text-center space-y-8">
							{/* Institutional Note */}
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left max-w-4xl mx-auto">
								<div className="space-y-2">
									<h4 className="font-display font-bold text-shariah-navy text-xs uppercase tracking-wider">
										Our Mandate
									</h4>
									<p className="text-[11px] leading-relaxed">
										Connecting retail savers with real-world ethical projects.
										Completely eliminating complex interest speculation.
									</p>
								</div>
								<div className="space-y-2">
									<h4 className="font-display font-bold text-shariah-navy text-xs uppercase tracking-wider">
										Listing Framework
									</h4>
									<ul className="space-y-1 text-[11px] font-mono">
										<li>AAOIFI Compliant</li>
										<li>Sovereign-Issued</li>
										<li>Green Carbon Leases</li>
										<li>Physical Commodities</li>
									</ul>
								</div>
								<div className="space-y-2">
									<h4 className="font-display font-bold text-shariah-navy text-xs uppercase tracking-wider">
										Quick Anchors
									</h4>
									<ul className="space-y-1 text-[11px] font-sans">
										<li>
											<button
												id="foot-anc-sim"
												onClick={() => scrollToSection("interactive-simulator")}
												className="hover:underline cursor-pointer"
											>
												Sukuk Explorer
											</button>
										</li>
										<li>
											<button
												id="foot-anc-faq"
												onClick={() =>
													scrollToSection("faq-interactive-accordion")
												}
												className="hover:underline cursor-pointer"
											>
												Shariah FAQs
											</button>
										</li>
										<li>
											<button
												id="foot-anc-features"
												onClick={() => scrollToSection("key-features-grid")}
												className="hover:underline cursor-pointer"
											>
												Bento Features
											</button>
										</li>
									</ul>
								</div>
								<div className="space-y-2">
									<h4 className="font-display font-bold text-shariah-navy text-xs uppercase tracking-wider">
										Jurisdiction Profile
									</h4>
									<p className="text-[11px] leading-relaxed">
										Currently selected:{" "}
										<span className="font-semibold text-shariah-navy font-mono bg-white px-1.5 py-0.5 rounded border border-shariah-border">
											{partnerConfig.regionLabel}
										</span>
									</p>
								</div>
							</div>

							{/* Technical Disclaimer details */}
							<div className="border-t border-shariah-border/60 pt-8 max-w-4xl mx-auto space-y-4">
								<p className="text-[11px] leading-relaxed max-w-3xl mx-auto">
									Disclaimer: Ratio is an informational directory, index
									aggregator, and secured client-routing tool. We are not a
									licensed deposit taker, securities exchange, or portfolio
									advisor. Investment in security products involves high capital
									risks, liquidity variances, and currency conversion
									fluctuations. Ensure you review all audited scholars fatwas
									and financial risk briefs on partner bank booking portals
									before submitting capital.
								</p>
								<p className="font-mono text-[10px] text-slate-400">
									© 2026 Bismo Technologies Limited
								</p>
							</div>
						</footer>
					</motion.main>
				)}
			</AnimatePresence>

			{/* VIEW PANEL 2: SPECS BOARD (THE COPYWRITER DECK AND TECHNICAL IMPLEMENTATION DETAILS) */}
			<AnimatePresence mode="wait">
				{activeTab === "docs" && (
					<motion.main
						key="specification-docs"
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -15 }}
						transition={{ duration: 0.3 }}
						className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
					>
						{/* High Fidelity Spec Hub component */}
						<CopySpecHub />
					</motion.main>
				)}
			</AnimatePresence>

			{/* INTERACTIVE SUBSCRIPTION PREVIEW MODAL */}
			<AnimatePresence>
				{activeApplyModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
						<motion.div
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border border-shariah-border shadow-2xl flex flex-col justify-between"
						>
							{/* Header */}
							<div className="bg-shariah-navy text-white p-6 sm:p-8 space-y-2 relative">
								<span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">
									Licensed Bank Secure Router
								</span>
								<h3 className="text-xl font-display font-semibold">
									Subscribe via {partnerConfig.leadPartner}
								</h3>
								<p className="text-xs text-slate-300">
									Pre-clearing your purchase suitability with the regional{" "}
									{partnerConfig.leadPartner} registry interface.
								</p>
								<button
									id="btn-close-modal-top"
									onClick={handleCloseModal}
									className="absolute right-6 top-6 text-slate-400 hover:text-white transition-colors cursor-pointer text-base font-semibold"
								>
									✕
								</button>
							</div>

							{/* Main Steps */}
							<div className="p-6 sm:p-8 space-y-6">
								{/* Selected Sukuk specifications */}
								<div className="bg-shariah-cream/50 border border-shariah-border p-4 rounded-xl space-y-2.5">
									<span className="text-[10px] font-mono uppercase text-[#D4AF37] block">
										Selected Security
									</span>
									<div className="flex justify-between items-center">
										<span className="font-display font-semibold text-shariah-navy text-sm sm:text-base">
											{activeApplyModal.name}
										</span>
										<span className="font-mono font-bold text-shariah-green-medium">
											{activeApplyModal.yield}% yield
										</span>
									</div>
									<div className="text-xs text-shariah-slate border-t border-shariah-border pt-2 flex justify-between font-mono">
										<span>Structure: {activeApplyModal.structure} Leasing</span>
										<span>
											Min Threshold: ${activeApplyModal.minInvestment} USD
										</span>
									</div>
								</div>

								{!simulateKyc ? (
									<div className="space-y-4">
										<span className="text-xs text-shariah-slate font-medium block">
											Suitability & Shariah Clearances Required:
										</span>
										<ul className="space-y-2.5 text-xs text-shariah-slate">
											<li className="flex items-start gap-2.5">
												<CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
												<span>
													Confirm your country has authorized{" "}
													{partnerConfig.leadPartner} clearing lines.
												</span>
											</li>
											<li className="flex items-start gap-2.5">
												<CheckCircle2 className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
												<span>
													Accept the automated AAOIFI physical Shariah tenancy
													split rules with zero interest.
												</span>
											</li>
											<li className="flex items-start gap-2.5">
												<CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
												<span>
													Submit instant pre-authorisation suitability profile.
													(No credit checks)
												</span>
											</li>
										</ul>

										<div className="bg-amber-50 rounded-xl p-4 border border-amber-200/50 text-xs text-amber-900 flex items-start gap-2.5">
											<AlertCircle className="w-5 h-5 text-shariah-gold flex-shrink-0 mt-0.5" />
											<p className="leading-relaxed">
												<strong>Security Note:</strong> We are a pure
												information gateway. Clicking continue passes your
												suitability token securely to{" "}
												{partnerConfig.leadPartner} for final booking. No
												capital is deposited on our site.
											</p>
										</div>

										<button
											id="btn-modal-start-kyc"
											onClick={handleStartSimulatedApply}
											className="w-full bg-shariah-green hover:bg-shariah-green-medium text-white px-6 py-3.5 rounded-xl font-display font-semibold text-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
										>
											<span>Authorize Secure Broker Pipeline</span>
											<ArrowRight className="w-4 h-4" />
										</button>
									</div>
								) : (
									<div className="text-center py-6 space-y-4 animate-fadeIn">
										{!isKycPassed ? (
											<div className="space-y-4">
												<div className="relative w-16 h-16 mx-auto">
													<div className="absolute inset-0 rounded-full border-4 border-slate-100" />
													<div className="absolute inset-0 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin" />
												</div>
												<div className="space-y-1">
													<span className="font-mono text-xs text-shariah-slate">
														SECURELY ENCRYPTING ROUTER CREDENTIALS
													</span>
													<span className="text-sm font-semibold text-shariah-navy block">
														Progress: {kycProgress}% Completed
													</span>
												</div>
												<p className="text-xs text-slate-400 max-w-xs mx-auto">
													Passing safe verification parameters directly to the
													licensed custody server database...
												</p>
											</div>
										) : (
											<div className="space-y-4">
												<div className="w-12 h-12 bg-emerald-100 flex items-center justify-center rounded-full text-emerald-600 mx-auto">
													<CheckCircle2 className="w-7 h-7" />
												</div>
												<div className="space-y-1">
													<h4 className="font-display font-bold text-slate-800 text-base">
														Suitability Credentials Pre-Cleared
													</h4>
													<p className="text-xs text-slate-500 max-w-sm mx-auto">
														The security node on {partnerConfig.leadPartner}{" "}
														responded with code{" "}
														<span className="font-mono font-bold bg-slate-100 px-1 rounded">
															200 OK
														</span>
														.
													</p>
												</div>

												<div className="bg-emerald-50 text-emerald-900 p-4 rounded-xl text-left text-xs leading-relaxed space-y-2 border border-emerald-100">
													<span className="font-bold flex items-center gap-1">
														<BookOpen className="w-3.5 h-3.5 text-emerald-700" />
														Pre-Cleared Broker Instructions:
													</span>
													<p>
														To finalize your purchase of {activeApplyModal.name}
														, click the external routing link below to jump
														directly into your secure client portal with{" "}
														{partnerConfig.leadPartner}. The platform token code{" "}
														<span className="font-mono font-bold bg-white px-1.5 py-0.5 border border-emerald-200 rounded">
															SUKUK-PRE-{activeApplyModal.id.toUpperCase()}
														</span>{" "}
														will pre-populate the asset form.
													</p>
												</div>

												<div className="flex flex-col sm:flex-row gap-3">
													<button
														id="btn-modal-exit-portal"
														onClick={() => {
															alert(
																`Redirecting (simulated) to ${partnerConfig.leadPartner} secure broker endpoint with booking code: SUKUK-PRE-${activeApplyModal.id.toUpperCase()}`,
															);
															handleCloseModal();
														}}
														className="w-full bg-shariah-navy hover:bg-slate-800 text-white font-display font-semibold text-xs sm:text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
													>
														<span>Open {partnerConfig.leadPartner} Portal</span>
														<ExternalLink className="w-4 h-4" />
													</button>
													<button
														id="btn-modal-cancel"
														onClick={handleCloseModal}
														className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-600 font-sans font-medium text-xs sm:text-sm py-3 px-6 rounded-xl cursor-pointer"
													>
														Close Preview
													</button>
												</div>
											</div>
										)}
									</div>
								)}
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
}
