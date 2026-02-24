import { Target } from 'lucide-react';

export function MonthlyTarget() {
  const target = 1000; // in million tomans
  const current = 650;
  const percentage = Math.round((current / target) * 100);

  return (
    <div className="glass-panel rounded-3xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-500" />
          هدف ماهانه
        </h2>
        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-lg">
          {percentage}٪
        </span>
      </div>

      <div className="bg-white/50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50">
        <div className="flex justify-between items-end mb-3">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">فروش فعلی</span>
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              ۶۵۰ <span className="text-sm font-normal text-slate-500">م.ت</span>
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">هدف</span>
            <span className="text-lg font-semibold text-slate-600 dark:text-slate-300">
              ۱,۰۰۰ <span className="text-xs font-normal text-slate-500">م.ت</span>
            </span>
          </div>
        </div>

        <div className="relative h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 right-0 h-full bg-gradient-to-l from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 text-center font-medium">
          ۳۵۰ میلیون تومان تا رسیدن به هدف باقی مانده است
        </div>
      </div>
    </div>
  );
}
