import React, { useState } from 'react';
import { ChevronRight, MapPin, Shield, HeartPulse } from 'lucide-react';

const slides = [
  {
    tag: '01 — Track',
    title: 'Know exactly\nwhere your herd is',
    body: 'GPS collar receivers broadcast real-time pasture coordinates every 30 seconds so you can monitor movement, grazing patterns, and proximity from anywhere.',
    accent: 'bg-blue-500',
    Icon: MapPin,
    iconBg: 'bg-blue-100 text-blue-500',
    dot: 'bg-blue-500',
  },
  {
    tag: '02 — Protect',
    title: 'Stop theft before\nit happens',
    body: 'Instant breach alerts and remote collar sirens activate the moment an animal crosses your defined geofence perimeter — day or night.',
    accent: 'bg-red-500',
    Icon: Shield,
    iconBg: 'bg-red-100 text-red-500',
    dot: 'bg-red-500',
  },
  {
    tag: '03 — Monitor',
    title: 'Stay on top of\nherd health',
    body: 'Log treatments, schedule vaccinations, and catch abnormal biometric signals early — all from a single dashboard built for ranch managers.',
    accent: 'bg-emerald-500',
    Icon: HeartPulse,
    iconBg: 'bg-emerald-100 text-emerald-500',
    dot: 'bg-emerald-500',
  },
];

export default function AppOnboarding({ onFinish }) {
  const [idx, setIdx] = useState(0);
  const slide = slides[idx];
  const isLast = idx === slides.length - 1;

  const next = () => isLast ? onFinish() : setIdx(i => i + 1);
  const back = () => setIdx(i => i - 1);

  return (
    <div className="min-h-screen flex flex-col bg-white transition-all duration-300 font-sans">

      {/* Skip */}
      <div className="flex justify-end p-6">
        {!isLast && (
          <button
            onClick={onFinish}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 transition uppercase tracking-widest"
          >
            Skip
          </button>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center max-w-sm mx-auto">

        {/* Illustration area — large icon in a soft circle */}
        <div className="relative mb-10">
          <div className={`w-36 h-36 rounded-[2.5rem] flex items-center justify-center ${slide.iconBg} shadow-sm`}>
            <slide.Icon className="w-16 h-16" strokeWidth={1.5} />
          </div>
          {/* decorative ring */}
          <div className={`absolute -inset-3 rounded-[3rem] border-2 border-dashed border-current opacity-10 ${slide.dot}`} />
        </div>

        {/* Tag */}
        <span className={`text-[10px] font-extrabold uppercase tracking-widest mb-3 ${slide.dot.replace('bg-', 'text-')}`}>
          {slide.tag}
        </span>

        {/* Title — whitespace-pre-line to respect \n */}
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight leading-tight mb-4 whitespace-pre-line">
          {slide.title}
        </h2>

        {/* Body */}
        <p className="text-sm text-slate-500 leading-relaxed">
          {slide.body}
        </p>
      </div>

      {/* Bottom nav */}
      <div className="px-8 pb-10 flex items-center justify-between max-w-sm mx-auto w-full">

        {/* Progress dots */}
        <div className="flex gap-2 items-center">
          {slides.map((s, i) => (
            <button key={i} onClick={() => setIdx(i)}>
              <span className={`block h-2 rounded-full transition-all duration-300 ${
                i === idx ? `w-6 ${s.dot}` : 'w-2 bg-slate-200'
              }`} />
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          {idx > 0 && (
            <button
              onClick={back}
              className="h-11 px-5 rounded-2xl text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition"
            >
              Back
            </button>
          )}
          <button
            onClick={next}
            className={`h-11 px-6 rounded-2xl text-xs font-extrabold text-white flex items-center gap-1.5 shadow-lg transition hover:opacity-90 active:scale-95 ${slide.accent}`}
          >
            <span>{isLast ? 'Get Started' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
