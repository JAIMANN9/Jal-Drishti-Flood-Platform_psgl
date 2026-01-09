'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShieldAlert, 
  ArrowRight, 
  Smartphone, 
  Lock, 
  UserCircle,
  CheckCircle2,
  Activity,
  Database,
  Map
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function LoginPage() {
  const [hoveredSide, setHoveredSide] = useState<'citizen' | 'official' | null>(null);

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-slate-950">
      {/* Citizen Side (Jan-Setu) */}
      <motion.div 
        className={cn(
          "relative flex-1 flex flex-col justify-center px-8 md:px-16 py-20 transition-all duration-500 ease-in-out",
          hoveredSide === 'citizen' ? "md:flex-[1.5] bg-white" : hoveredSide === 'official' ? "md:flex-[0.5] bg-slate-100" : "bg-white"
        )}
        onMouseEnter={() => setHoveredSide('citizen')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="max-w-md mx-auto w-full">
          <div className="mb-12">
            <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-cyan-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Jan-Setu</h2>
            <p className="text-slate-600 mb-8">Join the Flood Warriors. Report issues, earn badges, and keep your community safe.</p>
            
            <ul className="space-y-3 mb-10">
              {[
                { text: 'Gamified Reporting', icon: CheckCircle2 },
                { text: 'Earn "Drain Guardian" Badges', icon: CheckCircle2 },
                { text: 'Track Your Grievance Live', icon: CheckCircle2 }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                  <item.icon className="w-4 h-4 text-emerald-500" />
                  {item.text}
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              <div className="relative">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="tel" 
                  placeholder="Mobile Number" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                />
              </div>
              <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                Get OTP <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </motion.div>

      {/* Official Side (Niyantran Kaksha) */}
      <motion.div 
        className={cn(
          "relative flex-1 flex flex-col justify-center px-8 md:px-16 py-20 transition-all duration-500 ease-in-out border-t md:border-t-0 md:border-l border-slate-800",
          hoveredSide === 'official' ? "md:flex-[1.5] bg-slate-900" : hoveredSide === 'citizen' ? "md:flex-[0.5] bg-slate-950" : "bg-slate-900"
        )}
        onMouseEnter={() => setHoveredSide('official')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="max-w-md mx-auto w-full">
          <div className="mb-12">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6">
              <ShieldAlert className="w-6 h-6 text-rose-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Niyantran Kaksha</h2>
            <p className="text-slate-400 mb-8">Operational Command Center. Real-time monitoring and resource allocation for MCD officials.</p>
            
            <ul className="space-y-3 mb-10">
              {[
                { text: 'Real-time IoT Feed', icon: Activity },
                { text: 'Zone-Wise Resource Allocation', icon: Database },
                { text: 'Predictive Hydrological Models', icon: Map }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
                  <item.icon className="w-4 h-4 text-cyan-500" />
                  {item.text}
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              <div className="relative">
                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Employee ID" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                />
              </div>
              <Link href="/dashboard" className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                Login to Command <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
