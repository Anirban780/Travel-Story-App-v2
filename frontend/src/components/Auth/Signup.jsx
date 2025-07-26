import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate, Link } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import bgImage from "../../assets/Images/signup-bg-img.png";

// Simple email validation function
const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update user profile with name
      await updateProfile(userCredential.user, { displayName: name });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  
  return (
    <div className="h-screen bg-cyan-50 overflow-hidden relative">
      <div className="login-ui-box right-10 -top-40" />
      <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2" />

      <div className="container h-screen flex items-center justify-center px-20 mx-auto">
        <div
          style={{ backgroundImage: `url(${bgImage})` }}
          className="w-[40%] h-[90vh] flex items-end bg-cover bg-center rounded-lg p-10 z-50"
        >
          <div>
            <h4 className="text-5xl text-white font-semibold leading-[58px]">
              Join the <br /> Adventure
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
              Create an account to start documenting your travels and preserving
              your memories in your personal travel journal
            </p>
          </div>
        </div>

        <div className="w-[40%] h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl font-bold mb-7">Sign Up</h4>

            <input
              type="text"
              placeholder="Full Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

           <div className="flex flex-col items-center gap-4">
              <button 
                type="submit" 
                className="btn-primary transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg">
                SIGN UP
              </button>

              <button
                type="button"
                className="btn-primary btn-light transition-transform duration-200 ease-in-out hover:-translate-y-2 hover:shadow-lg"
                onClick={() => navigate("/login")}
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;