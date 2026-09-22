import React, { useState } from 'react';
import {
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  MessageSquare,
  ShieldCheck,
  Send,
  CheckCircle2
} from 'lucide-react';

const FAQS = [
  {
    q: 'How do I request a service from a provider?',
    a: 'Browse the Services or Providers tab, choose a verified service provider, and click "Request Service". You can submit your address and preferred date/time without needing to log in for this demo.'
  },
  {
    q: 'Are all service providers verified on ServiceNest?',
    a: 'Yes, every service provider undergoes identity verification, skill certification checks, and background assessment before being marked with the "Verified Provider" badge.'
  },
  {
    q: 'How does payment work?',
    a: 'Payment is settled directly with the service provider upon job inspection or completion via cash or bank transfer. ServiceNest demo estimates are indicative of standard industry rates.'
  },
  {
    q: 'Can I reschedule or cancel a service request?',
    a: 'Yes, you can check the status of your requests under "My Request" in the left sidebar and message the provider directly to adjust the schedule.'
  }
];

export default function HelpSupportView() {
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [ticket, setTicket] = useState({ name: '', email: '', message: '' });

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Help and Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Have questions or need assistance? We are here to help 24/7.
        </p>
      </div>

      {/* Support Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <Phone className="w-5 h-5 stroke-[2.2]" />
          </div>
          <h3 className="text-xs font-bold text-slate-900">Phone Support</h3>
          <p className="text-xs text-slate-500 mt-0.5">+94 11 234 5678</p>
          <span className="text-[10px] text-emerald-600 font-medium mt-2 inline-block">Available 8:00 AM - 8:00 PM</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
            <Mail className="w-5 h-5 stroke-[2.2]" />
          </div>
          <h3 className="text-xs font-bold text-slate-900">Email Assistance</h3>
          <p className="text-xs text-slate-500 mt-0.5">support@servicenest.com</p>
          <span className="text-[10px] text-blue-600 font-medium mt-2 inline-block">Average response time: 2 hours</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <MapPin className="w-5 h-5 stroke-[2.2]" />
          </div>
          <h3 className="text-xs font-bold text-slate-900">Head Office</h3>
          <p className="text-xs text-slate-500 mt-0.5">Colombo, Sri Lanka</p>
          <span className="text-[10px] text-slate-400 font-medium mt-2 inline-block">No. 123, Main Street, Colombo 03</span>
        </div>
      </div>

      {/* Grid: FAQs + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FAQs Accordion */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-800 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>

                  {isOpen && (
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Support Ticket Form */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs">
          <h2 className="text-base font-bold text-slate-900 mb-1">Send a Message</h2>
          <p className="text-xs text-slate-500 mb-4">Have an issue? Submit a ticket to our customer desk.</p>

          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Ticket Submitted!</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Thank you, {ticket.name || 'valued customer'}. Our team will review your inquiry shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-blue-600 hover:underline pt-2 cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kasun Perera"
                  value={ticket.name}
                  onChange={(e) => setTicket({ ...ticket, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={ticket.email}
                  onChange={(e) => setTicket({ ...ticket, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Message / Issue Details</label>
                <textarea
                  rows="3"
                  required
                  placeholder="How can we assist you today?"
                  value={ticket.message}
                  onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer pt-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Ticket</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
