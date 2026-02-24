import { Quote } from 'lucide-react';

export function QuoteWidget() {
  return (
    <div className="glass-panel rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden group">
      <div className="absolute -top-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="w-24 h-24 text-indigo-500" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          جمله روز
        </h2>
      </div>

      <div className="relative z-10">
        <p className="text-lg font-medium leading-relaxed text-slate-800 dark:text-slate-200 italic">
          «شرکت هایی در صنعت بیمه میتوانند پیشرو باشند که از نوفیتک استفاده میکنند.»
        </p>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-4 text-left">
          — امین اسدی
        </p>
      </div>
    </div>
  );
}
