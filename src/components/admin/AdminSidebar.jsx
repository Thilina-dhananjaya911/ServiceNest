import React from 'react';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Grid,
  ShieldCheck,
  AlertTriangle,
  History,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import logoImg from '../../assets/logo.png';

export default function AdminSidebar({
  currentView,
  setCurrentView,
  isOpen,
  onClose,
  onLogout,
  pendingVerificationsCount = 2,
  openComplaintsCount = 2
}) {
  const handleItemClick = (id) => {
    setCurrentView(id);
    if (onClose) onClose();
  };

  const NAV_ITEMS = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admin-users', label: 'Users', icon: Users },
    { id: 'admin-providers', label: 'Providers', icon: Briefcase },
    { id: 'admin-categories', label: 'Categories', icon: Grid },
    {
      id: 'admin-verification',
      label: 'Verification',
      icon: ShieldCheck,
      badge: pendingVerificationsCount > 0 ? pendingVerificationsCount : null,
      badgeColor: 'bg-amber-500 text-white'
    },
    {
      id: 'admin-complaints',
      label: 'Complaints',
      icon: AlertTriangle,
      badge: openComplaintsCount > 0 ? openComplaintsCount : null,
      badgeColor: 'bg-rose-500 text-white'
    },
    { id: 'admin-activity', label: 'Activity Logs', icon: History },
    { id: 'admin-settings', label: 'Settings', icon: Settings },
  ];

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
        {/* Top: Logo & Nav List */}
        <div>
          {/* Logo Header */}
          <div className="flex items-center justify-between h-16 sm:h-20 px-6 border-b border-blue-800/60">
            <div
              onClick={() => handleItemClick('admin-dashboard')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              {/* Official ServiceNest Logo */}
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
                <span className="text-[10px] text-amber-300 font-bold tracking-wider uppercase mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Admin Console
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3.5 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)]">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentView === item.id ||
                (item.id === 'admin-users' && currentView === 'admin-user-form') ||
                (item.id === 'admin-providers' && currentView === 'admin-provider-details') ||
                (item.id === 'admin-complaints' && currentView === 'admin-complaint-details');

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
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Logout Item */}
            <button
              type="button"
              onClick={() => {
                if (onLogout) onLogout();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-rose-300 hover:text-white hover:bg-rose-600/30 transition-colors cursor-pointer pt-2 mt-2"
            >
              <LogOut className="w-4 h-4 text-rose-300" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-blue-800/60 bg-[#082D67]/40 space-y-3">
          <div className="bg-white rounded-xl p-2.5 flex items-center justify-center gap-2.5 shadow-sm">
            <img src={logoImg} alt="ServiceNest Logo" className="h-7 w-auto object-contain" />
            <span className="text-sm font-extrabold text-[#0B3A82] tracking-tight">ServiceNest</span>
          </div>

          <p className="text-[10px] text-blue-200/60 text-center leading-tight">
            Administrator Portal v2.0 • Secured
          </p>
        </div>
      </aside>
    </>
  );
}
