import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, BarChart3, Calendar, Crown, Users, X, Sparkles } from 'lucide-react';
import { EliteSpiral, DEPARTMENTS } from '../config/data';
import ConfettiAnimation from './ConfettiAnimation';

interface EliteWinnersDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  eliteWinners: EliteSpiral[];
}

interface DepartmentData {
  name: string;
  wins: number;
  color: string;
  percentage: number;
}

interface TimelineData {
  date: string;
  wins: number;
  cumulative: number;
}

const EliteWinnersDashboard: React.FC<EliteWinnersDashboardProps> = ({ isOpen, onClose, eliteWinners }) => {
  const [activeChart, setActiveChart] = useState<'bar' | 'pie' | 'timeline'>('bar');
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      // Animate charts in sequence
      const timer1 = setTimeout(() => setAnimationPhase(1), 500);
      const timer2 = setTimeout(() => setAnimationPhase(2), 1000);
      const timer3 = setTimeout(() => setAnimationPhase(3), 1500);
      const confettiTimer = setTimeout(() => setShowConfetti(false), 3000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(confettiTimer);
      };
    }
  }, [isOpen]);

  // Reset animation when eliteWinners change
  useEffect(() => {
    if (isOpen) {
      setAnimationPhase(0);
      const timer = setTimeout(() => setAnimationPhase(3), 100);
      return () => clearTimeout(timer);
    }
  }, [eliteWinners.length]);

  if (!isOpen) return null;

  // Prepare department data with different colors for each department
  const departmentColors = [
    '#FFD700', '#FF6B35', '#F7931E', '#C5A572', '#DAA520',
    '#B8860B', '#CD853F', '#D2691E', '#FF8C00', '#FFA500',
    '#FFB347', '#FFBF00', '#FFCC5C', '#FFD700', '#FFDF00'
  ];

  const departmentData: DepartmentData[] = DEPARTMENTS.map((dept, index) => {
    const wins = eliteWinners.filter(winner => winner.department === dept).length;
    const percentage = eliteWinners.length > 0 ? (wins / eliteWinners.length) * 100 : 0;
    return {
      name: dept,
      wins,
      color: departmentColors[index % departmentColors.length],
      percentage: Math.round(percentage * 10) / 10
    };
  }).filter(dept => dept.wins > 0);

  // Prepare timeline data
  const timelineData: TimelineData[] = [];
  const sortedEliteWinners = [...eliteWinners].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  
  let cumulative = 0;
  const dateGroups: { [key: string]: number } = {};
  
  sortedEliteWinners.forEach(winner => {
    const date = new Date(winner.timestamp).toLocaleDateString();
    dateGroups[date] = (dateGroups[date] || 0) + 1;
  });

  Object.entries(dateGroups).forEach(([date, wins]) => {
    cumulative += wins;
    timelineData.push({
      date,
      wins,
      cumulative
    });
  });

  const totalWins = eliteWinners.length;
  const topDepartment = departmentData.reduce((prev, current) => 
    prev.wins > current.wins ? prev : current, departmentData[0]);

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    setShowConfetti(false);
    setAnimationPhase(0);
    onClose();
  };

  return (
    <>
      <style>
        {`
          .elite-dashboard-enter {
            animation: elite-dashboard-enter 0.8s ease-out;
          }
          
          @keyframes elite-dashboard-enter {
            0% { 
              opacity: 0; 
              transform: scale(0.8) translateY(50px);
            }
            100% { 
              opacity: 1; 
              transform: scale(1) translateY(0);
            }
          }
          
          .elite-chart-animate-1 {
            animation: elite-chart-slide-in 0.6s ease-out 0.5s both;
          }
          
          .elite-chart-animate-2 {
            animation: elite-chart-slide-in 0.6s ease-out 1s both;
          }
          
          .elite-chart-animate-3 {
            animation: elite-chart-slide-in 0.6s ease-out 1.5s both;
          }
          
          @keyframes elite-chart-slide-in {
            0% {
              opacity: 0;
              transform: translateX(-30px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .elite-stat-card-animate {
            animation: elite-stat-bounce 0.8s ease-out;
          }
          
          @keyframes elite-stat-bounce {
            0% { transform: scale(0) rotate(-180deg); }
            50% { transform: scale(1.1) rotate(-90deg); }
            100% { transform: scale(1) rotate(0deg); }
          }
          
          .elite-glow-effect {
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
          }
          
          .elite-pulse-glow {
            animation: elite-pulse-glow 2s ease-in-out infinite;
          }
          
          @keyframes elite-pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.4); }
            50% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.7); }
          }

          /* Mobile responsive adjustments */
          @media (max-width: 768px) {
            .elite-mobile-pie-chart {
              height: 300px !important;
            }
            
            .elite-mobile-legend {
              max-height: 200px;
              overflow-y: auto;
            }
          }
        `}
      </style>

      <div 
        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <div 
          className="bg-gradient-to-br from-yellow-900 via-orange-900 to-amber-900 bg-opacity-95 backdrop-blur-xl border border-white border-opacity-20 rounded-3xl p-4 md:p-8 max-w-7xl w-full max-h-[90vh] overflow-y-auto shadow-2xl elite-dashboard-enter"
          onClick={handleModalClick}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="p-2 md:p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl md:rounded-2xl elite-pulse-glow">
                <Crown className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-white flex items-center gap-1 md:gap-2">
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 animate-pulse" />
                  Elite Winners Dashboard
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 animate-pulse" />
                </h1>
                <p className="text-orange-200 text-sm md:text-lg">Elite spiral analytics and insights</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 transition-colors bg-white bg-opacity-10 rounded-full p-2 md:p-3 hover:bg-opacity-20 backdrop-blur-sm"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Statistics Cards */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8 ${animationPhase >= 1 ? 'elite-chart-animate-1' : 'opacity-0'}`}>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl md:rounded-2xl p-3 md:p-6 text-white elite-stat-card-animate elite-glow-effect">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-xs md:text-sm font-medium">Elite Winners</p>
                  <p className="text-xl md:text-3xl font-bold">{totalWins}</p>
                </div>
                <Crown className="w-6 h-6 md:w-8 md:h-8 text-yellow-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl md:rounded-2xl p-3 md:p-6 text-white elite-stat-card-animate elite-glow-effect">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-xs md:text-sm font-medium">Departments</p>
                  <p className="text-xl md:text-3xl font-bold">{departmentData.length}</p>
                </div>
                <Users className="w-6 h-6 md:w-8 md:h-8 text-orange-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl md:rounded-2xl p-3 md:p-6 text-white elite-stat-card-animate elite-glow-effect">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-xs md:text-sm font-medium">Top Department</p>
                  <p className="text-sm md:text-lg font-bold truncate">{topDepartment?.name || 'N/A'}</p>
                  <p className="text-xs md:text-sm text-amber-200">{topDepartment?.wins || 0} elite wins</p>
                </div>
                <PieChartIcon className="w-6 h-6 md:w-8 md:h-8 text-amber-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl md:rounded-2xl p-3 md:p-6 text-white elite-stat-card-animate elite-glow-effect">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-xs md:text-sm font-medium">Latest Elite</p>
                  <p className="text-xs md:text-sm font-bold">
                    {eliteWinners.length > 0 
                      ? new Date(Math.max(...eliteWinners.map(w => new Date(w.timestamp).getTime()))).toLocaleDateString()
                      : 'N/A'
                    }
                  </p>
                </div>
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-red-200" />
              </div>
            </div>
          </div>

          {/* Chart Type Selector */}
          <div className={`flex justify-center mb-6 md:mb-8 ${animationPhase >= 2 ? 'elite-chart-animate-2' : 'opacity-0'}`}>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl md:rounded-2xl p-1 md:p-2 flex gap-1 md:gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveChart('bar')}
                className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all text-sm md:text-base whitespace-nowrap ${
                  activeChart === 'bar'
                    ? 'bg-yellow-600 text-white shadow-lg'
                    : 'text-yellow-200 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <BarChart3 className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Bar Chart</span>
                <span className="sm:hidden">Bar</span>
              </button>
              <button
                onClick={() => setActiveChart('pie')}
                className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all text-sm md:text-base whitespace-nowrap ${
                  activeChart === 'pie'
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'text-yellow-200 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <PieChartIcon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Pie Chart</span>
                <span className="sm:hidden">Pie</span>
              </button>
              <button
                onClick={() => setActiveChart('timeline')}
                className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all text-sm md:text-base whitespace-nowrap ${
                  activeChart === 'timeline'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-yellow-200 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Timeline</span>
                <span className="sm:hidden">Time</span>
              </button>
            </div>
          </div>

          {/* Charts */}
          <div className={`bg-white bg-opacity-10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-8 ${animationPhase >= 3 ? 'elite-chart-animate-3' : 'opacity-0'}`}>
            {activeChart === 'bar' && (
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">Elite Wins by Department</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#E5E7EB" 
                      fontSize={10}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      interval={0}
                    />
                    <YAxis stroke="#E5E7EB" fontSize={10} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: 'none', 
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '12px'
                      }}
                      formatter={(value, name) => [value, 'Elite Wins']}
                    />
                    <Bar 
                      dataKey="wins" 
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeChart === 'pie' && (
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">Elite Department Distribution</h3>
                <div className="flex flex-col lg:flex-row items-start gap-4 md:gap-8">
                  <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height={300} className="elite-mobile-pie-chart">
                      <PieChart>
                        <Pie
                          data={departmentData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="wins"
                          animationDuration={1500}
                          labelLine={false}
                        >
                          {departmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(0,0,0,0.8)', 
                            border: 'none', 
                            borderRadius: '12px',
                            color: 'white',
                            fontSize: '12px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 w-full">
                    <h4 className="text-lg font-semibold text-white mb-4">Department Breakdown</h4>
                    <div className="space-y-2 md:space-y-3 elite-mobile-legend">
                      {departmentData.map((dept, index) => (
                        <div key={dept.name} className="flex items-center gap-2 md:gap-3 bg-white bg-opacity-5 rounded-lg p-2 md:p-3">
                          <div 
                            className="w-3 h-3 md:w-4 md:h-4 rounded-full flex-shrink-0"
                            style={{ backgroundColor: dept.color }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-medium text-sm md:text-base truncate">{dept.name}</div>
                            <div className="text-orange-200 text-xs md:text-sm">{dept.wins} elite wins ({dept.percentage}%)</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeChart === 'timeline' && (
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">Elite Wins Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#E5E7EB" 
                      fontSize={10}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#E5E7EB" fontSize={10} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: 'none', 
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '12px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="wins" 
                      stroke="#FFD700" 
                      strokeWidth={3}
                      dot={{ fill: '#FFD700', strokeWidth: 2, r: 4 }}
                      name="Daily Elite Wins"
                      animationDuration={1500}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cumulative" 
                      stroke="#FF6B35" 
                      strokeWidth={3}
                      dot={{ fill: '#FF6B35', strokeWidth: 2, r: 4 }}
                      name="Cumulative Elite Wins"
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Insights */}
          <div className="mt-6 md:mt-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl md:rounded-2xl p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" />
              Elite Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-white">
              <div className="bg-white bg-opacity-10 rounded-lg p-3 md:p-4">
                <p className="font-semibold text-sm md:text-base">Most Elite Department</p>
                <p className="text-xs md:text-sm opacity-90">
                  {topDepartment?.name} leads with {topDepartment?.wins} elite winners ({topDepartment?.percentage}% of total)
                </p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-3 md:p-4">
                <p className="font-semibold text-sm md:text-base">Elite Progress</p>
                <p className="text-xs md:text-sm opacity-90">
                  {totalWins} total elite winners selected across {departmentData.length} departments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confetti Animation */}
      <ConfettiAnimation isActive={showConfetti} />
    </>
  );
};

export default EliteWinnersDashboard;