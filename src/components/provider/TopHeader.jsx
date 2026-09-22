import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  Wrench,
  FileText,
  Calendar,
  LogOut,
  Menu,
  Check,
  Search,
  User,
  LogIn,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import logoImg from '../../assets/logo.png';

export default function TopHeader({
  authRole = null, // 'customer' | 'provider' | null
  currentView,
  setCurrentView,
  onOpenMobileMenu,
  onLogout,
  providerName = 'Thushani',
  customerName = 'Kasun Perera',
  onSearch
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Request Received',
      description: 'Amara Perera requested Plumbing Service in Colombo 05.',
      time: '10m ago',
      read: false,
    },
    {
      id: 2,
      title: 'Job In Progress',
      description: 'Kasun Dias started Drain Cleaning service.',
      time: '1h ago',
      read: false,
    },
    {
      id: 3,
      title: 'Payment Completed',
      description: 'LKR 4,500 credited for completed Electrical Repair.',
      time: '3h ago',
      read: true,
    }
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    if (authRole === 'provider') {
      setCurrentView('provider-requests');
    } else {
      setCurrentView('customer-requests');
    }
    setNotificationsOpen(false);
  };

  // Close dropdowns on click outside
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

  const displayName = authRole === 'provider'
    ? providerName
    : authRole === 'customer'
    ? customerName
    : 'Welcome Guest';

  const displayEmail = authRole === 'provider'
    ? 'provider@servicenest.com'
    : authRole === 'customer'
    ? 'customer@servicenest.com'
    : 'Sign in to access your account';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs h-16 sm:h-20 flex items-center justify-between px-4 sm:px-8">
      
      {/* Left Side: Mobile Menu Button & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 bg-[#2563EB] text-white hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Dynamic header tagline */}
        <div className="hidden sm:block">
          <span className="text-xs text-slate-500 font-medium">
            {authRole === 'provider'
              ? 'ServiceNest Service Provider Management Portal'
              : 'Helping your home find its helping hands'}
          </span>
        </div>
      </div>

      {/* Right Side: Notifications & User Profile */}
      <div className="flex items-center gap-3">
        
        {/* Notification Bell Dropdown */}
        <div ref={notificationRef} className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-label="Notifications"
            className="relative p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 text-xs z-50 animate-in fade-in duration-150">
              {/* Panel Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">Notifications</span>
                  {unreadCount > 0 ? (
                    <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200/60">
                      {unreadCount} New
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      All Read
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3 h-3" /> Mark all read
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="space-y-2 max-h-72 overflow-y-auto pr-0.5">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleNotificationClick(n.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      !n.read
                        ? 'bg-blue-50/40 border-blue-200/80 hover:bg-blue-50/80'
                        : 'bg-slate-50/50 border-slate-100 text-slate-500 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-semibold text-xs ${!n.read ? 'text-slate-900' : 'text-slate-600'}`}>
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

        {/* User Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 pl-2 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200/80 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#0B3A82] text-white font-bold text-sm flex items-center justify-center shadow-xs">
              <User className="w-4 h-4" />
            </div>

            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 text-xs text-slate-700 z-50 animate-in fade-in duration-150">
              {/* Header Info */}
              <div className="px-4 py-2.5 border-b border-slate-100 mb-1 bg-slate-50/50">
                <span className="block font-bold text-slate-900 text-sm">
                  {displayName}
                </span>
                <span className="block text-[11px] text-slate-500">
                  {displayEmail}
                </span>
              </div>

              {/* Options Based on Role */}
              {authRole === 'provider' ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      setCurrentView('provider-home');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors text-left font-medium text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <User className="w-4 h-4 text-slate-400" /> Provider Home
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      setCurrentView('dashboard');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors text-left font-medium text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4 text-slate-400" /> Dashboard
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      setCurrentView('manage-services');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors text-left font-medium text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <Wrench className="w-4 h-4 text-slate-400" /> Manage Services
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      setCurrentView('provider-requests');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors text-left font-medium text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-slate-400" /> Requests
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      setCurrentView('availability');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors text-left font-medium text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-slate-400" /> Availability
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      if (onLogout) onLogout();
                      else setCurrentView('login');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 transition-colors font-semibold text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" /> Logout
                  </button>
                </>
              ) : authRole === 'customer' ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      setCurrentView('home');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors text-left font-medium text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-slate-400" /> Home
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      setCurrentView('services');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors text-left font-medium text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <Wrench className="w-4 h-4 text-slate-400" /> Browse Services
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      setCurrentView('customer-requests');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors text-left font-medium text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-slate-400" /> My Requests
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      setCurrentView('profile');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors text-left font-medium text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <User className="w-4 h-4 text-slate-400" /> My Profile
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      if (onLogout) onLogout();
                      else setCurrentView('login');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 transition-colors font-semibold text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      setCurrentView('services');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors text-left font-medium text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <Wrench className="w-4 h-4 text-slate-400" /> Browse Services
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      setCurrentView('help');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors text-left font-medium text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 text-slate-400" /> Help & Support
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      setCurrentView('login');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors font-semibold text-left cursor-pointer"
                  >
                    <LogIn className="w-4 h-4 text-blue-600" /> Sign In / Register
                  </button>
                </>
              )}
            </div>
          )}
        </div>

      </div>

    </header>
  );
}
