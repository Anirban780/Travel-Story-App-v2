import React from 'react';
import LOGO from '../assets/Images/logo.svg';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

const Navbar = ({ userInfo }) => {
  const navigate = useNavigate();

  const onLogOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className='bg-white flex items-center justify-between px-6 pt-2 drop-shadow sticky top-0 z-10'>
      <div className='flex items-center gap-2'>
        <img
          src="/travel-icon.svg"
          alt="App Logo"
          className="h-10 w-10"
        />
        <img
          src={LOGO}
          alt="Travel Story"
          className='mt-2 h-12'
        />

      </div>

      <div className="flex items-center gap-4">
        <span className="font-semibold">{userInfo.email}</span>
        <button onClick={onLogOut} className="btn-primary">Logout</button>
      </div>
    </div>

  );
};

export default Navbar;
