import { CalendarWidget } from './CalendarWidget';
import { AlertsWidget } from './AlertsWidget';

export function RightColumn() {
  return (
    <>
      <CalendarWidget />
      <AlertsWidget />
    </>
  );
}
