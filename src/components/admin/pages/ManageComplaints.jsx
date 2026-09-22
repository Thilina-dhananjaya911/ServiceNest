import React, { useState } from 'react';
import {
  AlertTriangle,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Eye,
  Trash2,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function ManageComplaints({
  complaints = [],
  onSelectComplaint,
  onDeleteComplaint
}) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to dismiss complaint ticket ${id}?`)) {
      onDeleteComplaint(id);
      showToast(`Complaint ticket ${id} has been dismissed.`);
    }
  };

  // Filter Logic
  const filteredComplaints = complaints.filter((c) => {
    const matchesTab =
      activeTab === 'All'
        ? true
        : activeTab === 'Pending'
        ? c.status === 'Pending'
        : activeTab === 'In Progress'
        ? c.status === 'In Progress'
        : c.status === 'Resolved';

    const matchesPriority =
      priorityFilter === 'All' ? true : c.priority.toLowerCase() === priorityFilter.toLowerCase();

    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.issue.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesPriority && matchesSearch;
  });

  const counts = {
    all: complaints.length,
    pending: complaints.filter((c) => c.status === 'Pending').length,
    inProgress: complaints.filter((c) => c.status === 'In Progress').length,
    resolved: complaints.filter((c) => c.status === 'Resolved').length
  };

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
            Customer Complaints & Disputes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Resolve customer concerns, investigate reported violations, and maintain quality integrity.
          </p>
        </div>

        {counts.pending > 0 && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>{counts.pending} Open Issues Need Attention</span>
          </div>
        )}
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-4">
        
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('All')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'All' ? 'bg-[#0B3A82] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Tickets ({counts.all})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('Pending')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'Pending' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>Pending</span>
            <span className="px-1.5 py-0.2 rounded-full bg-rose-200 text-rose-900 text-[10px]">
              {counts.pending}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('In Progress')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'In Progress' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>In Progress</span>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-200 text-blue-900 text-[10px]">
              {counts.inProgress}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('Resolved')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'Resolved' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Resolved ({counts.resolved})
          </button>
        </div>

        {/* Search & Priority Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ticket ID, customer, provider, or issue..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-medium text-slate-700"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>

      </div>

      {/* Complaints Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Provider</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Reported Issue</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 font-medium">
                    No complaints found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((c) => {
                  const isResolved = c.status === 'Resolved';
                  const isInProgress = c.status === 'In Progress';

                  return (
                    <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{c.id}</td>

                      <td className="py-3.5 px-4 font-bold text-slate-900">{c.customerName}</td>

                      <td className="py-3.5 px-4 text-slate-600">{c.providerName}</td>

                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                          {c.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs truncate text-slate-800 font-medium" title={c.issue}>
                        {c.issue}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          c.priority === 'High'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : c.priority === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {c.priority}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          isResolved
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isInProgress
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {c.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => onSelectComplaint(c)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                            title="View Investigation Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(c.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Dismiss Complaint"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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
