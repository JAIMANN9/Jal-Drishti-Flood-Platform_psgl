'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Loader2, ArrowRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function ReportTeaserForm() {
    const [location, setLocation] = useState('');
    const [severity, setSeverity] = useState<string | null>(null);
    const [isLocating, setIsLocating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleGetLocation = () => {
        setIsLocating(true);
        // Simulate geolocation
        setTimeout(() => {
            setLocation('Minto Bridge Underpass, Connaught Place');
            setIsLocating(false);
        }, 1500);
    };

    const handleSubmit = async () => {
        if (!location || !severity) return;

        setIsSubmitting(true);
        // Simulate connection delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Redirect to login with return URL
        router.push('/login?redirect=report_submission');
    };

    const severityLevels = [
        {
            id: 'ankle',
            label: 'Ankle Deep',
            depth: '< 15cm',
            color: 'border-amber-300 bg-amber-50/50',
            activeColor: 'border-amber-500 bg-amber-100 ring-4 ring-amber-200'
        },
        {
            id: 'knee',
            label: 'Knee Deep',
            depth: '15-45cm',
            color: 'border-orange-300 bg-orange-50/50',
            activeColor: 'border-orange-500 bg-orange-100 ring-4 ring-orange-200'
        },
        {
            id: 'waist',
            label: 'Waist Deep',
            depth: '> 45cm',
            color: 'border-rose-300 bg-rose-50/50',
            activeColor: 'border-rose-500 bg-rose-100 ring-4 ring-rose-200'
        },
    ];

    return (
        <motion.div
            className="bg-white/80 backdrop-blur-xl border border-rose-100 rounded-[2rem] shadow-2xl shadow-rose-100/50 p-8 md:p-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                    Where is the water?
                </h3>
                <p className="text-slate-500">
                    Pinpoint the location and severity. We'll handle the rest.
                </p>
            </div>

            {/* Location Input */}
            <div className="space-y-3 mb-8">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    Precise Location
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter address or landmark..."
                        className={cn(
                            "w-full px-5 py-4 pr-14 rounded-2xl border-2 text-lg transition-all",
                            "placeholder-slate-400 text-slate-900 bg-white",
                            "focus:outline-none focus:ring-4",
                            location
                                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
                                : "border-slate-200 focus:border-rose-400 focus:ring-rose-50"
                        )}
                    />
                    <button
                        onClick={handleGetLocation}
                        disabled={isLocating}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors disabled:opacity-50"
                        title="Use current location"
                    >
                        {isLocating ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Navigation className="w-5 h-5" />
                        )}
                    </button>
                </div>
                {location && (
                    <motion.p
                        className="text-sm text-emerald-600 flex items-center gap-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Check className="w-4 h-4" /> Location verified
                    </motion.p>
                )}
            </div>

            {/* Simulated Map Preview */}
            <AnimatePresence>
                {location && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8 overflow-hidden"
                    >
                        <div className="h-40 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20">
                                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <defs>
                                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-400" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                </svg>
                            </div>
                            <div className="relative z-10 text-center">
                                <div className="w-8 h-8 bg-rose-500 rounded-full mx-auto mb-2 flex items-center justify-center shadow-lg shadow-rose-300 animate-pulse">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-sm font-semibold text-slate-700">{location}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Severity Selector */}
            <div className="space-y-3 mb-10">
                <label className="text-sm font-semibold text-slate-700">
                    Water Severity Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {severityLevels.map((level) => (
                        <button
                            key={level.id}
                            onClick={() => setSeverity(level.id)}
                            className={cn(
                                "py-5 px-3 rounded-2xl border-2 transition-all text-center",
                                severity === level.id ? level.activeColor : level.color
                            )}
                        >
                            <div className="text-2xl mb-1">
                                {level.id === 'ankle' && '🦶'}
                                {level.id === 'knee' && '🦵'}
                                {level.id === 'waist' && '🚨'}
                            </div>
                            <div className="font-bold text-slate-900 text-sm">{level.label}</div>
                            <div className="text-xs text-slate-500">{level.depth}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <AnimatePresence mode="wait">
                {isSubmitting ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-4"
                    >
                        <div className="flex items-center justify-center gap-3 text-rose-600">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span className="font-semibold">Connecting to War Room...</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        key="button"
                        onClick={handleSubmit}
                        disabled={!location || !severity}
                        className={cn(
                            "w-full py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3",
                            location && severity
                                ? "bg-rose-600 hover:bg-rose-700 text-white shadow-xl shadow-rose-200 hover:shadow-rose-300"
                                : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        )}
                        whileHover={location && severity ? { scale: 1.02 } : {}}
                        whileTap={location && severity ? { scale: 0.98 } : {}}
                        animate={location && severity ? {
                            boxShadow: ['0 20px 40px -10px rgba(225, 29, 72, 0.3)', '0 20px 40px -10px rgba(225, 29, 72, 0.5)', '0 20px 40px -10px rgba(225, 29, 72, 0.3)']
                        } : {}}
                        transition={location && severity ? {
                            boxShadow: { duration: 2, repeat: Infinity }
                        } : {}}
                    >
                        Transmit Emergency Report
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Privacy Note */}
            <p className="text-center text-xs text-slate-400 mt-6">
                Your location is encrypted. Reports are verified by AI before dispatch.
            </p>
        </motion.div>
    );
}
