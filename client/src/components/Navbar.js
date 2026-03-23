import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold flex items-center hover-scale transform transition-all duration-300">
              <span className="text-2xl mr-2 animate-bounce-slow">🚨</span>
              Disaster Management Portal
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-200 px-3 py-2 rounded-md transition-all duration-300 hover:bg-blue-700 transform hover:scale-105">
                  📊 Dashboard
                </Link>
                <Link to="/report" className="hover:text-blue-200 px-3 py-2 rounded-md transition-all duration-300 hover:bg-blue-700 transform hover:scale-105">
                  📋 Report
                </Link>
                <Link to="/incidents" className="hover:text-blue-200 px-3 py-2 rounded-md transition-all duration-300 hover:bg-blue-700 transform hover:scale-105">
                  📰 Incidents
                </Link>
                <Link to="/relief" className="hover:text-blue-200 px-3 py-2 rounded-md transition-all duration-300 hover:bg-blue-700 transform hover:scale-105">
                  🚨 Relief
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-blue-200 px-3 py-2 rounded-md transition-all duration-300 hover:bg-blue-700 transform hover:scale-105">
                    ⚙️ Admin
                  </Link>
                )}
                <span className="px-3 py-2 flex items-center">
                  <span className="mr-2">👤</span>
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transform transition-all duration-300 hover-scale shadow-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 px-3 py-2 rounded-md transition-all duration-300 hover:bg-blue-700 transform hover:scale-105">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transform transition-all duration-300 hover-scale shadow-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

