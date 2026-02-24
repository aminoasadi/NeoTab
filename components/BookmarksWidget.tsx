'use client';

import { useState, useEffect } from 'react';
import { Bookmark, Folder, Link as LinkIcon, Plus, MoreHorizontal } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  LinkIcon,
  Folder,
};

export function BookmarksWidget() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/db/bookmarks')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setBookmarks(data);
      });
  }, []);

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
        {bookmarks.map((bookmark) => {
          const IconComp = ICON_MAP[bookmark.icon] || LinkIcon;
          return (
            <div key={bookmark.id} className="flex items-center justify-between p-3 bg-white/60 dark:bg-slate-800/60 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-sm transition-all cursor-pointer group">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className={`p-1.5 rounded-lg ${bookmark.bg} ${bookmark.color} shrink-0`}>
                  <IconComp className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
                  {bookmark.title}
                </span>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 transition-opacity">
                <MoreHorizontal className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
