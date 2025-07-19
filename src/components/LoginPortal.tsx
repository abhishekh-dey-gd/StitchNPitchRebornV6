import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, Sparkles } from 'lucide-react';

interface LoginPortalProps {
  onLogin: (success: boolean) => void;
}

const LoginPortal: React.FC<LoginPortalProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Admin credentials - easily editable
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'InternationalMessaging@20';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLogin(true);
    } else {
      setError('Invalid username or password. Please try again.');
      onLogin(false);
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <style>
        {`
          .login-container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            position: relative;
            overflow: hidden;
          }
          
          .login-orb {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
            backdrop-filter: blur(10px);
            animation: float 6s ease-in-out infinite;
          }
          
          .login-orb:nth-child(1) {
            width: 200px;
            height: 200px;
            top: 10%;
            left: 10%;
            animation-delay: 0s;
          }
          
          .login-orb:nth-child(2) {
            width: 150px;
            height: 150px;
            top: 60%;
            right: 15%;
            animation-delay: 2s;
          }
          
          .login-orb:nth-child(3) {
            width: 100px;
            height: 100px;
            bottom: 20%;
            left: 20%;
            animation-delay: 4s;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          .login-card-enter {
            animation: login-card-enter 0.8s ease-out;
          }
          
          @keyframes login-card-enter {
            0% { 
              opacity: 0; 
              transform: scale(0.9) translateY(30px);
            }
            100% { 
              opacity: 1; 
              transform: scale(1) translateY(0);
            }
          }
          
          .input-focus {
            transition: all 0.3s ease;
          }
          
          .input-focus:focus {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          }
          
          .login-button-hover {
            transition: all 0.3s ease;
          }
          
          .login-button-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          }
        `}
      </style>

      <div className="login-container flex items-center justify-center p-4">
        {/* Floating Orbs */}
        <div className="login-orb"></div>
        <div className="login-orb"></div>
        <div className="login-orb"></div>

        <div className="bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl login-card-enter">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src="/stitch-n-pitch-logo.png" 
                  alt="Stitch n Pitch Logo" 
                  className="h-20 w-20 rounded-2xl object-cover drop-shadow-2xl border-4 border-white border-opacity-50"
                />
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              Stitch n Pitch
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            </h1>
            
            <p className="text-purple-200 text-lg font-medium mb-2">
              Contest Management Portal
            </p>
            
            <p className="text-blue-200 text-sm">
              Your gateway to seamless guide selection and contest management
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white text-opacity-90 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-purple-300" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-focus w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white placeholder-opacity-60 backdrop-blur-sm"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white text-opacity-90 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-purple-300" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-focus w-full pl-10 pr-12 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white placeholder-opacity-60 backdrop-blur-sm"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-purple-300 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-400 border-opacity-50 text-red-200 rounded-lg p-3 backdrop-blur-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`login-button-hover w-full py-3 px-4 rounded-xl font-semibold text-lg transition-all transform ${
                isLoading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg'
              } text-white backdrop-blur-sm border border-purple-500 border-opacity-50`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Credentials Info */}
          <div className="mt-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
            <h3 className="text-white font-semibold mb-2 text-center">Login Credentials</h3>
            <div className="space-y-1 text-sm text-blue-200">
              <p><span className="font-medium">Username:</span> admin</p>
              <p><span className="font-medium">Password:</span> Same as shared earlier</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-purple-200 text-sm">
              Secure access to contest management system
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPortal;