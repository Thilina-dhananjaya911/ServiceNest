import React from 'react';
import { Calendar, Wrench, FolderCheck, Info, ArrowRight, ShieldCheck } from 'lucide-react';
import ContactDetails from '../ui/ContactDetails';

export default function ProviderHome({ setCurrentView }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 sm:p-10 shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Left Content */}
          <div className="max-w-xl space-y-4">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-full">
              WELCOME TO SERVICENEST
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Manage your services and requests in one place
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Easily manage your services, availability, customer requests, and professional profile from one place.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setCurrentView('requests')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <span>View Requests</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Illustration Card */}
          <div className="shrink-0 w-full md:w-64 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 text-center shadow-md backdrop-blur-xs">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-500 to-emerald-400 p-0.5 mb-3 shadow-md">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-8 h-8 stroke-[2.2]" />
              </div>
            </div>
            <span className="block text-xs font-bold text-white mb-0.5">Verified Professional</span>
            <span className="block text-[10px] text-slate-400">Working Professionals Badge</span>
          </div>

        </div>

        {/* Ambient subtle background glow */}
        <div className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Quick Actions Section */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Action 1: View Availability */}
          <div
            onClick={() => setCurrentView('availability')}
            className="group bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
              View Availability
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Update your working hours and availability.
            </p>
          </div>

          {/* Action 2: Manage Services */}
          <div
            onClick={() => setCurrentView('services')}
            className="group bg-white border border-slate-200/90 hover:border-emerald-400 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-1">
              Manage Services
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Add or update your services and pricing.
            </p>
          </div>

          {/* Action 3: View Requests */}
          <div
            onClick={() => setCurrentView('requests')}
            className="group bg-white border border-slate-200/90 hover:border-amber-400 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FolderCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-1">
              View Requests
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Check new and ongoing service requests.
            </p>
          </div>

          {/* Action 4: About Us */}
          <div
            onClick={() => {}}
            className="group bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs cursor-default opacity-80"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Info className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              About Us
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Learn more about ServiceNest platform features.
            </p>
          </div>

        </div>
      </div>

      {/* Reusable Contact Details Footer */}
      <ContactDetails />

    </div>
  );
}
