import { TrendingUp, FileText, DollarSign, Clock, AlertTriangle } from 'lucide-react';

export function DailyKPIs() {
  const kpis = [
    { label: 'تعداد صدور امروز', value: '۱۲', trend: '+۲', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { label: 'حق‌بیمه امروز', value: '۴۵ م.ت', trend: '+۱۲٪', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { label: 'در انتظار تایید', value: '۳', trend: '-۱', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
    { label: 'خسارت‌های باز', value: '۵', trend: '+۱', icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
  ];

  return (
    <div className="glass-panel rounded-3xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          شاخص‌های امروز
        </h2>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white/50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color}`}>
                <kpi.icon className="w-4 h-4" />
              </div>
              <span className={`text-xs font-semibold ${kpi.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {kpi.trend}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {kpi.value}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                {kpi.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
