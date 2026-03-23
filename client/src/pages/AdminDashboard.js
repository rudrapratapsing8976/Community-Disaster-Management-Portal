import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/dashboard`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-6xl mb-4 animate-bounce-slow">⚙️</div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Users', value: stats?.users?.total || 0, icon: '👥', color: 'from-blue-500 to-blue-600', delay: '0.1s' },
    { label: 'Verified Users', value: stats?.users?.verified || 0, icon: '✅', color: 'from-green-500 to-green-600', delay: '0.2s' },
    { label: 'Pending Verification', value: stats?.users?.pending || 0, icon: '⏳', color: 'from-yellow-500 to-yellow-600', delay: '0.3s' },
    { label: 'Total Incidents', value: stats?.incidents?.total || 0, icon: '📋', color: 'from-purple-500 to-purple-600', delay: '0.4s' },
    { label: 'Active Incidents', value: stats?.incidents?.active || 0, icon: '🚨', color: 'from-orange-500 to-orange-600', delay: '0.5s' },
    { label: 'Resolved Incidents', value: stats?.incidents?.resolved || 0, icon: '✅', color: 'from-green-500 to-green-600', delay: '0.6s' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-fadeInUp mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <span className="text-4xl mr-3 animate-bounce-slow">⚙️</span>
          Admin Dashboard
        </h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${card.color} text-white p-6 rounded-lg shadow-lg hover-lift card-animate transform transition-all duration-300`}
            style={{ animationDelay: card.delay }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl">{card.icon}</div>
              <div className="text-4xl font-bold">{card.value}</div>
            </div>
            <div className="text-white opacity-90 font-semibold">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 hover-lift animate-fadeInUp">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="text-3xl mr-2">⚡</span>
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to="/admin/users"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg text-center transform transition-all duration-300 hover-scale shadow-lg flex items-center justify-center"
          >
            <span className="text-2xl mr-2">👥</span>
            Manage Users
          </Link>
          <Link
            to="/incidents"
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-6 rounded-lg text-center transform transition-all duration-300 hover-scale shadow-lg flex items-center justify-center"
          >
            <span className="text-2xl mr-2">📰</span>
            View All Incidents
          </Link>
          <Link
            to="/relief"
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 px-6 rounded-lg text-center transform transition-all duration-300 hover-scale shadow-lg flex items-center justify-center"
          >
            <span className="text-2xl mr-2">🚨</span>
            Manage Relief Efforts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

