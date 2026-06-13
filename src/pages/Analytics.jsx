import React, { useState } from 'react';
import { 
  TrendingUp, 
  Activity, 
  MapPin, 
  Cpu, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingDown
} from 'lucide-react';
import VisualChart from '../components/VisualChart';

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

export default function Analytics() {
  const analyticsWidgets = [
    { label: 'Avg Herd Vitality', val: '94.2%', change: '+1.4% change', isPositive: true, subtext: 'Based on biometric sensors' },
    { label: 'Daily Grazing Distance', val: '5.2 km', change: '-0.3 km change', isPositive: false, subtext: 'Slightly lower temp effect' },
    { label: 'Weekly Active Collars', val: '6 units', change: '+1 unit change', isPositive: true, subtext: 'Satellite paired telemetry' }
  ];

  return (
    <div className="space-y-6 p-6 max-h-full overflow-y-auto animate-fade-in bg-slate-50 text-slate-900">
      
      {/* Analytics header widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {analyticsWidgets.map((wid, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium space-y-2 hover:scale-[1.02] transition-transform duration-300">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{wid.label}</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-800">{wid.val}</span>
              <span className={`text-[10px] font-extrabold flex items-center gap-0.5 px-2 py-0.5 rounded-full ${
                wid.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
              }`}>
                {wid.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {wid.change}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold">{wid.subtext}</p>
          </div>
        ))}
      </div>

      {/* Primary Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Herd Growth */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium lg:col-span-2 space-y-4">
          <div>
            <div className="flex items-center">
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Cattle Head Growth Metrics (Year-to-Date)</h3>
              <ChartInfo text="Tracks active smart-collar cattle paired to the system to measure herd growth size and healthy telemetry stats year-to-date." />
            </div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Active smart-collar paired database</p>
          </div>
          <VisualChart type="line" height={220} />
        </div>

        {/* Health Ring */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium space-y-4">
          <div>
            <div className="flex items-center">
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Collar Health Allocation</h3>
              <ChartInfo text="Aggregated health index classification of the entire herd: Optimal (Healthy), Monitoring (Warning), or Attention (Critical)." />
            </div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Diagnosed wellbeing scoring</p>
          </div>
          <VisualChart type="health" height={220} />
        </div>

      </div>

      {/* Secondary Row: Heatmaps & Distance logs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Occupancy Grid */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium space-y-4">
          <div>
            <div className="flex items-center">
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Pasture Quadrant Occupancy Heatmap</h3>
              <ChartInfo text="A geographical density breakdown indicating how often cattle graze in specific sectors, aiding pasture rotation management." />
            </div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Concentrated cattle locations based on coordinate counts</p>
          </div>
          <div className="flex justify-center">
            <VisualChart type="heatmap" height={180} />
          </div>
        </div>

        {/* Daily Steps */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium space-y-4">
          <div>
            <div className="flex items-center">
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Average Daily Grazing Distance (Km)</h3>
              <ChartInfo text="Tracks average daily steps and grazing distance walked by the herd to monitor activity level and environmental conditions." />
            </div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Weekly walking ranges</p>
          </div>
          <VisualChart type="bar" height={180} />
        </div>

      </div>

    </div>
  );
}
