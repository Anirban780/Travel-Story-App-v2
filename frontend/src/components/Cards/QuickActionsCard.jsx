import React from "react";
import { MdAdd, MdFavorite, MdExplore } from "react-icons/md";

const QuickActionsCard = ({ setOpenAddEditModal }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button
          onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          <MdAdd className="text-lg" />
          New Story
        </button>
        <button className="w-full border-2 border-cyan-200 text-cyan-600 p-3 rounded-lg font-semibold hover:bg-cyan-50 transition-all duration-300 flex items-center justify-center gap-2">
          <MdExplore className="text-lg" />
          Explore Stories
        </button>
      </div>
    </div>
  );
};

export default QuickActionsCard;
