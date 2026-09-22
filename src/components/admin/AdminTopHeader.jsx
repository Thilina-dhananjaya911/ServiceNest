import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  ShieldCheck,
  Settings,
  LogOut,
  Check,
  AlertTriangle,
  UserCheck
} from 'lucide-react';

export default function AdminTopHeader({
  currentView,
  setCurrentView,
  onOpenMobileMenu,
  onLogout,
  adminName = 'System Administrator'
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const [adminNotifications, setAdminNotifications] = useState([
    {
      id: 1,
      title: 'New Verification Request',
      description: 'Priyantha Bandara (ShineClean Express) uploaded NIC & Sanitation certs.',
      time: '12m ago',
      type: 'verification',
      read: false
    },
    {
      id: 2,
      title: 'High Priority Complaint Filed',
      description: 'Amara Fernando reported Island Color Painters for missed date.',
      time: '45m ago',
      type: 'complaint',
      read: false
    },
    {
      id: 3,
      title: 'Weekly Automated Security Backup',
      description: 'System state snapshot completed successfully (0.8 MB).',
      time: '2h ago',
      type: 'system',
      read: true
    }
  ]);

  const unreadCount = adminNotifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setAdminNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (n) => {
    setAdminNotifications((prev) =>
      prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
    );
    setNotificationsOpen(false);
    if (n.type === 'verification') {
      setCurrentView('admin-verification');
    } else if (n.type === 'complaint') {
      setCurrentView('admin-complaints');
    } else {
      setCurrentView('admin-activity');
    }
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs h-16 sm:h-20 flex items-center justify-between px-4 sm:px-8">
      
      {/* Left: Mobile Menu + Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 bg-[#0B3A82] text-white hover:bg-blue-900 rounded-xl transition-colors shadow-xs"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Quick Search */}
        <div className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users, providers, complaints..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium transition-all"
          />
        </div>
      </div>

      {/* Right: Operational Badge, Notifications, Profile */}
      <div className="flex items-center gap-3">
        
        {/* System Status Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-semibold text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Healthy</span>
        </div>

        {/* Notifications Dropdown */}
        <div ref={notificationRef} className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-label="Admin Notifications"
            className="relative p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-84 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 text-xs z-50 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">System Alerts</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200/60">
                      {unreadCount} Pending
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3 h-3" /> Mark read
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-0.5">
                {adminNotifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleNotificationClick(n)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      !n.read
                        ? 'bg-blue-50/50 border-blue-200/80 hover:bg-blue-50'
                        : 'bg-slate-50/50 border-slate-100 text-slate-500 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-semibold text-xs flex items-center gap-1.5 ${!n.read ? 'text-slate-900' : 'text-slate-600'}`}>
                        {n.type === 'verification' && <UserCheck className="w-3.5 h-3.5 text-amber-600" />}
                        {n.type === 'complaint' && <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />}
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{n.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200/80 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
              AD
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-xs font-bold text-slate-900 block leading-tight">Admin Console</span>
              <span className="text-[10px] text-slate-500 block">Super Administrator</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 text-xs text-slate-700 z-50 animate-in fade-in duration-150">
              <div className="px-4 py-2.5 border-b border-slate-100 mb-1 bg-slate-50/50">
                <span className="block font-bold text-slate-900 text-sm">{adminName}</span>
                <span className="block text-[11px] text-slate-500">admin@servicenest.com</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  setCurrentView('admin-settings');
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors text-left font-medium text-slate-700 hover:text-blue-600 cursor-pointer"
              >
                <Settings className="w-4 h-4 text-slate-400" /> System Settings
              </button>

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  setCurrentView('admin-activity');
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors text-left font-medium text-slate-700 hover:text-blue-600 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-slate-400" /> Audit Log
              </button>

              <div className="my-1 border-t border-slate-100" />

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  if (onLogout) onLogout();
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 transition-colors font-semibold text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-500" /> Logout
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}
