import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logout } from "../services/auth"; // Your logout function
import { FaUserCircle } from "react-icons/fa";
import Profile from "../pages/Profile";

const ProfileDropdown = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Profile Button */}
            <button
                onClick={toggleDropdown}
                className="focus:outline-none flex items-center gap-2"
            >
                {user.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt="avatar"
                        className="w-10 h-10 rounded-full border object-cover"
                    />
                ) : (
                    <FaUserCircle className="text-4xl mb-1 text-gray-500 hover:text-gray-700 transition" />
                )}
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 animate-fade-in">
                    <div className="text-[16px] text-gray-800 font-semibold mb-2 truncate">
                        {user.displayName || "User"}
                    </div>
                    <div className="text-sm text-gray-500 truncate mb-3">{user.email}</div>

                    <button
                        onClick={() => setIsProfileOpen(true)}
                        className="btn-primary rounded"
                    >
                        Go to Profile
                    </button>

                    <button
                        onClick={handleLogout}
                        className="hover:!bg-red-500 hover:!text-white rounded mt-2 btn-primary"
                    >
                        Logout
                    </button>
                </div>
            )}

            <Profile isShown={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        </div>

    );
};

export default ProfileDropdown;
