import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import AppFooter from '../common/AppFooter';

export default function ServiceProviderLayout({
  authRole = null, // 'customer' | 'provider' | null
  currentView,
  setCurrentView,
  onLogout,
  providerName = 'Thushani',
  customerName = 'Kasun Perera',
  onSearch,
  children
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        authRole={authRole}
        currentView={currentView}
        setCurrentView={setCurrentView}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onLogout={onLogout}
      />

      {/* Main Right Content Layout */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">
        {/* Top Header */}
        <TopHeader
          authRole={authRole}
          currentView={currentView}
          setCurrentView={setCurrentView}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onLogout={onLogout}
          providerName={providerName}
          customerName={customerName}
          onSearch={onSearch}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* App Footer */}
        <AppFooter />
      </div>
    </div>
  );
}
