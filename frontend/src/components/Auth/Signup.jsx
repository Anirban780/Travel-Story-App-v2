import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate, Link } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import bgImage from "../../assets/Images/signup-bg-img.png";
import { createUserIfNotExists } from "../../services/db";

// Simple email validation function
const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!name) {
      setError("Please enter your name");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter the password");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with name
      await updateProfile(userCredential.user, { displayName: name });
      await createUserIfNotExists(user);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
    finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="login-ui-box right-10 -top-40" />
      <div className="login-ui-box bg-gradient-to-br from-emerald-400/20 to-teal-500/20 -bottom-40 right-1/2 transform translate-x-1/2" />
      <div className="auth-decoration-1" />
      <div className="auth-decoration-2" />
      <div className="auth-decoration-3" />

      {/* Floating particles */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-emerald-400 rounded-full opacity-60"></div>
      <div className="absolute top-3/4 right-12 w-3 h-3 bg-teal-400 rounded-full opacity-40"></div>
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-50"></div>

      <div className="flex items-center justify-center min-h-screen px-4 lg:px-8">
        <div className="flex flex-col md:flex-row w-full max-w-5xl h-auto min-h-[80vh] rounded-3xl overflow-hidden shadow-2xl">

          {/* Left Side - Hero Section */}
          <div
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            className="hidden md:flex w-1/2 rounded-l-3xl p-10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-l-3xl" />
            <div className="relative z-10 flex flex-col justify-end h-full">
              <h4 className="text-4xl text-white font-bold leading-tight mb-4">
                Join the <br />
                <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  Adventure
                </span>
              </h4>
              <p className="text-lg text-white/90 leading-6 pr-6 font-medium">
                Create an account to start documenting your travels and preserving your memories in your personal travel journal
              </p>
              <div className="flex gap-3 mt-6">
                <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                <div className="w-3 h-3 bg-teal-400 rounded-full" />
                <div className="w-3 h-3 bg-cyan-400 rounded-full" />
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center bg-white/95 py-8">
            <div className="auth-form-container w-full max-w-md px-6">
              <form onSubmit={handleSignup} className="space-y-5">

                <div className="text-center">
                  <h4 className="auth-heading ">Create Account</h4>
                  <p className="text-slate-600 text-sm mb-6">Join us to start your journey</p>
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="input-box"
                    value={name}
                    onChange={({ target }) => { setName(target.value); setError(""); }}
                    disabled={isLoading}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input-box"
                    value={email}
                    onChange={({ target }) => { setEmail(target.value); setError(""); }}
                    disabled={isLoading}
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                  <PasswordInput
                    value={password}
                    onChange={({ target }) => { setPassword(target.value); setError(""); }}
                    disabled={isLoading}
                    placeholder="Create a password"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="error-message">
                    <svg className="inline w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="space-y-3 pt-4">
                  <button
                    type="submit"
                    className={`btn-primary ${isLoading ? 'btn-loading' : ''}`}
                    disabled={isLoading}
                  >
                    <span className="btn-text">{isLoading ? 'Creating Account...' : 'Sign Up'}</span>
                  </button>

                  <button
                    type="button"
                    className="btn-light"
                    onClick={() => navigate('/login')}
                    disabled={isLoading}
                  >
                    <span className="btn-text">Already have an account?</span>
                  </button>
                </div>

                {/* Footer Text */}
                <div className="text-center text-sm text-slate-600 pt-4">
                  Already have an account?{' '}
                  <a href="/login" className="auth-link">Sign in here</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;