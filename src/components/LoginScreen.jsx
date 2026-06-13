import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, ShieldCheck, User, Lock, Compass } from 'lucide-react';

const TEST_USER = 'admin';
const TEST_PASS = 'password';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState(TEST_USER);
  const [password, setPassword] = useState(TEST_PASS);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    setError('');
    if (username === TEST_USER && password === TEST_PASS) {
      setLoading(true);
      setTimeout(onLogin, 1000);
    } else {
      setError('Invalid credentials. Use the demo sandbox credentials.');
    }
  };

  const handleInstantLogin = () => {
    setUsername(TEST_USER);
    setPassword(TEST_PASS);
    setLoading(true);
    setTimeout(onLogin, 800);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 select-none relative overflow-hidden font-sans">
      
      {/* Background ambient light effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      
      <div className="w-full max-w-[400px] z-10 space-y-6">
        
        {/* Logo and title */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-brand-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-brand-500/20 animate-pulse-subtle">
            <Compass className="w-7 h-7 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight leading-none">SmartHerd</h1>
            <p className="text-[10px] text-brand-600 font-extrabold uppercase tracking-widest mt-1">Telemetry Portal</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-100/80 overflow-hidden animate-fade-in">
          
          <div className="p-6 sm:p-8 space-y-5">
            <div className="space-y-1">
              <h2 className="text-base font-extrabold text-slate-800">Livestock Telemetry Access</h2>
              <p className="text-[11px] text-slate-500 font-semibold">Sign in to view real-time pasture coordinates</p>
            </div>

            {/* Sandbox banner */}
            <div className="bg-brand-50/40 border border-brand-100 rounded-2xl p-3 flex gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] font-extrabold text-brand-800 uppercase tracking-wide">Demo Sandbox Mode</span>
                <span className="block text-[10px] text-brand-600 font-semibold mt-0.5">Use prepopulated admin credentials</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Username Input */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full text-xs font-extrabold bg-slate-50/50 border border-slate-200 focus:border-brand-500 focus:bg-white text-slate-800 rounded-xl pl-10 pr-4 py-3 outline-none transition focus:ring-4 focus:ring-brand-50/50"
                    placeholder="Enter username"
                    style={{ fontSize: '16px' }}
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs font-extrabold bg-slate-50/50 border border-slate-200 focus:border-brand-500 focus:bg-white text-slate-800 rounded-xl pl-10 pr-10 py-3 outline-none transition focus:ring-4 focus:ring-brand-50/50"
                    placeholder="Enter password"
                    style={{ fontSize: '16px' }}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-[11px] font-bold text-red-500 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2">
                  {error}
                </p>
              )}

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-brand-500/15 active:scale-97 transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleInstantLogin}
                  disabled={loading}
                  className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-800 font-extrabold text-[11px] py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <span>Instant Admin Bypass</span>
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-[10px] text-slate-400 font-semibold text-center leading-relaxed">
          SmartHerd Livestock Telemetry System<br />
          Enterprise Administration Portal
        </p>
      </div>

    </div>
  );
}
