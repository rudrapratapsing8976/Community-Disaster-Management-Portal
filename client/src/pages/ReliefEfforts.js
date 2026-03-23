import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ReliefEfforts = () => {
  const { user } = useAuth();
  const [reliefEfforts, setReliefEfforts] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    emergencyType: '',
    location: '',
    status: ''
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    incidentId: '',
    title: '',
    description: '',
    status: 'planned',
    location: {
      address: '',
      city: '',
      state: ''
    }
  });

  useEffect(() => {
    fetchReliefEfforts();
    fetchIncidents();
  }, [filters]);

  const fetchReliefEfforts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.emergencyType) params.append('emergencyType', filters.emergencyType);
      if (filters.location) params.append('location', filters.location);
      if (filters.status) params.append('status', filters.status);

      const response = await axios.get(`${API_URL}/relief?${params.toString()}`);
      setReliefEfforts(response.data);
    } catch (error) {
      console.error('Error fetching relief efforts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIncidents = async () => {
    try {
      const response = await axios.get(`${API_URL}/incidents`);
      setIncidents(response.data);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/relief`, formData);
      setShowCreateForm(false);
      setFormData({
        incidentId: '',
        title: '',
        description: '',
        status: 'planned',
        location: { address: '', city: '', state: '' }
      });
      fetchReliefEfforts();
    } catch (error) {
      console.error('Error creating relief effort:', error);
      alert('Failed to create relief effort');
    }
  };

  const canCreateRelief = user.role === 'admin' || user.role === 'authority';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Relief Efforts</h1>
        {canCreateRelief && (
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            {showCreateForm ? 'Cancel' : 'Create Relief Effort'}
          </button>
        )}
      </div>

      {showCreateForm && canCreateRelief && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Create New Relief Effort</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Related Incident *
              </label>
              <select
                required
                className="w-full border rounded px-3 py-2"
                value={formData.incidentId}
                onChange={(e) => setFormData({ ...formData, incidentId: e.target.value })}
              >
                <option value="">Select an incident</option>
                {incidents.map((incident) => (
                  <option key={incident._id} value={incident._id}>
                    {incident.title} - {incident.emergencyType}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                required
                className="w-full border rounded px-3 py-2"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                required
                rows="4"
                className="w-full border rounded px-3 py-2"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={formData.location.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, city: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="planned">Planned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            >
              Create Relief Effort
            </button>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
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
              <option value="planned">Planned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({ emergencyType: '', location: '', status: '' })}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Relief Efforts List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : reliefEfforts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg">No relief efforts found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reliefEfforts.map((effort) => (
            <div key={effort._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{effort.title}</h3>
                  <p className="text-gray-600 mb-3">{effort.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>📍 {effort.location?.city || effort.incidentId?.location?.city || 'Unknown'}</span>
                    <span>🚨 {effort.incidentId?.emergencyType || 'N/A'}</span>
                    <span>👤 {effort.managedBy?.name || 'Unknown'}</span>
                    <span>📅 {new Date(effort.createdAt).toLocaleDateString()}</span>
                  </div>
                  {effort.incidentId && (
                    <Link
                      to={`/incidents/${effort.incidentId._id || effort.incidentId}`}
                      className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                    >
                      View Related Incident →
                    </Link>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  effort.status === 'completed' ? 'bg-green-100 text-green-800' :
                  effort.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {effort.status.replace('_', ' ')}
                </span>
              </div>
              {effort.updates && effort.updates.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold mb-2">Recent Updates:</h4>
                  {effort.updates.slice(-3).map((update, idx) => (
                    <div key={idx} className="text-sm text-gray-600 mb-2 pl-4 border-l-2 border-gray-300">
                      {update.message} - {new Date(update.timestamp).toLocaleString()}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReliefEfforts;

