import React, { useState } from 'react';
import { User, MapPin, Mail, Phone, CreditCard, Wrench, Clock, Lock, Eye, EyeOff, Briefcase, ArrowLeft, AlertCircle } from 'lucide-react';
import FileUpload from './FileUpload';
import logoImg from '../assets/logo.png';

const CITY_OPTIONS = [
  'Vavuniya',
  'Colombo',
  'Kandy',
  'Jaffna',
  'Galle',
  'Batticaloa',
  'Trincomalee',
  'Kurunegala',
  'Anuradhapura',
  'Negombo',
];

const SERVICE_CATEGORIES = [
  'Plumbing',
  'Electrical',
  'Carpentry',
  'AC Repair',
  'Painting',
  'Cleaning',
  'Appliance Repair',
  'Gardening',
  'Vehicle Repair',
  'Other',
];

export default function ProviderRegisterScreen({ onProviderSubmit, setCurrentView }) {
  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    email: '',
    contactNo: '',
    nicNo: '',
    category: '',
    experience: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });

  const [nicPhoto, setNicPhoto] = useState(null);
  const [nicPreviewUrl, setNicPreviewUrl] = useState(null);

  const [profilePic, setProfilePic] = useState(null);
  const [profilePreviewUrl, setProfilePreviewUrl] = useState(null);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name] || errors.form) {
      setErrors({ ...errors, [name]: '', form: '' });
    }
  };

  const handleNicSelect = (file) => {
    setNicPhoto(file);
    if (file && file.type.startsWith('image/')) {
      setNicPreviewUrl(URL.createObjectURL(file));
    } else {
      setNicPreviewUrl(null);
    }
    if (errors.nicPhoto || errors.form) {
      setErrors({ ...errors, nicPhoto: '', form: '' });
    }
  };

  const handleNicRemove = () => {
    setNicPhoto(null);
    setNicPreviewUrl(null);
  };

  const handleProfileSelect = (file) => {
    setProfilePic(file);
    if (file && file.type.startsWith('image/')) {
      setProfilePreviewUrl(URL.createObjectURL(file));
    } else {
      setProfilePreviewUrl(null);
    }
    if (errors.profilePic || errors.form) {
      setErrors({ ...errors, profilePic: '', form: '' });
    }
  };

  const handleProfileRemove = () => {
    setProfilePic(null);
    setProfilePreviewUrl(null);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!formData.city) {
      newErrors.city = 'Please select your City / Area.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.contactNo.trim()) {
      newErrors.contactNo = 'Contact Number is required.';
    } else if (!/^[0-9+ \-]{9,15}$/.test(formData.contactNo.trim())) {
      newErrors.contactNo = 'Please enter a valid phone number (at least 9 digits).';
    }

    if (!formData.nicNo.trim()) {
      newErrors.nicNo = 'NIC Number is required.';
    } else if (formData.nicNo.trim().length < 9) {
      newErrors.nicNo = 'Please enter a valid NIC number (e.g. 198512345678 or 851234567V).';
    }

    if (!nicPhoto) {
      newErrors.nicPhoto = 'NIC photo document is required for verification.';
    }

    if (!profilePic) {
      newErrors.profilePic = 'Profile Picture is required for provider listing.';
    }

    if (!formData.category) {
      newErrors.category = 'Please select your Service Category.';
    }

    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience is required (e.g. 5 Years).';
    }

    if (!formData.userName.trim()) {
      newErrors.userName = 'User Name is required.';
    } else if (formData.userName.trim().length < 3) {
      newErrors.userName = 'User Name must be at least 3 characters.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      setErrors((prev) => ({ ...prev, form: 'Please fix the highlighted errors before submitting.' }));
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onProviderSubmit({
        type: 'provider',
        name: formData.fullName.trim(),
        username: formData.userName.trim(),
        email: formData.email.trim(),
        category: formData.category,
        city: formData.city,
      });
    }, 600);
  };

  return (
    <div className="w-full">
      {/* Back to Account Selection Header link */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setCurrentView('select')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to account selection
        </button>
      </div>

      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-sm border border-slate-200/80 flex items-center justify-center">
            <img src={logoImg} alt="ServiceNest Official Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Service Provider Registration
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Join our network of verified professionals and grow your service business
        </p>
      </div>

      {errors.form && (
        <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-600 font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
            <span className="text-rose-500 mr-1">*</span>Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-5 h-5" />
            </div>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Master Electrician Silva"
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.fullName 
                  ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30' 
                  : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
            </p>
          )}
        </div>

        {/* Grid: City / Area & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* City / Area Dropdown */}
          <div>
            <label htmlFor="city" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
              <span className="text-rose-500 mr-1">*</span>City / Area
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-5 h-5" />
              </div>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all appearance-none ${
                  errors.city 
                    ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30' 
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              >
                <option value="" disabled>Select your city/area</option>
                {CITY_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            {errors.city && (
              <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.city}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
              <span className="text-rose-500 mr-1">*</span>Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="provider@example.com"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.email 
                    ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30' 
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Grid: Contact No & NIC No */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contactNo" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
              <span className="text-rose-500 mr-1">*</span>Contact No
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-5 h-5" />
              </div>
              <input
                id="contactNo"
                name="contactNo"
                type="tel"
                value={formData.contactNo}
                onChange={handleChange}
                placeholder="+94 71 987 6543"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.contactNo 
                    ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30' 
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
            </div>
            {errors.contactNo && (
              <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.contactNo}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="nicNo" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
              <span className="text-rose-500 mr-1">*</span>NIC No
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <input
                id="nicNo"
                name="nicNo"
                type="text"
                value={formData.nicNo}
                onChange={handleChange}
                placeholder="e.g. 198512345678"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.nicNo 
                    ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30' 
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
            </div>
            {errors.nicNo && (
              <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.nicNo}
              </p>
            )}
          </div>
        </div>

        {/* Required File Uploads Grid with instant preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FileUpload
              id="nicPhoto"
              label="NIC Photo"
              required={true}
              selectedFile={nicPhoto}
              onFileSelect={handleNicSelect}
              onFileRemove={handleNicRemove}
              previewUrl={nicPreviewUrl}
              helpText="Front copy of your National ID"
            />
            {errors.nicPhoto && (
              <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.nicPhoto}
              </p>
            )}
          </div>

          <div>
            <FileUpload
              id="profilePic"
              label="Profile Picture"
              required={true}
              selectedFile={profilePic}
              onFileSelect={handleProfileSelect}
              onFileRemove={handleProfileRemove}
              previewUrl={profilePreviewUrl}
              helpText="Professional photo (instant preview)"
            />
            {errors.profilePic && (
              <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.profilePic}
              </p>
            )}
          </div>
        </div>

        {/* Grid: Service Category & Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Service Category Dropdown */}
          <div>
            <label htmlFor="category" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
              <span className="text-rose-500 mr-1">*</span>Service Category
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Wrench className="w-5 h-5" />
              </div>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all appearance-none ${
                  errors.category 
                    ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30' 
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              >
                <option value="" disabled>Select your primary trade</option>
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {errors.category && (
              <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.category}
              </p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="experience" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
              <span className="text-rose-500 mr-1">*</span>Experience
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Clock className="w-5 h-5" />
              </div>
              <input
                id="experience"
                name="experience"
                type="text"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 5 Years"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.experience 
                    ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30' 
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
            </div>
            {errors.experience && (
              <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.experience}
              </p>
            )}
          </div>
        </div>

        {/* Username */}
        <div>
          <label htmlFor="userName" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
            <span className="text-rose-500 mr-1">*</span>User Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-5 h-5" />
            </div>
            <input
              id="userName"
              name="userName"
              type="text"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Choose a provider username"
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.userName 
                  ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30' 
                  : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
          </div>
          {errors.userName && (
            <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.userName}
            </p>
          )}
        </div>

        {/* Grid: Password & Confirm Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
              <span className="text-rose-500 mr-1">*</span>Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className={`w-full pl-10 pr-10 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.password 
                    ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30' 
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.password}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
              <span className="text-rose-500 mr-1">*</span>Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className={`w-full pl-10 pr-10 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.confirmPassword 
                    ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30' 
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-indigo-200 transition-all duration-150 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Briefcase className="w-4 h-4" />
              <span>Create Provider Account</span>
            </>
          )}
        </button>

      </form>

      {/* Footer Link */}
      <div className="mt-6 pt-5 border-t border-slate-100 text-center">
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => setCurrentView('login')}
            className="text-indigo-600 font-bold hover:underline"
          >
            Login
          </button>
        </p>
      </div>

    </div>
  );
}
