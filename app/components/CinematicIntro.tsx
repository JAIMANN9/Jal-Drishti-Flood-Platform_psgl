'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DelhiMap from './DelhiMap';

interface CinematicIntroProps {
    onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
    const [phase, setPhase] = useState(0);
    const [isSkipping, setIsSkipping] = useState(false);

    // Animation timeline phases
    // Phase 0: 0-5s - First text
    // Phase 1: 5-10s - Second text (morphing)
    // Phase 2: 10-15s - Map appears
    // Phase 3: 15-25s - Zones light up
    // Phase 4: 25-30s - Zoom transition
    // Phase 5: Complete

    useEffect(() => {
        if (isSkipping) {
            onComplete();
            return;
        }

        const timings = [5000, 5000, 5000, 10000, 5000];

        if (phase < 5) {
            const timer = setTimeout(() => {
                if (phase === 4) {
                    onComplete();
                } else {
                    setPhase(p => p + 1);
                }
            }, timings[phase]);

            return () => clearTimeout(timer);
        }
    }, [phase, isSkipping, onComplete]);

    const handleSkip = () => {
        setIsSkipping(true);
        onComplete();
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.8 }
        }
    };

    const zoomVariants = {
        initial: { scale: 1, opacity: 1 },
        zooming: {
            scale: 15,
            opacity: 0,
            transition: { duration: 2.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
        }
    };

    return (
        <motion.div
            className="fixed inset-0 bg-slate-950 z-50 overflow-hidden"
            initial={{ opacity: 1 }}
            animate={phase === 4 ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 1.5, delay: phase === 4 ? 2 : 0 }}
        >
            {/* Sparkles background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                        }}
                    />
                ))}
            </div>

            {/* Glowing border effect */}
            <div className="absolute inset-4 border border-cyan-500/20 rounded-lg pointer-events-none">
                <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent)',
                        backgroundSize: '200% 100%',
                    }}
                    animate={{
                        backgroundPosition: ['200% 0', '-200% 0'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            </div>

            {/* Skip button */}
            <motion.button
                className="absolute top-6 right-6 z-50 px-4 py-2 text-sm font-medium text-slate-400 
                   hover:text-white border border-slate-700 hover:border-cyan-500/50 
                   rounded-full transition-all duration-300 backdrop-blur-sm
                   hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={handleSkip}
            >
                Skip Intro →
            </motion.button>

            {/* Main content container */}
            <motion.div
                className="relative h-full flex flex-col items-center justify-center px-6"
                variants={zoomVariants}
                initial="initial"
                animate={phase === 4 ? "zooming" : "initial"}
            >
                {/* Phase 0 & 1: Text sequences */}
                <AnimatePresence mode="wait">
                    {phase === 0 && (
                        <motion.div
                            key="text1"
                            className="text-center max-w-4xl"
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-thin text-white tracking-wide leading-relaxed">
                                Delhi faces <span className="text-cyan-400 font-light">600mm</span> of rain annually...
                            </h1>
                        </motion.div>
                    )}

                    {phase === 1 && (
                        <motion.div
                            key="text2"
                            className="text-center max-w-4xl"
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-thin tracking-wide leading-relaxed">
                                <span className="text-white">...but </span>
                                <motion.span
                                    className="font-light"
                                    initial={{ color: '#ffffff' }}
                                    animate={{ color: '#f59e0b' }}
                                    transition={{ duration: 2, delay: 1 }}
                                >
                                    40%
                                </motion.span>
                                <span className="text-white"> is lost to </span>
                                <motion.span
                                    className="font-light"
                                    initial={{ color: '#ffffff' }}
                                    animate={{ color: '#f59e0b' }}
                                    transition={{ duration: 2, delay: 1.5 }}
                                >
                                    waterlogging.
                                </motion.span>
                            </h1>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Phase 2 & 3: Map with zones */}
                <AnimatePresence>
                    {(phase === 2 || phase === 3 || phase === 4) && (
                        <motion.div
                            key="map"
                            className="absolute inset-0 flex flex-col items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {/* Map container */}
                            <div className="w-full max-w-2xl h-[50vh] md:h-[60vh]">
                                <DelhiMap
                                    isVisible={phase >= 2}
                                    showZones={phase >= 3}
                                />
                            </div>

                            {/* Phase 3 text */}
                            <AnimatePresence>
                                {phase >= 3 && (
                                    <motion.div
                                        className="absolute bottom-20 md:bottom-32 text-center px-6"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    >
                                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-thin text-white tracking-wide">
                                            Be the <span className="text-cyan-400 font-light">eyes</span> of your city.
                                        </h2>
                                        <motion.p
                                            className="mt-4 text-sm md:text-base text-slate-400 font-medium"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1.5 }}
                                        >
                                            Report. Monitor. Protect.
                                        </motion.p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Progress indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={i}
                            className="h-1 rounded-full bg-slate-700 overflow-hidden"
                            style={{ width: i === phase ? 32 : 8 }}
                            animate={{ width: i === phase ? 32 : 8 }}
                            transition={{ duration: 0.3 }}
                        >
                            {i === phase && (
                                <motion.div
                                    className="h-full bg-cyan-500"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{
                                        duration: i === 3 ? 10 : 5,
                                        ease: 'linear'
                                    }}
                                />
                            )}
                            {i < phase && (
                                <div className="h-full w-full bg-cyan-500" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-cyan-500/30" />
            <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-cyan-500/30" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-cyan-500/30" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-cyan-500/30" />

            {/* Scan line effect */}
            <motion.div
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent pointer-events-none"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
        </motion.div>
    );
}
