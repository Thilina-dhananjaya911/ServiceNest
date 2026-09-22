import React from 'react';
import {
  Home,
  Users,
  Sparkles,
  FileText,
  MessageSquare,
  Bell,
  User,
  HelpCircle,
  Info,
  LogOut,
  X,
  LayoutDashboard,
  Wrench,
  Calendar,
  LogIn
} from 'lucide-react';
import logoImg from '../../assets/logo.png';

export default function Sidebar({
  authRole = null, // 'customer' | 'provider' | null
  currentView,
  setCurrentView,
  isOpen,
  onClose,
  onLogout
}) {
  const handleItemClick = (id) => {
    setCurrentView(id);
    if (onClose) onClose();
  };

  // 1. Customer Navigation Items (when logged in as Customer or unauthenticated browsing)
  const CUSTOMER_NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Sparkles },
    { id: 'providers', label: 'Providers', icon: Users },
    { id: 'customer-requests', label: 'My Requests', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'help', label: 'Help and Support', icon: HelpCircle },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  // 2. Service Provider Navigation Items (Exact Original 5 Provider Pages)
  const PROVIDER_NAV_ITEMS = [
    { id: 'provider-home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'manage-services', label: 'Manage Services', icon: Wrench },
    { id: 'provider-requests', label: 'Requests', icon: FileText },
    { id: 'availability', label: 'Availability', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const activeNavItems = authRole === 'provider' ? PROVIDER_NAV_ITEMS : CUSTOMER_NAV_ITEMS;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0B3A82] text-white flex flex-col justify-between transition-transform duration-300 shadow-xl lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Section: Logo & Nav List */}
        <div>
          {/* Logo Header */}
          <div className="flex items-center justify-between h-16 sm:h-20 px-6 border-b border-blue-800/60">
            <div
              onClick={() => handleItemClick(authRole === 'provider' ? 'provider-home' : 'home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              {/* Official ServiceNest Logo in pristine white container */}
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-sm">
                <img
                  src={logoImg}
                  alt="ServiceNest Official Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white tracking-tight leading-none">
                  ServiceNest
                </span>
                <span className="text-[10px] text-blue-200 font-semibold tracking-wider uppercase mt-1">
                  {authRole === 'provider' ? 'Provider Portal' : 'Local Services'}
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links List (Begins naturally right after the Logo) */}
          <nav className="p-3.5 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)]">
            {activeNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-md'
                      : 'text-blue-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white stroke-[2.4]' : 'text-blue-200'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Auth Action Item: Logout (for logged in users) or Sign In (for visitors) */}
            {authRole ? (
              <button
                type="button"
                onClick={() => {
                  if (onLogout) onLogout();
                  else handleItemClick('login');
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer pt-2 mt-1"
              >
                <LogOut className="w-4 h-4 text-blue-200" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleItemClick('login')}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer pt-2 mt-1"
              >
                <LogIn className="w-4 h-4 text-blue-200" />
                <span>Sign In / Register</span>
              </button>
            )}
          </nav>
        </div>

        {/* Bottom Section: Logo White Card + Tagline */}
        <div className="p-4 border-t border-blue-800/60 bg-[#082D67]/40 space-y-3">
          <div className="bg-white rounded-xl p-2.5 flex items-center justify-center gap-2.5 shadow-sm">
            <img src={logoImg} alt="ServiceNest Logo" className="h-7 w-auto object-contain" />
            <span className="text-sm font-extrabold text-[#0B3A82] tracking-tight">ServiceNest</span>
          </div>

          <p className="text-[10px] text-blue-200/60 text-center leading-tight">
            © 2025 ServiceNest. All rights reserved.
          </p>
        </div>

      </aside>
    </>
  );
}
