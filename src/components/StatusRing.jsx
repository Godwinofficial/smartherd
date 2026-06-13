import React from 'react';

export default function StatusRing({ status, imageSrc, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40',
  };

  const ringClass = status === 'Healthy' 
    ? 'status-ring-healthy' 
    : 'status-ring-attention';

  return (
    <div className="relative inline-block select-none">
      <div className={`rounded-full overflow-hidden flex items-center justify-center bg-slate-100 ${sizeClasses[size] || sizeClasses.md} ${ringClass}`}>
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt="Animal Profile" 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%2394a3b8"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21V3m0 18a9 9 0 000-18m0 0a9.004 9.004 0 018.716 6.747M12 3a9.004 9.004 0 00-8.716 6.747M3 12h18"/%3E%3C/svg%3E';
            }}
          />
        ) : (
          <div className="text-slate-400 font-bold">Herd</div>
        )}
      </div>
      
      {/* Pulse dot shadow effect */}
      <span className={`absolute bottom-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white ${
        status === 'Healthy' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500 animate-ping'
      }`} />
      <span className={`absolute bottom-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white ${
        status === 'Healthy' ? 'bg-emerald-500' : 'bg-red-500'
      }`} />
    </div>
  );
}
