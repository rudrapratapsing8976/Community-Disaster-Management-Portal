import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReportIncident from './pages/ReportIncident';
import Incidents from './pages/Incidents';
import IncidentDetail from './pages/IncidentDetail';
import ReliefEfforts from './pages/ReliefEfforts';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import EmergencyTypeDetail from './pages/EmergencyTypeDetail';
import FeatureDetail from './pages/FeatureDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/report"
              element={
                <PrivateRoute>
                  <ReportIncident />
                </PrivateRoute>
              }
            />
            <Route
              path="/incidents"
              element={
                <PrivateRoute>
                  <Incidents />
                </PrivateRoute>
              }
            />
            <Route
              path="/incidents/:id"
              element={
                <PrivateRoute>
                  <IncidentDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/relief"
              element={
                <PrivateRoute>
                  <ReliefEfforts />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute adminOnly>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <PrivateRoute adminOnly>
                  <AdminUsers />
                </PrivateRoute>
              }
            />
            <Route
              path="/emergency/:type"
              element={<EmergencyTypeDetail />}
            />
            <Route
              path="/feature/:feature"
              element={<FeatureDetail />}
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

