import React from 'react';

const NbetaPlant = ({ score, completedTasks, totalTasks }) => {
  const growth = Math.min(100, Math.max(0, score));
  
  // Growth stages
  const getStage = () => {
    if (growth >= 100) return 'mature';
    if (growth >= 75) return 'young';
    if (growth >= 50) return 'seedling';
    if (growth >= 25) return 'sprout';
    return 'seed';
  };
  
  const stage = getStage();
  
  // Calculate plant height based on growth
  const plantHeight = 40 + (growth * 1.2);
  const leafSize = 15 + (growth * 0.3);
  
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-sm">
      
      {/* Title */}
      <div className="text-center mb-3">
        <h3 className="text-gray-600 text-sm font-medium">Your Progress</h3>
        <div className="text-4xl font-bold text-growly mt-1">{Math.round(growth)}%</div>
        <div className="text-sm text-gray-500">{completedTasks}/{totalTasks} Tasks</div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-growly h-2 rounded-full transition-all duration-700"
          style={{ width: `${growth}%` }}
        />
      </div>
      
      {/* SVG Plant - Real plant illustration */}
      <div className="flex justify-center">
        <svg width="180" height="220" viewBox="0 0 180 220" className="mx-auto">
          
          {/* Pot */}
          <path d="M50 200 L130 200 L140 160 L40 160 Z" fill="#C17B4E" stroke="#A05E35" strokeWidth="1.5"/>
          <rect x="38" y="155" width="104" height="10" rx="3" fill="#D4895A" stroke="#A05E35" strokeWidth="1"/>
          <ellipse cx="90" cy="165" rx="35" ry="5" fill="#5D3A1A" opacity="0.6"/>
          
          {/* Stage 1: Seed */}
          {stage === 'seed' && (
            <>
              <ellipse cx="90" cy="158" rx="8" ry="6" fill="#8B5E3C"/>
              <text x="90" y="140" textAnchor="middle" fontSize="12" fill="#666">🌰</text>
            </>
          )}
          
          {/* Stage 2: Sprout */}
          {stage === 'sprout' && (
            <>
              <line x1="90" y1="158" x2="90" y2="130" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
              <path d="M90 135 Q75 128 80 120" fill="#66BB6A" stroke="#4CAF50" strokeWidth="1"/>
              <path d="M90 140 Q105 133 100 125" fill="#66BB6A" stroke="#4CAF50" strokeWidth="1"/>
              <circle cx="90" cy="125" r="5" fill="#81C784"/>
            </>
          )}
          
          {/* Stage 3: Seedling */}
          {stage === 'seedling' && (
            <>
              <line x1="90" y1="158" x2="90" y2="110" stroke="#388E3C" strokeWidth="4" strokeLinecap="round"/>
              <path d="M90 125 Q65 115 70 100" fill="#66BB6A" stroke="#4CAF50" strokeWidth="1"/>
              <path d="M90 130 Q115 120 110 105" fill="#66BB6A" stroke="#4CAF50" strokeWidth="1"/>
              <path d="M90 140 Q70 135 75 120" fill="#81C784" stroke="#4CAF50" strokeWidth="1"/>
              <path d="M90 145 Q110 140 105 125" fill="#81C784" stroke="#4CAF50" strokeWidth="1"/>
              <circle cx="90" cy="105" r="8" fill="#4CAF50"/>
            </>
          )}
          
          {/* Stage 4: Young Plant */}
          {stage === 'young' && (
            <>
              <line x1="90" y1="158" x2="90" y2="85" stroke="#2E7D32" strokeWidth="5" strokeLinecap="round"/>
              <path d="M90 100 Q55 85 60 65" fill="#66BB6A" stroke="#388E3C" strokeWidth="1"/>
              <path d="M90 105 Q125 90 120 70" fill="#66BB6A" stroke="#388E3C" strokeWidth="1"/>
              <path d="M90 115 Q60 110 65 90" fill="#81C784" stroke="#388E3C" strokeWidth="1"/>
              <path d="M90 120 Q120 115 115 95" fill="#81C784" stroke="#388E3C" strokeWidth="1"/>
              <path d="M90 80 Q75 75 78 60" fill="#A5D6A7" stroke="#388E3C" strokeWidth="1"/>
              <path d="M90 85 Q105 80 102 65" fill="#A5D6A7" stroke="#388E3C" strokeWidth="1"/>
              <circle cx="90" cy="75" r="12" fill="#4CAF50"/>
              <circle cx="90" cy="75" r="6" fill="#81C784"/>
            </>
          )}
          
          {/* Stage 5: Mature Plant */}
          {stage === 'mature' && (
            <>
              {/* Main trunk */}
              <line x1="90" y1="158" x2="90" y2="60" stroke="#2E7D32" strokeWidth="6" strokeLinecap="round"/>
              
              {/* Large canopy */}
              <circle cx="90" cy="55" r="25" fill="#4CAF50" opacity="0.9"/>
              <circle cx="70" cy="65" r="20" fill="#66BB6A" opacity="0.9"/>
              <circle cx="110" cy="65" r="20" fill="#66BB6A" opacity="0.9"/>
              <circle cx="80" cy="45" r="18" fill="#81C784" opacity="0.9"/>
              <circle cx="100" cy="45" r="18" fill="#81C784" opacity="0.9"/>
              <circle cx="90" cy="40" r="15" fill="#A5D6A7" opacity="0.9"/>
              
              {/* Branch leaves */}
              <path d="M90 90 Q60 80 55 65" fill="#4CAF50" stroke="#388E3C" strokeWidth="1"/>
              <path d="M90 95 Q120 85 125 70" fill="#4CAF50" stroke="#388E3C" strokeWidth="1"/>
              <path d="M90 80 Q65 75 60 60" fill="#66BB6A" stroke="#388E3C" strokeWidth="1"/>
              <path d="M90 85 Q115 80 120 65" fill="#66BB6A" stroke="#388E3C" strokeWidth="1"/>
              
              {/* Details */}
              <path d="M85 55 Q90 50 95 55" stroke="#2E7D32" strokeWidth="1.5" fill="none"/>
              <path d="M75 65 Q80 60 85 65" stroke="#2E7D32" strokeWidth="1.5" fill="none"/>
              <path d="M95 65 Q100 60 105 65" stroke="#2E7D32" strokeWidth="1.5" fill="none"/>
            </>
          )}
        </svg>
      </div>
      
      {/* Stage Label */}
      <div className="text-center mt-3">
        {stage === 'seed' && <p className="text-gray-500 text-sm">🌱 Seed Stage</p>}
        {stage === 'sprout' && <p className="text-green-600 text-sm">🌿 Sprout Stage</p>}
        {stage === 'seedling' && <p className="text-green-600 text-sm">🌿 Seedling Stage</p>}
        {stage === 'young' && <p className="text-green-600 text-sm">🌳 Young Plant</p>}
        {stage === 'mature' && <p className="text-purple-600 text-sm font-medium">🌳 Mature Plant</p>}
      </div>
      
      {/* Message */}
      <div className="text-center mt-2">
        {stage === 'seed' && <p className="text-gray-400 text-xs">Complete tasks to grow your plant</p>}
        {stage === 'sprout' && <p className="text-green-600 text-xs">Keep going! Your plant is growing!</p>}
        {stage === 'seedling' && <p className="text-green-600 text-xs">Great job! Plant is getting stronger!</p>}
        {stage === 'young' && <p className="text-green-600 text-xs">Almost there! Complete more tasks!</p>}
        {stage === 'mature' && <p className="text-purple-600 text-xs font-medium">Perfect! Your plant is fully grown! 🎉</p>}
      </div>
    </div>
  );
};

export default NbetaPlant;
