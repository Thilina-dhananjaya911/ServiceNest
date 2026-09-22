import React, { useState } from 'react';
import {
  Star,
  MapPin,
  Briefcase,
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Sparkles,
  Wind,
  Car,
  ArrowRight,
  User,
  Search,
  CheckCircle2,
  Filter,
  DollarSign
} from 'lucide-react';

const ALL_PROVIDERS = [
  // New / Featured Providers Section (Screenshot 4)
  {
    id: 'ahmed-raza',
    name: 'Ahmed Raza',
    category: 'Plumbing',
    icon: Wrench,
    rating: 4.8,
    reviewsCount: 24,
    worksDone: 48,
    location: 'Colombo',
    isNew: true,
    isFeatured: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    experience: '4 Years',
    startingPrice: 'LKR 1,500',
    bio: 'Certified master plumber specializing in residential leak repairs, bathroom sanitary fitting, and emergency pipe unclogging.',
    servicesOffered: [
      { name: 'Pipe Installation', price: 'LKR 1,500 - 2,000' },
      { name: 'Pipe Repair', price: 'LKR 1,000 - 1,500' },
      { name: 'Drain Cleaning', price: 'LKR 1,000 - 1,800' },
      { name: 'Bathroom Fitting', price: 'LKR 2,000+' }
    ],
    availability: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 3:00 PM']
  },
  {
    id: 'bimal-perera',
    name: 'Bimal Perera',
    category: 'Electrical Work',
    icon: Zap,
    rating: 4.7,
    reviewsCount: 18,
    worksDone: 32,
    location: 'Kandy',
    isNew: true,
    isFeatured: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    experience: '5 Years',
    startingPrice: 'LKR 1,800',
    bio: 'Professional certified electrician. House wiring, distribution board repairs, lighting installation, and safety checks.',
    servicesOffered: [
      { name: 'Trip Switch Repair', price: 'LKR 1,800 - 2,500' },
      { name: 'House Wiring Check', price: 'LKR 2,500+' },
      { name: 'Light Fixture Installation', price: 'LKR 1,200 - 1,800' }
    ],
    availability: ['Mon - Sat: 8:00 AM - 6:00 PM']
  },
  {
    id: 'dinesh-silva',
    name: 'Dinesh Silva',
    category: 'Cleaning',
    icon: Sparkles,
    rating: 4.5,
    reviewsCount: 16,
    worksDone: 41,
    location: 'Gampaha',
    isNew: true,
    isFeatured: false,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80',
    experience: '3 Years',
    startingPrice: 'LKR 1,200',
    bio: 'Residential and commercial deep cleaning specialist with professional eco-friendly sanitization equipment.',
    servicesOffered: [
      { name: 'Home Deep Cleaning', price: 'LKR 3,000 - 5,000' },
      { name: 'Sofa & Carpet Wash', price: 'LKR 2,000 - 3,500' }
    ],
    availability: ['Mon - Sun: 7:30 AM - 5:30 PM']
  },
  {
    id: 'eshan-jayawardena',
    name: 'Eshan Jayawardena',
    category: 'Painting',
    icon: Paintbrush,
    rating: 4.7,
    reviewsCount: 21,
    worksDone: 29,
    location: 'Matara',
    isNew: true,
    isFeatured: true,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80',
    experience: '6 Years',
    startingPrice: 'LKR 2,500',
    bio: 'Interior and exterior painting contractor. Water sealing, weather coat application, and texture wall designs.',
    servicesOffered: [
      { name: 'Interior Painting', price: 'LKR 3,500+' },
      { name: 'Waterproofing', price: 'LKR 4,000+' }
    ],
    availability: ['Mon - Sat: 8:00 AM - 5:00 PM']
  },

  // All Service Providers Section (Screenshot 4)
  {
    id: 'abhinav-perera',
    name: 'Abhinav Perera',
    category: 'Carpentry',
    icon: Hammer,
    rating: 4.6,
    reviewsCount: 20,
    worksDone: 38,
    location: 'Galle',
    isNew: false,
    isFeatured: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80',
    experience: '5 Years',
    startingPrice: 'LKR 2,000',
    bio: 'Custom wooden cabinetry, furniture restoration, door lock fitting, and teak wood maintenance.',
    servicesOffered: [
      { name: 'Door & Lock Fitting', price: 'LKR 2,000 - 3,000' },
      { name: 'Cabinet Repair', price: 'LKR 3,000+' }
    ],
    availability: ['Mon - Fri: 8:30 AM - 5:00 PM']
  },
  {
    id: 'charls-fernando',
    name: 'Charls Fernando',
    category: 'AC Maintenance',
    icon: Wind,
    rating: 4.5,
    reviewsCount: 17,
    worksDone: 33,
    location: 'Negombo',
    isNew: false,
    isFeatured: false,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&auto=format&fit=crop&q=80',
    experience: '4 Years',
    startingPrice: 'LKR 2,000',
    bio: 'Experienced air conditioning technician. Gas refilling, chemical washing, filter cleaning, and compressor diagnostics.',
    servicesOffered: [
      { name: 'AC Chemical Wash', price: 'LKR 3,000 - 4,500' },
      { name: 'Gas Refill', price: 'LKR 2,500+' }
    ],
    availability: ['Mon - Sun: 8:00 AM - 6:00 PM']
  },
  {
    id: 'fahim-mohamed',
    name: 'Fahim Mohamed',
    category: 'Vehicle Repair',
    icon: Car,
    rating: 4.6,
    reviewsCount: 27,
    worksDone: 55,
    location: 'Galle',
    isNew: false,
    isFeatured: true,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80',
    experience: '8 Years',
    startingPrice: 'LKR 2,000',
    bio: 'Mobile auto mechanic. On-site vehicle diagnostics, brake pad service, battery jumpstart, and oil change.',
    servicesOffered: [
      { name: 'Roadside Diagnostic', price: 'LKR 2,000 - 3,500' },
      { name: 'Brake Service', price: 'LKR 3,000+' }
    ],
    availability: ['24/7 On-Call']
  },
  {
    id: 'gayan-wickramasinghe',
    name: 'Gayan Wickramasinghe',
    category: 'Electrical Work',
    icon: Zap,
    rating: 4.4,
    reviewsCount: 12,
    worksDone: 37,
    location: 'Kandy',
    isNew: false,
    isFeatured: false,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    experience: '6 Years',
    startingPrice: 'LKR 1,800',
    bio: 'Residential electrician for switchboard repairs, ceiling fan installations, and safety circuit testing.',
    servicesOffered: [
      { name: 'Switchboard Repair', price: 'LKR 1,800 - 2,500' }
    ],
    availability: ['Mon - Sat: 8:00 AM - 6:00 PM']
  },
  {
    id: 'hasitha-jayasinghe',
    name: 'Hasitha Jayasinghe',
    category: 'Electrical Work',
    icon: Zap,
    rating: 4.5,
    reviewsCount: 15,
    worksDone: 23,
    location: 'Kurunegala',
    isNew: false,
    isFeatured: false,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80',
    experience: '4 Years',
    startingPrice: 'LKR 1,800',
    bio: 'Electrical wiring, inverter setup, and emergency power restoration specialist.',
    servicesOffered: [
      { name: 'Circuit Troubleshooting', price: 'LKR 2,000+' }
    ],
    availability: ['Mon - Fri: 8:00 AM - 5:00 PM']
  },
  {
    id: 'isuru-prabath',
    name: 'Isuru Prabath',
    category: 'Plumbing',
    icon: Wrench,
    rating: 4.8,
    reviewsCount: 20,
    worksDone: 41,
    location: 'Matale',
    isNew: false,
    isFeatured: true,
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=160&auto=format&fit=crop&q=80',
    experience: '7 Years',
    startingPrice: 'LKR 1,500',
    bio: 'Expert sanitary plumber. Water pressure solutions, booster pump installation, and drain leak fixing.',
    servicesOffered: [
      { name: 'Pump Installation', price: 'LKR 3,500+' }
    ],
    availability: ['Mon - Sat: 8:00 AM - 6:00 PM']
  },
  {
    id: 'kasun-de-silva',
    name: 'Kasun De Silva',
    category: 'Carpentry',
    icon: Hammer,
    rating: 4.3,
    reviewsCount: 10,
    worksDone: 18,
    location: 'Negombo',
    isNew: false,
    isFeatured: false,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=160&auto=format&fit=crop&q=80',
    experience: '3 Years',
    startingPrice: 'LKR 2,000',
    bio: 'Skilled woodworker for home repair, door framing, and wooden shelving.',
    servicesOffered: [
      { name: 'Shelf & Door Repair', price: 'LKR 2,000 - 3,500' }
    ],
    availability: ['Mon - Fri: 8:00 AM - 5:00 PM']
  },
  {
    id: 'nimal-fernando',
    name: 'Nimal Fernando',
    category: 'Painting',
    icon: Paintbrush,
    rating: 4.7,
    reviewsCount: 22,
    worksDone: 46,
    location: 'Ratnapura',
    isNew: false,
    isFeatured: true,
    avatar: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=160&auto=format&fit=crop&q=80',
    experience: '9 Years',
    startingPrice: 'LKR 2,500',
    bio: 'High quality exterior and interior house painter with neat preparation and fast turnaround.',
    servicesOffered: [
      { name: 'Full House Painting', price: 'LKR 5,000+' }
    ],
    availability: ['Mon - Sat: 7:30 AM - 5:30 PM']
  }
];

export default function ServiceProvidersPage({ onSelectProvider, initialCategory = '', initialLocation = '' }) {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const categories = ['All Categories', 'Plumbing', 'Electrical Work', 'Carpentry', 'Painting', 'Cleaning', 'AC Maintenance', 'Vehicle Repair'];
  const locations = ['All Locations', 'Colombo', 'Kandy', 'Galle', 'Gampaha', 'Matara', 'Negombo', 'Kurunegala', 'Matale', 'Ratnapura'];

  const filterFn = (p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesCategory = selectedCategory && selectedCategory !== 'All Categories'
      ? p.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    const matchesLocation = selectedLocation && selectedLocation !== 'All Locations'
      ? p.location.toLowerCase() === selectedLocation.toLowerCase()
      : true;

    return matchesSearch && matchesCategory && matchesLocation;
  };

  const newProviders = ALL_PROVIDERS.filter((p) => p.isNew && filterFn(p));
  const regularProviders = ALL_PROVIDERS.filter((p) => !p.isNew && filterFn(p));

  const renderCard = (provider) => {
    const Icon = provider.icon;
    return (
      <div
        key={provider.id}
        className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between relative"
      >
        {/* Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5">
          {provider.isNew && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-md">
              New
            </span>
          )}
          {provider.isFeatured && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/90 px-2 py-0.5 rounded-md">
              Featured
            </span>
          )}
        </div>

        <div>
          {/* Avatar and Name */}
          <div className="flex items-center gap-3.5 mb-3 pt-3">
            <div className="relative shrink-0">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-12 h-12 rounded-full object-cover border border-slate-200"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{provider.name}</h3>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              </div>
              <p className="text-xs font-semibold text-blue-600 flex items-center gap-1.5 mt-0.5">
                <Icon className="w-3.5 h-3.5" />
                <span>{provider.category}</span>
              </p>
            </div>
          </div>

          {/* Details: Rating, Works Done, Location, Price */}
          <div className="space-y-1.5 text-xs text-slate-500 pt-1 pb-3">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800">{provider.rating}</span>
              <span>({provider.reviewsCount} reviews)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <span>{provider.worksDone} works done</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{provider.location}</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-700 font-bold pt-1">
              <span className="text-[11px] text-slate-400 font-normal">Starts at:</span>
              <span className="text-emerald-700">{provider.startingPrice}</span>
            </div>
          </div>
        </div>

        {/* View Profile Action */}
        <div className="pt-3 border-t border-slate-100 flex justify-center">
          <button
            type="button"
            onClick={() => onSelectProvider && onSelectProvider(provider)}
            className="w-full py-2 bg-blue-50 hover:bg-[#2563EB] text-blue-600 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>View Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Page Title Header & Controls matching Screenshot 4 + Section 8 */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Service Providers
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Find trusted and verified service providers in your area.
            </p>
          </div>

          {/* Top-Right Search Bar matching Screenshot 4 */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search by location or provider name..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Filter Bar: Category & Location */}
        <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold shrink-0">
            <Filter className="w-4 h-4 text-blue-600" />
            <span>Filter By:</span>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c === 'All Categories' ? '' : c}>{c}</option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc === 'All Locations' ? '' : loc}>{loc}</option>
            ))}
          </select>

          {(selectedCategory || selectedLocation || searchFilter) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('');
                setSelectedLocation('');
                setSearchFilter('');
              }}
              className="ml-auto text-xs font-bold text-rose-600 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* 2. New Service Providers Section matching Screenshot 4 */}
      {newProviders.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              New
            </span>
            <h2 className="text-base font-bold text-slate-900">
              New Service Providers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {newProviders.map(renderCard)}
          </div>
        </div>
      )}

      {/* 3. All Service Providers Section matching Screenshot 4 */}
      {regularProviders.length > 0 && (
        <div className="space-y-4 pt-2">
          <h2 className="text-base font-bold text-slate-900">
            All Service Providers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {regularProviders.map(renderCard)}
          </div>
        </div>
      )}

      {newProviders.length === 0 && regularProviders.length === 0 && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center space-y-3">
          <p className="text-sm font-bold text-slate-700">No service providers match your search or filter.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('');
              setSelectedLocation('');
              setSearchFilter('');
            }}
            className="px-4 py-2 bg-[#2563EB] text-white rounded-xl text-xs font-bold"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
}
