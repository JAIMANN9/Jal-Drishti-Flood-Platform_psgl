'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    Shovel,
    Hammer,
    MapPin,
    AlertTriangle,
    Check,
    ChevronRight,
    Loader2,
    Info,
    Camera,
    ArrowRight,
    Clock,
    Shield,
    Building,
    Droplets,
    FileText,
    Phone,
    Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============ ISSUE TYPE CARD ============
const IssueTypeCard = ({
    icon: Icon,
    title,
    description,
    selected,
    onClick,
    color
}: {
    icon: React.ElementType;
    title: string;
    description: string;
    selected: boolean;
    onClick: () => void;
    color: string;
}) => (
    <motion.button
        type="button"
        onClick={onClick}
        className={cn(
            "relative w-full p-6 rounded-2xl border-2 text-left transition-all group",
            selected
                ? "bg-emerald-50 border-emerald-500 shadow-lg shadow-emerald-100"
                : "bg-white border-slate-200 hover:border-emerald-300"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
    >
        {/* Selection Indicator */}
        {selected && (
            <motion.div
                className="absolute top-4 right-4 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
            >
                <Check className="w-4 h-4 text-white" />
            </motion.div>
        )}

        <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors",
            selected ? color : "bg-slate-100"
        )}>
            <Icon className={cn("w-7 h-7 transition-colors", selected ? "text-white" : "text-slate-500")} />
        </div>
        <h4 className={cn(
            "text-lg font-bold mb-2 transition-colors",
            selected ? "text-emerald-700" : "text-slate-900"
        )}>
            {title}
        </h4>
        <p className="text-sm text-slate-500">{description}</p>
    </motion.button>
);

// ============ PRIORITY SEGMENT ============
const PrioritySegment = ({
    value,
    onChange
}: {
    value: 'normal' | 'high';
    onChange: (v: 'normal' | 'high') => void;
}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                Priority Level
                <div className="relative">
                    <button
                        type="button"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        <Info className="w-4 h-4" />
                    </button>
                    <AnimatePresence>
                        {showTooltip && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-900 text-white text-xs p-3 rounded-lg shadow-xl z-50"
                            >
                                <strong>High Priority:</strong> Use only if water flow is 100% blocked and flooding is imminent.
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </label>
            <div className="flex bg-slate-100 rounded-xl p-1">
                <button
                    type="button"
                    onClick={() => onChange('normal')}
                    className={cn(
                        "flex-1 py-3 px-6 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2",
                        value === 'normal'
                            ? "bg-white text-slate-900 shadow-md"
                            : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    <Clock className="w-4 h-4" />
                    Normal
                </button>
                <button
                    type="button"
                    onClick={() => onChange('high')}
                    className={cn(
                        "flex-1 py-3 px-6 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2",
                        value === 'high'
                            ? "bg-amber-500 text-white shadow-md"
                            : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    <Zap className="w-4 h-4" />
                    High Priority
                </button>
            </div>
        </div>
    );
};

// ============ ZONE SELECTOR ============
const ZoneSelector = ({
    value,
    onChange
}: {
    value: string;
    onChange: (v: string) => void;
}) => {
    const zones = [
        'Central', 'North', 'South', 'East', 'West', 'New Delhi',
        'North West', 'South West', 'North East', 'South East', 'Shahdara', 'Karol Bagh'
    ];

    return (
        <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">MCD Zone *</label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {zones.map(zone => (
                    <button
                        key={zone}
                        type="button"
                        onClick={() => onChange(zone)}
                        className={cn(
                            "py-2 px-3 rounded-lg font-medium text-sm transition-all border",
                            value === zone
                                ? "bg-emerald-500 border-emerald-500 text-white shadow-md"
                                : "bg-white border-slate-200 text-slate-600 hover:border-emerald-300"
                        )}
                    >
                        {zone}
                    </button>
                ))}
            </div>
        </div>
    );
};

// ============ MAIN FORM ============
export default function DesiltingForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        issueType: '' as '' | 'drainage' | 'structural',
        zone: '',
        location: '',
        landmark: '',
        priority: 'normal' as 'normal' | 'high',
        description: '',
        hasPhoto: false
    });

    const handleSubmit = async () => {
        if (!formData.issueType || !formData.zone || !formData.location) {
            return;
        }

        setIsSubmitting(true);

        // Simulate "Checking Ward Jurisdiction..."
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show toast would go here in a real app
        // For now, redirect to login
        router.push('/login?redirect=desilting_submission');
    };

    const isFormValid = formData.issueType && formData.zone && formData.location;

    return (
        <motion.div
            className="bg-white/90 backdrop-blur-xl border border-emerald-100 rounded-3xl p-8 md:p-12 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="space-y-8">
                {/* Issue Type Selection */}
                <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700">Issue Type *</label>
                    <div className="grid md:grid-cols-2 gap-4">
                        <IssueTypeCard
                            icon={Shovel}
                            title="Drainage Clearing"
                            description="Mechanical & manual silt removal, debris extraction, and drain unclogging."
                            selected={formData.issueType === 'drainage'}
                            onClick={() => setFormData(prev => ({ ...prev, issueType: 'drainage' }))}
                            color="bg-emerald-500"
                        />
                        <IssueTypeCard
                            icon={Hammer}
                            title="Structural Repair"
                            description="Fixing broken lids, damaged culverts, cracked walls, or collapsed sections."
                            selected={formData.issueType === 'structural'}
                            onClick={() => setFormData(prev => ({ ...prev, issueType: 'structural' }))}
                            color="bg-blue-500"
                        />
                    </div>
                </div>

                {/* Zone Selection */}
                <ZoneSelector
                    value={formData.zone}
                    onChange={(zone) => setFormData(prev => ({ ...prev, zone }))}
                />

                {/* Location Input */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Area Location *</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                            placeholder="e.g., Sector 14 Main Drain Junction, Near Metro Station"
                            className={cn(
                                "w-full bg-slate-50 border-2 rounded-xl pl-12 pr-4 py-4 text-slate-900 placeholder-slate-400 focus:outline-none transition-all",
                                formData.location ? "border-emerald-500" : "border-slate-200 focus:border-emerald-500"
                            )}
                        />
                    </div>
                </div>

                {/* Landmark */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Nearby Landmark (Optional)</label>
                    <div className="relative">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={formData.landmark}
                            onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
                            placeholder="e.g., Opposite City Hospital, Near SBI Bank"
                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl pl-12 pr-4 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all"
                        />
                    </div>
                </div>

                {/* Priority Toggle */}
                <PrioritySegment
                    value={formData.priority}
                    onChange={(priority) => setFormData(prev => ({ ...prev, priority }))}
                />

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Additional Details</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the issue: Visual depth of silt, presence of plastic waste, water stagnation level, etc."
                        rows={4}
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all resize-none"
                    />
                </div>

                {/* Photo Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Photo Evidence (Optional)</label>
                    <div
                        className={cn(
                            "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
                            formData.hasPhoto
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-slate-300 bg-slate-50 hover:border-emerald-400"
                        )}
                        onClick={() => setFormData(prev => ({ ...prev, hasPhoto: !prev.hasPhoto }))}
                    >
                        {formData.hasPhoto ? (
                            <div className="flex items-center justify-center gap-3">
                                <Check className="w-8 h-8 text-emerald-500" />
                                <span className="text-emerald-700 font-semibold">Photo attached</span>
                            </div>
                        ) : (
                            <>
                                <Camera className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                                <p className="text-slate-500 font-medium">Click to upload a photo</p>
                                <p className="text-slate-400 text-sm mt-1">PNG, JPG up to 10MB</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Summary Card (when form is filled) */}
                <AnimatePresence>
                    {isFormValid && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6"
                        >
                            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-emerald-600" />
                                Request Summary
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-slate-500">Issue Type:</span>
                                    <span className="ml-2 font-semibold text-slate-900">
                                        {formData.issueType === 'drainage' ? 'Drainage Clearing' : 'Structural Repair'}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-500">Zone:</span>
                                    <span className="ml-2 font-semibold text-slate-900">{formData.zone}</span>
                                </div>
                                <div className="md:col-span-2">
                                    <span className="text-slate-500">Location:</span>
                                    <span className="ml-2 font-semibold text-slate-900">{formData.location}</span>
                                </div>
                                <div>
                                    <span className="text-slate-500">Priority:</span>
                                    <span className={cn(
                                        "ml-2 font-semibold",
                                        formData.priority === 'high' ? "text-amber-600" : "text-emerald-600"
                                    )}>
                                        {formData.priority === 'high' ? '⚡ High Priority' : '🕐 Normal'}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-500">Photo:</span>
                                    <span className="ml-2 font-semibold text-slate-900">
                                        {formData.hasPhoto ? '✓ Attached' : 'Not attached'}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isFormValid || isSubmitting}
                    className={cn(
                        "w-full py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3",
                        isFormValid && !isSubmitting
                            ? "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white shadow-lg shadow-emerald-200"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    )}
                    whileHover={isFormValid && !isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={isFormValid && !isSubmitting ? { scale: 0.98 } : {}}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Checking Ward Jurisdiction...
                        </>
                    ) : (
                        <>
                            <Shield className="w-5 h-5" />
                            Log Maintenance Request (Login Required)
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </motion.button>

                {/* Login Info */}
                <p className="text-center text-sm text-slate-500">
                    You'll be redirected to login to track your maintenance ticket.
                </p>

                {/* Emergency Note */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm text-amber-800 font-semibold">Seeing active flooding?</p>
                        <p className="text-sm text-amber-700">
                            This form is for preventive maintenance. For emergencies, use the{' '}
                            <a href="/report" className="underline font-semibold hover:text-amber-900">Emergency Report</a> instead.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
