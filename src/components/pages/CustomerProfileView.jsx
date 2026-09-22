import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Edit2,
  Save,
  Clock,
  Heart,
  FileText,
  Star,
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';

export default function CustomerProfileView({
  customerName = 'Kasun Perera',
  onNavigate
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: customerName || 'Kasun Perera',
    email: 'kasun.perera@example.com',
    phone: '+94 77 123 4567',
    address: 'No. 45, Galle Road',
    city: 'Colombo 03',
    postalCode: '00300'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const FAVORITE_PROVIDERS = [
    {
      id: 'techflow-plumbing',
      name: 'TechFlow Plumbing',
      category: 'Plumbing',
      rating: 4.8,
      reviews: 123,
      location: 'Colombo 03',
      badge: 'Verified Master'
    },
    {
      id: 'coolbreeze-ac',
      name: 'Charls Fernando',
      category: 'AC Repair',
      rating: 4.9,
      reviews: 98,
      location: 'Negombo / Colombo',
      badge: 'Certified Pro'
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200 max-w-5xl mx-auto">
      
      {/* Header Banner Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Avatar */}
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0B3A82] text-white flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-md border-2 border-white">
                {formData.fullName.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 ring-2 ring-white flex items-center justify-center text-white" title="Verified Customer">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* User Meta */}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {formData.fullName}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  Verified Customer
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {formData.email} • Member since Jan 2024
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-2 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {formData.city}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  3 Active Requests
                </span>
              </div>
            </div>
          </div>

          {/* Edit / Save Action */}
          <div className="shrink-0">
            {isEditing ? (
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors border border-slate-200 cursor-pointer"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Profile information updated successfully!</span>
          </div>
        )}
      </div>

      {/* Main Grid: Details + Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Personal Information Form */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Personal Information</h2>
            <span className="text-[11px] text-slate-400">Used for booking addresses and contact</span>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border font-medium ${
                      isEditing
                        ? 'border-blue-300 focus:ring-2 focus:ring-blue-500/20 bg-white'
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border font-medium ${
                      isEditing
                        ? 'border-blue-300 focus:ring-2 focus:ring-blue-500/20 bg-white'
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border font-medium ${
                      isEditing
                        ? 'border-blue-300 focus:ring-2 focus:ring-blue-500/20 bg-white'
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  City / District
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border font-medium ${
                      isEditing
                        ? 'border-blue-300 focus:ring-2 focus:ring-blue-500/20 bg-white'
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Residential Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 text-xs rounded-xl border font-medium ${
                    isEditing
                      ? 'border-blue-300 focus:ring-2 focus:ring-blue-500/20 bg-white'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                />
              </div>
            </div>

            {isEditing && (
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>

          {/* Booking History Quick Link */}
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Your Booking History</h4>
                <p className="text-[11px] text-slate-500">Track and manage all your pending, active and completed jobs</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('customer-requests')}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            >
              <span>View Requests</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right 1 Col: Saved Providers & Security */}
        <div className="space-y-6">
          
          {/* Favorite Providers Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Saved Providers</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-semibold">{FAVORITE_PROVIDERS.length} Saved</span>
            </div>

            <div className="space-y-3">
              {FAVORITE_PROVIDERS.map((provider) => (
                <div
                  key={provider.id}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-all flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{provider.name}</h4>
                    <p className="text-[11px] text-blue-600 font-medium">{provider.category}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                      <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {provider.rating}
                      </span>
                      <span>•</span>
                      <span>{provider.location}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate && onNavigate('provider-profile', provider)}
                    className="px-2.5 py-1.5 bg-[#0B3A82] hover:bg-blue-900 text-white font-bold text-[11px] rounded-lg transition-colors shrink-0 cursor-pointer"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Password Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <Lock className="w-4 h-4 text-slate-500" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Account Security</h3>
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              Your ServiceNest credentials are encrypted using industry-standard protocols.
            </p>

            <button
              type="button"
              onClick={() => alert('Password reset verification link sent to your registered email address.')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer border border-slate-200"
            >
              Change Password
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
