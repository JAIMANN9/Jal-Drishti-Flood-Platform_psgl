'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DelhiMapProps {
    isVisible: boolean;
    showZones: boolean;
}

export default function DelhiMap({ isVisible, showZones }: DelhiMapProps) {
    // Simplified Delhi map with 12 MCD zones represented as polygons
    const zones = [
        { id: 'central', name: 'Central', d: 'M180 160 L200 150 L220 160 L220 190 L200 200 L180 190 Z' },
        { id: 'city-sp', name: 'City-SP', d: 'M200 200 L220 190 L240 200 L240 230 L220 240 L200 230 Z' },
        { id: 'civil-lines', name: 'Civil Lines', d: 'M160 130 L180 120 L200 130 L200 150 L180 160 L160 150 Z' },
        { id: 'karol-bagh', name: 'Karol Bagh', d: 'M140 160 L160 150 L180 160 L180 190 L160 200 L140 190 Z' },
        { id: 'keshav-puram', name: 'Keshav Puram', d: 'M120 130 L140 120 L160 130 L160 150 L140 160 L120 150 Z' },
        { id: 'najafgarh', name: 'Najafgarh', d: 'M80 200 L120 180 L140 200 L140 250 L120 270 L80 250 Z' },
        { id: 'narela', name: 'Narela', d: 'M160 60 L200 50 L220 70 L210 100 L180 110 L160 90 Z' },
        { id: 'n-shahdara', name: 'N.Shahdara', d: 'M240 130 L270 120 L290 140 L280 170 L250 180 L240 160 Z' },
        { id: 'rohini', name: 'Rohini', d: 'M100 90 L140 70 L160 90 L160 130 L140 140 L100 130 Z' },
        { id: 's-shahdara', name: 'S.Shahdara', d: 'M250 180 L280 170 L300 190 L290 220 L260 230 L250 210 Z' },
        { id: 'south', name: 'South', d: 'M180 250 L220 240 L250 260 L240 300 L200 310 L170 290 Z' },
        { id: 'west', name: 'West', d: 'M100 180 L120 170 L140 180 L140 220 L120 240 L100 220 Z' },
    ];

    const containerVariants = {
        hidden: { opacity: 0, rotateY: -90, scale: 0.8 },
        visible: {
            opacity: 1,
            rotateY: 0,
            scale: 1,
            transition: {
                duration: 2,
                ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
            }
        }
    };

    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i: number) => ({
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 1.5, delay: i * 0.1 },
                opacity: { duration: 0.5, delay: i * 0.1 }
            }
        })
    };

    const zoneGlowVariants = {
        idle: {
            fill: 'rgba(6, 182, 212, 0.1)',
            stroke: 'rgba(6, 182, 212, 0.6)'
        },
        alert: {
            fill: 'rgba(239, 68, 68, 0.3)',
            stroke: 'rgba(239, 68, 68, 1)',
            transition: {
                duration: 0.5,
                repeat: Infinity,
                repeatType: 'reverse' as const
            }
        }
    };

    return (
        <motion.div
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: '1000px' }}
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
        >
            {/* Glow backdrop */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 md:w-96 md:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            </div>

            {/* SVG Map */}
            <svg
                viewBox="0 0 380 360"
                className="w-full max-w-lg h-auto relative z-10"
                style={{ filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))' }}
            >
                {/* Definitions for glow effects */}
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="redGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feFlood floodColor="#ef4444" floodOpacity="0.5" />
                        <feComposite in2="coloredBlur" operator="in" />
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Outer boundary - Delhi NCT */}
                <motion.path
                    d="M60 100 Q80 40 160 30 Q250 20 300 80 Q340 140 320 220 Q300 300 220 330 Q140 350 80 290 Q40 230 50 160 Q55 120 60 100"
                    fill="none"
                    stroke="rgba(6, 182, 212, 0.4)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    variants={pathVariants}
                    custom={0}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    filter="url(#glow)"
                />

                {/* Zone polygons */}
                {zones.map((zone, index) => (
                    <motion.path
                        key={zone.id}
                        d={zone.d}
                        fill={showZones ? 'rgba(239, 68, 68, 0.2)' : 'rgba(6, 182, 212, 0.1)'}
                        stroke={showZones ? 'rgba(239, 68, 68, 0.8)' : 'rgba(6, 182, 212, 0.6)'}
                        strokeWidth="1.5"
                        variants={pathVariants}
                        custom={index + 1}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        whileHover={{ fill: showZones ? 'rgba(239, 68, 68, 0.4)' : 'rgba(6, 182, 212, 0.3)', scale: 1.02 }}
                        style={{
                            filter: showZones ? 'url(#redGlow)' : 'url(#glow)',
                            cursor: 'pointer'
                        }}
                    />
                ))}

                {/* Grid lines for wireframe effect */}
                {[80, 140, 200, 260, 320].map((x, i) => (
                    <motion.line
                        key={`v-${i}`}
                        x1={x}
                        y1="30"
                        x2={x}
                        y2="330"
                        stroke="rgba(6, 182, 212, 0.15)"
                        strokeWidth="0.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isVisible ? 1 : 0 }}
                        transition={{ delay: 1.5 + i * 0.1 }}
                    />
                ))}
                {[60, 120, 180, 240, 300].map((y, i) => (
                    <motion.line
                        key={`h-${i}`}
                        x1="50"
                        y1={y}
                        x2="330"
                        y2={y}
                        stroke="rgba(6, 182, 212, 0.15)"
                        strokeWidth="0.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isVisible ? 1 : 0 }}
                        transition={{ delay: 1.5 + i * 0.1 }}
                    />
                ))}

                {/* Yamuna River */}
                <motion.path
                    d="M280 60 Q300 100 290 150 Q275 200 290 250 Q300 290 280 330"
                    fill="none"
                    stroke="rgba(34, 211, 238, 0.6)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    variants={pathVariants}
                    custom={14}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                />

                {/* Pulse points for hotspots when zones are shown */}
                {showZones && (
                    <>
                        <motion.circle
                            cx="190"
                            cy="175"
                            r="6"
                            fill="#ef4444"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.circle
                            cx="110"
                            cy="220"
                            r="6"
                            fill="#ef4444"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                        />
                        <motion.circle
                            cx="260"
                            cy="200"
                            r="6"
                            fill="#ef4444"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                        />
                    </>
                )}
            </svg>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-cyan-500/50" />
            <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-cyan-500/50" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-cyan-500/50" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-cyan-500/50" />
        </motion.div>
    );
}
