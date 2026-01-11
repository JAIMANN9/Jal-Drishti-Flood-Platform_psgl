'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  ShieldAlert, 
  ArrowRight, 
  Smartphone, 
  Lock, 
  UserCircle,
  CheckCircle2,
  KeyRound 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [hoveredSide, setHoveredSide] = useState<'citizen' | 'official' | null>(null);
  
  // Citizen States
  const [step, setStep] = useState<'number' | 'otp'>('number');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');

  // Official States
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');

  // --- Citizen Logic ---
  const handleGetOTP = () => {
    // Only proceed if number is valid (more than 6 digits)
    if (mobileNumber.length > 6) {
      console.log("OTP Request sent for:", mobileNumber);
      setStep('otp');
    }
  };

  const handleCitizenLogin = () => {
    router.push('/dashboard');
  };

  // --- Official Logic ---
  const handleOfficialLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-slate-950">
      
      {/* LEFT: Citizen Side (Jan-Setu) */}
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
            <p className="text-slate-600 mb-8">Join the Flood Warriors. Report issues and keep your community safe.</p>
            
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {step === 'number' ? (
                  <motion.div 
                    key="phone-input"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="tel" 
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="Enter Mobile Number" 
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-slate-900 font-medium"
                      />
                    </div>
                    <button 
                      onClick={handleGetOTP}
                      disabled={mobileNumber.length <= 6}
                      className={cn(
                        "w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                        mobileNumber.length > 6 
                          ? "bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-200" 
                          : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      )}
                    >
                      Get OTP <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="otp-input"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg mb-4">
                      <p className="text-emerald-700 text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> OTP sent to {mobileNumber}
                      </p>
                    </div>
                    <div className="relative">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="text" 
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP" 
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-slate-900 font-medium"
                      />
                    </div>
                    <button 
                      onClick={handleCitizenLogin}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-200"
                    >
                      Verify & Login
                    </button>
                    <button 
                      onClick={() => setStep('number')}
                      className="w-full text-sm text-cyan-600 hover:underline font-medium"
                    >
                      Change Number
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </motion.div>

      {/* RIGHT: Official Side (Niyantran Kaksha) */}
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
            <p className="text-slate-400 mb-8">Operational Command Center. Real-time monitoring for MCD officials.</p>
            
            <form onSubmit={handleOfficialLogin} className="space-y-4">
              <div className="relative">
                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  required
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                  placeholder="Employee ID" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-900/20"
              >
                Login to Command <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}