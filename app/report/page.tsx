'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Camera, 
  MapPin, 
  Droplets, 
  ArrowLeft, 
  CheckCircle2,
  Info,
  Navigation,
  Upload,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';

const reportSchema = z.object({
  location: z.string().min(5, 'Please provide a more specific location'),
  depth: z.string().min(1, 'Please select water depth'),
  description: z.string().min(10, 'Please provide more details about the situation'),
  contact: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'),
});

type ReportFormValues = z.infer<typeof reportSchema>;

export default function ReportPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDepth, setSelectedDepth] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
  });

  const onSubmit = async (data: ReportFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Report Received!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you for your contribution. Our command center has been notified and a field squad is being dispatched to verify the location.
          </p>
          <div className="bg-slate-50 p-4 rounded-2xl mb-8 text-left border border-slate-100">
            <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Ticket ID</div>
            <div className="text-sm font-bold text-slate-900">#DEL-FLOOD-2026-8842</div>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-600 font-bold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 font-bold text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="bg-rose-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-black">Emergency Report</h1>
            </div>
            <p className="text-rose-100 text-sm leading-relaxed">
              Your report helps the MCD prioritize resource allocation. Please provide accurate information to ensure rapid response.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            {/* Location */}
            <div className="space-y-3">
              <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-600" />
                Location Details
              </label>
              <div className="relative">
                <input 
                  {...register('location')}
                  placeholder="e.g., Minto Bridge Underpass, Near CP"
                  className={cn(
                    "w-full px-4 py-4 bg-slate-50 border rounded-2xl outline-none transition-all text-sm",
                    errors.location ? "border-rose-500 focus:ring-2 focus:ring-rose-200" : "border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  )}
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-600 hover:text-cyan-700">
                  <Navigation className="w-5 h-5" />
                </button>
              </div>
              {errors.location && <p className="text-xs font-bold text-rose-500">{errors.location.message}</p>}
            </div>

            {/* Depth Selection */}
            <div className="space-y-3">
              <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-600" />
                Estimated Water Depth
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Ankle Deep', value: 'ankle', desc: '< 6 inches' },
                  { label: 'Knee Deep', value: 'knee', desc: '1-2 feet' },
                  { label: 'Waist Deep', value: 'waist', desc: '> 3 feet' },
                ].map((depth) => (
                  <button
                    key={depth.value}
                    type="button"
                    onClick={() => {
                      setSelectedDepth(depth.value);
                      setValue('depth', depth.value);
                    }}
                    className={cn(
                      "p-4 rounded-2xl border text-left transition-all",
                      selectedDepth === depth.value 
                        ? "bg-cyan-50 border-cyan-500 ring-2 ring-cyan-100" 
                        : "bg-slate-50 border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div className="text-xs font-black text-slate-900 mb-1">{depth.label}</div>
                    <div className="text-[10px] text-slate-500">{depth.desc}</div>
                  </button>
                ))}
              </div>
              <input type="hidden" {...register('depth')} />
              {errors.depth && <p className="text-xs font-bold text-rose-500">{errors.depth.message}</p>}
            </div>

            {/* Photo Upload */}
            <div className="space-y-3">
              <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Camera className="w-4 h-4 text-slate-500" />
                Visual Evidence (Optional)
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                <Upload className="w-8 h-8 text-slate-300 mx-auto mb-3 group-hover:text-cyan-500 transition-colors" />
                <div className="text-xs font-bold text-slate-500">Click to upload or drag and drop</div>
                <div className="text-[10px] text-slate-400 mt-1">PNG, JPG up to 10MB</div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-500" />
                Additional Details
              </label>
              <textarea 
                {...register('description')}
                rows={4}
                placeholder="Describe the situation (e.g., traffic stuck, electrical poles submerged...)"
                className={cn(
                  "w-full px-4 py-4 bg-slate-50 border rounded-2xl outline-none transition-all text-sm resize-none",
                  errors.description ? "border-rose-500 focus:ring-2 focus:ring-rose-200" : "border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                )}
              />
              {errors.description && <p className="text-xs font-bold text-rose-500">{errors.description.message}</p>}
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <label className="text-sm font-black text-slate-900">Mobile Number for Verification</label>
              <input 
                {...register('contact')}
                type="tel"
                placeholder="10-digit mobile number"
                className={cn(
                  "w-full px-4 py-4 bg-slate-50 border rounded-2xl outline-none transition-all text-sm",
                  errors.contact ? "border-rose-500 focus:ring-2 focus:ring-rose-200" : "border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                )}
              />
              {errors.contact && <p className="text-xs font-bold text-rose-500">{errors.contact.message}</p>}
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Report...
                </>
              ) : (
                <>
                  Submit Emergency Report
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
            <div className="text-xl font-black text-slate-900 mb-1">155305</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">MCD Helpline</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
            <div className="text-xl font-black text-slate-900 mb-1">101</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Fire Service</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
            <div className="text-xl font-black text-slate-900 mb-1">100</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Police</div>
          </div>
        </div>
      </div>
    </div>
  );
}
