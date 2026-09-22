import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Hourglass,
  Clock,
  CheckCircle2,
  ArrowRight,
  X,
  Check,
  Ban
} from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import ContactDetails from '../ui/ContactDetails';

const INITIAL_RECENT_REQUESTS = [
  {
    id: 1,
    date: '21 May 2025',
    service: 'Plumbing Service',
    location: 'Colombo 03',
    status: 'Pending',
    customer: 'Amara Perera',
    contact: '+94 77 123 4567',
    description: 'Leaking pipe under kitchen sink requiring urgent repair.'
  },
  {
    id: 2,
    date: '19 May 2025',
    service: 'Pest Repair',
    location: 'Colombo 07',
    status: 'Pending',
    customer: 'Nimal Silva',
    contact: '+94 71 987 6543',
    description: 'Termite damage assessment and wood treatment.'
  },
  {
    id: 3,
    date: '18 May 2025',
    service: 'Drain Cleaning',
    location: 'Colombo 03',
    status: 'In Progress',
    customer: 'Kasun Dias',
    contact: '+94 76 555 4321',
    description: 'Clogged main drainage pipe in bathroom.'
  },
  {
    id: 4,
    date: '16 May 2025',
    service: 'Water Tank Cleaning',
    location: 'Colombo 04',
    status: 'Completed',
    customer: 'Dilani Fernando',
    contact: '+94 70 111 2222',
    description: 'Overhead 1000L water storage tank cleaning and chlorination.'
  },
  {
    id: 5,
    date: '12 May 2025',
    service: 'Pipe Installation',
    location: 'Colombo 05',
    status: 'Completed',
    customer: 'Rohan Wickrama',
    contact: '+94 72 333 4444',
    description: 'New PVC pipeline connection for garden tap.'
  }
];

export default function ProviderDashboard({ setCurrentView }) {
  const [requests, setRequests] = useState(INITIAL_RECENT_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Page Title Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
          <LayoutDashboard className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-slate-500">Your activity at a glance</p>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Total Requests */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
            <Package className="w-4 h-4" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900 block leading-none mb-1">
            18
          </span>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Total Requests
          </span>
        </div>

        {/* Stat 2: Pending Requests */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <Hourglass className="w-4 h-4" />
          </div>
          <span className="text-2xl font-extrabold text-amber-600 block leading-none mb-1">
            10
          </span>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Pending Requests
          </span>
        </div>

        {/* Stat 3: In Progress */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-2xl font-extrabold text-blue-600 block leading-none mb-1">
            6
          </span>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            In Progress
          </span>
        </div>

        {/* Stat 4: Completed */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-2xl font-extrabold text-emerald-600 block leading-none mb-1">
            28
          </span>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Completed
          </span>
        </div>

      </div>

      {/* Recent Requests Section */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
        <div className="p-5 flex items-center justify-between border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">Recent Requests</h2>
          <button
            type="button"
            onClick={() => setCurrentView('requests')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/70 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Service Name</th>
                <th className="py-3 px-5">Location</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {requests.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-5 text-slate-500 whitespace-nowrap">{row.date}</td>
                  <td className="py-3.5 px-5 font-bold text-slate-900 whitespace-nowrap">{row.service}</td>
                  <td className="py-3.5 px-5 text-slate-600 whitespace-nowrap">{row.location}</td>
                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-3.5 px-5 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedRequest(row)}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-800 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expanded Request Details Box (Exact match to Screenshot 3) */}
      {selectedRequest && (
        <div className="bg-white border-2 border-emerald-200/80 rounded-2xl p-5 shadow-lg relative animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h3 className="text-sm font-extrabold text-slate-900">Request Details</h3>
            <button
              type="button"
              onClick={() => setSelectedRequest(null)}
              className="text-slate-400 hover:text-slate-600 text-xs font-medium flex items-center gap-1"
            >
              <X className="w-4 h-4" /> Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs mb-4">
            <div>
              <span className="block text-[10px] text-slate-400 font-semibold uppercase">Date</span>
              <span className="font-bold text-slate-800">{selectedRequest.date}</span>
            </div>

            <div>
              <span className="block text-[10px] text-slate-400 font-semibold uppercase">Service</span>
              <span className="font-bold text-slate-900">{selectedRequest.service}</span>
            </div>

            <div>
              <span className="block text-[10px] text-slate-400 font-semibold uppercase">Location</span>
              <span className="font-bold text-slate-800">{selectedRequest.location}</span>
            </div>

            <div>
              <span className="block text-[10px] text-slate-400 font-semibold uppercase">Status</span>
              <StatusBadge status={selectedRequest.status} />
            </div>
          </div>

          {selectedRequest.customer && (
            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 mb-4 space-y-1">
              <div><span className="font-semibold text-slate-500">Customer Name:</span> {selectedRequest.customer}</div>
              <div><span className="font-semibold text-slate-500">Contact:</span> {selectedRequest.contact}</div>
              <div><span className="font-semibold text-slate-500">Description:</span> {selectedRequest.description}</div>
            </div>
          )}

          {/* Action Buttons for Pending requests */}
          {selectedRequest.status === 'Pending' ? (
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => handleStatusChange(selectedRequest.id, 'Accepted')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Check className="w-3.5 h-3.5" /> Accept
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange(selectedRequest.id, 'Rejected')}
                className="px-4 py-2 bg-white border border-slate-300 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Ban className="w-3.5 h-3.5" /> Decline
              </button>
            </div>
          ) : (
            <div className="text-xs text-slate-500 font-medium">
              This request status is currently <span className="font-bold text-slate-800">{selectedRequest.status}</span>.
            </div>
          )}
        </div>
      )}

      {/* Reusable Contact Details Footer */}
      <ContactDetails />

    </div>
  );
}
