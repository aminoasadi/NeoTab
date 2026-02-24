import { ActionCenter } from './ActionCenter';
import { TodoWidget } from './TodoWidget';
import { QuickNotes } from './QuickNotes';

export function CenterColumn() {
  return (
    <>
      <ActionCenter />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        <TodoWidget />
        <QuickNotes />
      </div>
    </>
  );
}
