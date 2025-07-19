import React, { useState, useRef } from 'react';
import { Download, Upload, RotateCcw, Save, X, CheckCircle, AlertTriangle, Database, Clock, Lock } from 'lucide-react';
import { Winner, Loser, EliteSpiral } from '../config/data';

// Admin password for backup/restore operations
const BACKUP_ADMIN_PASSWORD = "InternationalMessaging@20";

interface BackupRestoreProps {
  isOpen: boolean;
  onClose: () => void;
  winners: Winner[];
  losers: Loser[];
  eliteWinners: EliteSpiral[];
  onRestoreWinners: (winners: Winner[], losers?: Loser[], eliteWinners?: EliteSpiral[]) => void;
  isLoggedIn?: boolean;
}

interface BackupData {
  version: string;
  timestamp: string;
  totalWinners: number;
  totalLosers: number;
  totalEliteWinners: number;
  departments: string[];
  winners: Winner[];
  losers: Loser[];
  eliteWinners: EliteSpiral[];
  metadata: {
    exportedBy: string;
    applicationVersion: string;
    databaseSchema: string;
  };
}

const BackupRestore: React.FC<BackupRestoreProps> = ({ 
  isOpen, 
  onClose, 
  winners, 
  losers,
  eliteWinners,
  onRestoreWinners,
  isLoggedIn = false
}) => {
  const [activeTab, setActiveTab] = useState<'backup' | 'restore'>('backup');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processSuccess, setProcessSuccess] = useState(false);
  const [restorePreview, setRestorePreview] = useState<BackupData | null>(null);
  const [error, setError] = useState<string>('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [pendingAction, setPendingAction] = useState<'backup' | 'restore' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const validatePassword = (inputPassword: string): boolean => {
    return inputPassword === BACKUP_ADMIN_PASSWORD;
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePassword(password)) {
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError('');
      
      if (pendingAction === 'backup') {
        performBackup();
      } else if (pendingAction === 'restore') {
        performRestore();
      }
      setPendingAction(null);
    } else {
      setPasswordError('Invalid password. Access denied.');
    }
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    setPassword('');
    setPasswordError('');
    setPendingAction(null);
  };

  const createBackup = () => {
    const backupData: BackupData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      totalWinners: winners.length,
      totalLosers: losers.length,
      totalEliteWinners: eliteWinners.length,
      departments: [...new Set([...winners.map(w => w.department), ...losers.map(l => l.department), ...eliteWinners.map(e => e.department)])],
      winners: winners,
      losers: losers,
      eliteWinners: eliteWinners,
      metadata: {
        exportedBy: 'Stitch n Pitch Contest System',
        applicationVersion: '1.0.0',
        databaseSchema: 'winners_losers_elite_v3'
      }
    };

    return backupData;
  };

  const downloadBackup = () => {
    if (isLoggedIn) {
      performBackup();
    } else {
      setPendingAction('backup');
      setShowPasswordModal(true);
    }
  };

  const performBackup = async () => {
    setIsProcessing(true);
    setError('');

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));

      const backupData = createBackup();
      const jsonString = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      const timestamp = new Date().toISOString().split('T')[0];
      
      link.setAttribute('href', url);
      link.setAttribute('download', `stitch-n-pitch-backup-${timestamp}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setProcessSuccess(true);
      setTimeout(() => {
        setProcessSuccess(false);
      }, 3000);

    } catch (error) {
      setError('Failed to create backup. Please try again.');
      console.error('Backup error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      setError('Please select a valid JSON backup file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const backupData: BackupData = JSON.parse(content);
        
        // Validate backup structure
        if (!backupData.version || !backupData.winners || !Array.isArray(backupData.winners) || !backupData.eliteWinners) {
          throw new Error('Invalid backup file structure');
        }

        setRestorePreview(backupData);
        setError('');
      } catch (error) {
        setError('Invalid backup file. Please select a valid Stitch n Pitch backup.');
        setRestorePreview(null);
      }
    };

    reader.readAsText(file);
  };

  const initiateRestore = () => {
    if (!restorePreview) return;
    if (isLoggedIn) {
      performRestore();
    } else {
      setPendingAction('restore');
      setShowPasswordModal(true);
    }
  };

  const performRestore = async () => {
    if (!restorePreview) return;

    setIsProcessing(true);
    setError('');

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Validate winners data
      const validWinners = restorePreview.winners.filter(winner => 
        winner.name && winner.department && winner.supervisor && winner.timestamp
      );
      
      const validLosers = restorePreview.losers ? restorePreview.losers.filter(loser => 
        loser.name && loser.department && loser.supervisor && loser.timestamp
      ) : [];
      
      const validEliteWinners = restorePreview.eliteWinners ? restorePreview.eliteWinners.filter(elite => 
        elite.name && elite.department && elite.supervisor && elite.timestamp
      ) : [];

      if (validWinners.length !== restorePreview.winners.length || 
          (restorePreview.losers && validLosers.length !== restorePreview.losers.length) ||
          (restorePreview.eliteWinners && validEliteWinners.length !== restorePreview.eliteWinners.length)) {
        console.warn('Some invalid records were filtered out');
      }

      onRestoreWinners(
        validWinners, 
        validLosers.length > 0 ? validLosers : undefined,
        validEliteWinners.length > 0 ? validEliteWinners : undefined
      );
      setProcessSuccess(true);
      
      setTimeout(() => {
        setProcessSuccess(false);
        setRestorePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        onClose();
      }, 3000);

    } catch (error) {
      setError('Failed to restore data. Please try again.');
      console.error('Restore error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const resetRestore = () => {
    setRestorePreview(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <style>
        {`
          .backup-modal-enter {
            animation: backup-modal-enter 0.5s ease-out;
          }
          
          @keyframes backup-modal-enter {
            0% { 
              opacity: 0; 
              transform: scale(0.9) translateY(20px);
            }
            100% { 
              opacity: 1; 
              transform: scale(1) translateY(0);
            }
          }
          
          .processing-pulse {
            animation: processing-pulse 1.5s ease-in-out infinite;
          }
          
          @keyframes processing-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          .success-scale {
            animation: success-scale 0.6s ease-out;
          }
          
          @keyframes success-scale {
            0% { transform: scale(0); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          
          .file-drop-zone {
            transition: all 0.3s ease;
            border: 2px dashed rgba(255, 255, 255, 0.3);
          }
          
          .file-drop-zone:hover {
            border-color: rgba(59, 130, 246, 0.6);
            background-color: rgba(59, 130, 246, 0.1);
          }
        `}
      </style>

      {/* Password Modal - Higher z-index */}
      {showPasswordModal && !isLoggedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 bg-opacity-20 rounded-xl backdrop-blur-sm">
                  <Lock className="w-6 h-6 text-purple-300" />
                </div>
                <h2 className="text-2xl font-bold text-white">Admin Access Required</h2>
              </div>
              <button
                onClick={handlePasswordModalClose}
                className="text-white hover:text-gray-200 transition-colors bg-white bg-opacity-10 rounded-full p-2 hover:bg-opacity-20 backdrop-blur-sm"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-white text-opacity-90 mb-4">
                Enter admin password to {pendingAction === 'backup' ? 'create backup' : 'restore data'}.
              </p>
              <form onSubmit={handlePasswordSubmit}>
                <label htmlFor="backup-password" className="block text-sm font-medium text-white text-opacity-90 mb-2">
                  Admin Password
                </label>
                <input
                  type="password"
                  id="backup-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white placeholder-opacity-60 backdrop-blur-sm"
                  placeholder="Enter admin password"
                  autoFocus
                />
                
                {passwordError && (
                  <div className="mt-3 p-3 bg-red-500 bg-opacity-20 border border-red-400 border-opacity-50 text-red-200 rounded-lg backdrop-blur-sm">
                    {passwordError}
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handlePasswordModalClose}
                    className="flex-1 py-3 px-4 bg-white bg-opacity-10 border border-white border-opacity-20 text-white rounded-xl hover:bg-opacity-20 transition-colors backdrop-blur-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-purple-600 bg-opacity-80 text-white rounded-xl hover:bg-opacity-90 transition-colors backdrop-blur-sm border border-purple-500 border-opacity-50"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Backup Modal - Lower z-index */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl backup-modal-enter"
          onClick={handleModalClick}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl">
                <Database className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Backup & Restore</h1>
                <p className="text-blue-200">Manage your contest data safely</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors bg-white bg-opacity-10 rounded-full p-3 hover:bg-opacity-20 backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-2 flex gap-2">
              <button
                onClick={() => setActiveTab('backup')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-colors ${
                  activeTab === 'backup'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-blue-200 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Download className="w-5 h-5" />
                Create Backup
              </button>
              <button
                onClick={() => setActiveTab('restore')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-colors ${
                  activeTab === 'restore'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-blue-200 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Upload className="w-5 h-5" />
                Restore Data
              </button>
            </div>
          </div>

          {/* Backup Tab */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              {/* Current Data Summary */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Save className="w-6 h-6" />
                  Current Data Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-4 text-white">
                    <div className="text-2xl font-bold">{winners.length}</div>
                    <div className="text-blue-100">Total Winners</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white">
                    <div className="text-2xl font-bold">{losers.length}</div>
                    <div className="text-green-100">Total Losers</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-4 text-white">
                    <div className="text-2xl font-bold">{eliteWinners.length}</div>
                    <div className="text-purple-100">Elite Winners</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-600 rounded-xl p-4 text-white">
                    <div className="text-2xl font-bold">{[...new Set([...winners.map(w => w.department), ...losers.map(l => l.department), ...eliteWinners.map(e => e.department)])].length}</div>
                    <div className="text-orange-100">Departments</div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-xl p-4 text-white">
                    <div className="text-lg font-bold">
                      {[...winners, ...losers, ...eliteWinners].length > 0 
                        ? new Date(Math.max(...[...winners, ...losers, ...eliteWinners].map(w => new Date(w.timestamp).getTime()))).toLocaleDateString()
                        : 'No data'
                      }
                    </div>
                    <div className="text-pink-100">Last Activity</div>
                  </div>
                </div>
              </div>

              {/* Backup Information */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">What's Included in Backup</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-200">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Complete winner records</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Complete loser records</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Complete elite winner records</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Timestamps and metadata</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Chat IDs for all entries</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Department information</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Supervisor details</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Version information</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Backup Button */}
              <div className="text-center">
                {processSuccess ? (
                  <div className="flex items-center justify-center gap-3 bg-green-500 text-white px-8 py-4 rounded-xl success-scale">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold">Backup Created Successfully!</span>
                  </div>
                ) : (
                  <button
                    onClick={downloadBackup}
                    disabled={isProcessing}
                    className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${
                      isProcessing
                        ? 'bg-gray-500 cursor-not-allowed processing-pulse'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg'
                    } text-white mx-auto`}
                  >
                    <Download className={"w-6 h-6 " + (isProcessing ? 'animate-bounce' : '')} />
                    {isProcessing ? 'Creating Backup...' : 'Download Backup File'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Restore Tab */}
          {activeTab === 'restore' && (
            <div className="space-y-6">
              {/* File Upload */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Upload className="w-6 h-6" />
                  Select Backup File
                </h3>
                
                <div className="file-drop-zone rounded-xl p-8 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="backup-file-input"
                  />
                  <label
                    htmlFor="backup-file-input"
                    className="cursor-pointer flex flex-col items-center gap-4"
                  >
                    <div className="p-4 bg-white bg-opacity-10 rounded-full">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-2">Click to select backup file</p>
                      <p className="text-blue-200 text-sm">Only .json backup files are supported</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-500 bg-opacity-20 border border-red-400 border-opacity-50 rounded-xl p-4 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-300" />
                  <span className="text-red-200">{error}</span>
                </div>
              )}

              {/* Restore Preview */}
              {restorePreview && (
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-6 h-6" />
                    Backup Preview
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-blue-200">
                        <span>Backup Date:</span>
                        <span className="text-white font-medium">
                          {new Date(restorePreview.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-blue-200">
                        <span>Total Winners:</span>
                        <span className="text-white font-medium">{restorePreview.totalWinners}</span>
                      </div>
                      <div className="flex justify-between text-blue-200">
                        <span>Total Losers:</span>
                        <span className="text-white font-medium">{restorePreview.totalLosers}</span>
                      </div>
                      <div className="flex justify-between text-blue-200">
                        <span>Elite Winners:</span>
                        <span className="text-white font-medium">{restorePreview.totalEliteWinners || 0}</span>
                      </div>
                      <div className="flex justify-between text-blue-200">
                        <span>Departments:</span>
                        <span className="text-white font-medium">{restorePreview.departments.length}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-blue-200">
                        <span>Version:</span>
                        <span className="text-white font-medium">{restorePreview.version}</span>
                      </div>
                      <div className="flex justify-between text-blue-200">
                        <span>Current Winners:</span>
                        <span className="text-white font-medium">{winners.length}</span>
                      </div>
                      <div className="flex justify-between text-blue-200">
                        <span>Current Elite:</span>
                        <span className="text-white font-medium">{eliteWinners.length}</span>
                      </div>
                      <div className="flex justify-between text-blue-200">
                        <span>Action:</span>
                        <span className="text-yellow-300 font-medium">Replace Current Data</span>
                      </div>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="bg-yellow-500 bg-opacity-20 border border-yellow-400 border-opacity-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-300" />
                      <div>
                        <p className="text-yellow-200 font-semibold">Warning</p>
                        <p className="text-yellow-100 text-sm">
                          This will replace all current contest data (winners, losers, elite winners). Make sure to create a backup first if needed.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Restore Actions */}
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={resetRestore}
                      className="flex items-center gap-2 px-6 py-3 bg-white bg-opacity-10 text-white rounded-xl hover:bg-opacity-20 transition-colors"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Cancel
                    </button>
                    
                    {processSuccess ? (
                      <div className="flex items-center gap-3 bg-green-500 text-white px-6 py-3 rounded-xl success-scale">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Restore Successful!</span>
                      </div>
                    ) : (
                      <button
                        onClick={initiateRestore}
                        disabled={isProcessing}
                        className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                          isProcessing
                            ? 'bg-gray-500 cursor-not-allowed processing-pulse'
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg'
                        } text-white`}
                      >
                        <Upload className={`w-5 h-5 ${isProcessing ? 'animate-bounce' : ''}`} />
                        {isProcessing ? 'Restoring...' : 'Restore Data'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BackupRestore;