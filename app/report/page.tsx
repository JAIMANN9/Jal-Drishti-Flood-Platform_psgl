"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Camera,
  MapPin,
  Droplets,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Info,
  Navigation,
  Upload,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

const reportSchema = z.object({
  location: z.string().min(5, "Please provide a more specific location"),
  depth: z.string().min(1, "Please select water depth"),
  description: z.string().min(10, "Please provide more details"),
  contact: z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit number"),
});

type ReportFormValues = z.infer<typeof reportSchema>;

export default function ReportPage() {
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

  const onSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  /* ================= SUCCESS SCREEN ================= */
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-cyan-50 to-slate-50 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-white/60 text-center"
        >
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-emerald-300/40 animate-ping" />
            <div className="relative w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mb-4">
            Report Received
          </h2>

          <p className="text-slate-600 mb-8">
            Authorities have been notified. A response team is being dispatched.
          </p>

          <div className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-2xl border border-slate-200 shadow-inner mb-8 text-left">
            <div className="text-[10px] font-black text-slate-400 uppercase">
              Ticket ID
            </div>
            <div className="text-sm font-bold text-slate-900">
              #DEL-FLOOD-2026-8842
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-cyan-600 font-bold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  /* ================= FORM ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/40 to-rose-50/40 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-white/60 overflow-hidden">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-rose-600 to-pink-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-xl shadow-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black">Emergency Report</h1>
            </div>
            <p className="text-rose-100 text-sm">
              Accurate reports help authorities respond faster.
            </p>
          </div>

          {/* FORM BODY */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            {/* LOCATION */}
            <div className="space-y-3">
              <label className="text-sm font-black flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-600" />
                Location
              </label>
              <div className="relative">
                <input
                  {...register("location")}
                  placeholder="Minto Bridge Underpass"
                  className={cn(
                    "w-full px-4 py-4 bg-white/70 border rounded-2xl text-sm transition-all focus:ring-2 focus:ring-cyan-200 focus:shadow-lg",
                    errors.location ? "border-rose-500" : "border-slate-200"
                  )}
                />
                <Navigation className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-600" />
              </div>
              {errors.location && (
                <p className="text-xs font-bold text-rose-500">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* DEPTH */}
            <div className="space-y-3">
              <label className="text-sm font-black flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-600" />
                Water Depth
              </label>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Ankle", value: "ankle", desc: "< 6 inches" },
                  { label: "Knee", value: "knee", desc: "1–2 feet" },
                  { label: "Waist", value: "waist", desc: "> 3 feet" },
                ].map((d) => (
                  <motion.button
                    key={d.value}
                    type="button"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setSelectedDepth(d.value);
                      setValue("depth", d.value);
                    }}
                    className={cn(
                      "p-4 rounded-2xl border text-left transition-all",
                      selectedDepth === d.value
                        ? "bg-gradient-to-br from-cyan-50 to-white border-cyan-500 ring-2 ring-cyan-200 shadow-lg"
                        : "bg-white border-slate-200 hover:shadow-md"
                    )}
                  >
                    <div className="text-xs font-black">{d.label}</div>
                    <div className="text-[10px] text-slate-500">{d.desc}</div>
                  </motion.button>
                ))}
              </div>
              <input type="hidden" {...register("depth")} />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-3">
              <label className="text-sm font-black flex items-center gap-2">
                <Info className="w-4 h-4" />
                Details
              </label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Traffic blocked, vehicles stuck..."
                className={cn(
                  "w-full px-4 py-4 bg-white/70 border rounded-2xl text-sm transition-all focus:ring-2 focus:ring-cyan-200",
                  errors.description ? "border-rose-500" : "border-slate-200"
                )}
              />
            </div>

            {/* CONTACT */}
            <div className="space-y-3">
              <label className="text-sm font-black">Mobile Number</label>
              <input
                {...register("contact")}
                placeholder="10-digit number"
                className={cn(
                  "w-full px-4 py-4 bg-white/70 border rounded-2xl text-sm transition-all focus:ring-2 focus:ring-cyan-200",
                  errors.contact ? "border-rose-500" : "border-slate-200"
                )}
              />
            </div>

            {/* SUBMIT */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={isSubmitting}
              className="w-full py-5 rounded-2xl font-black text-white bg-gradient-to-r from-slate-900 to-slate-800 shadow-2xl flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Submit Report
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
