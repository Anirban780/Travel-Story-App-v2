import React from "react";
import useAuth from "../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import Loader from "./../components/Loader";

const Profile = ({ isShown, onClose }) => {
  const { user } = useAuth();

  if(!isShown) return null
  if (!user) return <Loader />

  return (
    <div className="fixed inset-70 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6 relative animate-fade-in">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 w-8 h-8 text-gray-400 hover:text-red-600 hover:bg-red-300 rounded-full text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>

        <div className="flex flex-col items-center gap-4">
          {/* Profile Picture */}
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-sm"
            />
          ) : (
            <FaUserCircle className="text-6xl text-gray-500" />
          )}

          {/* Display Name */}
          <p className="text-lg font-semibold">
            {user.displayName || "Unnamed User"}
          </p>

          {/* Email */}
          <p className="text-sm text-gray-600">{user.email}</p>

          {/* Bio */}
          <div className="w-full mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={"This is a sample bio. You can store this in Firestore."}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700"
              readOnly
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
