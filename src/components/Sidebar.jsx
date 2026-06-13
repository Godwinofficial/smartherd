import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Grid, 
  Cpu, 
  HeartPulse, 
  Bell, 
  BarChart3, 
  FileSpreadsheet, 
  Settings, 
  Activity,
  X,
  Plus,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  alertCount = 0, 
  isOpen, 
  onClose, 
  onOpenOnboarding, 
  onLogout,
  darkMode,
  onToggleTheme 
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Herd', icon: LayoutDashboard },
    { id: 'tracking', label: 'Live Tracking', icon: Map },
    { id: 'animals', label: 'Animal Management', icon: Grid },
    { id: 'devices', label: 'GPS Devices', icon: Cpu },
    { id: 'health', label: 'Health Monitoring', icon: HeartPulse },
    { 
      id: 'alerts', 
      label: 'Alerts Center', 
      icon: Bell, 
      badge: alertCount > 0 ? alertCount : null 
    },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-white/10 dark:bg-slate-950/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside className={`fixed inset-y-0 left-0 w-64 bg-white text-slate-600 flex flex-col justify-between h-full border-r border-slate-200 shadow-premium z-50 transition-all duration-300 transform lg:relative lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          {/* Logo Brand Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/20 text-white animate-pulse-subtle">
                <Activity className="w-5.5 h-5.5" />
              </div>
              <div>
                <h1 className="text-slate-800 font-extrabold text-md tracking-tight leading-tight font-sans">SmartHerd</h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[9px] font-bold text-brand-600 bg-brand-50 px-1.5 py-0.2 rounded uppercase">LIVE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            </div>
            {/* Close button for mobile drawer */}
            <button 
              onClick={onClose}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="p-4 space-y-1">
            {/* Register Tag Button */}
            <button
              onClick={() => {
                onOpenOnboarding();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 mb-3 rounded-xl text-sm font-semibold transition-all duration-200 text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/15 group"
            >
              <Plus className="w-5 h-5 text-white transition-transform duration-200 group-hover:scale-110" />
              <span>Register Tag</span>
            </button>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                    isActive 
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/15' 
                      : 'hover:bg-slate-100 hover:text-slate-900 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand-500'
                    }`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white text-brand-600' : 'bg-red-500 text-white animate-pulse'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* System Status Footer replaced with simple copyright & Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-2">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100/80 transition border border-transparent"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-500" />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50 transition border border-transparent hover:border-red-100"
          >
            <LogOut className="w-4 h-4 animate-pulse-subtle" />
            <span>Log Out</span>
          </button>
          <p className="text-[9px] text-slate-400 font-medium text-center mt-1">
            © 2026 SmartHerd. All rights reserved.
          </p>
        </div>
      </aside>
    </>
  );
}
