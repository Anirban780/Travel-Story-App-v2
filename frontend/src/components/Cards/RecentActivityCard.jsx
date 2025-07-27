import React from "react";
import moment from "moment";
import {
  MdAdd,
  MdFavorite,
  MdEdit,
  MdTrendingUp,
  MdDelete,
} from "react-icons/md";

const activityIcons = {
  add: MdAdd,
  favorite: MdFavorite,
  edit: MdEdit,
  delete: MdDelete,
};

const RecentActivityCard = ({ stories = [], maxItems = 3, onSeeAll }) => {
  // Fallback to "add" icon if unknown


  // Safely sort stories by date (descending)
  const sortedStories = [...stories]
    .filter(story => !!story.createdAt)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, maxItems);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <MdTrendingUp className="text-cyan-600" />
        Recent Activity
      </h3>

      <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
        {sortedStories.length > 0 ? (
          sortedStories.map((story, index) => {
            const ActivityIcon = activityIcons[story.type] || MdAdd;

            return (
              <div
                key={`${story.storyId || story.id}-${index}`}
                className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <ActivityIcon className="text-white text-sm" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700 break-words">
                    {story.storyTitle || "Untitled Story"}
                  </p>

                  <p className="text-xs text-slate-500">
                    {story.createdAt && story.createdAt.toDate
                      ? moment(story.createdAt.toDate()).fromNow()
                      : "Date unknown"}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-slate-500 text-center py-4">
            No recent activity
          </p>
        )}
      </div>

      {/* Optional "See All" button */}
      {onSeeAll && stories.length > maxItems && (
        <div className="mt-4 text-center">
          <button
            onClick={onSeeAll}
            className="text-cyan-600 hover:underline text-sm font-medium"
          >
            See All Activity
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivityCard;
