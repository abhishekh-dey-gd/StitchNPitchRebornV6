import React from 'react';
import { Trophy, Home, BarChart3, Download, Database, Crown, LogOut } from 'lucide-react';

interface NavigationProps {
  currentTab: 'selection' | 'winners' | 'elite-spiral';
  onTabChange: (tab: 'selection' | 'winners' | 'elite-spiral') => void;
  winnerCount: number;
  eliteWinnerCount: number;
  onOpenWinHistoryDashboard: () => void;
  onOpenExportData: () => void;
  onOpenBackupRestore: () => void;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onTabChange,
  winnerCount,
  eliteWinnerCount,
  onOpenWinHistoryDashboard,
  onOpenExportData,
  onOpenBackupRestore,
  onLogout
}) => {
  const handleLogoClick = () => {
    onTabChange('selection');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black bg-opacity-20 backdrop-blur-md border-b border-white border-opacity-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Clickable */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <img 
                src="/stitch-n-pitch-logo.png" 
                alt="Stitch n Pitch Logo" 
                className="h-12 w-12 rounded-xl object-cover drop-shadow-lg border-2 border-white border-opacity-30"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">Stitch n Pitch Portal</h1>
            </div>
          </button>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onTabChange('selection')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                currentTab === 'selection'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-purple-200 hover:text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Selection</span>
            </button>

            <button
              onClick={() => onTabChange('winners')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all relative ${
                currentTab === 'winners'
                  ? 'bg-yellow-600 text-white shadow-lg'
                  : 'text-purple-200 hover:text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Winners</span>
              {winnerCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {winnerCount}
                </span>
              )}
            </button>

            {winnerCount > 0 && (
              <button
                onClick={() => onTabChange('elite-spiral')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  currentTab === 'elite-spiral'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                    : 'text-purple-200 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Crown className="w-4 h-4" />
                <span className="hidden sm:inline">Elite's Spiral</span>
                <span className="sm:hidden">Elite</span>
              </button>
            )}

            {/* New Feature Buttons */}
            {winnerCount > 0 && (
              <>
                <button
                  onClick={onOpenWinHistoryDashboard}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-purple-200 hover:text-white hover:bg-white hover:bg-opacity-10 transition-all"
                  title="Win History Dashboard"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Analytics</span>
                  {eliteWinnerCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      E
                    </span>
                  )}
                </button>

                <button
                  onClick={onOpenExportData}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-purple-200 hover:text-white hover:bg-white hover:bg-opacity-10 transition-all"
                  title="Export Data"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </button>

                <button
                  onClick={onOpenBackupRestore}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-purple-200 hover:text-white hover:bg-white hover:bg-opacity-10 transition-all"
                  title="Backup & Restore"
                >
                  <Database className="w-4 h-4" />
                  <span className="hidden sm:inline">Backup</span>
                </button>
              </>
            )}

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-red-200 hover:text-white hover:bg-red-500 hover:bg-opacity-20 transition-all"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;