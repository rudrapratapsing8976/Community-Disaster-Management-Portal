import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    emergencyType: '',
    status: '',
    location: ''
  });

  useEffect(() => {
    fetchIncidents();
  }, [filters]);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.emergencyType) params.append('emergencyType', filters.emergencyType);
      if (filters.status) params.append('status', filters.status);
      if (filters.location) params.append('location', filters.location);

      const response = await axios.get(`${API_URL}/incidents?${params.toString()}`);
      setIncidents(response.data);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    } finally {
      setLoading(false);
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

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6 animate-fadeInUp">
        <h1 className="text-3xl font-bold flex items-center">
          <span className="text-4xl mr-3">📰</span>
          All Incidents
        </h1>
        <Link
          to="/report"
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transform transition-all duration-300 hover-scale shadow-lg flex items-center"
        >
          <span className="text-xl mr-2">➕</span>
          Report New Incident
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 animate-fadeInUp hover-lift">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Type
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={filters.emergencyType}
              onChange={(e) => setFilters({ ...filters, emergencyType: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="flood">Flood</option>
              <option value="earthquake">Earthquake</option>
              <option value="fire">Fire</option>
              <option value="storm">Storm</option>
              <option value="medical">Medical</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Statuses</option>
              <option value="reported">Reported</option>
              <option value="under_review">Under Review</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="City name"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({ emergencyType: '', status: '', location: '' })}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Incidents List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⏳</div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading incidents...</p>
        </div>
      ) : incidents.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center animate-fadeInUp">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-600 text-lg">No incidents found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {incidents.map((incident, index) => (
            <Link
              key={incident._id}
              to={`/incidents/${incident._id}`}
              className="block bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 hover-lift card-animate transform"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-3xl">
                      {incident.emergencyType === 'flood' && '🌊'}
                      {incident.emergencyType === 'earthquake' && '🌍'}
                      {incident.emergencyType === 'fire' && '🔥'}
                      {incident.emergencyType === 'storm' && '⛈️'}
                      {incident.emergencyType === 'medical' && '🏥'}
                      {incident.emergencyType === 'other' && '⚠️'}
                    </span>
                    <h3 className="text-xl font-semibold">{incident.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(incident.severity)} transform transition-all duration-300 hover-scale`}>
                      {incident.severity}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{incident.description.substring(0, 150)}...</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">📍 {incident.location?.city || 'Unknown location'}</span>
                    <span className="flex items-center">🚨 {incident.emergencyType}</span>
                    <span className="flex items-center">👤 {incident.reportedBy?.name || 'Unknown'}</span>
                    <span className="flex items-center">📅 {new Date(incident.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(incident.status)} transform transition-all duration-300 hover-scale`}>
                  {incident.status.replace('_', ' ')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Incidents;

