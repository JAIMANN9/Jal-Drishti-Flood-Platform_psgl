'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
    Droplets,
    Camera,
    Sparkles,
    Truck,
    Shield,
    Smartphone,
    Cpu,
    MapPin,
    Siren,
    ArrowRight,
    Download,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============ BENTO GRID COMPONENT ============
const BentoCard = ({
    icon: Icon,
    title,
    description,
    className,
    delay = 0
}: {
    icon: React.ElementType;
    title: string;
    description: string;
    className?: string;
    delay?: number;
}) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className={cn(
                "group relative p-8 rounded-3xl bg-white border border-border backdrop-blur-sm shadow-lg",
                "hover:border-accent hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-300",
                className
            )}
        >
            {/* Gradient border on hover */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                    <Icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
                <p className="text-foreground-muted leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
};

// ============ PIPELINE STEP COMPONENT ============
const PipelineStep = ({
    icon: Icon,
    title,
    tech,
    isLast = false,
    delay = 0
}: {
    icon: React.ElementType;
    title: string;
    tech: string;
    isLast?: boolean;
    delay?: number;
}) => {
    const stepRef = useRef(null);
    const isInView = useInView(stepRef, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={stepRef}
            className="flex flex-col items-center relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
        >
            <div className="w-20 h-20 rounded-2xl bg-background-secondary border border-border flex items-center justify-center mb-4 relative z-10">
                <Icon className="w-10 h-10 text-accent" />
            </div>
            <h4 className="text-lg font-bold text-primary mb-1">{title}</h4>
            <p className="text-sm text-accent font-mono">{tech}</p>

            {/* Connector line with animated dot */}
            {!isLast && (
                <div className="hidden md:block absolute top-10 left-[calc(100%)] w-full h-[2px] -translate-y-1/2">
                    <div className="w-full h-full bg-gradient-to-r from-cyan-500/50 to-cyan-500/20" />
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                        animate={{ x: [0, 100, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }}
                    />
                </div>
            )}
        </motion.div>
    );
};

// ============ BEFORE/AFTER SLIDER ============
const BeforeAfterSlider = ({ beforeSrc, afterSrc }: { beforeSrc: string; afterSrc: string }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: React.TouchEvent) => {
        handleMove(e.touches[0].clientX);
    };

    useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging(false);
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden cursor-ew-resize select-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
        >
            {/* After image (full) */}
            <Image
                src={afterSrc}
                alt="After - Predictive Resilience"
                fill
                className="object-cover"
                draggable={false}
            />

            {/* Before image (clipped) */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <Image
                    src={beforeSrc}
                    alt="Before - Reactive Response"
                    fill
                    className="object-cover"
                    draggable={false}
                />
            </div>

            {/* Slider handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] cursor-ew-resize z-10"
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl">
                    <ChevronLeft className="w-5 h-5 text-slate-900 -mr-1" />
                    <ChevronRight className="w-5 h-5 text-slate-900 -ml-1" />
                </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <span className="text-sm font-bold text-rose-600">Before: Reactive</span>
            </div>
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <span className="text-sm font-bold text-emerald-600">After: Predictive</span>
            </div>
        </div>
    );
};

// ============ ANIMATED COUNTER ============
const AnimatedCounter = ({ target, duration = 2 }: { target: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    const [hasFlashed, setHasFlashed] = useState(false);
    const counterRef = useRef(null);
    const isInView = useInView(counterRef, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * target));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setHasFlashed(true);
                setTimeout(() => setHasFlashed(false), 300);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, target, duration]);

    return (
        <span
            ref={counterRef}
            className={cn(
                "transition-colors duration-300",
                hasFlashed ? "text-rose-500" : "text-primary"
            )}
        >
            {count}
        </span>
    );
};

// ============ MAIN PAGE ============
export default function AboutPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroTextSpacing = useTransform(scrollYProgress, [0, 0.5], ["-0.02em", "0.3em"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

    return (
        <main className="bg-background text-foreground overflow-x-hidden">
            {/* ============ SECTION 1: HERO ============ */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background image */}
                <div className="absolute inset-0">
                    <Image
                        src="/hero-monsoon.png"
                        alt="Delhi during monsoon"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-background" />
                </div>

                {/* Content */}
                <motion.div
                    className="relative z-10 text-center px-6 max-w-5xl mx-auto"
                    style={{ opacity: heroOpacity, y: heroY }}
                >
                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8"
                        style={{ letterSpacing: heroTextSpacing }}
                    >
                        The City That Shouldn't Drown.
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Delhi faces <span className="text-cyan-400 font-semibold">611mm</span> of rain.
                        Our drainage handles <span className="text-rose-400 font-semibold">25mm/hr</span>.
                        The math doesn't add up. <span className="text-white font-bold">Until now.</span>
                    </motion.p>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                        <motion.div
                            className="w-1.5 h-3 bg-cyan-400 rounded-full"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* ============ SECTION 2: THE PROBLEM ============ */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Counter */}
                        <div className="text-center lg:text-left">
                            <div className="text-[8rem] md:text-[12rem] font-black leading-none tracking-tighter">
                                <AnimatedCounter target={308} />
                            </div>
                            <p className="text-2xl text-slate-400 font-medium mt-4">
                                Critical Waterlogging Hotspots in 2023
                            </p>
                        </div>

                        {/* Right: Text */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                                The <span className="text-cyan-400">25mm Paradox</span>
                            </h2>
                            <p className="text-lg text-slate-400 leading-relaxed mb-6">
                                Old infrastructure meets new climate. <strong className="text-white">Minto Bridge, Zakhira,
                                    and Ring Road</strong> fall victim to 'Blind Spots'—authorities don't know where
                                the water is until it's too late.
                            </p>
                            <p className="text-lg text-slate-400 leading-relaxed">
                                Delhi's drainage was designed for a different era. Climate change has rewritten
                                the rules, but our response system hasn't caught up. <span className="text-cyan-400">Until Jal-Drishti.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ SECTION 3: BENTO GRID ============ */}
            <section className="py-32 px-6 bg-background-secondary">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            The <span className="text-accent">Jal-Drishti</span> Ecosystem
                        </h2>
                        <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                            Four pillars working in harmony to create a flood-resilient city.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <BentoCard
                            icon={Camera}
                            title="Citizen Scouting"
                            description="Gamified reporting turns 20 million citizens into sensors. Every report earns 'Varsha Points' and builds community resilience."
                            delay={0}
                            className="lg:col-span-2"
                        />
                        <BentoCard
                            icon={Sparkles}
                            title="Predictive AI"
                            description="Forecasting floods 3 hours before they happen using topographical analysis and ML models."
                            delay={0.1}
                        />
                        <BentoCard
                            icon={Truck}
                            title="Rapid Dispatch"
                            description="Uber-style routing for heavy pumps to reach hotspots faster than ever before."
                            delay={0.2}
                        />
                        <BentoCard
                            icon={Shield}
                            title="Community Trust"
                            description="Real-time feedback loops. You report, we resolve, you get notified. Transparency builds trust."
                            delay={0.3}
                            className="lg:col-span-2"
                        />
                    </div>
                </div>
            </section>

            {/* ============ SECTION 4: TECH PIPELINE ============ */}
            <section className="py-32 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            The Tech Pipeline
                        </h2>
                        <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                            From citizen report to MCD dispatch in under 3 minutes.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
                        <PipelineStep
                            icon={Smartphone}
                            title="Input"
                            tech="Next.js Frontend"
                            delay={0}
                        />
                        <PipelineStep
                            icon={Cpu}
                            title="Verify"
                            tech="TensorFlow Lite"
                            delay={0.15}
                        />
                        <PipelineStep
                            icon={MapPin}
                            title="Map"
                            tech="Mapbox GL"
                            delay={0.3}
                        />
                        <PipelineStep
                            icon={Siren}
                            title="Act"
                            tech="WebSocket Alerts"
                            delay={0.45}
                            isLast
                        />
                    </div>

                    {/* Mobile connector line */}
                    <div className="md:hidden mt-8 flex justify-center">
                        <svg className="w-2 h-48" viewBox="0 0 8 192">
                            <path
                                d="M4 0 L4 192"
                                stroke="url(#gradient)"
                                strokeWidth="2"
                                strokeDasharray="8 4"
                                fill="none"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </section>

            {/* ============ SECTION 5: BEFORE/AFTER ============ */}
            <section className="py-32 px-6 bg-background-secondary">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Why It Matters
                        </h2>
                        <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                            Drag the slider to see the transformation from chaos to control.
                        </p>
                    </div>

                    <BeforeAfterSlider
                        beforeSrc="/flood-before.png"
                        afterSrc="/flood-after.png"
                    />
                </div>
            </section>

            {/* ============ SECTION 6: CTA FOOTER ============ */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
                        Don't just watch the rain.<br />
                        <span className="text-accent">Measure it.</span>
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                        <Link
                            href="/login"
                            className="group relative bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-2xl hover:shadow-white/20 flex items-center justify-center gap-3"
                        >
                            Launch Command Center
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/vol-reg"
                            className="group bg-background-secondary text-primary px-8 py-4 rounded-2xl font-bold text-lg border border-border hover:border-accent transition-all flex items-center justify-center gap-3"
                        >
                            <Download className="w-5 h-5" />
                            Download Scout App
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
