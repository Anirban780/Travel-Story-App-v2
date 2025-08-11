import React from "react";
import { MdFilterList, MdViewModule, MdViewList } from "react-icons/md";

const FilterSortBar = ({ 
  viewMode, 
  setViewMode, 
  sortBy, 
  setSortBy, 
  filterBy, 
  setFilterBy,
  storiesCount
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 mb-6 border border-slate-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        {/* Left section: title + count */}
        <div className="flex items-center gap-3">
          <MdFilterList className="text-slate-600 text-xl" />
          <span className="font-semibold text-slate-700">Filter & Sort</span>
          <span className="text-sm text-slate-500">{storiesCount} stories found</span>
        </div>

        {/* Right section: controls */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white text-sm"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="favorites">Favorites</option>
            <option value="oldest">Oldest First</option>
          </select>
          
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white text-sm"
          >
            <option value="all">All Stories</option>
            <option value="favorites">Favorites Only</option>
            <option value="recent">This Week</option>
            <option value="month">This Month</option>
          </select>

          <div className="flex items-center bg-slate-100 rounded-lg p-1 justify-center sm:justify-start">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-white shadow-sm text-cyan-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <MdViewModule className="text-lg" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-white shadow-sm text-cyan-600"
                  : "text-slate-500 hover:text-slate-700"
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
