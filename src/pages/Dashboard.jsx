import React, { useState } from 'react';
import {
  HeartPulse,
  AlertTriangle,
  Cpu,
  ArrowUpRight,
  PawPrint
} from 'lucide-react';
import LiveMap from '../components/LiveMap';
import VisualChart from '../components/VisualChart';
import cow3 from '../assets/cow3.png';
import cow4 from '../assets/cow4.png';

// Small hoverable ? info chip for chart explanations
function ChartInfo({ text }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-flex items-center">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onTouchStart={(e) => { e.stopPropagation(); setOpen(v => !v); }}
        className="w-5 h-5 rounded-full border border-slate-200 bg-slate-50 hover:bg-brand-50 hover:border-brand-300 text-slate-400 hover:text-brand-500 flex items-center justify-center text-[10px] font-extrabold transition shrink-0 ml-1.5"
        aria-label="Chart information"
      >
        ?
      </button>
      {open && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-900 text-white text-[10px] font-medium leading-relaxed px-3 py-2.5 rounded-xl shadow-xl z-50 pointer-events-none">
          {text}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
}

export default function Dashboard({
  animals,
  selectedAnimal,
  onSelectAnimal,
  geofenceRadius,
  setActiveTab,
  darkMode
}) {

  const stats = [
    { label: 'TOTAL HERD', value: '1,248', icon: PawPrint, color: 'text-slate-800', trend: '+12 this week', iconColor: 'text-slate-400' },
    { label: 'HEALTH INDEX', value: '96.4%', icon: HeartPulse, color: 'text-emerald-650', trend: 'Optimal range', iconColor: 'text-emerald-500' },
    { label: 'ACTIVE ALERTS', value: '04', icon: AlertTriangle, color: 'text-red-500', trend: 'Requires action', iconColor: 'text-red-500', isCritical: true },
    { label: 'COLLARS ONLINE', value: '1,241', icon: Cpu, color: 'text-brand-500', trend: '7 low battery', iconColor: 'text-brand-500' }
  ];

  return (
    <div className="space-y-6 animate-fade-in p-6 max-h-full overflow-y-auto bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Minimal Typography Header Greeting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-200/70">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-800 font-sans">Good morning, Godwin!</h1>
          <p className="text-xs text-slate-500 mt-1">SmartHerd telemetry is running. Currently monitoring Chisamba North pasture grid.</p>
        </div>
        <button
          onClick={() => setActiveTab('tracking')}
          className="mt-3 md:mt-0 flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition hover:scale-105 active:scale-95"
        >
          <span>View Satellite Map</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid Stats - 2x2 layout on mobile screens matching screenshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-premium flex flex-col justify-between h-28 transition-all duration-300 hover:shadow-premium-hover hover:scale-[1.02] cursor-pointer hover:border-slate-300">
              <div className="flex justify-between items-start w-full">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.iconColor} shrink-0`} />
              </div>
              <div className="mt-2">
                <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${stat.color}`}>{stat.value}</h3>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 mt-0.5 block">
                  {stat.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Tracking Map Card (Modified with negative margins on mobile to span edge-to-edge) */}
        <div className="bg-white p-4 sm:p-5 rounded-none sm:rounded-2xl border-x-0 sm:border border-slate-200/80 shadow-premium lg:col-span-2 flex flex-col gap-4 -mx-6 sm:mx-0">
          <div className="flex justify-between items-center px-2 sm:px-0">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Real-time Telemetry</h3>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 font-extrabold text-[8px] tracking-wider px-2 py-0.5 rounded-full uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Sector A-12 • 14.2 km² geofence</p>
            </div>
            <button
              onClick={() => setActiveTab('tracking')}
              className="text-xs font-bold text-brand-500 hover:underline"
            >
              Expand Screen
            </button>
          </div>
          <LiveMap
            animals={animals}
            selectedAnimal={selectedAnimal}
            onSelectAnimal={onSelectAnimal}
            geofenceRadius={geofenceRadius}
            darkMode={darkMode}
          />
        </div>

        {/* Priority Monitoring Card (Replaced alerts/vaccines panel to match first screenshot) */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium space-y-4">
            <div className="flex justify-between items-center pb-1">
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Priority Monitoring</h3>
              <button
                onClick={() => setActiveTab('animals')}
                className="text-xs font-bold text-brand-500 hover:underline"
              >
                All animals
              </button>
            </div>

            <div className="space-y-3">
              {/* Kasama 03 */}
              <div className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-500 p-0.5 bg-white shrink-0">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img src={cow3} alt="Kasama 03" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-800">Kasama 03</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">Boran • Cow • 420kg</p>
                    <span className="text-[9px] font-extrabold text-red-500 tracking-wide mt-1 block">ATTENTION</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold text-red-500">42%</span>
                  <p className="text-[9px] text-slate-400 font-bold mt-0.5">ZM-1002</p>
                </div>
              </div>

              {/* Tonga 10 */}
              <div className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 p-0.5 bg-white shrink-0">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img src={cow4} alt="Tonga 10" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-800">Tonga 10</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">Brahman • Heifer • 371kg</p>
                    <span className="text-[9px] font-extrabold text-brand-500 tracking-wide mt-1 block">MONITORING</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold text-brand-500">58%</span>
                  <p className="text-[9px] text-slate-400 font-bold mt-0.5">ZM-1009</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Analytics Charts Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Herd Growth</h3>
                <ChartInfo text="Tracks the total number of cattle in the herd (blue) vs. the number confirmed healthy by collar telemetry (green) over the past 6 months." />
              </div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Total head & healthy count, last 6 months</p>
            </div>
            {/* Inline Legend */}
            <div className="flex items-center gap-3 text-[9px] font-extrabold tracking-wider text-slate-500 shrink-0">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-500" /><span>TOTAL</span></span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /><span>HEALTHY</span></span>
            </div>
          </div>
          <VisualChart type="line" height={160} />
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium space-y-4">
          <div>
            <div className="flex items-center">
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Collar Health Score</h3>
              <ChartInfo text="Shows the overall wellness split across the herd: Healthy (green), Under Observation (amber), and Attention Required (red). Based on live collar biometric readings." />
            </div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Overall wellness allocation</p>
          </div>
          <VisualChart type="health" height={160} />
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium space-y-4">
          <div>
            <div className="flex items-center">
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Pasture Occupancy Heatmap</h3>
              <ChartInfo text="A colour-coded grid showing which pasture zones have the highest cattle density. Red = high concentration, green = sparse. Updated every GPS sync cycle." />
            </div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">High grazing areas</p>
          </div>
          <VisualChart type="heatmap" height={160} />
        </div>

      </div>
    </div>
  );
}
