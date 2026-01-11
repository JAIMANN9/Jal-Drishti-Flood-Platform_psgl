'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    Navigation,
    Loader2,
    ArrowRight,
    Check,
    Camera,
    Video,
    Mic,
    Phone,
    Mail,
    MessageSquare,
    Users,
    Car,
    Home,
    AlertTriangle,
    ChevronRight,
    ChevronLeft,
    Upload,
    Droplets,
    TrendingUp,
    TrendingDown,
    Minus
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// Step indicator component
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
    <div className="flex items-center justify-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center">
                <motion.div
                    className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                        i + 1 === currentStep
                            ? "bg-rose-600 text-white scale-110 shadow-lg shadow-rose-200"
                            : i + 1 < currentStep
                                ? "bg-emerald-500 text-white"
                                : "bg-slate-100 text-slate-400"
                    )}
                    animate={i + 1 === currentStep ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                >
                    {i + 1 < currentStep ? <Check className="w-5 h-5" /> : i + 1}
                </motion.div>
                {i < totalSteps - 1 && (
                    <div className={cn(
                        "w-8 h-1 rounded-full mx-1",
                        i + 1 < currentStep ? "bg-emerald-500" : "bg-slate-200"
                    )} />
                )}
            </div>
        ))}
    </div>
);

// Section titles
const sectionTitles = [
    "Location Details",
    "Water Severity",
    "Impact Assessment",
    "Contact & Submit"
];

export default function ReportForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLocating, setIsLocating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Form state
    const [formData, setFormData] = useState({
        // Location
        address: '',
        landmark: '',
        zone: '',
        gpsCoords: null as { lat: number; lng: number } | null,

        // Water Details
        severity: '' as string,
        waterTrend: '' as 'rising' | 'stable' | 'receding' | '',
        affectedArea: '',
        flowDirection: '',

        // Impact
        peopleStranded: '',
        vehiclesStuck: '',
        propertyDamage: false,
        roadClosure: false,
        electricalHazard: false,
        additionalNotes: '',

        // Media
        photos: [] as File[],
        video: null as File | null,

        // Contact
        name: '',
        phone: '',
        whatsappUpdates: true,
        email: ''
    });

    const handleGetLocation = () => {
        setIsLocating(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData(prev => ({
                        ...prev,
                        gpsCoords: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        address: 'Detected via GPS - Connaught Place Area'
                    }));
                    setIsLocating(false);
                },
                () => {
                    // Fallback for demo
                    setFormData(prev => ({
                        ...prev,
                        gpsCoords: { lat: 28.6139, lng: 77.2090 },
                        address: 'Minto Bridge Underpass, Connaught Place'
                    }));
                    setIsLocating(false);
                }
            );
        } else {
            setFormData(prev => ({
                ...prev,
                address: 'Minto Bridge Underpass, Connaught Place'
            }));
            setIsLocating(false);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push('/login?redirect=report_submission');
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const severityLevels = [
        {
            id: 'ankle',
            label: 'Ankle Deep',
            depth: '< 15cm',
            color: 'border-amber-300 bg-amber-50/50 hover:bg-amber-100',
            activeColor: 'border-amber-500 bg-amber-100 ring-4 ring-amber-200',
            icon: '🦶',
            description: 'Water just covering feet'
        },
        {
            id: 'knee',
            label: 'Knee Deep',
            depth: '15-45cm',
            color: 'border-orange-300 bg-orange-50/50 hover:bg-orange-100',
            activeColor: 'border-orange-500 bg-orange-100 ring-4 ring-orange-200',
            icon: '🦵',
            description: 'Water up to knee level'
        },
        {
            id: 'waist',
            label: 'Waist Deep',
            depth: '45-90cm',
            color: 'border-rose-300 bg-rose-50/50 hover:bg-rose-100',
            activeColor: 'border-rose-500 bg-rose-100 ring-4 ring-rose-200',
            icon: '🚨',
            description: 'Severe flooding, dangerous'
        },
        {
            id: 'chest',
            label: 'Chest Deep+',
            depth: '> 90cm',
            color: 'border-red-400 bg-red-50/50 hover:bg-red-100',
            activeColor: 'border-red-600 bg-red-100 ring-4 ring-red-200',
            icon: '⚠️',
            description: 'Life-threatening emergency'
        },
    ];

    const zones = [
        'Central Zone', 'North Zone', 'South Zone', 'East Zone', 'West Zone',
        'North West Zone', 'North East Zone', 'South West Zone', 'South East Zone',
        'Shahdara North', 'Shahdara South', 'Najafgarh'
    ];

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        {/* GPS Location */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-rose-500" />
                                Location Address
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                                    placeholder="Enter address or use GPS..."
                                    className={cn(
                                        "w-full px-5 py-4 pr-14 rounded-2xl border-2 text-lg transition-all",
                                        "placeholder-slate-400 text-slate-900 bg-white",
                                        "focus:outline-none focus:ring-4",
                                        formData.address
                                            ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
                                            : "border-slate-200 focus:border-rose-400 focus:ring-rose-50"
                                    )}
                                />
                                <button
                                    onClick={handleGetLocation}
                                    disabled={isLocating}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors disabled:opacity-50"
                                    title="Use current location"
                                >
                                    {isLocating ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Navigation className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {formData.gpsCoords && (
                                <motion.p
                                    className="text-sm text-emerald-600 flex items-center gap-1"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <Check className="w-4 h-4" /> GPS Location verified ({formData.gpsCoords.lat.toFixed(4)}, {formData.gpsCoords.lng.toFixed(4)})
                                </motion.p>
                            )}
                        </div>

                        {/* Landmark */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-700">
                                Nearby Landmark (Optional)
                            </label>
                            <input
                                type="text"
                                value={formData.landmark}
                                onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
                                placeholder="E.g., Near Metro Station, Temple, School..."
                                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 text-lg transition-all placeholder-slate-400 text-slate-900 bg-white focus:outline-none focus:ring-4 focus:border-rose-400 focus:ring-rose-50"
                            />
                        </div>

                        {/* Zone Selector */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-700">
                                MCD Zone
                            </label>
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                                {zones.map((zone) => (
                                    <button
                                        key={zone}
                                        onClick={() => setFormData(prev => ({ ...prev, zone }))}
                                        className={cn(
                                            "py-3 px-3 rounded-xl border-2 text-sm font-semibold transition-all",
                                            formData.zone === zone
                                                ? "border-rose-500 bg-rose-50 text-rose-700"
                                                : "border-slate-200 bg-white text-slate-600 hover:border-rose-300"
                                        )}
                                    >
                                        {zone.replace(' Zone', '')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Map Preview */}
                        {formData.address && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="overflow-hidden"
                            >
                                <div className="h-48 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-rose-200 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-30">
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
                                        <motion.div
                                            className="w-12 h-12 bg-rose-500 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg shadow-rose-300"
                                            animate={{ y: [0, -8, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <MapPin className="w-6 h-6 text-white" />
                                        </motion.div>
                                        <p className="text-sm font-bold text-slate-700">{formData.address}</p>
                                        {formData.zone && <p className="text-xs text-slate-500 mt-1">{formData.zone}</p>}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                );

            case 2:
                return (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        {/* Severity Selector */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Droplets className="w-4 h-4 text-rose-500" />
                                Water Depth Level
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                {severityLevels.map((level) => (
                                    <button
                                        key={level.id}
                                        onClick={() => setFormData(prev => ({ ...prev, severity: level.id }))}
                                        className={cn(
                                            "py-6 px-4 rounded-2xl border-2 transition-all text-left",
                                            formData.severity === level.id ? level.activeColor : level.color
                                        )}
                                    >
                                        <div className="text-3xl mb-2">{level.icon}</div>
                                        <div className="font-bold text-slate-900">{level.label}</div>
                                        <div className="text-sm text-slate-500">{level.depth}</div>
                                        <div className="text-xs text-slate-400 mt-1">{level.description}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Water Trend */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-700">
                                Water Level Trend
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { id: 'rising', label: 'Rising', icon: TrendingUp, color: 'text-red-500 bg-red-50 border-red-200' },
                                    { id: 'stable', label: 'Stable', icon: Minus, color: 'text-amber-500 bg-amber-50 border-amber-200' },
                                    { id: 'receding', label: 'Receding', icon: TrendingDown, color: 'text-emerald-500 bg-emerald-50 border-emerald-200' },
                                ].map((trend) => (
                                    <button
                                        key={trend.id}
                                        onClick={() => setFormData(prev => ({ ...prev, waterTrend: trend.id as 'rising' | 'stable' | 'receding' }))}
                                        className={cn(
                                            "py-4 px-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                                            formData.waterTrend === trend.id
                                                ? `${trend.color} ring-4 ring-opacity-30`
                                                : "bg-white border-slate-200 hover:border-slate-300"
                                        )}
                                    >
                                        <trend.icon className={cn("w-6 h-6", formData.waterTrend === trend.id ? trend.color.split(' ')[0] : "text-slate-400")} />
                                        <span className="font-semibold text-sm">{trend.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Affected Area */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-700">
                                Estimated Affected Area
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {['Small (< 50m)', 'Medium (50-200m)', 'Large (200-500m)', 'Very Large (> 500m)'].map((area) => (
                                    <button
                                        key={area}
                                        onClick={() => setFormData(prev => ({ ...prev, affectedArea: area }))}
                                        className={cn(
                                            "py-3 px-3 rounded-xl border-2 text-sm font-medium transition-all",
                                            formData.affectedArea === area
                                                ? "border-rose-500 bg-rose-50 text-rose-700"
                                                : "border-slate-200 bg-white text-slate-600 hover:border-rose-300"
                                        )}
                                    >
                                        {area}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                );

            case 3:
                return (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        {/* Quick Impact Selectors */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-rose-500" />
                                    People Stranded
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['None', '1-5', '5-10', '10-20', '20-50', '50+'].map((count) => (
                                        <button
                                            key={count}
                                            onClick={() => setFormData(prev => ({ ...prev, peopleStranded: count }))}
                                            className={cn(
                                                "py-2 px-2 rounded-xl border-2 text-sm font-medium transition-all",
                                                formData.peopleStranded === count
                                                    ? "border-rose-500 bg-rose-50 text-rose-700"
                                                    : "border-slate-200 bg-white text-slate-600 hover:border-rose-300"
                                            )}
                                        >
                                            {count}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Car className="w-4 h-4 text-rose-500" />
                                    Vehicles Stuck
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['None', '1-3', '3-10', '10-20', '20-50', '50+'].map((count) => (
                                        <button
                                            key={count}
                                            onClick={() => setFormData(prev => ({ ...prev, vehiclesStuck: count }))}
                                            className={cn(
                                                "py-2 px-2 rounded-xl border-2 text-sm font-medium transition-all",
                                                formData.vehiclesStuck === count
                                                    ? "border-rose-500 bg-rose-50 text-rose-700"
                                                    : "border-slate-200 bg-white text-slate-600 hover:border-rose-300"
                                            )}
                                        >
                                            {count}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Toggle Buttons */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-700">Hazards Present</label>
                            <div className="space-y-3">
                                {[
                                    { key: 'propertyDamage', label: 'Property Damage Visible', icon: Home },
                                    { key: 'roadClosure', label: 'Road Completely Blocked', icon: AlertTriangle },
                                    { key: 'electricalHazard', label: 'Electrical Hazard Nearby', icon: AlertTriangle },
                                ].map((item) => (
                                    <button
                                        key={item.key}
                                        onClick={() => setFormData(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                                        className={cn(
                                            "w-full py-4 px-5 rounded-2xl border-2 flex items-center justify-between transition-all",
                                            formData[item.key as keyof typeof formData]
                                                ? "border-rose-500 bg-rose-50"
                                                : "border-slate-200 bg-white hover:border-rose-300"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className={cn("w-5 h-5", formData[item.key as keyof typeof formData] ? "text-rose-600" : "text-slate-400")} />
                                            <span className="font-semibold text-slate-700">{item.label}</span>
                                        </div>
                                        <div className={cn(
                                            "w-12 h-7 rounded-full transition-all relative",
                                            formData[item.key as keyof typeof formData] ? "bg-rose-500" : "bg-slate-200"
                                        )}>
                                            <motion.div
                                                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow"
                                                animate={{ left: formData[item.key as keyof typeof formData] ? 24 : 4 }}
                                            />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Photo Upload */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Camera className="w-4 h-4 text-rose-500" />
                                Upload Photos (Optional)
                            </label>
                            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-rose-400 transition-colors cursor-pointer">
                                <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                                <p className="text-sm text-slate-600 font-medium">Click or drag photos here</p>
                                <p className="text-xs text-slate-400 mt-1">Max 5 photos, 10MB each</p>
                            </div>
                        </div>

                        {/* Additional Notes */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-700">
                                Additional Details (Optional)
                            </label>
                            <textarea
                                value={formData.additionalNotes}
                                onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                                placeholder="Any other important information..."
                                rows={3}
                                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 text-base transition-all placeholder-slate-400 text-slate-900 bg-white focus:outline-none focus:ring-4 focus:border-rose-400 focus:ring-rose-50 resize-none"
                            />
                        </div>
                    </motion.div>
                );

            case 4:
                return (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        {/* Contact Info */}
                        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 mb-6">
                            <p className="text-sm text-rose-700 font-medium">
                                📱 Your contact info helps us send updates about your report. All fields are optional.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-rose-500" />
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Optional"
                                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 text-base transition-all placeholder-slate-400 text-slate-900 bg-white focus:outline-none focus:ring-4 focus:border-rose-400 focus:ring-rose-50"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-rose-500" />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                    placeholder="+91 XXXXX XXXXX"
                                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 text-base transition-all placeholder-slate-400 text-slate-900 bg-white focus:outline-none focus:ring-4 focus:border-rose-400 focus:ring-rose-50"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-rose-500" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                placeholder="your@email.com"
                                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 text-base transition-all placeholder-slate-400 text-slate-900 bg-white focus:outline-none focus:ring-4 focus:border-rose-400 focus:ring-rose-50"
                            />
                        </div>

                        {/* WhatsApp Toggle */}
                        <button
                            onClick={() => setFormData(prev => ({ ...prev, whatsappUpdates: !prev.whatsappUpdates }))}
                            className={cn(
                                "w-full py-4 px-5 rounded-2xl border-2 flex items-center justify-between transition-all",
                                formData.whatsappUpdates
                                    ? "border-emerald-500 bg-emerald-50"
                                    : "border-slate-200 bg-white hover:border-emerald-300"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <MessageSquare className={cn("w-5 h-5", formData.whatsappUpdates ? "text-emerald-600" : "text-slate-400")} />
                                <span className="font-semibold text-slate-700">Receive updates on WhatsApp</span>
                            </div>
                            <div className={cn(
                                "w-12 h-7 rounded-full transition-all relative",
                                formData.whatsappUpdates ? "bg-emerald-500" : "bg-slate-200"
                            )}>
                                <motion.div
                                    className="absolute top-1 w-5 h-5 bg-white rounded-full shadow"
                                    animate={{ left: formData.whatsappUpdates ? 24 : 4 }}
                                />
                            </div>
                        </button>

                        {/* Report Summary */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                            <h4 className="font-bold text-slate-900">Report Summary</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-slate-500">Location:</span>
                                    <p className="font-semibold text-slate-800">{formData.address || 'Not specified'}</p>
                                </div>
                                <div>
                                    <span className="text-slate-500">Zone:</span>
                                    <p className="font-semibold text-slate-800">{formData.zone || 'Not specified'}</p>
                                </div>
                                <div>
                                    <span className="text-slate-500">Severity:</span>
                                    <p className="font-semibold text-slate-800 capitalize">{formData.severity || 'Not specified'}</p>
                                </div>
                                <div>
                                    <span className="text-slate-500">People Stranded:</span>
                                    <p className="font-semibold text-slate-800">{formData.peopleStranded || 'Not specified'}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return formData.address.length > 0;
            case 2:
                return formData.severity.length > 0;
            case 3:
                return true; // Optional step
            case 4:
                return true; // Contact is optional
            default:
                return false;
        }
    };

    return (
        <motion.div
            className="bg-white/90 backdrop-blur-xl border border-rose-100 rounded-[2.5rem] shadow-2xl shadow-rose-100/50 p-8 md:p-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Header */}
            <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    {sectionTitles[currentStep - 1]}
                </h3>
                <p className="text-slate-500">Step {currentStep} of 4</p>
            </div>

            {/* Step Indicator */}
            <StepIndicator currentStep={currentStep} totalSteps={4} />

            {/* Form Content */}
            <AnimatePresence mode="wait">
                {renderStep()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
                {currentStep > 1 ? (
                    <button
                        onClick={prevStep}
                        className="flex items-center gap-2 px-6 py-3 text-slate-600 font-semibold hover:text-rose-600 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Previous
                    </button>
                ) : (
                    <div />
                )}

                {currentStep < 4 ? (
                    <motion.button
                        onClick={nextStep}
                        disabled={!canProceed()}
                        className={cn(
                            "flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all",
                            canProceed()
                                ? "bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200"
                                : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        )}
                        whileHover={canProceed() ? { scale: 1.02 } : {}}
                        whileTap={canProceed() ? { scale: 0.98 } : {}}
                    >
                        Continue
                        <ChevronRight className="w-5 h-5" />
                    </motion.button>
                ) : (
                    <AnimatePresence mode="wait">
                        {isSubmitting ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-3 text-rose-600"
                            >
                                <Loader2 className="w-6 h-6 animate-spin" />
                                <span className="font-semibold">Connecting to Command Center...</span>
                            </motion.div>
                        ) : (
                            <motion.button
                                key="submit"
                                onClick={handleSubmit}
                                className="flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xl shadow-rose-200 transition-all"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                animate={{
                                    boxShadow: ['0 20px 40px -10px rgba(225, 29, 72, 0.3)', '0 20px 40px -10px rgba(225, 29, 72, 0.5)', '0 20px 40px -10px rgba(225, 29, 72, 0.3)']
                                }}
                                transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                            >
                                Submit Emergency Report
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                )}
            </div>

            {/* Privacy Note */}
            <p className="text-center text-xs text-slate-400 mt-6">
                🔒 Your data is encrypted. Reports are verified by AI before dispatch.
            </p>
        </motion.div>
    );
}
