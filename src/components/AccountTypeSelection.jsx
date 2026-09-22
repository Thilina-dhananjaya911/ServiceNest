import React from 'react';
import { User, Briefcase, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function AccountTypeSelection({ setCurrentView }) {
  return (
    <div className="w-full">
      {/* Top Logo & Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-sm border border-slate-200/80 flex items-center justify-center">
            <img src={logoImg} alt="ServiceNest Official Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Get Started in 2 Minutes</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Your ServiceNest Account
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
          Choose how you want to use ServiceNest to connect with local service solutions.
        </p>
      </div>

      {/* Role Option Cards */}
      <div className="space-y-4 mb-8">
        
        {/* Card A: Customer */}
        <div 
          onClick={() => setCurrentView('customer')}
          className="group relative rounded-xl border border-slate-200 hover:border-indigo-500/50 bg-white p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            
            {/* Icon Container */}
            <div className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200 border border-indigo-100">
              <User className="w-5 h-5 stroke-[2.2]" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Customer
                </h2>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  For Individuals
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 mb-3.5 leading-relaxed">
                Find trusted local service providers, send service requests, and track your jobs easily.
              </p>

              {/* Highlight Tags */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 mb-4">
                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Free Registration
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Instant Requests
                </span>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentView('customer');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors shadow-xs"
              >
                <span>Register as Customer</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </div>

        {/* Card B: Service Provider */}
        <div 
          onClick={() => setCurrentView('provider')}
          className="group relative rounded-xl border border-slate-200 hover:border-slate-400 bg-white p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            
            {/* Icon Container */}
            <div className="w-11 h-11 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200 border border-slate-200">
              <Briefcase className="w-5 h-5 stroke-[2.2]" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-slate-900 transition-colors">
                  Service Provider
                </h2>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  For Professionals
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 mb-3.5 leading-relaxed">
                Showcase your skilled trade (plumbing, electrical, carpentry, AC repair, etc.) and receive local customer requests.
              </p>

              {/* Highlight Tags */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 mb-4">
                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Professional Profile
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Direct Job Leads
                </span>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentView('provider');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors shadow-xs"
              >
                <span>Register as Service Provider</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Footer Elements */}
      <div className="pt-6 border-t border-slate-100 text-center space-y-3">
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => setCurrentView('login')}
            className="text-indigo-600 font-bold hover:underline cursor-pointer"
          >
            Login
          </button>
          {' • '}
          <button
            type="button"
            onClick={() => setCurrentView('login')}
            className="text-slate-600 font-bold hover:text-slate-900 hover:underline cursor-pointer"
          >
            Admin Portal →
          </button>
        </p>

        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Secure SSL Encrypted Registration</span>
        </div>
      </div>

    </div>
  );
}
