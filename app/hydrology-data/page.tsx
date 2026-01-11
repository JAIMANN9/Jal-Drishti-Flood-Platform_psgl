'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
    Droplets,
    CloudRain,
    Gauge,
    Zap,
    Cloud,
    CloudLightning,
    AlertTriangle,
    Sun,
    Download,
    FileText,
    ArrowRight,
    Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Dynamic import for Recharts (no SSR)
const AreaChart = dynamic(
    () => import('recharts').then(mod => mod.AreaChart),
    { ssr: false }
);
const Area = dynamic(
    () => import('recharts').then(mod => mod.Area),
    { ssr: false }
);
const XAxis = dynamic(
    () => import('recharts').then(mod => mod.XAxis),
    { ssr: false }
);
const YAxis = dynamic(
    () => import('recharts').then(mod => mod.YAxis),
    { ssr: false }
);
const ResponsiveContainer = dynamic(
    () => import('recharts').then(mod => mod.ResponsiveContainer),
    { ssr: false }
);
const ReferenceLine = dynamic(
    () => import('recharts').then(mod => mod.ReferenceLine),
    { ssr: false }
);
const PieChart = dynamic(
    () => import('recharts').then(mod => mod.PieChart),
    { ssr: false }
);
const Pie = dynamic(
    () => import('recharts').then(mod => mod.Pie),
    { ssr: false }
);
const Cell = dynamic(
    () => import('recharts').then(mod => mod.Cell),
    { ssr: false }
);

// ============ COUNT UP COMPONENT ============
const CountUp = ({
    end,
    duration = 2,
    decimals = 0,
    suffix = '',
    prefix = ''
}: {
    end: number;
    duration?: number;
    decimals?: number;
    suffix?: string;
    prefix?: string;
}) => {
    const [count, setCount] = useState(0);
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
            setCount(easeOutQuart * end);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, end, duration]);

    return (
        <span ref={counterRef} className="font-mono">
            {prefix}{count.toFixed(decimals)}{suffix}
        </span>
    );
};

// ============ LIQUID LEVEL BAR ============
const LiquidLevelBar = ({ level, dangerLevel = 85 }: { level: number; dangerLevel?: number }) => {
    const barRef = useRef(null);
    const isInView = useInView(barRef, { once: true });

    return (
        <div ref={barRef} className="relative w-24 h-48 bg-background-secondary rounded-2xl overflow-hidden border border-border">
            {/* Danger line */}
            <div
                className="absolute left-0 right-0 h-0.5 bg-rose-500 z-20"
                style={{ bottom: `${dangerLevel}%` }}
            >
                <span className="absolute -right-2 -top-3 text-[10px] text-rose-400 font-bold">DANGER</span>
            </div>

            {/* Liquid */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-600 to-cyan-400"
                initial={{ height: '0%' }}
                animate={isInView ? { height: `${level}%` } : {}}
                transition={{ duration: 2, ease: 'easeOut' }}
            >
                {/* Wave effect */}
                <div className="absolute top-0 left-0 right-0 h-4 overflow-hidden">
                    <motion.div
                        className="w-[200%] h-full"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
                            backgroundSize: '50% 100%'
                        }}
                        animate={{ x: [0, -100] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
            </motion.div>

            {/* Scale marks */}
            {[25, 50, 75, 100].map(mark => (
                <div
                    key={mark}
                    className="absolute left-2 w-2 h-px bg-slate-600"
                    style={{ bottom: `${mark}%` }}
                />
            ))}
        </div>
    );
};

// ============ RAINFALL INTENSITY DISPLAY ============
const RainfallIntensity = ({ value }: { value: number }) => {
    const getColor = (v: number) => {
        if (v < 20) return 'text-emerald-400';
        if (v < 40) return 'text-amber-400';
        return 'text-rose-400';
    };

    return (
        <div className="text-center">
            <div className={cn("text-6xl font-bold font-mono transition-colors duration-500", getColor(value))}>
                <CountUp end={value} suffix=" mm" />
            </div>
            <p className="text-sm text-slate-400 mt-2">per hour</p>
        </div>
    );
};

// ============ PUMP GRID ============
const PumpGrid = ({ active, total, maintenance }: { active: number; total: number; maintenance: number }) => {
    const gridRef = useRef(null);
    const isInView = useInView(gridRef, { once: true });

    const pumps = Array(36).fill(0).map((_, i) => {
        if (i < maintenance) return 'maintenance';
        if (i < Math.floor((active / total) * 36)) return 'active';
        return 'inactive';
    });

    return (
        <div ref={gridRef} className="grid grid-cols-6 gap-1.5">
            {pumps.map((status, i) => (
                <motion.div
                    key={i}
                    className={cn(
                        "w-4 h-4 rounded-full",
                        status === 'active' && "bg-emerald-400",
                        status === 'maintenance' && "bg-rose-400",
                        status === 'inactive' && "bg-slate-700"
                    )}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: i * 0.02, duration: 0.3 }}
                >
                    {status === 'maintenance' && (
                        <motion.div
                            className="w-full h-full rounded-full bg-rose-400"
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    )}
                </motion.div>
            ))}
        </div>
    );
};

// ============ ZONE MAP SVG ============
const ZoneMap = () => {
    const [hoveredZone, setHoveredZone] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const zones = [
        { id: 'central', name: 'Central', d: 'M180 160 L200 150 L220 160 L220 190 L200 200 L180 190 Z', status: 'safe', complaints: 8, pumps: 6 },
        { id: 'city-sp', name: 'City SP', d: 'M200 200 L220 190 L240 200 L240 230 L220 240 L200 230 Z', status: 'critical', complaints: 24, pumps: 8 },
        { id: 'civil-lines', name: 'Civil Lines', d: 'M160 130 L180 120 L200 130 L200 150 L180 160 L160 150 Z', status: 'safe', complaints: 5, pumps: 4 },
        { id: 'karol-bagh', name: 'Karol Bagh', d: 'M140 160 L160 150 L180 160 L180 190 L160 200 L140 190 Z', status: 'watch', complaints: 15, pumps: 5 },
        { id: 'keshav-puram', name: 'Keshav Puram', d: 'M120 130 L140 120 L160 130 L160 150 L140 160 L120 150 Z', status: 'safe', complaints: 3, pumps: 3 },
        { id: 'najafgarh', name: 'Najafgarh', d: 'M80 200 L120 180 L140 200 L140 250 L120 270 L80 250 Z', status: 'watch', complaints: 18, pumps: 7 },
        { id: 'narela', name: 'Narela', d: 'M160 60 L200 50 L220 70 L210 100 L180 110 L160 90 Z', status: 'safe', complaints: 2, pumps: 2 },
        { id: 'n-shahdara', name: 'N. Shahdara', d: 'M240 130 L270 120 L290 140 L280 170 L250 180 L240 160 Z', status: 'safe', complaints: 6, pumps: 4 },
        { id: 'rohini', name: 'Rohini', d: 'M100 90 L140 70 L160 90 L160 130 L140 140 L100 130 Z', status: 'critical', complaints: 32, pumps: 9 },
        { id: 's-shahdara', name: 'S. Shahdara', d: 'M250 180 L280 170 L300 190 L290 220 L260 230 L250 210 Z', status: 'watch', complaints: 12, pumps: 5 },
        { id: 'south', name: 'South', d: 'M180 250 L220 240 L250 260 L240 300 L200 310 L170 290 Z', status: 'safe', complaints: 7, pumps: 6 },
        { id: 'west', name: 'West', d: 'M100 180 L120 170 L140 180 L140 220 L120 240 L100 220 Z', status: 'safe', complaints: 4, pumps: 3 },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'safe': return { fill: 'rgba(34, 197, 94, 0.3)', stroke: '#22c55e' };
            case 'watch': return { fill: 'rgba(251, 191, 36, 0.3)', stroke: '#fbbf24' };
            case 'critical': return { fill: 'rgba(239, 68, 68, 0.3)', stroke: '#ef4444' };
            default: return { fill: 'rgba(100, 116, 139, 0.3)', stroke: '#64748b' };
        }
    };

    return (
        <div
            className="relative"
            onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
        >
            <svg viewBox="0 0 380 360" className="w-full max-w-xl mx-auto">
                {/* Outer boundary */}
                <path
                    d="M60 100 Q80 40 160 30 Q250 20 300 80 Q340 140 320 220 Q300 300 220 330 Q140 350 80 290 Q40 230 50 160 Q55 120 60 100"
                    fill="none"
                    stroke="rgba(6, 182, 212, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                />

                {/* Zones */}
                {zones.map((zone) => {
                    const colors = getStatusColor(zone.status);
                    return (
                        <motion.path
                            key={zone.id}
                            d={zone.d}
                            fill={colors.fill}
                            stroke={colors.stroke}
                            strokeWidth="2"
                            className="cursor-pointer transition-all duration-200"
                            whileHover={{ scale: 1.03 }}
                            onMouseEnter={() => setHoveredZone(zone.id)}
                            onMouseLeave={() => setHoveredZone(null)}
                        />
                    );
                })}

                {/* Yamuna River */}
                <path
                    d="M280 60 Q300 100 290 150 Q275 200 290 250 Q300 290 280 330"
                    fill="none"
                    stroke="rgba(34, 211, 238, 0.6)"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
            </svg>

            {/* Hover tooltip */}
            {hoveredZone && (
                <motion.div
                    className="fixed z-50 pointer-events-none"
                    style={{ left: mousePos.x + 15, top: mousePos.y + 15 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="bg-white/95 backdrop-blur-xl border border-border rounded-xl p-4 shadow-2xl min-w-[180px]">
                        {(() => {
                            const zone = zones.find(z => z.id === hoveredZone);
                            if (!zone) return null;
                            return (
                                <>
                                    <h4 className="font-bold text-primary mb-2">{zone.name}</h4>
                                    <div className="space-y-1 text-sm">
                                        <p className="text-foreground-muted">Active Complaints: <span className="text-primary font-bold">{zone.complaints}</span></p>
                                        <p className="text-foreground-muted">Pumps Deployed: <span className="text-primary font-bold">{zone.pumps}</span></p>
                                        <p className={cn(
                                            "font-bold text-xs uppercase mt-2",
                                            zone.status === 'safe' && "text-emerald-400",
                                            zone.status === 'watch' && "text-amber-400",
                                            zone.status === 'critical' && "text-rose-400"
                                        )}>
                                            {zone.status}
                                        </p>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

// ============ TIMELINE ITEM ============
const TimelineItem = ({
    icon: Icon,
    time,
    title,
    description,
    isLast = false,
    index
}: {
    icon: React.ElementType;
    time: string;
    title: string;
    description: string;
    isLast?: boolean;
    index: number;
}) => {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={itemRef}
            className="relative pl-12"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.5 }}
        >
            {/* Timeline dot and line */}
            <div className="absolute left-0 top-0 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-cyan-400" />
                </div>
                {!isLast && (
                    <motion.div
                        className="w-0.5 h-24 bg-gradient-to-b from-cyan-500 to-slate-700"
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                        style={{ transformOrigin: 'top' }}
                    />
                )}
            </div>

            {/* Content */}
            <div className="pb-12">
                <span className="text-xs font-bold text-accent uppercase tracking-wider">{time}</span>
                <h4 className="text-xl font-bold text-primary mt-1 mb-2">{title}</h4>
                <p className="text-foreground-muted">{description}</p>
            </div>
        </motion.div>
    );
};

// ============ MAIN PAGE ============
export default function HydrologyPage() {
    const deficitRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: deficitRef,
        offset: ["start end", "end start"]
    });

    const chartStep = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0, 1, 2]);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const unsubscribe = chartStep.on("change", (value) => {
            setCurrentStep(Math.floor(value));
        });
        return () => unsubscribe();
    }, [chartStep]);

    const chartData = [
        { hour: '6AM', actual: 15, limit: 25 },
        { hour: '8AM', actual: 22, limit: 25 },
        { hour: '10AM', actual: 35, limit: 25 },
        { hour: '12PM', actual: 85, limit: 25 },
        { hour: '2PM', actual: 100, limit: 25 },
        { hour: '4PM', actual: 60, limit: 25 },
        { hour: '6PM', actual: 30, limit: 25 },
    ];

    const donutData = [
        { name: 'Used', value: 78, color: '#06b6d4' },
        { name: 'Available', value: 22, color: '#1e293b' },
    ];

    return (
        <main className="bg-background text-foreground min-h-screen">
            {/* ============ SECTION 1: STATUS HEADER ============ */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Breathing gradient background */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)'
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-cyan-500/10 border border-cyan-500/30 rounded-full"
                    >
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-sm font-bold text-cyan-400">LIVE DATA FEED</span>
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Delhi's Water <span className="text-cyan-400">Vital Signs.</span>
                    </motion.h1>

                    <motion.p
                        className="text-xl text-slate-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Real-time telemetry from <span className="text-white font-semibold">12 Zones</span>,
                        <span className="text-white font-semibold"> 84 Drains</span>, and the
                        <span className="text-cyan-400 font-semibold"> Yamuna River</span>.
                    </motion.p>
                </div>

                {/* Live ticker */}
                <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md border-t border-slate-800 py-3 overflow-hidden">
                    <motion.div
                        className="flex gap-12 whitespace-nowrap"
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    >
                        {[1, 2].map((i) => (
                            <div key={i} className="flex gap-12 items-center text-sm font-medium">
                                <span className="flex items-center gap-2">
                                    <span className="text-amber-400">⚠️</span>
                                    <span className="text-white">Yamuna Level: <span className="text-cyan-400 font-mono">205.3m</span> (Rising)</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <CloudRain className="w-4 h-4 text-cyan-400" />
                                    <span className="text-white">Avg Rainfall: <span className="text-cyan-400 font-mono">12mm/hr</span></span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                                    <span className="text-white">Minto Bridge: <span className="text-emerald-400">Pumps Active</span></span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="text-rose-400">🔴</span>
                                    <span className="text-white">Rohini Alert: <span className="text-rose-400">Waterlogging Reported</span></span>
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ============ SECTION 2: BENTO GRID ============ */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Critical Metrics</h2>
                        <p className="text-slate-400">Live monitoring of Delhi's flood infrastructure.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1: Yamuna Level */}
                        <motion.div
                            className="bg-card border border-border rounded-3xl p-6 shadow-lg"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Droplets className="w-5 h-5 text-accent" />
                                <h3 className="font-bold text-primary">Yamuna Water Level</h3>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-4xl font-bold text-primary font-mono">
                                        <CountUp end={205.3} decimals={1} suffix="m" />
                                    </div>
                                    <p className="text-sm text-amber-400 mt-1">⚠️ Rising</p>
                                </div>
                                <LiquidLevelBar level={85} dangerLevel={90} />
                            </div>
                        </motion.div>

                        {/* Card 2: Rainfall */}
                        <motion.div
                            className="bg-card border border-border rounded-3xl p-6 shadow-lg"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <CloudRain className="w-5 h-5 text-accent" />
                                <h3 className="font-bold text-primary">Rainfall Intensity</h3>
                            </div>
                            <RainfallIntensity value={45} />
                        </motion.div>

                        {/* Card 3: Drainage Load */}
                        <motion.div
                            className="bg-card border border-border rounded-3xl p-6 shadow-lg"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Gauge className="w-5 h-5 text-accent" />
                                <h3 className="font-bold text-primary">Drainage Load</h3>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-4xl font-bold text-amber-400 font-mono">
                                        <CountUp end={78} suffix="%" />
                                    </div>
                                    <p className="text-sm text-foreground-muted mt-1">System under heavy load</p>
                                </div>
                                <div className="w-24 h-24">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={donutData}
                                                innerRadius={25}
                                                outerRadius={40}
                                                dataKey="value"
                                                startAngle={90}
                                                endAngle={-270}
                                            >
                                                {donutData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 4: Active Pumps */}
                        <motion.div
                            className="bg-card border border-border rounded-3xl p-6 shadow-lg"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="w-5 h-5 text-accent" />
                                <h3 className="font-bold text-primary">Active Pumps</h3>
                            </div>
                            <div className="mb-4">
                                <span className="text-4xl font-bold text-primary font-mono">
                                    <CountUp end={842} />
                                </span>
                                <span className="text-foreground-muted"> / 900</span>
                            </div>
                            <PumpGrid active={842} total={900} maintenance={3} />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============ SECTION 3: DEFICIT STORY ============ */}
            <section ref={deficitRef} className="py-24 px-6 bg-background-secondary">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Story text */}
                        <div className="space-y-16">
                            <div className={cn("transition-opacity duration-500", currentStep >= 0 ? "opacity-100" : "opacity-30")}>
                                <h3 className="text-2xl font-bold text-primary mb-4">The Design Limit</h3>
                                <p className="text-foreground-muted text-lg">
                                    Delhi's drains were built for <span className="text-cyan-400 font-bold">25mm/hr</span> of rain.
                                    This was adequate for the climate patterns of the 1970s.
                                </p>
                            </div>

                            <div className={cn("transition-opacity duration-500", currentStep >= 1 ? "opacity-100" : "opacity-30")}>
                                <h3 className="text-2xl font-bold text-primary mb-4">The New Reality</h3>
                                <p className="text-foreground-muted text-lg">
                                    But today, we face intense bursts of <span className="text-rose-400 font-bold">100mm/hr</span>.
                                    Climate change has rewritten the rulebook.
                                </p>
                            </div>

                            <div className={cn("transition-opacity duration-500", currentStep >= 2 ? "opacity-100" : "opacity-30")}>
                                <h3 className="text-2xl font-bold text-primary mb-4">The Flood Gap</h3>
                                <p className="text-foreground-muted text-lg">
                                    This <span className="text-amber-400 font-bold">75mm gap</span> is where flooding happens.
                                    Jal-Drishti helps bridge it with predictive intelligence.
                                </p>
                            </div>
                        </div>

                        {/* Right: Chart */}
                        <div className="lg:sticky lg:top-32 bg-card rounded-3xl p-6 border border-border shadow-lg">
                            <h4 className="text-lg font-bold text-primary mb-4">Rainfall vs Drainage Capacity</h4>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                                                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.1} />
                                            </linearGradient>
                                            <linearGradient id="dangerGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.5} />
                                                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="hour" stroke="#64748b" fontSize={12} />
                                        <YAxis stroke="#64748b" fontSize={12} domain={[0, 120]} />
                                        <ReferenceLine y={25} stroke="#fbbf24" strokeDasharray="5 5" label={{ value: 'Capacity: 25mm', fill: '#fbbf24', fontSize: 10 }} />
                                        <Area
                                            type="monotone"
                                            dataKey="actual"
                                            stroke="#06b6d4"
                                            fill="url(#rainGradient)"
                                            strokeWidth={2}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ SECTION 4: ZONE MAP ============ */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Zone Health Matrix</h2>
                        <p className="text-slate-400">Hover over zones to see real-time status.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 items-center">
                        {/* Legend */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-emerald-400" />
                                <span className="text-slate-300">Safe - Normal Operations</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-amber-400" />
                                <span className="text-slate-300">Watch - Elevated Risk</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-rose-400" />
                                <span className="text-slate-300">Critical - Active Response</span>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="lg:col-span-2">
                            <ZoneMap />
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ SECTION 5: TIMELINE ============ */}
            <section className="py-24 px-6 bg-background-secondary">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            The Next 6 Hours <span className="text-cyan-400">(AI Forecast)</span>
                        </h2>
                        <p className="text-slate-400">Predictive intelligence for proactive response.</p>
                    </div>

                    <div className="relative">
                        <TimelineItem
                            icon={Cloud}
                            time="Now"
                            title="Light Rain"
                            description="Drains flowing normally. All systems operational."
                            index={0}
                        />
                        <TimelineItem
                            icon={CloudLightning}
                            time="+2 Hours"
                            title="Heavy Spell Expected"
                            description="North Delhi and Rohini zones on high alert. Pre-positioning pumps."
                            index={1}
                        />
                        <TimelineItem
                            icon={AlertTriangle}
                            time="+4 Hours"
                            title="Warning Level"
                            description="Yamuna level expected to touch warning mark (205.33m)."
                            index={2}
                        />
                        <TimelineItem
                            icon={Sun}
                            time="+6 Hours"
                            title="Recession Expected"
                            description="Water levels expected to normalize. Recovery operations begin."
                            index={3}
                            isLast
                        />
                    </div>
                </div>
            </section>

            {/* ============ SECTION 6: FOOTER ============ */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Access Raw Datasets
                    </h2>
                    <p className="text-slate-400 mb-12 max-w-xl mx-auto">
                        Download historical data for research and analysis. API access available for developers.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all">
                            <Download className="w-5 h-5" />
                            Download CSV (Open311)
                        </button>
                        <button className="group bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold text-lg border border-slate-700 hover:border-cyan-500/50 flex items-center justify-center gap-3 transition-all">
                            <FileText className="w-5 h-5" />
                            API Documentation
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
