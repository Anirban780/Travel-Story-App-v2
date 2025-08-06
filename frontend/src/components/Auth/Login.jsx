import React, { useState } from 'react';
import PasswordInput from '../../components/Input/PasswordInput';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from '../../assets/Images/bg-image.png';
import { googleSignIn } from '../../services/auth';
import { createUserIfNotExists } from '../../services/db';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError('Please enter your password');
      setIsLoading(false);
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      await createUserIfNotExists(user);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsGoogleLoading(true);

    try {
      const result = await googleSignIn();
      await result.user.reload(); 
      const user = result.user;

      // Ensure Google profile image is saved in Firestore
      await createUserIfNotExists(user);

      //console.log(user);

      navigate('/');
    } catch (err) {
      if (err.code === 'auth/account-exists-with-different-credential') {
        setError('An account already exists with this email. Please sign in with the existing provider.');
      } else {
        setError('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="login-ui-box right-10 -top-40" />
      <div className="login-ui-box bg-gradient-to-br from-purple-400/20 to-pink-500/20 -bottom-40 right-1/2 transform translate-x-1/2" />
      <div className="auth-decoration-1" />
      <div className="auth-decoration-2" />
      <div className="auth-decoration-3" />

      {/* Floating particles */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-cyan-400 rounded-full opacity-60"></div>
      <div className="absolute top-3/4 right-12 w-3 h-3 bg-purple-400 rounded-full opacity-40"></div>
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-pink-400 rounded-full opacity-50"></div>

      <div className="flex items-center justify-center min-h-screen px-4 lg:px-8 py-8">
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
                Capture Your <br />
                <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  Journeys
                </span>
              </h4>
              <p className="text-lg text-white/90 leading-6 pr-6 font-medium">
                Record your travel experiences and memories in your personal travel journal
              </p>
              <div className="flex gap-3 mt-6">
                <div className="w-3 h-3 bg-cyan-400 rounded-full" />
                <div className="w-3 h-3 bg-blue-400 rounded-full" />
                <div className="w-3 h-3 bg-purple-400 rounded-full" />
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center bg-white/95 py-8">
            <div className="auth-form-container w-full max-w-md px-6">
              <form onSubmit={handleLogin} className="space-y-5">

                <div className="text-center">
                  <h4 className="auth-heading">Welcome Back</h4>
                  <p className="text-slate-600 text-sm mb-6">Sign in to continue your adventure</p>
                </div>

                {/* Google Sign-in Button */}
                <button
                  type="button"
                  className={`btn-google ${isGoogleLoading ? 'btn-loading' : ''}`}
                  onClick={handleGoogleSignIn}
                  disabled={isLoading || isGoogleLoading}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-1.01 7.28-2.73l-3.57-2.77c-1.01.68-2.3 1.08-3.71 1.08-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span className="btn-text">{isGoogleLoading ? 'Signing in...' : 'Continue with Google'}</span>
                </button>

                {/* Divider */}
                <div className="auth-divider">
                  <span>or continue with email</span>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input-box !text-black"
                    value={email}
                    onChange={({ target }) => { setEmail(target.value); setError(null); }}
                    disabled={isLoading || isGoogleLoading}
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                  <PasswordInput
                    value={password}
                    onChange={({ target }) => { setPassword(target.value); setError(null); }}
                    disabled={isLoading || isGoogleLoading}
                    placeholder="Enter your password"
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

                {/* Forgot Password Link */}
                <div className="text-right">
                  <a href="/forgot-password" className="auth-link text-sm">Forgot your password?</a>
                </div>

                {/* Submit Buttons */}
                <div className="space-y-3 pt-4">
                  <button
                    type="submit"
                    className={`btn-primary ${isLoading ? 'btn-loading' : ''}`}
                    disabled={isLoading || isGoogleLoading}
                  >
                    <span className="btn-text">{isLoading ? 'Signing in...' : 'Sign In'}</span>
                  </button>

                  <button
                    type="button"
                    className="btn-light"
                    onClick={() => navigate('/signup')}
                    disabled={isLoading || isGoogleLoading}
                  >
                    <span className="btn-text">Create New Account</span>
                  </button>
                </div>

                {/* Footer Text */}
                <div className="text-center text-sm text-slate-600 pt-4">
                  Don't have an account?{' '}
                  <a href="/signup" className="auth-link">Sign up here</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;