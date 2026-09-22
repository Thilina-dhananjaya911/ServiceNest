import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  ArrowLeft,
  FileText,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Star,
  Award,
  Clock,
  Eye,
  X
} from 'lucide-react';

export default function ProviderVerification({
  provider,
  onBack,
  onVerify,
  onReject
}) {
  const [docModal, setDocModal] = useState(null);
  const [successToast, setSuccessToast] = useState(null);

  if (!provider) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
        <p className="text-slate-500 text-sm">No provider selected for verification review.</p>
        <button
          type="button"
          onClick={onBack}
          className="mt-3 px-4 py-2 bg-[#0B3A82] text-white text-xs font-bold rounded-xl cursor-pointer"
        >
          Return to Providers List
        </button>
      </div>
    );
  }

  const isVerified = provider.status === 'Verified';
  const isPending = provider.status === 'Pending Verification';

  const handleVerifyAction = () => {
    onVerify(provider.id);
    setSuccessToast(`Provider "${provider.name}" has been successfully verified!`);
  };

  const handleRejectAction = () => {
    onReject(provider.id);
    setSuccessToast(`Provider "${provider.name}" verification marked as rejected.`);
  };

  const DOCUMENTS = [
    {
      title: 'National Identity Card (NIC)',
      number: provider.documents?.nicNumber || '198812345678',
      frontFile: provider.documents?.nicFront || 'NIC_Front_Uploaded.pdf',
      backFile: provider.documents?.nicBack || 'NIC_Back_Uploaded.pdf',
      status: 'Uploaded & Legible',
      icon: FileText
    },
    {
      title: 'Police Clearance Certificate',
      number: 'POL-CLR-2024-88',
      frontFile: provider.documents?.policeReport || 'Police_Clearance_Report.pdf',
      status: 'Valid Record',
      icon: ShieldCheck
    },
    {
      title: 'Trade Qualifications & Certificates',
      number: 'NVQ-Level-4-Trade',
      frontFile: provider.documents?.tradeCert || 'National_Vocational_Certificate.pdf',
      status: 'Accredited Qualification',
      icon: Award
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto">
      
      {/* Toast */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Header */}
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
                Provider Verification Review
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                isVerified
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : isPending
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {provider.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Review authentic identification, certificates, and compliance documentation.
            </p>
          </div>
        </div>

        {/* Verification Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleRejectAction}
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200/80 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <XCircle className="w-4 h-4" />
            <span>Reject / Resubmit</span>
          </button>

          <button
            type="button"
            onClick={handleVerifyAction}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Verify Provider</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Profile Details + Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 4 Cols: Provider Profile Card */}
        <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-5 text-center sm:text-left">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#0B3A82] text-white text-2xl font-black flex items-center justify-center shadow-md mb-3">
              {provider.name.charAt(0)}
            </div>
            <h2 className="text-base font-bold text-slate-900 leading-tight">{provider.name}</h2>
            <span className="text-xs font-semibold text-blue-600 mt-0.5 block">{provider.category}</span>
            <span className="text-[11px] text-slate-400 font-mono mt-1">{provider.id}</span>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{provider.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{provider.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{provider.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Experience: {provider.experience}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              <span>Rating: {provider.rating} ({provider.reviewsCount || 0} reviews)</span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 text-left">
            <h4 className="text-xs font-bold text-slate-800 mb-1">Provider Biography</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {provider.bio || 'Verified service professional operating in Western Province.'}
            </p>
          </div>
        </div>

        {/* Right 8 Cols: Verification Documents Section */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Uploaded Verification Documents</h3>
                <p className="text-xs text-slate-500">Government credentials and certified trade verifications</p>
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                3 Documents Available
              </span>
            </div>

            {/* Documents List */}
            <div className="space-y-3">
              {DOCUMENTS.map((doc, idx) => {
                const Icon = doc.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0B3A82] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{doc.title}</h4>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">Reference: {doc.number}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                            {doc.frontFile}
                          </span>
                          {doc.backFile && (
                            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                              {doc.backFile}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setDocModal(doc)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold rounded-xl transition-colors shrink-0 shadow-2xs cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Document</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Verification Audit Note */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 text-xs text-blue-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">ServiceNest Trust & Quality Policy</span>
              <p className="text-[11px] text-blue-800/80 mt-0.5 leading-relaxed">
                Approving a provider grants them the verified badge on customer listings and allows them to receive direct job requests. Ensure names on NIC match the bank account details.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Document View Preview Modal */}
      {docModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              type="button"
              onClick={() => setDocModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{docModal.title}</h3>
                <span className="text-[11px] text-slate-400 font-mono">{docModal.number}</span>
              </div>
            </div>

            {/* Simulated Document Preview Card */}
            <div className="bg-slate-100 rounded-2xl p-8 border-2 border-dashed border-slate-300 text-center space-y-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto text-blue-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Digital Verification Copy</span>
                <span className="text-[11px] text-slate-500 font-mono block mt-1">{docModal.frontFile}</span>
              </div>
              <div className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Identity & Cryptographic Hash Verified
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setDocModal(null)}
                className="px-5 py-2 bg-[#0B3A82] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
