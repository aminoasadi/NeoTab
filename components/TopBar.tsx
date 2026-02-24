'use client';

import { useState, useEffect } from 'react';
import { CloudSun, User, Bell } from 'lucide-react';
import { format } from 'date-fns-jalali';

export function TopBar() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial time after mount to avoid hydration mismatch
    const initialTimer = setTimeout(() => setTime(new Date()), 0);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(timer);
    };
  }, []);

  return (
    <header className="w-full px-6 py-4 flex items-start justify-between pointer-events-none absolute top-0 left-0 right-0 z-50">
      {/* Left side - Date & Time */}
      <div className="pointer-events-auto glass-panel rounded-2xl px-4 py-2 flex flex-col items-start text-sm min-w-[120px] shadow-sm">
        {time ? (
          <>
            <span className="font-semibold text-slate-800 dark:text-slate-100">
              {format(time, 'HH:mm')}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {format(time, 'EEEE, d MMMM yyyy')}
            </span>
          </>
        ) : (
          <span className="h-9 w-24 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md" />
        )}
      </div>

      {/* Right side - Weather, Notifications, User */}
      <div className="pointer-events-auto flex items-center gap-3">
        {/* Weather */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 glass-panel rounded-2xl shadow-sm cursor-pointer hover:bg-white/60 transition-colors">
          <CloudSun className="w-5 h-5 text-amber-500" />
          <div className="flex flex-col text-xs">
            <span className="font-medium text-slate-700 dark:text-slate-200">۲۴° تهران</span>
            <span className="text-[10px] text-slate-500">آفتابی</span>
          </div>
        </div>

        {/* Notifications */}
        <button className="relative p-3 glass-panel rounded-2xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors shadow-sm">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>

        {/* User Menu */}
        <button className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-md hover:shadow-lg transition-all">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
