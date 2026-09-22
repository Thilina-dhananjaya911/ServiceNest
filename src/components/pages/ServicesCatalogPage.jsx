import React, { useState } from 'react';
import {
  Search,
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Sparkles,
  Wind,
  Tv,
  Car,
  Trees,
  ShieldCheck,
  Bug,
  MoreHorizontal,
  Home,
  ArrowRight,
  CheckCircle2,
  Lock,
  Star,
  Users
} from 'lucide-react';

const SERVICE_ITEMS = [
  { id: 'plumbing', name: 'Plumbing', category: 'Plumbing', icon: Wrench, color: 'bg-blue-100 text-blue-600', price: 'From LKR 1,500', providersCount: '24 Verified' },
  { id: 'electrical', name: 'Electrical Work', category: 'Electrical Work', icon: Zap, color: 'bg-amber-100 text-amber-600', price: 'From LKR 1,800', providersCount: '19 Verified' },
  { id: 'carpentry', name: 'Carpentry', category: 'Carpentry', icon: Hammer, color: 'bg-orange-100 text-orange-700', price: 'From LKR 2,000', providersCount: '15 Verified' },
  { id: 'painting', name: 'Painting', category: 'Painting', icon: Paintbrush, color: 'bg-rose-100 text-rose-600', price: 'From LKR 2,500', providersCount: '21 Verified' },
  { id: 'cleaning', name: 'Cleaning', category: 'Cleaning', icon: Sparkles, color: 'bg-sky-100 text-sky-600', price: 'From LKR 1,200', providersCount: '30 Verified' },
  { id: 'roofing', name: 'Roofing & Structural', category: 'Carpentry', icon: Home, color: 'bg-slate-100 text-slate-700', price: 'From LKR 3,000', providersCount: '10 Verified' },
  { id: 'vehicle', name: 'Vehicle Repair', category: 'Vehicle Repair', icon: Car, color: 'bg-pink-100 text-pink-600', price: 'From LKR 2,000', providersCount: '14 Verified' },
  { id: 'ac', name: 'AC Maintenance', category: 'AC Maintenance', icon: Wind, color: 'bg-cyan-100 text-cyan-600', price: 'From LKR 2,500', providersCount: '17 Verified' },
  { id: 'appliance', name: 'Appliance Repair', category: 'Appliance Repair', icon: Tv, color: 'bg-purple-100 text-purple-600', price: 'From LKR 1,500', providersCount: '12 Verified' },
  { id: 'pest', name: 'Pest Control', category: 'Pest Control', icon: Bug, color: 'bg-red-100 text-red-600', price: 'From LKR 3,500', providersCount: '8 Verified' },
  { id: 'gardening', name: 'Gardening', category: 'Gardening', icon: Trees, color: 'bg-emerald-100 text-emerald-700', price: 'From LKR 1,500', providersCount: '16 Verified' },
  { id: 'more', name: 'More Services', category: '', icon: MoreHorizontal, color: 'bg-indigo-100 text-indigo-600', price: 'Custom Quote', providersCount: '50+ Verified' },
];

const TRUST_FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Verified Professionals',
    desc: 'All providers are verified for your safety.',
    color: 'bg-blue-50 text-blue-600 border-blue-100'
  },
  {
    icon: Star,
    title: 'Quality Service',
    desc: 'High quality service you can trust.',
    color: 'bg-purple-50 text-purple-600 border-purple-100'
  },
  {
    icon: Users,
    title: 'Local Experts',
    desc: 'Connect with local experts near you.',
    color: 'bg-sky-50 text-sky-600 border-sky-100'
  },
  {
    icon: Lock,
    title: 'Secure & Reliable',
    desc: 'Your data and payments are 100% secure.',
    color: 'bg-amber-50 text-amber-600 border-amber-100'
  }
];

export default function ServicesCatalogPage({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  const filterCategories = ['All', 'Plumbing', 'Electrical Work', 'Carpentry', 'Painting', 'Cleaning', 'AC Maintenance'];

  const filteredServices = SERVICE_ITEMS.filter((svc) => {
    const matchesSearch = svc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategoryFilter === 'All' || svc.category === activeCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Header & Search Bar matching Screenshot 2 */}
      <div className="text-center space-y-3 max-w-2xl mx-auto pt-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Our Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Find trusted local service providers for all your needs
        </p>

        {/* Search Bar matching Screenshot 2 */}
        <div className="pt-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('providers', { search: searchQuery });
            }}
            className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 max-w-xl mx-auto"
          >
            <div className="flex-1 flex items-center gap-3 px-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for services (e.g., Plumbing, Electrical Work, Cleaning...)"
                className="w-full text-xs sm:text-sm focus:outline-none placeholder-slate-400 text-slate-800 font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* Category quick filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategoryFilter === cat
                  ? 'bg-[#2563EB] text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 12 Services Grid matching Screenshot 2 with pricing & provider info */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredServices.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onNavigate && onNavigate('providers', { category: item.category })}
              className="bg-white border border-slate-200/90 hover:border-blue-500 rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all duration-150 flex flex-col items-center text-center cursor-pointer group justify-between min-h-[170px]"
            >
              {/* Top part: Icon + Name */}
              <div className="flex flex-col items-center">
                <div className={`w-13 h-13 rounded-full ${item.color} flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                  {item.name}
                </h3>
              </div>

              {/* Bottom part: Pricing, Provider count & Action */}
              <div className="pt-2 border-t border-slate-100 w-full mt-2">
                <span className="block text-[11px] font-bold text-slate-800">{item.price}</span>
                <span className="block text-[10px] text-slate-400">{item.providersCount}</span>
                <span className="text-[10px] font-bold text-blue-600 group-hover:underline flex items-center justify-center gap-0.5 mt-1">
                  <span>Explore</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Trusted. Verified. Reliable. Banner matching Screenshot 2 */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 border border-blue-100">
            <ShieldCheck className="w-7 h-7 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Trusted. Verified. Reliable.
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              All service providers are verified and reviewed by customers like you.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate && onNavigate('providers')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <span>Find a Service Provider</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4. 4 Feature Info Cards matching Screenshot 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TRUST_FEATURES.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs flex items-start gap-3.5"
            >
              <div className={`w-9 h-9 rounded-xl ${feat.color} flex items-center justify-center shrink-0 border`}>
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{feat.title}</h4>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{feat.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
