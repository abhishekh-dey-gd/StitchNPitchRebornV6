import React from 'react';
import { X } from 'lucide-react';

interface FailAnimationProps {
  isActive: boolean;
  guideName: string;
  onClose: () => void;
}

const FailAnimation: React.FC<FailAnimationProps> = ({ isActive, guideName, onClose }) => {
  if (!isActive) return null;

  const funnyMessages = [
    "Oops! Better luck next time! 😅",
    "Not today, champion! 🎭",
    "The universe has other plans! 🌟",
    "Plot twist! Try again! 🎬",
    "Almost there! Keep trying! 💪",
    "The stars weren't aligned! ⭐",
    "Mission failed successfully! 🎯",
    "Error 404: Winner not found! 🤖"
  ];

  const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <style>
        {`
          .fail-bounce {
            animation: fail-bounce 0.8s ease-out;
          }
          
          @keyframes fail-bounce {
            0% { transform: scale(0) rotate(-180deg); opacity: 0; }
            50% { transform: scale(1.2) rotate(-90deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          
          .fail-shake {
            animation: fail-shake 0.5s ease-in-out infinite;
          }
          
          @keyframes fail-shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          
          .fail-float {
            animation: fail-float 2s ease-in-out infinite;
          }
          
          @keyframes fail-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .fail-emoji {
            animation: fail-emoji-spin 1s linear infinite;
          }
          
          @keyframes fail-emoji-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-70 backdrop-blur-sm overflow-y-auto"
        onClick={handleClose}
      >
        <div 
          className="bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-md md:max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl text-center fail-bounce relative my-auto"
          onClick={handleModalClick}
        >
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-200 transition-colors bg-white bg-opacity-20 rounded-full p-1.5 sm:p-2 hover:bg-opacity-30 z-10 backdrop-blur-sm"
            type="button"
          >
            <X className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* Animated Emojis */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl md:text-6xl fail-emoji">😅</span>
            <span className="text-3xl sm:text-4xl md:text-6xl fail-float">🎭</span>
            <span className="text-3xl sm:text-4xl md:text-6xl fail-shake">😂</span>
          </div>
          
          {/* Main Message */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 fail-shake">
            OOPS! 
          </h1>
          
          <div className="bg-white bg-opacity-20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 backdrop-blur-sm border border-white border-opacity-30">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 break-words">
              {guideName}
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-white opacity-90 break-words">
              {randomMessage}
            </p>
          </div>
          
          {/* Funny Animation Elements */}
          <div className="flex justify-center gap-2 sm:gap-4 md:gap-8 mb-4 sm:mb-6">
            <div className="text-2xl sm:text-3xl md:text-4xl fail-float" style={{ animationDelay: '0.2s' }}>🎪</div>
            <div className="text-2xl sm:text-3xl md:text-4xl fail-float" style={{ animationDelay: '0.4s' }}>🎨</div>
            <div className="text-2xl sm:text-3xl md:text-4xl fail-float" style={{ animationDelay: '0.6s' }}>🎵</div>
            <div className="text-2xl sm:text-3xl md:text-4xl fail-float" style={{ animationDelay: '0.8s' }}>🎲</div>
          </div>
          
          <div className="text-white text-sm sm:text-base md:text-lg opacity-80 mb-4 sm:mb-6 px-2">
            Don't worry, every great story has plot twists! 📚✨
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="bg-white bg-opacity-20 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-opacity-30 transition-all transform hover:scale-105 font-semibold text-sm sm:text-base backdrop-blur-sm z-10 relative border border-white border-opacity-30"
            type="button"
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  );
};

export default FailAnimation;