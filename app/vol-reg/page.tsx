'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown,
  Binoculars,
  LifeBuoy,
  Cpu,
  CheckCircle,
  Shield,
  Award,
  Star,
  Medal,
  MapPin,
  Clock,
  Heart,
  Truck,
  Stethoscope,
  Radio,
  Zap,
  Users,
  ArrowRight,
  Check,
  Camera,
  Droplets,
  AlertTriangle,
  Phone,
  Calendar,
  BadgeCheck,
  Target,
  Trophy,
  Wallet,
  Gift,
  HeartHandshake,
  Sparkles,
  Building,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============ ANIMATED COUNTER ============
const AnimatedCounter = ({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ============ BLOOD GROUP SELECTOR (LIGHT THEME) ============
const BloodGroupSelector = ({ selected, onSelect }: { selected: string; onSelect: (bg: string) => void }) => {
  const groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="grid grid-cols-4 gap-3">
      {groups.map(group => (
        <button
          key={group}
          type="button"
          onClick={() => onSelect(group)}
          className={cn(
            "py-4 rounded-xl font-bold text-lg transition-all border-2",
            selected === group
              ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200"
              : "bg-white border-slate-200 text-slate-700 hover:border-emerald-400"
          )}
        >
          {group}
        </button>
      ))}
    </div>
  );
};

// ============ SKILL TAG (LIGHT THEME) ============
const SkillTag = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-full font-semibold text-sm transition-all border-2",
      selected
        ? "bg-emerald-500 border-emerald-500 text-white"
        : "bg-white border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-600"
    )}
  >
    {selected && <Check className="w-4 h-4 inline mr-1" />}
    {label}
  </button>
);

// ============ AVAILABILITY GRID (LIGHT THEME) ============
const AvailabilityGrid = ({ availability, onToggle }: { availability: boolean[][]; onToggle: (day: number, slot: number) => void }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const slots = ['Morning', 'Afternoon', 'Evening'];

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-8 gap-2 min-w-[500px]">
        <div className="text-slate-500 text-sm font-bold"></div>
        {days.map(day => (
          <div key={day} className="text-center text-slate-600 text-sm font-bold py-2">{day}</div>
        ))}
        {slots.map((slot, slotIdx) => (
          <React.Fragment key={slot}>
            <div className="text-slate-500 text-xs font-semibold py-3 pr-2">{slot}</div>
            {days.map((_, dayIdx) => (
              <button
                key={`${dayIdx}-${slotIdx}`}
                type="button"
                onClick={() => onToggle(dayIdx, slotIdx)}
                className={cn(
                  "h-12 rounded-lg transition-all border-2",
                  availability[dayIdx][slotIdx]
                    ? "bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-200"
                    : "bg-slate-50 border-slate-200 hover:border-emerald-300"
                )}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ============ ROLE CARD (LIGHT THEME) ============
const RoleCard = ({ icon: Icon, title, tagline, description, color, stats }: {
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  color: string;
  stats: { label: string; value: string }[];
}) => (
  <motion.div
    className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:border-slate-300 transition-all"
    whileHover={{ scale: 1.02, y: -5 }}
  >
    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6", color)}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h4 className="text-2xl font-black text-slate-900 mb-2">{title}</h4>
    <p className="text-emerald-600 font-semibold mb-4">{tagline}</p>
    <p className="text-slate-600 leading-relaxed mb-6">{description}</p>
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="text-center bg-slate-50 rounded-xl p-3">
          <div className="text-xl font-bold text-slate-900">{stat.value}</div>
          <div className="text-xs text-slate-500">{stat.label}</div>
        </div>
      ))}
    </div>
  </motion.div>
);

// ============ TESTIMONIAL CARD ============
const TestimonialCard = ({ quote, name, role, zone, avatar }: {
  quote: string;
  name: string;
  role: string;
  zone: string;
  avatar: string;
}) => (
  <motion.div
    className="bg-white border border-slate-200 rounded-3xl p-8 shadow-lg"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex gap-1 mb-4">
      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
    </div>
    <p className="text-slate-600 leading-relaxed mb-6">"{quote}"</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold">
        {avatar}
      </div>
      <div>
        <div className="font-bold text-slate-900">{name}</div>
        <div className="text-sm text-slate-500">{role} • {zone}</div>
      </div>
    </div>
  </motion.div>
);

// ============ ANIMATED SECTION ============
const AnimatedSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============ MAIN PAGE ============
export default function VolunteerRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    aadhaar: '',
    bloodGroup: '',
    zone: '',
    locality: '',
    travelDistance: 5,
    skills: [] as string[],
    emergencyMode: false,
    pledgeSigned: false
  });
  const [availability, setAvailability] = useState<boolean[][]>(
    Array(7).fill(null).map(() => Array(3).fill(false))
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const toggleAvailability = (day: number, slot: number) => {
    setAvailability(prev => {
      const newAvail = prev.map(d => [...d]);
      newAvail[day][slot] = !newAvail[day][slot];
      return newAvail;
    });
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const skills = [
    'Owns 4x4 Vehicle', 'Owns Motorcycle', 'Heavy Lifting', 'Swimming',
    'Medical Degree', 'First Aid Certified', 'Ham Radio License', 'Drone Pilot',
    'Hindi Speaker', 'English Speaker', 'Local Area Knowledge', 'Night Shift Available'
  ];

  return (
    <div ref={containerRef} className="bg-white text-slate-900 min-h-screen">
      {/* Progress Bar */}
      <div className="fixed top-20 left-0 right-0 h-1 bg-slate-100 z-40">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
          style={{ width: progressWidth }}
        />
      </div>

      {/* ============ SECTION 1: HERO ============ */}
      <section className="relative pt-8 pb-24 overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-amber-100 border border-amber-200 text-amber-700 rounded-full">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-bold">MONSOON 2026: VOLUNTEERS NEEDED</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
                When the Water Rises,<br />
                <span className="text-emerald-600">Delhi Needs You.</span>
              </h1>

              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
                Join the <strong className="text-slate-900">Jal-Rakshak Corps</strong> — Delhi's official flood response volunteer network. Be the shield between your community and the flood.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href="#application" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200">
                  <Shield className="w-5 h-5" />
                  Join the Corps
                </a>
                <a href="#roles" className="bg-white border-2 border-slate-200 hover:border-emerald-500 text-slate-700 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2">
                  Learn More <ChevronDown className="w-5 h-5" />
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: 12400, suffix: '+', label: 'Active Volunteers' },
                  { value: 847, suffix: '', label: 'Deployments in 2025' },
                  { value: 98, suffix: '%', label: 'Response Rate' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-black text-emerald-600">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-slate-500 font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero Image/Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="bg-gradient-to-br from-emerald-100 to-teal-50 rounded-[2.5rem] p-8 relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Users className="w-10 h-10 text-emerald-500 mb-4" />
                    <div className="text-3xl font-black text-slate-900">12,400+</div>
                    <div className="text-sm text-slate-500">Active Jal-Rakshaks</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <MapPin className="w-10 h-10 text-teal-500 mb-4" />
                    <div className="text-3xl font-black text-slate-900">12</div>
                    <div className="text-sm text-slate-500">MCD Zones Covered</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg col-span-2">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center">
                        <Trophy className="w-8 h-8 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-slate-900">₹4.2 Lakhs</div>
                        <div className="text-sm text-slate-500">Civic Credits Redeemed (2025)</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-400 rounded-full blur-2xl opacity-30" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2: THE GAP ============ */}
      <section className="py-24 px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-sm font-black text-rose-600 uppercase tracking-[0.2em] mb-4">The Reality</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              The Gap We Must <span className="text-rose-600">Bridge</span>
            </h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Delhi faces 308 flood incidents annually. Our official staff? Only 400. We need citizens like you.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: AlertTriangle, value: '308', label: 'Flood Incidents (2025)', color: 'bg-rose-100 text-rose-600' },
              { icon: Users, value: '400', label: 'Official Staff', color: 'bg-amber-100 text-amber-600' },
              { icon: Target, value: '3:1', label: 'Zones per Responder', color: 'bg-cyan-100 text-cyan-600' },
              { icon: Clock, value: '45 min', label: 'Avg. Response Without Volunteers', color: 'bg-slate-100 text-slate-600' },
            ].map((stat, i) => (
              <AnimatedSection key={i}>
                <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center hover:shadow-xl transition-all">
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6", stat.color)}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="text-4xl font-black text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-semibold">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-16 text-center">
            <div className="inline-block bg-emerald-50 border border-emerald-200 rounded-2xl p-8 max-w-3xl">
              <p className="text-2xl font-bold text-slate-900 mb-4">
                With <span className="text-emerald-600">12,400+ Jal-Rakshaks</span>, response time drops to <span className="text-emerald-600">12 minutes</span>.
              </p>
              <p className="text-slate-600">Your registration could save lives in your neighborhood.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ SECTION 3: ROLES ============ */}
      <section id="roles" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">Choose Your Role</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Three Ways to <span className="text-emerald-600">Serve</span>
            </h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Each role is critical. Choose based on your skills, availability, and passion.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <RoleCard
              icon={Binoculars}
              title="The Scout"
              tagline="Eyes of the Operation"
              description="Navigate to hotspots. Verify alerts. Upload real-time photos. Your ground intelligence guides the entire response."
              color="bg-blue-600"
              stats={[
                { label: 'Active Scouts', value: '4,200' },
                { label: 'Reports/Day', value: '156' },
              ]}
            />
            <RoleCard
              icon={LifeBuoy}
              title="The Responder"
              tagline="Hands That Save"
              description="Assist evacuations. Clear storm drains. Push stalled vehicles. Provide first aid. You're the boots on the ground."
              color="bg-orange-600"
              stats={[
                { label: 'Active Responders', value: '6,800' },
                { label: 'Lives Assisted', value: '847' },
              ]}
            />
            <RoleCard
              icon={Cpu}
              title="The Techie"
              tagline="Brain of the Corps"
              description="Operate drones. Manage communications. Coordinate teams. Analyze data. You keep the operation running."
              color="bg-violet-600"
              stats={[
                { label: 'Active Techies', value: '1,400' },
                { label: 'Drones Deployed', value: '24' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ============ SECTION 4: TRAINING ============ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">The Promise</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                We Don't Send You In <span className="text-emerald-600">Unprepared</span>
              </h3>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                Every Jal-Rakshak receives comprehensive training before their first deployment. Your safety is our priority.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Stethoscope, title: 'NDRF Certified First Aid', duration: '2 days' },
                  { icon: Shield, title: 'Flood Safety Protocol', duration: '1 day' },
                  { icon: Radio, title: 'Ham Radio Basics', duration: '4 hours' },
                  { icon: Truck, title: 'Emergency Evacuation Training', duration: '1 day' },
                  { icon: Heart, title: 'Water Rescue Fundamentals', duration: '2 days' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-bold text-slate-900">{item.title}</span>
                    </div>
                    <span className="text-sm text-emerald-600 font-semibold">{item.duration}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100">
                <div className="text-center mb-8">
                  <GraduationCap className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">Training Certificate</h4>
                  <p className="text-slate-600">Recognized by MCD, NDRF & Delhi Police</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 flex items-center gap-4">
                    <BadgeCheck className="w-8 h-8 text-emerald-500" />
                    <div>
                      <div className="font-bold text-slate-900">Official ID Card</div>
                      <div className="text-sm text-slate-500">Valid across all MCD zones</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 flex items-center gap-4">
                    <Shield className="w-8 h-8 text-blue-500" />
                    <div>
                      <div className="font-bold text-slate-900">Insurance Coverage</div>
                      <div className="text-sm text-slate-500">₹5 Lakh coverage during deployments</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 flex items-center gap-4">
                    <Sparkles className="w-8 h-8 text-amber-500" />
                    <div>
                      <div className="font-bold text-slate-900">Priority Response</div>
                      <div className="text-sm text-slate-500">Your family gets priority during emergencies</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============ SECTION 5: REWARDS ============ */}
      <section className="py-24 px-6 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-block mb-6">
              <motion.div
                className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-xl shadow-amber-200"
                animate={{ rotateY: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Medal className="w-12 h-12 text-white" />
              </motion.div>
            </div>
            <h2 className="text-sm font-black text-amber-600 uppercase tracking-[0.2em] mb-4">The Rewards</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Earn <span className="text-amber-600">Civic Credits</span>
            </h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Your service is valued. Every hour, every deployment earns you credits redeemable for real-world benefits.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Metro Passes', desc: 'Free monthly travel credits', value: '500 pts' },
              { icon: Wallet, title: 'Tax Rebates', desc: 'Certificate for IT deduction', value: '1000 pts' },
              { icon: Award, title: "Governor's Medal", desc: 'Awarded for acts of bravery', value: 'Special' },
              { icon: Gift, title: 'Gift Vouchers', desc: 'Partner store discounts', value: '200 pts' },
            ].map((item, i) => (
              <AnimatedSection key={item.title}>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:border-amber-200 transition-all text-center h-full">
                  <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-amber-600" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-sm mb-4">{item.desc}</p>
                  <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
                    {item.value}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 6: TESTIMONIALS ============ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">Volunteer Stories</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Hear From Our <span className="text-emerald-600">Jal-Rakshaks</span>
            </h3>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="I've earned 2,400 Varsha Points and redeemed them for metro passes. But the real reward is seeing relief on people's faces when help arrives."
              name="Priya Singh"
              role="Scout"
              zone="Rohini"
              avatar="PS"
            />
            <TestimonialCard
              quote="The training was world-class. NDRF instructors taught us water rescue. I've now assisted in 12 evacuations."
              name="Rajesh Kumar"
              role="Responder"
              zone="Shahdara"
              avatar="RK"
            />
            <TestimonialCard
              quote="As a techie, I manage drone operations for our zone. Seeing the aerial view of flood patterns helps us deploy resources faster."
              name="Anjali Sharma"
              role="Techie"
              zone="Central"
              avatar="AS"
            />
          </div>
        </div>
      </section>

      {/* ============ SECTION 7: APPLICATION FORM ============ */}
      <section id="application" className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">Application Form</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Your <span className="text-emerald-600">Mission Profile</span>
            </h3>
            <p className="text-xl text-slate-600">Complete your application in just 5 minutes.</p>
          </AnimatedSection>

          {/* Step Indicator */}
          <div className="flex justify-center gap-2 md:gap-4 mb-12 flex-wrap">
            {['Identity', 'Location', 'Skills', 'Availability', 'Pledge'].map((step, i) => (
              <button
                key={step}
                onClick={() => setCurrentStep(i)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all",
                  currentStep === i
                    ? "bg-emerald-600 text-white"
                    : currentStep > i
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-white border border-slate-200 text-slate-500"
                )}
              >
                <span className="w-6 h-6 rounded-full bg-current/20 flex items-center justify-center text-xs">
                  {currentStep > i ? <Check className="w-4 h-4" /> : i + 1}
                </span>
                <span className="hidden md:inline">{step}</span>
              </button>
            ))}
          </div>

          {/* Form Steps */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl">
            <AnimatePresence mode="wait">
              {/* Step 1: Identity */}
              {currentStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <h4 className="text-2xl font-bold text-slate-900 mb-8">Step 1: Your Identity</h4>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Enter your full name"
                        className={cn(
                          "w-full bg-slate-50 border-2 rounded-xl px-4 py-4 text-slate-900 placeholder-slate-400 focus:outline-none transition-all",
                          formData.fullName ? "border-emerald-500" : "border-slate-200 focus:border-emerald-500"
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Phone Number *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                        placeholder="+91 XXXXX XXXXX"
                        className={cn(
                          "w-full bg-slate-50 border-2 rounded-xl px-4 py-4 text-slate-900 placeholder-slate-400 focus:outline-none transition-all",
                          formData.phone.length === 10 ? "border-emerald-500" : "border-slate-200 focus:border-emerald-500"
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Aadhaar Number *</label>
                    <input
                      type="text"
                      value={formData.aadhaar}
                      onChange={(e) => setFormData(prev => ({ ...prev, aadhaar: e.target.value.replace(/\D/g, '').slice(0, 12) }))}
                      placeholder="XXXX XXXX XXXX"
                      className={cn(
                        "w-full bg-slate-50 border-2 rounded-xl px-4 py-4 text-slate-900 placeholder-slate-400 focus:outline-none transition-all font-mono",
                        formData.aadhaar.length === 12 ? "border-emerald-500" : "border-slate-200 focus:border-emerald-500"
                      )}
                    />
                    {formData.aadhaar.length === 12 && (
                      <p className="text-emerald-600 text-sm flex items-center gap-1">
                        <Check className="w-4 h-4" /> Valid format
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700">Blood Group * (Critical for emergencies)</label>
                    <BloodGroupSelector
                      selected={formData.bloodGroup}
                      onSelect={(bg) => setFormData(prev => ({ ...prev, bloodGroup: bg }))}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Location */}
              {currentStep === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-8"
                >
                  <h4 className="text-2xl font-bold text-slate-900 mb-8">Step 2: Your Home Base</h4>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Select Your Zone *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Central', 'North', 'South', 'East', 'West', 'New Delhi', 'North West', 'South West', 'North East', 'South East', 'Shahdara', 'Karol Bagh'].map(zone => (
                        <button
                          key={zone}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, zone }))}
                          className={cn(
                            "py-3 px-4 rounded-xl font-bold text-sm transition-all border-2",
                            formData.zone === zone
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : "bg-white border-slate-200 text-slate-600 hover:border-emerald-400"
                          )}
                        >
                          {zone}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Locality / Neighborhood</label>
                    <input
                      type="text"
                      value={formData.locality}
                      onChange={(e) => setFormData(prev => ({ ...prev, locality: e.target.value }))}
                      placeholder="e.g., Connaught Place, Saket, Dwarka Sector 21"
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700">
                      How far are you willing to travel? <span className="text-emerald-600">{formData.travelDistance} km</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={formData.travelDistance}
                      onChange={(e) => setFormData(prev => ({ ...prev, travelDistance: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>1 km</span>
                      <span>20 km</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Skills */}
              {currentStep === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-8"
                >
                  <h4 className="text-2xl font-bold text-slate-900 mb-8">Step 3: Your Skills & Assets</h4>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700">Select all that apply</label>
                    <div className="flex flex-wrap gap-3">
                      {skills.map(skill => (
                        <SkillTag
                          key={skill}
                          label={skill}
                          selected={formData.skills.includes(skill)}
                          onClick={() => toggleSkill(skill)}
                        />
                      ))}
                    </div>
                  </div>

                  {formData.skills.includes('Medical Degree') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-bold text-slate-700">Upload Medical License</label>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-all cursor-pointer bg-slate-50">
                        <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-500">Click to upload or drag & drop</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 4: Availability */}
              {currentStep === 3 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-8"
                >
                  <h4 className="text-2xl font-bold text-slate-900 mb-8">Step 4: Your Availability</h4>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700">Click blocks to mark available times</label>
                    <AvailabilityGrid availability={availability} onToggle={toggleAvailability} />
                  </div>

                  <div className="flex items-center justify-between p-6 bg-amber-50 border border-amber-200 rounded-xl">
                    <div>
                      <h5 className="font-bold text-slate-900">Activate Emergency Mode?</h5>
                      <p className="text-sm text-slate-600">I can be called 24/7 for Red Alerts</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, emergencyMode: !prev.emergencyMode }))}
                      className={cn(
                        "w-14 h-8 rounded-full transition-all",
                        formData.emergencyMode ? "bg-orange-500" : "bg-slate-300"
                      )}
                    >
                      <motion.div
                        className="w-6 h-6 bg-white rounded-full shadow-lg"
                        animate={{ x: formData.emergencyMode ? 28 : 4 }}
                      />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Pledge */}
              {currentStep === 4 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-8"
                >
                  <h4 className="text-2xl font-bold text-slate-900 mb-8">Step 5: The Pledge</h4>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8">
                    <HeartHandshake className="w-12 h-12 text-emerald-600 mx-auto mb-6" />
                    <p className="text-lg text-slate-700 leading-relaxed mb-8 italic text-center">
                      "I, <strong className="text-emerald-700">{formData.fullName || '[Your Name]'}</strong>, pledge to serve the citizens of Delhi safely and responsibly during times of crisis. I will follow all protocols, prioritize human life, and represent the Jal-Rakshak Corps with honor."
                    </p>

                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, pledgeSigned: !prev.pledgeSigned }))}
                      className={cn(
                        "w-full py-4 rounded-xl font-bold text-lg transition-all border-2",
                        formData.pledgeSigned
                          ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200"
                          : "bg-white border-slate-300 text-slate-600 hover:border-emerald-500"
                      )}
                    >
                      {formData.pledgeSigned ? (
                        <span className="flex items-center justify-center gap-2">
                          <Check className="w-5 h-5" /> Pledge Signed
                        </span>
                      ) : (
                        'Click to Sign Pledge'
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-12">
              <button
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Back
              </button>

              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-200"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <motion.button
                  className={cn(
                    "px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2",
                    formData.pledgeSigned
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  )}
                  disabled={!formData.pledgeSigned}
                  whileHover={formData.pledgeSigned ? { scale: 1.05 } : {}}
                  whileTap={formData.pledgeSigned ? { scale: 0.95 } : {}}
                >
                  <Shield className="w-5 h-5" />
                  Submit Application
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 8: EMERGENCY CTA ============ */}
      <section className="py-24 px-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-black mb-8 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Make a <span className="text-emerald-200">Difference?</span>
          </motion.h2>
          <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto">
            Join 12,400+ volunteers protecting Delhi's 20 million citizens. Your community is counting on you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#application" className="bg-white text-emerald-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 shadow-xl">
              <Shield className="w-5 h-5" />
              Start Application
            </a>
            <Link href="/emg-contact" className="bg-emerald-800 hover:bg-emerald-900 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 border border-emerald-500">
              <Phone className="w-5 h-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}