import React from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Heart
} from 'lucide-react';
import logoImg from '../../assets/logo.png';

export default function AboutUsView({ onNavigate }) {
  const VALUES = [
    {
      icon: ShieldCheck,
      title: 'Verified Professionals',
      description: 'Every technician, contractor, and provider is thoroughly verified with certified background checks and identity review.'
    },
    {
      icon: Award,
      title: 'High Quality Standards',
      description: 'We hold our partners to rigorous service benchmarks, ensuring dependable craftsmanship and trustworthy customer support.'
    },
    {
      icon: Clock,
      title: 'Reliable Scheduling',
      description: 'Book preferred dates and morning/afternoon time slots with transparent updates right inside the ServiceNest portal.'
    },
    {
      icon: Heart,
      title: 'Customer-First Guarantee',
      description: 'From routine pipe fixes to full air-conditioning service, your complete peace of mind is our utmost priority.'
    }
  ];

  const STATS = [
    { label: 'Verified Providers', value: '250+' },
    { label: 'Completed Jobs', value: '12,500+' },
    { label: 'Districts Covered', value: '25' },
    { label: 'Customer Satisfaction', value: '98.5%' }
  ];

  return (
    <div className="space-y-8 sm:space-y-12 animate-in fade-in duration-200 max-w-5xl mx-auto">
      
      {/* Hero Banner */}
      <div className="bg-[#0B3A82] text-white rounded-3xl p-6 sm:p-12 shadow-xl relative overflow-hidden text-center sm:text-left">
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold backdrop-blur-xs border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Sri Lanka's Trusted Home Services Network</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Helping your home find its helping hands.
          </h1>

          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-normal">
            ServiceNest bridges the gap between homeowners seeking skilled craftsmanship and local service professionals who take pride in quality work. We make hiring local talent safe, simple, and transparent.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('services')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('select')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-colors border border-white/20 cursor-pointer"
            >
              <span>Join as a Provider</span>
            </button>
          </div>
        </div>

        {/* Decorative Graphic */}
        <div className="hidden sm:block absolute right-8 bottom-6 opacity-15 pointer-events-none">
          <img src={logoImg} alt="ServiceNest Emblem" className="w-64 h-64 object-contain brightness-0 invert" />
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATS.map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-200/90 rounded-2xl p-5 text-center shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0B3A82] tracking-tight">
              {stat.value}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Core Values / Why ServiceNest */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Why Choose ServiceNest?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            We are dedicated to building a safe, reliable ecosystem for every household in Sri Lanka.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust & Verification Section */}
      <div className="bg-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">National ID & Certification Verified</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Service providers upload authentic NIC credentials and trade certifications before receiving listing approvals.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate && onNavigate('providers')}
          className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-200/90 shadow-2xs transition-colors shrink-0 cursor-pointer"
        >
          View Verified Providers
        </button>
      </div>

    </div>
  );
}
