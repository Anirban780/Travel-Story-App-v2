import React, { useState } from 'react';
import { checkCurrentUser } from '../../services/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProfileDropdown from '../ProfileDropdown';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleJoinClick = () => {
    const currentUser = checkCurrentUser();
    if (currentUser) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/travel-icon.svg"
            alt="Website Logo"
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            TravelStory
          </h1>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/home" className="hover:text-cyan-600 transition-colors">
            Home
          </Link>
          <a
            href="#stories"
            className="text-slate-700 hover:text-cyan-600 transition-colors"
          >
            Stories
          </a>
          <a
            href="#explore"
            className="text-slate-700 hover:text-cyan-600 transition-colors"
          >
            Explore
          </a>
          <a
            href="#community"
            className="text-slate-700 hover:text-cyan-600 transition-colors"
          >
            Community
          </a>
          {user && <ProfileDropdown />}
          {!user && (
            <button
              onClick={handleJoinClick}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Join Now
            </button>
          )}
        </div>

        {/* Right side of navbar (mobile view) */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {user && <ProfileDropdown />} {/* Only show profile in navbar if logged in */}
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-6 pb-4 space-y-4 shadow-lg">
          <Link
            to="/home"
            className="block text-slate-700 hover:text-cyan-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <a
            href="#stories"
            className="block text-slate-700 hover:text-cyan-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Stories
          </a>
          <a
            href="#explore"
            className="block text-slate-700 hover:text-cyan-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Explore
          </a>
          <a
            href="#community"
            className="block text-slate-700 hover:text-cyan-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Community
          </a>
          {!user && (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleJoinClick();
              }}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Join Now
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
