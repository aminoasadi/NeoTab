'use client';

import { useState, useEffect } from 'react';
import { StickyNote, Save, Copy } from 'lucide-react';

export function QuickNotes() {
  const [noteObj, setNoteObj] = useState<any>(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    fetch('/api/db/notes')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setNoteObj(data[0]);
          setNote(data[0].content);
        }
      });
  }, []);

  const handleSave = () => {
    if (noteObj) {
      fetch(`/api/db/notes/${noteObj.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: note })
      });
    } else {
      fetch('/api/db/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: note })
      }).then(res => res.json()).then(data => setNoteObj(data));
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-5 flex flex-col gap-4 h-[300px]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-indigo-500" />
          یادداشت سریع
        </h2>
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-slate-500 hover:text-indigo-600 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-colors" title="کپی" onClick={() => navigator.clipboard.writeText(note)}>
            <Copy className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-500 hover:text-indigo-600 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-colors" title="ذخیره" onClick={handleSave}>
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
