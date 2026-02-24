'use client';

import { useState, useEffect } from 'react';
import { CloudSun, User, Bell, LogOut, Settings } from 'lucide-react';
import { format } from 'date-fns-jalali';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

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
        <DropdownMenu.Root dir="rtl">
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
              <User className="w-5 h-5" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="z-[99] min-w-[240px] bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-2xl shadow-xl p-2 animate-in fade-in-80 zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
              sideOffset={12}
              align="end"
            >
              <div className="flex flex-col items-center gap-3 p-4 mb-2 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg text-white">
                  <User className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-slate-800 dark:text-slate-100 text-base">امین اسدی</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">مالک محصول نوفیتک</span>
                </div>
              </div>

              <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2.5 outline-none rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
                <Settings className="w-4 h-4 text-slate-500" />
                تنظیمات حساب کاربری
              </DropdownMenu.Item>

              <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2.5 outline-none rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 cursor-pointer transition-colors mt-1">
                <LogOut className="w-4 h-4" />
                خروج از سیستم
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
