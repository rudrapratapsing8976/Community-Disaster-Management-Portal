import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FeatureDetail = () => {
  const { feature } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [feature]);

  const featureData = {
    'incident-reporting': {
      icon: '📋',
      title: 'Incident Reporting System',
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      character: '📋🚨',
      description: 'Our comprehensive incident reporting system allows citizens to quickly and efficiently report emergencies with detailed information.',
      features: [
        'Quick and easy reporting form',
        'Location-based incident tracking',
        'Multiple emergency type support',
        'Real-time status updates',
        'Photo and document uploads',
        'Priority-based incident handling'
      ],
      benefits: [
        'Faster emergency response times',
        'Better coordination between agencies',
        'Improved resource allocation',
        'Enhanced public safety',
        'Data-driven decision making',
        'Transparent incident tracking'
      ],
      howItWorks: [
        {
          step: 1,
          title: 'Report Incident',
          description: 'Fill out our user-friendly form with incident details, location, and emergency type.',
          icon: '📝'
        },
        {
          step: 2,
          title: 'Automatic Processing',
          description: 'System automatically categorizes and prioritizes your report based on severity.',
          icon: '⚙️'
        },
        {
          step: 3,
          title: 'Authority Assignment',
          description: 'Relevant authorities are notified and assigned to handle the incident.',
          icon: '👮'
        },
        {
          step: 4,
          title: 'Real-time Updates',
          description: 'Track the status of your reported incident in real-time.',
          icon: '📊'
        }
      ],
      stats: [
        { label: 'Reports Processed', value: '10K+', icon: '📈' },
        { label: 'Response Time', value: '< 5 min', icon: '⚡' },
        { label: 'Success Rate', value: '98%', icon: '✅' },
        { label: 'Active Users', value: '5K+', icon: '👥' }
      ]
    },
    'user-validation': {
      icon: '👥',
      title: 'User Validation System',
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-50',
      character: '👥✅',
      description: 'Secure and efficient user validation ensures only verified citizens and authorities can access and use the platform.',
      features: [
        'Multi-level user verification',
        'Admin approval system',
        'Role-based access control',
        'Secure authentication',
        'Profile verification',
        'Activity monitoring'
      ],
      benefits: [
        'Enhanced platform security',
        'Prevented unauthorized access',
        'Trusted user base',
        'Reduced false reports',
        'Better accountability',
        'Improved data quality'
      ],
      howItWorks: [
        {
          step: 1,
          title: 'User Registration',
          description: 'Citizens and authorities register with their details and role.',
          icon: '📝'
        },
        {
          step: 2,
          title: 'Admin Review',
          description: 'Administrators review and verify user information.',
          icon: '👨‍💼'
        },
        {
          step: 3,
          title: 'Verification',
          description: 'Users receive verification status and access permissions.',
          icon: '✅'
        },
        {
          step: 4,
          title: 'Platform Access',
          description: 'Verified users can now access all platform features.',
          icon: '🚀'
        }
      ],
      stats: [
        { label: 'Verified Users', value: '8K+', icon: '✅' },
        { label: 'Verification Rate', value: '95%', icon: '📊' },
        { label: 'Average Time', value: '24 hrs', icon: '⏱️' },
        { label: 'Security Level', value: 'High', icon: '🔒' }
      ]
    },
    'relief-tracking': {
      icon: '🚨',
      title: 'Disaster Relief Tracking',
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50',
      character: '🚨🚑',
      description: 'Comprehensive relief effort tracking system that monitors and coordinates disaster response activities in real-time.',
      features: [
        'Real-time relief effort tracking',
        'Resource allocation monitoring',
        'Multi-agency coordination',
        'Progress updates and notifications',
        'Location-based relief mapping',
        'Impact assessment tools'
      ],
      benefits: [
        'Faster disaster response',
        'Better resource utilization',
        'Improved coordination',
        'Transparent relief operations',
        'Data-driven decisions',
        'Enhanced public trust'
      ],
      howItWorks: [
        {
          step: 1,
          title: 'Relief Initiation',
          description: 'Authorities create relief efforts for specific incidents.',
          icon: '🚀'
        },
        {
          step: 2,
          title: 'Resource Allocation',
          description: 'Resources, personnel, and equipment are assigned.',
          icon: '📦'
        },
        {
          step: 3,
          title: 'Progress Tracking',
          description: 'Real-time updates on relief effort progress.',
          icon: '📊'
        },
        {
          step: 4,
          title: 'Completion & Review',
          description: 'Relief efforts are completed and reviewed for effectiveness.',
          icon: '✅'
        }
      ],
      stats: [
        { label: 'Relief Efforts', value: '2K+', icon: '🚨' },
        { label: 'People Helped', value: '50K+', icon: '👥' },
        { label: 'Success Rate', value: '96%', icon: '✅' },
        { label: 'Avg Response', value: '2 hrs', icon: '⚡' }
      ]
    }
  };

  const data = featureData[feature] || featureData['incident-reporting'];

  return (
    <div className={`min-h-screen ${data.bgColor} transition-all duration-500 relative`}>
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${data.color} text-white py-20 relative overflow-hidden`}>
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white opacity-10 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white opacity-5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="absolute left-4 top-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transform transition-all duration-300 hover-scale flex items-center"
          >
            <span className="mr-2">←</span> Back to Home
          </button>
          
          <div className={`text-center mt-12 ${isVisible ? 'animate-fadeInUp' : ''}`}>
            <div className="text-9xl mb-6 animate-bounce-slow inline-block">{data.icon}</div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">{data.title}</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto mb-8">{data.description}</p>
            
            {/* Quick Actions */}
            <div className="flex justify-center space-x-4 mt-8">
              {!user && (
                <Link
                  to="/register"
                  className="bg-white text-gray-800 px-8 py-4 rounded-xl font-bold text-lg transform transition-all duration-300 hover-scale shadow-2xl"
                >
                  Get Started →
                </Link>
              )}
              {user && (
                <Link
                  to="/dashboard"
                  className="bg-white text-gray-800 px-8 py-4 rounded-xl font-bold text-lg transform transition-all duration-300 hover-scale shadow-2xl"
                >
                  Go to Dashboard →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Character Section */}
        <div className={`bg-white rounded-2xl shadow-2xl p-12 mb-12 hover-lift animate-fadeInUp ${isVisible ? '' : 'opacity-0'}`}>
          <div className="text-center">
            <div className="text-9xl mb-6 animate-float inline-block transform hover:scale-110 transition-transform duration-300 cursor-pointer">
              {data.character}
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to {data.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our platform helps communities stay safe and coordinated during emergencies
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`grid md:grid-cols-4 gap-6 mb-12 animate-fadeInUp ${isVisible ? '' : 'opacity-0'}`}>
          {data.stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg p-6 text-center hover-lift card-animate border-t-4`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                borderTopColor: index === 0 ? '#3B82F6' : index === 1 ? '#10B981' : index === 2 ? '#8B5CF6' : '#F59E0B'
              }}
            >
              <div className="text-5xl mb-3 animate-bounce-slow">{stat.icon}</div>
              <div className="text-4xl font-bold mb-2" style={{ 
                color: index === 0 ? '#3B82F6' : index === 1 ? '#10B981' : index === 2 ? '#8B5CF6' : '#F59E0B'
              }}>
                {stat.value}
              </div>
              <div className="text-gray-600 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className={`bg-white rounded-2xl shadow-2xl p-10 mb-12 hover-lift animate-fadeInUp ${isVisible ? '' : 'opacity-0'}`}>
          <h3 className="text-4xl font-bold mb-8 text-center flex items-center justify-center">
            <span className="text-5xl mr-4">✨</span>
            Key Features
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-l-4 border-blue-500 hover-lift transform transition-all duration-300 group"
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4 group-hover:scale-125 transition-transform duration-300">
                    ✓
                  </span>
                  <span className="text-lg text-gray-700 group-hover:text-blue-600 transition-colors font-semibold">
                    {feature}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className={`bg-gradient-to-br ${data.color} rounded-2xl shadow-2xl p-10 mb-12 text-white hover-lift animate-fadeInUp ${isVisible ? '' : 'opacity-0'}`}>
          <h3 className="text-4xl font-bold mb-8 text-center flex items-center justify-center">
            <span className="text-5xl mr-4">🎯</span>
            Benefits
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-xl hover-lift transform transition-all duration-300 group border border-white border-opacity-30"
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4 group-hover:scale-125 transition-transform duration-300">
                    🎁
                  </span>
                  <span className="text-lg font-semibold group-hover:text-yellow-200 transition-colors">
                    {benefit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className={`bg-white rounded-2xl shadow-2xl p-10 mb-12 hover-lift animate-fadeInUp ${isVisible ? '' : 'opacity-0'}`}>
          <h3 className="text-4xl font-bold mb-10 text-center flex items-center justify-center">
            <span className="text-5xl mr-4">🔄</span>
            How It Works
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.howItWorks.map((step, index) => (
              <div
                key={index}
                className="relative text-center group"
              >
                {/* Connection Line */}
                {index < data.howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform translate-x-1/2 z-0"></div>
                )}
                
                <div className="relative z-10 bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl hover-lift transform transition-all duration-300 group-hover:scale-105 border-2 border-blue-200">
                  <div className="text-6xl mb-4 animate-bounce-slow">{step.icon}</div>
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                    {step.step}
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`bg-gradient-to-r ${data.color} rounded-2xl shadow-2xl p-12 text-white text-center hover-lift animate-fadeInUp ${isVisible ? '' : 'opacity-0'}`}>
          <div className="text-7xl mb-6 animate-bounce-slow">🚀</div>
          <h3 className="text-4xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who trust our platform for emergency management and coordination
          </p>
          <div className="flex justify-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="bg-white text-gray-800 px-10 py-4 rounded-xl font-bold text-lg transform transition-all duration-300 hover-scale shadow-2xl"
                >
                  Create Account →
                </Link>
                <Link
                  to="/login"
                  className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-bold text-lg transform transition-all duration-300 hover-scale border-2 border-white"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="bg-white text-gray-800 px-10 py-4 rounded-xl font-bold text-lg transform transition-all duration-300 hover-scale shadow-2xl"
                >
                  Go to Dashboard →
                </Link>
                {feature === 'incident-reporting' && (
                  <Link
                    to="/report"
                    className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-bold text-lg transform transition-all duration-300 hover-scale border-2 border-white"
                  >
                    Report Incident
                  </Link>
                )}
                {feature === 'relief-tracking' && (
                  <Link
                    to="/relief"
                    className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-bold text-lg transform transition-all duration-300 hover-scale border-2 border-white"
                  >
                    View Relief Efforts
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureDetail;

