import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  Loader2, 
  CheckCircle2, 
  Plus, 
  Share2 
} from 'lucide-react';

export default function Reports() {
  const [reportType, setReportType] = useState('herd-summary');
  const [dateRange, setDateRange] = useState('month');
  const [generating, setGenerating] = useState(false);
  const [success, setSuccess] = useState(false);

  const [generatedLogs, setGeneratedLogs] = useState([
    { name: 'Chisamba_Valley_Herd_Summary_May2026.pdf', date: 'May 31, 2026', size: '2.4 MB', type: 'PDF' },
    { name: 'GPS_Collar_Vandalism_Audit_Q1.csv', date: 'April 02, 2026', size: '820 KB', type: 'CSV' },
    { name: 'Vaccination_Booster_Registry_Q1.pdf', date: 'March 28, 2026', size: '1.8 MB', type: 'PDF' }
  ]);

  const handleGenerate = (e) => {
    e.preventDefault();
    setGenerating(true);
    setSuccess(false);
    
    setTimeout(() => {
      setGenerating(false);
      setSuccess(true);
      const newFile = {
        name: `SmartHerd_${reportType.replace('-', '_')}_Export_${new Date().toISOString().slice(0, 10)}.pdf`,
        date: 'Today',
        size: '1.2 MB',
        type: 'PDF'
      };
      setGeneratedLogs([newFile, ...generatedLogs]);
    }, 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-h-full overflow-y-auto animate-fade-in">
      
      {/* Report Generator Box */}
      <div className="lg:col-span-2 space-y-6">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium space-y-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Agricultural Telemetry Exporter</h3>
            <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Export certified herd telemetry audits for stakeholders & veterinary inspections</p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4 pt-2 text-xs">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Report Type</label>
                <select 
                  value={reportType}
                  onChange={e => setReportType(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 bg-white"
                >
                  <option value="herd-summary">Herd Statistics Summary</option>
                  <option value="health-vaccine">Health & Vaccination Logs</option>
                  <option value="geofence-breach">Geofence Boundary Violations</option>
                  <option value="collar-telemetry">Collar Battery & Signals</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Date Period</label>
                <select 
                  value={dateRange}
                  onChange={e => setDateRange(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 bg-white"
                >
                  <option value="today">Today (Live Stream)</option>
                  <option value="week">Past 7 Days</option>
                  <option value="month">Current Month</option>
                  <option value="quarter">Q2 2026 Audit</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                disabled={generating}
                className="bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow transition flex items-center gap-2"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Compiling PDF Telemetry...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Compile Report</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Success Banner */}
          {success && (
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3 text-emerald-900 text-xs animate-slide-up">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <p className="font-extrabold">Report Compilation Complete!</p>
                <p className="text-[10px] text-emerald-700 mt-0.5">Your file has been compiled and is ready for download in the logs list.</p>
              </div>
            </div>
          )}

        </div>

        {/* Previous logs list */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium space-y-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Compiled Report History</h3>
            <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Previously generated exports</p>
          </div>

          <div className="space-y-3">
            {generatedLogs.map((log, idx) => (
              <div key={idx} className="p-3.5 border border-slate-100 rounded-xl flex items-center justify-between gap-4 hover:bg-slate-50/50 transition">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    log.type === 'PDF' ? 'bg-red-50 border-red-100 text-red-500' : 'bg-blue-50 border-blue-100 text-blue-500'
                  }`}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[200px] sm:max-w-md">{log.name}</h4>
                    <p className="text-[9px] text-slate-400 font-semibold mt-0.5">{log.date} • {log.size}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => alert(`Simulating file download for ${log.name}`)}
                    className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition"
                    title="Download File"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => alert(`Creating shareable dashboard token link`)}
                    className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition"
                    title="Share Link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Side Tips */}
      <div className="space-y-6">
        
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/60 p-5 rounded-2xl border border-indigo-100 text-indigo-950 space-y-3 shadow-premium animate-fade-in">
          <h3 className="text-xs font-bold text-brand-600 uppercase tracking-wider">Investor Ready Exports</h3>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            SmartHerd compiles telemetry charts, vaccine compliance rates, and geofence security logs into certified veterinary exports.
          </p>
          <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
            These documents fulfill criteria for bank credit audits, export permits, and livestock insurance compliance.
          </p>
        </div>

      </div>

    </div>
  );
}
