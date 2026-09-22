import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopHeader from './AdminTopHeader';
import AppFooter from '../common/AppFooter';

export default function AdminLayout({
  currentView,
  setCurrentView,
  onLogout,
  adminName = 'System Administrator',
  pendingVerificationsCount = 2,
  openComplaintsCount = 2,
  children
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans antialiased">
      {/* Admin Sidebar */}
      <AdminSidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onLogout={onLogout}
        pendingVerificationsCount={pendingVerificationsCount}
        openComplaintsCount={openComplaintsCount}
      />

      {/* Main Right Content Layout */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">
        {/* Admin Top Header */}
        <AdminTopHeader
          currentView={currentView}
          setCurrentView={setCurrentView}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onLogout={onLogout}
          adminName={adminName}
        />

        {/* Dynamic Admin Screen Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Footer */}
        <AppFooter />
      </div>
    </div>
  );
}
