import React, { useState } from 'react';
import { 
  Wifi, 
  Battery, 
  MapPin, 
  RotateCw,
  BellRing,
  X,
  ChevronDown,
  Activity,
  HeartPulse
} from 'lucide-react';
import LiveMap from '../components/LiveMap';

export default function LiveTracking({ 
  animals, 
  selectedAnimal, 
  onSelectAnimal, 
  geofenceRadius, 
  onRadiusChange,
  darkMode
}) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleSelectAnimal = (animal) => {
    onSelectAnimal(animal);
    setSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setSheetOpen(false);
    onSelectAnimal(null);
  };

  const handleSimulateAlert = () => {
    alert("Simulating anti-theft collar alarm on collar " + (selectedAnimal?.collarId || "COLLAR-ZA-105") + ". Alarm activated on cattle receiver!");
  };

  const handleSatellitePing = () => {
    alert("Broadcasting sat-ping request to " + (selectedAnimal?.name || "all active collars") + ". Calibration successful!");
  };

  /* ── 1. MOBILE BOTTOM SHEET DETAIL PANEL ── */
  const MobileDetailPanel = ({ onClose }) => (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex justify-between items-start p-4 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full overflow-hidden border-2 shrink-0 ${
            selectedAnimal.status === 'Healthy' ? 'border-emerald-500' : 'border-red-500'
          }`}>
            <img
              src={selectedAnimal.image}
              alt={selectedAnimal.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-extrabold text-slate-800">{selectedAnimal.name}</h3>
              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                selectedAnimal.status === 'Healthy'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-red-50 text-red-650 animate-pulse'
              }`}>
                {selectedAnimal.status}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
              {selectedAnimal.breed} · {selectedAnimal.age} · {selectedAnimal.weight}kg
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition shrink-0 ml-2"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* GPS Coordinates */}
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
          <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
          <span>{selectedAnimal.location?.lat?.toFixed(5)}, {selectedAnimal.location?.lng?.toFixed(5)}</span>
        </div>

        {/* Collar Specs */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: 'GPS Collar ID',  value: selectedAnimal.collarId,  color: 'text-slate-800' },
            { label: 'Sync Quality',   value: selectedAnimal.signal || 'Strong', color: 'text-emerald-600', icon: <Wifi className="w-3.5 h-3.5" /> },
            { label: 'Last Sync',      value: selectedAnimal.lastSync,  color: 'text-slate-800' },
            { label: 'Battery',        value: `${selectedAnimal.battery}%`, color: selectedAnimal.battery < 20 ? 'text-red-500' : 'text-slate-800', icon: <Battery className="w-3.5 h-3.5" /> },
          ].map(({ label, value, color, icon }) => (
            <div key={label} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</span>
              <span className={`text-xs font-extrabold flex items-center gap-1 ${color}`}>
                {icon}{value}
              </span>
            </div>
          ))}
        </div>

        {/* Live Diagnostics */}
        <div className="border border-slate-100 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border-b border-slate-100">
            <Activity className="w-3.5 h-3.5 text-brand-500" />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Live Diagnostics</span>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { label: 'Satellites Linked', value: '14 Active',      color: 'text-slate-800' },
              { label: 'Network Latency',   value: '120 ms',         color: 'text-slate-800' },
              { label: 'M2M Carrier',       value: 'Airtel Telemetry',  color: 'text-brand-600' },
              { label: 'Uptime Score',      value: '99.8%',          color: 'text-emerald-600' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between px-3 py-2">
                <span className="text-xs text-slate-500 font-semibold">{label}</span>
                <span className={`text-xs font-extrabold ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleSatellitePing}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 border border-slate-200 transition"
          >
            <RotateCw className="w-3.5 h-3.5" />
            Ping Collar
          </button>
          <button
            onClick={handleSimulateAlert}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[11px] px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 border border-red-100 transition"
          >
            <BellRing className="w-3.5 h-3.5" />
            Alarm
          </button>
        </div>
      </div>
    </div>
  );

  /* ── 2. DESKTOP INTEGRATED BOTTOM PANEL ── */
  const DesktopDetailPanel = () => {
    if (!selectedAnimal) return null;
    const isHealthy = selectedAnimal.status === 'Healthy';
    return (
      <div className="bg-white mx-6 mt-6 rounded-2xl border border-slate-200/80 shadow-premium p-6 animate-fade-in">
        <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full overflow-hidden border-2 p-0.5 bg-white shrink-0 ${
              isHealthy ? 'border-emerald-500' : 'border-red-500'
            }`}>
              <img
                src={selectedAnimal.image}
                alt={selectedAnimal.name}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-800 tracking-tight">{selectedAnimal.name}</h3>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  isHealthy ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600 animate-pulse'
                }`}>
                  {selectedAnimal.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                Cattle Tag ID: <span className="text-slate-800 font-bold">{selectedAnimal.id}</span> · Owner: <span className="text-slate-800 font-bold">{selectedAnimal.owner || 'Chisamba Valley Dairy'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={handleCloseSheet}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Cattle Inspection & Biometrics */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-brand-500" />
              Cattle Inspection & Biometrics
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Breed Type', value: selectedAnimal.breed },
                { label: 'Estimated Age', value: selectedAnimal.age },
                { label: 'Total Weight', value: selectedAnimal.weight },
                { label: 'Health Score', value: `${selectedAnimal.healthScore || 95}%`, color: isHealthy ? 'text-emerald-600' : 'text-red-500' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</span>
                  <span className={`text-xs font-extrabold ${color || 'text-slate-800'}`}>{value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-650 bg-slate-50/60 px-3 py-2.5 rounded-xl border border-slate-100">
              <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
              <span>Current GPS Fix:</span>
              <span className="text-slate-800 font-extrabold">{selectedAnimal.location?.lat?.toFixed(6)}, {selectedAnimal.location?.lng?.toFixed(6)}</span>
            </div>
          </div>

          {/* Column 2: Live Collar Diagnostics & Control */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-brand-500" />
              Live Collar Diagnostics & Control
            </h4>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'GPS Collar ID', value: selectedAnimal.collarId },
                { label: 'Sync Status', value: selectedAnimal.lastSync },
                { label: 'Signal strength', value: selectedAnimal.signal || 'Strong', color: 'text-emerald-600', icon: <Wifi className="w-3.5 h-3.5" /> },
                { label: 'Collar Battery', value: `${selectedAnimal.battery}%`, color: selectedAnimal.battery < 20 ? 'text-red-500 animate-pulse' : 'text-emerald-600', icon: <Battery className="w-3.5 h-3.5" /> },
              ].map(({ label, value, color, icon }) => (
                <div key={label} className="bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</span>
                  <span className={`text-xs font-extrabold flex items-center gap-1.5 ${color || 'text-slate-800'}`}>
                    {icon}{value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={handleSatellitePing}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-705 font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 border border-slate-200 transition"
              >
                <RotateCw className="w-4 h-4 text-slate-500" />
                Ping GPS Collar
              </button>
              <button
                onClick={handleSimulateAlert}
                className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 border border-red-100 transition"
              >
                <BellRing className="w-4 h-4 text-red-500" />
                Trigger Anti-Theft Siren
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full max-h-full overflow-y-auto animate-fade-in bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">

      {/* ── 1. MAP SECTION (Full-Width Map Card at the Top) ── */}
      <div className="bg-white sm:mx-6 sm:mt-6 sm:rounded-2xl border-x-0 sm:border border-slate-200/80 shadow-premium overflow-hidden">
        {/* Card header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 px-4 pt-4 pb-3 sm:px-5 sm:pt-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Active Pasture Grid Monitoring</h3>
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 font-extrabold text-[8px] tracking-wider px-2 py-0.5 rounded-full uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
              {selectedAnimal ? `Inspecting: ${selectedAnimal.name}` : 'Tap a beacon to inspect cattle telemetry'}
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSatellitePing} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[11px] px-3 py-2 rounded-xl flex items-center gap-1.5 border border-slate-200 transition shrink-0">
              <RotateCw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Handshake Ping</span>
              <span className="sm:hidden">Ping</span>
            </button>
            <button onClick={handleSimulateAlert} className="bg-red-50 hover:bg-red-100 text-red-700 font-extrabold text-[11px] px-3 py-2 rounded-xl flex items-center gap-1.5 border border-red-100 transition shrink-0">
              <BellRing className="w-3.5 h-3.5 text-red-500" />
              <span className="hidden sm:inline">Simulate Alarm</span>
              <span className="sm:hidden">Alarm</span>
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div className="w-full">
          <LiveMap
            animals={animals}
            selectedAnimal={selectedAnimal}
            onSelectAnimal={handleSelectAnimal}
            geofenceRadius={geofenceRadius}
            onRadiusChange={onRadiusChange}
            darkMode={darkMode}
          />
        </div>
      </div>

      {/* ── 2. HORIZONTAL ANIMAL SELECTOR ROW (Under the Map) ── */}
      <div className="bg-white mx-0 sm:mx-6 mt-4 sm:rounded-2xl border-t border-x-0 sm:border border-slate-200/80 shadow-premium px-4 py-4 sm:p-5 space-y-3">
        <div className="flex justify-between items-baseline">
          <div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tracked Cattle Beacons</h3>
            <p className="text-[9px] text-slate-500 mt-0.5">Tap a cattle beacon to inspect details</p>
          </div>
          <span className="text-[9px] font-extrabold text-brand-500 bg-brand-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
            {animals.length} Total Tags
          </span>
        </div>

        <div className="flex overflow-x-auto gap-3 pb-2 pt-1 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
          {animals.map((animal) => {
            const isSelected = selectedAnimal?.id === animal.id;
            const isHealthy  = animal.status === 'Healthy';
            return (
              <button
                key={animal.id}
                onClick={() => handleSelectAnimal(animal)}
                className={`flex items-center gap-3 p-2.5 px-3.5 rounded-xl border text-left transition-all shrink-0 min-w-[165px] active:scale-95 ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/50 shadow-sm'
                    : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={animal.image}
                    alt={animal.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    onError={(e) => { e.target.style.display='none'; }}
                  />
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${isHealthy ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-extrabold text-slate-800 leading-tight truncate">{animal.name}</h4>
                  <p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase truncate">{animal.id}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Battery className={`w-3 h-3 shrink-0 ${animal.battery < 20 ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`} />
                    <span className="text-[9px] text-slate-500 font-bold">{animal.battery}%</span>
                    <span className={`ml-1 text-[8px] font-extrabold uppercase ${isHealthy ? 'text-emerald-600' : 'text-red-500'}`}>
                      {animal.status}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. DESKTOP INTEGRATED BOTTOM PANEL ── */}
      <div className="hidden md:block">
        <DesktopDetailPanel />
      </div>

      {/* ── 4. MOBILE BOTTOM SHEET (Mobile details panel) ── */}
      {/* Backdrop */}
      {sheetOpen && selectedAnimal && (
        <div
          className="fixed inset-0 z-40 bg-white/10 dark:bg-slate-900/30 backdrop-blur-sm md:hidden"
          onClick={handleCloseSheet}
        />
      )}

      {/* Sheet panel drawer */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-950 rounded-t-3xl border-t border-slate-200 dark:border-slate-700 shadow-2xl transition-transform duration-500 ease-out md:hidden ${
        sheetOpen && selectedAnimal ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {selectedAnimal && (
          <div className="max-h-[78vh] overflow-y-auto">
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-slate-200 rounded-full" />
            </div>
            <MobileDetailPanel onClose={handleCloseSheet} />
            <div className="flex items-center justify-center gap-1 text-[9px] text-slate-400 font-semibold py-3">
              <ChevronDown className="w-3 h-3" />
              <span>Tap backdrop to close</span>
            </div>
            <div className="h-safe-area-inset-bottom" />
          </div>
        )}
      </div>

      <div className="h-6 sm:h-6" />
    </div>
  );
}
