'use client';

import { useState } from 'react';
import { StickyNote, Save, Copy } from 'lucide-react';

export function QuickNotes() {
  const [note, setNote] = useState('یادآوری: جلسه با مدیر فروش ساعت ۱۴:۰۰\n\nنکات مهم برای تمدید قرارداد شرکت آلفا:\n- بررسی تخفیف عدم خسارت\n- اضافه کردن پوشش نوسانات');

  return (
    <div className="glass-panel rounded-3xl p-5 flex flex-col gap-4 h-[300px]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-indigo-500" />
          یادداشت سریع
        </h2>
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-slate-500 hover:text-indigo-600 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-colors" title="کپی">
            <Copy className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-500 hover:text-indigo-600 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-colors" title="ذخیره">
            <Save className="w-4 h-4" />
          </button>
        </div>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="flex-1 w-full bg-white/40 dark:bg-slate-800/40 rounded-2xl p-4 text-sm text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none placeholder-slate-400"
        placeholder="یادداشت خود را اینجا بنویسید..."
      />
    </div>
  );
}
