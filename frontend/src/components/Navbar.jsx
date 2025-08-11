import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <div className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-cyan-100">
      {/* Main Navbar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src="/travel-icon.svg"
              alt="Website Logo"
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <div>
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                TravelStory
              </h2>
              <p className="hidden sm:block text-xs text-slate-500">
                Your Journey Continues
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl" />
            <input
              type="text"
              placeholder="Search stories, destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-slate-50 text-sm"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Button */}
          <button
            className="md:hidden p-2 hover:bg-slate-100 rounded-full"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            <MdSearch className="text-xl text-slate-600" />
          </button>

          {/* ProfileDropdown Always Visible */}
          <ProfileDropdown />
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4">
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-slate-50 text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
