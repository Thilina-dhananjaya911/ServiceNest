// Comprehensive Local Mock Data for ServiceNest Admin Portal
// 100% Frontend-Only Demo

export const INITIAL_USERS = [
  {
    id: 'USR-1001',
    name: 'Kasun Perera',
    email: 'kasun.perera@example.com',
    phone: '+94 77 123 4567',
    role: 'Customer',
    status: 'Active',
    joinedDate: '12 Jan 2024',
    city: 'Colombo 03',
    requestsCount: 4
  },
  {
    id: 'USR-1002',
    name: 'Thushani Gunasekara',
    email: 'thushani@servicenest.com',
    phone: '+94 77 234 5678',
    role: 'Provider',
    status: 'Active',
    joinedDate: '15 Feb 2024',
    city: 'Colombo 05',
    requestsCount: 28
  },
  {
    id: 'USR-1003',
    name: 'Amara Fernando',
    email: 'amara.f@gmail.com',
    phone: '+94 71 345 6789',
    role: 'Customer',
    status: 'Active',
    joinedDate: '02 Mar 2024',
    city: 'Negombo',
    requestsCount: 7
  },
  {
    id: 'USR-1004',
    name: 'Nimal Silva',
    email: 'nimal.silva@techflow.lk',
    phone: '+94 77 456 7890',
    role: 'Provider',
    status: 'Active',
    joinedDate: '10 Mar 2024',
    city: 'Colombo 07',
    requestsCount: 42
  },
  {
    id: 'USR-1005',
    name: 'Suresh Jayawardena',
    email: 'suresh.j@outlook.com',
    phone: '+94 76 567 8901',
    role: 'Customer',
    status: 'Inactive',
    joinedDate: '24 Apr 2024',
    city: 'Kandy',
    requestsCount: 1
  },
  {
    id: 'USR-1006',
    name: 'System Admin (Dev)',
    email: 'admin@servicenest.com',
    phone: '+94 11 200 3000',
    role: 'Admin',
    status: 'Active',
    joinedDate: '01 Jan 2024',
    city: 'Colombo 01',
    requestsCount: 0
  },
  {
    id: 'USR-1007',
    name: 'Dinesh Pathirana',
    email: 'dinesh.p@gmail.com',
    phone: '+94 72 678 9012',
    role: 'Provider',
    status: 'Suspended',
    joinedDate: '18 May 2024',
    city: 'Galle',
    requestsCount: 9
  },
  {
    id: 'USR-1008',
    name: 'Malini Wickramasinghe',
    email: 'malini.w@gmail.com',
    phone: '+94 77 789 0123',
    role: 'Customer',
    status: 'Active',
    joinedDate: '05 Jun 2024',
    city: 'Kurunegala',
    requestsCount: 3
  }
];

export const INITIAL_PROVIDERS_ADMIN = [
  {
    id: 'PRV-501',
    name: 'TechFlow Plumbing',
    ownerName: 'Nimal Silva',
    category: 'Plumbing',
    location: 'Colombo, Sri Lanka',
    rating: 4.8,
    reviewsCount: 123,
    phone: '+94 77 123 4567',
    email: 'techflowplumbing@gmail.com',
    experience: '5+ Years',
    status: 'Verified',
    joinedDate: '10 Feb 2024',
    bio: 'Premier plumbing solutions for commercial & residential buildings with certified master plumbers.',
    completedJobs: 142,
    documents: {
      nicNumber: '198812345678',
      nicFront: 'NIC_Front_Verified.pdf',
      nicBack: 'NIC_Back_Verified.pdf',
      policeReport: 'Police_Clearance_2024.pdf',
      tradeCert: 'National_Vocational_Plumbing_NVQ4.pdf'
    }
  },
  {
    id: 'PRV-502',
    name: 'Charls Fernando (CoolBreeze)',
    ownerName: 'Charls Fernando',
    category: 'AC Repair',
    location: 'Negombo / Colombo',
    rating: 4.9,
    reviewsCount: 98,
    phone: '+94 77 888 9999',
    email: 'coolbreeze.ac@gmail.com',
    experience: '7 Years',
    status: 'Verified',
    joinedDate: '22 Feb 2024',
    bio: 'Split & inverter AC maintenance, gas charging and complete chemical wash specialist.',
    completedJobs: 89,
    documents: {
      nicNumber: '198533445566',
      nicFront: 'NIC_Charls_Front.pdf',
      nicBack: 'NIC_Charls_Back.pdf',
      policeReport: 'Police_Report_Negombo.pdf',
      tradeCert: 'Refrigeration_HVAC_Cert.pdf'
    }
  },
  {
    id: 'PRV-503',
    name: 'SparkPro Electrical Works',
    ownerName: 'Bimal Perera',
    category: 'Electrical',
    location: 'Kandy, Sri Lanka',
    rating: 4.7,
    reviewsCount: 84,
    phone: '+94 71 555 6666',
    email: 'sparkpro.electrical@gmail.com',
    experience: '6 Years',
    status: 'Verified',
    joinedDate: '01 Mar 2024',
    bio: 'Certified wireman for residential wiring, breaker trip repairs, and 3-phase earthing.',
    completedJobs: 110,
    documents: {
      nicNumber: '199044556677',
      nicFront: 'NIC_Bimal_Front.pdf',
      nicBack: 'NIC_Bimal_Back.pdf',
      policeReport: 'Police_Clearance_Kandy.pdf',
      tradeCert: 'CEB_Certified_Wireman_GradeA.pdf'
    }
  },
  {
    id: 'PRV-504',
    name: 'MasterCraft Woodworks',
    ownerName: 'Sunil Rathnayake',
    category: 'Carpentry',
    location: 'Moratuwa, Colombo',
    rating: 4.6,
    reviewsCount: 65,
    phone: '+94 76 111 3333',
    email: 'sunil.carpentry@gmail.com',
    experience: '8 Years',
    status: 'Pending Verification',
    joinedDate: '12 May 2024',
    bio: 'Custom door fixing, furniture restoration, modular kitchen pantry setups.',
    completedJobs: 34,
    documents: {
      nicNumber: '198277889900',
      nicFront: 'NIC_Sunil_Front.pdf',
      nicBack: 'NIC_Sunil_Back.pdf',
      policeReport: 'Police_Report_Pending_Moratuwa.pdf',
      tradeCert: 'Moratuwa_Woodwork_Diploma.pdf'
    }
  },
  {
    id: 'PRV-505',
    name: 'ShineClean Express',
    ownerName: 'Priyantha Bandara',
    category: 'House Cleaning',
    location: 'Colombo 03',
    rating: 4.8,
    reviewsCount: 52,
    phone: '+94 70 222 4444',
    email: 'shineclean@gmail.com',
    experience: '4 Years',
    status: 'Pending Verification',
    joinedDate: '18 May 2024',
    bio: 'Deep house cleaning, post-construction vacuuming, and sofa shampooing.',
    completedJobs: 29,
    documents: {
      nicNumber: '199211223344',
      nicFront: 'NIC_Priyantha_Front.pdf',
      nicBack: 'NIC_Priyantha_Back.pdf',
      policeReport: 'Police_Clearance_Colombo.pdf',
      tradeCert: 'CleanPro_Sanitation_Cert.pdf'
    }
  },
  {
    id: 'PRV-506',
    name: 'Island Color Painters',
    ownerName: 'Dinesh Pathirana',
    category: 'Painting',
    location: 'Galle, Sri Lanka',
    rating: 3.8,
    reviewsCount: 19,
    phone: '+94 72 678 9012',
    email: 'dinesh.painters@gmail.com',
    experience: '3 Years',
    status: 'Suspended',
    joinedDate: '04 Jan 2024',
    bio: 'Interior and exterior wall emulsion, weather-shield coating, and wood varnish.',
    completedJobs: 15,
    documents: {
      nicNumber: '199588990011',
      nicFront: 'NIC_Dinesh_Front.pdf',
      nicBack: 'NIC_Dinesh_Back.pdf',
      policeReport: 'Police_Report_Galle.pdf',
      tradeCert: 'Painting_Apprenticeship.pdf'
    }
  }
];

export const INITIAL_CATEGORIES = [
  { id: 'CAT-01', name: 'Plumbing', iconName: 'Wrench', providersCount: 48, status: 'Active' },
  { id: 'CAT-02', name: 'Electrical', iconName: 'Zap', providersCount: 42, status: 'Active' },
  { id: 'CAT-03', name: 'AC Maintenance', iconName: 'Wind', providersCount: 36, status: 'Active' },
  { id: 'CAT-04', name: 'Carpentry', iconName: 'Hammer', providersCount: 28, status: 'Active' },
  { id: 'CAT-05', name: 'House Cleaning', iconName: 'Sparkles', providersCount: 31, status: 'Active' },
  { id: 'CAT-06', name: 'Painting', iconName: 'Paintbrush', providersCount: 25, status: 'Active' },
  { id: 'CAT-07', name: 'Gardening', iconName: 'Trees', providersCount: 19, status: 'Active' },
  { id: 'CAT-08', name: 'Roofing', iconName: 'Home', providersCount: 14, status: 'Active' },
  { id: 'CAT-09', name: 'Masonry', iconName: 'Layers', providersCount: 12, status: 'Active' },
  { id: 'CAT-10', name: 'Appliance Repair', iconName: 'Tv', providersCount: 22, status: 'Active' },
  { id: 'CAT-11', name: 'Pest Control', iconName: 'ShieldAlert', providersCount: 9, status: 'Inactive' },
  { id: 'CAT-12', name: 'Solar Installation', iconName: 'Sun', providersCount: 8, status: 'Active' }
];

export const INITIAL_COMPLAINTS = [
  {
    id: 'CMP-1041',
    customerName: 'Amara Fernando',
    customerEmail: 'amara.f@gmail.com',
    customerPhone: '+94 71 345 6789',
    providerName: 'Island Color Painters',
    providerPhone: '+94 72 678 9012',
    category: 'Painting',
    issue: 'Provider missed scheduled date and did not answer calls',
    description: 'Booked exterior painting for 15 May. The provider confirmed appointment but never arrived. Multiple phone attempts were ignored.',
    status: 'Pending',
    priority: 'High',
    submittedDate: '16 May 2025, 10:30 AM',
    timeline: [
      { date: '16 May 2025, 10:30 AM', event: 'Complaint lodged by customer' },
      { date: '16 May 2025, 11:15 AM', event: 'Assigned to Support Specialist' }
    ]
  },
  {
    id: 'CMP-1042',
    customerName: 'Kasun Perera',
    customerEmail: 'kasun.perera@example.com',
    customerPhone: '+94 77 123 4567',
    providerName: 'MasterCraft Woodworks',
    providerPhone: '+94 76 111 3333',
    category: 'Carpentry',
    issue: 'Dispute regarding material cost invoice',
    description: 'Original quote was LKR 4,000 for hinge replacements, but was charged LKR 6,500 on site without prior written approval.',
    status: 'In Progress',
    priority: 'Medium',
    submittedDate: '18 May 2025, 02:15 PM',
    timeline: [
      { date: '18 May 2025, 02:15 PM', event: 'Complaint lodged by customer' },
      { date: '18 May 2025, 03:00 PM', event: 'Provider contacted for clarification' },
      { date: '19 May 2025, 09:30 AM', event: 'Provider submitted purchase receipt copy' }
    ]
  },
  {
    id: 'CMP-1043',
    customerName: 'Suresh Jayawardena',
    customerEmail: 'suresh.j@outlook.com',
    customerPhone: '+94 76 567 8901',
    providerName: 'TechFlow Plumbing',
    providerPhone: '+94 77 123 4567',
    category: 'Plumbing',
    issue: 'Small leak reappeared 2 days after kitchen pipe repair',
    description: 'Under-sink pipe had minor dripping after initial washer replacement was performed.',
    status: 'Resolved',
    priority: 'Low',
    submittedDate: '10 May 2025, 08:45 AM',
    timeline: [
      { date: '10 May 2025, 08:45 AM', event: 'Complaint lodged by customer' },
      { date: '10 May 2025, 11:00 AM', event: 'Provider notified under 30-day warranty' },
      { date: '11 May 2025, 02:00 PM', event: 'Provider visited and sealed joint at no additional cost' },
      { date: '11 May 2025, 04:30 PM', event: 'Customer marked resolved' }
    ]
  },
  {
    id: 'CMP-1044',
    customerName: 'Malini Wickramasinghe',
    customerEmail: 'malini.w@gmail.com',
    customerPhone: '+94 77 789 0123',
    providerName: 'SparkPro Electrical Works',
    providerPhone: '+94 71 555 6666',
    category: 'Electrical',
    issue: 'Unclear price breakdown on trip switch installation',
    description: 'Customer requested a formal itemized receipt for the parts and labor.',
    status: 'Resolved',
    priority: 'Low',
    submittedDate: '08 May 2025, 04:00 PM',
    timeline: [
      { date: '08 May 2025, 04:00 PM', event: 'Complaint lodged by customer' },
      { date: '09 May 2025, 10:00 AM', event: 'Itemized invoice issued to customer' },
      { date: '09 May 2025, 12:00 PM', event: 'Resolved successfully' }
    ]
  }
];

export const INITIAL_ACTIVITY_LOGS = [
  {
    id: 'LOG-8801',
    timestamp: '20 May 2025, 02:14 PM',
    actor: 'Admin (admin@servicenest.com)',
    role: 'Admin',
    action: 'Provider Verification Approved',
    category: 'Verification',
    details: 'Verified provider "Charls Fernando (CoolBreeze)" following NIC & NVQ review.'
  },
  {
    id: 'LOG-8802',
    timestamp: '20 May 2025, 01:20 PM',
    actor: 'System Auto-Monitor',
    role: 'System',
    action: 'Service Request Dispatched',
    category: 'Booking',
    details: 'Customer "Kasun Perera" booked plumbing service with "TechFlow Plumbing".'
  },
  {
    id: 'LOG-8803',
    timestamp: '19 May 2025, 04:45 PM',
    actor: 'Admin (admin@servicenest.com)',
    role: 'Admin',
    action: 'Trade Category Added',
    category: 'Categories',
    details: 'Created new active category "Solar Installation" (CAT-12).'
  },
  {
    id: 'LOG-8804',
    timestamp: '19 May 2025, 03:10 PM',
    actor: 'Dinesh Pathirana',
    role: 'Provider',
    action: 'Profile Updated',
    category: 'Profile',
    details: 'Provider updated service pricing and phone contact details.'
  },
  {
    id: 'LOG-8805',
    timestamp: '18 May 2025, 02:15 PM',
    actor: 'Kasun Perera',
    role: 'Customer',
    action: 'Complaint Submitted',
    category: 'Complaints',
    details: 'Lodged ticket CMP-1042 regarding carpentry material charges.'
  },
  {
    id: 'LOG-8806',
    timestamp: '18 May 2025, 10:00 AM',
    actor: 'Admin (admin@servicenest.com)',
    role: 'Admin',
    action: 'Provider Suspended',
    category: 'Moderation',
    details: 'Temporarily suspended "Island Color Painters" pending dispute review.'
  },
  {
    id: 'LOG-8807',
    timestamp: '17 May 2025, 11:30 AM',
    actor: 'Malini Wickramasinghe',
    role: 'Customer',
    action: 'New User Registered',
    category: 'Authentication',
    details: 'Registered customer account from Kurunegala district.'
  }
];

export const INITIAL_ADMIN_SETTINGS = {
  general: {
    platformName: 'ServiceNest Sri Lanka',
    supportEmail: 'support@servicenest.com',
    adminContact: '+94 11 200 3000',
    currency: 'LKR (Sri Lankan Rupee)',
    commissionRate: '8%',
    maintenanceMode: false
  },
  notifications: {
    emailOnNewProvider: true,
    emailOnComplaint: true,
    weeklyReportDigest: true,
    smsAlertsCritical: true
  },
  security: {
    twoFactorAdmin: true,
    sessionTimeoutMins: 60,
    passwordExpirationDays: 90,
    requireNicUpload: true
  }
};
