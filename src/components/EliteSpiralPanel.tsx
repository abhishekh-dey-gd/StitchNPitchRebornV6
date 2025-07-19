import React, { useState, useEffect } from 'react';
import { Sparkles, Filter, Users, Star, Trophy, MessageCircle, Plus, Trash2, Shuffle, Crown, X, Zap } from 'lucide-react';
import { Winner, EliteSpiral } from '../config/data';
import { supabase } from '../lib/supabase';
import PasswordModal from './PasswordModal';
import ConfettiAnimation from './ConfettiAnimation';
import FailAnimation from './FailAnimation';


interface EliteSpiralPanelProps {
  winners: Winner[];
  eliteWinners: EliteSpiral[];
  onEliteWinnerAdded: (elite: EliteSpiral) => void;
}

const EliteSpiralPanel: React.FC<EliteSpiralPanelProps> = ({ winners, eliteWinners, onEliteWinnerAdded }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [filteredWinners, setFilteredWinners] = useState<Winner[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSpinWinner, setCurrentSpinWinner] = useState<Winner | null>(null);
  const [selectedWinner, setSelectedWinner] = useState<Winner | null>(null);
  const [chatIds, setChatIds] = useState<string[]>(['']);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentEliteWinner, setCurrentEliteWinner] = useState<EliteSpiral | null>(null);
  const [showEliteConfetti, setShowEliteConfetti] = useState(false);
  const [showEliteFailAnimation, setShowEliteFailAnimation] = useState(false);
  const [failedEliteName, setFailedEliteName] = useState('');

  // Get unique departments from winners
  const departments = [...new Set(winners.map(winner => winner.department))].sort();


  useEffect(() => {
    // Filter winners based on selected department
    if (selectedDepartment === 'All') {
      setFilteredWinners(winners);
    } else {
      setFilteredWinners(winners.filter(winner => winner.department === selectedDepartment));
    }
  }, [selectedDepartment, winners]);


  const addChatIdField = () => {
    if (chatIds.length < 10) {
      setChatIds([...chatIds, '']);
    }
  };

  const removeChatIdField = (index: number) => {
    if (chatIds.length > 1) {
      setChatIds(chatIds.filter((_, i) => i !== index));
    }
  };

  const updateChatId = (index: number, value: string) => {
    const newChatIds = [...chatIds];
    newChatIds[index] = value;
    setChatIds(newChatIds);
  };

  const spinWheel = () => {
    if (filteredWinners.length === 0) {
      alert('No winners available for spinning!');
      return;
    }

    setIsSpinning(true);
    setCurrentSpinWinner(null);
    
    // Extended animation for 4-6 seconds
    let spinCount = 0;
    const maxSpins = 60 + Math.floor(Math.random() * 30); // 60-90 spins
    const totalDuration = 4000 + Math.random() * 2000; // 4-6 seconds
    const intervalTime = totalDuration / maxSpins;
    
    const spinInterval = setInterval(() => {
      const randomWinner = filteredWinners[Math.floor(Math.random() * filteredWinners.length)];
      setCurrentSpinWinner(randomWinner);
      spinCount++;
      
      if (spinCount >= maxSpins) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        const finalWinner = filteredWinners[Math.floor(Math.random() * filteredWinners.length)];
        setSelectedWinner(finalWinner);
        setCurrentSpinWinner(null);
      }
    }, intervalTime);
  };

  const handleWinnerSelected = () => {
    if (selectedWinner) {
      const validChatIds = chatIds.filter(id => id.trim() !== '');
      const winnerWithChatIds = { ...selectedWinner, chatIds: validChatIds };
      setIsPasswordModalOpen(true);
    }
  };

  const handlePasswordConfirm = async (action: 'pass' | 'fail') => {
    setIsPasswordModalOpen(false);
    
    if (action === 'pass' && selectedWinner) {
      const validChatIds = chatIds.filter(id => id.trim() !== '');
      const eliteEntry: EliteSpiral = {
        winner_id: selectedWinner.id || '',
        guide_id: selectedWinner.guide_id,
        name: selectedWinner.name,
        department: selectedWinner.department,
        supervisor: selectedWinner.supervisor,
        timestamp: new Date().toISOString(),
        chat_ids: validChatIds
      };
      
      await onEliteWinnerAdded(eliteEntry);
      
      // Show elite winner celebration
      setCurrentEliteWinner(eliteEntry);
      setShowEliteConfetti(true);
      
      // Reset form
      setSelectedWinner(null);
      setChatIds(['']);
    } else if (action === 'fail') {
      // Show elite fail animation
      setFailedEliteName(selectedWinner?.name || '');
      setShowEliteFailAnimation(true);
      
      // Just reset the form for fail
      setSelectedWinner(null);
      setChatIds(['']);
    }
  };

  const handleCloseEliteWinner = () => {
    setShowEliteConfetti(false);
    setCurrentEliteWinner(null);
  };

  const handleCloseEliteFail = () => {
    setShowEliteFailAnimation(false);
    setFailedEliteName('');
  };


  return (
    <div className="pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl">
                <Crown className="h-16 w-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 flex items-center justify-center gap-4">
            <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
            Elite's Spiral
            <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 font-medium">
            Spin the wheel with existing winners for elite selection
          </p>
        </div>

        {/* Department Filter */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <Filter className="w-6 h-6" />
              Filter Winners by Department
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {/* All Button */}
            <button
              onClick={() => setSelectedDepartment('All')}
              className={`group relative overflow-hidden rounded-2xl px-6 py-3 transition-all duration-300 transform hover:scale-105 ${
                selectedDepartment === 'All'
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-2xl scale-105'
                  : 'bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20'
              }`}
            >
              <div className="relative z-10 flex items-center gap-2">
                <Star className={`w-5 h-5 ${selectedDepartment === 'All' ? 'text-white' : 'text-yellow-300'}`} />
                <span className={`font-semibold ${selectedDepartment === 'All' ? 'text-white' : 'text-white'}`}>
                  All Winners
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  selectedDepartment === 'All' 
                    ? 'bg-white bg-opacity-20 text-white' 
                    : 'bg-yellow-500 bg-opacity-30 text-yellow-200'
                }`}>
                  {winners.length}
                </span>
              </div>
            </button>

            {/* Department Buttons */}
            {departments.map((department, index) => {
              const count = winners.filter(w => w.department === department).length;
              const isSelected = selectedDepartment === department;
              const colors = [
                'from-purple-400 to-purple-600',
                'from-pink-400 to-pink-600',
                'from-indigo-400 to-indigo-600',
                'from-violet-400 to-violet-600',
                'from-fuchsia-400 to-fuchsia-600'
              ];
              const colorClass = colors[index % colors.length];
              
              return (
                <button
                  key={department}
                  onClick={() => setSelectedDepartment(department)}
                  className={`group relative overflow-hidden rounded-2xl px-6 py-3 transition-all duration-300 transform hover:scale-105 ${
                    isSelected
                      ? `bg-gradient-to-r ${colorClass} shadow-2xl scale-105`
                      : 'bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20'
                  }`}
                >
                  <div className="relative z-10 flex items-center gap-2">
                    <Users className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-purple-300'}`} />
                    <span className={`font-semibold ${isSelected ? 'text-white' : 'text-white'}`}>
                      {department}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      isSelected 
                        ? 'bg-white bg-opacity-20 text-white' 
                        : 'bg-purple-500 bg-opacity-30 text-purple-200'
                    }`}>
                      {count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Filter Status */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 text-white px-4 py-2 rounded-full backdrop-blur-sm">
              <Trophy className="w-4 h-4" />
              <span className="font-medium">
                {filteredWinners.length} {filteredWinners.length === 1 ? 'winner' : 'winners'} available for spinning
                {selectedDepartment !== 'All' && ` from ${selectedDepartment}`}
              </span>
            </div>
          </div>
        </div>

        {/* Spin Wheel Section */}
        <div className="text-center mb-12">
          <button
            onClick={spinWheel}
            disabled={isSpinning || filteredWinners.length === 0}
            className={`inline-flex items-center gap-4 text-2xl font-bold px-12 py-6 rounded-2xl transition-all transform shadow-2xl ${
              isSpinning || filteredWinners.length === 0
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105'
            } text-white`}
          >
            <Shuffle className={`w-8 h-8 ${isSpinning ? 'animate-spin' : ''}`} />
            {isSpinning ? 'Spinning Elite Wheel...' : filteredWinners.length === 0 ? 'No Winners Available' : 'Spin Elite Wheel'}
          </button>
          
          {isSpinning && (
            <div className="mt-6">
              <div className="text-white text-lg font-semibold animate-pulse mb-4">
                🎯 Elite selection in progress... 🎯
              </div>
              
              {/* Spinning Names Animation */}
              {currentSpinWinner && (
                <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 mb-4 border border-white border-opacity-30">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2 animate-pulse">
                      {currentSpinWinner.name}
                    </div>
                    <div className="text-purple-200 text-lg">
                      {currentSpinWinner.department} • {currentSpinWinner.supervisor}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="text-purple-200 animate-bounce">
                Selecting from elite winners... ⭐
              </div>
            </div>
          )}
        </div>

        {/* Selected Winner Display */}
        {selectedWinner && !isSpinning && (
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 shadow-2xl mb-8 transform transition-all hover:scale-105 border border-white border-opacity-20">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 backdrop-blur-sm">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Elite Selection
              </h2>
            </div>

            <div className="bg-gradient-to-r from-purple-500 from-opacity-20 to-pink-500 to-opacity-20 rounded-2xl p-6 mb-6 backdrop-blur-sm border border-white border-opacity-10">
              <h3 className="text-4xl font-bold text-white mb-4 text-center">
                {selectedWinner.name}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl p-4 shadow-sm backdrop-blur-sm">
                  <Users className="w-6 h-6 text-purple-300" />
                  <div>
                    <div className="font-semibold text-purple-200">Department</div>
                    <div className="text-xl text-white">{selectedWinner.department}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl p-4 shadow-sm backdrop-blur-sm">
                  <Trophy className="w-6 h-6 text-green-300" />
                  <div>
                    <div className="font-semibold text-purple-200">Supervisor</div>
                    <div className="text-xl text-white">{selectedWinner.supervisor}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat IDs Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-purple-300" />
                <label className="text-lg font-medium text-white">
                  Chat IDs (Optional - Max 10)
                </label>
              </div>
              
              <div className="space-y-3">
                {chatIds.map((chatId, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={chatId}
                      onChange={(e) => updateChatId(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white placeholder-opacity-60 backdrop-blur-sm"
                      placeholder={`Chat ID ${index + 1}`}
                    />
                    {chatIds.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChatIdField(index)}
                        className="p-3 bg-red-500 bg-opacity-20 text-red-300 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                
                {chatIds.length < 10 && (
                  <button
                    type="button"
                    onClick={addChatIdField}
                    className="flex items-center gap-2 px-4 py-3 bg-purple-500 bg-opacity-20 text-purple-300 rounded-xl hover:bg-purple-500 hover:text-white transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Add Chat ID
                  </button>
                )}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleWinnerSelected}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
              >
                <Crown className="w-6 h-6" />
                Confirm Elite Selection
              </button>
            </div>
          </div>
        )}

        {/* Password Modal */}
        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => {
            setIsPasswordModalOpen(false);
            setSelectedWinner(null);
            setChatIds(['']);
          }}
          onConfirm={handlePasswordConfirm}
          guideName={selectedWinner?.name || ''}
          chatIds={chatIds.filter(id => id.trim() !== '')}
          isLoggedIn={true}
        />

        {/* Elite Winner Display Overlay */}
        {currentEliteWinner && (
          <EliteWinnerDisplay
            eliteWinner={currentEliteWinner}
            onBack={handleCloseEliteWinner}
          />
        )}

        {/* Elite Confetti Animation */}
        <ConfettiAnimation isActive={showEliteConfetti} />

        {/* Elite Fail Animation */}
        <FailAnimation 
          isActive={showEliteFailAnimation} 
          guideName={failedEliteName}
          onClose={handleCloseEliteFail}
        />
      </div>
    </div>
  );
};

// Elite Winner Display Component with Royal Styling
interface EliteWinnerDisplayProps {
  eliteWinner: EliteSpiral;
  onBack: () => void;
}

const EliteWinnerDisplay: React.FC<EliteWinnerDisplayProps> = ({ eliteWinner, onBack }) => {
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <style>
        {`
          .elite-modal-enter {
            animation: elite-modal-enter 1.2s ease-out;
          }
          
          @keyframes elite-modal-enter {
            0% { 
              opacity: 0; 
              transform: scale(0.5) translateY(100px) rotate(-10deg);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.1) translateY(-20px) rotate(5deg);
            }
            100% { 
              opacity: 1; 
              transform: scale(1) translateY(0) rotate(0deg);
            }
          }
          
          .elite-crown-bounce {
            animation: elite-crown-bounce 1s ease-out;
          }
          
          @keyframes elite-crown-bounce {
            0% { transform: scale(0) rotate(-360deg); opacity: 0; }
            50% { transform: scale(1.3) rotate(-180deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          
          .elite-star-float {
            animation: elite-star-float 1.5s ease-in-out infinite;
          }
          
          @keyframes elite-star-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(180deg); }
          }
          
          .elite-glow-pulse {
            animation: elite-glow-pulse 2s ease-in-out infinite;
          }
          
          @keyframes elite-glow-pulse {
            0%, 100% { 
              box-shadow: 0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 165, 0, 0.4);
            }
            50% { 
              box-shadow: 0 0 50px rgba(255, 215, 0, 0.9), 0 0 100px rgba(255, 165, 0, 0.7);
            }
          }
          
          .elite-sparkle {
            animation: elite-sparkle 2s linear infinite;
          }
          
          @keyframes elite-sparkle {
            0% { opacity: 0; transform: scale(0) rotate(0deg); }
            50% { opacity: 1; transform: scale(1) rotate(180deg); }
            100% { opacity: 0; transform: scale(0) rotate(360deg); }
          }
          
          .royal-gradient {
            background: linear-gradient(135deg, 
              #FFD700 0%, 
              #FFA500 25%, 
              #FF8C00 50%, 
              #DAA520 75%, 
              #B8860B 100%
            );
          }
          
          .elite-text-glow {
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6);
          }
        `}
      </style>
      
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-80 backdrop-blur-md overflow-y-auto"
        onClick={onBack}
      >
        {/* Floating Elite Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute elite-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
          ))}
        </div>

        <div 
          className="royal-gradient bg-opacity-95 backdrop-blur-xl border-4 border-yellow-400 rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 md:p-12 max-w-xs sm:max-w-md md:max-w-3xl w-full max-h-[95vh] overflow-y-auto shadow-2xl text-center elite-modal-enter relative my-auto elite-glow-pulse"
          onClick={handleModalClick}
        >
          
          {/* Close Button */}
          <button
            onClick={onBack}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-yellow-200 transition-colors bg-black bg-opacity-30 rounded-full p-2 sm:p-3 hover:bg-opacity-50 z-10 backdrop-blur-sm border-2 border-yellow-400"
            type="button"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Royal Crown and Stars */}
          <div className="mb-6 sm:mb-8 relative">
            <div className="flex justify-center gap-4 sm:gap-6 mb-4">
              <Crown className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-300 elite-star-float" style={{ animationDelay: '0s' }} />
              <div className="elite-crown-bounce">
                <Crown className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-2xl" />
              </div>
              <Crown className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-300 elite-star-float" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-4 elite-text-glow">
              👑 ELITE WINNER! 👑
            </h1>
            
            <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              {[...Array(7)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-yellow-300 fill-current elite-star-float"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          {/* Elite Winner Info */}
          <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 mb-6 sm:mb-8 border-2 border-yellow-400 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #FFD700 2px, transparent 2px),
                                 radial-gradient(circle at 75% 75%, #FFA500 2px, transparent 2px)`,
                backgroundSize: '50px 50px'
              }} />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white elite-text-glow break-words">
                {eliteWinner.name}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-lg sm:text-xl md:text-2xl">
                <div className="bg-black bg-opacity-40 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-yellow-400 border-opacity-50">
                  <div className="font-semibold text-yellow-300 text-sm sm:text-base mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Royal Department
                  </div>
                  <div className="text-white font-bold break-words">{eliteWinner.department}</div>
                </div>
                <div className="bg-black bg-opacity-40 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-yellow-400 border-opacity-50">
                  <div className="font-semibold text-yellow-300 text-sm sm:text-base mb-2 flex items-center gap-2">
                    <Crown className="w-5 h-5" />
                    Royal Supervisor
                  </div>
                  <div className="text-white font-bold break-words">{eliteWinner.supervisor}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Elite Status Messages */}
          <div className="text-white text-opacity-95 mb-6 sm:mb-8 px-2">
            <p className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4 elite-text-glow">
              🌟 Congratulations on achieving ELITE status! 🌟
            </p>
            <p className="text-sm sm:text-base md:text-lg mb-2 sm:mb-3">
              You have been crowned as an Elite Winner in the royal selection!
            </p>
            <p className="text-xs sm:text-sm opacity-90">
              Elite Selection Time: {new Date(eliteWinner.timestamp).toLocaleString()}
            </p>
          </div>

          {/* Royal Action Button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-3 bg-black bg-opacity-50 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl hover:bg-opacity-70 transition-all transform hover:scale-105 font-bold text-base sm:text-lg md:text-xl backdrop-blur-sm border-2 border-yellow-400 elite-glow-pulse"
          >
            <Crown className="w-5 h-5 sm:w-6 sm:h-6" />
            Continue Elite Selection
            <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default EliteSpiralPanel;