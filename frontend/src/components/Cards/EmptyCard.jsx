import React from "react";
import { MdAdd } from "react-icons/md";
import emptyStory from '../../assets/Images/add-story.png'

const EmptyCard = ({ message, onCreateStory }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-20 w-full">
      <div className="relative mb-8">
        <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-12 rounded-full">
          <img src={emptyStory} alt="No Stories" className="w-32 h-32 object-contain opacity-80" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"></div>
      </div>
      
      <h3 className="text-2xl font-bold text-slate-800 mb-4">Start Your Journey</h3>
      <p className="max-w-xl text-base text-slate-600 leading-7 mb-8">
        {message}
      </p>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={onCreateStory}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
        >
          <MdAdd className="text-lg" />
          Create Your First Story
        </button>
      </div>
    </div>
  );
};
export default EmptyCard;
