import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ incidents: 0, reliefEfforts: 0 });
  const [recentIncidents, setRecentIncidents] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [incidentsRes, reliefRes] = await Promise.all([
        axios.get(`${API_URL}/incidents`),
        axios.get(`${API_URL}/relief`)
      ]);

      const userIncidents = incidentsRes.data.filter(
        i => i.reportedBy._id === user.id || i.reportedBy.id === user.id
      );

      setStats({
        incidents: userIncidents.length,
        reliefEfforts: reliefRes.data.length
      });
      setRecentIncidents(incidentsRes.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      reported: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-purple-100 text-purple-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-fadeInUp">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <span className="text-4xl mr-3">📊</span>
          Dashboard
        </h1>
      </div>
      
      {!user.isVerified && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded animate-slideInRight hover-lift">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <p className="font-bold">Account Pending Verification</p>
              <p>Your account is pending admin verification. You can still report incidents, but some features may be limited.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg hover-lift card-animate transform transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">📝</div>
            <div className="text-3xl font-bold">{stats.incidents}</div>
          </div>
          <div className="text-blue-100 font-semibold">My Reported Incidents</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg hover-lift card-animate transform transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">🚑</div>
            <div className="text-3xl font-bold">{stats.reliefEfforts}</div>
          </div>
          <div className="text-green-100 font-semibold">Active Relief Efforts</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg hover-lift card-animate transform transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">👤</div>
            <div className="text-xl font-bold capitalize">{user.role}</div>
          </div>
          <div className="text-purple-100 font-semibold">Your Role</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover-lift animate-fadeInUp">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="text-3xl mr-2">⚡</span>
            Quick Actions
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/report"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg text-center transform transition-all duration-300 hover-scale shadow-lg flex items-center justify-center"
          >
            <span className="text-2xl mr-2">📋</span>
            Report New Incident
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
            Relief Efforts
          </Link>
          {(user.role === 'authority' || user.role === 'admin') && (
            <Link
              to="/admin"
              className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-4 px-6 rounded-lg text-center transform transition-all duration-300 hover-scale shadow-lg flex items-center justify-center"
            >
              <span className="text-2xl mr-2">⚙️</span>
              Admin Panel
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 animate-fadeInUp">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="text-3xl mr-2">📋</span>
          Recent Incidents
        </h2>
        {recentIncidents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-600 text-lg">No incidents reported yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentIncidents.map((incident, index) => (
              <Link
                key={incident._id}
                to={`/incidents/${incident._id}`}
                className="block border-l-4 border-blue-500 p-4 hover:bg-gray-50 rounded transform transition-all duration-300 hover-lift card-animate"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">
                        {incident.emergencyType === 'flood' && '🌊'}
                        {incident.emergencyType === 'earthquake' && '🌍'}
                        {incident.emergencyType === 'fire' && '🔥'}
                        {incident.emergencyType === 'storm' && '⛈️'}
                        {incident.emergencyType === 'medical' && '🏥'}
                        {incident.emergencyType === 'other' && '⚠️'}
                      </span>
                      <h3 className="font-semibold text-lg">{incident.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{incident.description.substring(0, 100)}...</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>📍 {incident.location?.city || 'Unknown location'}</span>
                      <span>•</span>
                      <span>🕐 {new Date(incident.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(incident.status)} transform transition-all duration-300 hover-scale`}>
                    {incident.status.replace('_', ' ')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

