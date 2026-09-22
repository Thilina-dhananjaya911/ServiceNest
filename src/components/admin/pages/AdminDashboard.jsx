import React from 'react';
import {
  Users,
  Briefcase,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  TrendingUp,
  Clock,
  ChevronRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export default function AdminDashboard({
  usersCount = 2845,
  providersCount = 248,
  verifiedCount = 216,
  complaintsCount = 12,
  onNavigate,
  recentActivities = []
}) {
  const KPIS = [
    {
      title: 'Total Platform Users',
      value: usersCount.toLocaleString(),
      change: '+14.2% this month',
      isPositive: true,
      icon: Users,
      color: 'bg-blue-50 text-blue-600 border-blue-200/80',
      action: () => onNavigate('admin-users')
    },
    {
      title: 'Service Providers',
      value: providersCount.toLocaleString(),
      change: '+8 new this week',
      isPositive: true,
      icon: Briefcase,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200/80',
      action: () => onNavigate('admin-providers')
    },
    {
      title: 'Verified Providers',
      value: verifiedCount.toLocaleString(),
      change: '87.1% verification rate',
      isPositive: true,
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
      action: () => onNavigate('admin-verification')
    },
    {
      title: 'Active Complaints',
      value: complaintsCount.toLocaleString(),
      change: '2 need review',
      isPositive: false,
      icon: AlertTriangle,
      color: 'bg-rose-50 text-rose-600 border-rose-200/80',
      action: () => onNavigate('admin-complaints')
    }
  ];

  // Simulated Weekly Activity Volume
  const WEEKLY_DATA = [
    { day: 'Mon', requests: 45, completed: 38 },
    { day: 'Tue', requests: 52, completed: 48 },
    { day: 'Wed', requests: 68, completed: 62 },
    { day: 'Thu', requests: 60, completed: 54 },
    { day: 'Fri', requests: 74, completed: 70 },
    { day: 'Sat', requests: 88, completed: 82 },
    { day: 'Sun', requests: 65, completed: 60 },
  ];

  const maxVal = 90;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* Top Welcome Banner */}
      <div className="bg-[#0B3A82] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold backdrop-blur-xs border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ServiceNest Operational Control</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            Administrator Dashboard
          </h1>

          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            Monitor verified tradespeople, oversee customer requests, enforce quality standards, and manage platform complaints in real-time.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2.5 shrink-0 relative z-10">
          <button
            type="button"
            onClick={() => onNavigate('admin-verification')}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify Providers (2)</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('admin-complaints')}
            className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white font-bold text-xs rounded-xl border border-white/20 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4 text-rose-300" />
            <span>Review Complaints (2)</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              onClick={kpi.action}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${kpi.color}`}>
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {kpi.value}
              </div>

              <div className="text-xs font-semibold text-slate-600 mt-1">
                {kpi.title}
              </div>

              <div className="flex items-center gap-1 mt-2 text-[11px] font-bold">
                {kpi.isPositive ? (
                  <span className="text-emerald-600 flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    {kpi.change}
                  </span>
                ) : (
                  <span className="text-rose-600 flex items-center gap-0.5">
                    <ArrowDownRight className="w-3 h-3" />
                    {kpi.change}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Section: Weekly Activity Chart & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Activity Chart & Platform Performance */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Weekly Booking & Completion Volume</h2>
              <p className="text-xs text-slate-500">Real-time breakdown of dispatched vs completed service jobs</p>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-blue-600">
                <span className="w-3 h-3 rounded-md bg-[#2563EB]" />
                Requests
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-3 h-3 rounded-md bg-emerald-500" />
                Completed
              </span>
            </div>
          </div>

          {/* SVG Bar Chart Visualization */}
          <div className="pt-2">
            <div className="h-52 flex items-end justify-between gap-3 px-2 border-b border-slate-200/80 pb-2">
              {WEEKLY_DATA.map((item, idx) => {
                const reqHeight = (item.requests / maxVal) * 100;
                const compHeight = (item.completed / maxVal) * 100;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <div className="w-full flex items-end justify-center gap-1.5 h-full">
                      {/* Request Bar */}
                      <div
                        style={{ height: `${reqHeight}%` }}
                        className="w-1/2 max-w-[18px] bg-[#2563EB] rounded-t-md group-hover:brightness-110 transition-all relative"
                        title={`Requests: ${item.requests}`}
                      />
                      {/* Completed Bar */}
                      <div
                        style={{ height: `${compHeight}%` }}
                        className="w-1/2 max-w-[18px] bg-emerald-500 rounded-t-md group-hover:brightness-110 transition-all relative"
                        title={`Completed: ${item.completed}`}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 block">{item.day}</span>
                  </div>
                );
              })}
            </div>

            {/* Performance Summary Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">Total Requests</span>
                <span className="text-base font-extrabold text-slate-900 mt-0.5 block">416</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">Avg Completion</span>
                <span className="text-base font-extrabold text-emerald-600 mt-0.5 block">92.4%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">Customer Rating</span>
                <span className="text-base font-extrabold text-[#0B3A82] mt-0.5 block">★ 4.8 / 5.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Recent Platform Activities Stream */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Recent Platform Activities</h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('admin-activity')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {(recentActivities.length > 0 ? recentActivities.slice(0, 5) : [
                {
                  id: 1,
                  action: 'Provider Verification Approved',
                  actor: 'Admin',
                  time: '2h ago',
                  details: 'Charls Fernando (CoolBreeze AC) verified with NVQ Level 4.'
                },
                {
                  id: 2,
                  action: 'Dispute Ticket Filed',
                  actor: 'Amara Fernando',
                  time: '3h ago',
                  details: 'Complaint CMP-1041 assigned to support queue.'
                },
                {
                  id: 3,
                  action: 'Trade Category Added',
                  actor: 'Admin',
                  time: 'Yesterday',
                  details: 'Solar Installation added with 8 verified providers.'
                },
                {
                  id: 4,
                  action: 'New Provider Registered',
                  actor: 'Priyantha Bandara',
                  time: '2 days ago',
                  details: 'ShineClean Express submitted NIC & trade cert.'
                }
              ]).map((act, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{act.action}</span>
                    <span className="text-[10px] text-slate-400">{act.time || act.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">{act.details}</p>
                  <span className="text-[10px] font-semibold text-blue-600 block">{act.actor}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('admin-activity')}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer border border-slate-200 text-center"
          >
            Audit Log History →
          </button>
        </div>

      </div>

    </div>
  );
}
