'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplets, 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  ChevronDown, 
  Phone, 
  Map as MapIcon, 
  ArrowRight,
  Menu,
  X,
  Activity,
  Database,
  Globe,
  Zap,
  Shield,
  Clock,
  BarChart3,
  FileText,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Project', href: '#about' },
    { name: 'Hydrology Data', href: '#data' },
    { name: 'Safety Protocols', href: '#safety' },
  ];

  const services = [
    { name: 'Report Waterlogging', icon: AlertTriangle, href: '/report' },
    { name: 'Request De-silting', icon: Droplets, href: '#' },
    { name: 'Volunteer Registration', icon: Users, href: '#' },
  ];

  const resources = [
    { name: 'Safety Guides', icon: ShieldCheck, desc: 'Electrical & Vehicle Safety' },
    { name: 'Emergency Contacts', icon: Phone, desc: 'MCD, PWD, Flood Control', href: '/emg-contact' },
    { name: 'Zone Maps', icon: MapIcon, desc: '12 MCD Administrative Zones', href: '/zoneMap' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled ? "bg-white/90 backdrop-blur-md border-slate-200 py-3 shadow-sm" : "bg-transparent border-transparent py-5"
      )}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-cyan-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Jal-Drishti</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link.name} href={link.href} className="text-sm font-semibold text-slate-600 hover:text-cyan-600 transition-colors">
                {link.name}
              </Link>
            ))}
            
            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-semibold text-slate-600 group-hover:text-cyan-600 transition-colors">
                Services <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
                {services.map(item => (
                  <Link key={item.name} href={item.href} className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-left">
                    <item.icon className="w-5 h-5 text-cyan-600" />
                    <span className="text-sm font-bold text-slate-700">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-semibold text-slate-600 group-hover:text-cyan-600 transition-colors">
                Resources <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
                {resources.map(item => (
                  item.name === 'Safety Guides' ? (
                    <Link key={item.name} href="/saf-guid" className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-left">
                      <item.icon className="w-5 h-5 text-cyan-600" />
                      <div>
                        <div className="text-sm font-bold text-slate-700">{item.name}</div>
                        <div className="text-xs text-slate-400">{item.desc}</div>
                      </div>
                    </Link>
                  ) : (
                    <button key={item.name} className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-left">
                      <item.icon className="w-5 h-5 text-cyan-600" />
                      <Link key={item.name} href={`${item.href}`}>
                        <div className="text-sm font-bold text-slate-700">{item.name}</div>
                        <div className="text-xs text-slate-400">{item.desc}</div>
                      </Link>
                    </button>
                  )
                ))}
              </div>
            </div>

            <Link href="/report" className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-rose-200 animate-pulse">
              Emergency Report
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-100/30 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold tracking-widest uppercase bg-white border border-slate-200 text-cyan-700 rounded-full shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
                Live Monsoon Monitoring 2026
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">
                Delhi's Digital Shield <br />
                <span className="text-cyan-600">Against Flooding.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                Jal-Drishti is the National Capital's unified command platform for hydrological resilience, integrating IoT sensors, 3D digital twins, and citizen intelligence.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/login" className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-slate-200">
                  Access Command Center <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/report" className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  Report Waterlogging
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-slate-900">12,400+</span>
                  <span className="text-slate-500 ml-1">Citizens active in Jan-Setu</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100 relative z-10">
                <div className="bg-slate-950 rounded-[2rem] aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent" />
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                    <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Live Hotspot</div>
                      <div className="text-sm font-bold text-white">Minto Bridge Underpass</div>
                    </div>
                    <div className="bg-rose-600 px-3 py-1 rounded-full text-[10px] font-bold text-white animate-pulse">
                      CRITICAL DEPTH
                    </div>
                  </div>
                  {/* Mock Map Visual */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-cyan-500/20 rounded-full animate-ping" />
                    <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                      <Activity className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-400 rounded-full blur-3xl opacity-20" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-400 rounded-full blur-3xl opacity-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'MCD Zones', value: '12', icon: Globe },
              { label: 'IoT Sensors', value: '850+', icon: Zap },
              { label: 'Hotspots Tracked', value: '308', icon: AlertTriangle },
              { label: 'Response Time', value: '<15m', icon: Clock },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex p-3 bg-slate-50 rounded-2xl mb-4">
                  <stat.icon className="w-6 h-6 text-cyan-600" />
                </div>
                <div className="text-4xl font-black text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <h2 className="text-sm font-black text-cyan-600 uppercase tracking-[0.2em] mb-4">The Mission</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
              Bridging the gap between infrastructure and reality.
            </h3>
            <p className="text-xl text-slate-600 leading-relaxed">
              Delhi's drainage system was designed for 25mm/hr rainfall. Modern monsoon patterns frequently exceed this. Jal-Drishti provides the real-time intelligence needed to manage this hydrological disconnect.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Predictive Modeling',
                desc: 'Using historical data and real-time rainfall intensity to predict waterlogging before it happens.',
                icon: BarChart3,
                color: 'bg-blue-50 text-blue-600'
              },
              {
                title: 'Resource Allocation',
                desc: 'Dynamic dispatch of portable pumps and field staff to critical hotspots based on live sensor data.',
                icon: Database,
                color: 'bg-cyan-50 text-cyan-600'
              },
              {
                title: 'Citizen Empowerment',
                desc: 'Jan-Setu gamifies civic reporting, turning every citizen into a "Flood Warrior" for their community.',
                icon: Users,
                color: 'bg-emerald-50 text-emerald-600'
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-[2rem] border border-slate-100 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-50/50 transition-all group">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", feature.color)}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Section */}
      <section id="data" className="py-32 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 50 Q 25 40 50 50 T 100 50" stroke="white" fill="none" strokeWidth="0.1" />
            <path d="M0 60 Q 25 50 50 60 T 100 60" stroke="white" fill="none" strokeWidth="0.1" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-sm font-black text-cyan-400 uppercase tracking-[0.2em] mb-4">Hydrology Data</h2>
              <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                Real-time Situational Awareness.
              </h3>
              <div className="space-y-8">
                {[
                  { title: 'Yamuna Water Levels', value: '204.5m', status: 'Safe', color: 'text-emerald-400' },
                  { title: 'Avg. Rainfall Intensity', value: '32mm/hr', status: 'Above Threshold', color: 'text-amber-400' },
                  { title: 'Drainage Load', value: '88%', status: 'High', color: 'text-rose-400' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-400 font-bold text-sm">{item.title}</span>
                      <span className={cn("text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/5", item.color)}>
                        {item.status}
                      </span>
                    </div>
                    <div className="text-3xl font-black">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-cyan-500/10 rounded-full flex items-center justify-center border border-cyan-500/20">
                <div className="w-3/4 h-3/4 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/30 animate-pulse">
                  <div className="w-1/2 h-1/2 bg-cyan-500/40 rounded-full flex items-center justify-center border border-cyan-500/50">
                    <Database className="w-16 h-16 text-cyan-400" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white text-slate-900 p-8 rounded-3xl shadow-2xl max-w-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div className="font-black text-sm">AI Prediction</div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "Based on current precipitation at Palam, we expect waterlogging at Dhaula Kuan within 25 minutes."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-black text-rose-600 uppercase tracking-[0.2em] mb-4">Safety Protocols</h2>
            <h3 className="text-4xl font-black text-slate-900 mb-6">Stay Safe, Stay Informed.</h3>
            <p className="text-slate-600">Critical guidelines for citizens during heavy rainfall and flooding events in the NCT.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Electrical Safety', icon: Zap, desc: 'Avoid touching poles or submerged wires.' },
              { title: 'Vehicle Safety', icon: Shield, desc: 'Do not drive through water deeper than 6 inches.' },
              { title: 'Health Alerts', icon: Activity, desc: 'Prevent water-borne diseases post-flooding.' },
              { title: 'Emergency Kit', icon: ShieldCheck, desc: 'Keep essential documents and supplies ready.' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all">
                <item.icon className="w-10 h-10 text-rose-600 mb-6" />
                <h4 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-cyan-600 p-1.5 rounded-lg">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight">Jal-Drishti</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                The official unified flood resilience platform for the Municipal Corporation of Delhi. Empowering citizens and officials through data.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6">Quick Links</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">About MCD</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6">Emergency</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> MCD: 155305</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> Flood Control: 011-21210867</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> PWD: 011-23490323</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 Municipal Corporation of Delhi. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Designed for Resilience</span>
              <span>Digital India Initiative</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Ticker */}
      <div className="fixed bottom-0 w-full bg-slate-900 py-2 z-50 overflow-hidden whitespace-nowrap border-t border-white/10">
        <div className="flex animate-marquee gap-12 items-center">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-12 items-center">
              <span className="text-cyan-400 font-bold text-[10px] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                LIVE: HEAVY RAINFALL IN CENTRAL ZONE
              </span>
              <span className="text-white font-bold text-[10px]">YAMUNA LEVEL: 204.5M (SAFE)</span>
              <span className="text-emerald-400 font-bold text-[10px]">MINTO BRIDGE: CLEARED</span>
              <span className="text-rose-400 font-bold text-[10px]">ALERT: WATERLOGGING AT ZAKHIRA FLYOVER</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
