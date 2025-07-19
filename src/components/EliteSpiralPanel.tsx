import React, { useState, useEffect } from 'react';
import { Sparkles, Filter, Users, Star, Trophy, MessageCircle, Plus, Trash2, Shuffle, Crown, X } from 'lucide-react';
import { Winner, EliteSpiral } from '../config/data';
import { supabase } from '../lib/supabase';
import PasswordModal from './PasswordModal';

const ADMIN_PASSWORD = 'InternationalMessaging@20';

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
      
      // Reset form
      setSelectedWinner(null);
      setChatIds(['']);
    } else if (action === 'fail') {
      // Just reset the form for fail
      setSelectedWinner(null);
      setChatIds(['']);
    }
  };

  const validatePassword = (password: string): boolean => {
    return password === ADMIN_PASSWORD;
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
          onConfirm={(action) => {
            const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
            if (passwordInput && validatePassword(passwordInput.value)) {
              handlePasswordConfirm(action);
            } else {
              alert('Invalid password. Access denied.');
            }
          }}
          guideName={selectedWinner?.name || ''}
          chatIds={chatIds.filter(id => id.trim() !== '')}
        />
      </div>
    </div>
  );
};

export default EliteSpiralPanel;