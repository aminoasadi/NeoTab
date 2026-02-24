'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronRight, ChevronLeft, Clock } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns-jalali';

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

  const events = [
    { id: 1, title: 'جلسه تمدید آلفا', time: '۱۰:۰۰', type: 'meeting' },
    { id: 2, title: 'پیگیری خسارت', time: '۱۴:۳۰', type: 'task' },
  ];

  return (
    <div className="glass-panel rounded-3xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-indigo-500" />
          تقویم
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-1 text-slate-500 hover:text-indigo-600 bg-white/50 dark:bg-slate-800/50 rounded-lg shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 min-w-[80px] text-center">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-1 text-slate-500 hover:text-indigo-600 bg-white/50 dark:bg-slate-800/50 rounded-lg shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white/50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50">
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekDays.map((day, idx) => (
            <div key={idx} className="text-[10px] font-semibold text-slate-400">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {/* Empty cells for padding start of month - simplified for demo */}
          {Array.from({ length: (startOfMonth(currentDate).getDay() + 1) % 7 }).map((_, i) => (
            <div key={`empty-${i}`} className="p-1" />
          ))}
          {days.map((day, idx) => {
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isCurrentDay = isToday(day);
            return (
              <button
                key={idx}
                className={`p-1.5 text-xs rounded-lg transition-all ${
                  !isCurrentMonth ? 'text-slate-300 dark:text-slate-600' :
                  isCurrentDay ? 'bg-indigo-500 text-white font-bold shadow-md' :
                  'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
          برنامه‌های امروز
        </h3>
        {events.map((event) => (
          <div key={event.id} className="flex items-center gap-3 p-2.5 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-sm transition-all cursor-pointer group">
            <div className={`w-1.5 h-8 rounded-full ${event.type === 'meeting' ? 'bg-purple-500' : 'bg-blue-500'}`} />
            <div className="flex-1 flex flex-col">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">
                {event.title}
              </span>
              <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" />
                {event.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
