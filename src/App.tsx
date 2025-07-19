import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import LoginPortal from './components/LoginPortal';
import RandomGuideSelector from './components/RandomGuideSelector';
import PasswordModal from './components/PasswordModal';
import WinnerDisplay from './components/WinnerDisplay';
import WinnerHistory from './components/WinnerHistory';
import EliteSpiralPanel from './components/EliteSpiralPanel';
import WinHistoryDashboard from './components/WinHistoryDashboard';
import EliteWinnersDashboard from './components/EliteWinnersDashboard';
import ExportData from './components/ExportData';
import BackupRestore from './components/BackupRestore';
import ConfettiAnimation from './components/ConfettiAnimation';
import FailAnimation from './components/FailAnimation';
import DynamicOrbs from './components/DynamicOrbs';
import Navigation from './components/Navigation';
import { Guide, Winner, Loser, EliteSpiral } from './config/data';

type AppTab = 'selection' | 'winners' | 'elite-spiral';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTab, setCurrentTab] = useState<AppTab>('selection');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [currentWinner, setCurrentWinner] = useState<Winner | null>(null);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [losers, setLosers] = useState<Loser[]>([]);
  const [eliteWinners, setEliteWinners] = useState<EliteSpiral[]>([]);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFailAnimation, setShowFailAnimation] = useState(false);
  const [failedGuideName, setFailedGuideName] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedChatIds, setSelectedChatIds] = useState<string[]>([]);
  
  // New modal states
  const [isWinHistoryDashboardOpen, setIsWinHistoryDashboardOpen] = useState(false);
  const [isExportDataOpen, setIsExportDataOpen] = useState(false);
  const [isBackupRestoreOpen, setIsBackupRestoreOpen] = useState(false);

  // Load winners from Supabase on component mount
  useEffect(() => {
    loadWinners();
    loadLosers();
    loadEliteWinners();
  }, []);

  // Handle login
  const handleLogin = (success: boolean) => {
    if (success) {
      setIsLoggedIn(true);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentTab('selection');
  };

  const loadWinners = async () => {
    try {
      const { data, error } = await supabase
        .from('winners')
        .select('*')
        .order('created_at', { ascending: true }); // Changed to ascending order

      if (error) {
        console.error('Error loading winners:', error);
        // Fallback to localStorage if Supabase fails
        const savedWinners = localStorage.getItem('stitchAndPitchWinners');
        if (savedWinners) {
          const localWinners = JSON.parse(savedWinners);
          // Sort local winners by timestamp in ascending order
          localWinners.sort((a: Winner, b: Winner) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
          setWinners(localWinners);
        }
      } else {
        setWinners(data || []);
        // Also sync to localStorage as backup
        localStorage.setItem('stitchAndPitchWinners', JSON.stringify(data || []));
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      // Fallback to localStorage
      const savedWinners = localStorage.getItem('stitchAndPitchWinners');
      if (savedWinners) {
        const localWinners = JSON.parse(savedWinners);
        // Sort local winners by timestamp in ascending order
        localWinners.sort((a: Winner, b: Winner) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        setWinners(localWinners);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadLosers = async () => {
    try {
      const { data, error } = await supabase
        .from('losers')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading losers:', error);
        // Fallback to localStorage if Supabase fails
        const savedLosers = localStorage.getItem('stitchAndPitchLosers');
        if (savedLosers) {
          const localLosers = JSON.parse(savedLosers);
          localLosers.sort((a: Loser, b: Loser) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
          setLosers(localLosers);
        }
      } else {
        setLosers(data || []);
        localStorage.setItem('stitchAndPitchLosers', JSON.stringify(data || []));
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      const savedLosers = localStorage.getItem('stitchAndPitchLosers');
      if (savedLosers) {
        const localLosers = JSON.parse(savedLosers);
        localLosers.sort((a: Loser, b: Loser) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        setLosers(localLosers);
      }
    }
  };

  const loadEliteWinners = async () => {
    try {
      const { data, error } = await supabase
        .from('elite_spiral')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading elite winners:', error);
        // Fallback to localStorage if Supabase fails
        const savedEliteWinners = localStorage.getItem('stitchAndPitchEliteWinners');
        if (savedEliteWinners) {
          const localEliteWinners = JSON.parse(savedEliteWinners);
          localEliteWinners.sort((a: EliteSpiral, b: EliteSpiral) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
          setEliteWinners(localEliteWinners);
        }
      } else {
        setEliteWinners(data || []);
        localStorage.setItem('stitchAndPitchEliteWinners', JSON.stringify(data || []));
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      const savedEliteWinners = localStorage.getItem('stitchAndPitchEliteWinners');
      if (savedEliteWinners) {
        const localEliteWinners = JSON.parse(savedEliteWinners);
        localEliteWinners.sort((a: EliteSpiral, b: EliteSpiral) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        setEliteWinners(localEliteWinners);
      }
    }
  };
  const saveWinnerToDatabase = async (winner: Winner) => {
    try {
      const { data, error } = await supabase
        .from('winners')
        .insert([{
          guide_id: winner.guide_id,
          name: winner.name,
          department: winner.department,
          supervisor: winner.supervisor,
          timestamp: winner.timestamp,
          chat_ids: winner.chat_ids || []
        }])
        .select()
        .single();

      if (error) {
        console.error('Error saving winner to database:', error);
        // Fallback to localStorage
        const updatedWinners = [...winners, winner].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        setWinners(updatedWinners);
        localStorage.setItem('stitchAndPitchWinners', JSON.stringify(updatedWinners));
      } else {
        // Reload winners from database to get the latest data
        await loadWinners();
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      // Fallback to localStorage
      const updatedWinners = [...winners, winner].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      setWinners(updatedWinners);
      localStorage.setItem('stitchAndPitchWinners', JSON.stringify(updatedWinners));
    }
  };

  const saveLoserToDatabase = async (loser: Loser) => {
    try {
      const { data, error } = await supabase
        .from('losers')
        .insert([{
          guide_id: loser.guide_id,
          name: loser.name,
          department: loser.department,
          supervisor: loser.supervisor,
          timestamp: loser.timestamp,
          chat_ids: loser.chat_ids || []
        }])
        .select()
        .single();

      if (error) {
        console.error('Error saving loser to database:', error);
        // Fallback to localStorage
        const updatedLosers = [...losers, loser].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        setLosers(updatedLosers);
        localStorage.setItem('stitchAndPitchLosers', JSON.stringify(updatedLosers));
      } else {
        // Reload losers from database to get the latest data
        await loadLosers();
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      // Fallback to localStorage
      const updatedLosers = [...losers, loser].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      setLosers(updatedLosers);
      localStorage.setItem('stitchAndPitchLosers', JSON.stringify(updatedLosers));
    }
  };

  const deleteWinnerFromDatabase = async (winnerId: string) => {
    try {
      const { error } = await supabase
        .from('winners')
        .delete()
        .eq('id', winnerId);

      if (error) {
        console.error('Error deleting winner from database:', error);
        // Fallback to localStorage
        const updatedWinners = winners.filter(winner => winner.id !== winnerId);
        setWinners(updatedWinners);
        localStorage.setItem('stitchAndPitchWinners', JSON.stringify(updatedWinners));
      } else {
        // Reload winners from database to get the latest data
        await loadWinners();
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      // Fallback to localStorage
      const updatedWinners = winners.filter(winner => winner.id !== winnerId);
      setWinners(updatedWinners);
      localStorage.setItem('stitchAndPitchWinners', JSON.stringify(updatedWinners));
    }
  };

  const handleRestoreWinners = async (restoredWinners: Winner[], restoredLosers?: Loser[], restoredEliteWinners?: EliteSpiral[]) => {
    try {
      // First, purge existing data in correct order (respecting foreign key constraints)
      if (restoredEliteWinners) {
        const { error: eliteError } = await supabase
          .from('elite_spiral')
          .delete()
          .gte('created_at', '1900-01-01');
      }
      
      if (restoredLosers) {
        const { error: losersError } = await supabase
          .from('losers')
          .delete()
          .gte('created_at', '1900-01-01');
      }
      
      const { error: winnersError } = await supabase
        .from('winners')
        .delete()
        .gte('created_at', '1900-01-01');

      // Insert winners first and create mapping of old IDs to new IDs
      const winnerIdMapping: { [oldId: string]: string } = {};
      
      for (const winner of restoredWinners) {
        const oldId = winner.id;
        try {
          const { data, error } = await supabase
            .from('winners')
            .insert([{
              guide_id: winner.guide_id,
              name: winner.name,
              department: winner.department,
              supervisor: winner.supervisor,
              timestamp: winner.timestamp,
              chat_ids: winner.chat_ids || []
            }])
            .select()
            .single();

          if (error) {
            console.error('Error saving winner to database:', error);
          } else if (data && oldId) {
            winnerIdMapping[oldId] = data.id;
          }
        } catch (error) {
          console.error('Error connecting to database:', error);
        }
      }
      
      if (restoredLosers) {
        for (const loser of restoredLosers) {
          await saveLoserToDatabase(loser);
        }
      }
      
      if (restoredEliteWinners) {
        for (const elite of restoredEliteWinners) {
          // Update winner_id with the new mapped ID
          const updatedElite = {
            ...elite,
            winner_id: elite.winner_id && winnerIdMapping[elite.winner_id] 
              ? winnerIdMapping[elite.winner_id] 
              : null
          };
          await saveEliteWinnerToDatabase(updatedElite);
        }
      }
      
      // Reload to get fresh data
      await loadWinners();
      await loadLosers();
      await loadEliteWinners();
    } catch (error) {
      console.error('Error restoring winners:', error);
      // Fallback to localStorage
      setWinners(restoredWinners);
      localStorage.setItem('stitchAndPitchWinners', JSON.stringify(restoredWinners));
      if (restoredLosers) {
        setLosers(restoredLosers);
        localStorage.setItem('stitchAndPitchLosers', JSON.stringify(restoredLosers));
      }
      if (restoredEliteWinners) {
        setEliteWinners(restoredEliteWinners);
        localStorage.setItem('stitchAndPitchEliteWinners', JSON.stringify(restoredEliteWinners));
      }
    }
  };

  const saveEliteWinnerToDatabase = async (elite: EliteSpiral) => {
    try {
      const { data, error } = await supabase
        .from('elite_spiral')
        .insert([{
          winner_id: elite.winner_id,
          guide_id: elite.guide_id,
          name: elite.name,
          department: elite.department,
          supervisor: elite.supervisor,
          timestamp: elite.timestamp,
          chat_ids: elite.chat_ids || []
        }])
        .select()
        .single();

      if (error) {
        console.error('Error saving elite winner to database:', error);
        // Fallback to localStorage
        const updatedEliteWinners = [...eliteWinners, elite].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        setEliteWinners(updatedEliteWinners);
        localStorage.setItem('stitchAndPitchEliteWinners', JSON.stringify(updatedEliteWinners));
      } else {
        // Reload elite winners from database to get the latest data
        await loadEliteWinners();
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      // Fallback to localStorage
      const updatedEliteWinners = [...eliteWinners, elite].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      setEliteWinners(updatedEliteWinners);
      localStorage.setItem('stitchAndPitchEliteWinners', JSON.stringify(updatedEliteWinners));
    }
  };

  const deleteEliteWinnerFromDatabase = async (eliteWinnerId: string) => {
    try {
      const { error } = await supabase
        .from('elite_spiral')
        .delete()
        .eq('id', eliteWinnerId);

      if (error) {
        console.error('Error deleting elite winner from database:', error);
        // Fallback to localStorage
        const updatedEliteWinners = eliteWinners.filter(elite => elite.id !== eliteWinnerId);
        setEliteWinners(updatedEliteWinners);
        localStorage.setItem('stitchAndPitchEliteWinners', JSON.stringify(updatedEliteWinners));
      } else {
        // Reload elite winners from database to get the latest data
        await loadEliteWinners();
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      // Fallback to localStorage
      const updatedEliteWinners = eliteWinners.filter(elite => elite.id !== eliteWinnerId);
      setEliteWinners(updatedEliteWinners);
      localStorage.setItem('stitchAndPitchEliteWinners', JSON.stringify(updatedEliteWinners));
    }
  };
  
  const handleGuideSelected = (guide: Guide) => {
    // Extract chat IDs from the guide object if they exist
    const { chatIds, ...guideData } = guide as Guide & { chatIds?: string[] };
    setSelectedGuide(guideData);
    setSelectedChatIds(chatIds || []);
    setIsPasswordModalOpen(true);
  };

  const handlePasswordConfirm = async (action: 'pass' | 'fail') => {
    setIsPasswordModalOpen(false);
    
    if (action === 'pass' && selectedGuide) {
      // Create winner object
      const winner: Winner = {
        guide_id: selectedGuide.id,
        name: selectedGuide.name,
        department: selectedGuide.department,
        supervisor: selectedGuide.supervisor,
        timestamp: new Date().toISOString(),
        chat_ids: selectedChatIds
      };
      
      // Save to database
      await saveWinnerToDatabase(winner);
      setCurrentWinner(winner);
      setShowConfetti(true);
      
      // Winner display and confetti will stay until manually closed
    } else if (action === 'fail' && selectedGuide) {
      // Create loser object
      const loser: Loser = {
        guide_id: selectedGuide.id,
        name: selectedGuide.name,
        department: selectedGuide.department,
        supervisor: selectedGuide.supervisor,
        timestamp: new Date().toISOString(),
        chat_ids: selectedChatIds
      };
      
      // Save loser to database
      await saveLoserToDatabase(loser);
      
      // Show fail animation
      setFailedGuideName(selectedGuide.name);
      setShowFailAnimation(true);
      
      // Fail animation will stay until manually closed
    }
    
    // Reset selected guide
    setSelectedGuide(null);
    setSelectedChatIds([]);
  };

  const handleCloseWinner = () => {
    setShowConfetti(false);
    setCurrentWinner(null);
  };

  const handleCloseFail = () => {
    setShowFailAnimation(false);
    setFailedGuideName('');
  };

  // Show login portal if not logged in
  if (!isLoggedIn) {
    return <LoginPortal onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/stitch-n-pitch-logo.png" 
              alt="Stitch n Pitch Logo" 
              className="h-20 w-auto animate-pulse"
            />
          </div>
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading Stitch n Pitch contest data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Dynamic Orbs Background */}
      <DynamicOrbs />

      {/* Navigation */}
      <Navigation
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        winnerCount={winners.length}
        eliteWinnerCount={eliteWinners.length}
        onOpenWinHistoryDashboard={() => setIsWinHistoryDashboardOpen(true)}
        onOpenExportData={() => setIsExportDataOpen(true)}
        onOpenBackupRestore={() => setIsBackupRestoreOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="relative z-10">
        {currentTab === 'selection' && (
          <RandomGuideSelector 
            onGuideSelected={handleGuideSelected} 
            winners={winners}
          />
        )}

        {currentTab === 'elite-spiral' && (
          <EliteSpiralPanel 
            winners={winners} 
            eliteWinners={eliteWinners}
            onEliteWinnerAdded={saveEliteWinnerToDatabase}
          />
        )}
        {currentTab === 'winners' && (
          <WinnerHistory 
            winners={winners} 
            eliteWinners={eliteWinners}
            onDeleteWinner={deleteWinnerFromDatabase}
            onDeleteEliteWinner={deleteEliteWinnerFromDatabase}
          />
        )}
      </div>

      {/* Winner Display Overlay */}
      {currentWinner && (
        <WinnerDisplay
          winner={currentWinner}
          onBack={handleCloseWinner}
        />
      )}

      {/* Password Modal */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
          setSelectedGuide(null);
          setSelectedChatIds([]);
        }}
        onConfirm={(action) => {
          handlePasswordConfirm(action);
        }}
        guideName={selectedGuide?.name || ''}
        chatIds={selectedChatIds}
        skipPasswordValidation={true}
      />

      {/* New Feature Modals */}
      <WinHistoryDashboard
        isOpen={isWinHistoryDashboardOpen}
        onClose={() => setIsWinHistoryDashboardOpen(false)}
        winners={winners}
        eliteWinners={eliteWinners}
      />

      <ExportData
        isOpen={isExportDataOpen}
        onClose={() => setIsExportDataOpen(false)}
        winners={winners}
        losers={losers}
        eliteWinners={eliteWinners}
      />

      <BackupRestore
        isOpen={isBackupRestoreOpen}
        onClose={() => setIsBackupRestoreOpen(false)}
        winners={winners}
        losers={losers}
        eliteWinners={eliteWinners}
        onRestoreWinners={handleRestoreWinners}
      />

      {/* Confetti Animation */}
      <ConfettiAnimation isActive={showConfetti} />

      {/* Fail Animation */}
      <FailAnimation 
        isActive={showFailAnimation} 
        guideName={failedGuideName}
        onClose={handleCloseFail}
      />
    </div>
  );
}

export default App;