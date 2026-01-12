'use client';

import React from 'react';
import { RainBackground } from './rain';
import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';

export default function HeroSection() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
      `}</style>

            <section className="w-full relative overflow-hidden font-poppins">
                <RainBackground
                    intensity={300}
                    speed={0.7}
                    angle={-5}
                    color="rgba(165, 243, 252, 0.4)" // Light cyan rain
                    dropSize={{ min: 1, max: 2 }}
                    lightningEnabled={true}
                    lightningFrequency={15}
                    className="w-full h-full min-h-[90vh] bg-slate-950 text-white"
                    thunderEnabled={false} // Disable sound by default for UX
                >
                    {/* Background Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gridBackground.png')] bg-no-repeat bg-cover bg-center opacity-20 pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 md:px-16 text-center pt-20">

                        {/* Announcement Pill */}
                        <div className="flex items-center gap-2 border border-slate-700 bg-slate-900/50 backdrop-blur-md rounded-full w-max mx-auto px-4 py-2 mb-10 hover:border-cyan-500/50 transition-colors cursor-default">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            <span className="text-sm text-cyan-100">Live Monsoon Monitoring 2026</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight max-w-5xl mx-auto leading-[1.1] mb-8">
                            Delhi's Digital Shield <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                                Against Flooding.
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Jal-Drishti is the National Capital's unified command platform for hydrological resilience, integrating IoT sensors, 3D digital twins, and citizen intelligence.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                            <Link href="/login" className="bg-white text-slate-950 px-8 py-4 rounded-full font-medium text-lg hover:bg-cyan-50 transition-colors flex items-center gap-2 group w-full sm:w-auto justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(165,243,252,0.5)]">
                                Access Command Center
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/report" className="flex items-center justify-center gap-2 border border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-950/30 text-white px-8 py-4 rounded-full font-medium text-lg transition-all w-full sm:w-auto backdrop-blur-sm">
                                <AlertTriangle className="w-5 h-5 text-rose-500" />
                                Report Waterlogging
                            </Link>
                        </div>
                    </div>
                </RainBackground>
            </section>
        </>
    );
}
