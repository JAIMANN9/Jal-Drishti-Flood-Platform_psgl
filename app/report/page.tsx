"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  MapPin,
  Droplets,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Info,
  Navigation,
  Loader2,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

// 1. Define the Validation Schema
const reportSchema = z.object({
  location: z.string().min(5, "Please provide a more specific location"),
  depth: z.string().min(1, "Please select water depth"),
  description: z.string().min(10, "Please provide more details"),
  contact: z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit number"),
});

// 2. Derive the Type from the Schema
type ReportFormValues = z.infer<typeof reportSchema>;

export default function ReportPage() {
  const router = useRouter();
  
  // 3. Define all necessary states
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDepth, setSelectedDepth] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
  });

  const onSubmit = async (data: ReportFormValues) => {
    setIsSubmitting(true);

    // Create the new entry object
    const newEntry = {
      id: `JAL/E/2026/${Math.floor(100000 + Math.random() * 900000)}`,
      receivedDate: new Date().toLocaleDateString("en-GB"),
      location: data.location,
      description: data.description,
      status: "Pending",
      depth: data.depth,
    };

    // Save to LocalStorage
    const existingReports = JSON.parse(localStorage.getItem("userReports") || "[]");
    const updatedReports = [newEntry, ...existingReports];
    localStorage.setItem("userReports", JSON.stringify(updatedReports));

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Show Toast Notification
    toast.success("Incident Transmitted Successfully!", {
      description: `Report ${newEntry.id} has been logged in the system.`,
    });

    // Optional: Redirect after success
    // setTimeout(() => router.push("/dashboard"), 3000);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 font-sans selection:bg-rose-500/30">
      <Toaster richColors position="top-right" />
      
      {/* DYNAMIC BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], x: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-rose-600/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], y: [0, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-cyan-600/20 blur-[120px] rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto py-12 px-6">
        <Link
          href="/dashboard"
          className="group inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Safety Dashboard
        </Link>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-cyan-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

              <div className="relative bg-slate-900/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
                <div className="relative p-8 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-cyan-500" />
                  <div className="flex items-center gap-4 mb-2">
                    <div className="bg-rose-500/20 p-3 rounded-2xl border border-rose-500/30">
                      <AlertTriangle className="w-6 h-6 text-rose-400" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-white tracking-tight">Report Incident</h1>
                      <p className="text-slate-400 text-sm">Real-time data saves lives. Provide accurate details.</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 pt-0 space-y-7">
                  {/* LOCATION */}
                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      Precise Location
                    </label>
                    <div className="relative">
                      <input
                        {...register("location")}
                        placeholder="e.g., Minto Bridge, Connaught Place"
                        className={cn(
                          "w-full px-5 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500/50",
                          errors.location && "border-rose-500/50 bg-rose-500/5"
                        )}
                      />
                      <Navigation className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 cursor-pointer hover:text-cyan-400 transition-colors" />
                    </div>
                    {errors.location && <span className="text-xs text-rose-400 font-medium">{errors.location.message}</span>}
                  </div>

                  {/* DEPTH SELECTOR */}
                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                      Water Depth
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Ankle", value: "ankle", desc: "< 6 in" },
                        { label: "Knee", value: "knee", desc: "1–2 ft" },
                        { label: "Waist+", value: "waist", desc: "3 ft+" },
                      ].map((d) => (
                        <button
                          key={d.value}
                          type="button"
                          onClick={() => {
                            setSelectedDepth(d.value);
                            setValue("depth", d.value);
                          }}
                          className={cn(
                            "relative p-4 rounded-2xl border transition-all duration-300 text-left group/btn",
                            selectedDepth === d.value
                              ? "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                              : "bg-slate-800/40 border-slate-700 hover:border-slate-500"
                          )}
                        >
                          <div className={cn("text-sm font-bold mb-1", selectedDepth === d.value ? "text-cyan-400" : "text-slate-200")}>
                            {d.label}
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium">{d.desc}</div>
                          {selectedDepth === d.value && (
                            <motion.div layoutId="activeDepth" className="absolute inset-0 border-2 border-cyan-500 rounded-2xl" />
                          )}
                        </button>
                      ))}
                    </div>
                    {errors.depth && <span className="text-xs text-rose-400 font-medium">{errors.depth.message}</span>}
                  </div>

                  {/* DETAILS */}
                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                      Situation Details
                    </label>
                    <textarea
                      {...register("description")}
                      rows={3}
                      placeholder="Are people trapped? Is traffic moving?"
                      className={cn(
                        "w-full px-5 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500/50",
                        errors.description && "border-rose-500/50"
                      )}
                    />
                    {errors.description && <span className="text-xs text-rose-400 font-medium">{errors.description.message}</span>}
                  </div>

                  {/* CONTACT */}
                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      Your Contact
                    </label>
                    <input
                      {...register("contact")}
                      placeholder="Mobile number for verification"
                      className={cn(
                        "w-full px-5 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500/50",
                        errors.contact && "border-rose-500/50"
                      )}
                    />
                    {errors.contact && <span className="text-xs text-rose-400 font-medium">{errors.contact.message}</span>}
                  </div>

                  {/* SUBMIT */}
                  <button
                    disabled={isSubmitting}
                    className="relative w-full group/submit overflow-hidden py-5 rounded-2xl font-bold text-white transition-all disabled:opacity-70"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 group-hover/submit:scale-105 transition-transform duration-500" />
                    <div className="relative flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Notifying Authorities...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Emergency Report</span>
                          <ArrowRight className="w-5 h-5 group-hover/submit:translate-x-1 transition-transform" />
                        </>
                      )}
                    </div>
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            /* SUCCESS STATE */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/80 backdrop-blur-2xl p-12 rounded-[3rem] border border-emerald-500/20 shadow-2xl text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                <div className="relative w-24 h-24 bg-emerald-500/10 border border-emerald-500/50 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-3">Report Transmitted</h2>
              <p className="text-slate-400 mb-8 max-w-xs mx-auto">
                Your report has been logged. Emergency units in your zone have been alerted.
              </p>

              <div className="bg-slate-950/50 p-6 rounded-3xl border border-slate-800 mb-8 text-left">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Incident ID</div>
                <div className="text-lg font-mono font-bold text-emerald-400">#FLD-2026-LIVE</div>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 text-white bg-cyan-600 hover:bg-cyan-700 px-8 py-4 rounded-2xl font-bold transition-all"
                >
                  View My Dashboard
                </Link>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-slate-400 hover:text-white text-sm font-medium"
                >
                  Submit Another Report
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}