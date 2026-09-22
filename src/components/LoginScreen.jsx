import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, LogIn, AlertCircle, Briefcase, ShieldCheck, Sparkles } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function LoginScreen({ onLoginSubmit, setCurrentView, defaultRole = 'customer' }) {
  const [role, setRole] = useState(defaultRole);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name] || errors.form) {
      setErrors({ ...errors, [name]: '', form: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username or email is required.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSubmit({
        type: 'login',
        role: role, // 'customer' | 'provider' | 'admin'
        username: formData.username.trim(),
      });
    }, 500);
  };

  const handleFillDemoAdmin = () => {
    setFormData({
      username: 'admin@servicenest.com',
      password: 'adminpassword123'
    });
    setErrors({});
  };

  return (
    <div className="w-full">
      {/* Official ServiceNest Logo & Header Section */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-sm border border-slate-200/80 flex items-center justify-center">
            <img src={logoImg} alt="ServiceNest Official Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {role === 'admin' ? 'ServiceNest Admin Login' : 'Welcome to ServiceNest'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {role === 'admin'
            ? 'Sign in to access the platform management and operational control center'
            : 'Login to access your personalized account'}
        </p>
      </div>

      {/* Account Role Selector on Login */}
      <div className="mb-6 p-1 bg-slate-100 rounded-2xl border border-slate-200 flex text-xs font-bold gap-1">
        <button
          type="button"
          onClick={() => {
            setRole('customer');
            setFormData({ username: '', password: '' });
          }}
          className={`flex-1 py-2 sm:py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            role === 'customer'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Customer</span>
          <span className="sm:hidden">Customer</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setRole('provider');
            setFormData({ username: '', password: '' });
          }}
          className={`flex-1 py-2 sm:py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            role === 'provider'
              ? 'bg-[#0B3A82] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Provider</span>
          <span className="sm:hidden">Provider</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setRole('admin');
            setFormData({ username: 'admin@servicenest.com', password: 'adminpassword123' });
          }}
          className={`flex-1 py-2 sm:py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            role === 'admin'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Admin</span>
        </button>
      </div>

      {errors.form && (
        <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-600 font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Admin Demo Helper Banner */}
      {role === 'admin' && (
        <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Admin Demo Account: <strong>admin@servicenest.com</strong></span>
          </div>
          <button
            type="button"
            onClick={handleFillDemoAdmin}
            className="text-[11px] font-bold text-blue-700 hover:underline cursor-pointer"
          >
            Auto-Fill
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Username / Email */}
        <div>
          <label htmlFor="username" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
            <span className="text-rose-500 mr-1">*</span>{role === 'admin' ? 'Admin Email / Username' : 'Username / Email'}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder={
                role === 'admin'
                  ? 'admin@servicenest.com'
                  : role === 'provider'
                  ? 'e.g. provider@servicenest.com'
                  : 'e.g. customer@servicenest.com'
              }
              className={`w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50 border rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.username 
                  ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30' 
                  : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
          </div>
          {errors.username && (
            <p className="mt-1.5 text-xs text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.username}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
              <span className="text-rose-500 mr-1">*</span>Password
            </label>
            <button
              type="button"
              onClick={() => alert('Password recovery link dispatched to administrator email.')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full pl-10 pr-11 py-2.5 sm:py-3 bg-slate-50 border rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.password 
                  ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30' 
                  : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.password}
            </p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Remember me</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 ${
            role === 'admin'
              ? 'bg-slate-900 hover:bg-slate-800'
              : role === 'provider'
              ? 'bg-[#0B3A82] hover:bg-blue-900'
              : 'bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800'
          }`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              <span>
                {role === 'admin'
                  ? 'Sign In as Administrator'
                  : role === 'provider'
                  ? 'Login as Service Provider'
                  : 'Login as Customer'}
              </span>
            </>
          )}
        </button>
      </form>

      {/* Switch to Registration */}
      <div className="mt-6 text-center text-xs text-slate-500">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => setCurrentView('select')}
          className="font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
        >
          Register here
        </button>
      </div>
    </div>
  );
}
