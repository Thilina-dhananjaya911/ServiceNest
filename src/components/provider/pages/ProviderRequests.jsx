import React, { useState } from 'react';
import {
  FileText,
  Check,
  Ban,
  Play,
  CheckCircle2,
  Eye,
  User,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import Modal from '../ui/Modal';
import ContactDetails from '../ui/ContactDetails';

const INITIAL_REQUESTS = [
  {
    id: 1,
    service: 'Plumbing Service',
    customer: 'Amara Perera',
    date: '20 May 2025',
    location: 'Colombo 05',
    status: 'Pending',
    contact: '+94 77 123 4567',
    description: 'Leaking pipe under kitchen sink requiring urgent repair.'
  },
  {
    id: 2,
    service: 'Pipe Repair',
    customer: 'Nimal Silva',
    date: '19 May 2025',
    location: 'Colombo 07',
    status: 'Pending',
    contact: '+94 71 987 6543',
    description: 'Busted pipe joint causing water leakage in bathroom.'
  },
  {
    id: 3,
    service: 'Drain Cleaning',
    customer: 'Kasun Dias',
    date: '18 May 2025',
    location: 'Colombo 03',
    status: 'In Progress',
    contact: '+94 76 555 4321',
    description: 'Main drainage blockage behind utility room.'
  },
  {
    id: 4,
    service: 'Water Tank Cleaning',
    customer: 'Dilani Fernando',
    date: '16 May 2025',
    location: 'Colombo 04',
    status: 'Accepted',
    contact: '+94 70 111 2222',
    description: 'Annual cleaning and chemical flushing of 1000L water tank.'
  },
  {
    id: 5,
    service: 'Electrical Wiring Repair',
    customer: 'Nuwan Perera',
    date: '15 May 2025',
    location: 'Colombo 10',
    status: 'Completed',
    contact: '+94 72 333 4444',
    description: 'Circuit breaker trip fix and short circuit check.'
  }
];

const TABS = ['All', 'Pending', 'Accepted', 'In Progress', 'Completed', 'Rejected'];

export default function ProviderRequests({ requests: propRequests, onStatusUpdate: propOnStatusUpdate }) {
  const [internalRequests, setInternalRequests] = useState(INITIAL_REQUESTS);
  const requests = propRequests || internalRequests;
  const [activeTab, setActiveTab] = useState('All');
  const [viewingRequest, setViewingRequest] = useState(null);

  const handleStatusUpdate = (id, newStatus) => {
    if (propOnStatusUpdate) {
      propOnStatusUpdate(id, newStatus);
    } else {
      setInternalRequests(
        internalRequests.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
    }
    if (viewingRequest && viewingRequest.id === id) {
      setViewingRequest((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const filteredRequests = requests.filter((r) => {
    if (activeTab === 'All') return true;
    return r.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
          <FileText className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Requests
          </h1>
          <p className="text-xs text-slate-500">
            Manage incoming customer service requests.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200/80">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          const count = tab === 'All' ? requests.length : requests.filter(r => r.status.toLowerCase() === tab.toLowerCase()).length;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/70'
              }`}
            >
              <span>{tab}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-500'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Requests Table Container */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/70 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">Service</th>
                <th className="py-3 px-5">Customer</th>
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Location</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 whitespace-nowrap">{row.service}</td>
                    <td className="py-3.5 px-5 text-slate-700 whitespace-nowrap">{row.customer}</td>
                    <td className="py-3.5 px-5 text-slate-500 whitespace-nowrap">{row.date}</td>
                    <td className="py-3.5 px-5 text-slate-600 whitespace-nowrap">{row.location}</td>
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {row.status === 'Pending' && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleStatusUpdate(row.id, 'Accepted')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg transition-colors flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" /> Accept
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusUpdate(row.id, 'Rejected')}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-bold text-[11px] rounded-lg transition-colors flex items-center gap-1"
                            >
                              <Ban className="w-3 h-3" /> Reject
                            </button>
                          </>
                        )}

                        {row.status === 'Accepted' && (
                          <button
                            type="button"
                            onClick={() => handleStatusUpdate(row.id, 'In Progress')}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Play className="w-3 h-3" /> Start Job
                          </button>
                        )}

                        {row.status === 'In Progress' && (
                          <button
                            type="button"
                            onClick={() => handleStatusUpdate(row.id, 'Completed')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg transition-colors flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3" /> Mark Complete
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setViewingRequest(row)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" /> View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400 text-xs">
                    No requests found for tab "{activeTab}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Request Details Modal */}
      <Modal
        isOpen={Boolean(viewingRequest)}
        onClose={() => setViewingRequest(null)}
        title="Request Details"
      >
        {viewingRequest && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="font-bold text-slate-900 text-sm">{viewingRequest.service}</span>
                <StatusBadge status={viewingRequest.status} />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-slate-600">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Customer: <strong className="text-slate-900">{viewingRequest.customer}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Contact: <strong className="text-slate-900">{viewingRequest.contact}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Requested: <strong>{viewingRequest.date}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Location: <strong>{viewingRequest.location}</strong></span>
                </div>
              </div>

              {viewingRequest.description && (
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="block font-semibold text-slate-500 mb-0.5">Description:</span>
                  <p className="text-slate-700 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">
                    {viewingRequest.description}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Action inside modal */}
            <div className="flex items-center justify-between pt-2">
              <div>
                {viewingRequest.status === 'Pending' && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleStatusUpdate(viewingRequest.id, 'Accepted')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-xs"
                    >
                      Accept Request
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusUpdate(viewingRequest.id, 'Rejected')}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-bold text-xs rounded-lg"
                    >
                      Reject Request
                    </button>
                  </div>
                )}
                {viewingRequest.status === 'Accepted' && (
                  <button
                    type="button"
                    onClick={() => handleStatusUpdate(viewingRequest.id, 'In Progress')}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-xs"
                  >
                    Start Job Now
                  </button>
                )}
                {viewingRequest.status === 'In Progress' && (
                  <button
                    type="button"
                    onClick={() => handleStatusUpdate(viewingRequest.id, 'Completed')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-xs"
                  >
                    Mark Job Completed
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setViewingRequest(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Reusable Contact Details Footer */}
      <ContactDetails />

    </div>
  );
}
