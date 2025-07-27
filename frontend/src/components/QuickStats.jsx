import React from "react";
import { MdExplore, MdLocationOn, MdFavorite } from "react-icons/md";

const QuickStats = ({ totalStories, totalLocations, totalFavorites }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[
        { 
          icon: MdExplore, 
          label: 'Total Stories', 
          value: totalStories, 
          color: 'from-cyan-500 to-blue-500',
          bgColor: 'from-cyan-50 to-blue-50'
        },
        { 
          icon: MdLocationOn, 
          label: 'Places Visited', 
          value: totalLocations, 
          color: 'from-green-500 to-emerald-500',
          bgColor: 'from-green-50 to-emerald-50'
        },
        { 
          icon: MdFavorite, 
          label: 'Favorites', 
          value: totalFavorites, 
          color: 'from-red-500 to-pink-500',
          bgColor: 'from-red-50 to-pink-50'
        }
      ].map((stat, index) => (
        <div key={index} className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-white shadow-sm hover:shadow-md transition-shadow duration-300`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon className="text-white text-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default QuickStats;
