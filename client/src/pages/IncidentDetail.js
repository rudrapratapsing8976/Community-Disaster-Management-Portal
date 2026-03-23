import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const IncidentDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [reliefEfforts, setReliefEfforts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchIncident();
    fetchReliefEfforts();
  }, [id]);

  const fetchIncident = async () => {
    try {
      const response = await axios.get(`${API_URL}/incidents/${id}`);
      setIncident(response.data);
    } catch (error) {
      console.error('Error fetching incident:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReliefEfforts = async () => {
    try {
      const response = await axios.get(`${API_URL}/relief?incidentId=${id}`);
      setReliefEfforts(response.data);
    } catch (error) {
      console.error('Error fetching relief efforts:', error);
    }
  };

  const updateStatus = async (newStatus) => {
    if (!['admin', 'authority'].includes(user.role)) return;
    
    setUpdating(true);
    try {
      await axios.put(`${API_URL}/incidents/${id}`, { status: newStatus });
      fetchIncident();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdating(false);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-600">Incident not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/incidents')}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Back to Incidents
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{incident.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Reported by: {incident.reportedBy?.name || 'Unknown'}</span>
              <span>•</span>
              <span>{new Date(incident.createdAt).toLocaleString()}</span>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(incident.status)}`}>
            {incident.status.replace('_', ' ')}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Emergency Type</h3>
            <p className="text-gray-900 capitalize">{incident.emergencyType}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Severity</h3>
            <p className="text-gray-900 capitalize">{incident.severity}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Location</h3>
            <p className="text-gray-900">
              {incident.location?.address && `${incident.location.address}, `}
              {incident.location?.city && `${incident.location.city}, `}
              {incident.location?.state && `${incident.location.state} `}
              {incident.location?.zipCode && incident.location.zipCode}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Contact</h3>
            <p className="text-gray-900">
              {incident.contactInfo?.phone && `Phone: ${incident.contactInfo.phone}`}
              {incident.contactInfo?.email && ` | Email: ${incident.contactInfo.email}`}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
          <p className="text-gray-900 whitespace-pre-wrap">{incident.description}</p>
        </div>

        {(user.role === 'admin' || user.role === 'authority') && (
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-700 mb-2">Update Status</h3>
            <div className="flex space-x-2">
              {['reported', 'under_review', 'in_progress', 'resolved', 'closed'].map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(status)}
                  disabled={updating || incident.status === status}
                  className={`px-4 py-2 rounded ${
                    incident.status === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  } disabled:opacity-50`}
                >
                  {status.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Relief Efforts</h2>
        {reliefEfforts.length === 0 ? (
          <p className="text-gray-600">No relief efforts yet.</p>
        ) : (
          <div className="space-y-4">
            {reliefEfforts.map((effort) => (
              <div key={effort._id} className="border-l-4 border-green-500 p-4 bg-gray-50 rounded">
                <h3 className="font-semibold text-lg mb-2">{effort.title}</h3>
                <p className="text-gray-700 mb-2">{effort.description}</p>
                <div className="text-sm text-gray-600">
                  <span>Status: {effort.status}</span>
                  <span className="ml-4">Managed by: {effort.managedBy?.name}</span>
                </div>
                {effort.updates && effort.updates.length > 0 && (
                  <div className="mt-3">
                    <h4 className="font-semibold text-sm mb-2">Updates:</h4>
                    {effort.updates.map((update, idx) => (
                      <div key={idx} className="text-sm text-gray-600 mb-1 pl-4 border-l-2 border-gray-300">
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
    </div>
  );
};

export default IncidentDetail;

