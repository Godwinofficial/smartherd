import React, { useState } from 'react';
import { 
  Bell, 
  ShieldAlert, 
  Check, 
  Trash2, 
  BellOff, 
  Settings, 
  Mail, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { mockAlerts } from '../data/mockHerd';

export default function AlertsCenter({ alerts: initialAlerts, onResolveAlert }) {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState({
    sms: true,
    email: false,
    whatsapp: true,
    theft: true,
    fence: true
  });

  const handleResolve = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, resolved: true } : a));
    if (onResolveAlert) onResolveAlert(id);
  };

  const handleDelete = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Critical') return alert.severity === 'Critical' && !alert.resolved;
    if (activeTab === 'Warning') return alert.severity === 'Warning' && !alert.resolved;
    if (activeTab === 'Resolved') return alert.resolved;
    return true;
  });

  const handleMute = () => {
    alert("Collar audio beacons muted for 1 hour.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-h-full overflow-y-auto animate-fade-in">
      
      {/* Alert List Column */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Filters and Title */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-premium flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
              <Bell className="w-5 h-5 text-slate-600" />
              <span>Collar Telemetry Warnings</span>
            </h3>
            <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Sat-linked event history log</p>
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {['All', 'Critical', 'Warning', 'Resolved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border transition ${
                  activeTab === tab 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Live Alerts Stream */}
        <div className="space-y-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => {
              const isCritical = alert.severity === 'Critical';
              const isResolved = alert.resolved;

              return (
                <div 
                  key={alert.id}
                  className={`p-4 rounded-2xl border transition shadow-premium flex flex-col sm:flex-row justify-between sm:items-center gap-4 ${
                    isResolved 
                      ? 'bg-slate-50/50 border-slate-100 opacity-60' 
                      : isCritical 
                      ? 'bg-red-50/30 border-red-100 hover:bg-red-50/50' 
                      : 'bg-amber-50/30 border-amber-100 hover:bg-amber-50/50'
                  }`}
                >
                  <div className="flex gap-3.5 items-start">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                      isResolved 
                        ? 'bg-slate-100 border-slate-200 text-slate-400' 
                        : isCritical 
                        ? 'bg-red-100 border-red-200 text-red-600 animate-pulse'
                        : 'bg-amber-100 border-amber-200 text-amber-600'
                    }`}>
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          isResolved 
                            ? 'bg-slate-200 text-slate-600' 
                            : isCritical 
                            ? 'bg-red-100 text-red-700 font-extrabold' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {alert.type}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">{alert.time}</span>
                      </div>
                      <h4 className="text-xs font-extrabold text-slate-800 mt-1.5">{alert.animal}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{alert.message}</p>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  {!isResolved && (
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleResolve(alert.id)}
                        className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1 transition"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Resolve</span>
                      </button>
                      <button
                        onClick={() => handleDelete(alert.id)}
                        className="p-2 border border-slate-200 hover:bg-red-50 hover:border-red-100 text-slate-400 hover:text-red-500 rounded-xl transition"
                        title="Delete Alert"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-slate-50/50 p-8 border border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-500">
              No alerts matching the selected category. The herd appears fully healthy and secure.
            </div>
          )}
        </div>

      </div>

      {/* Settings Panel Column */}
      <div className="space-y-6">
        
        {/* Security Quick Controls */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Antitheft Sound Alarms</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Trigger collar sirens remotely to scare predators, highlight theft, or isolate animals.
          </p>
          <div className="flex gap-2.5">
            <button 
              onClick={() => alert("Broadcasting collar sirening beacons to all pasture repeaters!")}
              className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs py-2.5 rounded-xl shadow transition"
            >
              Test Siren Sound
            </button>
            <button 
              onClick={handleMute}
              className="p-2.5 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl transition"
              title="Mute Sirens"
            >
              <BellOff className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium space-y-4">
          <div className="flex items-center gap-2">
            <Settings className="w-4.5 h-4.5 text-slate-400" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Warning Dispatch Channels</h3>
          </div>

          <div className="space-y-3.5 text-xs text-slate-600 font-semibold">
            
            <label className="flex items-center justify-between cursor-pointer">
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-brand-500" />
                SMS Warnings (Airtel/MTN)
              </span>
              <input 
                type="checkbox" 
                checked={notifications.sms}
                onChange={e => setNotifications({ ...notifications, sms: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-500" />
                Email Reports
              </span>
              <input 
                type="checkbox" 
                checked={notifications.email}
                onChange={e => setNotifications({ ...notifications, email: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-500" />
                WhatsApp Alerts (Active)
              </span>
              <input 
                type="checkbox" 
                checked={notifications.whatsapp}
                onChange={e => setNotifications({ ...notifications, whatsapp: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer border-t border-slate-100 pt-3">
              <span>Critical Theft Alarm Dispatch</span>
              <input 
                type="checkbox" 
                checked={notifications.theft}
                onChange={e => setNotifications({ ...notifications, theft: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span>Geofence Boundary Violations</span>
              <input 
                type="checkbox" 
                checked={notifications.fence}
                onChange={e => setNotifications({ ...notifications, fence: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
            </label>

          </div>
        </div>

      </div>

    </div>
  );
}
