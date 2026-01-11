"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Map as MapIcon,
  Layers,
  ArrowLeft,
  Info,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Maximize2,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const zonesData = [
  { id: 1, name: "Civil Lines", risk: "High", waterLevel: "0.8m", status: "Critical" },
  { id: 2, name: "Rohini", risk: "Low", waterLevel: "0.1m", status: "Normal" },
  { id: 3, name: "Najafgarh", risk: "High", waterLevel: "1.2m", status: "Critical" },
  { id: 4, name: "South Delhi", risk: "Medium", waterLevel: "0.4m", status: "Watch" },
  { id: 5, name: "Shahdara North", risk: "High", waterLevel: "0.9m", status: "Critical" },
  { id: 6, name: "West Delhi", risk: "Medium", waterLevel: "0.3m", status: "Watch" },
];

export default function ZoneMapsPage() {
  const [selectedZone, setSelectedZone] = useState(zonesData[0]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 font-sans">
      {/* --- BACKGROUND MESH --- */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-[60%] h-[60%] bg-blue-600/10 blur-[120px] rounded-full" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-12 px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
              Back to Resources
            </Link>
            <h1 className="text-5xl font-black text-white tracking-tight">
              Zone <span className="text-blue-500">Heatmaps</span>
            </h1>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-sm font-bold hover:bg-white/10 transition-all">
              <Layers className="w-4 h-4 text-blue-400" />
              Toggle Layers
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 rounded-2xl text-white text-sm font-black shadow-lg shadow-blue-900/40 hover:bg-blue-500 transition-all">
              <Navigation className="w-4 h-4" />
              Live Location
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 h-[700px]">
          {/* LEFT: MAP VISUALIZER (MOCKUP) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-8 relative bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[3rem] overflow-hidden"
          >
            {/* Map Placeholder Content */}
            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                {/* SVG Mockup of a Map grid */}
                <svg width="100%" height="100%" className="opacity-20">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                
                {/* Simulated Heatmap Blobs */}
                <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-red-600/30 blur-[80px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full" />
                
                <div className="z-10 text-center">
                    <MapIcon className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Map Engine: Jal-Drishti v2.0</p>
                </div>
            </div>

            {/* Map Controls Overlay */}
            <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex gap-6 items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <span className="text-[10px] font-bold text-slate-300 uppercase">High Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full" />
                        <span className="text-[10px] font-bold text-slate-300 uppercase">Safe</span>
                    </div>
                </div>
            </div>

            <button className="absolute top-6 right-6 p-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/10 text-white hover:bg-white/10 transition-all">
                <Maximize2 className="w-5 h-5" />
            </button>
          </motion.div>

          {/* RIGHT: ZONE LISTING */}
          <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6 px-2">
                    <h3 className="text-lg font-bold text-white">Zone Directory</h3>
                    <Filter className="w-4 h-4 text-slate-500 cursor-pointer" />
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {zonesData.map((zone) => (
                        <motion.button
                            key={zone.id}
                            onClick={() => setSelectedZone(zone)}
                            whileHover={{ x: 5 }}
                            className={cn(
                                "w-full text-left p-5 rounded-3xl border transition-all flex justify-between items-center",
                                selectedZone.id === zone.id 
                                ? "bg-blue-600/10 border-blue-500/50" 
                                : "bg-white/5 border-transparent hover:border-white/10"
                            )}
                        >
                            <div>
                                <h4 className="text-white font-bold text-sm mb-1">{zone.name}</h4>
                                <p className="text-slate-500 text-[10px] uppercase font-black tracking-wider">{zone.status}</p>
                            </div>
                            <div className={cn(
                                "text-xs font-bold px-3 py-1 rounded-full",
                                zone.risk === "High" ? "text-red-400 bg-red-400/10" : 
                                zone.risk === "Medium" ? "text-blue-400 bg-blue-400/10" : "text-emerald-400 bg-emerald-400/10"
                            )}>
                                {zone.risk}
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* SELECTED ZONE DETAIL CARD */}
                <motion.div 
                    key={selectedZone.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mt-6 p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] border border-white/10"
                >
                    <div className="flex items-center gap-3 mb-4">
                        {selectedZone.risk === "High" ? <AlertTriangle className="text-red-500 w-5 h-5" /> : <CheckCircle className="text-emerald-500 w-5 h-5" />}
                        <span className="text-white font-black text-sm uppercase">{selectedZone.name} Details</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-[10px] text-slate-500 font-bold uppercase">Water Accumulation</p>
                            <p className="text-xl font-bold text-white font-mono">{selectedZone.waterLevel}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-slate-500 font-bold uppercase">Risk Rating</p>
                            <p className={cn(
                                "text-xl font-bold font-mono",
                                selectedZone.risk === "High" ? "text-red-500" : "text-emerald-500"
                            )}>{selectedZone.risk}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
          </div>
        </div>

        {/* BOTTOM ALERT */}
        <div className="mt-8 flex items-center gap-4 p-5 bg-blue-500/10 border border-blue-500/20 rounded-3xl">
            <Info className="w-5 h-5 text-blue-400 shrink-0" />
            <p className="text-slate-400 text-xs leading-relaxed">
                <span className="text-white font-bold">Data Disclaimer:</span> Map displays real-time sensory data from 480 nodal stations across Delhi. Heat levels are updated every 15 minutes. Areas marked in red are strictly advised to avoid for non-essential travel.
            </p>
        </div>
      </div>
    </div>
  );
}