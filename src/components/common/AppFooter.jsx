import React from 'react';
import logoImg from '../../assets/logo.png';

export default function AppFooter() {
  return (
    <footer className="mt-12 bg-[#0B3A82] text-white rounded-t-3xl pt-8 pb-6 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-blue-800/60 text-xs">
        
        {/* Col 1: Brand */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-xs">
              <img src={logoImg} alt="ServiceNest Logo" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-base font-extrabold tracking-tight text-white">ServiceNest</h3>
          </div>
          <p className="text-blue-200/80 text-xs">Your Local Service Partner</p>
          <p className="text-[11px] text-blue-200/60 leading-relaxed pt-1">
            Connecting homeowners and businesses with verified local service professionals quickly, safely, and affordably.
          </p>
        </div>

        {/* Col 2: Contact Us */}
        <div className="space-y-2">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Contact Us</h4>
          <p className="text-blue-200/90 font-semibold">+94 11 234 5678</p>
          <p className="text-blue-200/80">support@servicenest.com</p>
          <p className="text-blue-200/70 text-[11px]">No. 123, Main Street, Colombo, Sri Lanka</p>
        </div>

        {/* Col 3: Follow Us */}
        <div className="space-y-2">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Follow Us</h4>
          <div className="flex items-center gap-3 text-blue-200/90 font-medium">
            <span className="hover:text-white cursor-pointer transition-colors">Facebook</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
          </div>
          <p className="text-blue-200/60 text-[11px] pt-1">
            Stay updated with top-rated local technicians & seasonal service discounts.
          </p>
        </div>

        {/* Col 4: Quick Links */}
        <div className="space-y-2">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Help & Legal</h4>
          <div className="flex flex-col space-y-1 text-blue-200/80">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Help Center & FAQ</span>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-blue-200/60 gap-2">
        <p>© 2025 ServiceNest. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span>|</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span>|</span>
          <span className="hover:text-white cursor-pointer">Help</span>
        </div>
      </div>
    </footer>
  );
}
