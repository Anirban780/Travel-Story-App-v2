import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/Signup';
import Home from './pages/Home';
import Loader from './components/Loader';
import Profile from './pages/Profile';
import TravelLandingPage from './pages/LandingPage';
import { ToastContainer } from "react-toastify";

const App = () => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TravelLandingPage />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/dashboard" />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>

  );
};

export default App;