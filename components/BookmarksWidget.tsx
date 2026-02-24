import { Bookmark, Folder, Link as LinkIcon, Plus, MoreHorizontal } from 'lucide-react';

export function BookmarksWidget() {
  const bookmarks = [
    { id: 1, title: 'صدور ثالث', icon: LinkIcon, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { id: 2, title: 'صدور بدنه', icon: LinkIcon, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { id: 3, title: 'استعلام‌ها', icon: Folder, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
    { id: 4, title: 'گزارش کمیسیون', icon: LinkIcon, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
    { id: 5, title: 'پشتیبانی', icon: LinkIcon, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
  ];

  return (
    <div className="glass-panel rounded-3xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-indigo-500" />
          بوکمارک‌ها
        </h2>
        <button className="p-1.5 text-slate-500 hover:text-indigo-600 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="flex items-center justify-between p-3 bg-white/60 dark:bg-slate-800/60 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-sm transition-all cursor-pointer group">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className={`p-1.5 rounded-lg ${bookmark.bg} ${bookmark.color} shrink-0`}>
                <bookmark.icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
                {bookmark.title}
              </span>
            </div>
            <button className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 transition-opacity">
              <MoreHorizontal className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
