import React, { useState } from 'react';
import { 
  Cpu, 
  Battery, 
  Wifi, 
  ShieldCheck, 
  Settings, 
  Plus, 
  Check, 
  Power, 
  AlertCircle 
} from 'lucide-react';
import { mockDevices } from '../data/mockHerd';

export default function DeviceManagement() {
  const [devices, setDevices] = useState(mockDevices);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const handleRegisterDevice = (e) => {
    e.preventDefault();
    if (!newDeviceName) return;
    const newCollar = {
      id: newDeviceName.toUpperCase(),
      model: 'SmartHerd G3',
      battery: 100,
      signal: 'Excellent',
      lastSync: 'Never',
      status: 'Inactive (Ready)',
      animal: 'Unlinked'
    };
    setDevices([newCollar, ...devices]);
    setNewDeviceName('');
    setShowAdd(false);
  };

  const handleToggleCollar = (id) => {
    setDevices(devices.map(device => {
      if (device.id === id) {
        const isOffline = device.status === 'Active';
        return {
          ...device,
          status: isOffline ? 'Inactive (Ready)' : 'Active',
          lastSync: isOffline ? 'Offline' : 'Just now',
          battery: isOffline ? device.battery : 100
        };
      }
      return device;
    }));
  };

  return (
    <div className="space-y-6 p-6 max-h-full overflow-y-auto animate-fade-in">
      
      {/* Device Overview Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Telemetry Collar Inventory</h3>
          <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Manage and calibrate GPS smart collars</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>Register GPS Collar</span>
        </button>
      </div>

      {/* Add Device Form */}
      {showAdd && (
        <form onSubmit={handleRegisterDevice} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4 max-w-md animate-slide-up">
          <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">New Device Collar Details</h4>
          <div className="flex gap-3">
            <input 
              type="text" 
              value={newDeviceName}
              onChange={e => setNewDeviceName(e.target.value)}
              placeholder="e.g. COLLAR-ZA-107"
              className="flex-1 text-xs border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 bg-white transition"
            />
            <button 
              type="submit"
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition"
            >
              Add Device
            </button>
          </div>
        </form>
      )}

      {/* Device Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {devices.map((device) => {
          const isLowBattery = device.battery < 20;
          const isInactive = device.status.includes('Inactive');
          const isUnlinked = device.animal === 'Unlinked';

          return (
            <div 
              key={device.id} 
              className={`bg-white p-5 rounded-2xl border transition shadow-premium hover:shadow-premium-hover ${
                isLowBattery ? 'border-red-200 bg-red-50/5' : 'border-slate-200/80'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                    isInactive 
                      ? 'bg-slate-50 border-slate-200 text-slate-400' 
                      : isLowBattery 
                      ? 'bg-red-50 border-red-100 text-red-500 animate-pulse'
                      : 'bg-brand-50 border-brand-100 text-brand-500'
                  }`}>
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{device.id}</h4>
                    <p className="text-[10px] font-semibold text-slate-400 mt-0.5">{device.model}</p>
                  </div>
                </div>

                {/* Battery Status */}
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1">
                    <Battery className={`w-4 h-4 ${isLowBattery ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`} />
                    <span className={`text-xs font-bold ${isLowBattery ? 'text-red-500 font-extrabold' : 'text-slate-700'}`}>
                      {device.battery}%
                    </span>
                  </div>
                  {isLowBattery && (
                    <span className="text-[8px] font-bold text-red-500 uppercase tracking-wide mt-1 animate-pulse flex items-center gap-0.5">
                      <AlertCircle className="w-2.5 h-2.5" />
                      Critical Battery
                    </span>
                  )}
                </div>
              </div>

              {/* Collar stats */}
              <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-100 text-xs">
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Assigned Cattle</span>
                  <span className={`font-bold ${isUnlinked ? 'text-slate-400 italic' : 'text-slate-800'}`}>
                    {device.animal}
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Signal Strength</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                    {device.signal}
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Last Sync Interval</span>
                  <span className="font-semibold text-slate-800">{device.lastSync}</span>
                </div>
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Sat Status</span>
                  <span className={`font-bold ${isInactive ? 'text-slate-400' : 'text-emerald-600'}`}>
                    {isInactive ? 'Off' : '10s beacons'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-5 pt-4 border-t border-slate-100">
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                  isInactive 
                    ? 'bg-slate-100 text-slate-500' 
                    : isLowBattery 
                    ? 'bg-red-50 text-red-700' 
                    : 'bg-emerald-50 text-emerald-700'
                }`}>
                  {device.status}
                </span>

                <button
                  onClick={() => handleToggleCollar(device.id)}
                  className={`p-2 rounded-xl border transition flex items-center gap-1 ${
                    isInactive 
                      ? 'border-brand-100 bg-brand-50/50 hover:bg-brand-50 text-brand-600' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                  title={isInactive ? "Activate GPS Collar" : "Deactivate GPS Collar"}
                >
                  <Power className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase px-1">
                    {isInactive ? "Power On" : "Power Off"}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
