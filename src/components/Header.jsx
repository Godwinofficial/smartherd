import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function Header({ onToggleSidebar }) {
  return (
    <header className="h-16 bg-white border-b border-slate-100 px-4 md:px-6 flex items-center justify-between shadow-sm z-10 shrink-0">
      {/* Search & Menu Toggle Group */}
      <div className="flex items-center gap-3 md:gap-4 flex-1 max-w-xl">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-xl text-slate-600 hover:bg-slate-50 transition focus:outline-none shrink-0"
          aria-label="Toggle Menu"
        >
          <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="13" y2="18" />
          </svg>
        </button>

        {/* Search bar */}
        <div className="relative flex-1">
          <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search animals, tags, trackers..."
            className="w-full text-xs bg-slate-50 border-0 text-slate-700 rounded-full pl-10 pr-4 py-2.5 outline-none focus:bg-white focus:ring-1 focus:ring-slate-200 transition font-medium"
          />
        </div>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0 pl-4">
        {/* Notification Bell */}
        <button className="w-9 h-9 rounded-full border border-slate-200/80 flex items-center justify-center text-slate-600 bg-white hover:bg-slate-50 transition shrink-0 relative">
          <Bell className="w-4.5 h-4.5 text-slate-700" />
          {/* Red dot badge */}
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-red-500 border border-white" />
        </button>

        {/* User initials avatar (JB) in blue circle */}
        <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white font-extrabold text-xs select-none shadow-sm shadow-brand-500/10 shrink-0">
          GB
        </div>
      </div>
    </header>
  );
}
