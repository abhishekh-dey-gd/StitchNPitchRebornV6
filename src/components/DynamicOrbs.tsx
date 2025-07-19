import React from 'react';

const DynamicOrbs: React.FC = () => {
  // Generate multiple orbs with different sizes, colors, and animation delays
  const orbs = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50, // 50-150px
    color: [
      'from-purple-400 to-indigo-600',
      'from-pink-400 to-purple-600',
      'from-indigo-400 to-purple-600',
      'from-violet-400 to-purple-600',
      'from-fuchsia-400 to-pink-600',
      'from-purple-500 to-indigo-600',
      'from-pink-500 to-purple-600',
      'from-indigo-500 to-purple-600'
    ][i % 8],
    duration: Math.random() * 20 + 15, // 15-35s
    delay: Math.random() * 10, // 0-10s delay
    startX: Math.random() * 100,
    startY: Math.random() * 100
  }));

  return (
    <>
      <style>
        {`
          @keyframes float-around {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(200px, -150px) rotate(90deg); }
            50% { transform: translate(-100px, -300px) rotate(180deg); }
            75% { transform: translate(-250px, -100px) rotate(270deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
          }
          
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.3; filter: blur(20px); }
            50% { opacity: 0.6; filter: blur(30px); }
          }
          
          .floating-orb {
            position: fixed;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            animation: float-around linear infinite, pulse-glow ease-in-out infinite;
          }
        `}
      </style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {orbs.map((orb) => (
          <div
            key={orb.id}
            className={`floating-orb bg-gradient-to-br ${orb.color}`}
            style={{
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              left: `${orb.startX}%`,
              top: `${orb.startY}%`,
              animationDuration: `${orb.duration}s, ${orb.duration * 0.6}s`,
              animationDelay: `${orb.delay}s, ${orb.delay * 0.5}s`
            }}
          />
        ))}
      </div>
    </>
  );
};

export default DynamicOrbs;