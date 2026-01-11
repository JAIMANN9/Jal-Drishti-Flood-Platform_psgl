"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  MapPin,
  Heart,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Sparkles,
  ShieldCheck,
  HandHelping,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

const volunteerSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  area: z.string().min(5, "Please specify your residential area"),
  skills: z.string().min(1, "Please select your primary skill"),
  interest: z.string().min(10, "Please briefly describe why you want to join"),
});

type VolunteerValues = z.infer<typeof volunteerSchema>;

export default function VolunteerPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<VolunteerValues>();

  const onSubmit = async (data: VolunteerValues) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 font-sans">
      {/* --- DYNAMIC BACKGROUND MESH --- */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.4, 1],
            rotate: [0, 45, 0],
            x: [0, 100, 0] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-emerald-600/15 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            y: [0, 50, 0] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-teal-600/10 blur-[120px] rounded-full" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto py-12 px-6">
        {/* TOP NAV */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 mb-10 transition-colors font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Back to Community
        </Link>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <div className="grid lg:grid-cols-12 gap-16 items-start">
              
              {/* LEFT SIDE: COMMUNITY IMPACT */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-5 space-y-10"
              >
                <div>
                  <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-6 shadow-lg shadow-emerald-900/20">
                    <Users className="w-8 h-8" />
                  </div>
                  <h1 className="text-5xl font-black text-white leading-tight mb-6">
                    Join the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                      Response Force
                    </span>
                  </h1>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Be the boots on the ground when your city needs you. Help with flood monitoring, community alerts, and post-monsoon restoration.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    { icon: ShieldCheck, title: "Training Provided", desc: "Get certified in disaster response & safety." },
                    { icon: Heart, title: "Community Impact", desc: "Directly assist vulnerable zones in your area." },
                    { icon: Sparkles, title: "Reward Points", desc: "Earn civic credits for your volunteer hours." },
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="flex gap-4 p-2"
                    >
                      <div className="mt-1">
                        <item.icon className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold">{item.title}</h4>
                        <p className="text-slate-500 text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT SIDE: ENROLLMENT FORM */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-7 relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/40 to-teal-500/40 rounded-[3rem] blur-xl opacity-20 transition duration-1000"></div>
                
                <div className="relative bg-slate-900/60 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden">
                  <div className="p-8 md:p-12 space-y-8">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-white tracking-tight">Volunteer Registration</h2>
                      <p className="text-sm text-slate-500 font-medium italic">"Stronger Together, Safer Forever"</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* FULL NAME */}
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                            <User className="w-3 h-3 text-emerald-500" /> Full Name
                          </label>
                          <input
                            {...register("fullName")}
                            placeholder="John Doe"
                            className="w-full px-6 py-4 bg-slate-800/40 border border-slate-700 rounded-2xl text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600"
                          />
                        </div>

                        {/* EMAIL */}
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Mail className="w-3 h-3 text-emerald-500" /> Email Address
                          </label>
                          <input
                            {...register("email")}
                            placeholder="john@example.com"
                            className="w-full px-6 py-4 bg-slate-800/40 border border-slate-700 rounded-2xl text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600"
                          />
                        </div>
                      </div>

                      {/* AREA OF RESIDENCE */}
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-emerald-500" /> Service Area (Neighborhood)
                        </label>
                        <input
                          {...register("area")}
                          placeholder="e.g., Hauz Khas, Delhi"
                          className="w-full px-6 py-4 bg-slate-800/40 border border-slate-700 rounded-2xl text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                        />
                      </div>

                      {/* SKILLS */}
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Primary Field Expertise</label>
                        <div className="grid grid-cols-2 gap-3">
                          {["Logistics", "Medical", "Communication", "Ground Support"].map((skill) => (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => setValue("skills", skill)}
                              className={cn(
                                "py-3 px-4 rounded-xl text-xs font-bold border transition-all",
                                watch("skills") === skill 
                                  ? "bg-emerald-500 border-emerald-400 text-white" 
                                  : "bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500"
                              )}
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* WHY JOIN */}
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Brief Statement of Interest</label>
                        <textarea
                          {...register("interest")}
                          rows={3}
                          placeholder="Tell us why you want to help..."
                          className="w-full px-6 py-4 bg-slate-800/40 border border-slate-700 rounded-2xl text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                        />
                      </div>

                      {/* SUBMIT */}
                      <button
                        disabled={isSubmitting}
                        className="w-full relative group/btn py-5 rounded-2xl font-black text-white transition-all overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 group-hover/btn:scale-110 transition-transform duration-500" />
                        <div className="relative flex items-center justify-center gap-3">
                          {isSubmitting ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                          ) : (
                            <>
                              <span>Submit Registration</span>
                              <HandHelping className="w-5 h-5 group-hover/btn:scale-125 transition-transform" />
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
              className="max-w-xl mx-auto bg-slate-900/80 backdrop-blur-2xl p-12 rounded-[3rem] border border-emerald-500/20 shadow-2xl text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                <div className="relative w-24 h-24 bg-emerald-500/10 border border-emerald-500/50 rounded-full flex items-center justify-center">
                  <Heart className="w-12 h-12 text-emerald-400" />
                </div>
              </div>
              <h2 className="text-3xl font-black text-white mb-4">Welcome to the Team!</h2>
              <p className="text-slate-400 mb-8 font-medium leading-relaxed">
                Your application is being reviewed by the community leads. You will receive an onboarding kit via email shortly.
              </p>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 mb-8">
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block mb-1">Registration Status</span>
                <span className="text-lg font-bold text-white italic">Pending Verification</span>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-900/20"
              >
                <ArrowLeft className="w-4 h-4" /> Return to Home
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}