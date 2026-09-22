import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  MessageSquare,
  Share2,
  CheckCircle2,
  Edit,
  MoreVertical,
  Phone,
  Mail,
  Clock,
  X,
  Send,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function ProviderProfilePage({ providerData, onBack, onRequestSubmitted }) {
  const [activeTab, setActiveTab] = useState('about');
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Form State
  const [requestForm, setRequestForm] = useState({
    customerName: '',
    phone: '',
    service: '',
    date: '',
    time: 'Morning (8:00 AM - 12:00 PM)',
    location: '',
    details: ''
  });

  // Default provider matching Screenshot 3
  const provider = providerData || {
    id: 'techflow-plumbing',
    name: 'TechFlow Plumbing',
    category: 'Plumbing',
    rating: 4.8,
    reviewsCount: 123,
    experience: '5+ Years Experience',
    location: 'Colombo, Sri Lanka',
    jobsCompleted: '120+',
    yearsExp: '5+',
    positiveReviews: '96%',
    phone: '+94 77 123 4567',
    email: 'techflowplumbing@gmail.com',
    hours: 'Mon - Sun: 8:00 AM - 7:00 PM',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    bio: 'Professional plumbing services for all your home and office needs. Fast, reliable and affordable.',
    servicesOffered: [
      { name: 'Pipe Installation', price: 'LKR 1,500 - 2,000' },
      { name: 'Bathroom Fitting', price: 'LKR 2,000+' },
      { name: 'Pipe Repair', price: 'LKR 1,000 - 1,500' },
      { name: 'Leak Detection', price: 'LKR 1,500 - 2,500' },
      { name: 'Drain Cleaning', price: 'LKR 1,000 - 1,800' },
      { name: 'Tap Installation', price: 'LKR 800 - 1,200' },
      { name: 'Water Tank Cleaning', price: 'LKR 2,000 - 2,500' },
      { name: 'Emergency Plumbing', price: 'LKR 2,500+' },
    ],
    availabilitySchedule: [
      { day: 'Mon', hours: '8:00 AM - 7:00 PM' },
      { day: 'Tue', hours: '8:00 AM - 7:00 PM' },
      { day: 'Wed', hours: '8:00 AM - 7:00 PM' },
      { day: 'Thu', hours: '8:00 AM - 7:00 PM' },
      { day: 'Fri', hours: '8:00 AM - 7:00 PM' },
      { day: 'Sat', hours: '9:00 AM - 5:00 PM' },
      { day: 'Sun', hours: '9:00 AM - 5:00 PM' },
    ],
    reviewsList: [
      {
        id: 1,
        name: 'Nimal Perera',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Great service! They fixed the leaking pipe quickly and were very professional.'
      },
      {
        id: 2,
        name: 'Samanthi D.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Punctual, friendly and did an excellent job. Highly recommended!'
      },
      {
        id: 3,
        name: 'Ruwan K.',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
        rating: 4,
        date: '2 weeks ago',
        comment: 'Good work and reasonable price. Will use again.'
      }
    ]
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setRequestSubmitted(true);
    if (onRequestSubmitted) {
      onRequestSubmitted({
        providerName: provider.name,
        category: provider.category,
        ...requestForm
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. Top Header Bar matching Screenshot 3 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Provider Profile
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert('Edit profile is available in provider settings')}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Edit className="w-3.5 h-3.5 text-blue-600" />
            <span>Edit Profile</span>
          </button>
          <button
            type="button"
            className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-600 shadow-2xs"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Main Profile Grid: Left Column & Right Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Provider Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs text-center space-y-5">
            
            {/* Avatar with Online/Verified Dot */}
            <div className="relative mx-auto w-24 h-24 rounded-full bg-[#0B3A82] text-white text-3xl font-extrabold flex items-center justify-center shadow-md border-2 border-white ring-2 ring-blue-100">
              <span>{provider.name ? provider.name.charAt(0) : 'P'}</span>
              {provider.avatar && (
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="absolute inset-0 w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-white" />
            </div>

            {/* Provider Details */}
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {provider.name}
              </h2>
              
              <div className="flex items-center justify-center gap-1.5 text-xs text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                <span className="text-slate-900">{provider.rating || 4.8}</span>
                <span className="text-slate-400 font-normal">({provider.reviewsCount || 123} reviews)</span>
              </div>

              <p className="text-xs text-slate-600 font-semibold pt-0.5">
                {provider.category} • {provider.experience || '5+ Years Experience'}
              </p>

              <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{provider.location}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setRequestSubmitted(false);
                  setRequestModalOpen(true);
                }}
                className="w-full py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Request Service</span>
              </button>

              <button
                type="button"
                onClick={() => alert(`Opening chat with ${provider.name}...`)}
                className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>Chat</span>
              </button>
            </div>

            {/* 3 Metric Boxes */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="block text-base font-extrabold text-slate-900">{provider.jobsCompleted || '120+'}</span>
                <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">Jobs Completed</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="block text-base font-extrabold text-slate-900">{provider.yearsExp || '5+'}</span>
                <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">Years Experience</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="block text-base font-extrabold text-slate-900">{provider.positiveReviews || '96%'}</span>
                <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">Positive Reviews</span>
              </div>
            </div>

            {/* Contact Information Box */}
            <div className="text-left space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900">Contact Information</h4>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>{provider.phone || '+94 77 123 4567'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>{provider.email || 'techflowplumbing@gmail.com'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>{provider.hours || 'Mon - Sun: 8:00 AM - 7:00 PM'}</span>
                </div>
              </div>
            </div>

            {/* Share Profile Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => alert('Profile link copied to clipboard!')}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-200/80 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Profile</span>
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Tab Content */}
        <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
          
          {/* Tab Navigation matching Screenshot 3 */}
          <div className="flex items-center gap-6 border-b border-slate-100 pb-3 text-xs sm:text-sm font-semibold overflow-x-auto">
            {[
              { id: 'about', label: 'About' },
              { id: 'services', label: 'Services' },
              { id: 'availability', label: 'Availability' },
              { id: 'reviews', label: `Reviews (${provider.reviewsCount || 123})` },
              { id: 'gallery', label: 'Gallery' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`pb-1 transition-colors cursor-pointer shrink-0 ${
                  activeTab === tab.id
                    ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Section: About Me */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">About Me</h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Provider</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {provider.bio || 'Professional plumbing services for all your home and office needs. Fast, reliable and affordable.'}
            </p>
          </div>

          {/* Section: Services Offered */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Services Offered</h3>
              <button
                type="button"
                onClick={() => setActiveTab('services')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                View All Services
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
              {(provider.servicesOffered || []).map((svc, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span className="text-slate-800 font-medium">{svc.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{svc.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Availability */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-slate-900">Availability</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center text-xs">
              {(provider.availabilitySchedule || [
                { day: 'Mon', hours: '8:00 AM - 7:00 PM' },
                { day: 'Tue', hours: '8:00 AM - 7:00 PM' },
                { day: 'Wed', hours: '8:00 AM - 7:00 PM' },
                { day: 'Thu', hours: '8:00 AM - 7:00 PM' },
                { day: 'Fri', hours: '8:00 AM - 7:00 PM' },
                { day: 'Sat', hours: '9:00 AM - 5:00 PM' },
                { day: 'Sun', hours: '9:00 AM - 5:00 PM' },
              ]).map((slot, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                  <span className="font-bold text-blue-600 block text-xs mb-1">{slot.day}</span>
                  <span className="text-[10px] text-slate-600 leading-tight block">{slot.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Customer Reviews */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-slate-900">Customer Reviews ({provider.reviewsCount || 123})</h3>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-center sm:text-left">
                <span className="text-4xl font-extrabold text-slate-900">{provider.rating || 4.8}</span>
                <div className="flex items-center justify-center sm:justify-start gap-0.5 text-amber-400 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400">Based on {provider.reviewsCount || 123} reviews</span>
              </div>

              {/* Progress Bars */}
              <div className="flex-1 space-y-1 w-full text-[10px] text-slate-500">
                {[
                  { star: '5 ★', pct: 92 },
                  { star: '4 ★', pct: 6 },
                  { star: '3 ★', pct: 1 },
                  { star: '2 ★', pct: 1 },
                  { star: '1 ★', pct: 0 },
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-2">
                    <span className="w-5">{row.star}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="w-6 text-right">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews matching Screenshot 3 */}
            <div className="space-y-3">
              {(provider.reviewsList || []).map((rev) => (
                <div key={rev.id} className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 border border-slate-300 relative overflow-hidden">
                        <span>{rev.name.charAt(0)}</span>
                        {rev.avatar && (
                          <img
                            src={rev.avatar}
                            alt={rev.name}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-xs text-slate-900 block leading-tight">{rev.name}</span>
                        <div className="flex items-center gap-0.5 text-amber-400 mt-0.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug pl-9">{rev.comment}</p>
                </div>
              ))}
            </div>

            <div className="text-center pt-1">
              <button type="button" className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                View All Reviews
              </button>
            </div>
          </div>

          {/* Section: Work Gallery matching Screenshot 3 */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Work Gallery</h3>
              <button type="button" className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                View All Photos
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { title: 'Pipe Repair', img: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=300&auto=format&fit=crop&q=80' },
                { title: 'Under-Sink Fix', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&auto=format&fit=crop&q=80' },
                { title: 'Joint Coupling', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&auto=format&fit=crop&q=80' },
                { title: 'Copper Fittings', img: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&auto=format&fit=crop&q=80' },
                { title: 'Water Tank Pump', img: 'https://images.unsplash.com/photo-1542013936693-884638332954?w=300&auto=format&fit=crop&q=80' },
              ].map((item, idx) => (
                <div key={idx} className="group relative rounded-xl overflow-hidden aspect-4/3 bg-slate-100 border border-slate-200 shadow-2xs flex items-center justify-center">
                  <div className="text-[11px] font-bold text-slate-400">{item.title}</div>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent p-1.5 text-center">
                    <span className="text-[10px] text-white font-medium block truncate">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 3. Customer Service Request Modal (NO LOGIN REQUIRED) */}
      {requestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            
            {/* Close button */}
            <button
              type="button"
              onClick={() => setRequestModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {requestSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Service Request Submitted Successfully!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Thank you! Your request for <strong>{requestForm.service || provider.category}</strong> has been sent to <strong>{provider.name}</strong>.
                </p>
                <div className="pt-3 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRequestModalOpen(false)}
                    className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full">
                    DEMO SERVICE REQUEST
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    Request Service from {provider.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    No login required. Fill out the details below to request a service.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kasun Perera"
                      value={requestForm.customerName}
                      onChange={(e) => setRequestForm({ ...requestForm, customerName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+94 77 123 4567"
                        value={requestForm.phone}
                        onChange={(e) => setRequestForm({ ...requestForm, phone: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Select Service *</label>
                      <select
                        value={requestForm.service || provider.category}
                        onChange={(e) => setRequestForm({ ...requestForm, service: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium cursor-pointer"
                      >
                        {(provider.servicesOffered || []).map((s, i) => (
                          <option key={i} value={s.name}>{s.name} ({s.price})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        value={requestForm.date}
                        onChange={(e) => setRequestForm({ ...requestForm, date: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Preferred Time Slot *</label>
                      <select
                        value={requestForm.time}
                        onChange={(e) => setRequestForm({ ...requestForm, time: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs cursor-pointer"
                      >
                        <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                        <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                        <option value="Evening (5:00 PM - 7:00 PM)">Evening (5:00 PM - 7:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Service Address / Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. No 45, Galle Road, Colombo 03"
                      value={requestForm.location}
                      onChange={(e) => setRequestForm({ ...requestForm, location: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Job Details / Description</label>
                    <textarea
                      rows="2"
                      placeholder="Describe the issue or requirements in detail..."
                      value={requestForm.details}
                      onChange={(e) => setRequestForm({ ...requestForm, details: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirm & Send Request</span>
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
