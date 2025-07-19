import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { PieChart as PieChartIcon, BarChart3, Calendar, Trophy, Users, X, Sparkles, Crown, ToggleLeft, ToggleRight, TrendingUp } from 'lucide-react';
import { Winner, EliteSpiral, DEPARTMENTS } from '../config/data';
import ConfettiAnimation from './ConfettiAnimation';

interface WinHistoryDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  winners: Winner[];
  eliteWinners?: EliteSpiral[];
}

interface DepartmentData {
  name: string;
  wins: number;
  color: string;
  percentage: number;
}

// Department colors - consistent throughout the application
const DEPARTMENT_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#06B6D4', '#F97316', '#EC4899', '#84CC16', '#6366F1',
  '#14B8A6', '#F43F5E', '#8B5A2B', '#6B7280', '#DC2626',
  '#7C3AED', '#059669', '#D97706', '#B91C1C', '#7C2D12'
];

const WinHistoryDashboard: React.FC<WinHistoryDashboardProps> = ({ 
  isOpen, 
  onClose, 
  winners, 
  eliteWinners = []
}) => {
  const [activeChart, setActiveChart] = useState<'bar' | 'pie'>('bar');
  const [showEliteAnalytics, setShowEliteAnalytics] = useState(false);
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

  // Reset animation when winners change
  useEffect(() => {
    if (isOpen) {
      setAnimationPhase(0);
      const timer = setTimeout(() => setAnimationPhase(3), 100);
      return () => clearTimeout(timer);
    }
  }, [winners.length]);

  if (!isOpen) return null;

  const currentData = showEliteAnalytics ? eliteWinners : winners;

  const departmentData: DepartmentData[] = DEPARTMENTS.map((dept, index) => {
    const wins = currentData.filter(winner => winner.department === dept).length;
    const percentage = currentData.length > 0 ? (wins / currentData.length) * 100 : 0;
    return {
      name: dept,
      wins,
      color: DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length],
      percentage: Math.round(percentage * 10) / 10
    };
  }).filter(dept => dept.wins > 0);

  const totalWins = currentData.length;
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
          .dashboard-enter {
            animation: dashboard-enter 0.8s ease-out;
          }
          
          @keyframes dashboard-enter {
            0% { 
              opacity: 0; 
              transform: scale(0.8) translateY(50px);
            }
            100% { 
              opacity: 1; 
              transform: scale(1) translateY(0);
            }
          }
          
          .chart-animate-1 {
            animation: chart-slide-in 0.6s ease-out 0.5s both;
          }
          
          .chart-animate-2 {
            animation: chart-slide-in 0.6s ease-out 1s both;
          }
          
          .chart-animate-3 {
            animation: chart-slide-in 0.6s ease-out 1.5s both;
          }
          
          @keyframes chart-slide-in {
            0% {
              opacity: 0;
              transform: translateX(-30px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .stat-card-animate {
            animation: stat-bounce 0.8s ease-out;
          }
          
          @keyframes stat-bounce {
            0% { transform: scale(0) rotate(-180deg); }
            50% { transform: scale(1.1) rotate(-90deg); }
            100% { transform: scale(1) rotate(0deg); }
          }
          
          .glow-effect {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          
          .pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }
          
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
            50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
          }

          /* Mobile responsive adjustments */
          @media (max-width: 768px) {
            .mobile-pie-chart {
              height: 300px !important;
            }
            
            .mobile-legend {
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
          className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 bg-opacity-95 backdrop-blur-xl border border-white border-opacity-20 rounded-3xl p-4 md:p-8 max-w-7xl w-full max-h-[90vh] overflow-y-auto shadow-2xl dashboard-enter"
          onClick={handleModalClick}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-2 md:gap-4">
              <div className={`p-2 md:p-3 rounded-xl md:rounded-2xl pulse-glow ${
                showEliteAnalytics 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}>
                {showEliteAnalytics ? (
                  <Crown className="w-6 h-6 md:w-8 md:h-8 text-white" />
                ) : (
                  <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-white" />
                )}
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-white flex items-center gap-1 md:gap-2">
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 animate-pulse" />
                  {showEliteAnalytics ? 'Elite Winners Dashboard' : 'Win History Dashboard'}
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 animate-pulse" />
                </h1>
                <p className={`text-sm md:text-lg ${showEliteAnalytics ? 'text-orange-200' : 'text-blue-200'}`}>
                  {showEliteAnalytics ? 'Elite spiral analytics and insights' : 'Visual analytics and insights'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {eliteWinners.length > 0 && (
                <button
                  onClick={() => setShowEliteAnalytics(!showEliteAnalytics)}
                  className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 rounded-xl font-semibold transition-all text-sm md:text-base ${
                    showEliteAnalytics
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-yellow-600 text-white hover:bg-yellow-700'
                  }`}
                >
                  {showEliteAnalytics ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                  {showEliteAnalytics ? 'Show Regular Winners' : 'Show Elite Winners'}
                </button>
              )}
              <button
                onClick={handleClose}
                className="text-white hover:text-gray-200 transition-colors bg-white bg-opacity-10 rounded-full p-2 md:p-3 hover:bg-opacity-20 backdrop-blur-sm"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8 ${animationPhase >= 1 ? 'chart-animate-1' : 'opacity-0'}`}>
            <div className={`rounded-xl md:rounded-2xl p-3 md:p-6 text-white stat-card-animate glow-effect ${
              showEliteAnalytics 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-600' 
                : 'bg-gradient-to-r from-blue-500 to-cyan-600'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs md:text-sm font-medium ${
                    showEliteAnalytics ? 'text-yellow-100' : 'text-blue-100'
                  }`}>
                    {showEliteAnalytics ? 'Elite Winners' : 'Total Winners'}
                  </p>
                  <p className="text-xl md:text-3xl font-bold">{totalWins}</p>
                </div>
                {showEliteAnalytics ? (
                  <Crown className="w-6 h-6 md:w-8 md:h-8 text-yellow-200" />
                ) : (
                  <Trophy className="w-6 h-6 md:w-8 md:h-8 text-blue-200" />
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl md:rounded-2xl p-3 md:p-6 text-white stat-card-animate glow-effect">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-xs md:text-sm font-medium">Departments</p>
                  <p className="text-xl md:text-3xl font-bold">{departmentData.length}</p>
                </div>
                <Users className="w-6 h-6 md:w-8 md:h-8 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-yellow-600 rounded-xl md:rounded-2xl p-3 md:p-6 text-white stat-card-animate glow-effect">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-xs md:text-sm font-medium">Top Department</p>
                  <p className="text-sm md:text-lg font-bold truncate">{topDepartment?.name || 'N/A'}</p>
                  <p className="text-xs md:text-sm text-orange-200">
                    {topDepartment?.wins || 0} {showEliteAnalytics ? 'elite wins' : 'wins'}
                  </p>
                </div>
                <PieChartIcon className="w-6 h-6 md:w-8 md:h-8 text-orange-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl md:rounded-2xl p-3 md:p-6 text-white stat-card-animate glow-effect">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-xs md:text-sm font-medium">
                    {showEliteAnalytics ? 'Latest Elite' : 'Latest Win'}
                  </p>
                  <p className="text-xs md:text-sm font-bold">
                    {currentData.length > 0 
                      ? new Date(Math.max(...currentData.map(w => new Date(w.timestamp).getTime()))).toLocaleDateString()
                      : 'N/A'
                    }
                  </p>
                </div>
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-purple-200" />
              </div>
            </div>
          </div>

          {/* Chart Type Selector */}
          <div className={`flex justify-center mb-6 md:mb-8 ${animationPhase >= 2 ? 'chart-animate-2' : 'opacity-0'}`}>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl md:rounded-2xl p-1 md:p-2 flex gap-1 md:gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveChart('bar')}
                className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all text-sm md:text-base whitespace-nowrap ${
                  activeChart === 'bar'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-blue-200 hover:text-white hover:bg-white hover:bg-opacity-10'
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
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'text-blue-200 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <PieChartIcon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Pie Chart</span>
                <span className="sm:hidden">Pie</span>
              </button>
            </div>
          </div>

          {/* Charts */}
          <div className={`bg-white bg-opacity-10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-8 ${animationPhase >= 3 ? 'chart-animate-3' : 'opacity-0'}`}>
            {activeChart === 'bar' && (
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">
                  {showEliteAnalytics ? 'Elite Wins by Department' : 'Wins by Department'}
                </h3>
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
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                      formatter={(value, name) => [value, showEliteAnalytics ? 'Elite Wins' : 'Wins']}
                      labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
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
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">
                  {showEliteAnalytics ? 'Elite Department Distribution' : 'Department Distribution'}
                </h3>
                <div className="flex flex-col lg:flex-row items-start gap-4 md:gap-8">
                  <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height={300} className="mobile-pie-chart">
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
                          label={({ name, value, percent }) => 
                            `${name}: ${value} (${(percent * 100).toFixed(1)}%)`
                          }
                          labelStyle={{ 
                            fontSize: '12px', 
                            fontWeight: 'bold', 
                            fill: 'white',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                          }}
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
                            color: '#ffffff',
                            fontSize: '14px',
                            fontWeight: 'bold'
                          }}
                          labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 w-full">
                    <h4 className="text-lg font-semibold text-white mb-4">Department Breakdown</h4>
                    <div className="space-y-2 md:space-y-3 mobile-legend">
                      {departmentData.map((dept, index) => (
                        <div key={dept.name} className="flex items-center gap-2 md:gap-3 bg-white bg-opacity-5 rounded-lg p-2 md:p-3">
                          <div 
                            className="w-3 h-3 md:w-4 md:h-4 rounded-full flex-shrink-0"
                            style={{ backgroundColor: dept.color }}
                          />
                          <div className="flex-1 min-w-0">
                            <>
                            <div className="text-white font-medium text-sm md:text-base truncate" style={{ color: '#ffffff' }}>{dept.name}</div>
                            <div className={`text-xs md:text-sm ${showEliteAnalytics ? 'text-orange-200' : 'text-blue-200'}`}>
                              {dept.wins} {showEliteAnalytics ? 'elite wins' : 'wins'} ({dept.percentage}%)
                            </div>
                            </>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Insights */}
          <div className={`mt-6 md:mt-8 rounded-xl md:rounded-2xl p-4 md:p-6 ${
            showEliteAnalytics 
              ? 'bg-gradient-to-r from-yellow-500 to-orange-600' 
              : 'bg-gradient-to-r from-indigo-500 to-purple-600'
          }`}>
            <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" />
              {showEliteAnalytics ? 'Elite Insights' : 'Key Insights'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-white">
              <div className="bg-white bg-opacity-10 rounded-lg p-3 md:p-4">
                <p className="font-semibold text-sm md:text-base">
                  {showEliteAnalytics ? 'Most Elite Department' : 'Most Active Department'}
                </p>
                <p className="text-xs md:text-sm opacity-90">
                  {topDepartment?.name} leads with {topDepartment?.wins} {showEliteAnalytics ? 'elite winners' : 'winners'} ({topDepartment?.percentage}% of total)
                </p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-3 md:p-4">
                <p className="font-semibold text-sm md:text-base">
                  {showEliteAnalytics ? 'Elite Progress' : 'Contest Progress'}
                </p>
                <p className="text-xs md:text-sm opacity-90">
                  Track your {showEliteAnalytics ? 'elite winner' : 'contest'} performance over time
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

export default WinHistoryDashboard;