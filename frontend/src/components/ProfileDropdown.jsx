import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/auth";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const ProfileDropdown = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            toast.error("Failed to logout");
            console.error(error);
        }
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

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

    const displayName = user.displayName || user.email?.split("@")[0];
    const initials = displayName?.charAt(0).toUpperCase();

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Avatar Button */}
            <button onClick={toggleDropdown} className="focus:outline-none">
                {user.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt="avatar"
                        className="w-10 h-10 rounded-full border object-cover"
                    />
                ) : (
                    <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-gradient-to-r from-cyan-100 to-blue-100 border-2 border-cyan-200">
                        {initials || <FaUserCircle className="w-6 h-6 text-gray-500" />}
                    </div>
                )}
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 animate-fade-in">
                    <div className="flex items-center gap-3">
                        {user.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt="avatar"
                                className="w-10 h-10 rounded-full border object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 flex items-center justify-center rounded-full text-slate-950 font-medium bg-gradient-to-r from-cyan-100 to-blue-100 border-2 border-cyan-200">
                                {initials || <FaUserCircle className="w-6 h-6 text-gray-500" />}
                            </div>
                        )}
                        <div className="flex flex-col">
                            <p className="text-sm font-semibold text-slate-700">
                                {displayName}
                            </p>
                            <p className="text-xs text-slate-500">
                                {user.email?.includes("@gmail.com") ? "Google Account" : "User"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                        <button
                            onClick={() => {
                                navigate("/profile");
                                setIsOpen(false);
                            }}
                            className="w-full text-center px-4 py-2 text-sm text-slate-700 bg-white hover:bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-gray-200 transition-all duration-200"
                        >
                            Profile
                        </button>

                        <button
                            onClick={handleLogout}
                            className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium tracking-tighter text-white bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg group hover:from-red-500 hover:to-red-600 transition-all duration-300"
                        >
                            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-red-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                            <span className="relative text-sm">Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
