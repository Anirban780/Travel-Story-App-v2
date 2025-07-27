import React from "react";
import { MdFilterList, MdViewModule, MdViewList, MdSearch } from "react-icons/md";

const FilterSortBar = ({ 
  viewMode, 
  setViewMode, 
  sortBy, 
  setSortBy, 
  filterBy, 
  setFilterBy,
  storiesCount,
  searchQuery,
  setSearchQuery 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-100">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MdFilterList className="text-slate-600 text-xl" />
            <span className="font-semibold text-slate-700">Filter & Sort</span>
          </div>
          <div className="text-sm text-slate-500">
            {storiesCount} stories found
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search Input for Mobile */}
          <div className="md:hidden relative">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white text-sm w-32"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white text-sm"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="favorites">Favorites</option>
            <option value="oldest">Oldest First</option>
          </select>
          
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white text-sm"
          >
            <option value="all">All Stories</option>
            <option value="favorites">Favorites Only</option>
            <option value="recent">This Week</option>
            <option value="month">This Month</option>
          </select>
          
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-white shadow-sm text-cyan-600' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <MdViewModule className="text-lg" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-white shadow-sm text-cyan-600' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <MdViewList className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSortBar;
