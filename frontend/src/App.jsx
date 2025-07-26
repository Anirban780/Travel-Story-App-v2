import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/Signup';
import Home from './pages/Home';
import Loader from './components/Loader';

const App = () => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        <Route path="/dashboard" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;