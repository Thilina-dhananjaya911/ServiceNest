import React from 'react';
import { LogIn, UserPlus, LayoutDashboard, Grid, Users, Home } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Navbar({ currentView, setCurrentView, onOpenProviderPortal }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Section */}
          <div 
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* ServiceNest Official Logo */}
            <img
              src={logoImg}
              alt="ServiceNest Logo"
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            
            {/* Brand Title & Tagline Badge */}
            <div className="flex flex-col justify-center">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1 leading-none">
                Service<span className="text-indigo-600">Nest</span>
              </span>
              <span className="block text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-slate-400 mt-0.5">
                LOCAL SKILL MARKETPLACE
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setCurrentView('landing')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'landing' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentView('catalog')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'catalog' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Services</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentView('providers')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'providers' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Providers</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {onOpenProviderPortal && (
              <button
                type="button"
                onClick={onOpenProviderPortal}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200/80 cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Provider Portal</span>
              </button>
            )}

            {currentView === 'login' ? (
              <button
                type="button"
                onClick={() => setCurrentView('select')}
                className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors shadow-2xs border border-indigo-100"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentView('login')}
                className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
