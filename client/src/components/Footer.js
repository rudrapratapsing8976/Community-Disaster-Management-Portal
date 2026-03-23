import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">🚨</span>
              Disaster Portal
            </h3>
            <p className="text-gray-400 mb-4">
              Community-driven disaster management and reporting platform for efficient emergency coordination.
            </p>
            <div className="flex space-x-4">
              <div className="bg-gray-800 p-3 rounded-lg hover-lift cursor-pointer transform transition-all duration-300">
                <span className="text-2xl">📘</span>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg hover-lift cursor-pointer transform transition-all duration-300">
                <span className="text-2xl">🐦</span>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg hover-lift cursor-pointer transform transition-all duration-300">
                <span className="text-2xl">📷</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/incidents" className="text-gray-400 hover:text-white transition-colors">
                  Incidents
                </Link>
              </li>
              <li>
                <Link to="/relief" className="text-gray-400 hover:text-white transition-colors">
                  Relief Efforts
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-bold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/feature/incident-reporting" className="text-gray-400 hover:text-white transition-colors">
                  Incident Reporting
                </Link>
              </li>
              <li>
                <Link to="/feature/user-validation" className="text-gray-400 hover:text-white transition-colors">
                  User Validation
                </Link>
              </li>
              <li>
                <Link to="/feature/relief-tracking" className="text-gray-400 hover:text-white transition-colors">
                  Relief Tracking
                </Link>
              </li>
              <li>
                <Link to="/emergency/flood" className="text-gray-400 hover:text-white transition-colors">
                  Emergency Types
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                support@disasterportal.com
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                1-800-EMERGENCY
              </li>
              <li className="flex items-center">
                <span className="mr-2">🚨</span>
                911 (Emergency)
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Disaster Management Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

