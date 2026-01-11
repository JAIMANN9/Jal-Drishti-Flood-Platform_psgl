'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Flashlight,
  Battery,
  Cookie,
  Stethoscope,
  FileText,
  Droplets,
  Radio,
  Shirt,
  Phone,
  Ambulance,
  Flame,
  Power,
  Home,
  HandHelping,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertTriangle,
  ShieldCheck,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ============ GO-BAG ITEMS ============
const goBagItems = [
  { id: 'torch', name: 'Torch / Flashlight', icon: Flashlight, essential: true },
  { id: 'batteries', name: 'Extra Batteries', icon: Battery, essential: true },
  { id: 'food', name: 'Dry Food (3 days)', icon: Cookie, essential: true },
  { id: 'firstaid', name: 'First Aid Kit', icon: Stethoscope, essential: true },
  { id: 'documents', name: 'Important Documents', icon: FileText, essential: true },
  { id: 'water', name: 'Water Bottles', icon: Droplets, essential: true },
  { id: 'radio', name: 'Battery-Powered Radio', icon: Radio, essential: false },
  { id: 'clothes', name: 'Change of Clothes', icon: Shirt, essential: false },
];

// ============ EVACUATION STEPS ============
const evacuationSteps = [
  {
    step: 1,
    title: 'Switch Off Main Power',
    description: 'Prevent electrical hazards by turning off the main circuit breaker.',
    icon: Power,
    color: 'text-amber-500'
  },
  {
    step: 2,
    title: 'Move to Higher Ground',
    description: 'Go to the roof or upper floors. Never stay in basements.',
    icon: Home,
    color: 'text-cyan-500'
  },
  {
    step: 3,
    title: 'Signal for Help',
    description: 'Wave bright cloth, use torch at night. Stay visible to rescuers.',
    icon: HandHelping,
    color: 'text-emerald-500'
  },
];

// ============ EMERGENCY CONTACTS ============
const emergencyContacts = [
  { name: 'MCD Helpline', number: '155305', icon: Phone, description: 'Municipal Corporation' },
  { name: 'Flood Control Room', number: '011-21210867', icon: Droplets, description: 'Central Flood Control' },
  { name: 'Ambulance', number: '102', icon: Ambulance, description: 'Medical Emergency' },
  { name: 'Fire Service', number: '101', icon: Flame, description: 'Fire & Rescue' },
];

// ============ INTERACTIVE CHECKLIST ============
const InteractiveChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const progress = Math.round((checkedItems.size / goBagItems.length) * 100);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white via-cyan-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Build Your <span className="text-cyan-600">Go-Bag</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Click each item to pack your emergency kit. Be ready before the rains come.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-slate-700">Readiness Score</span>
            <span className={cn(
              "text-lg font-bold transition-colors",
              progress === 100 ? "text-emerald-600" : "text-cyan-600"
            )}>
              {progress}%
            </span>
          </div>
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className={cn(
                "h-full rounded-full",
                progress === 100
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                  : "bg-gradient-to-r from-cyan-400 to-cyan-600"
              )}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          {progress === 100 && (
            <motion.p
              className="text-center text-emerald-600 font-bold mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✓ Your Go-Bag is Ready!
            </motion.p>
          )}
        </div>

        {/* Split Screen Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Backpack SVG */}
          <div className="lg:sticky lg:top-32">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
              <svg viewBox="0 0 200 220" className="w-full max-w-xs mx-auto">
                {/* Backpack body */}
                <rect x="40" y="60" width="120" height="140" rx="20" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                <rect x="55" y="40" width="90" height="30" rx="10" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />

                {/* Straps */}
                <path d="M50 60 Q30 100 40 140" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
                <path d="M150 60 Q170 100 160 140" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />

                {/* Pocket */}
                <rect x="60" y="140" width="80" height="45" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />

                {/* Items in bag */}
                {goBagItems.map((item, index) => {
                  const isChecked = checkedItems.has(item.id);
                  const row = Math.floor(index / 4);
                  const col = index % 4;
                  const x = 60 + col * 25;
                  const y = 75 + row * 30;

                  return (
                    <motion.circle
                      key={item.id}
                      cx={x}
                      cy={y}
                      r="8"
                      fill={isChecked ? "#06b6d4" : "#e2e8f0"}
                      initial={{ scale: 0 }}
                      animate={{ scale: isChecked ? 1 : 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  );
                })}
              </svg>
              <p className="text-center text-slate-500 mt-4 text-sm">
                {checkedItems.size} of {goBagItems.length} items packed
              </p>
            </div>
          </div>

          {/* Right: Item list */}
          <div className="space-y-3">
            {goBagItems.map((item, index) => {
              const isChecked = checkedItems.has(item.id);
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left",
                    isChecked
                      ? "bg-cyan-50 border-cyan-500 shadow-md"
                      : "bg-white border-slate-200 hover:border-cyan-300 hover:shadow-sm"
                  )}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    isChecked ? "bg-cyan-500" : "bg-slate-100"
                  )}>
                    <Icon className={cn("w-6 h-6", isChecked ? "text-white" : "text-slate-500")} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-bold transition-colors",
                      isChecked ? "text-cyan-700" : "text-slate-900"
                    )}>
                      {item.name}
                    </h3>
                    {item.essential && (
                      <span className="text-xs text-rose-500 font-semibold">Essential</span>
                    )}
                  </div>
                  <div className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
                    isChecked
                      ? "bg-cyan-500 border-cyan-500"
                      : "border-slate-300"
                  )}>
                    {isChecked && <Check className="w-5 h-5 text-white" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============ EVACUATION CAROUSEL ============
const EvacuationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % evacuationSteps.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + evacuationSteps.length) % evacuationSteps.length);
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Evacuation <span className="text-cyan-600">Steps</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            When waters rise, follow these steps to stay safe.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {evacuationSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.step}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-12 text-center max-w-2xl mx-auto hover:border-cyan-200 transition-colors">
                      <div className={cn(
                        "w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center",
                        step.color === 'text-amber-500' && "bg-amber-50",
                        step.color === 'text-cyan-500' && "bg-cyan-50",
                        step.color === 'text-emerald-500' && "bg-emerald-50"
                      )}>
                        <Icon className={cn("w-12 h-12", step.color)} strokeWidth={1.5} />
                      </div>
                      <div className="text-6xl font-black text-slate-200 mb-4">0{step.step}</div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                      <p className="text-lg text-slate-600">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-slate-600" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {evacuationSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors",
                  index === currentIndex ? "bg-cyan-500" : "bg-slate-300"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============ EMERGENCY CONTACTS GRID ============
const EmergencyContactsGrid = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Emergency <span className="text-rose-500">Contacts</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Save these numbers. They could save your life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {emergencyContacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.div
                key={contact.name}
                className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 text-center hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-slate-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-slate-600" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{contact.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{contact.description}</p>
                <motion.a
                  href={`tel:${contact.number.replace(/-/g, '')}`}
                  className="inline-flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-rose-700 transition-colors"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Phone className="w-5 h-5" />
                  {contact.number}
                </motion.a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============ MAIN PAGE ============
export default function SafetyGuidePage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-slate-900 pt-20 pb-16">
        {/* ============ SECTION 1: HERO ============ */}
        <section className="min-h-[80vh] flex items-center justify-center px-6 bg-gradient-to-b from-white to-cyan-50/30">
          <div className="max-w-4xl mx-auto text-center">
            {/* SVG Illustration */}
            <motion.svg
              viewBox="0 0 400 300"
              className="w-full max-w-md mx-auto mb-12"
              initial="hidden"
              animate="visible"
            >
              {/* Ground/hill */}
              <motion.path
                d="M0 280 Q100 220 200 240 Q300 260 400 220 L400 300 L0 300 Z"
                fill="#10b981"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              {/* Family figures */}
              <motion.circle cx="160" cy="180" r="15" fill="#0891b2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
              <motion.rect x="150" y="195" width="20" height="45" rx="5" fill="#0891b2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} />

              <motion.circle cx="200" cy="170" r="18" fill="#06b6d4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }} />
              <motion.rect x="188" y="188" width="24" height="55" rx="5" fill="#06b6d4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} />

              <motion.circle cx="240" cy="195" r="12" fill="#22d3ee" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9 }} />
              <motion.rect x="232" y="207" width="16" height="35" rx="4" fill="#22d3ee" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} />

              {/* Sun */}
              <motion.circle cx="350" cy="60" r="30" fill="#fbbf24" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.2 }} />

              {/* Water below */}
              <motion.path
                d="M0 300 Q50 290 100 295 Q150 300 200 295 Q250 290 300 295 Q350 300 400 295 L400 320 L0 320 Z"
                fill="#06b6d4"
                fillOpacity={0.3}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              />
            </motion.svg>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Surviving the <span className="text-cyan-600">Monsoon.</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Knowledge is your first line of defense. Follow this interactive guide to protect yourself and your family.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              className="mt-16"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-6 h-10 border-2 border-slate-400 rounded-full mx-auto flex justify-center pt-2">
                <motion.div
                  className="w-1.5 h-3 bg-cyan-500 rounded-full"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
              <p className="text-sm text-slate-500 mt-2">Scroll to begin</p>
            </motion.div>
          </div>
        </section>

        {/* ============ SECTION 2: GO-BAG BUILDER ============ */}
        <InteractiveChecklist />

        {/* ============ SECTION 3: DEPTH DANGER (Simplified) ============ */}
        <section className="py-24 px-6 bg-gradient-to-b from-cyan-50/50 to-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                The <span className="text-cyan-600">Depth Danger</span> Scale
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                How water depth affects your safety.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { level: 'Ankle Deep (15cm)', message: 'Safe to walk, but drive with caution.', color: 'border-emerald-500 bg-emerald-50', badge: 'bg-emerald-500' },
                { level: 'Knee Deep (45cm)', message: 'Cars will stall. Do not drive.', color: 'border-amber-500 bg-amber-50', badge: 'bg-amber-500' },
                { level: 'Waist Deep (90cm)', message: 'Current is strong enough to sweep you away. Evacuate immediately!', color: 'border-rose-500 bg-rose-50', badge: 'bg-rose-500' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={cn("p-6 rounded-2xl border-2", item.color)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn("w-4 h-4 rounded-full mt-1.5", item.badge)} />
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{item.level}</h3>
                      <p className="text-slate-600">{item.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SECTION 4: EVACUATION STEPS ============ */}
        <EvacuationCarousel />

        {/* ============ SECTION 5: EMERGENCY CONTACTS ============ */}
        <EmergencyContactsGrid />
      </main>
      <Footer />
    </>
  );
}
