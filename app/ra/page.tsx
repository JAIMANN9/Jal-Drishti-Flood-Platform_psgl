'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Droplets, 
  LayoutDashboard, 
  FilePlus, 
  LogOut, 
  Search,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCcw,AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function UserDashboard() {
  const pathname = usePathname();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load reports from LocalStorage
  const loadData = () => {
    const savedReports = JSON.parse(localStorage.getItem("userReports") || "[]");
    
    // Default mock data if localStorage is empty
    if (savedReports.length === 0) {
      const defaultData = [
        {
          id: "JAL/E/2026/0013399",
          receivedDate: "11/01/2026",
          location: "Minto Bridge Underpass",
          description: "Severe waterlogging reported due to heavy monsoon rains.",
          status: "Resolved",
          depth: "waist"
        }
      ];
      setReports(defaultData);
      localStorage.setItem("userReports", JSON.stringify(defaultData));
    } else {
      setReports(savedReports);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Calculate stats dynamically based on current reports
  const stats = [
    { 
      label: 'Total Reports', 
      value: reports.length, 
      icon: FilePlus, 
      color: 'bg-gradient-to-br from-orange-400 to-orange-600' 
    },
    { 
      label: 'Pending Actions', 
      value: reports.filter(r => r.status === "Pending").length, 
      icon: Clock, 
      color: 'bg-gradient-to-br from-emerald-400 to-emerald-600' 
    },
    { 
      label: 'Reports Resolved', 
      value: reports.filter(r => r.status === "Resolved").length, 
      icon: CheckCircle2, 
      color: 'bg-gradient-to-br from-rose-400 to-rose-600' 
    },
  ];

  const sidebarLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, href: "/dashboard" },
    { name: 'Report Waterlogging', icon: FilePlus, href: "/report" },
    { name: 'Request De-silting', icon: Droplets, href: "/sliting" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-xl sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-cyan-600 p-1.5 rounded-lg">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Jal-Drishti</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                  isActive 
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/40" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link 
            href="/" 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800">Citizen Dashboard</h2>
            <button 
              onClick={loadData}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
              title="Refresh Data"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Welcome back,</p>
              <p className="text-sm font-bold text-slate-900">JAI MANN</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-cyan-100 border-2 border-white shadow-sm flex items-center justify-center text-cyan-700 font-bold">
              JM
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Dynamic Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={stat.label}
                className={cn("relative overflow-hidden rounded-[2rem] p-8 text-white shadow-xl", stat.color)}
              >
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                    <h3 className="text-5xl font-black">{stat.value}</h3>
                  </div>
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
              </motion.div>
            ))}
          </div>

          {/* Dynamic Table Section */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
              <div>
                <h3 className="text-lg font-bold text-slate-900">List of My Reports</h3>
                <p className="text-xs text-slate-500">View and track your real-time waterlogging submissions</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search Registration No..."
                  className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 w-full md:w-72 shadow-sm"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-[0.15em] border-b border-slate-200">
                    <th className="px-6 py-5">Sn.</th>
                    <th className="px-6 py-5">Registration Number</th>
                    <th className="px-6 py-5">Received Date</th>
                    <th className="px-6 py-5">Location & Issue</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-6 py-5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reports.map((report, index) => (
                    <tr key={report.id} className="hover:bg-cyan-50/30 transition-colors group">
                      <td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-bold text-cyan-600">
                        {report.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{report.receivedDate}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 max-w-sm">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800">{report.location}</span>
                          <span className="text-xs text-slate-400 truncate italic">"{report.description}"</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm border",
                          report.status === "Resolved" 
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                            : "bg-amber-100 text-amber-700 border-amber-200"
                        )}>
                          {report.status === "Resolved" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3 animate-pulse" />}
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all border border-transparent hover:border-slate-100">
                          <MoreHorizontal className="w-5 h-5 text-slate-400 group-hover:text-cyan-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {reports.length === 0 && !loading && (
                <div className="py-20 text-center">
                  <AlertTriangle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400 font-medium">No reports found in your records.</p>
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-50/30 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
              <p className="font-medium italic text-xs">Showing {reports.length} of {reports.length} entries</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-white transition-colors font-bold text-[10px] uppercase">Prev</button>
                <button className="w-10 h-10 bg-slate-900 text-white rounded-xl shadow-lg font-bold text-xs">1</button>
                <button className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-white transition-colors font-bold text-[10px] uppercase">Next</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}