import React, { useState } from 'react';
import {
  ShieldCheck,
  Home,
  MapPin,
  Star,
  ClipboardList,
  ArrowRight,
  Search,
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Sparkles,
  Wind
} from 'lucide-react';

const POPULAR_SERVICES = [
  { name: 'Plumbing', icon: Wrench },
  { name: 'Electrical Work', icon: Zap },
  { name: 'Carpentry', icon: Hammer },
  { name: 'Painting', icon: Paintbrush },
  { name: 'Cleaning', icon: Sparkles },
  { name: 'AC Maintenance', icon: Wind },
];

export default function LandingHome({ onNavigate }) {
  const [serviceQuery, setServiceQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('providers', { search: serviceQuery, location: locationQuery });
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      
      {/* 1. Main Hero Search Banner matching Section 6 requirements */}
      <div className="bg-gradient-to-br from-[#0B3A82] to-[#1E40AF] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-200 bg-white/10 backdrop-blur-xs border border-white/20 px-3.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sri Lanka's Trusted Local Service Platform</span>
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Find Trusted Local Services, All in One Place
          </h1>

          <p className="text-xs sm:text-sm text-blue-100/90 max-w-xl mx-auto leading-relaxed">
            Connect with certified, background-checked local professionals for repairs, maintenance, and trade services right in your area.
          </p>

          {/* Hero Search Box */}
          <form
            onSubmit={handleHeroSearch}
            className="pt-2 flex flex-col sm:flex-row items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-lg"
          >
            {/* Service Input */}
            <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-white rounded-xl w-full">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={serviceQuery}
                onChange={(e) => setServiceQuery(e.target.value)}
                placeholder="What service do you need? (e.g., Plumbing, AC...)"
                className="w-full text-xs text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
              />
            </div>

            {/* Location Input */}
            <div className="flex items-center gap-2.5 px-3 py-2 bg-white rounded-xl w-full sm:w-48 shrink-0">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Location (e.g., Colombo)"
                className="w-full text-xs text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer shrink-0"
            >
              Search
            </button>
          </form>

          {/* Popular Services Quick Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-blue-200/80 font-medium text-[11px]">Popular:</span>
            {POPULAR_SERVICES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onNavigate && onNavigate('providers', { category: item.name })}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-[11px] font-semibold transition-colors border border-white/10 cursor-pointer"
                >
                  <Icon className="w-3 h-3 text-blue-200" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Main Hero Intro Card matching Screenshot 1 */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100/80 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>ABOUT SERVICENEST</span>
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Connecting You with Trusted Local Service Providers
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              ServiceNest makes it simple to find skilled local professionals for the services you need, right where you need them.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('providers')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors cursor-pointer"
              >
                <span>Find a provider</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate && onNavigate('services')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                <span>Explore All Services</span>
              </button>
            </div>
          </div>

          {/* Right Column: Local Help Feature Box */}
          <div className="lg:col-span-5">
            <div className="bg-[#EFF6FF] border border-blue-100 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shadow-xs">
                <Home className="w-6 h-6 stroke-[2.2]" />
              </div>
              
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                Local help, all in one place
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                From plumbing and electrical work to cleaning and repairs, discover professionals without relying on scattered recommendations.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Why ServiceNest Section matching Screenshot 1 */}
      <div className="space-y-6">
        <div className="text-center space-y-1.5 max-w-xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
            WHY SERVICENEST
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Choose with confidence
          </h2>
        </div>

        {/* 3 Confidence Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">
              Find nearby help
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Search for the right service and providers in your location.
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Star className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">
              Compare trusted profiles
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Review experience, availability, ratings, and customer feedback.
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <ClipboardList className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">
              Request with ease
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Send a request and keep track of your service in one place.
            </p>
          </div>
        </div>
      </div>

      {/* 4. How It Works Dark Blue Banner matching Screenshot 1 */}
      <div className="bg-[#0B3A82] text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-200 block">
            HOW IT WORKS
          </span>
          <h3 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white">
            Find the right provider in three simple steps
          </h3>
        </div>

        {/* 3 Steps */}
        <div className="flex items-center gap-8 sm:gap-12 shrink-0">
          <div className="text-center">
            <span className="block text-xl sm:text-3xl font-black text-blue-400">01</span>
            <span className="block text-xs font-bold text-blue-100 mt-0.5">Search</span>
          </div>

          <div className="text-center">
            <span className="block text-xl sm:text-3xl font-black text-blue-400">02</span>
            <span className="block text-xs font-bold text-blue-100 mt-0.5">Compare</span>
          </div>

          <div className="text-center">
            <span className="block text-xl sm:text-3xl font-black text-blue-400">03</span>
            <span className="block text-xs font-bold text-blue-100 mt-0.5">Request</span>
          </div>
        </div>
      </div>

    </div>
  );
}
