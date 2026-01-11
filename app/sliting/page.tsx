"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets,
  MapPin,
  ClipboardList,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Send,
  Construction,
  Waves,
  Hammer,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

const siltingSchema = z.object({
  location: z.string().min(5, "Precise location is required"),
  drainType: z.string().min(1, "Please select a drain type"),
  urgency: z.string().min(1, "Please select urgency level"),
  description: z.string().min(10, "Provide a brief description of the blockage"),
});

type SiltingFormValues = z.infer<typeof siltingSchema>;

export default function DesiltingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SiltingFormValues>({
    resolver: zodResolver(siltingSchema),
    defaultValues: { urgency: "Standard" }
  });

  const selectedUrgency = watch("urgency");

  const onSubmit = async (data: SiltingFormValues) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 font-sans selection:bg-cyan-500/30">
      {/* --- DYNAMIC BACKGROUND (Matching Report Page) --- */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
            x: [0, -50, 0] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-cyan-600/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            y: [0, -100, 0] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto py-12 px-6">
        {/* NAVIGATION */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition-colors font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Back to Services
        </Link>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* LEFT SIDE: CONTEXT & STATS */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-5 space-y-8"
              >
                <div>
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-6"
                  >
                    <Waves className="w-8 h-8" />
                  </motion.div>
                  <h1 className="text-5xl font-black text-white leading-[1.1] mb-6">
                    Request <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      De-silting
                    </span>
                  </h1>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                    Report blocked drainage systems to prevent urban flooding. Our maintenance units use these reports to prioritize high-risk zones.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { icon: Construction, label: "Drainage Clearing", desc: "Mechanical & Manual Silt Removal" },
                    { icon: Hammer, label: "Structural Repair", desc: "Fixing broken lids & culverts" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
                      <div className="p-3 bg-slate-800 rounded-2xl text-cyan-400">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-white font-bold">{item.label}</div>
                        <div className="text-slate-500 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT SIDE: THE FORM */}
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-7 relative group"
              >
                {/* Outer Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[3rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                
                <div className="relative bg-slate-900/80 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden">
                  <div className="p-8 md:p-12 space-y-8">
                    
                    {/* FORM HEADER */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h2 className="text-xl font-bold text-white">Maintenance Portal</h2>
                        <p className="text-sm text-slate-500">Jal-Drishti Municipal Services 2026</p>
                      </div>
                      <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                        New Request
                      </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      {/* LOCATION */}
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-cyan-500" /> Area Location
                        </label>
                        <input
                          {...register("location")}
                          placeholder="e.g., Sector 14, Main Drain Junction"
                          className={cn(
                            "w-full px-6 py-4 bg-slate-800/40 border border-slate-700 rounded-2xl text-white focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all",
                            errors.location && "border-red-500/50"
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* DRAIN TYPE */}
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">System Type</label>
                          <select 
                            {...register("drainType")}
                            className="w-full px-6 py-4 bg-slate-800/40 border border-slate-700 rounded-2xl text-white focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all appearance-none cursor-pointer"
                          >
                            <option value="" className="bg-slate-900">Select...</option>
                            <option value="storm" className="bg-slate-900">Stormwater</option>
                            <option value="sewer" className="bg-slate-900">Sewerage</option>
                            <option value="open" className="bg-slate-900">Open Trench</option>
                          </select>
                        </div>

                        {/* URGENCY */}
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Priority</label>
                          <div className="flex bg-slate-800/40 p-1.5 rounded-2xl border border-slate-700">
                            {["Standard", "High"].map((level) => (
                              <button
                                key={level}
                                type="button"
                                onClick={() => setValue("urgency", level)}
                                className={cn(
                                  "flex-1 py-2.5 rounded-xl text-xs font-black transition-all",
                                  selectedUrgency === level 
                                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" 
                                    : "text-slate-500 hover:text-slate-300"
                                )}
                              >
                                {level}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* DESCRIPTION */}
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                          <ClipboardList className="w-3.5 h-3.5" /> Maintenance Details
                        </label>
                        <textarea
                          {...register("description")}
                          rows={3}
                          placeholder="Visual depth of silt, presence of plastic waste, etc."
                          className="w-full px-6 py-4 bg-slate-800/40 border border-slate-700 rounded-2xl text-white focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all"
                        />
                      </div>

                      {/* SUBMIT */}
                      <button
                        disabled={isSubmitting}
                        className="w-full relative group/btn overflow-hidden py-5 rounded-2xl font-black text-white transition-all disabled:opacity-50"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 group-hover/btn:scale-105 transition-transform duration-500" />
                        <div className="relative flex items-center justify-center gap-3">
                          {isSubmitting ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                          ) : (
                            <>
                              <span>Log Maintenance Request</span>
                              <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </>
                          )}
                        </div>
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            /* SUCCESS STATE */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto bg-slate-900/80 backdrop-blur-2xl p-12 rounded-[3rem] border border-cyan-500/20 shadow-2xl text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping" />
                <div className="relative w-24 h-24 bg-cyan-500/10 border border-cyan-500/50 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-cyan-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Request Logged</h2>
              <p className="text-slate-400 mb-8">
                The municipal cleaning crew for your sector has been notified. Request ID: 
                <span className="text-cyan-400 font-mono ml-2">#SLT-2026-992</span>
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-2xl font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Return Home
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}