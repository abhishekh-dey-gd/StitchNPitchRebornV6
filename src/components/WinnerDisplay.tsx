import React from 'react';
import { Trophy, Star, X } from 'lucide-react';
import { Winner } from '../config/data';

interface WinnerDisplayProps {
  winner: Winner;
  onBack: () => void;
}

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ winner, onBack }) => {
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <style>
        {`
          .winner-modal-enter {
            animation: winner-modal-enter 0.8s ease-out;
          }
          
          @keyframes winner-modal-enter {
            0% { 
              opacity: 0; 
              transform: scale(0.8) translateY(50px);
            }
            100% { 
              opacity: 1; 
              transform: scale(1) translateY(0);
            }
          }
          
          .winner-bounce {
            animation: winner-bounce 0.6s ease-out;
          }
          
          @keyframes winner-bounce {
            0% { transform: scale(0) rotate(-180deg); opacity: 0; }
            50% { transform: scale(1.2) rotate(-90deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          
          .star-bounce {
            animation: star-bounce 0.8s ease-out infinite;
          }
          
          @keyframes star-bounce {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          .trophy-glow {
            animation: trophy-glow 2s ease-in-out infinite;
          }
          
          @keyframes trophy-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.5); }
            50% { box-shadow: 0 0 30px rgba(251, 191, 36, 0.8); }
          }
        `}
      </style>
      
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-70 backdrop-blur-sm overflow-y-auto"
        onClick={onBack}
      >
        <div 
          className="bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-md md:max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl text-center winner-modal-enter relative my-auto"
          onClick={handleModalClick}
        >
          
          {/* Close Button */}
          <button
            onClick={onBack}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-200 transition-colors bg-white bg-opacity-20 rounded-full p-1.5 sm:p-2 hover:bg-opacity-30 z-10 backdrop-blur-sm"
            type="button"
          >
            <X className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          <div className="mb-4 sm:mb-6 md:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-yellow-400 bg-opacity-30 rounded-full mb-2 sm:mb-4 winner-bounce trophy-glow backdrop-blur-sm">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-yellow-300" />
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2 animate-pulse">
              🎉 WINNER! 🎉
            </h1>
            
            <div className="flex justify-center gap-1 sm:gap-2 mb-4 sm:mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400 fill-current star-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 border border-white border-opacity-20">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 text-white break-words">
              {winner.name}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm sm:text-base md:text-lg">
              <div className="bg-white bg-opacity-10 rounded-lg p-2 sm:p-3 md:p-4 backdrop-blur-sm border border-white border-opacity-10">
                <div className="font-semibold text-yellow-300 text-xs sm:text-sm">Department</div>
                <div className="text-white text-sm sm:text-base break-words">{winner.department}</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-2 sm:p-3 md:p-4 backdrop-blur-sm border border-white border-opacity-10">
                <div className="font-semibold text-yellow-300 text-xs sm:text-sm">Supervisor</div>
                <div className="text-white text-sm sm:text-base break-words">{winner.supervisor}</div>
              </div>
            </div>
          </div>

          <div className="text-white text-opacity-90 mb-4 sm:mb-6 md:mb-8 px-2">
            <p className="text-sm sm:text-base md:text-lg">
              Congratulations on being selected as our guide!
            </p>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2 opacity-75">
              Selected on {new Date(winner.timestamp).toLocaleString()}
            </p>
          </div>

          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-purple-600 bg-opacity-80 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl hover:bg-opacity-90 transition-all transform hover:scale-105 font-semibold text-sm sm:text-base backdrop-blur-sm border border-purple-500 border-opacity-50"
          >
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
            Continue Selection
          </button>
        </div>
      </div>
    </>
  );
};

export default WinnerDisplay;