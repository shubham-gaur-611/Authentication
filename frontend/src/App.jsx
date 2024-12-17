
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useState, useEffect } from 'react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/") {
        navigate("/home");
      }
    }
    else {
      setIsAuthenticated(false);
    }
  }, [location, navigate, setIsAuthenticated  ]);
  const PrivateRoute = ({element}) => {
  return isAuthenticated ? element : <Navigate to="/login" />
  }
  
  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </>
  )
}

export default App
