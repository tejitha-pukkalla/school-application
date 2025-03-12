import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Loginform = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Generate neural network nodes and connections for the background
  useEffect(() => {
    const generateNeuralNetwork = () => {
      const newNodes = [];
      // Create neural network nodes
      for (let i = 0; i < 25; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          pulseSpeed: Math.random() * 1 + 0.5,
          active: Math.random() > 0.7,
          activationTime: Math.random() * 2000,
        });
      }
      setNodes(newNodes);

      // Create connections between nodes
      const newConnections = [];
      for (let i = 0; i < newNodes.length; i++) {
        for (let j = i + 1; j < newNodes.length; j++) {
          // Only connect some nodes based on proximity
          if (Math.random() > 0.8) {
            newConnections.push({
              id: `${i}-${j}`,
              from: i,
              to: j,
              active: false,
              activationSpeed: Math.random() * 3 + 1,
            });
          }
        }
      }
      setConnections(newConnections);
    };

    generateNeuralNetwork();

    // Animate the neural network
    const interval = setInterval(() => {
      // Activate random connections to simulate data flow
      setConnections(prevConnections =>
        prevConnections.map(connection => ({
          ...connection,
          active: Math.random() > 0.7,
        }))
      );

      // Pulse nodes and slightly move them
      setNodes(prevNodes =>
        prevNodes.map(node => ({
          ...node,
          x: node.x + (Math.random() - 0.5) * 0.3,
          y: node.y + (Math.random() - 0.5) * 0.3,
          active: Math.random() > 0.6,
        }))
      );
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        username: formData.username,
        password: formData.password,
      });

      const { token, message } = response.data;
      localStorage.setItem('auth_token', token);
      
      setSuccess(message);
      setTimeout(() => navigate('/Home'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden">
      {/* Neural network visualization */}
      <div className="absolute inset-0 opacity-80">
        {/* Neural nodes */}
        {nodes.map(node => (
          <div
            key={node.id}
            className={`absolute rounded-full transition-all duration-500 ${node.active ? 'bg-blue-400 shadow-lg shadow-blue-500/50' : 'bg-blue-600'}`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: `${node.size}px`,
              height: `${node.size}px`,
              transform: node.active ? 'scale(1.5)' : 'scale(1)',
              transition: 'transform 0.5s ease, background-color 0.5s ease',
            }}
          />
        ))}

        {/* Neural connections */}
        <svg className="absolute inset-0 w-full h-full">
          {connections.map(connection => {
            const fromNode = nodes[connection.from];
            const toNode = nodes[connection.to];
            return (
              <line
                key={connection.id}
                x1={`${fromNode?.x}%`}
                y1={`${fromNode?.y}%`}
                x2={`${toNode?.x}%`}
                y2={`${toNode?.y}%`}
                stroke={connection.active ? '#60a5fa' : '#1e40af'}
                strokeWidth={connection.active ? "1.5" : "0.5"}
                opacity={connection.active ? "0.8" : "0.3"}
                strokeDasharray={connection.active ? "5,5" : ""}
                className="transition-all duration-700"
              />
            );
          })}
        </svg>
      </div>

      {/* Binary code floating in background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        {Array.from({ length: 10 }).map((_, index) => (
          <div 
            key={index}
            className="absolute text-blue-300 text-xs whitespace-nowrap animate-binaryRain"
            style={{
              left: `${index * 10 + Math.random() * 5}%`,
              top: `-100px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 15}s`
            }}
          >
            {Array.from({ length: 20 }).map(() => 
              Math.random() > 0.5 ? '1' : '0'
            ).join(' ')}
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl p-8 mx-4 border border-blue-500/30">
        <div className="text-center mb-8">
          {/* AI-themed logo */}
          <div className="flex justify-center mb-4">
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center animate-pulse">
              <div className="absolute w-full h-full rounded-full border-4 border-blue-400 border-t-transparent animate-spin"></div>
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">JJ</span>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white animate-textGlow">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Johnson Johnson
            </span>
          </h1>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 rounded-full mt-2 animate-scanline"></div>
          <p className="text-blue-300 mt-3 animate-typing overflow-hidden whitespace-nowrap">AI-Powered Solutions</p>
        </div>

        <form onSubmit={handleLogin} className="bg-gray-900 bg-opacity-80 p-6 rounded-xl shadow-inner border border-blue-600/20">
          {error && (
            <div className="mb-6 px-4 py-3 rounded-lg bg-red-900 border border-red-700 text-red-100 text-center animate-pulse">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-6 px-4 py-3 rounded-lg bg-green-900 border border-green-700 text-green-100 text-center animate-pulse">
              {success}
            </div>
          )}

          <div className="space-y-5">
            <div className="animate-fadeInLeft">
              <label className="block text-blue-300 font-medium text-sm mb-2 ml-1">Username</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-blue-700 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-600/50 focus:outline-none transition-all"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="animate-fadeInRight">
              <label className="block text-blue-300 font-medium text-sm mb-2 ml-1">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-blue-700 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-600/50 focus:outline-none transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-blue-300 animate-fadeIn">
                <input type="checkbox" className="mr-2 h-4 w-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500" />
                Remember me
              </label>
              
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors animate-fadeIn font-medium">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full py-3 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg shadow-blue-700/50 transition-all overflow-hidden group"
            >
              <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-purple-500"></span>
              <span className="absolute inset-0 h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KICA8ZGVmcz4NCiAgICA8cGF0dGVybiBpZD0icGF0dGVybiIgeD0iMCIgeT0iMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4NCiAgICAgIDxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjEiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4zIi8+DQogICAgPC9wYXR0ZXJuPg0KICA8L2RlZnM+DQogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybildIiAvPg0KPC9zdmc+')]
                mix-blend-overlay opacity-50"></span>
              <span className="absolute top-0 bottom-0 right-0 px-3.5 py-3 animate-techFlash opacity-0 group-hover:opacity-100"></span>
              <span className="absolute top-0 bottom-0 left-0 px-3.5 py-3 animate-techFlash opacity-0 group-hover:opacity-100"></span>
              <span className="relative z-10">
                {isLoading ? 'Authenticating...' : 'Sign In'}
              </span>
              {isLoading && (
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="animate-brainScan h-6 w-6 rounded-full border-2 border-blue-400 border-t-transparent border-b-transparent"></div>
                </div>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-blue-300 text-sm animate-fadeIn">
          Don't have an account?{' '}
          <a href="#" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Create Account
          </a>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes textGlow {
          0% { text-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
          50% { text-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6); }
          100% { text-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
        }
        
        @keyframes scanline {
          0% { width: 0; opacity: 0; }
          50% { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: 0.5; }
        }
        
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes binaryRain {
          from { transform: translateY(-100px); }
          to { transform: translateY(100vh); }
        }
        
        @keyframes techFlash {
          0%, 100% { opacity: 0; box-shadow: 0 0 0 rgba(59, 130, 246, 0); }
          20%, 80% { opacity: 1; box-shadow: 0 0 10px rgba(59, 130, 246, 0.8); }
        }
        
        @keyframes brainScan {
          0% { transform: rotate(0deg); box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
          100% { transform: rotate(360deg); box-shadow: 0 0 2px rgba(59, 130, 246, 0.2); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out forwards;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
          animation-delay: 0.2s;
        }
        
        .animate-textGlow {
          animation: textGlow 3s ease-in-out infinite;
        }
        
        .animate-scanline {
          animation: scanline 2s ease-in-out forwards;
          animation-delay: 0.3s;
        }
        
        .animate-typing {
          animation: typing 2.5s steps(20, end) forwards;
          width: 0;
          border-right: 2px solid rgba(59, 130, 246, 0.8);
        }
        
        .animate-binaryRain {
          animation: binaryRain linear infinite;
        }
        
        .animate-techFlash {
          animation: techFlash 2s ease-in-out infinite;
        }
        
        .animate-brainScan {
          animation: brainScan 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loginform;