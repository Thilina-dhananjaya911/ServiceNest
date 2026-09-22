import React, { useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  MapPin,
  Phone,
  User,
  AlertCircle,
  Eye,
  X,
  Plus
} from 'lucide-react';

const STATUS_CONFIG = {
  Pending: { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  Accepted: { bg: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  'In Progress': { bg: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
  Completed: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  Cancelled: { bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' }
};

export default function CustomerRequestsPage({ requests = [], onNavigate, onCancelRequest }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const tabs = ['All', 'Pending', 'Accepted', 'In Progress', 'Completed', 'Cancelled'];

  const filteredRequests = requests.filter((r) => {
    if (activeTab === 'All') return true;
    return r.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Requests & Bookings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Track the real-time status of your service bookings and work orders.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate && onNavigate('services')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Book New Service</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200/80 scrollbar-none">
        {tabs.map((tab) => {
          const count = tab === 'All'
            ? requests.length
            : requests.filter((r) => r.status.toLowerCase() === tab.toLowerCase()).length;
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <span>{tab}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Requests List Grid */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No requests found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You don't have any requests under "{activeTab}". Browse our verified providers to request a service.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('providers')}
              className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              Browse Service Providers
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequests.map((req) => {
            const statusStyle = STATUS_CONFIG[req.status] || STATUS_CONFIG.Pending;

            return (
              <div
                key={req.id}
                className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Service Name & Status Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">
                        {req.service}
                      </h3>
                      <p className="text-xs text-blue-600 font-semibold mt-0.5">
                        Provider: {req.providerName || req.customer || 'Assigned Technician'}
                      </p>
                    </div>

                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusStyle.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                      <span>{req.status}</span>
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-1.5 text-xs text-slate-500 py-2 border-y border-slate-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{req.date} {req.time ? `• ${req.time}` : ''}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{req.location || 'Colombo'}</span>
                    </div>

                    {req.description && (
                      <p className="text-[11px] text-slate-600 line-clamp-2 pt-1">
                        "{req.description}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 flex items-center justify-between mt-2">
                  <span className="text-xs font-bold text-slate-800">
                    {req.estimatedPrice || 'Price on Inspection'}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedRequest(req)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 relative">
            <button
              type="button"
              onClick={() => setSelectedRequest(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                (STATUS_CONFIG[selectedRequest.status] || STATUS_CONFIG.Pending).bg
              }`}>
                <span>{selectedRequest.status}</span>
              </span>
              <h3 className="text-base font-extrabold text-slate-900">
                {selectedRequest.service}
              </h3>
              <p className="text-xs text-slate-500">
                Request ID: #SN-{selectedRequest.id}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Service Provider:</span>
                <span className="font-bold text-slate-800">{selectedRequest.providerName || 'TechFlow Plumbing'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Date:</span>
                <span className="font-bold text-slate-800">{selectedRequest.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-bold text-slate-800">{selectedRequest.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-bold text-slate-800">{selectedRequest.contact || '+94 77 123 4567'}</span>
              </div>
            </div>

            {selectedRequest.description && (
              <div className="text-xs space-y-1">
                <span className="font-semibold text-slate-700">Problem Description:</span>
                <p className="p-3 bg-slate-50 rounded-xl text-slate-600 leading-relaxed border border-slate-200/60">
                  {selectedRequest.description}
                </p>
              </div>
            )}

            <div className="pt-2 flex gap-3">
              {selectedRequest.status === 'Pending' && (
                <button
                  type="button"
                  onClick={() => {
                    if (onCancelRequest) onCancelRequest(selectedRequest.id);
                    setSelectedRequest(null);
                  }}
                  className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl transition-colors cursor-pointer border border-rose-200"
                >
                  Cancel Request
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="w-full py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
