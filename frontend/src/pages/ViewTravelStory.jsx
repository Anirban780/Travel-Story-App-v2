import React from "react";
import { FaHeart } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import moment from "moment";
import { IoClose } from "react-icons/io5";
const ViewTravelStory = ({ storyInfo, onClose, onEditClick, onDeleteClick }) => {
    if (!storyInfo) return null;
    const { imageUrl, title, story, visitedLocation, visitedDate, isFavourite } = storyInfo;

    return (
        <div className="relative max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <button className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500" onClick={onClose}>
                <IoClose />
            </button>
            <div className="flex flex-col items-center">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full max-h-72 object-cover rounded-lg mb-4"
                />

                <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
                    {isFavourite && <FaHeart className="text-red-500" />}
                </div>

                <div className="flex items-center gap-2 text-cyan-700 mb-2">
                    <GrMapLocation />
                    <span>{visitedLocation?.join(", ")}</span>
                </div>

                <div className="text-xs text-slate-500 mb-4">
                    Visited on: {visitedDate ? moment(visitedDate).format("Do MMM YYYY") : "-"}
                </div>
                <div className="text-slate-700 text-base mb-6 whitespace-pre-line">
                    {story}
                </div>

                <div className="flex gap-4">
                    <button className="btn-primary !px-8" onClick={onEditClick}>
                        Edit
                    </button>
                    <button className="btn-delete" onClick={onDeleteClick}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewTravelStory;
