"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// --- LEAFLET IMPORTS ---
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

// Fix for default marker icons in Leaflet + Next.js
const customIcon = typeof window !== 'undefined' ? new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
}) : null;

interface Zone {
  id: number;
  name: string;
  risk: string;
  waterLevel: string;
  status: string;
  coords: [number, number]; // Strictly defining as a tuple
}

const zonesData: Zone[] = [
  { id: 1, name: "Civil Lines", risk: "High", waterLevel: "0.8m", status: "Critical", coords: [28.6814, 77.2225] },
  { id: 2, name: "Rohini", risk: "Low", waterLevel: "0.1m", status: "Normal", coords: [28.7041, 77.1025] },
  { id: 3, name: "Najafgarh", risk: "High", waterLevel: "1.2m", status: "Critical", coords: [28.609, 76.985] },
  { id: 4, name: "South Delhi", risk: "Medium", waterLevel: "0.4m", status: "Watch", coords: [28.5273, 77.209] },
  { id: 5, name: "Shahdara", risk: "High", waterLevel: "0.9m", status: "Critical", coords: [28.6738, 77.2911] },
  { id: 6, name: "West Delhi", risk: "Medium", waterLevel: "0.3m", status: "Watch", coords: [28.6675, 77.1239] },
];

function RecenterMap({ coords }: { coords: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 12, { animate: true });
  }, [coords, map]);
  return null;
}

export default function ZoneMapsPage() {
  const [selectedZone, setSelectedZone] = useState<Zone>(zonesData[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 font-sans">
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-[60%] h-[60%] bg-blue-600/10 blur-[120px] rounded-full" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <Link href="/" className="group inline-flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
              Back to Resources
            </Link>
            <h1 className="text-5xl font-black text-white tracking-tight">
              Zone <span className="text-blue-500">Heatmaps</span>
            </h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 h-[700px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-8 relative bg-slate-900 border border-white/5 rounded-[3.5rem] overflow-hidden shadow-2xl"
          >
            {mounted ? (
              <MapContainer 
                center={selectedZone.coords as LatLngExpression} 
                zoom={11} 
                className="h-full w-full z-0"
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                
                <RecenterMap coords={selectedZone.coords as LatLngExpression} />

                {zonesData.map((zone) => (
                  <React.Fragment key={zone.id}>
                    <Circle 
                      center={zone.coords as LatLngExpression}
                      radius={1500}
                      pathOptions={{
                        fillColor: zone.risk === "High" ? "#ef4444" : zone.risk === "Medium" ? "#3b82f6" : "#10b981",
                        color: "transparent",
                        fillOpacity: 0.4
                      }}
                    />
                    <Marker position={zone.coords as LatLngExpression} icon={customIcon ?? undefined}>
                      <Popup>
                        <div className="p-2 text-slate-900">
                          <strong className="block text-lg">{zone.name}</strong>
                          <span className="text-red-600 font-bold">Water: {zone.waterLevel}</span>
                        </div>
                      </Popup>
                    </Marker>
                  </React.Fragment>
                ))}
              </MapContainer>
            ) : (
              <div className="h-full w-full bg-slate-900 flex items-center justify-center text-slate-500">
                Loading Map...
              </div>
            )}
          </motion.div>

          <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-6 flex flex-col h-full">
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {zonesData.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={cn(
                      "w-full text-left p-5 rounded-3xl border transition-all flex justify-between items-center",
                      selectedZone.id === zone.id 
                        ? "bg-blue-600/20 border-blue-500/50" 
                        : "bg-white/5 border-transparent hover:border-white/10"
                    )}
                  >
                    <div>
                      <h4 className="text-white font-bold text-sm">{zone.name}</h4>
                      <p className="text-slate-500 text-[10px] uppercase font-black">{zone.status}</p>
                    </div>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedZone.id}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mt-6 p-6 bg-gradient-to-br from-slate-800 to-slate-950 rounded-[2rem] border border-white/10"
                >
                  <p className="text-white font-bold">{selectedZone.name}</p>
                  <p className="text-blue-400 font-mono text-sm">{selectedZone.waterLevel} accumulation</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}