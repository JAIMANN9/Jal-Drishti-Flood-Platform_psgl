"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Search,
  ArrowLeft,
  Building2,
  Ambulance,
  Radio,
  ExternalLink,
  MapPin,
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const contactCategories = [
  {
    title: "Central Control Rooms",
    icon: Radio,
    contacts: [
      { name: "Flood Control Room", phone: "011-23378042", desc: "24/7 Monitoring & Rescue" },
      { name: "DDMA Helpline", phone: "1077", desc: "Disaster Management Authority" },
      { name: "Police Emergency", phone: "112", desc: "Immediate Security Response" },
    ]
  },
  {
    title: "Medical & Fire",
    icon: Ambulance,
    contacts: [
      { name: "CAT Ambulance", phone: "102", desc: "Centralized Accident & Trauma" },
      { name: "Fire Service", phone: "101", desc: "Fire & Technical Rescue" },
      { name: "Red Cross Delhi", phone: "011-23359379", desc: "Medical Support & Supplies" },
    ]
  }
];

const zonalContacts = [
  { zone: "North Delhi", phone: "011-27203012", area: "Civil Lines, Rohini, Narela" },
  { zone: "South Delhi", phone: "011-26510071", area: "Green Park, Saket, RK Puram" },
  { zone: "East Delhi", phone: "011-22114477", area: "Laxmi Nagar, Preet Vihar" },
  { zone: "West Delhi", phone: "011-25191014", area: "Punjabi Bagh, Rajouri Garden" },
  { zone: "Central Delhi", phone: "011-23270151", area: "Karol Bagh, Paharganj" },
];

export default function EmergencyContactsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredZones = zonalContacts.filter(z => 
    z.zone.toLowerCase().includes(searchQuery.toLowerCase()) || 
    z.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 font-sans">
      {/* --- ANIMATED BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-rose-600/10 blur-[120px] rounded-full" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto py-12 px-6">
        {/* HEADER */}
        <div className="mb-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            Back to Resources
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl font-black text-white tracking-tight mb-2">
                Emergency <span className="text-rose-500">Contacts</span>
              </h1>
              <p className="text-slate-400 font-medium">Verified municipal and emergency helplines for 2026 Monsoon.</p>
            </div>
            
            {/* SEARCH BAR */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text"
                placeholder="Search by zone or area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-rose-500/50 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* MAIN SERVICES */}
          <div className="lg:col-span-7 space-y-8">
            {contactCategories.map((cat, idx) => (
              <section key={idx} className="space-y-4">
                <div className="flex items-center gap-3 px-2">
                  <cat.icon className="w-5 h-5 text-rose-500" />
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">{cat.title}</h3>
                </div>
                <div className="grid gap-4">
                  {cat.contacts.map((contact, cIdx) => (
                    <motion.div
                      key={cIdx}
                      whileHover={{ scale: 1.01 }}
                      className="group bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex items-center justify-between hover:border-rose-500/30 transition-all"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold">{contact.name}</h4>
                          <p className="text-slate-500 text-xs">{contact.desc}</p>
                        </div>
                      </div>
                      <a 
                        href={`tel:${contact.phone}`}
                        className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-all"
                      >
                        {contact.phone}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* ZONAL DIRECTORY */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] overflow-hidden sticky top-8">
              <div className="p-8 border-b border-white/5 bg-gradient-to-r from-rose-500/10 to-transparent">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="w-5 h-5 text-rose-400" />
                  <h3 className="text-xl font-bold text-white">MCD Zonal Units</h3>
                </div>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Local Area Response Teams</p>
              </div>
              
              <div className="p-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                {filteredZones.length > 0 ? (
                  filteredZones.map((zone, zIdx) => (
                    <div 
                      key={zIdx}
                      className="p-4 rounded-2xl hover:bg-white/5 transition-all group border-b border-white/5 last:border-0"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-white font-bold group-hover:text-rose-400 transition-colors">{zone.zone}</span>
                        <a href={`tel:${zone.phone}`} className="text-rose-500"><ExternalLink className="w-4 h-4" /></a>
                      </div>
                      <div className="flex items-start gap-2 text-slate-500 text-[11px] font-medium leading-relaxed">
                        <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                        {zone.area}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-slate-500 text-sm">No zones match your search.</p>
                  </div>
                )}
              </div>
              
              <div className="p-6 bg-rose-500/5 m-4 rounded-3xl border border-rose-500/20">
                <div className="flex gap-3">
                  <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
                  <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                    Calls to 112 are toll-free and work even without a SIM card or active plan. Use for immediate life-safety emergencies only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}