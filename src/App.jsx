import React, { useState } from 'react';
import AccountTypeSelection from './components/AccountTypeSelection';
import LoginScreen from './components/LoginScreen';
import CustomerRegisterScreen from './components/CustomerRegisterScreen';
import ProviderRegisterScreen from './components/ProviderRegisterScreen';
import SuccessModal from './components/SuccessModal';
import logoImg from './assets/logo.png';
import AppFooter from './components/common/AppFooter';

// Master Application Shell
import ServiceProviderLayout from './components/provider/ServiceProviderLayout';

// Working Provider Pages (Original 5 Pages)
import ProviderHome from './components/provider/pages/ProviderHome';
import ProviderDashboard from './components/provider/pages/ProviderDashboard';
import ProviderServices from './components/provider/pages/ProviderServices';
import ProviderRequests from './components/provider/pages/ProviderRequests';
import ProviderAvailability from './components/provider/pages/ProviderAvailability';

// Customer / Public Pages (Screens 1 to 4 + Customer Requests)
import LandingHome from './components/pages/LandingHome';
import ServicesCatalogPage from './components/pages/ServicesCatalogPage';
import ServiceProvidersPage from './components/pages/ServiceProvidersPage';
import ProviderProfilePage from './components/pages/ProviderProfilePage';
import CustomerRequestsPage from './components/pages/CustomerRequestsPage';
import CustomerProfileView from './components/pages/CustomerProfileView';
import NotificationsView from './components/pages/NotificationsView';
import AboutUsView from './components/pages/AboutUsView';
import MessagesView from './components/pages/MessagesView';
import HelpSupportView from './components/pages/HelpSupportView';

// Admin Portal Shell & Screens
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/pages/AdminDashboard';
import ManageUsers from './components/admin/pages/ManageUsers';
import ManageProviders from './components/admin/pages/ManageProviders';
import ProviderVerification from './components/admin/pages/ProviderVerification';
import ManageCategories from './components/admin/pages/ManageCategories';
import ManageComplaints from './components/admin/pages/ManageComplaints';
import ComplaintDetails from './components/admin/pages/ComplaintDetails';
import ActivityLogs from './components/admin/pages/ActivityLogs';
import AdminSettings from './components/admin/pages/AdminSettings';

import {
  INITIAL_USERS,
  INITIAL_PROVIDERS_ADMIN,
  INITIAL_CATEGORIES,
  INITIAL_COMPLAINTS,
  INITIAL_ACTIVITY_LOGS
} from './components/admin/mockAdminData';

import { ShieldCheck, ArrowLeft } from 'lucide-react';

const INITIAL_CUSTOMER_REQUESTS = [
  {
    id: 101,
    service: 'Plumbing Service',
    providerName: 'TechFlow Plumbing',
    date: '24 May 2025',
    time: 'Morning (8:00 AM - 12:00 PM)',
    location: 'No. 45, Galle Road, Colombo 03',
    status: 'Pending',
    contact: '+94 77 123 4567',
    estimatedPrice: 'LKR 1,500 - 2,000',
    description: 'Leaking pipe under kitchen sink requiring urgent repair and washer replacement.'
  },
  {
    id: 102,
    service: 'AC Chemical Wash',
    providerName: 'Charls Fernando',
    date: '21 May 2025',
    time: 'Afternoon (1:00 PM - 5:00 PM)',
    location: 'Negombo, Sri Lanka',
    status: 'In Progress',
    contact: '+94 77 888 9999',
    estimatedPrice: 'LKR 3,500',
    description: 'Annual master bedroom split AC indoor and outdoor chemical cleaning.'
  },
  {
    id: 103,
    service: 'House Wiring Check',
    providerName: 'Bimal Perera',
    date: '18 May 2025',
    time: 'Morning (9:00 AM - 1:00 PM)',
    location: 'Kandy, Sri Lanka',
    status: 'Completed',
    contact: '+94 71 555 6666',
    estimatedPrice: 'LKR 2,500',
    description: 'Main trip switch replacement and earthing check across residential unit.'
  }
];

const INITIAL_PROVIDER_REQUESTS = [
  {
    id: 1,
    service: 'Plumbing Service',
    customer: 'Amara Perera',
    date: '20 May 2025',
    location: 'Colombo 05',
    status: 'Pending',
    contact: '+94 77 123 4567',
    description: 'Leaking pipe under kitchen sink requiring urgent repair.'
  },
  {
    id: 2,
    service: 'Pipe Repair',
    customer: 'Nimal Silva',
    date: '19 May 2025',
    location: 'Colombo 07',
    status: 'Pending',
    contact: '+94 71 987 6543',
    description: 'Busted pipe joint causing water leakage in bathroom.'
  },
  {
    id: 3,
    service: 'Drain Cleaning',
    customer: 'Kasun Dias',
    date: '18 May 2025',
    location: 'Colombo 03',
    status: 'In Progress',
    contact: '+94 76 555 4321',
    description: 'Main drainage blockage behind utility room.'
  },
  {
    id: 4,
    service: 'Water Tank Cleaning',
    customer: 'Dilani Fernando',
    date: '16 May 2025',
    location: 'Colombo 04',
    status: 'Accepted',
    contact: '+94 70 111 2222',
    description: 'Annual cleaning and chemical flushing of 1000L water tank.'
  },
  {
    id: 5,
    service: 'Electrical Wiring Repair',
    customer: 'Nuwan Perera',
    date: '15 May 2025',
    location: 'Colombo 10',
    status: 'Completed',
    contact: '+94 72 333 4444',
    description: 'Circuit breaker trip fix and short circuit check.'
  }
];

export default function App() {
  // Active Authenticated Role: null (visitor / public browsing) | 'customer' (logged-in customer) | 'provider' (logged-in provider)
  const [authRole, setAuthRole] = useState(null);

  // Current View:
  // Customer views: 'home' | 'services' | 'providers' | 'provider-profile' | 'profile' | 'customer-requests' | 'notifications' | 'about' | 'messages' | 'help'
  // Provider views: 'provider-home' | 'dashboard' | 'manage-services' | 'provider-requests' | 'availability' | 'messages'
  // Auth views: 'select' | 'login' | 'customer' | 'provider'
  const [currentView, setCurrentView] = useState('select');

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [providerCategoryFilter, setProviderCategoryFilter] = useState('');
  const [providerLocationFilter, setProviderLocationFilter] = useState('');

  const [providerName, setProviderName] = useState('Thushani');
  const [customerName, setCustomerName] = useState('Kasun Perera');

  // Requests States
  const [customerRequests, setCustomerRequests] = useState(INITIAL_CUSTOMER_REQUESTS);
  const [providerRequests, setProviderRequests] = useState(INITIAL_PROVIDER_REQUESTS);

  // Admin Portal States
  const [adminUsers, setAdminUsers] = useState(INITIAL_USERS);
  const [adminProviders, setAdminProviders] = useState(INITIAL_PROVIDERS_ADMIN);
  const [adminCategories, setAdminCategories] = useState(INITIAL_CATEGORIES);
  const [adminComplaints, setAdminComplaints] = useState(INITIAL_COMPLAINTS);
  const [adminActivityLogs, setAdminActivityLogs] = useState(INITIAL_ACTIVITY_LOGS);
  const [selectedAdminProvider, setSelectedAdminProvider] = useState(INITIAL_PROVIDERS_ADMIN[3]);
  const [selectedAdminComplaint, setSelectedAdminComplaint] = useState(INITIAL_COMPLAINTS[0]);

  // Success Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (data) => {
    if (data.role === 'admin') {
      setAuthRole('admin');
      setCurrentView('admin-dashboard');
      return;
    }

    // Direct login flow for Customer or Provider
    if (data.type === 'login') {
      if (data.role === 'provider') {
        handleEnterProviderPortal('dashboard', data.username || 'Thushani');
      } else {
        handleEnterCustomerPortal('home', data.username || 'Kasun Perera');
      }
      return;
    }

    // Registration flow: show confirmation and prompt to proceed to login
    setSubmittedData(data);
    setModalOpen(true);

    const isProvider = data.role === 'provider' || data.type === 'provider';
    if (isProvider) {
      if (data.name || data.username) {
        setProviderName(data.name || data.username);
      }
    } else {
      if (data.name || data.username) {
        setCustomerName(data.name || data.username);
      }
    }
  };

  // Admin CRUD Handlers
  const handleAddUser = (newUser) => {
    setAdminUsers((prev) => [newUser, ...prev]);
    setAdminActivityLogs((prev) => [
      {
        id: `LOG-${Date.now()}`,
        timestamp: 'Just now',
        actor: 'Admin',
        role: 'Admin',
        action: 'User Created',
        category: 'Authentication',
        details: `Created account for ${newUser.name} with role ${newUser.role}.`
      },
      ...prev
    ]);
  };

  const handleUpdateUser = (updatedUser) => {
    setAdminUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  const handleDeleteUser = (userId) => {
    setAdminUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleVerifyProvider = (providerId) => {
    setAdminProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, status: 'Verified' } : p))
    );
    if (selectedAdminProvider && selectedAdminProvider.id === providerId) {
      setSelectedAdminProvider((prev) => ({ ...prev, status: 'Verified' }));
    }
    setAdminActivityLogs((prev) => [
      {
        id: `LOG-${Date.now()}`,
        timestamp: 'Just now',
        actor: 'Admin',
        role: 'Admin',
        action: 'Provider Verified',
        category: 'Verification',
        details: `Verified provider ID ${providerId} credentials and trade certificates.`
      },
      ...prev
    ]);
  };

  const handleRejectProvider = (providerId) => {
    setAdminProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, status: 'Pending Verification' } : p))
    );
    if (selectedAdminProvider && selectedAdminProvider.id === providerId) {
      setSelectedAdminProvider((prev) => ({ ...prev, status: 'Pending Verification' }));
    }
  };

  const handleSuspendProvider = (providerId) => {
    setAdminProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, status: p.status === 'Suspended' ? 'Verified' : 'Suspended' } : p))
    );
  };

  const handleDeleteProvider = (providerId) => {
    setAdminProviders((prev) => prev.filter((p) => p.id !== providerId));
  };

  const handleAddCategory = (newCat) => {
    setAdminCategories((prev) => [...prev, newCat]);
    setAdminActivityLogs((prev) => [
      {
        id: `LOG-${Date.now()}`,
        timestamp: 'Just now',
        actor: 'Admin',
        role: 'Admin',
        action: 'Trade Category Added',
        category: 'Categories',
        details: `Added new category ${newCat.name}.`
      },
      ...prev
    ]);
  };

  const handleUpdateCategory = (updatedCat) => {
    setAdminCategories((prev) => prev.map((c) => (c.id === updatedCat.id ? updatedCat : c)));
  };

  const handleDeleteCategory = (catId) => {
    setAdminCategories((prev) => prev.filter((c) => c.id !== catId));
  };

  const handleUpdateComplaintStatus = (complaintId, newStatus, note) => {
    setAdminComplaints((prev) =>
      prev.map((c) => {
        if (c.id === complaintId) {
          const updatedTimeline = [...(c.timeline || [])];
          if (note) {
            updatedTimeline.push({ date: 'Just now', event: `Note: ${note}` });
          }
          if (c.status !== newStatus) {
            updatedTimeline.push({ date: 'Just now', event: `Status updated to ${newStatus}` });
          }
          return { ...c, status: newStatus, timeline: updatedTimeline };
        }
        return c;
      })
    );
    if (selectedAdminComplaint && selectedAdminComplaint.id === complaintId) {
      setSelectedAdminComplaint((prev) => {
        const updatedTimeline = [...(prev.timeline || [])];
        if (note) updatedTimeline.push({ date: 'Just now', event: `Note: ${note}` });
        if (prev.status !== newStatus) updatedTimeline.push({ date: 'Just now', event: `Status updated to ${newStatus}` });
        return { ...prev, status: newStatus, timeline: updatedTimeline };
      });
    }
  };

  const handleDeleteComplaint = (complaintId) => {
    setAdminComplaints((prev) => prev.filter((c) => c.id !== complaintId));
  };

  const closeModal = () => {
    setModalOpen(false);
    if (submittedData && submittedData.type !== 'login') {
      setCurrentView('login');
    }
  };

  const handleEnterProviderPortal = (initialView = 'dashboard', name = 'Thushani') => {
    setProviderName(name);
    setAuthRole('provider');
    setCurrentView(initialView);
  };

  const handleEnterCustomerPortal = (initialView = 'home', name = 'Kasun Perera') => {
    setCustomerName(name);
    setAuthRole('customer');
    setCurrentView(initialView);
  };

  const handleLogout = () => {
    setAuthRole(null);
    setCurrentView('select');
  };

  const handleNavigate = (targetView, data = null) => {
    if ((targetView === 'profile' || targetView === 'provider-profile') && data) {
      setSelectedProvider(data);
      setCurrentView('provider-profile');
      return;
    }
    if (targetView === 'providers' && data) {
      if (data.category) setProviderCategoryFilter(data.category);
      if (data.location) setProviderLocationFilter(data.location);
    }
    setCurrentView(targetView);
  };

  // Zero-login Customer Service Request submission
  const handleCustomerServiceRequest = (reqData) => {
    const newReqId = Date.now();

    // 1. Add to Customer's requests list
    const newCustomerReq = {
      id: newReqId,
      service: reqData.service || reqData.category || 'General Home Service',
      providerName: reqData.providerName || 'TechFlow Plumbing',
      date: reqData.date || 'Scheduled Soon',
      time: reqData.time || 'Morning (8:00 AM - 12:00 PM)',
      location: reqData.location || 'Colombo, Sri Lanka',
      status: 'Pending',
      contact: reqData.phone || '+94 77 123 4567',
      estimatedPrice: 'Price on Inspection',
      description: reqData.details || `Service booking requested by ${reqData.customerName || 'Customer'}`
    };
    setCustomerRequests((prev) => [newCustomerReq, ...prev]);

    // 2. Also register in Provider's incoming requests list
    const newProviderReq = {
      id: newReqId,
      service: reqData.service || reqData.category || 'General Home Service',
      customer: reqData.customerName || 'Customer',
      date: reqData.date || 'Scheduled Soon',
      location: reqData.location || 'Colombo',
      status: 'Pending',
      contact: reqData.phone || '+94 77 123 4567',
      description: reqData.details || 'Customer submitted direct booking.'
    };
    setProviderRequests((prev) => [newProviderReq, ...prev]);
  };

  const handleProviderStatusUpdate = (id, newStatus) => {
    setProviderRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    // Also sync to customer requests if it matches
    setCustomerRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleCancelCustomerRequest = (id) => {
    setCustomerRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Cancelled' } : r))
    );
  };

  // ==============================================================
  // ADMIN PORTAL INTERFACE (WHEN authRole === 'admin')
  // ==============================================================
  if (authRole === 'admin') {
    const pendingCount = adminProviders.filter((p) => p.status === 'Pending Verification').length;
    const openComplaints = adminComplaints.filter((c) => c.status !== 'Resolved').length;

    return (
      <AdminLayout
        currentView={currentView}
        setCurrentView={setCurrentView}
        onLogout={handleLogout}
        pendingVerificationsCount={pendingCount}
        openComplaintsCount={openComplaints}
      >
        {currentView === 'admin-dashboard' && (
          <AdminDashboard
            usersCount={adminUsers.length}
            providersCount={adminProviders.length}
            verifiedCount={adminProviders.filter((p) => p.status === 'Verified').length}
            complaintsCount={openComplaints}
            onNavigate={setCurrentView}
            recentActivities={adminActivityLogs}
          />
        )}

        {currentView === 'admin-users' && (
          <ManageUsers
            users={adminUsers}
            onAddUser={handleAddUser}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
          />
        )}

        {currentView === 'admin-providers' && (
          <ManageProviders
            providers={adminProviders}
            onSelectProvider={(p) => {
              setSelectedAdminProvider(p);
              setCurrentView('admin-verification');
            }}
            onVerifyProvider={handleVerifyProvider}
            onSuspendProvider={handleSuspendProvider}
            onDeleteProvider={handleDeleteProvider}
          />
        )}

        {currentView === 'admin-verification' && (
          <ProviderVerification
            provider={selectedAdminProvider}
            onBack={() => setCurrentView('admin-providers')}
            onVerify={handleVerifyProvider}
            onReject={handleRejectProvider}
          />
        )}

        {currentView === 'admin-categories' && (
          <ManageCategories
            categories={adminCategories}
            onAddCategory={handleAddCategory}
            onUpdateCategory={handleUpdateCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}

        {currentView === 'admin-complaints' && (
          <ManageComplaints
            complaints={adminComplaints}
            onSelectComplaint={(c) => {
              setSelectedAdminComplaint(c);
              setCurrentView('admin-complaint-details');
            }}
            onDeleteComplaint={handleDeleteComplaint}
          />
        )}

        {currentView === 'admin-complaint-details' && (
          <ComplaintDetails
            complaint={selectedAdminComplaint}
            onBack={() => setCurrentView('admin-complaints')}
            onUpdateStatus={handleUpdateComplaintStatus}
          />
        )}

        {currentView === 'admin-activity' && (
          <ActivityLogs logs={adminActivityLogs} />
        )}

        {currentView === 'admin-settings' && (
          <AdminSettings />
        )}
      </AdminLayout>
    );
  }

  // ==============================================================
  // AUTHENTICATION & ENTRY FLOW (NO APPLICATION SIDEBAR / HEADER)
  // ==============================================================
  if (['select', 'login', 'customer', 'provider'].includes(currentView)) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased">
        {/* Simple Auth Header with ServiceNest Logo */}
        <header className="w-full bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center shadow-2xs">
              <img src={logoImg} alt="ServiceNest Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg text-[#0B3A82] tracking-tight block leading-tight">
                ServiceNest
              </span>
              <span className="text-[10px] text-slate-500 font-medium block">
                Official Service Platform
              </span>
            </div>
          </div>

          <div>
            {currentView !== 'select' && (
              <button
                type="button"
                onClick={() => setCurrentView('select')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Account Selection</span>
              </button>
            )}
          </div>
        </header>

        {/* Auth Content Area */}
        <main className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
          {/* Back to Account Selection Button (only when on login / customer / provider) */}
          {currentView !== 'select' && (
            <div className={`w-full mb-4 flex justify-start ${
              currentView === 'login' || currentView === 'select' ? 'max-w-xl' : 'max-w-2xl'
            }`}>
              <button
                type="button"
                onClick={() => {
                  setCurrentView('select');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Account Selection</span>
              </button>
            </div>
          )}

          <div className={`w-full transition-all duration-300 mx-auto bg-white border border-slate-200/80 shadow-xl shadow-slate-200/50 rounded-2xl p-6 sm:p-10 ${
            currentView === 'login' || currentView === 'select' ? 'max-w-xl' : 'max-w-2xl'
          }`}>
            {currentView === 'select' && (
              <AccountTypeSelection setCurrentView={setCurrentView} />
            )}

            {currentView === 'login' && (
              <LoginScreen
                onLoginSubmit={handleFormSubmit}
                setCurrentView={setCurrentView}
              />
            )}

            {currentView === 'customer' && (
              <CustomerRegisterScreen
                onCustomerSubmit={handleFormSubmit}
                setCurrentView={setCurrentView}
              />
            )}

            {currentView === 'provider' && (
              <ProviderRegisterScreen
                onProviderSubmit={handleFormSubmit}
                setCurrentView={setCurrentView}
              />
            )}
          </div>

          {/* Security Badge */}
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Secured by ServiceNest 256-bit Identity Protection</span>
          </div>
        </main>

        {/* Footer */}
        <AppFooter />

        {/* Registration / Login Success Modal */}
        <SuccessModal
          isOpen={modalOpen}
          onClose={closeModal}
          data={submittedData}
          onViewSwitch={setCurrentView}
          onEnterProviderApp={handleEnterProviderPortal}
          onEnterCustomerApp={handleEnterCustomerPortal}
        />
      </div>
    );
  }

  return (
    <ServiceProviderLayout
      authRole={authRole}
      currentView={currentView}
      setCurrentView={setCurrentView}
      onLogout={handleLogout}
      providerName={providerName}
      customerName={customerName}
    >
      {/* ============================================================== */}
      {/* 1. CUSTOMER / PUBLIC BROWSING VIEWS (ZERO LOGIN REQUIRED)     */}
      {/* ============================================================== */}
      {currentView === 'home' && (
        <LandingHome onNavigate={handleNavigate} />
      )}

      {currentView === 'services' && (
        <ServicesCatalogPage onNavigate={handleNavigate} />
      )}

      {currentView === 'providers' && (
        <ServiceProvidersPage
          initialCategory={providerCategoryFilter}
          initialLocation={providerLocationFilter}
          onSelectProvider={(p) => handleNavigate('provider-profile', p)}
        />
      )}

      {currentView === 'provider-profile' && (
        <ProviderProfilePage
          providerData={selectedProvider}
          onBack={() => setCurrentView('providers')}
          onRequestSubmitted={handleCustomerServiceRequest}
        />
      )}

      {currentView === 'customer-requests' && (
        <CustomerRequestsPage
          requests={customerRequests}
          onNavigate={setCurrentView}
          onCancelRequest={handleCancelCustomerRequest}
        />
      )}

      {currentView === 'profile' && (
        <CustomerProfileView
          customerName={customerName}
          onNavigate={handleNavigate}
        />
      )}

      {currentView === 'notifications' && (
        <NotificationsView
          onNavigate={handleNavigate}
        />
      )}

      {currentView === 'about' && (
        <AboutUsView
          onNavigate={handleNavigate}
        />
      )}

      {/* ============================================================== */}
      {/* 2. PROVIDER PORTAL VIEWS (EXACT ORIGINAL 5 PROVIDER PAGES)     */}
      {/* ============================================================== */}
      {currentView === 'provider-home' && (
        <ProviderHome setCurrentView={setCurrentView} />
      )}

      {currentView === 'dashboard' && (
        <ProviderDashboard setCurrentView={setCurrentView} />
      )}

      {currentView === 'manage-services' && (
        <ProviderServices />
      )}

      {currentView === 'provider-requests' && (
        <ProviderRequests
          requests={providerRequests}
          onStatusUpdate={handleProviderStatusUpdate}
        />
      )}

      {currentView === 'availability' && (
        <ProviderAvailability />
      )}

      {/* ============================================================== */}
      {/* 3. COMMON SHARED VIEWS (MESSAGES & HELP)                       */}
      {/* ============================================================== */}
      {currentView === 'messages' && (
        <MessagesView />
      )}

      {currentView === 'help' && (
        <HelpSupportView />
      )}

      {/* Registration / Login Success Modal */}
      <SuccessModal
        isOpen={modalOpen}
        onClose={closeModal}
        data={submittedData}
        onViewSwitch={setCurrentView}
        onEnterProviderApp={handleEnterProviderPortal}
        onEnterCustomerApp={handleEnterCustomerPortal}
      />
    </ServiceProviderLayout>
  );
}
