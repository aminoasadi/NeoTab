'use client';

import { useState } from 'react';
import { Search, Mic, X, Link as LinkIcon, Folder, Plus, MoreHorizontal, ChevronDown } from 'lucide-react';

export function SearchAndBookmarks() {
  const [query, setQuery] = useState('');
  const [engine, setEngine] = useState('google');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    let url = '';
    if (engine === 'google') url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    else if (engine === 'bing') url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
    else if (engine === 'duckduckgo') url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;

    window.location.href = url;
  };

  const bookmarks = [
    { id: 1, title: 'Neo Core (داشبورد اصلی)', url: 'http://core.nofitech.ir', icon: LinkIcon, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
    { id: 2, title: 'صدور ثالث', icon: LinkIcon, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { id: 3, title: 'صدور بدنه', icon: LinkIcon, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { id: 4, title: 'استعلام‌ها', icon: Folder, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
    { id: 5, title: 'گزارش کمیسیون', icon: LinkIcon, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
    { id: 6, title: 'پشتیبانی', icon: LinkIcon, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6 mt-16 mb-10 relative z-40">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full relative group">
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <Search className="w-6 h-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full pl-32 pr-14 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-3xl text-lg shadow-lg placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
          placeholder="جستجو در اینترنت…"
        />

        <div className="absolute inset-y-0 left-0 flex items-center pl-2 gap-1">
          {query && (
            <button type="button" onClick={() => setQuery('')} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
          <button type="button" className="p-2 text-slate-400 hover:text-indigo-500 transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <div className="relative flex items-center">
            <select
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
              className="appearance-none bg-transparent pl-8 pr-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="google">Google</option>
              <option value="bing">Bing</option>
              <option value="duckduckgo">DuckDuckGo</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute left-2 pointer-events-none" />
          </div>
        </div>
      </form>

      {/* Bookmarks */}
      <div className="w-full glass-panel rounded-3xl p-4 flex flex-wrap justify-center gap-3">
        {bookmarks.map((bookmark) => (
          <a key={bookmark.id} href={bookmark.url || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-white/60 dark:bg-slate-800/60 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
            <div className={`p-1.5 rounded-xl ${bookmark.bg} ${bookmark.color} shrink-0 group-hover:scale-110 transition-transform`}>
              <bookmark.icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
              {bookmark.title}
            </span>
          </a>
        ))}
        <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100/50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-semibold whitespace-nowrap">افزودن</span>
        </button>
      </div>
    </div>
  );
}
