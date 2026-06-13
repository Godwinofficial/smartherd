import React, { useState } from 'react';

export default function VisualChart({ type = 'line', height = 200 }) {
  // 1. Line/Area Chart for Herd Growth (Jan - Jun)
  if (type === 'line') {
    const totalPoints = [
      { x: 65, y: 72, val: 980, label: 'Jan' },
      { x: 121, y: 69, val: 1010, label: 'Feb' },
      { x: 177, y: 65, val: 1050, label: 'Mar' },
      { x: 233, y: 59, val: 1110, label: 'Apr' },
      { x: 289, y: 52, val: 1180, label: 'May' },
      { x: 345, y: 44, val: 1260, label: 'Jun' }
    ];

    const healthyPoints = [
      { x: 65, y: 80, val: 900 },
      { x: 121, y: 77.5, val: 925 },
      { x: 177, y: 73, val: 970 },
      { x: 233, y: 67, val: 1030 },
      { x: 289, y: 60.5, val: 1095 },
      { x: 345, y: 52, val: 1180 }
    ];

    const totalPath = totalPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const healthyPath = healthyPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${healthyPath} L 345 170 L 65 170 Z`;

    return (
      <div className="relative w-full" style={{ height: `${height}px` }}>
        <svg viewBox="0 0 360 200" className="w-full h-full overflow-visible">
          {/* Horizontal Grid lines */}
          <line x1="60" y1="30" x2="350" y2="30" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="60" y1="65" x2="350" y2="65" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="60" y1="100" x2="350" y2="100" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="60" y1="135" x2="350" y2="135" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="60" y1="170" x2="350" y2="170" stroke="#cbd5e1" strokeWidth="1.2" />

          {/* Y Axis labels */}
          <g className="font-sans text-[9px] font-bold text-slate-400" textAnchor="end">
            <text x="50" y="33">1400</text>
            <text x="50" y="68">1050</text>
            <text x="50" y="103">700</text>
            <text x="50" y="138">350</text>
            <text x="50" y="173">0</text>
          </g>

          {/* Area fill under Healthy curve with soft blue gradient */}
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.00" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#chartGradient)" />

          {/* Total Line Path (Blue) */}
          <path
            d={totalPath}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Healthy Line Path (Green) */}
          <path
            d={healthyPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Data Nodes for Total Line */}
          {totalPoints.map((p, i) => (
            <g key={i} className="group cursor-pointer">
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill="#ffffff"
                stroke="#2563eb"
                strokeWidth="2"
                className="transition-all duration-200 group-hover:r-5"
              />
              {/* Tooltip on hover */}
              <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <rect
                  x={p.x - 24}
                  y={p.y - 28}
                  width="48"
                  height="18"
                  rx="4"
                  fill="#1e293b"
                />
                <text
                  x={p.x}
                  y={p.y - 16}
                  fill="#ffffff"
                  fontSize="8"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="font-sans"
                >
                  {p.val} head
                </text>
              </g>
              {/* X Axis Month labels */}
              <text
                x={p.x}
                y="190"
                fill="#94a3b8"
                fontSize="10"
                fontWeight="semibold"
                textAnchor="middle"
                className="font-sans"
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 2. Bar Chart for Activity (Daily distance in km)
  if (type === 'bar') {
    const bars = [
      { day: 'Mon', km: 4.8 },
      { day: 'Tue', km: 5.6 },
      { day: 'Wed', km: 6.2 },
      { day: 'Thu', km: 3.9 },
      { day: 'Fri', km: 5.1 },
      { day: 'Sat', km: 7.4 },
      { day: 'Sun', km: 4.2 }
    ];

    const maxKm = 8;

    return (
      <div className="relative w-full" style={{ height: `${height}px` }}>
        <div className="flex justify-between items-end h-[160px] px-2 pt-4">
          {bars.map((bar, i) => {
            const pct = (bar.km / maxKm) * 100;
            return (
              <div key={i} className="flex flex-col items-center flex-1 group cursor-pointer">
                <div className="relative w-8 bg-slate-100 rounded-lg overflow-visible h-[130px] flex items-end">
                  <div
                    style={{ height: `${pct}%` }}
                    className="w-full bg-gradient-to-t from-brand-600 to-brand-400 rounded-lg transition-all duration-1000 ease-out group-hover:brightness-110"
                  />
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow font-semibold">
                    {bar.km}km
                  </span>
                </div>
                <span className="mt-2 text-slate-500 text-xs font-medium">{bar.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. Advanced Concentric Ring Chart for Health Distribution
  if (type === 'health') {
    const [hoveredIdx, setHoveredIdx] = useState(null);

    const segments = [
      { percentage: 75, color: '#10b981', label: 'Healthy', radius: 40, strokeWidth: 5, value: '15 heads' },
      { percentage: 15, color: '#f59e0b', label: 'Warning', radius: 31, strokeWidth: 5, value: '3 heads' },
      { percentage: 10, color: '#ef4444', label: 'Attention', radius: 22, strokeWidth: 5, value: '2 heads' }
    ];

    return (
      <div className="flex flex-row items-center justify-between sm:justify-around w-full h-[140px] py-1 gap-2">
        {/* SVG concentric rings (made slightly more compact) */}
        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {segments.map((seg, idx) => {
              const circumference = 2 * Math.PI * seg.radius;
              const strokeDashoffset = circumference - (seg.percentage / 100) * circumference;
              const isHovered = hoveredIdx === idx;

              return (
                <g 
                  key={idx} 
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r={seg.radius}
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth={seg.strokeWidth}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={seg.radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={seg.strokeWidth + (isHovered ? 1.2 : 0)}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                    opacity={hoveredIdx === null || isHovered ? 1 : 0.35}
                  />
                </g>
              );
            })}
          </svg>
          <div className="absolute flex flex-col items-center select-none pointer-events-none text-center">
            {hoveredIdx !== null ? (
              <>
                <span className="text-xs font-extrabold" style={{ color: segments[hoveredIdx].color }}>
                  {segments[hoveredIdx].percentage}%
                </span>
                <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">
                  {segments[hoveredIdx].value}
                </span>
              </>
            ) : (
              <>
                <span className="text-xl font-extrabold text-slate-800 leading-none">90%</span>
                <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">Health</span>
              </>
            )}
          </div>
        </div>

        {/* Legend block (compact text sizes) */}
        <div className="flex flex-col gap-1 shrink-0">
          {segments.map((seg, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-between gap-2 text-[10px] p-1 px-2.5 rounded-lg border transition-all cursor-pointer ${
                hoveredIdx === idx 
                  ? 'bg-slate-50 border-slate-200 shadow-sm scale-102' 
                  : 'bg-transparent border-transparent'
              }`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
                <span className="text-slate-500 font-bold">{seg.label}:</span>
              </div>
              <span className="text-slate-800 font-extrabold">{seg.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4. Pasture Heatmap representation
  if (type === 'heatmap') {
    const grid = [
      [30, 80, 45, 10, 15],
      [65, 95, 75, 20, 30],
      [40, 70, 85, 50, 25],
      [15, 30, 40, 90, 60],
      [10, 5, 20, 65, 80]
    ];

    const getColor = (value) => {
      if (value < 20) return 'bg-blue-50';
      if (value < 40) return 'bg-blue-100';
      if (value < 60) return 'bg-blue-300';
      if (value < 80) return 'bg-blue-500';
      return 'bg-blue-700';
    };

    return (
      <div className="w-full flex flex-col items-center py-2">
        <div className="grid grid-cols-5 gap-1.5 w-full max-w-[280px]">
          {grid.flat().map((val, idx) => (
            <div
              key={idx}
              className={`aspect-square rounded ${getColor(val)} transition-all duration-300 hover:scale-105 cursor-pointer relative group`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-slate-900/80 rounded text-[9px] text-white font-semibold transition-opacity duration-200">
                {val}% occupancy
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3 text-[10px] text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 border border-slate-200 bg-blue-50 rounded" /> Low Usage
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-blue-700 rounded" /> High Usage (Boma/Water)
          </span>
        </div>
      </div>
    );
  }

  return null;
}
