'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { CalendarClock, CheckSquare, AlertCircle, Phone, MessageSquare, FilePlus, ExternalLink } from 'lucide-react';

export function ActionCenter() {
  const renewals = [
    { id: 1, name: 'علی محمدی', type: 'ثالث', date: 'امروز', status: 'نیاز به تماس', statusColor: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10' },
    { id: 2, name: 'شرکت آلفا', type: 'مسئولیت', date: 'فردا', status: 'در حال بررسی', statusColor: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10' },
    { id: 3, name: 'سارا احمدی', type: 'بدنه', date: '۳ روز دیگر', status: 'ارسال پیامک', statusColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' },
  ];

  const tasks = [
    { id: 1, title: 'بررسی مدارک خسارت', type: 'خسارت', priority: 'بالا', due: 'امروز', status: 'باز' },
    { id: 2, title: 'تماس با مشتریان VIP', type: 'فروش', priority: 'متوسط', due: 'فردا', status: 'در حال انجام' },
  ];

  const claims = [
    { id: 'C-1024', policy: 'بدنه - پژو ۲۰۶', stage: 'ارزیابی', status: 'نیاز به مدرک' },
    { id: 'C-1025', policy: 'ثالث - پراید', stage: 'پرداخت', status: 'تایید شده' },
  ];

  return (
    <div className="glass-panel rounded-3xl p-5 flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <CheckSquare className="w-6 h-6 text-indigo-500" />
          مرکز اقدام
        </h2>
      </div>

      <Tabs.Root defaultValue="renewals" dir="rtl" className="flex flex-col flex-1">
        <Tabs.List className="flex border-b border-slate-200 dark:border-slate-700 mb-4 overflow-x-auto scrollbar-hide">
          <Tabs.Trigger
            value="renewals"
            className="px-4 py-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 dark:data-[state=active]:border-indigo-400 transition-colors whitespace-nowrap"
          >
            تمدیدهای امروز
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tasks"
            className="px-4 py-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 dark:data-[state=active]:border-indigo-400 transition-colors whitespace-nowrap"
          >
            کارتابل من
          </Tabs.Trigger>
          <Tabs.Trigger
            value="claims"
            className="px-4 py-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 dark:data-[state=active]:border-indigo-400 transition-colors whitespace-nowrap"
          >
            خسارت‌های در انتظار
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="renewals" className="flex-1 outline-none">
          <div className="bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
            <table className="w-full text-sm text-right">
              <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200/50 dark:border-slate-700/50">
                <tr>
                  <th className="px-4 py-3 font-semibold">نام مشتری</th>
                  <th className="px-4 py-3 font-semibold">نوع بیمه</th>
                  <th className="px-4 py-3 font-semibold">تاریخ سررسید</th>
                  <th className="px-4 py-3 font-semibold">وضعیت</th>
                  <th className="px-4 py-3 font-semibold text-left">اقدام سریع</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
                {renewals.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors group">
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{item.name}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.type}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <CalendarClock className="w-4 h-4 text-slate-400" />
                      {item.date}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-left">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-500 hover:text-indigo-600 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600" title="تماس">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-500 hover:text-indigo-600 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600" title="ارسال پیام">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-500 hover:text-indigo-600 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600" title="صدور سریع">
                          <FilePlus className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tabs.Content>

        <Tabs.Content value="tasks" className="flex-1 outline-none">
          <div className="bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
            <table className="w-full text-sm text-right">
              <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200/50 dark:border-slate-700/50">
                <tr>
                  <th className="px-4 py-3 font-semibold">عنوان</th>
                  <th className="px-4 py-3 font-semibold">نوع</th>
                  <th className="px-4 py-3 font-semibold">اولویت</th>
                  <th className="px-4 py-3 font-semibold">مهلت</th>
                  <th className="px-4 py-3 font-semibold">وضعیت</th>
                  <th className="px-4 py-3 font-semibold text-left">اقدام</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
                {tasks.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors group">
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{item.title}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.type}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${item.priority === 'بالا' ? 'text-rose-500 bg-rose-50 dark:bg-rose-500/10' : 'text-amber-500 bg-amber-50 dark:bg-amber-500/10'}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.due}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.status}</td>
                    <td className="px-4 py-3 text-left">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-500 hover:text-indigo-600 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600" title="باز کردن">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tabs.Content>

        <Tabs.Content value="claims" className="flex-1 outline-none">
          <div className="bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
            <table className="w-full text-sm text-right">
              <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200/50 dark:border-slate-700/50">
                <tr>
                  <th className="px-4 py-3 font-semibold">کد پرونده</th>
                  <th className="px-4 py-3 font-semibold">بیمه‌نامه</th>
                  <th className="px-4 py-3 font-semibold">مرحله</th>
                  <th className="px-4 py-3 font-semibold">وضعیت</th>
                  <th className="px-4 py-3 font-semibold text-left">اقدام</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
                {claims.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors group">
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{item.id}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.policy}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.stage}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${item.status === 'نیاز به مدرک' ? 'text-rose-500 bg-rose-50 dark:bg-rose-500/10' : 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-left">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-500 hover:text-indigo-600 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600" title="جزئیات">
                          <AlertCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
