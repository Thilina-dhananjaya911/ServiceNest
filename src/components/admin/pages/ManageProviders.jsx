import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  ShieldCheck,
  ShieldAlert,
  Star,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  UserX,
  UserCheck
} from 'lucide-react';

export default function ManageProviders({
  providers = [],
  onSelectProvider,
  onVerifyProvider,
  onSuspendProvider,
  onDeleteProvider
}) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleVerify = (id, name) => {
    onVerifyProvider(id);
    showToast(`Provider "${name}" verified successfully.`);
  };

  const handleSuspend = (id, name) => {
    onSuspendProvider(id);
    showToast(`Provider "${name}" status toggled.`);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove provider "${name}"?`)) {
      onDeleteProvider(id);
      showToast(`Provider "${name}" deleted.`);
    }
  };

  // Filter Logic
  const filteredProviders = providers.filter((p) => {
    const matchesTab =
      activeTab === 'All'
        ? true
        : activeTab === 'Pending Verification'
        ? p.status === 'Pending Verification'
        : activeTab === 'Verified'
        ? p.status === 'Verified'
        : p.status === 'Suspended';

    const matchesCategory =
      categoryFilter === 'All' ? true : p.category.toLowerCase() === categoryFilter.toLowerCase();

    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesCategory && matchesSearch;
  });

  const counts = {
    all: providers.length,
    pending: providers.filter((p) => p.status === 'Pending Verification').length,
    verified: providers.filter((p) => p.status === 'Verified').length,
    suspended: providers.filter((p) => p.status === 'Suspended').length
  };

  const CATEGORIES_LIST = ['All', 'Plumbing', 'Electrical', 'AC Repair', 'Carpentry', 'House Cleaning', 'Painting'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manage Service Providers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review trade licensing, verify certifications, inspect ratings, and oversee partner statuses.
          </p>
        </div>

        {counts.pending > 0 && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>{counts.pending} Awaiting Verification</span>
          </div>
        )}
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-4">
        
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('All')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'All' ? 'bg-[#0B3A82] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Providers ({counts.all})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('Pending Verification')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'Pending Verification'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>Pending Verification</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-900 text-[10px]">
              {counts.pending}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('Verified')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'Verified' ? 'bg-[#0B3A82] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Verified ({counts.verified})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('Suspended')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'Suspended' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Suspended ({counts.suspended})
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search provider name, ID, location..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-medium text-slate-700"
            >
              {CATEGORIES_LIST.map((c, i) => (
                <option key={i} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Providers Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Provider ID</th>
                <th className="py-3 px-4">Provider / Business</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredProviders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-medium">
                    No service providers found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredProviders.map((p) => {
                  const isVerified = p.status === 'Verified';
                  const isPending = p.status === 'Pending Verification';
                  const isSuspended = p.status === 'Suspended';

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{p.id}</td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-[#0B3A82] text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{p.name}</span>
                            <span className="text-[10px] text-slate-400">{p.phone}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold">
                          {p.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">{p.location}</td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 font-bold text-slate-800">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{p.rating}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({p.reviewsCount || 0})</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          isVerified
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isPending
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {p.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Review & Verify Button */}
                          <button
                            type="button"
                            onClick={() => onSelectProvider(p)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                            title="Review Credentials & Documents"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Review</span>
                          </button>

                          {/* Quick Verify */}
                          {isPending && (
                            <button
                              type="button"
                              onClick={() => handleVerify(p.id, p.name)}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                              title="Quick Approve"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}

                          {/* Suspend / Re-activate */}
                          <button
                            type="button"
                            onClick={() => handleSuspend(p.id, p.name)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isSuspended
                                ? 'text-emerald-600 hover:bg-emerald-50'
                                : 'text-amber-600 hover:bg-amber-50'
                            }`}
                            title={isSuspended ? 'Reactivate Provider' : 'Suspend Provider'}
                          >
                            {isSuspended ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Provider"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
