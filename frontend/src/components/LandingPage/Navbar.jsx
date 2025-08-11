import React from 'react'
import { checkCurrentUser } from '../../services/auth'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProfileDropdown from '../ProfileDropdown';


const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleJoinClick = () => {
        const user = checkCurrentUser();
        if (user) {
            navigate("/home"); // or another signed-in route
        } else {
            navigate("/login");
        }
    };

    return (
        <>
            <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img 
                                src='/travel-icon.svg'
                                alt="Website Logo"
                                className='w-10 h-10'
                            />
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                                TravelStory
                            </h1>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <Link
                                to="/home"
                                className=""
                            >
                                Home
                            </Link>

                            <a href="#stories" className="text-slate-700 hover:text-cyan-600 transition-colors">Stories</a>
                            <a href="#explore" className="text-slate-700 hover:text-cyan-600 transition-colors">Explore</a>
                            <a href="#community" className="text-slate-700 hover:text-cyan-600 transition-colors">Community</a>
                            {user ? (
                                <ProfileDropdown />
                            ) : (
                                <button
                                    onClick={handleJoinClick}
                                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    Join Now
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Navbar