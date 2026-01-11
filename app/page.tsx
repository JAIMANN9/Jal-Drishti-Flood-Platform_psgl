'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Droplets,
  AlertTriangle,
  ShieldCheck,
  Users,
  Clock,
  Zap,
  Activity,
  ArrowRight,
  Database,
  Globe,
  CheckCircle,
  TrendingUp,
  Heart,
  FileText,
  Sparkles,
  Shield,
  Truck
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import CinematicIntro from './components/CinematicIntro';

// UI Components
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

// Mock Data
const bentoFeatures = [
  {
    Icon: Database,
    name: "Predictive Analytics",
    description: "AI models predicting waterlogging 30 mins in advance using hyperlocal rainfall data.",
    href: "#",
    cta: "View Models",
    background: <img src="/bento-1.png" className="absolute -right-20 -top-20 opacity-60 object-cover w-full h-full" alt="Analytics" />,
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    Icon: AlertTriangle,
    name: "Citizen Reporting",
    description: "Report incidents in 30 seconds. Geotagged & AI-verified.",
    href: "/report",
    cta: "Report Now",
    background: <img src="/bento-2.png" className="absolute -right-20 -top-20 opacity-60 object-cover w-full h-full" alt="Report" />,
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: Globe,
    name: "3D Digital Twin",
    description: "Real-time simulation of 3,700km drainage network capacity.",
    href: "#",
    cta: "Explore Map",
    background: <img src="/bento-3.png" className="absolute -right-20 -top-20 opacity-60 object-cover w-full h-full" alt="Map" />,
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: Zap,
    name: "IoT Sensor Grid",
    description: "850+ sensors monitoring water depth and flow rates live.",
    href: "#",
    cta: "Live Data",
    background: <img src="/hero-monsoon.png" className="absolute -right-20 -top-20 opacity-60 object-cover w-full h-full" alt="Sensors" />,
    className: "lg:col-span-2 lg:row-span-1",
  },
];

const techFeatures = [
  {
    title: 'Lightning Fast',
    icon: Zap,
    description: 'Real-time data processing with <50ms latency for critical alerts.',
  },
  {
    title: 'AI Powered',
    icon: Sparkles,
    description: 'Neural networks that learn from historical flood patterns.',
  },
  {
    title: 'Secure & Private',
    icon: Shield,
    description: 'End-to-end encryption for all citizen data and reports.',
  },
  {
    title: 'Always On',
    icon: Clock,
    description: '24/7 autonomous monitoring of all 12 MCD zones.',
  },
  {
    title: 'Community Driven',
    icon: Heart,
    description: 'Built for and by the citizens of Delhi.',
  },
  {
    title: 'Open Data',
    icon: FileText,
    description: 'Publicly accessible API for researchers and developers.',
  },
];

const testimonials = [
  {
    text: "Reported a blocked drain in Janakpuri, and the team arrived in 20 minutes! Amazing speed.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Aryan Khanna",
    role: "Resident, West Delhi",
  },
  {
    text: "The flood map saved me from getting stuck at Minto Bridge during the heavy rains yesterday.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Priya Sharma",
    role: "Commuter",
  },
  {
    text: "Finally a system that works. The transparency in ticket resolution is a game changer.",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    name: "Rahul Verma",
    role: "Shop Owner",
  },
  {
    text: "Jal-Drishti's alerts helped us secure our basement inventory before the water rose.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Meera Reddy",
    role: "Business Owner",
  },
  {
    text: "Love earning Varsha Points! It feels good to contribute to the city's safety.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    name: "Vikram Singh",
    role: "Student",
  },
  {
    text: "The 3D map is incredibly detailed. I can see exactly where the water is flowing.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    name: "Ananya Gupta",
    role: "Architect",
  }
];

export default function LandingPage() {
  const [showIntro, setShowIntro] = useState(true);

  // Cinematic Intro Completion Handler
  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('introShown', 'true');
  };

  useEffect(() => {
    // Optional logic to skip intro on revisit
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">

        {/* ============ HERO SECTION ============ */}
        <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-100/40 blur-[120px] rounded-full -z-10" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-50/50 blur-[100px] rounded-full -z-10" />

          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold tracking-widest uppercase bg-white border border-slate-200 text-cyan-700 rounded-full shadow-sm">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  Live Monsoon Monitoring 2026
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">
                  Delhi's Digital Shield <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600">
                    Against Flooding.
                  </span>
                </h1>

                <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                  Jal-Drishti is the National Capital's unified command platform for hydrological resilience, integrating IoT sensors, 3D digital twins, and citizen intelligence.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link
                    href="/login"
                    className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-slate-200 hover:shadow-2xl hover:scale-105"
                  >
                    Access Command Center
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/report"
                    className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 hover:border-cyan-200 transition-all flex items-center justify-center gap-2"
                  >
                    <AlertTriangle className="w-5 h-5 text-rose-500" />
                    Report Waterlogging
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative hidden lg:block"
              >
                {/* Hero Card/Visual would go here if needed, keeping it simpler for now to focus on new components */}
                <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                  <img src="/hero-monsoon.png" alt="Hero" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-10 left-10 text-white">
                    <div className="text-sm font-bold text-cyan-400 mb-2">LIVE FEED</div>
                    <div className="text-3xl font-black">Yamuna Barrage</div>
                    <div className="text-xl text-slate-300">Water Level: Safe</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============ BENTO GRID SECTION (New Component) ============ */}
        <section className="py-32 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-sm font-black text-cyan-600 uppercase tracking-[0.2em] mb-4">Platform Capabilities</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                Complete Command Over <br />
                <span className="text-slate-500">Urban Flood Dynamics.</span>
              </h3>
            </div>

            <BentoGrid>
              {bentoFeatures.map((feature, idx) => (
                <BentoCard key={idx} {...feature} />
              ))}
            </BentoGrid>
          </div>
        </section>

        {/* ============ TECH FEATURES (New Component) ============ */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-sm font-black text-purple-600 uppercase tracking-[0.2em] mb-4">System Architecture</h2>
              <h3 className="text-4xl font-black text-slate-900">
                Built for Scale. <br />
                <span className="text-slate-400">Engineered for Speed.</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {techFeatures.map((feature, i) => (
                <FeatureCard key={i} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* ============ TESTIMONIALS (New Component) ============ */}
        <section className="py-32 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
            <h2 className="text-sm font-black text-rose-600 uppercase tracking-[0.2em] mb-4">Community Impact</h2>
            <h3 className="text-4xl font-black text-slate-900">
              Trusted by Delhi.
            </h3>
          </div>

          <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-6">
              <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={15} />
              <TestimonialsColumn testimonials={testimonials.slice(3, 6)} className="hidden md:block" duration={19} />
              <TestimonialsColumn testimonials={testimonials.slice(0, 3)} className="hidden lg:block" duration={17} />
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-50 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
          </div>
        </section>

        {/* ============ STRATEGIC ROADMAP (Kept from previous) ============ */}
        <section className="py-32 bg-slate-900 text-white relative">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-sm font-black text-cyan-400 uppercase tracking-[0.2em] mb-4">Strategic Roadmap</h2>
                <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                  Building Resilience <br />
                  <span className="text-slate-500">Year by Year.</span>
                </h3>
                <p className="text-lg text-slate-400 leading-relaxed mb-8">
                  The Jal-Drishti Initiative is a multi-year transformation of Delhi's municipal infrastructure. We are currently in Phase 2 of our deployment.
                </p>
                <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-cyan-50 transition-colors">
                  View Full Whitepaper
                </button>
              </motion.div>

              <div className="space-y-12">
                {[
                  { year: "2024", title: "Foundation", desc: "Installation of 500+ IoT sensors in critical zones. Pilot launch of the report app.", status: "completed" },
                  { year: "2025", title: "Integration", desc: "Full AI model deployment. Integration with Delhi Police and Traffic Police databases.", status: "current" },
                  { year: "2026", title: "Automation", desc: "Autonomous pump activation based on water-level triggers. Drone-based surveys.", status: "future" },
                ].map((phase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-6 group"
                  >
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2",
                        phase.status === 'completed' ? "bg-cyan-500 border-cyan-500" :
                          phase.status === 'current' ? "bg-cyan-900 border-cyan-400 animate-pulse" :
                            "bg-transparent border-slate-700"
                      )} />
                      {i !== 2 && <div className="w-0.5 h-full bg-slate-800 mt-2" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-2xl font-black text-cyan-400">{phase.year}</span>
                        {phase.status === 'current' && (
                          <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase rounded-full border border-cyan-500/20">
                            Current One
                          </span>
                        )}
                      </div>
                      <h4 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{phase.title}</h4>
                      <p className="text-slate-400">{phase.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ LIVE DATA TICKER ============ */}
        <div className="fixed bottom-0 w-full bg-slate-900 py-2 z-40 overflow-hidden whitespace-nowrap border-t border-white/10">
          <div className="flex animate-marquee gap-12 items-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-12 items-center">
                <span className="text-cyan-400 font-bold text-[10px] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                  LIVE: MODERATE RAINFALL IN SOUTH ZONE
                </span>
                <span className="text-white font-bold text-[10px]">YAMUNA LEVEL: 204.2M (SAFE)</span>
                <span className="text-emerald-400 font-bold text-[10px]">ZAKHIRA UNDERPASS: PUMPING ACTIVE</span>
                <span className="text-rose-400 font-bold text-[10px]">ALERT: AVOID RING ROAD NEAR ISBT</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </>
  );
}
