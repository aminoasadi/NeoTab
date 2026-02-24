'use client';

import { useState, useEffect } from 'react';
import { ListTodo, Plus, MoreVertical, Calendar, Check } from 'lucide-react';
import * as Checkbox from '@radix-ui/react-checkbox';

export function TodoWidget() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/db/todos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setTasks(data);
      });
  }, []);

  const toggleTask = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const newCompleted = !task.completed;

    setTasks(tasks.map(t => t.id === id ? { ...t, completed: newCompleted } : t));

    fetch(`/api/db/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: newCompleted })
    });
  };

  return (
    <div className="glass-panel rounded-3xl p-5 flex flex-col gap-4 h-[300px]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <ListTodo className="w-5 h-5 text-indigo-500" />
          لیست کارها
        </h2>
        <button className="p-1.5 text-slate-500 hover:text-indigo-600 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 -mr-1 space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`group flex items-start gap-3 p-3 rounded-2xl border transition-all ${task.completed
                ? 'bg-slate-50/50 dark:bg-slate-800/30 border-transparent opacity-60'
                : 'bg-white/60 dark:bg-slate-800/60 border-slate-200/50 dark:border-slate-700/50 hover:shadow-sm'
              }`}
          >
            <Checkbox.Root
              className="flex h-5 w-5 appearance-none items-center justify-center rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 outline-none data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500 mt-0.5"
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
            >
              <Checkbox.Indicator className="text-white">
                <Check className="w-3.5 h-3.5" />
              </Checkbox.Indicator>
            </Checkbox.Root>

            <div className="flex-1 flex flex-col">
              <span className={`text-sm font-medium ${task.completed ? 'text-slate-500 line-through' : 'text-slate-700 dark:text-slate-200'}`}>
                {task.text}
              </span>
              <div className="flex items-center gap-2 mt-1.5">
                <span className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-rose-500' :
                    task.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {task.due}
                </span>
              </div>
            </div>

            <button className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 transition-opacity">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
