import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Calendar, Users, Trophy, X, CheckCircle, Lock } from 'lucide-react';
import { Winner, Loser, EliteSpiral, GUIDES } from '../config/data';
import jsPDF from 'jspdf';

// Admin password for export operations
const EXPORT_ADMIN_PASSWORD = "InternationalMessaging@20";

interface ExportDataProps {
  isOpen: boolean;
  onClose: () => void;
  winners: Winner[];
  losers: Loser[];
  eliteWinners: EliteSpiral[];
  isLoggedIn?: boolean;
}

type ExportType = 'winners-csv' | 'winners-pdf' | 'losers-csv' | 'losers-pdf' | 'elite-csv' | 'elite-pdf' | 'guides-csv' | 'complete-data-csv';

const ExportData: React.FC<ExportDataProps> = ({ isOpen, onClose, winners, losers, eliteWinners, isLoggedIn = false }) => {
  const [selectedExport, setSelectedExport] = useState<ExportType>('winners-csv');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  if (!isOpen) return null;

  const exportOptions = [
    {
      id: 'winners-csv' as ExportType,
      title: 'Winners Data (CSV)',
      description: 'Export all winners data in CSV format',
      icon: FileSpreadsheet,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'winners-pdf' as ExportType,
      title: 'Winners Report (PDF)',
      description: 'Professional PDF report with winners',
      icon: FileText,
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 'losers-csv' as ExportType,
      title: 'Losers Data (CSV)',
      description: 'Export all losers data in CSV format',
      icon: FileSpreadsheet,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'losers-pdf' as ExportType,
      title: 'Losers Data (PDF)',
      description: 'Professional PDF report with losers',
      icon: FileText,
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'elite-csv' as ExportType,
      title: 'Elite Winners (CSV)',
      description: 'Export elite spiral winners in CSV format',
      icon: FileSpreadsheet,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'elite-pdf' as ExportType,
      title: 'Elite Winners (PDF)',
      description: 'Professional PDF report with elite winners',
      icon: FileText,
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'guides-csv' as ExportType,
      title: 'Full Guide Dump',
      description: 'Complete guide database for backup',
      icon: Users,
      color: 'from-orange-500 to-yellow-600'
    },
    {
      id: 'complete-data-csv' as ExportType,
      title: 'Full Winners and Losers Data',
      description: 'All winners, losers, and elite winners with complete data',
      icon: Trophy,
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const validatePassword = (inputPassword: string): boolean => {
    return inputPassword === EXPORT_ADMIN_PASSWORD;
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePassword(password)) {
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError('');
      performExport();
    } else {
      setPasswordError('Invalid password. Access denied.');
    }
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    setPassword('');
    setPasswordError('');
  };

  const generateCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape commas and quotes in CSV
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    
    // Header
    pdf.setFontSize(24);
    pdf.setTextColor(30, 58, 138); // Blue color
    pdf.text('Stitch n Pitch Contest', pageWidth / 2, 30, { align: 'center' });
    
    pdf.setFontSize(16);
    pdf.setTextColor(75, 85, 99); // Gray color
    pdf.text('Winners Report', pageWidth / 2, 45, { align: 'center' });
    
    // Date
    pdf.setFontSize(10);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 55, { align: 'center' });
    
    // Summary Statistics
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Summary Statistics', 20, 75);
    
    const departments = [...new Set(winners.map(w => w.department))];
    const stats = [
      `Total Winners: ${winners.length}`,
      `Departments Represented: ${departments.length}`,
      `Contest Period: ${winners.length > 0 ? 
        `${new Date(Math.min(...winners.map(w => new Date(w.timestamp).getTime()))).toLocaleDateString()} - ${new Date(Math.max(...winners.map(w => new Date(w.timestamp).getTime()))).toLocaleDateString()}` 
        : 'No winners yet'}`
    ];
    
    pdf.setFontSize(10);
    stats.forEach((stat, index) => {
      pdf.text(stat, 25, 90 + (index * 10));
    });
    
    // Department Breakdown
    pdf.setFontSize(14);
    pdf.text('Department Breakdown', 20, 130);
    
    const departmentCounts = departments.map(dept => ({
      department: dept,
      count: winners.filter(w => w.department === dept).length
    }));
    
    pdf.setFontSize(10);
    departmentCounts.forEach((dept, index) => {
      pdf.text(`${dept.department}: ${dept.count} winners`, 25, 145 + (index * 8));
    });
    
    // Winners List
    let yPosition = 145 + (departmentCounts.length * 8) + 20;
    
    if (yPosition > pageHeight - 50) {
      pdf.addPage();
      yPosition = 30;
    }
    
    pdf.setFontSize(14);
    pdf.text('Complete Winners List', 20, yPosition);
    yPosition += 15;
    
    pdf.setFontSize(9);
    winners.forEach((winner, index) => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 30;
      }
      
      const winnerText = `${index + 1}. ${winner.name} (${winner.department}) - ${new Date(winner.timestamp).toLocaleDateString()}`;
      pdf.text(winnerText, 25, yPosition);
      yPosition += 8;
    });
    
    // Footer
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }
    
    pdf.save(`stitch-n-pitch-winners-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const generateLosersPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    
    // Header
    pdf.setFontSize(24);
    pdf.setTextColor(30, 58, 138); // Blue color
    pdf.text('Stitch n Pitch Contest', pageWidth / 2, 30, { align: 'center' });
    
    pdf.setFontSize(16);
    pdf.setTextColor(75, 85, 99); // Gray color
    pdf.text('Losers Report', pageWidth / 2, 45, { align: 'center' });
    
    // Date
    pdf.setFontSize(10);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 55, { align: 'center' });
    
    // Summary Statistics
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Summary Statistics', 20, 75);
    
    const departments = [...new Set(losers.map(l => l.department))];
    const stats = [
      `Total Losers: ${losers.length}`,
      `Departments Represented: ${departments.length}`,
      `Contest Period: ${losers.length > 0 ? 
        `${new Date(Math.min(...losers.map(l => new Date(l.timestamp).getTime()))).toLocaleDateString()} - ${new Date(Math.max(...losers.map(l => new Date(l.timestamp).getTime()))).toLocaleDateString()}` 
        : 'No losers yet'}`
    ];
    
    pdf.setFontSize(10);
    stats.forEach((stat, index) => {
      pdf.text(stat, 25, 90 + (index * 10));
    });
    
    // Department Breakdown
    pdf.setFontSize(14);
    pdf.text('Department Breakdown', 20, 130);
    
    const departmentCounts = departments.map(dept => ({
      department: dept,
      count: losers.filter(l => l.department === dept).length
    }));
    
    pdf.setFontSize(10);
    departmentCounts.forEach((dept, index) => {
      pdf.text(`${dept.department}: ${dept.count} losers`, 25, 145 + (index * 8));
    });
    
    // Losers List
    let yPosition = 145 + (departmentCounts.length * 8) + 20;
    
    if (yPosition > pageHeight - 50) {
      pdf.addPage();
      yPosition = 30;
    }
    
    pdf.setFontSize(14);
    pdf.text('Complete Losers List', 20, yPosition);
    yPosition += 15;
    
    pdf.setFontSize(9);
    losers.forEach((loser, index) => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 30;
      }
      
      const loserText = `${index + 1}. ${loser.name} (${loser.department}) - ${new Date(loser.timestamp).toLocaleDateString()}`;
      pdf.text(loserText, 25, yPosition);
      yPosition += 8;
    });
    
    // Footer
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }
    
    pdf.save(`stitch-n-pitch-losers-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const generateElitePDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    
    // Header
    pdf.setFontSize(24);
    pdf.setTextColor(30, 58, 138); // Blue color
    pdf.text('Stitch n Pitch Contest', pageWidth / 2, 30, { align: 'center' });
    
    pdf.setFontSize(16);
    pdf.setTextColor(75, 85, 99); // Gray color
    pdf.text('Elite Winners Report', pageWidth / 2, 45, { align: 'center' });
    
    // Date
    pdf.setFontSize(10);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 55, { align: 'center' });
    
    // Summary Statistics
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Summary Statistics', 20, 75);
    
    const departments = [...new Set(eliteWinners.map(w => w.department))];
    const stats = [
      `Total Elite Winners: ${eliteWinners.length}`,
      `Departments Represented: ${departments.length}`,
      `Elite Period: ${eliteWinners.length > 0 ? 
        `${new Date(Math.min(...eliteWinners.map(w => new Date(w.timestamp).getTime()))).toLocaleDateString()} - ${new Date(Math.max(...eliteWinners.map(w => new Date(w.timestamp).getTime()))).toLocaleDateString()}` 
        : 'No elite winners yet'}`
    ];
    
    pdf.setFontSize(10);
    stats.forEach((stat, index) => {
      pdf.text(stat, 25, 90 + (index * 10));
    });
    
    // Department Breakdown
    pdf.setFontSize(14);
    pdf.text('Department Breakdown', 20, 130);
    
    const departmentCounts = departments.map(dept => ({
      department: dept,
      count: eliteWinners.filter(w => w.department === dept).length
    }));
    
    pdf.setFontSize(10);
    departmentCounts.forEach((dept, index) => {
      pdf.text(`${dept.department}: ${dept.count} elite winners`, 25, 145 + (index * 8));
    });
    
    // Elite Winners List
    let yPosition = 145 + (departmentCounts.length * 8) + 20;
    
    if (yPosition > pageHeight - 50) {
      pdf.addPage();
      yPosition = 30;
    }
    
    pdf.setFontSize(14);
    pdf.text('Complete Elite Winners List', 20, yPosition);
    yPosition += 15;
    
    pdf.setFontSize(9);
    eliteWinners.forEach((winner, index) => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 30;
      }
      
      const winnerText = `${index + 1}. ${winner.name} (${winner.department}) - ${new Date(winner.timestamp).toLocaleDateString()}`;
      pdf.text(winnerText, 25, yPosition);
      yPosition += 8;
    });
    
    // Footer
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }
    
    pdf.save(`stitch-n-pitch-elite-winners-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const performExport = async () => {
    setIsExporting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing time
      
      switch (selectedExport) {
        case 'winners-csv':
          const winnersData = winners.map(winner => ({
            'Winner #': winners.indexOf(winner) + 1,
            'Name': winner.name,
            'Department': winner.department,
            'Supervisor': winner.supervisor,
            'Selected Date': new Date(winner.timestamp).toLocaleDateString(),
            'Selected Time': new Date(winner.timestamp).toLocaleTimeString(),
            'Guide ID': winner.guide_id
          }));
          generateCSV(winnersData, `stitch-n-pitch-winners-${new Date().toISOString().split('T')[0]}.csv`);
          break;
          
        case 'winners-pdf':
          generatePDF();
          break;
          
        case 'losers-csv':
          const losersData = losers.map(loser => ({
            'Loser #': losers.indexOf(loser) + 1,
            'Name': loser.name,
            'Department': loser.department,
            'Supervisor': loser.supervisor,
            'Selected Date': new Date(loser.timestamp).toLocaleDateString(),
            'Selected Time': new Date(loser.timestamp).toLocaleTimeString(),
            'Guide ID': loser.guide_id
          }));
          generateCSV(losersData, `stitch-n-pitch-losers-${new Date().toISOString().split('T')[0]}.csv`);
          break;
          
        case 'losers-pdf':
          generateLosersPDF();
          break;
          
        case 'elite-csv':
          const eliteData = eliteWinners.map(winner => ({
            'Elite #': eliteWinners.indexOf(winner) + 1,
            'Name': winner.name,
            'Department': winner.department,
            'Supervisor': winner.supervisor,
            'Selected Date': new Date(winner.timestamp).toLocaleDateString(),
            'Selected Time': new Date(winner.timestamp).toLocaleTimeString(),
            'Guide ID': winner.guide_id,
            'Winner ID': winner.winner_id
          }));
          generateCSV(eliteData, `stitch-n-pitch-elite-winners-${new Date().toISOString().split('T')[0]}.csv`);
          break;
          
        case 'elite-pdf':
          generateElitePDF();
          break;
          
        case 'guides-csv':
          const guidesData = GUIDES.map(guide => ({
            'Guide ID': guide.id,
            'Name': guide.name,
            'Department': guide.department,
            'Supervisor': guide.supervisor,
            'Status': winners.some(w => w.guide_id === guide.id) ? 'Winner' : 'Available'
          }));
          generateCSV(guidesData, `stitch-n-pitch-guides-${new Date().toISOString().split('T')[0]}.csv`);
          break;
          
        case 'complete-data-csv':
          const completeData = [
            ...winners.map(winner => ({
              'Type': 'Winner',
              'Entry #': winners.indexOf(winner) + 1,
              'Name': winner.name,
              'Department': winner.department,
              'Supervisor': winner.supervisor,
              'Selected Date': new Date(winner.timestamp).toLocaleDateString(),
              'Selected Time': new Date(winner.timestamp).toLocaleTimeString(),
              'Guide ID': winner.guide_id,
              'Chat ID 1': winner.chat_ids?.[0] || '',
              'Chat ID 2': winner.chat_ids?.[1] || '',
              'Chat ID 3': winner.chat_ids?.[2] || '',
              'Chat ID 4': winner.chat_ids?.[3] || '',
              'Chat ID 5': winner.chat_ids?.[4] || ''
            })),
            ...losers.map(loser => ({
              'Type': 'Loser',
              'Entry #': losers.indexOf(loser) + 1,
              'Name': loser.name,
              'Department': loser.department,
              'Supervisor': loser.supervisor,
              'Selected Date': new Date(loser.timestamp).toLocaleDateString(),
              'Selected Time': new Date(loser.timestamp).toLocaleTimeString(),
              'Guide ID': loser.guide_id,
              'Chat ID 1': loser.chat_ids?.[0] || '',
              'Chat ID 2': loser.chat_ids?.[1] || '',
              'Chat ID 3': loser.chat_ids?.[2] || '',
              'Chat ID 4': loser.chat_ids?.[3] || '',
              'Chat ID 5': loser.chat_ids?.[4] || ''
            })),
            ...eliteWinners.map(elite => ({
              'Type': 'Elite Winner',
              'Entry #': eliteWinners.indexOf(elite) + 1,
              'Name': elite.name,
              'Department': elite.department,
              'Supervisor': elite.supervisor,
              'Selected Date': new Date(elite.timestamp).toLocaleDateString(),
              'Selected Time': new Date(elite.timestamp).toLocaleTimeString(),
              'Guide ID': elite.guide_id,
              'Winner ID': elite.winner_id,
              'Chat ID 1': elite.chat_ids?.[0] || '',
              'Chat ID 2': elite.chat_ids?.[1] || '',
              'Chat ID 3': elite.chat_ids?.[2] || '',
              'Chat ID 4': elite.chat_ids?.[3] || '',
              'Chat ID 5': elite.chat_ids?.[4] || '',
              'Chat ID 6': elite.chat_ids?.[5] || '',
              'Chat ID 7': elite.chat_ids?.[6] || '',
              'Chat ID 8': elite.chat_ids?.[7] || '',
              'Chat ID 9': elite.chat_ids?.[8] || '',
              'Chat ID 10': elite.chat_ids?.[9] || ''
            }))
          ];
          generateCSV(completeData, `stitch-n-pitch-complete-contest-data-${new Date().toISOString().split('T')[0]}.csv`);
          break;
      }
      
      setExportSuccess(true);
      setTimeout(() => {
        setExportSuccess(false);
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExport = () => {
    if (isLoggedIn) {
      performExport();
    } else {
      setShowPasswordModal(true);
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <style>
        {`
          .export-modal-enter {
            animation: export-modal-enter 0.5s ease-out;
          }
          
          @keyframes export-modal-enter {
            0% { 
              opacity: 0; 
              transform: scale(0.9) translateY(20px);
            }
            100% { 
              opacity: 1; 
              transform: scale(1) translateY(0);
            }
          }
          
          .export-option-hover {
            transition: all 0.3s ease;
          }
          
          .export-option-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          }
          
          .success-bounce {
            animation: success-bounce 0.6s ease-out;
          }
          
          @keyframes success-bounce {
            0% { transform: scale(0); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      {/* Password Modal - Higher z-index */}
      {showPasswordModal && !isLoggedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 bg-opacity-20 rounded-xl backdrop-blur-sm">
                  <Lock className="w-6 h-6 text-blue-300" />
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
                Enter admin password to export data.
              </p>
              
              <form onSubmit={handlePasswordSubmit}>
                <label htmlFor="export-password" className="block text-sm font-medium text-white text-opacity-90 mb-2">
                  Admin Password
                </label>
                <input
                  type="password"
                  id="export-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white placeholder-opacity-60 backdrop-blur-sm"
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
                    className="flex-1 py-3 px-4 bg-blue-600 bg-opacity-80 text-white rounded-xl hover:bg-opacity-90 transition-colors backdrop-blur-sm border border-blue-500 border-opacity-50"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Export Modal - Lower z-index */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl export-modal-enter"
          onClick={handleModalClick}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="p-2 md:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl md:rounded-2xl">
                <Download className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Export Data</h1>
                <p className="text-blue-200 text-sm md:text-base">Download contest data for record-keeping</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors bg-white bg-opacity-10 rounded-full p-2 md:p-3 hover:bg-opacity-20 backdrop-blur-sm flex-shrink-0"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Export Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
            {exportOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = selectedExport === option.id;
              
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedExport(option.id)}
                  className={`export-option-hover text-left p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl transition-all ${
                    isSelected
                      ? `bg-gradient-to-r ${option.color} shadow-2xl scale-105`
                      : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                  }`}
                >
                  <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                    <div className={`p-2 md:p-3 rounded-lg md:rounded-xl flex-shrink-0 ${
                      isSelected ? 'bg-white bg-opacity-20' : 'bg-white bg-opacity-10'
                    }`}>
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1 md:mb-2">
                        {option.title}
                      </h3>
                      <p className={`text-xs sm:text-sm ${
                        isSelected ? 'text-white text-opacity-90' : 'text-blue-200'
                      }`}>
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Export Preview */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Export Preview</h3>
            <div className="text-blue-200 text-sm md:text-base">
              {selectedExport === 'winners-csv' && (
                <div>
                  <p className="mb-2">📊 <strong>{winners.length}</strong> winners will be exported</p>
                  <p className="text-xs md:text-sm">Includes: Name, Department, Supervisor, Selection Date & Time, Guide ID</p>
                </div>
              )}
              {selectedExport === 'winners-pdf' && (
                <div>
                  <p className="mb-2">📄 Professional PDF report with statistics and complete winner list</p>
                  <p className="text-xs md:text-sm">Includes: Summary stats, department breakdown, formatted winner list</p>
                </div>
              )}
              {selectedExport === 'losers-csv' && (
                <div>
                  <p className="mb-2">📊 <strong>{losers.length}</strong> losers will be exported</p>
                  <p className="text-xs md:text-sm">Includes: Name, Department, Supervisor, Selection Date & Time, Guide ID</p>
                </div>
              )}
              {selectedExport === 'losers-pdf' && (
                <div>
                  <p className="mb-2">📄 Professional PDF report with statistics and complete loser list</p>
                  <p className="text-xs md:text-sm">Includes: Summary stats, department breakdown, formatted loser list</p>
                </div>
              )}
              {selectedExport === 'elite-csv' && (
                <div>
                  <p className="mb-2">👑 <strong>{eliteWinners.length}</strong> elite winners will be exported</p>
                  <p className="text-xs md:text-sm">Includes: Name, Department, Supervisor, Selection Date & Time, Guide ID, Winner ID</p>
                </div>
              )}
              {selectedExport === 'elite-pdf' && (
                <div>
                  <p className="mb-2">📄 Professional PDF report with elite winners statistics</p>
                  <p className="text-xs md:text-sm">Includes: Summary stats, department breakdown, formatted elite winner list</p>
                </div>
              )}
              {selectedExport === 'guides-csv' && (
                <div>
                  <p className="mb-2">👥 <strong>{GUIDES.length}</strong> guides will be exported</p>
                  <p className="text-xs md:text-sm">Includes: Guide ID, Name, Department, Supervisor, Winner Status</p>
                </div>
              )}
              {selectedExport === 'complete-data-csv' && (
                <div>
                  <p className="mb-2">🎯 <strong>{winners.length + losers.length + eliteWinners.length}</strong> total entries will be exported</p>
                  <p className="text-xs md:text-sm">Includes: All winners, losers, and elite winners with chat IDs, complete contest data</p>
                </div>
              )}
            </div>
          </div>

          {/* Export Button */}
          <div className="flex justify-center">
            {exportSuccess ? (
              <div className="flex items-center gap-2 md:gap-3 bg-green-500 text-white px-4 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl success-bounce">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                <span className="font-semibold text-sm md:text-base">Export Successful!</span>
              </div>
            ) : (
              <button
                onClick={handleExport}
                disabled={isExporting}
                className={`flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-semibold text-sm md:text-lg transition-all transform hover:scale-105 ${
                  isExporting
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg'
                } text-white`}
              >
                <Download className={`w-5 h-5 md:w-6 md:h-6 ${isExporting ? 'animate-bounce' : ''}`} />
                {isExporting ? 'Exporting...' : 'Export Data'}
              </button>
            )}
          </div>

          {/* Info */}
          <div className="mt-4 md:mt-6 text-center text-blue-200 text-xs md:text-sm">
            <p>Files will be downloaded to your default download folder</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportData;