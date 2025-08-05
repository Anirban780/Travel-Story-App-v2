import React, { useState } from "react";
import { MdExplore, MdSearch } from "react-icons/md";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className='bg-white/95 backdrop-blur-md flex items-center justify-between px-6 py-4 shadow-lg sticky top-0 z-50 border-b border-cyan-100'>
      <div className='flex items-center gap-4'>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
            <MdExplore className="text-white text-xl" />
          </div>
          <div>
            <h2 className='text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent'>
              TravelStory
            </h2>
            <p className="text-xs text-slate-500">Your Journey Continues</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl" />
          <input
            type="text"
            placeholder="Search stories, destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-slate-50"
          />
        </div>
      </div>

      
      <ProfileDropdown />
    </div>
  );
};

export default Navbar;
