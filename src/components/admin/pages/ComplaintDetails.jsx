import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  User,
  Briefcase,
  Phone,
  Mail,
  Send,
  MessageSquare,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export default function ComplaintDetails({
  complaint,
  onBack,
  onUpdateStatus
}) {
  const [selectedStatus, setSelectedStatus] = useState(complaint?.status || 'Pending');
  const [adminNote, setAdminNote] = useState('');
  const [savedToast, setSavedToast] = useState(null);

  if (!complaint) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
        <p className="text-slate-500 text-sm">No complaint ticket selected.</p>
        <button
          type="button"
          onClick={onBack}
          className="mt-3 px-4 py-2 bg-[#0B3A82] text-white text-xs font-bold rounded-xl cursor-pointer"
        >
          Return to Complaints List
        </button>
      </div>
    );
  }

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    onUpdateStatus(complaint.id, newStatus, adminNote);
    setSavedToast(`Complaint status updated to "${newStatus}".`);
    setTimeout(() => setSavedToast(null), 3500);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!adminNote.trim()) return;
    onUpdateStatus(complaint.id, selectedStatus, adminNote.trim());
    setSavedToast('Resolution note recorded in complaint history.');
    setAdminNote('');
    setTimeout(() => setSavedToast(null), 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto">
      
      {/* Toast Alert */}
      {savedToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{savedToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-700" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Dispute Ticket {complaint.id}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                selectedStatus === 'Resolved'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : selectedStatus === 'In Progress'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {selectedStatus}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                Priority: {complaint.priority}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Submitted on {complaint.submittedDate}
            </p>
          </div>
        </div>

        {/* Quick Status Changers */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleStatusChange('Pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedStatus === 'Pending'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Mark Pending
          </button>

          <button
            type="button"
            onClick={() => handleStatusChange('In Progress')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedStatus === 'In Progress'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Mark In Progress
          </button>

          <button
            type="button"
            onClick={() => handleStatusChange('Resolved')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedStatus === 'Resolved'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Mark Resolved
          </button>
        </div>
      </div>

      {/* Main Grid: Complaint Details & Sidebar Meta */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Issue Statement, Details, and Timeline */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Issue Statement Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] uppercase tracking-wider font-bold text-rose-600 block">Reported Issue</span>
              <h2 className="text-base font-extrabold text-slate-900 mt-1">{complaint.issue}</h2>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-bold">
                Category: {complaint.category}
              </span>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Detailed Description</h3>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 leading-relaxed font-medium">
                {complaint.description}
              </div>
            </div>
          </div>

          {/* Timeline & Resolution Audit History */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Resolution Timeline & History
            </h3>

            <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {(complaint.timeline || []).map((t, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#2563EB] ring-4 ring-white" />
                  <div className="text-xs font-bold text-slate-900">{t.event}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{t.date}</div>
                </div>
              ))}
            </div>

            {/* Add Admin Resolution Note */}
            <form onSubmit={handleAddNote} className="pt-4 border-t border-slate-100 space-y-2">
              <label className="block text-xs font-bold text-slate-700">Add Administrator Note / Update</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Record outcome, phone follow-up, or settlement agreement..."
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0B3A82] hover:bg-blue-900 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Note</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Right 4 Cols: Involved Parties */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Customer Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <User className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Customer Info</h3>
            </div>

            <div>
              <span className="font-bold text-sm text-slate-900 block">{complaint.customerName}</span>
              <div className="text-xs text-slate-500 mt-1.5 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{complaint.customerEmail}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{complaint.customerPhone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Service Provider Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Accused Provider</h3>
            </div>

            <div>
              <span className="font-bold text-sm text-slate-900 block">{complaint.providerName}</span>
              <div className="text-xs text-slate-500 mt-1.5 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{complaint.providerPhone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{complaint.category} Registered</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
