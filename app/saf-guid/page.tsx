"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  ZapOff,
  Car,
  BriefcaseMedical, // Updated to the correct Lucide member
  ArrowLeft,
  FileDown,
  PhoneCall,
  Info,
  ChevronRight,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const guides = [
  {
    title: "Electrical Safety",
    icon: ZapOff,
    color: "from-amber-400 to-orange-600",
    points: [
      "Avoid touching electric poles or fallen wires.",
      "Turn off the main switch if water enters your home.",
      "Do not use electrical appliances while standing in water.",
      "Keep heavy appliances on raised platforms.",
    ],
  },
  {
    title: "Vehicle & Driving",
    icon: Car,
    color: "from-blue-400 to-indigo-600",
    points: [
      "Do not drive through flooded underpasses.",
      "If your car stalls in water, abandon it immediately.",
      "Drive in low gear to prevent water entering the exhaust.",
      "Keep a window slightly open to prevent pressure locks.",
    ],
  },
  {
    title: "Health & Hygiene",
    icon: BriefcaseMedical, // Ensure this matches the import above
    color: "from-emerald-400 to-teal-600",
    points: [
      "Drink only boiled or chlorinated water.",
      "Keep wounds covered to prevent leptospirosis.",
      "Wash hands thoroughly after contact with flood water.",
      "Use insect repellent to prevent dengue/malaria.",
    ],
  },
];

export default function SafetyGuidesPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 font-sans">
      {/* --- DYNAMIC BACKGROUND MESH --- */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto py-12 px-6">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Resources
            </Link>
            <h1 className="text-5xl font-black text-white tracking-tight">
              Safety{" "}
              <span className="text-cyan-400 underline decoration-cyan-500/30">
                Protocols
              </span>
            </h1>
          </div>

          <button className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all font-bold text-sm">
            <FileDown className="w-4 h-4 text-cyan-400" />
            Download Offline PDF
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* MAIN GUIDES GRID */}
          <div className="lg:col-span-8 space-y-6">
            {guides.map((guide, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-white/20 transition-all"
              >
                <div className="flex items-start gap-6">
                  <div
                    className={cn(
                      "p-4 rounded-2xl bg-gradient-to-br shadow-lg shrink-0",
                      guide.color
                    )}
                  >
                    <guide.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">
                      {guide.title}
                    </h3>
                    <ul className="grid md:grid-cols-2 gap-4">
                      {guide.points.map((point, pIdx) => (
                        <li
                          key={pIdx}
                          className="flex gap-3 text-slate-400 text-sm leading-relaxed"
                        >
                          <ChevronRight className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* SIDEBAR: EMERGENCY QUICK ACTIONS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-rose-900/20">
              <ShieldAlert className="w-10 h-10 mb-6 opacity-80" />
              <h3 className="text-2xl font-black mb-2">Immediate Danger?</h3>
              <p className="text-rose-100 text-sm mb-6 leading-relaxed">
                If you are trapped or witness a life-threatening situation, do
                not wait. Use the emergency hotline.
              </p>
              <a
                href="tel:112"
                className="flex items-center justify-center gap-3 w-full py-4 bg-white text-rose-600 rounded-2xl font-black hover:bg-rose-50 transition-colors shadow-lg"
              >
                <PhoneCall className="w-5 h-5" />
                Call 112 Now
              </a>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <h4 className="text-lg font-bold text-white">
                  Live Monitoring
                </h4>
              </div>
              <p className="text-slate-400 text-sm mb-6">
                Stay updated with real-time water levels and rainfall intensity
                in your specific zone.
              </p>
              <Link
                href="/hydrology"
                className="block text-center py-4 border border-cyan-500/30 text-cyan-400 rounded-2xl font-bold text-sm hover:bg-cyan-500/5 transition-all"
              >
                View Hydrology Data
              </Link>
            </div>
          </div>
        </div>

        {/* FOOTER NOTE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 border-t border-white/5 flex items-start gap-4"
        >
          <Info className="w-5 h-5 text-slate-500 shrink-0" />
          <p className="text-slate-500 text-xs leading-relaxed italic">
            Disclaimer: These guidelines are provided by the Municipal
            Corporation in accordance with the 2026 Flood Management Protocol.
            Always prioritize local authority instructions over general advice
            during active disasters.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
