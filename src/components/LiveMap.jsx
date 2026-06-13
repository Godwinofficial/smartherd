import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Compass } from 'lucide-react';

// Ambient dots – static herd density markers
const AMBIENT_DOTS = [
  { id: 'amb-1',  x: 120, y: 155 }, { id: 'amb-2',  x: 135, y: 145 }, { id: 'amb-3',  x: 110, y: 165 },
  { id: 'amb-4',  x: 145, y: 170 }, { id: 'amb-5',  x: 170, y: 160 }, { id: 'amb-6',  x: 165, y: 180 },
  { id: 'amb-7',  x: 180, y: 145 }, { id: 'amb-8',  x: 210, y: 130 }, { id: 'amb-9',  x: 225, y: 150 },
  { id: 'amb-10', x: 215, y: 165 }, { id: 'amb-11', x: 230, y: 140 }, { id: 'amb-12', x: 240, y: 175 },
  { id: 'amb-13', x: 225, y: 190 }, { id: 'amb-14', x: 205, y: 205 }, { id: 'amb-15', x: 190, y: 215 },
  { id: 'amb-16', x: 175, y: 205 }, { id: 'amb-17', x: 160, y: 225 }, { id: 'amb-18', x: 150, y: 235 },
  { id: 'amb-19', x: 135, y: 210 }, { id: 'amb-20', x: 125, y: 225 }, { id: 'amb-21', x: 250, y: 220 },
  { id: 'amb-22', x: 260, y: 235 }, { id: 'amb-23', x: 245, y: 255 }, { id: 'amb-24', x: 265, y: 265 },
  { id: 'amb-25', x: 275, y: 245 }, { id: 'amb-26', x: 280, y: 225 }, { id: 'amb-27', x: 270, y: 210 },
  { id: 'amb-28', x: 105, y: 185 }, { id: 'amb-29', x: 115, y: 200 }, { id: 'amb-30', x: 130, y: 280 },
  { id: 'amb-31', x: 145, y: 290 }, { id: 'amb-32', x: 155, y: 275 },
];

export default function LiveMap({
  animals = [],
  selectedAnimal = null,
  onSelectAnimal = () => {},
  geofenceRadius = 800,
  onRadiusChange,
  darkMode = false,
}) {
  const [zoom, setZoom] = useState(1);
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [livePositions, setLivePositions] = useState({});

  // Drag-pan state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart]   = useState({ x: 0, y: 0 });

  // Pinch-zoom state
  const [touchStartDist, setTouchStartDist] = useState(0);
  const [touchStartZoom, setTouchStartZoom] = useState(1);

  // ── Initialize positions & SLOW drift loop ──────────────────────────────
  useEffect(() => {
    const init = {};
    animals.forEach((animal) => {
      const dx = (animal.location.lng - 28.255) * 15000;
      const dy = (animal.location.lat - -14.972) * -15000;
      const bx = 200 + dx;
      const by = 200 + dy;
      init[animal.id] = {
        x: bx,
        y: by,
        trail: Array.from({ length: 5 }, (_, i) => ({
          x: bx - i * 10 + (Math.random() * 6 - 3),
          y: by - i * 5  + (Math.random() * 6 - 3),
        })),
      };
    });
    setLivePositions(init);

    // Very slow drift — max 0.35 SVG units per tick, every 8 seconds
    const timer = setInterval(() => {
      setLivePositions((prev) => {
        const next = { ...prev };
        animals.forEach((animal) => {
          const cur = next[animal.id];
          if (!cur) return;
          const limit = animal.status === 'Attention' ? 0.35 : 0.18;
          const nx = Math.max(50, Math.min(350, cur.x + (Math.random() - 0.5) * limit * 2));
          const ny = Math.max(50, Math.min(350, cur.y + (Math.random() - 0.5) * limit * 2));
          const trail = [...cur.trail];
          if (Math.random() > 0.6) {
            trail.pop();
            trail.unshift({ x: cur.x, y: cur.y });
          }
          next[animal.id] = { x: nx, y: ny, trail };
        });
        return next;
      });
    }, 8000);

    return () => clearInterval(timer);
  }, [animals]);

  // Geofence rect half-width in SVG units
  const geoHalf = (geofenceRadius / 800) * 115;

  // ── Gesture handlers ────────────────────────────────────────────────────
  const handleWheel = (e) => {
    e.preventDefault();
    setZoom((z) =>
      Math.max(1, Math.min(4, z + (e.deltaY < 0 ? 0.08 : -0.08)))
    );
  };

  const handlePointerDown = (e) => {
    if (e.target.tagName === 'INPUT' || e.target.closest('button')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - mapOffset.x, y: e.clientY - mapOffset.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e) => {
    if (!isDragging) return;
    setMapOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const d = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchStartDist(d);
      setTouchStartZoom(zoom);
    }
  };
  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && touchStartDist > 0) {
      const d = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setZoom(Math.max(1, Math.min(4, touchStartZoom * (d / touchStartDist))));
    }
  };
  const handleTouchEnd = () => setTouchStartDist(0);

  return (
    <div
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[420px] sm:h-[460px] sm:rounded-b-2xl overflow-hidden select-none cursor-grab active:cursor-grabbing touch-none"
      style={{ background: darkMode ? '#0f172a' : '#f8f9fa' }}
    >
      {/* ── SVG Map ── */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        style={{
          transform: `scale(${zoom}) translate(${mapOffset.x / zoom}px, ${mapOffset.y / zoom}px)`,
          transition: isDragging ? 'none' : 'transform 0.08s ease-out',
        }}
      >
        {/* Street grid */}
        <g opacity="0.85">
          {/* Main roads */}
          {[100, 300].map((y) => (
            <path key={`hr${y}`} d={`M -50 ${y} L 450 ${y}`} stroke={darkMode ? '#334155' : '#e9ecef'} strokeWidth="6" strokeLinecap="round" />
          ))}
          {[120, 280].map((x) => (
            <path key={`vr${x}`} d={`M ${x} -50 L ${x} 450`} stroke={darkMode ? '#334155' : '#e9ecef'} strokeWidth="6" strokeLinecap="round" />
          ))}
          <path d="M -50 -50 L 450 450" stroke={darkMode ? '#334155' : '#e9ecef'} strokeWidth="5" strokeLinecap="round" />
          <path d="M -50 450 L 450 -50" stroke={darkMode ? '#334155' : '#e9ecef'} strokeWidth="5" strokeLinecap="round" />

          {/* Secondary */}
          {[50, 150, 200, 250, 350].map((y) => (
            <path key={`hs${y}`} d={`M -50 ${y} L 450 ${y}`} stroke={darkMode ? '#1e293b' : '#f1f3f5'} strokeWidth="1.5" />
          ))}
          {[50, 180, 220, 340].map((x) => (
            <path key={`vs${x}`} d={`M ${x} -50 L ${x} 450`} stroke={darkMode ? '#1e293b' : '#f1f3f5'} strokeWidth="1.5" />
          ))}
          <path d="M 0 100 Q 200 200 400 100" fill="none" stroke={darkMode ? '#1e293b' : '#f1f3f5'} strokeWidth="1.5" />
          <path d="M 0 300 Q 200 200 400 300" fill="none" stroke={darkMode ? '#1e293b' : '#f1f3f5'} strokeWidth="1.5" />
          <path d="M 100 0 Q 200 200 100 400" fill="none" stroke={darkMode ? '#1e293b' : '#f1f3f5'} strokeWidth="1.5" />
          <path d="M 300 0 Q 200 200 300 400" fill="none" stroke={darkMode ? '#1e293b' : '#f1f3f5'} strokeWidth="1.5" />
        </g>

        {/* District labels */}
        <g opacity={darkMode ? 0.45 : 0.55} style={{ pointerEvents: 'none', userSelect: 'none' }}>
          {[
            { x: 200, y: 88,  size: 7,  label: 'KABANA' },
            { x: 96,  y: 128, size: 7,  label: 'CHIPATA' },
            { x: 358, y: 170, size: 7,  label: 'KAMANGA' },
            { x: 308, y: 258, size: 7,  label: 'MUTENDERE' },
            { x: 280, y: 358, size: 7,  label: 'TUKUNKA' },
            { x: 68,  y: 322, size: 13, label: 'LUSAKA', weight: '900', opacity: 0.8 },
          ].map(({ x, y, size, label, weight, opacity }) => (
            <text
              key={label}
              x={x} y={y}
              fill={darkMode ? '#4b5563' : '#adb5bd'}
              fontSize={size}
              textAnchor={size > 10 ? 'start' : 'middle'}
              fontWeight={weight || '700'}
              letterSpacing="1"
              opacity={opacity || 1}
            >
              {label}
            </text>
          ))}
        </g>

        {/* Geofence dashed box */}
        <rect
          x={200 - geoHalf} y={200 - geoHalf}
          width={geoHalf * 2} height={geoHalf * 2}
          fill="rgba(37,99,235,0.04)"
          stroke="#2563eb"
          strokeWidth="1.8"
          strokeDasharray="5 3.5"
        />

        {/* Selected animal trail */}
        {selectedAnimal && livePositions[selectedAnimal.id] && (() => {
          const pos = livePositions[selectedAnimal.id];
          const color = selectedAnimal.status === 'Healthy' ? '#3b82f6' : '#ef4444';
          const pts   = [...pos.trail, { x: pos.x, y: pos.y }];
          return (
            <g>
              <path
                d={`M ${pts.map((p) => `${p.x} ${p.y}`).join(' L ')}`}
                fill="none" stroke={color} strokeWidth="1.5"
                strokeDasharray="3 3" opacity="0.7"
              />
              {pos.trail.map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r="2" fill={color} opacity={0.2 + i * 0.12} />
              ))}
            </g>
          );
        })()}

        {/* Ambient herd dots */}
        {AMBIENT_DOTS.map((dot) => (
          <g key={dot.id} opacity="0.75">
            <circle cx={dot.x} cy={dot.y} r="7"   fill="none"    stroke="#3b82f6" strokeWidth="0.8" opacity="0.22" />
            <circle cx={dot.x} cy={dot.y} r="3.2" fill="#2563eb" stroke="#fff"    strokeWidth="0.8" />
          </g>
        ))}

        {/* Tracked animal markers with per-animal SVG animate rings */}
        {animals.map((animal) => {
          const pos         = livePositions[animal.id];
          if (!pos) return null;

          const isSelected  = selectedAnimal?.id === animal.id;
          const isAttention = animal.status === 'Attention';
          const dotColor    = isAttention ? '#ef4444' : '#2563eb';
          const ringColor   = isAttention ? '#ef4444' : '#3b82f6';
          const dotR        = isSelected ? 5 : 4;
          const dur         = isAttention ? '1.4s' : '2.2s';

          return (
            <g
              key={animal.id}
              onClick={() => onSelectAnimal(animal)}
              style={{ cursor: 'pointer' }}
            >
              {/* Outer pulsing ring – SVG animate for guaranteed animation */}
              <circle cx={pos.x} cy={pos.y} r="14" fill="none" stroke={ringColor} strokeWidth="1.2">
                <animate attributeName="r"       from="7"   to="18"  dur={dur} repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0"   dur={dur} repeatCount="indefinite" />
              </circle>

              {/* Inner static halo */}
              <circle
                cx={pos.x} cy={pos.y}
                r={isSelected ? 9 : 7}
                fill="none"
                stroke={ringColor}
                strokeWidth="1"
                opacity={isSelected ? 0.55 : 0.3}
              />

              {/* Solid dot */}
              <circle
                cx={pos.x} cy={pos.y}
                r={dotR}
                fill={dotColor}
                stroke="#fff"
                strokeWidth="1.2"
              />

              {/* Name label – always visible when selected */}
              <g
                transform={`translate(${pos.x},${pos.y - 13})`}
                opacity={isSelected ? 1 : 0}
                style={{ transition: 'opacity 0.2s' }}
              >
                <rect x="-28" y="-14" width="56" height="14" rx="3" fill={darkMode ? '#0f172a' : '#1e293b'} stroke={dotColor} strokeWidth="0.8" />
                <text x="0" y="-4" fill="#fff" fontSize="7" fontWeight="bold" textAnchor="middle">
                  {animal.name}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {/* Top-left overlay badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
        <div
          className="px-2.5 py-1.5 rounded-lg flex items-center gap-2 text-[11px] font-semibold shadow backdrop-blur"
          style={{
            background: darkMode ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.90)',
            border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
            color: darkMode ? '#cbd5e1' : '#374151',
          }}
        >
          <Compass className="w-3.5 h-3.5 text-brand-500 animate-spin-slow" />
          <span>Ranch GPS Sim</span>
        </div>
        <div
          className="px-2.5 py-1.5 rounded-lg flex items-center gap-2 text-[11px] shadow backdrop-blur"
          style={{
            background: darkMode ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.90)',
            border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
            color: darkMode ? '#6ee7b7' : '#059669',
          }}
        >
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span className="font-semibold">Perimeter Secure</span>
        </div>
      </div>

      {/* Geofence radius slider */}
      {onRadiusChange && (
        <div
          className="absolute bottom-3 left-3 px-3 py-2 rounded-xl flex flex-col gap-1 w-44 shadow backdrop-blur"
          style={{
            background: darkMode ? 'rgba(15,23,42,0.88)' : 'rgba(255,255,255,0.90)',
            border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
            color: darkMode ? '#cbd5e1' : '#374151',
          }}
        >
          <div className="flex justify-between text-[9px] font-bold" style={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
            <span>GEOFENCE SIZE</span>
            <span className="text-brand-500">{geofenceRadius}m</span>
          </div>
          <input
            type="range" min="400" max="1200" step="100"
            value={geofenceRadius}
            onChange={(e) => onRadiusChange(parseInt(e.target.value))}
            className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-brand-500"
            style={{ background: darkMode ? '#334155' : '#e2e8f0' }}
          />
        </div>
      )}
    </div>
  );
}
