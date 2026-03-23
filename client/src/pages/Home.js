import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const emergencyTypes = [
    { name: 'Flood', icon: '🌊', color: 'from-blue-400 to-blue-600' },
    { name: 'Earthquake', icon: '🌍', color: 'from-orange-400 to-orange-600' },
    { name: 'Fire', icon: '🔥', color: 'from-red-400 to-red-600' },
    { name: 'Storm', icon: '⛈️', color: 'from-gray-400 to-gray-600' },
    { name: 'Medical', icon: '🏥', color: 'from-green-400 to-green-600' },
    { name: 'Other', icon: '⚠️', color: 'from-yellow-400 to-yellow-600' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Animated Background */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fadeInUp">
            <div className="text-6xl mb-6 animate-bounce-slow">🚨</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInUp">
              Community Disaster Management Portal
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Efficient coordination during emergencies. Report incidents, track relief efforts, and stay informed.
            </p>
            {!user && (
              <div className="space-x-4 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-block hover-lift transform transition-all duration-300 shadow-lg"
                >
                  Get Started →
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 inline-block hover-lift transform transition-all duration-300 shadow-lg"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section with Animations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 animate-fadeInUp">Key Features</h2>
        <p className="text-center text-gray-600 text-lg mb-12 animate-fadeInUp">Click on any feature to learn more</p>
        <div className="grid md:grid-cols-3 gap-8">
          <Link
            to="/feature/incident-reporting"
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg hover-lift card-animate group border-2 border-blue-200 transform transition-all duration-300 block"
          >
            <div className="text-7xl mb-4 transform group-hover:scale-110 transition-transform duration-300 text-center animate-bounce-slow">📋</div>
            <h3 className="text-2xl font-bold mb-3 text-center text-blue-700">Incident Reporting</h3>
            <p className="text-gray-700 text-center mb-4">
              Citizens can quickly report emergencies with location and type details for rapid response.
            </p>
            <div className="text-center text-blue-600 font-semibold group-hover:text-blue-800 transition-colors">
              Learn More →
            </div>
          </Link>
          <Link
            to="/feature/user-validation"
            className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg hover-lift card-animate group border-2 border-green-200 transform transition-all duration-300 block"
          >
            <div className="text-7xl mb-4 transform group-hover:scale-110 transition-transform duration-300 text-center animate-bounce-slow">👥</div>
            <h3 className="text-2xl font-bold mb-3 text-center text-green-700">User Validation</h3>
            <p className="text-gray-700 text-center mb-4">
              Administrators validate and verify key players to ensure platform security and reliability.
            </p>
            <div className="text-center text-green-600 font-semibold group-hover:text-green-800 transition-colors">
              Learn More →
            </div>
          </Link>
          <Link
            to="/feature/relief-tracking"
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl shadow-lg hover-lift card-animate group border-2 border-purple-200 transform transition-all duration-300 block"
          >
            <div className="text-7xl mb-4 transform group-hover:scale-110 transition-transform duration-300 text-center animate-bounce-slow">🚨</div>
            <h3 className="text-2xl font-bold mb-3 text-center text-purple-700">Relief Tracking</h3>
            <p className="text-gray-700 text-center mb-4">
              Track disaster relief efforts and access real-time updates based on location and emergency type.
            </p>
            <div className="text-center text-purple-600 font-semibold group-hover:text-purple-800 transition-colors">
              Learn More →
            </div>
          </Link>
        </div>
      </div>

      {/* Emergency Types with Gradient Cards */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fadeInUp">Supported Emergency Types</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {emergencyTypes.map((type, index) => (
              <Link
                key={type.name}
                to={`/emergency/${type.name.toLowerCase()}`}
                className={`bg-gradient-to-br ${type.color} p-6 rounded-lg shadow-lg text-white text-center hover-scale card-animate cursor-pointer transform transition-all duration-300 block`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-3 transform hover:scale-125 transition-transform duration-300 animate-bounce-slow">
                  {type.icon}
                </div>
                <div className="font-bold text-lg">{type.name}</div>
                <div className="text-sm mt-2 opacity-80">Click to learn more →</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Platform Statistics</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 hover-lift animate-fadeInUp">
              <div className="text-6xl mb-4 animate-bounce-slow">⚡</div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Available Support</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 hover-lift animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <div className="text-6xl mb-4 animate-bounce-slow">🌍</div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-lg opacity-90">Cities Covered</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 hover-lift animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="text-6xl mb-4 animate-bounce-slow">✅</div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Verified Users</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 hover-lift animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <div className="text-6xl mb-4 animate-bounce-slow">🚨</div>
              <div className="text-4xl font-bold mb-2">5K+</div>
              <div className="text-lg opacity-90">Incidents Resolved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 animate-fadeInUp">What People Say</h2>
          <p className="text-center text-gray-600 text-lg mb-12 animate-fadeInUp">Testimonials from our users</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Citizen',
                text: 'This platform saved my family during the flood. Quick response and excellent coordination!',
                icon: '👩',
                color: 'from-blue-400 to-blue-600'
              },
              {
                name: 'Michael Chen',
                role: 'Authority',
                text: 'Best disaster management system I\'ve used. Real-time tracking makes coordination seamless.',
                icon: '👨',
                color: 'from-green-400 to-green-600'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Citizen',
                text: 'Easy to use and very helpful. The relief tracking feature kept us informed throughout.',
                icon: '👩‍💼',
                color: 'from-purple-400 to-purple-600'
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${testimonial.color} text-white p-8 rounded-xl shadow-lg hover-lift card-animate`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-6xl mb-4 text-center">{testimonial.icon}</div>
                <p className="text-lg mb-6 italic text-center">"{testimonial.text}"</p>
                <div className="text-center">
                  <div className="font-bold text-xl">{testimonial.name}</div>
                  <div className="text-sm opacity-80">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 animate-fadeInUp">How It Works</h2>
          <p className="text-center text-gray-600 text-lg mb-12 animate-fadeInUp">Simple steps to get started</p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Register', desc: 'Create your account as citizen or authority', icon: '📝' },
              { step: 2, title: 'Get Verified', desc: 'Admin verifies your account for security', icon: '✅' },
              { step: 3, title: 'Report/Manage', desc: 'Report incidents or manage relief efforts', icon: '🚨' },
              { step: 4, title: 'Stay Updated', desc: 'Track progress and get real-time updates', icon: '📊' }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover-lift card-animate text-center relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 z-0"></div>
                )}
                <div className="relative z-10">
                  <div className="text-6xl mb-4 animate-bounce-slow">{item.icon}</div>
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 animate-fadeInUp">Frequently Asked Questions</h2>
          <p className="text-center text-gray-600 text-lg mb-12 animate-fadeInUp">Get answers to common questions</p>
          <div className="space-y-6">
            {[
              {
                q: 'How do I report an emergency?',
                a: 'Simply click on "Report Incident" after logging in, fill out the form with details, location, and emergency type, then submit. Our system will automatically route it to the appropriate authorities.'
              },
              {
                q: 'How long does verification take?',
                a: 'Account verification typically takes 24-48 hours. Administrators review each registration to ensure platform security and reliability.'
              },
              {
                q: 'Can I track my reported incident?',
                a: 'Yes! Once you report an incident, you can view its status in real-time on your dashboard and receive updates as authorities respond.'
              },
              {
                q: 'Who can use this platform?',
                a: 'Citizens can report incidents, authorities can manage relief efforts, and administrators oversee the entire system. All users must be verified.'
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-md hover-lift card-animate border-l-4 border-blue-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <span className="text-2xl mr-3">❓</span>
                  {faq.q}
                </h3>
                <p className="text-gray-700 ml-10">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -ml-48 -mt-48 animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-48 -mb-48 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-7xl mb-6 animate-bounce-slow">🚀</div>
          <h2 className="text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community and help make emergency response faster and more efficient
          </p>
          {!user ? (
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="bg-white text-gray-800 px-10 py-4 rounded-xl font-bold text-lg transform transition-all duration-300 hover-scale shadow-2xl"
              >
                Get Started Now →
              </Link>
              <Link
                to="/login"
                className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-bold text-lg transform transition-all duration-300 hover-scale border-2 border-white"
              >
                Login
              </Link>
            </div>
          ) : (
            <Link
              to="/dashboard"
              className="bg-white text-gray-800 px-10 py-4 rounded-xl font-bold text-lg transform transition-all duration-300 hover-scale shadow-2xl inline-block"
            >
              Go to Dashboard →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

