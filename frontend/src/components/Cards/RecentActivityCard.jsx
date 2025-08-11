import React from "react";
import moment from "moment";
import {
  MdAdd,
  MdFavorite,
  MdEdit,
  MdTrendingUp,
  MdDelete,
  MdFavoriteBorder,
} from "react-icons/md";

const activityIcons = {
  add: MdAdd,
  favorite: MdFavorite,
  favourite: MdFavorite,
  unfavourite: MdFavoriteBorder,
  edit: MdEdit,
  delete: MdDelete,
};

const getActivityDisplayText = (type) => {
  const activityTexts = {
    add: "Added",
    edit: "Edited",
    delete: "Deleted",
    favorite: "Added to favorites",
    favourite: "Added to favorites",
    unfavourite: "Removed from favorites",
  };
  return activityTexts[type] || "Updated";
};

const RecentActivityCard = ({ stories = [], maxItems = 3, onSeeAll }) => {
  // Debug: Log the raw data to see what we're working with
  console.log("Activities received:", stories);

  // Helper function to safely convert timestamp to Date
  const getTimestampAsDate = (timestamp) => {
    console.log("Processing timestamp:", timestamp, typeof timestamp);
    console.log("Timestamp keys:", timestamp ? Object.keys(timestamp) : "no keys");
    
    if (!timestamp) return null;
    
    // If it's a Firestore timestamp with toDate method
    if (timestamp && typeof timestamp.toDate === 'function') {
      console.log("Converting Firestore timestamp");
      return timestamp.toDate();
    }
    
    // If it's already a Date object
    if (timestamp instanceof Date) {
      console.log("Already a Date object");
      return timestamp;
    }
    
    // If it's a number (milliseconds)
    if (typeof timestamp === 'number') {
      console.log("Converting number timestamp");
      return new Date(timestamp);
    }
    
    // If it's a string, try to parse it
    if (typeof timestamp === 'string') {
      console.log("Parsing string timestamp");
      const parsed = new Date(timestamp);
      return isNaN(parsed.getTime()) ? null : parsed;
    }
    
    // If it has seconds and nanoseconds (Firestore timestamp object)
    if (timestamp && typeof timestamp === 'object') {
      console.log("Checking for Firestore timestamp properties...");
      
      // Check for seconds property (Firestore timestamp)
      if (timestamp.seconds !== undefined) {
        console.log("Converting Firestore timestamp object with seconds:", timestamp.seconds);
        return new Date(timestamp.seconds * 1000);
      }
      
      // Check for _seconds property (sometimes Firestore timestamps are serialized differently)
      if (timestamp._seconds !== undefined) {
        console.log("Converting Firestore timestamp object with _seconds:", timestamp._seconds);
        return new Date(timestamp._seconds * 1000);
      }
      
      // Check if it's a plain object with seconds/nanoseconds
      if (timestamp.seconds !== undefined && timestamp.nanoseconds !== undefined) {
        console.log("Converting Firestore timestamp with seconds and nanoseconds");
        return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
      }
    }
    
    console.log("Could not convert timestamp - full object:", JSON.stringify(timestamp));
    return null;
  };

  // Safely sort activities by date (descending - most recent first)
  const sortedStories = [...stories]
    .map((story, index) => {
      console.log(`Story ${index}:`, story);
      const date = getTimestampAsDate(story.createdAt);
      console.log(`Converted date for story ${index}:`, date);
      return { ...story, convertedDate: date };
    })
    .filter(story => {
      const hasDate = story.convertedDate !== null;
      console.log("Story has valid date:", hasDate, story.storyTitle);
      return hasDate;
    })
    .sort((a, b) => {
      return b.convertedDate.getTime() - a.convertedDate.getTime();
    })
    .slice(0, maxItems);

  console.log("Final sorted stories:", sortedStories);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <MdTrendingUp className="text-cyan-600" />
        Recent Activity
      </h3>

      <div className="space-y-4 max-h-72  pr-2">
        {sortedStories.length > 0 ? (
          sortedStories.map((story, index) => {
            const ActivityIcon = activityIcons[story.type] || MdAdd;

            return (
              <div
                key={`${story.storyId || story.id}-${index}`}
                className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <ActivityIcon className="text-white text-sm" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700 break-words">
                    {getActivityDisplayText(story.type)} "{story.storyTitle || "Untitled Story"}"
                  </p>

                  <p className="text-xs text-slate-500">
                    {story.convertedDate 
                      ? moment(story.convertedDate).fromNow()
                      : "Date unknown"}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MdTrendingUp className="text-slate-400 text-2xl" />
            </div>
            <p className="text-sm text-slate-500">
              No recent activity
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Start creating stories to see your activity here
            </p>
          </div>
        )}
      </div>

      {/* Optional "See All" button */}
      {onSeeAll && stories.length > maxItems && (
        <div className="mt-4 text-center">
          <button
            onClick={onSeeAll}
            className="text-cyan-600 hover:text-cyan-700 hover:underline text-sm font-medium transition-colors duration-200"
          >
            See All Activity
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivityCard;