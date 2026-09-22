import React from 'react';
import { PhoneCall, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactDetails() {
  return (
    <div className="mt-10 pt-6 border-t border-slate-200/80">
      <div className="flex items-center gap-2 mb-1">
        <Clock className="w-4 h-4 text-emerald-600" />
        <h3 className="text-sm font-bold text-slate-900">Contact Details</h3>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Get in touch with us if you need any help or support
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Call Us */}
        <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[10px] uppercase font-semibold text-slate-400">CALL US</span>
            <span className="text-xs font-bold text-slate-900">+94 71 234 5678</span>
          </div>
        </div>

        {/* Email Us */}
        <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[10px] uppercase font-semibold text-slate-400">EMAIL US</span>
            <span className="text-xs font-bold text-slate-900">support@servicenest.lk</span>
          </div>
        </div>

        {/* Location */}
        <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[10px] uppercase font-semibold text-slate-400">OUR LOCATION</span>
            <span className="text-xs font-bold text-slate-900">Vavuniya, Sri Lanka</span>
          </div>
        </div>
      </div>
    </div>
  );
}
