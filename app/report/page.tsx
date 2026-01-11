'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Clock,
  MapPin,
  AlertTriangle,
  Phone,
  Shield,
  Zap,
  Users,
  CheckCircle,
  ArrowDown,
  Droplets,
  Activity,
  TrendingUp,
  Target,
  Radio,
  Truck,
  Heart,
  ArrowRight,
  Timer,
  Send,
  Bell,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ReportForm from './ReportForm';

// ============ ANIMATED COUNTER ============
const AnimatedCounter = ({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ============ IMPACT STEP ============
const ImpactStep = ({
  number,
  icon: Icon,
  title,
  description,
  delay = 0
}: {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="relative pl-16"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Icon Circle */}
      <motion.div
        className={cn(
          "absolute left-0 w-12 h-12 rounded-full border-4 border-white flex items-center justify-center z-10",
          "bg-gradient-to-br from-rose-400 to-rose-600 shadow-xl shadow-rose-300/50"
        )}
        animate={isInView ? {
          scale: [1, 1.2, 1],
          boxShadow: [
            '0 10px 30px -10px rgba(244, 114, 182, 0.5)',
            '0 20px 50px -10px rgba(244, 114, 182, 0.8)',
            '0 10px 30px -10px rgba(244, 114, 182, 0.5)'
          ]
        } : {}}
        transition={{
          scale: { duration: 0.6, delay: delay + 0.3 },
          boxShadow: { duration: 2, delay: delay + 0.3, repeat: Infinity }
        }}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>

      {/* Content */}
      <div className="pb-16">
        <div className="bg-white/60 backdrop-blur-sm border border-rose-100 rounded-2xl p-6 shadow-lg">
          <div className="text-sm font-black text-rose-600 mb-2">{number}</div>
          <h4 className="text-xl font-bold text-slate-900 mb-2">{title}</h4>
          <p className="text-slate-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// ============ BENTO STAT CARD ============
const BentoStatCard = ({
  icon: Icon,
  value,
  label,
  sublabel,
  color,
  className
}: {
  icon: React.ElementType;
  value: string | number;
  label: string;
  sublabel?: string;
  color: string;
  className?: string;
}) => (
  <motion.div
    className={cn(
      "bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow",
      className
    )}
    whileHover={{ scale: 1.02, y: -5 }}
    transition={{ duration: 0.2 }}
  >
    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", color)}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="text-3xl font-black text-slate-900 mb-1">
      {typeof value === 'number' ? <AnimatedCounter end={value} /> : value}
    </div>
    <div className="text-sm font-bold text-slate-600">{label}</div>
    {sublabel && <div className="text-xs text-slate-400 mt-1">{sublabel}</div>}
  </motion.div>
);

// ============ ANIMATED SECTION ============
const AnimatedSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============ MAIN PAGE ============
export default function ReportPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-white">
      {/* ============ HERO SECTION ============ */}
      <motion.section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-rose-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-200/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Urgent Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 mb-8 bg-rose-100 border border-rose-200 text-rose-700 rounded-full"
          >
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
            </span>
            <span className="font-bold">EMERGENCY REPORTING ACTIVE</span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tight">
              <span className="text-rose-600">30 Seconds</span>
              <br />
              <span className="text-4xl md:text-5xl font-bold text-slate-600">to Save Lives.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Your flood report reaches emergency responders in <strong className="text-slate-900">under 30 seconds</strong>. Real-time GPS. Instant dispatch. Zero bureaucracy.
            </p>
          </motion.div>

          {/* Countdown Timer Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <div className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-md border border-slate-200 rounded-3xl px-8 py-6 shadow-xl">
              <div className="text-center">
                <div className="text-5xl font-black text-rose-600">
                  <AnimatedCounter end={30} duration={1.5} />
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Seconds</div>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div className="text-left">
                <div className="text-sm font-bold text-slate-900">Report → Verification → Dispatch</div>
                <div className="text-xs text-slate-500">Faster than any call to 100</div>
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="mt-16"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-8 h-8 text-rose-400 mx-auto" />
            <span className="text-sm text-slate-500 mt-2 block">Scroll to report</span>
          </motion.div>
        </div>
      </motion.section>

      {/* ============ LIVE STATS BENTO GRID ============ */}
      <section className="py-20 px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-sm font-black text-rose-600 uppercase tracking-[0.2em] mb-4">Live Response Status</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900">
              Right Now in Delhi
            </h3>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BentoStatCard
              icon={AlertTriangle}
              value={12}
              label="Active Incidents"
              sublabel="Being addressed now"
              color="bg-rose-500"
            />
            <BentoStatCard
              icon={Truck}
              value={24}
              label="Teams Deployed"
              sublabel="Across 8 zones"
              color="bg-cyan-500"
            />
            <BentoStatCard
              icon={Timer}
              value="8"
              label="Avg. Response (min)"
              sublabel="Today's metric"
              color="bg-emerald-500"
            />
            <BentoStatCard
              icon={Users}
              value={847}
              label="Reports Today"
              sublabel="From citizens like you"
              color="bg-violet-500"
            />
          </div>
        </div>
      </section>

      {/* ============ IMPACT CHAIN SECTION ============ */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-rose-50/30">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-sm font-black text-rose-600 uppercase tracking-[0.2em] mb-4">The Impact Chain</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              What Happens When You Report
            </h3>
            <p className="text-xl text-slate-600">
              Your 30-second report triggers an entire response ecosystem.
            </p>
          </AnimatedSection>

          {/* Vertical Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-300 via-rose-400 to-rose-500" />

            <ImpactStep
              number="00:00"
              icon={Send}
              title="You Submit Report"
              description="GPS coordinates, water depth, and photos are captured instantly. No typing required."
              delay={0}
            />
            <ImpactStep
              number="00:05"
              icon={Zap}
              title="AI Verification"
              description="Our system cross-references with nearby IoT sensors and satellite data to confirm severity."
              delay={0.1}
            />
            <ImpactStep
              number="00:10"
              icon={Bell}
              title="Alert Dispatched"
              description="Zone-specific WhatsApp group notified. Nearest response team gets the ping."
              delay={0.2}
            />
            <ImpactStep
              number="00:20"
              icon={Truck}
              title="Team En Route"
              description="Pump unit or de-silting crew is dispatched. You get a live ETA notification."
              delay={0.3}
            />
            <ImpactStep
              number="00:30"
              icon={CheckCircle}
              title="You're Updated"
              description="Track the response in real-time. Earn Varsha Points for your civic contribution."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* ============ REPORT FORM SECTION ============ */}
      <section id="report-form" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-sm font-black text-rose-600 uppercase tracking-[0.2em] mb-4">Report Now</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Be the <span className="text-rose-600">Eyes</span> of Your City
            </h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Complete the form below to submit your waterlogging report. Help us protect Delhi.
            </p>
          </AnimatedSection>

          <ReportForm />
        </div>
      </section>

      {/* ============ RECENT REPORTS FEED ============ */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">Live Feed</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900">
              Recent Citizen Reports
            </h3>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { location: "Minto Bridge Underpass", zone: "Central", time: "2 min ago", status: "Dispatched", depth: "Knee", color: "bg-amber-500" },
              { location: "Dwarka Sector 21", zone: "South West", time: "5 min ago", status: "Resolved", depth: "Ankle", color: "bg-emerald-500" },
              { location: "Rohini Sector 7", zone: "North West", time: "8 min ago", status: "Verified", depth: "Waist+", color: "bg-rose-500" },
            ].map((report, i) => (
              <AnimatedSection key={i}>
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className={cn("text-xs font-bold text-white px-3 py-1 rounded-full", report.color)}>
                      {report.status}
                    </span>
                    <span className="text-xs text-slate-500">{report.time}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{report.location}</h4>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {report.zone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Droplets className="w-4 h-4" /> {report.depth}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EMERGENCY CONTACTS STRIP ============ */}
      <section className="py-12 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold mb-2">Need Immediate Help?</h4>
              <p className="text-slate-400">For life-threatening emergencies, call these numbers directly.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {[
                { name: "MCD", number: "155305" },
                { name: "Flood Control", number: "011-21210867" },
                { name: "Emergency", number: "112" },
              ].map((contact) => (
                <a
                  key={contact.name}
                  href={`tel:${contact.number}`}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-5 py-3 transition-colors"
                >
                  <Phone className="w-5 h-5 text-rose-400" />
                  <div>
                    <div className="text-xs text-slate-400">{contact.name}</div>
                    <div className="font-bold">{contact.number}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}