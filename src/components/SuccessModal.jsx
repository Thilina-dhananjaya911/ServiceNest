import React from 'react';
import { CheckCircle2, ArrowRight, X, LayoutDashboard, Sparkles } from 'lucide-react';

export default function SuccessModal({
  isOpen,
  onClose,
  data,
  onViewSwitch,
  onEnterProviderApp,
  onEnterCustomerApp
}) {
  if (!isOpen) return null;

  const isProvider = data?.role === 'provider' || data?.type === 'provider';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center relative transform transition-all scale-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Animated Icon */}
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50/50">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 mb-1">
          {data?.type === 'login' ? 'Login Successful!' : 'Registration Successful!'}
        </h3>
        
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          {data?.type === 'login'
            ? `Welcome back, ${data?.username || 'User'}! You are now logged into your ${isProvider ? 'Service Provider' : 'Customer'} account.`
            : `Your ${isProvider ? 'Service Provider' : 'Customer'} account has been registered successfully. Please sign in to continue.`}
        </p>

        {/* Details Card */}
        {data && (
          <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-200/80 mb-6 space-y-2 text-xs text-slate-600">
            {data.name && (
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-400 font-medium">Full Name:</span>
                <span className="font-semibold text-slate-800">{data.name}</span>
              </div>
            )}
            {data.username && (
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-400 font-medium">Username:</span>
                <span className="font-semibold text-slate-800">{data.username}</span>
              </div>
            )}
            {data.email && (
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-400 font-medium">Email:</span>
                <span className="font-semibold text-slate-800">{data.email}</span>
              </div>
            )}
            {data.category && (
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-400 font-medium">Category:</span>
                <span className="font-semibold text-blue-600">{data.category}</span>
              </div>
            )}
            {data.city && (
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-medium">Location:</span>
                <span className="font-semibold text-slate-800">{data.city}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          {data?.type === 'login' ? (
            isProvider ? (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onEnterProviderApp) {
                    onEnterProviderApp('dashboard', data?.name || data?.username || 'Thushani');
                  } else {
                    onViewSwitch('dashboard');
                  }
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#0B3A82] hover:bg-blue-900 text-white font-bold text-xs rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Enter Provider Portal</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onEnterCustomerApp) {
                    onEnterCustomerApp('home', data?.name || data?.username || 'Kasun Perera');
                  } else {
                    onViewSwitch('home');
                  }
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Continue to Customer Portal</span>
              </button>
            )
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                onViewSwitch('login');
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <span>Go to Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
