import React, { useState } from 'react';
import PasswordInput from '../../components/Input/PasswordInput';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from '../../assets/Images/bg-image.png';
import { googleSignIn } from '../../services/auth';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await googleSignIn();
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/account-exists-with-different-credential") {
        setError("An account already exists with this email. Please sign in with the existing provider.");
      } else {
        setError("Failed to sign in with Google. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen bg-cyan-50 overflow-hidden relative">
      <div className="login-ui-box right-10 -top-40" />
      <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2 transform translate-x-1/2" />

      <div className="container h-screen flex items-center justify-center px-20 mx-auto">
        <div
          style={{ backgroundImage: `url(${bgImage})` }}
          className="w-2/4 h-[90vh] flex items-end bg-cover bg-center rounded-lg p-10 z-50"
        >
          <div>
            <h4 className="text-5xl text-white font-semibold leading-[58px]">
              Capture Your <br /> Journeys
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
              Record your travel experiences and memories in your personal travel journal
            </p>
          </div>
        </div>

        <div className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20">
          <form onSubmit={handleLogin}>
            <h4 className="text-black text-2xl font-bold mb-7">Login</h4>

            <button
              type="button"
              className="w-full mb-4 text-sm md:text-base font-medium text-[#3c4043] bg-white border border-[#dadce0] rounded-full py-2.5 px-4 flex items-center justify-center gap-3 shadow-sm hover:shadow-lg hover:bg-[#f8f9fa] hover:text-black active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#4285f4]"
              onClick={handleGoogleSignIn}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-1.01 7.28-2.73l-3.57-2.77c-1.01.68-2.3 1.08-3.71 1.08-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </button>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={({ target }) => {
                setEmail(target.value);
                setError("");
              }}
            />

            <PasswordInput
              value={password}
              onChange={({ target }) => {
                setPassword(target.value);
                setError("");
              }}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <div className="flex flex-col items-center gap-4">
              <button 
                type="submit" 
                className="btn-primary transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg">
                LOGIN
              </button>

              <button
                type="button"
                className="btn-primary btn-light transition-transform duration-200 ease-in-out hover:-translate-y-2 hover:shadow-lg"
                onClick={() => navigate("/signup")}
              >
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;