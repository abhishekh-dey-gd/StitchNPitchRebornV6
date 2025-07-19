import React from 'react';

interface ConfettiAnimationProps {
  isActive: boolean;
}

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ isActive }) => {
  if (!isActive) return null;

  // Generate confetti pieces
  const confettiPieces = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className={`confetti-piece confetti-piece-${i % 6}`}
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}
    />
  ));

  return (
    <>
      <style>
        {`
          .confetti-piece {
            position: fixed;
            width: 10px;
            height: 10px;
            top: -10px;
            z-index: 1000;
            animation: confetti-fall linear infinite;
          }
          
          .confetti-piece-0 { background: #f97316; }
          .confetti-piece-1 { background: #10b981; }
          .confetti-piece-2 { background: #ec4899; }
          .confetti-piece-3 { background: #3b82f6; }
          .confetti-piece-4 { background: #f59e0b; }
          .confetti-piece-5 { background: #8b5cf6; }
          
          @keyframes confetti-fall {
            to {
              transform: translateY(100vh) rotate(720deg);
            }
          }
          
          .bounce-in {
            animation: bounce-in 0.6s ease-out;
          }
          
          @keyframes bounce-in {
            0% { transform: scale(0) rotate(-180deg); opacity: 0; }
            50% { transform: scale(1.2) rotate(-90deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
        `}
      </style>
      <div className="fixed inset-0 pointer-events-none z-50">
        {confettiPieces}
      </div>
    </>
  );
};

export default ConfettiAnimation;