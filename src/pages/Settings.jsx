import React, { useState } from 'react';
import {
  Settings,
  Map,
  ShieldAlert,
  Save,
  Wifi,
  Sliders,
  Building,
  User
} from 'lucide-react';

export default function SettingsPage({ geofenceRadius, onRadiusChange }) {
  const [farmInfo, setFarmInfo] = useState({
    name: 'Chisamba Valley Dairy',
    manager: 'Godwin Banda',
    email: 'k.mwamba@agro-hub.zm',
    phone: '+260 97 123456',
    hectares: '1200 Hectares'
  });

  const [telemetry, setTelemetry] = useState({
    interval: '10s',
    sensitivity: 'high',
    autoResolve: false
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert("Farm settings saved successfully and broadcasted to smart collars!");
  };

  return (
    <div className="space-y-6 p-6 max-h-full overflow-y-auto animate-fade-in max-w-4xl">

      <form onSubmit={handleSave} className="space-y-6">

        {/* Farm Profile */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium space-y-4">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-slate-600" />
            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Ranch & Farm Coordinates</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Ranch Name</label>
              <input
                type="text"
                value={farmInfo.name}
                onChange={e => setFarmInfo({ ...farmInfo, name: e.target.value })}
                className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Senior Ranch Manager</label>
              <input
                type="text"
                value={farmInfo.manager}
                onChange={e => setFarmInfo({ ...farmInfo, manager: e.target.value })}
                className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Contact Phone</label>
              <input
                type="text"
                value={farmInfo.phone}
                onChange={e => setFarmInfo({ ...farmInfo, phone: e.target.value })}
                className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pasture Size (Hectares)</label>
              <input
                type="text"
                value={farmInfo.hectares}
                onChange={e => setFarmInfo({ ...farmInfo, hectares: e.target.value })}
                className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Geofence & Anti-theft Limits */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium space-y-4">
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-slate-600" />
            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Geofence Boundaries & Anti-theft Parameters</h3>
          </div>

          <div className="space-y-4 text-xs">
            {/* Slider for Geofence */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-700">
                <span className="uppercase text-[10px] text-slate-400">GPS GEOFENCE LIMITS</span>
                <span className="text-brand-500">{geofenceRadius} meters</span>
              </div>
              <input
                type="range"
                min="400"
                max="1200"
                step="100"
                value={geofenceRadius}
                onChange={e => onRadiusChange(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
              <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-1">
                Collar GPS beacons exceeding this radius from the central pasture node (-14.9720, 28.2550) will immediately trigger theft alert protocols.
              </p>
            </div>

            {/* Anti theft sensitivity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Collar G-Force Sensitivity</label>
                <select
                  value={telemetry.sensitivity}
                  onChange={e => setTelemetry({ ...telemetry, sensitivity: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 bg-white"
                >
                  <option value="low">Low (Gentle walking only)</option>
                  <option value="medium">Medium (Standard grazing movements)</option>
                  <option value="high">High (Accelerated running - theft warning)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sat Sync Intervals</label>
                <select
                  value={telemetry.interval}
                  onChange={e => setTelemetry({ ...telemetry, interval: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 bg-white"
                >
                  <option value="10s">10s Beacons (High battery use)</option>
                  <option value="30s">30s Beacons (Balanced)</option>
                  <option value="2m">2m Beacons (Power saver)</option>
                  <option value="10m">10m Beacons (Restricted Sync)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Save button footer */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow transition flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>

      </form>

    </div>
  );
}
