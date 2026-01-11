'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Droplets,
    Shovel,
    Hammer,
    MapPin,
    AlertTriangle,
    Check,
    ChevronRight,
    Clock,
    Shield,
    Truck,
    Users,
    CheckCircle,
    Zap,
    Calendar,
    FileText,
    Phone,
    Building,
    Activity,
    Target,
    TrendingUp,
    Sparkles,
    Waves,
    Loader2,
    Info,
    Camera,
    ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import DesiltingForm from './DesiltingForm';

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

// ============ WAVE ANIMATION ============
const WaveAnimation = () => (
    <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
        <svg className="absolute bottom-0 w-[200%] h-24" viewBox="0 0 1440 74" preserveAspectRatio="none">
            <motion.path
                d="M0,32 C320,64 440,0 720,32 C1000,64 1120,0 1440,32 L1440,74 L0,74 Z"
                fill="url(#waveGradient)"
                initial={{ x: 0 }}
                animate={{ x: -720 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(16, 185, 129, 0.15)" />
                    <stop offset="50%" stopColor="rgba(20, 184, 166, 0.2)" />
                    <stop offset="100%" stopColor="rgba(16, 185, 129, 0.15)" />
                </linearGradient>
            </defs>
        </svg>
        <svg className="absolute bottom-0 w-[200%] h-20" viewBox="0 0 1440 74" preserveAspectRatio="none">
            <motion.path
                d="M0,48 C360,16 480,64 720,48 C960,32 1080,64 1440,48 L1440,74 L0,74 Z"
                fill="url(#waveGradient2)"
                initial={{ x: -720 }}
                animate={{ x: 0 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <defs>
                <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(20, 184, 166, 0.1)" />
                    <stop offset="50%" stopColor="rgba(16, 185, 129, 0.15)" />
                    <stop offset="100%" stopColor="rgba(20, 184, 166, 0.1)" />
                </linearGradient>
            </defs>
        </svg>
    </div>
);

// ============ PIPE ANIMATION (SILT CYCLE) ============
const SiltCycleAnimation = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const cleanProgress = useTransform(scrollYProgress, [0.2, 0.6], [0, 100]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const unsubscribe = cleanProgress.on("change", (v) => setProgress(v));
        return () => unsubscribe();
    }, [cleanProgress]);

    return (
        <div ref={containerRef} className="relative py-32">
            {/* Central Pipe */}
            <div className="absolute left-1/2 top-0 bottom-0 w-16 -translate-x-1/2">
                {/* Pipe Background */}
                <div className="absolute inset-0 bg-slate-200 rounded-full" />

                {/* Clean Water Fill */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-400 to-teal-400 rounded-full"
                    style={{ height: `${progress}%` }}
                />

                {/* Debris (fades out as you scroll) */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-1/2 flex flex-col items-center justify-center gap-2 overflow-hidden"
                    style={{ opacity: 1 - progress / 100 }}
                >
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="w-8 h-2 bg-amber-700/60 rounded-full"
                            style={{ transform: `rotate(${i * 15}deg)` }}
                        />
                    ))}
                </motion.div>

                {/* Water Flow Particles */}
                {progress > 50 && (
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white/60 rounded-full left-1/2 -translate-x-1/2"
                                animate={{ y: [0, 200] }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                    ease: "linear"
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-32">
                {/* Left Content - Before */}
                <motion.div
                    className="text-right pr-16"
                    style={{ opacity: 1 - progress / 100 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-200 text-amber-700 rounded-full mb-6">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm font-bold">BLOCKED DRAIN</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">Silt Accumulation</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Years of accumulated debris, plastic waste, and sediment create blockages that prevent water flow during monsoons.
                    </p>
                    <div className="mt-8 space-y-4">
                        <div className="flex items-center justify-end gap-3">
                            <span className="text-slate-500">Flood Risk</span>
                            <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full w-[90%] bg-rose-500 rounded-full" />
                            </div>
                            <span className="font-bold text-rose-600">90%</span>
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <span className="text-slate-500">Water Flow</span>
                            <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full w-[15%] bg-amber-500 rounded-full" />
                            </div>
                            <span className="font-bold text-amber-600">15%</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Content - After */}
                <motion.div
                    className="text-left pl-16"
                    style={{ opacity: progress / 100 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-full mb-6">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-bold">CLEAR DRAIN</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">Free Flowing</h3>
                    <p className="text-slate-600 leading-relaxed">
                        After de-silting, water flows freely at full capacity, protecting your neighborhood from waterlogging even during heavy rainfall.
                    </p>
                    <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-emerald-600">5%</span>
                            <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full w-[5%] bg-emerald-500 rounded-full" />
                            </div>
                            <span className="text-slate-500">Flood Risk</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-emerald-600">100%</span>
                            <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-emerald-500 rounded-full" />
                            </div>
                            <span className="text-slate-500">Water Flow</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Central Message */}
            <motion.div
                className="text-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl shadow-lg shadow-emerald-200">
                    <span className="text-2xl font-bold">One reported blockage saves 50 homes from waterlogging.</span>
                </div>
            </motion.div>
        </div>
    );
};

// ============ ANIMATED SECTION ============
const AnimatedSection = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// ============ STAT CARD ============
const StatCard = ({ icon: Icon, value, label, color }: { icon: React.ElementType; value: string; label: string; color: string }) => (
    <motion.div
        className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ y: -5 }}
    >
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4", color)}>
            <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="text-3xl font-black text-slate-900 mb-1">{value}</div>
        <div className="text-sm text-slate-500 font-semibold">{label}</div>
    </motion.div>
);

// ============ PROCESS STEP ============
const ProcessStep = ({ number, icon: Icon, title, description, delay }: {
    number: string;
    icon: React.ElementType;
    title: string;
    description: string;
    delay: number;
}) => (
    <AnimatedSection delay={delay} className="relative">
        <div className="text-8xl font-black text-emerald-50 absolute -top-8 -left-4 z-0">{number}</div>
        <div className="relative z-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Icon className="w-7 h-7 text-emerald-600" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">{title}</h4>
            <p className="text-slate-600">{description}</p>
        </div>
    </AnimatedSection>
);

// ============ MAIN PAGE ============
export default function DesiltingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-white to-white">
            {/* Fixed Background Gradient */}
            <div className="fixed inset-0 bg-gradient-to-b from-emerald-50/40 via-white to-white -z-10" />

            {/* ============ SECTION 1: HERO ============ */}
            <section className="relative pt-8 pb-32 overflow-hidden">
                {/* Wave Animation */}
                <WaveAnimation />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Back Link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-12 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold">Back to Services</span>
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-full">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-sm font-bold">PREVENTIVE MAINTENANCE</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
                                Clear Drains,<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Safe City.</span>
                            </h1>

                            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
                                Stop the flood <strong className="text-slate-900">before</strong> it starts. Request de-silting for drains in your area and help keep Delhi's drainage network flowing freely.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <a href="#request-form" className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200">
                                    <Shovel className="w-5 h-5" />
                                    Request De-silting
                                </a>
                                <a href="#how-it-works" className="bg-white border-2 border-slate-200 hover:border-emerald-500 text-slate-700 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2">
                                    Learn How It Works <ChevronRight className="w-5 h-5" />
                                </a>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-6">
                                {[
                                    { value: '2,400', suffix: '+', label: 'Drains Cleared (2025)' },
                                    { value: '48', suffix: 'hrs', label: 'Avg. Response Time' },
                                    { value: '95', suffix: '%', label: 'Success Rate' },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-2xl font-black text-emerald-600">{stat.value}<span className="text-lg">{stat.suffix}</span></div>
                                        <div className="text-xs text-slate-500 font-semibold">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Hero Visual - Clean Pipe Illustration */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative">
                                {/* Pipe Illustration */}
                                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-[3rem] p-12 border border-emerald-100">
                                    <svg viewBox="0 0 300 250" className="w-full">
                                        {/* Pipe Structure */}
                                        <rect x="100" y="20" width="100" height="210" rx="20" fill="#e2e8f0" />
                                        <rect x="110" y="30" width="80" height="190" rx="15" fill="#f1f5f9" />

                                        {/* Water Flow Animation */}
                                        <motion.rect
                                            x="115" y="35" width="70" height="180" rx="12"
                                            fill="url(#waterGradient)"
                                            initial={{ y: 180 }}
                                            animate={{ y: 35 }}
                                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                                        />

                                        {/* Water Droplets */}
                                        <motion.circle
                                            cx="150" cy="200"
                                            r="8"
                                            fill="#14b8a6"
                                            animate={{ y: [0, 30, 0], opacity: [1, 0.5, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />

                                        {/* Sparkle Effects */}
                                        <motion.circle
                                            cx="130" cy="100"
                                            r="3"
                                            fill="#10b981"
                                            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <motion.circle
                                            cx="170" cy="140"
                                            r="2"
                                            fill="#14b8a6"
                                            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                        />

                                        <defs>
                                            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#14b8a6" />
                                                <stop offset="100%" stopColor="#10b981" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>

                                {/* Floating Cards */}
                                <motion.div
                                    className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-emerald-100"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                            <Waves className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">Flow Rate</div>
                                            <div className="text-sm text-emerald-600">100% Optimal</div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-emerald-100"
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                                            <Shield className="w-5 h-5 text-teal-600" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">Flood Risk</div>
                                            <div className="text-sm text-teal-600">Minimized</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============ SECTION 2: IMPACT STATS ============ */}
            <section className="py-20 px-6 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">The Impact</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                            Proactive Maintenance <span className="text-emerald-600">Saves Lives</span>
                        </h3>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Regular de-silting prevents 80% of urban flooding. Your report directly impacts your community's safety.
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard icon={Shovel} value="84" label="De-silting Units" color="bg-emerald-500" />
                        <StatCard icon={Truck} value="156" label="Suction Machines" color="bg-teal-500" />
                        <StatCard icon={Users} value="1,200+" label="Field Workers" color="bg-cyan-500" />
                        <StatCard icon={Target} value="308" label="Hotspots Monitored" color="bg-blue-500" />
                    </div>
                </div>
            </section>

            {/* ============ SECTION 3: SILT CYCLE ANIMATION ============ */}
            <section className="py-24 px-6 bg-gradient-to-b from-white to-emerald-50/30">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-8">
                        <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">The Silt Cycle</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                            Watch the <span className="text-emerald-600">Transformation</span>
                        </h3>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Scroll to see how de-silting transforms a clogged drain into a free-flowing channel.
                        </p>
                    </AnimatedSection>

                    <SiltCycleAnimation />
                </div>
            </section>

            {/* ============ SECTION 4: HOW IT WORKS ============ */}
            <section id="how-it-works" className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">The Process</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                            How Your Request <span className="text-emerald-600">Saves Homes</span>
                        </h3>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <ProcessStep
                            number="01"
                            icon={FileText}
                            title="Submit Request"
                            description="Use our form to report a drain needing de-silting. Add location details and photos if available."
                            delay={0}
                        />
                        <ProcessStep
                            number="02"
                            icon={Target}
                            title="Priority Assessment"
                            description="Our system analyzes flood risk data to prioritize your request based on monsoon forecasts."
                            delay={0.1}
                        />
                        <ProcessStep
                            number="03"
                            icon={Truck}
                            title="Team Dispatch"
                            description="The nearest de-silting unit is dispatched with suction machines and manual clearing equipment."
                            delay={0.2}
                        />
                        <ProcessStep
                            number="04"
                            icon={CheckCircle}
                            title="Completion & Update"
                            description="You receive a notification when the work is complete, with before/after photos."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* ============ SECTION 5: BEFORE/AFTER GALLERY ============ */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">Real Results</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                            Before & After <span className="text-emerald-600">De-silting</span>
                        </h3>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { location: 'Minto Bridge Underpass', zone: 'Central', date: 'Dec 2025', before: '95%', after: '5%' },
                            { location: 'Rohini Sector 7', zone: 'North West', date: 'Nov 2025', before: '88%', after: '8%' },
                            { location: 'Dwarka Sector 21', zone: 'South West', date: 'Oct 2025', before: '92%', after: '3%' },
                        ].map((item, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                                        <div className="text-center">
                                            <Camera className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                                            <span className="text-slate-400 text-sm">Before/After Image</span>
                                        </div>
                                        <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            COMPLETED
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                                            <MapPin className="w-4 h-4" />
                                            {item.zone} Zone
                                        </div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-4">{item.location}</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-rose-50 rounded-xl p-3 text-center">
                                                <div className="text-xs text-rose-600 font-semibold mb-1">BEFORE</div>
                                                <div className="text-xl font-black text-rose-600">{item.before}</div>
                                                <div className="text-xs text-slate-500">Blocked</div>
                                            </div>
                                            <div className="bg-emerald-50 rounded-xl p-3 text-center">
                                                <div className="text-xs text-emerald-600 font-semibold mb-1">AFTER</div>
                                                <div className="text-xl font-black text-emerald-600">{item.after}</div>
                                                <div className="text-xs text-slate-500">Blocked</div>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
                                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {item.date}</span>
                                            <span className="flex items-center gap-1 text-emerald-600"><CheckCircle className="w-4 h-4" /> Verified</span>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ SECTION 6: COMMON ISSUES ============ */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">Common Issues</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                            What to <span className="text-emerald-600">Report</span>
                        </h3>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Shovel, title: 'Silt Accumulation', desc: 'Visible mud, sand, or soil buildup in drains', color: 'bg-amber-100 text-amber-600' },
                            { icon: AlertTriangle, title: 'Plastic Waste', desc: 'Plastic bags, bottles blocking water flow', color: 'bg-rose-100 text-rose-600' },
                            { icon: Hammer, title: 'Broken Covers', desc: 'Damaged or missing drain covers', color: 'bg-blue-100 text-blue-600' },
                            { icon: Waves, title: 'Slow Drainage', desc: 'Water taking too long to drain after rain', color: 'bg-cyan-100 text-cyan-600' },
                            { icon: Droplets, title: 'Overflowing Drains', desc: 'Water overflowing onto roads during rain', color: 'bg-emerald-100 text-emerald-600' },
                            { icon: Building, title: 'Structural Damage', desc: 'Cracked or collapsed drain walls', color: 'bg-violet-100 text-violet-600' },
                        ].map((item, i) => (
                            <AnimatedSection key={i} delay={i * 0.05}>
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-emerald-200 transition-all group">
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4", item.color)}>
                                        <item.icon className="w-7 h-7" />
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{item.title}</h4>
                                    <p className="text-slate-600 text-sm">{item.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ SECTION 7: REQUEST FORM ============ */}
            <section id="request-form" className="py-24 px-6 bg-gradient-to-b from-emerald-50/50 to-white">
                <div className="max-w-4xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">Maintenance Portal</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                            Request <span className="text-emerald-600">De-silting</span>
                        </h3>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Our maintenance units use these reports to prioritize high-risk zones. Your input helps protect your community.
                        </p>
                    </AnimatedSection>

                    <DesiltingForm />
                </div>
            </section>

            {/* ============ SECTION 8: EMERGENCY CTA ============ */}
            <section className="py-24 px-6 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        className="text-4xl md:text-5xl font-black mb-8 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        See Active Flooding? <span className="text-emerald-200">Report Now.</span>
                    </motion.h2>
                    <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto">
                        If there's water on the road right now, submit an emergency report instead for immediate dispatch.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/report" className="bg-white text-emerald-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 shadow-xl">
                            <AlertTriangle className="w-5 h-5" />
                            Emergency Report
                        </Link>
                        <Link href="/emg-contact" className="bg-emerald-800 hover:bg-emerald-900 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 border border-emerald-500">
                            <Phone className="w-5 h-5" />
                            Emergency Contacts
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
