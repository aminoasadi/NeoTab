'use client';

import { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Info, XCircle } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  AlertTriangle,
  XCircle,
  Info
};

export function AlertsWidget() {
  const [alerts, setAlerts] = useState<any[]>([
    { id: 'mock-1', title: 'هشدار افت عملکرد', desc: 'صدور بیمه‌نامه در هفته جاری ۲۰٪ کاهش یافته است.', type: 'warning', icon: 'AlertTriangle', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/20' },
    { id: 'mock-2', title: 'رد شدن بیمه‌نامه بدنه', desc: 'بیمه‌نامه شماره ۱۲۳۴۵ به دلیل نقص مدارک رد شد.', type: 'error', icon: 'XCircle', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10', border: 'border-rose-200 dark:border-rose-500/20' },
    { id: 'mock-3', title: 'بروزرسانی سیستم سنهاب', desc: 'سیستم سنهاب فردا از ساعت ۲ تا ۴ بامداد در دسترس نخواهد بود.', type: 'info', icon: 'Info', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-200 dark:border-blue-500/20' },
  ]);

  useEffect(() => {
    fetch('/api/db/alerts')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAlerts(data);
      });
  }, []);

  return (
    <div className="glass-panel rounded-3xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Bell className="w-5 h-5 text-indigo-500" />
          اعلان‌ها و هشدارها
        </h2>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
          {alerts.length} جدید
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {alerts.map((alert) => {
          const IconComp = ICON_MAP[alert.icon] || Info;
          return (
            <div key={alert.id} className={`flex gap-3 p-3 rounded-2xl border ${alert.bg} ${alert.border} transition-all hover:shadow-sm cursor-pointer`}>
              <div className={`mt-0.5 ${alert.color}`}>
                <IconComp className="w-5 h-5" />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <span className={`text-sm font-bold ${alert.color}`}>
                  {alert.title}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {alert.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
