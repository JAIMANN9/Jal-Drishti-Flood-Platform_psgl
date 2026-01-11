'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Droplets,
  ChevronDown,
  AlertTriangle,
  Users,
  ShieldCheck,
  Phone,
  Map as MapIcon,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Project', href: '/about' },
  { name: 'Hydrology Data', href: '/hydrology-data' },
  { name: 'Safety Protocols', href: '/saf-guid' },
];

const services = [
  { name: 'Report Waterlogging', icon: AlertTriangle, href: '/report' },
  { name: 'Request De-silting', icon: Droplets, href: '/sliting' },
  { name: 'Volunteer Registration', icon: Users, href: '/vol-reg' },
];

const resources = [
  { name: 'Safety Guides', icon: ShieldCheck, desc: 'Electrical & Vehicle Safety', href: '/saf-guid' },
  { name: 'Emergency Contacts', icon: Phone, desc: 'MCD, PWD, Flood Control', href: '/emg-contact' },
  { name: 'Zone Maps', icon: MapIcon, desc: '12 MCD Administrative Zones', href: '/zoneMap' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b",
      scrolled
        ? "bg-white/95 backdrop-blur-md border-border py-3 shadow-sm"
        : "bg-transparent border-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-cyan-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">Jal-Drishti</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors",
                isActive(link.href)
                  ? "text-accent"
                  : "text-foreground-muted hover:text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* Services Dropdown */}
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-semibold text-foreground-muted group-hover:text-primary transition-colors">
              Services <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
              {services.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="w-full flex items-center gap-3 p-3 hover:bg-background-secondary rounded-lg transition-colors text-left"
                >
                  <item.icon className="w-5 h-5 text-accent" />
                  <span className="text-sm font-bold text-primary">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Resources Dropdown */}
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-semibold text-foreground-muted group-hover:text-primary transition-colors">
              Resources <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
              {resources.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="w-full flex items-center gap-3 p-3 hover:bg-background-secondary rounded-lg transition-colors text-left"
                >
                  <item.icon className="w-5 h-5 text-accent" />
                  <div>
                    <div className="text-sm font-bold text-primary">{item.name}</div>
                    <div className="text-xs text-foreground-muted">{item.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/report"
            className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-rose-900/30"
          >
            Emergency Report
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border"
          >
            <div className="px-6 py-4 space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "block py-3 text-sm font-semibold",
                    isActive(link.href) ? "text-accent" : "text-foreground-muted"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                <Link
                  href="/report"
                  className="block w-full text-center bg-rose-600 text-white px-6 py-3 rounded-xl text-sm font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Emergency Report
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
