import React, { useState, useRef } from 'react';
import { Tag, Cpu, Battery, Wifi, CheckCircle2, X, Camera, Upload } from 'lucide-react';
import { mockDevices } from '../data/mockHerd';

export default function OnboardingFlow({ isOpen, onClose, onRegister }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    breed: 'Angoni',
    age: '',
    weight: '',
    owner: 'Chisamba Valley Dairy',
    collarId: '',
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [calibrated, setCalibrated] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 2) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCalibrated(true);
        setStep(3);
      }, 3000);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      ...formData,
      id: `SH-00${Math.floor(Math.random() * 900) + 100}`,
      healthScore: 100,
      status: 'Healthy',
      location: {
        lat: -14.972  + (Math.random() * 0.008 - 0.004),
        lng:  28.255  + (Math.random() * 0.008 - 0.004),
      },
      battery: 100,
      signal: 'Strong',
      lastSync: 'Just now',
      isActive: true,
      history: [{ date: 'Today', event: 'Registered & GPS collar linked' }],
      image: photoPreview || '/src/assets/cow1.png',
    });
    setStep(1);
    setFormData({ name: '', breed: 'Angoni', age: '', weight: '', owner: 'Chisamba Valley Dairy', collarId: '' });
    setPhotoPreview(null);
    setCalibrated(false);
    onClose();
  };

  const unlinkedCollars = mockDevices.filter((d) => d.animal === 'Unlinked');

  /* ── shared input / select classes ── */
  const inputCls =
    'w-full text-sm border border-slate-200 bg-white text-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-200 transition placeholder:text-slate-400';

  const labelCls =
    'block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 dark:bg-slate-900/40 backdrop-blur-md animate-fade-in px-4">
      <div className="bg-white dark:bg-slate-950 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative border border-slate-100 dark:border-slate-700 mx-auto max-h-[92vh] overflow-y-auto">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wizard Header */}
        <div className="mb-6 pr-6">
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Register New Animal & Collar</h2>
          <p className="text-xs text-slate-500 mt-1">Add details, link a GPS tracker, and calibrate telemetry.</p>

          {/* Progress bar */}
          <div className="flex items-center gap-3 mt-4">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  step >= s ? 'bg-brand-500' : 'bg-slate-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── STEP 1: Animal Details ── */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-brand-50 p-3 rounded-xl border border-brand-100 text-brand-800">
              <Tag className="w-5 h-5 text-brand-600 shrink-0" />
              <span className="text-xs font-bold">STEP 1: ANIMAL PROFILE INFORMATION</span>
            </div>

            {/* Photo upload */}
            <div className="flex items-center gap-4">
              {/* Preview circle */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-16 h-16 rounded-full border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden cursor-pointer hover:border-brand-400 hover:bg-brand-50 transition shrink-0"
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-6 h-6 text-slate-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-600 mb-1">Animal Photo</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-[11px] font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 border border-brand-200 px-3 py-1.5 rounded-lg transition"
                >
                  <Upload className="w-3.5 h-3.5" />
                  {photoPreview ? 'Change Photo' : 'Upload from Device'}
                </button>
                <p className="text-[9px] text-slate-400 mt-1">JPG, PNG or WEBP · Optional</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>

          <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className={labelCls}>Animal Name / Tag</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sipho, Bwalya"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Breed</label>
                <select
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  className={inputCls}
                >
                  {['Angoni', 'Tonga', 'Barotse', 'Boran', 'Brahman', 'Holstein'].map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls}>Age (Years)</label>
                <input
                  type="text"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="e.g. 2.5"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Weight (kg)</label>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="e.g. 420"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Owner / Ranch</label>
                <input
                  type="text"
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={handleNext}
                disabled={!formData.name || !formData.age || !formData.weight}
                className="bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow transition"
              >
                Next: Link Tracker →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Link GPS Collar ── */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-brand-50 p-3 rounded-xl border border-brand-100 text-brand-800">
              <Cpu className="w-5 h-5 text-brand-600 shrink-0" />
              <span className="text-xs font-bold">STEP 2: LINK SMART GPS COLLAR</span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-bold text-slate-700">Calibrating telemetry sensor...</p>
                <p className="text-xs text-slate-400">Establishing secure satellite handshake</p>
              </div>
            ) : (
              <>
                <p className="text-xs text-slate-500 mb-2">
                  Select an available collar to assign to <strong className="text-slate-700">{formData.name}</strong>:
                </p>

                <div className="space-y-2.5">
                  {unlinkedCollars.length > 0 ? (
                    unlinkedCollars.map((device) => (
                      <div
                        key={device.id}
                        onClick={() => setFormData({ ...formData, collarId: device.id })}
                        className={`p-3 border rounded-xl cursor-pointer flex items-center justify-between transition-all ${
                          formData.collarId === device.id
                            ? 'border-brand-500 bg-brand-50 shadow-sm'
                            : 'border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-white'
                        }`}
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-800">{device.id}</p>
                          <p className="text-[10px] font-semibold text-slate-400 mt-0.5">{device.model}</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                          <span className="flex items-center gap-1">
                            <Battery className="w-3.5 h-3.5 text-emerald-500" />
                            {device.battery}%
                          </span>
                          <span className="flex items-center gap-1">
                            <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                            {device.signal}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-500">
                      No unlinked collars available. Please activate a new collar in Device Management.
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={handleBack}
                    className="text-slate-600 hover:bg-slate-50 font-bold text-sm px-6 py-2.5 rounded-xl border border-slate-200 transition"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!formData.collarId}
                    className="bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow transition"
                  >
                    Link & Sync Device
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── STEP 3: Success Confirmation ── */}
        {step === 3 && calibrated && (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-800">Handshake Successful!</h3>
              <p className="text-xs text-slate-500 max-w-[280px] leading-relaxed">
                GPS device <strong className="text-slate-700">{formData.collarId}</strong> is now securely paired
                and broadcasting live telemetry coordinates.
              </p>
            </div>

            {/* Summary card */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2.5">
              {[
                { label: 'Animal',      value: formData.name,     bold: true },
                { label: 'Breed',       value: formData.breed },
                { label: 'Collar ID',   value: formData.collarId, bold: true },
                { label: 'Sync Status', value: 'ACTIVE (10s interval)', green: true },
              ].map(({ label, value, bold, green }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="font-semibold text-slate-500">{label}:</span>
                  <span className={`${bold ? 'font-bold text-slate-800' : ''} ${green ? 'font-bold text-emerald-600' : ''}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={handleSubmit}
                className="bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm px-8 py-3 rounded-xl shadow transition"
              >
                Complete Onboarding ✓
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
