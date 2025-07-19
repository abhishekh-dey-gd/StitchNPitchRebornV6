import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (action: 'pass' | 'fail') => void;
  guideName: string;
  chatIds?: string[];
  isLoggedIn?: boolean;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  guideName,
  chatIds = [],
  isLoggedIn = false
}) => {
  const [selectedAction, setSelectedAction] = useState<'pass' | 'fail' | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAction) {
      setError('Please select Selected or Not Selected');
      return;
    }
    
    onConfirm(selectedAction);
    setSelectedAction(null);
    setError('');
  };

  const handleClose = () => {
    setSelectedAction(null);
    setError('');
    onClose();
  };

  const handleActionSelect = (action: 'pass' | 'fail') => {
    setSelectedAction(action);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {isLoggedIn ? 'Mark Guide' : 'Admin Access'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors bg-white bg-opacity-10 rounded-full p-2 hover:bg-opacity-20 backdrop-blur-sm"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-white text-opacity-90 mb-4">
            Mark <span className="font-semibold text-blue-200">{guideName}</span> as:
            {chatIds.length > 0 && (
              <span className="block text-sm text-blue-300 mt-2">
                Chat IDs: {chatIds.join(', ')}
              </span>
            )}
          </p>
          
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => handleActionSelect('pass')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all backdrop-blur-sm border ${
                selectedAction === 'pass'
                  ? 'bg-green-500 bg-opacity-80 text-white shadow-lg border-green-400 border-opacity-50'
                  : 'bg-white bg-opacity-10 text-white hover:bg-green-500 hover:bg-opacity-30 border-white border-opacity-20'
              }`}
            >
              ✅ Selected (Winner)
            </button>
            <button
              type="button"
              onClick={() => handleActionSelect('fail')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all backdrop-blur-sm border ${
                selectedAction === 'fail'
                  ? 'bg-red-500 bg-opacity-80 text-white shadow-lg border-red-400 border-opacity-50'
                  : 'bg-white bg-opacity-10 text-white hover:bg-red-500 hover:bg-opacity-30 border-white border-opacity-20'
              }`}
            >
              ❌ Not Selected
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-400 border-opacity-50 text-red-200 rounded-lg backdrop-blur-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
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
  );
};

export default PasswordModal;