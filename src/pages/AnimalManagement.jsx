import React, { useState } from 'react';
import { 
  Heart, 
  Scale, 
  Clock, 
  ShieldCheck, 
  Plus, 
  Search, 
  User, 
  MapPin, 
  ArrowRight,
  TrendingUp,
  X
} from 'lucide-react';
import StatusRing from '../components/StatusRing';

export default function AnimalManagement({ animals, onOpenOnboarding }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Filter animals based on search term and selected status filter
  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = 
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'All' || 
      animal.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6 max-h-full overflow-y-auto animate-fade-in bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      
      {/* Page Header */}
      <div className="flex flex-col gap-2 mb-2">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Herd Roster</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Manage and monitor all animals in your herd with real-time health and GPS tracking data.</p>
      </div>

      {/* Stats Summary Cards */}
      <div className="flex gap-3 overflow-x-auto pb-3 mb-2 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
        <div className="min-w-[160px] flex-shrink-0 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Total Cattle</span>
          <span className="text-lg font-extrabold text-slate-800 dark:text-slate-100">{filteredAnimals.length}</span>
        </div>
        <div className="min-w-[160px] flex-shrink-0 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Healthy</span>
          <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">{filteredAnimals.filter(a => a.status === 'Healthy').length}</span>
        </div>
        <div className="min-w-[160px] flex-shrink-0 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Attention</span>
          <span className="text-lg font-extrabold text-red-600 dark:text-red-400">{filteredAnimals.filter(a => a.status === 'Attention').length}</span>
        </div>
        <div className="min-w-[160px] flex-shrink-0 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">GPS Online</span>
          <span className="text-lg font-extrabold text-brand-600 dark:text-brand-400">{filteredAnimals.length}</span>
        </div>
      </div>
      
      {/* Header Filters */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-premium space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Search */}
          <div className="relative w-full sm:flex-1 sm:max-w-sm">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search name, tag ID, breed, owner..."
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:bg-white dark:focus:bg-slate-700 transition text-slate-700 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          {/* Onboard Button */}
          <button 
            onClick={onOpenOnboarding}
            className="bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow hover:shadow-lg transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Animal</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider self-center">Filter:</span>
          {['All', 'Healthy', 'Attention'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-lg border transition ${
                filterStatus === status 
                  ? 'bg-brand-500 text-white border-brand-500 shadow-sm' 
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

      </div>

      {/* Grid of Animal Profiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredAnimals.map((animal) => {
          const isHealthy = animal.status === 'Healthy';
          return (
            <div 
              key={animal.id} 
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:scale-[1.01] hover:border-slate-300 dark:hover:border-slate-600 flex flex-col overflow-hidden group"
            >
              {/* Header profile with image & StatusRing */}
              <div className="p-4 space-y-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <StatusRing status={animal.status} imageSrc={animal.image} size="md" />
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">{animal.name}</h3>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">{animal.breed}</p>
                      </div>
                      
                      <div className={`text-right flex flex-col items-end gap-1 px-2 py-1 rounded-lg ${
                        isHealthy ? 'bg-emerald-50 dark:bg-emerald-950/30' : 'bg-red-50 dark:bg-red-950/30'
                      }`}>
                        <span className={`text-[9px] font-extrabold uppercase tracking-widest ${
                          isHealthy ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'
                        }`}>
                          {isHealthy ? 'Healthy' : 'Alert'}
                        </span>
                        <span className={`text-[11px] font-extrabold ${
                          isHealthy ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400 animate-pulse'
                        }`}>
                          {animal.healthScore}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                      <User className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                      <span>{animal.owner}</span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="font-mono text-slate-500 dark:text-slate-500">{animal.id}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-[11px]">
                <div className="text-center">
                  <span className="block font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Age</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{animal.age}</span>
                </div>
                <div className="text-center border-x border-slate-200 dark:border-slate-700 px-1">
                  <span className="block font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Weight</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1">
                    <Scale className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                    {animal.weight}
                  </span>
                </div>
                <div className="text-center">
                  <span className="block font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">GPS</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                    {animal.lastSync}
                  </span>
                </div>
              </div>

              {/* Collar & Action */}
              <div className="px-4 py-3 flex justify-between items-center">
                <div className="text-[11px]">
                  <span className="block font-bold text-slate-400 dark:text-slate-500 uppercase mb-0.5">Collar</span>
                  <span className="font-mono font-extrabold text-slate-700 dark:text-slate-300">{animal.collarId}</span>
                </div>
                <button 
                  onClick={() => setSelectedProfile(animal)}
                  className="text-xs font-bold text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 flex items-center gap-1 transition opacity-100"
                >
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Sheet Profile Detail */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 bg-black/10 dark:bg-slate-950/60 backdrop-blur-sm">
          <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl max-h-[85vh] overflow-hidden">
            <div className="relative pt-4 pb-2 px-4">
              <div className="mx-auto h-1.5 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
              <button 
                onClick={() => setSelectedProfile(null)} 
                className="absolute right-4 top-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition p-1.5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 3rem)' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 flex flex-col items-center text-center gap-4">
                  <div className="bg-white dark:bg-slate-800 p-2 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg">
                    <StatusRing status={selectedProfile.status} imageSrc={selectedProfile.image} size="xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">{selectedProfile.name}</h2>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{selectedProfile.breed}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1">{selectedProfile.id}</p>
                  </div>
                  <div className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 font-semibold">Health Status</span>
                      <span className={`font-extrabold px-2.5 py-1 rounded-lg ${selectedProfile.status === 'Healthy' ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300' : 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300'}`}>
                        {selectedProfile.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-2">
                      <span className="text-slate-500 dark:text-slate-400 font-semibold">GPS Collar</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">{selectedProfile.collarId}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-2">
                      <span className="text-slate-500 dark:text-slate-400 font-semibold">Owner</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedProfile.owner}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Detailed parameters, history logs */}
                <div className="md:col-span-2 space-y-6 pt-2">
                  
                  {/* Stats grid */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Vital Statistics</h4>
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="block text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Breed Type</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{selectedProfile.breed}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="block text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Current Age</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{selectedProfile.age}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="block text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Registered Weight</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                          <Scale className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                          {selectedProfile.weight}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="block text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Battery Status</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{selectedProfile.battery}% Capacity</span>
                      </div>
                    </div>
                  </div>

                  {/* History Movement Logs */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Recent Activity</h4>
                    <div className="space-y-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
                      {selectedProfile.history.map((hist, idx) => (
                        <div key={idx} className="flex gap-3 items-start text-xs border-l-2 border-brand-200 dark:border-brand-800 pl-4 py-2 relative ml-1">
                          {/* Timeline bullet */}
                          <span className="absolute -left-2 top-2.5 h-3 w-3 rounded-full border-2 border-white dark:border-slate-800 bg-brand-400 dark:bg-brand-600 shadow" />
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 shrink-0 w-20 font-mono">{hist.date}</span>
                          <p className="font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{hist.event}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Map quick panel */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Current Location</h4>
                    <div className="bg-gradient-to-br from-brand-50 dark:from-brand-950/30 to-brand-50/50 dark:to-brand-950/20 border border-brand-200 dark:border-brand-800/40 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-brand-900 dark:text-brand-100">
                      <span className="flex items-center gap-2.5 font-semibold text-sm">
                        <MapPin className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" />
                        <span className="font-mono text-[11px]">{selectedProfile.location.lat.toFixed(6)}, {selectedProfile.location.lng.toFixed(6)}</span>
                      </span>
                      <span className="text-[10px] font-extrabold bg-brand-500 dark:bg-brand-600 text-white px-3 py-1.5 rounded-lg uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        Connected
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
