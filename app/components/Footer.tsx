'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Droplets, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <>
            {/* Main Footer - Light Theme */}
            <footer className="bg-slate-50 text-slate-900 py-16 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="bg-cyan-600 p-1.5 rounded-lg">
                                    <Droplets className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold tracking-tight text-slate-900">Jal-Drishti</span>
                            </div>
                            <p className="text-slate-600 max-w-sm leading-relaxed mb-6">
                                The official unified flood resilience platform for the Municipal Corporation of Delhi. Empowering citizens and officials through data.
                            </p>
                            <div className="flex gap-4">
                                <Link href="/about" className="text-sm text-slate-500 hover:text-cyan-600 transition-colors">About</Link>
                                <Link href="/hydrology-data" className="text-sm text-slate-500 hover:text-cyan-600 transition-colors">Hydrology</Link>
                                <Link href="/saf-guid" className="text-sm text-slate-500 hover:text-cyan-600 transition-colors">Safety</Link>
                            </div>
                        </div>
                        <div>
                            <h5 className="font-bold text-slate-900 mb-6">Quick Links</h5>
                            <ul className="space-y-4 text-slate-600 text-sm">
                                <li><Link href="/report" className="hover:text-cyan-600 transition-colors">Report Waterlogging</Link></li>
                                <li><Link href="/vol-reg" className="hover:text-cyan-600 transition-colors">Volunteer Registration</Link></li>
                                <li><Link href="/zoneMap" className="hover:text-cyan-600 transition-colors">Zone Maps</Link></li>
                                <li><Link href="/emg-contact" className="hover:text-cyan-600 transition-colors">Emergency Contacts</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold text-slate-900 mb-6">Emergency Hotlines</h5>
                            <ul className="space-y-4 text-slate-600 text-sm">
                                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-cyan-600" /> MCD: 155305</li>
                                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-cyan-600" /> Flood Control: 011-21210867</li>
                                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-cyan-600" /> PWD: 011-23490323</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                        <p>© 2026 Municipal Corporation of Delhi. All rights reserved.</p>
                        <div className="flex gap-6">
                            <span>Designed for Resilience</span>
                            <span>Digital India Initiative</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Live Ticker */}
            <div className="fixed bottom-0 w-full bg-slate-900 py-2 z-50 overflow-hidden whitespace-nowrap border-t border-slate-700">
                <motion.div
                    className="flex gap-12"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                >
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
                </motion.div>
            </div>
        </>
    );
}
