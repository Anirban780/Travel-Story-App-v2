import React from "react";
import { FaHeart, FaRegHeart, FaClock, FaMapMarkerAlt, FaUser, FaEye } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import moment from "moment";

const TravelStoryCard = ({
  imageUrl,
  title,
  story,
  date,
  visitedLocation,
  isFavourite,
  author,
  views = 0,
  readTime = 5,
  onFavouriteClick,
  onClick,
  viewMode,
}) => {
   return (
    <div className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className={`w-full ${viewMode === 'grid' ? 'h-64' : 'h-90'} object-cover group-hover:scale-110 transition-transform duration-500`}
            onClick={onClick}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <button
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full border border-white/50 hover:bg-white transition-all duration-300 hover:scale-110"
            onClick={onFavouriteClick}
          >
            {isFavourite ? (
              <FaHeart className="text-red-500 text-lg" />
            ) : (
              <FaRegHeart className="text-slate-600 text-lg hover:text-red-500" />
            )}
          </button>

          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
              <FaEye className="text-xs" />
              {views}
            </div>
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
              <FaClock className="text-xs" />
              {readTime} min
            </div>
          </div>
        </div>
        
        <div className="p-6" onClick={onClick}>
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                <FaUser className="text-white text-xs" />
              </div>
              <span className="font-medium">{author || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
              <span>{date ? moment(date).format("MMM DD") : "-"}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-cyan-600 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          
          <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
            {story?.slice(0, 120)}...
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {visitedLocation?.slice(0, 2).map((location, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 text-xs font-medium text-cyan-700 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-full px-3 py-1"
              >
                <MdLocationOn className="text-sm" />
                {location}
              </span>
            ))}
            {visitedLocation?.length > 2 && (
              <span className="text-xs text-slate-500 px-2 py-1">
                +{visitedLocation.length - 2} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelStoryCard