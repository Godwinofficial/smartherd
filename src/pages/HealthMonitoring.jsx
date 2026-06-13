import React, { useState } from 'react';
import {
  HeartPulse,
  ShieldAlert,
  Calendar,
  FileText,
  Plus,
  User,
  Thermometer,
  Droplet,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { mockVaccines } from '../data/mockHerd';

export default function HealthMonitoring({ animals }) {
  const [vaccines, setVaccines] = useState(mockVaccines);
  const [treatments, setTreatments] = useState([
    { id: 'tr-1', animal: 'Tembo (SH-002)', treatment: 'Antipyretic (Fever Reducer)', date: 'Today, 10:45 AM', vet: 'Dr. John Phiri' },
    { id: 'tr-2', animal: 'Mutinta (SH-001)', treatment: 'Deworming (Albendazole)', date: 'Yesterday', vet: 'Godwin Banda (Manager)' }
  ]);

  const [newTreatment, setNewTreatment] = useState({
    animal: 'Mutinta (SH-001)',
    treatment: '',
    vet: 'Godwin Banda (Manager)'
  });

  const [newVaccine, setNewVaccine] = useState({
    animal: 'Mutinta (SH-001)',
    vaccine: '',
    date: ''
  });

  const [showForms, setShowForms] = useState(false);

  const handleAddTreatment = (e) => {
    e.preventDefault();
    if (!newTreatment.treatment) return;
    setTreatments([
      {
        id: `tr-${Date.now()}`,
        animal: newTreatment.animal,
        treatment: newTreatment.treatment,
        date: 'Just now',
        vet: newTreatment.vet
      },
      ...treatments
    ]);
    setNewTreatment({ ...newTreatment, treatment: '' });
  };

  const handleAddVaccine = (e) => {
    e.preventDefault();
    if (!newVaccine.vaccine || !newVaccine.date) return;
    setVaccines([
      {
        id: `vac-${Date.now()}`,
        animal: newVaccine.animal,
        vaccine: newVaccine.vaccine,
        date: newVaccine.date,
        status: 'Upcoming'
      },
      ...vaccines
    ]);
    setNewVaccine({ animal: 'Mutinta (SH-001)', vaccine: '', date: '' });
  };

  // Find sick animals
  const sickAnimals = animals.filter(a => a.status === 'Attention');

  const vets = [
    { name: 'Dr. John Phiri', role: 'Chief Veterinary Officer', contact: '+260 97 789456', region: 'Chisamba District' },
    { name: 'Dr. Mwansa Chanda', role: 'Livestock Epidemic Specialist', contact: '+260 96 112233', region: 'Kafue / Mazabuka' }
  ];

  return (
    <div className="space-y-6 p-6 max-h-full overflow-y-auto animate-fade-in">

      {/* Alert Warning Block */}
      {sickAnimals.length > 0 && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-red-900">
          <div className="flex gap-3 items-center">
            <Thermometer className="w-8 h-8 text-red-500 animate-pulse" />
            <div>
              <h4 className="text-sm font-extrabold">Health Alerts Flagged</h4>
              <p className="text-xs text-red-600 mt-0.5">
                {sickAnimals.length} animal(s) require veterinary attention due to abnormal temperature or geofence breaches.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowForms(!showForms)}
            className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow transition"
          >
            Log Treatment Response
          </button>
        </div>
      )}

      {/* Forms Drawer */}
      {showForms && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 border border-slate-200 p-5 rounded-2xl animate-slide-up">
          {/* Treatment Log Form */}
          <form onSubmit={handleAddTreatment} className="space-y-3">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Log Treatment Action</h4>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Cattle Name</label>
              <select
                value={newTreatment.animal}
                onChange={e => setNewTreatment({ ...newTreatment, animal: e.target.value })}
                className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-brand-500 bg-white"
              >
                {animals.map(a => (
                  <option key={a.id} value={`${a.name} (${a.id})`}>{a.name} ({a.id})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Therapeutic Treatment</label>
              <input
                type="text"
                value={newTreatment.treatment}
                onChange={e => setNewTreatment({ ...newTreatment, treatment: e.target.value })}
                placeholder="e.g. Antibiotic Injection (5ml Oxytetracycline)"
                className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-brand-500 bg-white"
              />
            </div>
            <button
              type="submit"
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow transition"
            >
              Add Treatment Log
            </button>
          </form>

          {/* Vaccine Scheduler Form */}
          <form onSubmit={handleAddVaccine} className="space-y-3">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Schedule Vaccination</h4>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Cattle Name</label>
              <select
                value={newVaccine.animal}
                onChange={e => setNewVaccine({ ...newVaccine, animal: e.target.value })}
                className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-brand-500 bg-white"
              >
                {animals.map(a => (
                  <option key={a.id} value={`${a.name} (${a.id})`}>{a.name} ({a.id})</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Vaccine</label>
                <input
                  type="text"
                  value={newVaccine.vaccine}
                  onChange={e => setNewVaccine({ ...newVaccine, vaccine: e.target.value })}
                  placeholder="e.g. Anthrax booster"
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-brand-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Date</label>
                <input
                  type="text"
                  value={newVaccine.date}
                  onChange={e => setNewVaccine({ ...newVaccine, date: e.target.value })}
                  placeholder="June 30, 2026"
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-brand-500 bg-white"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow transition"
            >
              Add Vaccine Booster
            </button>
          </form>
        </div>
      )}

      {/* Layout Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Treatment log registry */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Active Treatment & Medication Log</h3>
              <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Clinical logs for herd diagnostics</p>
            </div>
            <button
              onClick={() => setShowForms(!showForms)}
              className="text-xs font-bold text-brand-500 hover:underline"
            >
              Log New Treatment
            </button>
          </div>

          <div className="space-y-3">
            {treatments.map((tr) => (
              <div key={tr.id} className="p-4 border border-slate-100 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-3 hover:bg-slate-50/50 transition">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                    <HeartPulse className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-800">{tr.treatment}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Administered to: <strong className="text-slate-600">{tr.animal}</strong></p>
                  </div>
                </div>
                <div className="text-left sm:text-right text-[10px] font-bold text-slate-500">
                  <p className="text-slate-700">{tr.vet}</p>
                  <p className="opacity-60 mt-0.5">{tr.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vaccination Scheduler List */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Vaccine Boosters</h3>
              <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Immunization tracking calendar</p>
            </div>
          </div>

          <div className="space-y-3">
            {vaccines.map((vac) => {
              const isCompleted = vac.status === 'Completed';
              return (
                <div
                  key={vac.id}
                  className={`p-3 border rounded-xl flex items-center justify-between transition ${isCompleted ? 'border-emerald-100 bg-emerald-50/10' : 'border-slate-100 hover:bg-slate-50/50'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isCompleted ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                      }`}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-800">{vac.vaccine}</h4>
                      <p className="text-[9px] font-semibold text-slate-400 mt-0.5">{vac.animal}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${isCompleted ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {isCompleted ? 'Done' : vac.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Veterinary Experts Directory */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium space-y-4">
        <div>
          <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Registered Veterinary Directory</h3>
          <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Direct contact support details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vets.map((vet, idx) => (
            <div key={idx} className="p-4 border border-slate-100 rounded-2xl flex justify-between items-center gap-4 hover:bg-slate-50/50 transition">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 font-extrabold text-xs text-slate-600">
                  JP
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800">{vet.name}</h4>
                  <p className="text-[10px] font-bold text-brand-600">{vet.role}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">{vet.region}</p>
                </div>
              </div>
              <a
                href={`tel:${vet.contact.replace(/\s+/g, '')}`}
                className="bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold px-4 py-2 rounded-xl border border-brand-100 transition"
              >
                Call Support
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
