'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Waves, 
  Truck, 
  Users, 
  Settings, 
  Bell,
  Search,
  AlertCircle,
  Droplets,
  Zap,
  ArrowUpRight,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MCD_ZONES, DASHBOARD_METRICS, HOTSPOTS, Hotspot } from '@/lib/data';
import dynamic from 'next/dynamic';
import 'mapbox-gl/dist/mapbox-gl.css';

// Dynamically import Map to prevent SSR issues that can cause connection resets
const Map = dynamic(() => import('react-map-gl').then(mod => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
        <p className="text-slate-500 text-sm font-medium">Initializing Digital Twin...</p>
      </div>
    </div>
  )
});

import { Marker, Source, Layer, NavigationControl } from 'react-map-gl';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1Ijoib3BlbmJ1aWxkZXIiLCJhIjoiY203eXN6Z2ZpMGN6eTJqcHh6Z2Z6Z2Z6eiJ9.Z2Z6Z2Z6Z2Z6Z2Z6Z2Z6Z2';

export default function DashboardPage() {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [viewState, setViewState] = useState({
    longitude: 77.2090,
    latitude: 28.6139,
    zoom: 11
  });

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
        className="border-r border-slate-800 flex flex-col bg-slate-950 z-30"
      >
        <div className="p-6 flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <div className="bg-cyan-600 p-1.5 rounded-lg shrink-0">
            <Waves className="w-6 h-6 text-white" />
          </div>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl font-bold tracking-tight text-white"
              >
                Jal-Drishti
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-hidden">
          {[
            { name: 'Live Overview', icon: LayoutDashboard, active: true },
            { name: 'Digital Twin Map', icon: MapIcon },
            { name: 'Zone Monitor', icon: Waves },
            { name: 'Asset Tracker', icon: Truck },
            { name: 'Staff Deployment', icon: Users },
          ].map((item) => (
            <button
              key={item.name}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                item.active 
                  ? "bg-cyan-600/10 text-cyan-400 border border-cyan-600/20" 
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900 transition-all"
          >
            <MoreVertical className={cn("w-5 h-5 shrink-0 transition-transform", !isSidebarOpen && "rotate-90")} />
            {isSidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-4 md:px-8 bg-slate-950/50 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-4 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 w-full max-w-md hidden sm:flex">
            <Search className="w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search zones, pumps, or staff..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-950" 
              />
            </button>
            <div className="h-8 w-px bg-slate-800 mx-1 md:mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden xs:block">
                <div className="text-sm font-bold text-white">Admin Control</div>
                <div className="text-xs text-slate-500">MCD HQ</div>
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center font-bold text-cyan-500 shrink-0">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          {/* Metrics HUD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            <MetricCard 
              title="Active Hotspots" 
              value={DASHBOARD_METRICS.activeHotspots} 
              badge={DASHBOARD_METRICS.hotspotTrend} 
              color="rose"
              icon={AlertCircle}
              urgent={true}
            />
            <MetricCard 
              title="Rainfall Intensity" 
              value={`${DASHBOARD_METRICS.rainfallIntensity} mm/hr`} 
              badge={`Threshold: ${DASHBOARD_METRICS.rainfallThreshold}`} 
              color={DASHBOARD_METRICS.rainfallIntensity > DASHBOARD_METRICS.rainfallThreshold ? "amber" : "cyan"}
              icon={Droplets}
            />
            <MetricCard 
              title="Pump Capacity" 
              value={`${DASHBOARD_METRICS.pumpCapacity}%`} 
              badge={`${DASHBOARD_METRICS.pumpsDeployed}/${DASHBOARD_METRICS.totalPumps} Deployed`} 
              color="cyan"
              icon={Zap}
            />
            <MetricCard 
              title="Field Staff" 
              value={DASHBOARD_METRICS.fieldStaff} 
              badge={DASHBOARD_METRICS.staffStatus} 
              color="emerald"
              icon={Users}
            />
          </motion.div>

          {/* Digital Twin Map Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden h-[400px] md:h-[600px] relative"
          >
            <div className="absolute top-4 left-4 z-10 bg-slate-950/90 backdrop-blur-sm p-4 rounded-xl border border-slate-800">
              <h3 className="text-white font-bold mb-2">Digital Twin Map</h3>
              <p className="text-slate-500 text-sm">Real-time water logging monitoring</p>
            </div>

            {mounted ? (
              <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
                style={{ width: '100%', height: '100%' }}
              >
                <NavigationControl position="bottom-right" />
                
                <Source id="water-data" type="geojson" data={{
                  type: 'FeatureCollection',
                  features: []
                }}>
                  <Layer
                    id="water-extrusion"
                    type="fill-extrusion"
                    paint={{
                      'fill-extrusion-color': ['get', 'color'],
                      'fill-extrusion-height': ['get', 'height'],
                      'fill-extrusion-base': ['get', 'base_height'],
                      'fill-extrusion-opacity': 0.8
                    }}
                  />
                </Source>

                {HOTSPOTS.map(hotspot => (
                  <Marker
                    key={hotspot.id}
                    latitude={hotspot.lat}
                    longitude={hotspot.lng}
                    anchor="bottom"
                    onClick={e => {
                      e.originalEvent.stopPropagation();
                      setSelectedHotspot(hotspot);
                    }}
                  >
                    <div className="cursor-pointer group">
                      <div className={cn(
                        "w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-110",
                        hotspot.status === 'CRITICAL' ? "bg-rose-600" : hotspot.status === 'ALERT' ? "bg-amber-600" : "bg-cyan-600"
                      )}>
                        <AlertCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-950 text-white text-[10px] font-bold px-2 py-1 rounded border border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {hotspot.name}
                      </div>
                    </div>
                  </Marker>
                ))}
              </Map>
            ) : (
              <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
              </div>
            )}

            {/* Tactical Drawer */}
            {selectedHotspot && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4 bg-slate-950/95 backdrop-blur-sm p-4 rounded-xl border border-slate-800"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-bold">{selectedHotspot.name}</h4>
                    <p className="text-slate-500 text-sm mt-1">{selectedHotspot.location}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedHotspot(null)}
                    className="text-slate-500 hover:text-white"
                  >
                    ×
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Status</div>
                    <div className={cn(
                      "text-sm font-bold mt-1",
                      selectedHotspot.status === 'CRITICAL' ? "text-rose-400" : 
                      selectedHotspot.status === 'ALERT' ? "text-amber-400" : "text-cyan-400"
                    )}>
                      {selectedHotspot.status}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Water Level</div>
                    <div className="text-sm font-bold text-white mt-1">{selectedHotspot.waterLevel}m</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Last Updated</div>
                    <div className="text-sm font-bold text-white mt-1">{selectedHotspot.lastUpdated}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Zone Monitoring Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Zone-Wise Monitoring
                <span className="text-xs font-normal text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">12 Zones</span>
              </h2>
              <button className="text-sm text-cyan-500 hover:underline text-left">View Detailed Report</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {MCD_ZONES.map((zone, index) => (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <ZoneCard zone={zone} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, badge, color, icon: Icon, urgent }: any) {
  const colors: any = {
    rose: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    cyan: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={cn(
        "bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group",
        urgent && "ring-1 ring-rose-500/30"
      )}
    >
      {urgent && (
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-rose-500/10 pointer-events-none"
        />
      )}
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-2 rounded-lg", colors[color])}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={cn("text-xs font-bold px-2 py-1 rounded-full", colors[color])}>
          {badge}
        </span>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-500 font-medium">{title}</div>
      
      {/* Decorative background element */}
      <div className={cn("absolute -right-4 -bottom-4 w-24 h-24 opacity-5 transition-transform group-hover:scale-110", colors[color].split(' ')[0].replace('text', 'bg'))} style={{ borderRadius: '50%' }} />
    </motion.div>
  );
}

function ZoneCard({ zone }: { zone: any }) {
  const statusColors = {
    Critical: "bg-rose-500",
    Warning: "bg-amber-500",
    Stable: "bg-emerald-500",
  };

  const riskColors = {
    High: "text-rose-400",
    Med: "text-amber-400",
    Low: "text-emerald-400",
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-white">{zone.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className={cn("w-2 h-2 rounded-full animate-pulse", statusColors[zone.status as keyof typeof statusColors])} />
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">{zone.status}</span>
          </div>
        </div>
        <button className="text-slate-600 hover:text-white">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
          <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Risk Level</div>
          <div className={cn("text-sm font-bold", riskColors[zone.risk as keyof typeof riskColors])}>{zone.risk}</div>
        </div>
        <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
          <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Complaints</div>
          <div className="text-sm font-bold text-white">{zone.complaints}</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500">Rainfall Intensity</span>
          <span className="text-cyan-400 font-bold">{zone.rainfall} mm/hr</span>
        </div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((zone.rainfall / 50) * 100, 100)}%` }}
            className={cn("h-full", zone.rainfall > 25 ? "bg-rose-500" : "bg-cyan-500")}
          />
        </div>
        
        {zone.pumpDeficit > 0 && (
          <div className="flex items-center gap-2 text-[10px] font-bold text-rose-400 bg-rose-400/10 p-2 rounded border border-rose-400/20">
            <AlertCircle className="w-3 h-3" />
            NEEDS +{zone.pumpDeficit} PUMPS IMMEDIATELY
          </div>
        )}
      </div>
    </motion.div>
  );
}
