import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Clock,
  Briefcase,
  ShieldAlert,
  Sparkles,
  Trash2,
  Check
} from 'lucide-react';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Provider Accepted Your Request',
    category: 'booking',
    description: 'TechFlow Plumbing confirmed your appointment for 24 May 2025 at 8:00 AM.',
    time: '15 mins ago',
    unread: true,
    icon: CheckCircle2,
    iconColor: 'text-emerald-600 bg-emerald-50'
  },
  {
    id: 2,
    title: 'Service Completed',
    category: 'booking',
    description: 'Bimal Perera marked "House Wiring Check" as completed. Please leave a rating.',
    time: '2 hours ago',
    unread: true,
    icon: Briefcase,
    iconColor: 'text-blue-600 bg-blue-50'
  },
  {
    id: 3,
    title: 'Exclusive Weekend Offer',
    category: 'promo',
    description: 'Get 10% off AC Maintenance services this weekend with code CLEANHOME10.',
    time: '1 day ago',
    unread: false,
    icon: Sparkles,
    iconColor: 'text-amber-600 bg-amber-50'
  },
  {
    id: 4,
    title: 'Account Security Notice',
    category: 'security',
    description: 'Your profile details were recently accessed from Colombo, Sri Lanka.',
    time: '3 days ago',
    unread: false,
    icon: ShieldAlert,
    iconColor: 'text-slate-600 bg-slate-100'
  }
];

export default function NotificationsView({ onNavigate }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleClear = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return n.unread;
    if (filter === 'booking') return n.category === 'booking';
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200">
                {unreadCount} New
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Stay updated with your service requests, bookings, and platform alerts
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
          )}

          {notifications.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-bold">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            filter === 'all'
              ? 'bg-[#0B3A82] text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All ({notifications.length})
        </button>

        <button
          type="button"
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            filter === 'unread'
              ? 'bg-[#0B3A82] text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Unread ({unreadCount})
        </button>

        <button
          type="button"
          onClick={() => setFilter('booking')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            filter === 'booking'
              ? 'bg-[#0B3A82] text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Bookings
        </button>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No Notifications</h3>
          <p className="text-xs text-slate-500 mt-1">You are all caught up with your updates.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                onClick={() => {
                  if (n.category === 'booking' && onNavigate) {
                    onNavigate('customer-requests');
                  }
                }}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer ${
                  n.unread
                    ? 'bg-white border-blue-200/90 shadow-xs hover:border-blue-300'
                    : 'bg-white/70 border-slate-200/70 hover:bg-white'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-xs sm:text-sm font-bold truncate ${n.unread ? 'text-slate-900' : 'text-slate-700'}`}>
                      {n.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 shrink-0 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {n.time}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {n.description}
                  </p>
                </div>

                {n.unread && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
