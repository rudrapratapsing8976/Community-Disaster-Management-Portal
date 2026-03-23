import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EmergencyTypeDetail = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [type]);

  const emergencyData = {
    flood: {
      icon: '🌊',
      title: 'Flood Emergency',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      character: '🌊💧',
      images: ['🌊', '💧', '🌧️', '🏊'],
      description: 'Floods are one of the most common natural disasters. They can occur suddenly and cause significant damage.',
      safetyTips: [
        'Move to higher ground immediately',
        'Avoid walking or driving through floodwaters',
        'Stay away from electrical equipment',
        'Listen to local news for updates',
        'Have an emergency kit ready'
      ],
      reportingSteps: [
        'Assess your safety first',
        'Move to a safe location',
        'Report the flood location accurately',
        'Include water level information',
        'Mention any trapped individuals'
      ],
      prevention: [
        'Know your flood risk',
        'Keep gutters and drains clear',
        'Install flood barriers',
        'Have sandbags ready',
        'Elevate electrical systems'
      ]
    },
    earthquake: {
      icon: '🌍',
      title: 'Earthquake Emergency',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      character: '🌍💥',
      images: ['🌍', '💥', '🏚️', '⚠️'],
      description: 'Earthquakes can strike without warning. Knowing how to respond can save lives.',
      safetyTips: [
        'Drop, Cover, and Hold On',
        'Stay away from windows and heavy objects',
        'If outdoors, move to an open area',
        'Avoid elevators during aftershocks',
        'Check for gas leaks after shaking stops'
      ],
      reportingSteps: [
        'Ensure you are in a safe location',
        'Report the intensity and duration',
        'Include location and any damage',
        'Mention any injuries or trapped people',
        'Report aftershocks if significant'
      ],
      prevention: [
        'Secure heavy furniture to walls',
        'Install flexible gas connections',
        'Keep emergency supplies ready',
        'Practice earthquake drills',
        'Know safe spots in each room'
      ]
    },
    fire: {
      icon: '🔥',
      title: 'Fire Emergency',
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-red-50',
      character: '🔥🚒',
      images: ['🔥', '🚒', '💨', '🏠'],
      description: 'Fires can spread rapidly. Quick action and proper reporting are crucial.',
      safetyTips: [
        'Evacuate immediately if safe to do so',
        'Stay low to avoid smoke',
        'Feel doors before opening',
        'Never use elevators during a fire',
        'Call emergency services immediately'
      ],
      reportingSteps: [
        'Report location immediately',
        'Describe the size and spread',
        'Mention any trapped individuals',
        'Note any hazardous materials nearby',
        'Provide access routes for responders'
      ],
      prevention: [
        'Install smoke detectors',
        'Keep fire extinguishers accessible',
        'Never leave cooking unattended',
        'Check electrical wiring regularly',
        'Have an evacuation plan'
      ]
    },
    storm: {
      icon: '⛈️',
      title: 'Storm Emergency',
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-50',
      character: '⛈️🌪️',
      images: ['⛈️', '🌪️', '💨', '🌩️'],
      description: 'Severe storms can bring high winds, heavy rain, and dangerous conditions.',
      safetyTips: [
        'Stay indoors during severe storms',
        'Avoid windows and glass doors',
        'Stay away from electrical equipment',
        'Do not drive through flooded areas',
        'Monitor weather updates'
      ],
      reportingSteps: [
        'Report storm intensity and type',
        'Include location and damage',
        'Mention downed power lines',
        'Report flooding or blocked roads',
        'Note any structural damage'
      ],
      prevention: [
        'Secure outdoor furniture',
        'Trim trees near structures',
        'Have emergency supplies ready',
        'Monitor weather forecasts',
        'Know your evacuation route'
      ]
    },
    medical: {
      icon: '🏥',
      title: 'Medical Emergency',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      character: '🏥🚑',
      images: ['🏥', '🚑', '💊', '⚕️'],
      description: 'Medical emergencies require immediate attention. Quick reporting saves lives.',
      safetyTips: [
        'Stay calm and assess the situation',
        'Do not move injured person unless necessary',
        'Apply basic first aid if trained',
        'Keep the person comfortable',
        'Wait for professional medical help'
      ],
      reportingSteps: [
        'Report exact location',
        'Describe the medical condition',
        'Mention number of people affected',
        'Provide access information',
        'Stay on scene if safe'
      ],
      prevention: [
        'Learn basic first aid',
        'Keep first aid kit accessible',
        'Know emergency numbers',
        'Maintain regular health checkups',
        'Have medical information ready'
      ]
    },
    other: {
      icon: '⚠️',
      title: 'Other Emergency',
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50',
      character: '⚠️🚨',
      images: ['⚠️', '🚨', '📢', '🔔'],
      description: 'Various emergencies that don\'t fit other categories. Report any dangerous situation.',
      safetyTips: [
        'Assess the situation carefully',
        'Ensure your own safety first',
        'Move to a safe location',
        'Follow emergency protocols',
        'Stay informed and alert'
      ],
      reportingSteps: [
        'Describe the emergency type',
        'Provide accurate location',
        'Include any relevant details',
        'Mention any immediate dangers',
        'Follow up if situation changes'
      ],
      prevention: [
        'Stay aware of surroundings',
        'Report suspicious activities',
        'Follow safety guidelines',
        'Have emergency contacts ready',
        'Participate in safety training'
      ]
    }
  };

  const data = emergencyData[type] || emergencyData.other;

  return (
    <div className={`min-h-screen ${data.bgColor} transition-all duration-500 relative`}>
      {/* Floating Action Button */}
      <Link
        to="/report"
        className={`fixed bottom-8 right-8 bg-gradient-to-r ${data.color} text-white p-6 rounded-full shadow-2xl hover-lift z-50 transform transition-all duration-300 hover-scale animate-bounce-slow`}
        style={{ animationDelay: '2s' }}
      >
        <div className="text-4xl">📋</div>
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
          Report
        </div>
      </Link>
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${data.color} text-white py-16 relative overflow-hidden`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {data.images.map((img, idx) => (
            <div
              key={idx}
              className="absolute animate-float"
              style={{
                left: `${20 + idx * 20}%`,
                top: `${10 + idx * 15}%`,
                animationDelay: `${idx * 0.5}s`,
                fontSize: '4rem'
              }}
            >
              {img}
            </div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="absolute left-4 top-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transform transition-all duration-300 hover-scale flex items-center"
          >
            <span className="mr-2">←</span> Back
          </button>
          
          <div className={`mt-8 ${isVisible ? 'animate-fadeInUp' : ''}`}>
            <div className="text-8xl mb-6 animate-bounce-slow">{data.icon}</div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">{data.title}</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">{data.description}</p>
          </div>
        </div>
      </div>

      {/* Character Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`bg-white rounded-2xl shadow-2xl p-8 mb-8 hover-lift animate-fadeInUp relative overflow-hidden ${isVisible ? '' : 'opacity-0'}`}>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-green-200 to-blue-200 rounded-full -ml-12 -mb-12 opacity-20"></div>
          
          <div className="text-center relative z-10">
            <div className="text-9xl mb-4 animate-float inline-block transform hover:scale-110 transition-transform duration-300 cursor-pointer">
              {data.character}
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Emergency Response Guide
            </h2>
            <p className="text-gray-600 text-lg mb-6">Follow these guidelines to stay safe and help others</p>
            
            {/* Interactive Badges */}
            <div className="flex justify-center space-x-4 mt-6">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold transform hover-scale cursor-pointer">
                🎯 Quick Guide
              </div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold transform hover-scale cursor-pointer">
                📚 Learn More
              </div>
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold transform hover-scale cursor-pointer">
                🆘 Get Help
              </div>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className={`bg-white rounded-xl shadow-lg p-6 hover-lift card-animate border-l-4 border-green-500 ${isVisible ? '' : 'opacity-0'}`}>
            <div className="text-5xl mb-4 text-center animate-bounce-slow">🛡️</div>
            <h3 className="text-2xl font-bold mb-4 text-center text-green-600">Safety Tips</h3>
            <ul className="space-y-3">
              {data.safetyTips.map((tip, index) => (
                <li key={index} className="flex items-start group">
                  <span className="text-2xl mr-3 animate-bounce-slow transform group-hover:scale-125 transition-transform" style={{ animationDelay: `${index * 0.2}s` }}>
                    ✓
                  </span>
                  <span className="text-gray-700 group-hover:text-green-600 transition-colors">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reporting Steps */}
          <div className={`bg-white rounded-xl shadow-lg p-6 hover-lift card-animate border-l-4 border-blue-500 ${isVisible ? '' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="text-5xl mb-4 text-center animate-bounce-slow">📋</div>
            <h3 className="text-2xl font-bold mb-4 text-center text-blue-600">How to Report</h3>
            <ul className="space-y-3">
              {data.reportingSteps.map((step, index) => (
                <li key={index} className="flex items-start group">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 animate-bounce-slow transform group-hover:scale-125 transition-transform" style={{ animationDelay: `${index * 0.2}s` }}>
                    {index + 1}
                  </span>
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prevention */}
          <div className={`bg-white rounded-xl shadow-lg p-6 hover-lift card-animate border-l-4 border-purple-500 ${isVisible ? '' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <div className="text-5xl mb-4 text-center animate-bounce-slow">🔒</div>
            <h3 className="text-2xl font-bold mb-4 text-center text-purple-600">Prevention</h3>
            <ul className="space-y-3">
              {data.prevention.map((item, index) => (
                <li key={index} className="flex items-start group">
                  <span className="text-2xl mr-3 animate-bounce-slow transform group-hover:rotate-12 transition-transform" style={{ animationDelay: `${index * 0.2}s` }}>
                    🛡️
                  </span>
                  <span className="text-gray-700 group-hover:text-purple-600 transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interactive Image Gallery */}
        <div className={`bg-white rounded-xl shadow-lg p-8 mb-8 hover-lift animate-fadeInUp ${isVisible ? '' : 'opacity-0'}`}>
          <h3 className="text-3xl font-bold mb-6 text-center flex items-center justify-center">
            <span className="text-4xl mr-3">🖼️</span>
            Emergency Scenarios
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.images.map((img, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${data.color} text-white p-8 rounded-xl text-center transform transition-all duration-300 hover-scale cursor-pointer card-animate group relative overflow-hidden`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="text-7xl mb-4 animate-float relative z-10" style={{ animationDelay: `${index * 0.3}s` }}>
                  {img}
                </div>
                <div className="text-sm font-semibold opacity-90 relative z-10">Scenario {index + 1}</div>
                <div className="absolute bottom-2 right-2 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  👆
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Character Section */}
        <div className={`bg-gradient-to-br ${data.color} rounded-xl shadow-2xl p-8 mb-8 text-white hover-lift animate-fadeInUp ${isVisible ? '' : 'opacity-0'}`}>
          <div className="text-center">
            <div className="text-9xl mb-6 animate-bounce-slow">{data.character}</div>
            <h3 className="text-3xl font-bold mb-4">Meet Your Emergency Guide</h3>
            <p className="text-xl opacity-90 mb-6">
              This character represents {type === 'flood' ? 'water safety' : type === 'earthquake' ? 'ground stability' : type === 'fire' ? 'fire safety' : type === 'storm' ? 'weather awareness' : type === 'medical' ? 'health protection' : 'general safety'}
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 transform hover-scale cursor-pointer">
                <div className="text-4xl mb-2">💬</div>
                <div className="text-sm">Get Tips</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 transform hover-scale cursor-pointer">
                <div className="text-4xl mb-2">📚</div>
                <div className="text-sm">Learn More</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 transform hover-scale cursor-pointer">
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-sm">Take Action</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`text-center mb-8 animate-fadeInUp ${isVisible ? '' : 'opacity-0'}`}>
          <Link
            to="/report"
            className={`bg-gradient-to-r ${data.color} text-white font-bold py-4 px-8 rounded-xl text-lg transform transition-all duration-300 hover-scale shadow-2xl inline-flex items-center mr-4`}
          >
            <span className="text-2xl mr-3">📋</span>
            Report This Emergency
          </Link>
          <Link
            to="/incidents"
            className="bg-white text-gray-800 font-bold py-4 px-8 rounded-xl text-lg transform transition-all duration-300 hover-scale shadow-lg inline-flex items-center border-2 border-gray-300"
          >
            <span className="text-2xl mr-3">📰</span>
            View All Incidents
          </Link>
        </div>

        {/* Emergency Contact Card */}
        <div className={`bg-gradient-to-r ${data.color} text-white rounded-xl shadow-2xl p-8 hover-lift animate-fadeInUp relative overflow-hidden ${isVisible ? '' : 'opacity-0'}`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="text-center relative z-10">
            <div className="text-6xl mb-4 animate-bounce-slow">📞</div>
            <h3 className="text-3xl font-bold mb-4">Need Immediate Help?</h3>
            <p className="text-xl mb-6 opacity-90">
              Call emergency services: <span className="font-bold text-4xl animate-pulse">911</span>
            </p>
            <p className="text-lg opacity-80 mb-6">
              Or use our portal to report the emergency and get coordinated assistance
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 transform hover-scale cursor-pointer">
                <div className="text-3xl mb-2">🚨</div>
                <div className="text-sm">Emergency</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 transform hover-scale cursor-pointer">
                <div className="text-3xl mb-2">📱</div>
                <div className="text-sm">Hotline</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 transform hover-scale cursor-pointer">
                <div className="text-3xl mb-2">💬</div>
                <div className="text-sm">Chat</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className={`grid md:grid-cols-3 gap-6 mb-8 animate-fadeInUp ${isVisible ? '' : 'opacity-0'}`}>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover-lift">
            <div className="text-5xl mb-3 animate-bounce-slow">⚡</div>
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Available Support</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover-lift">
            <div className="text-5xl mb-3 animate-bounce-slow">🌍</div>
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Coverage Area</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover-lift">
            <div className="text-5xl mb-3 animate-bounce-slow">✅</div>
            <div className="text-3xl font-bold text-purple-600 mb-2">Fast</div>
            <div className="text-gray-600">Response Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyTypeDetail;

