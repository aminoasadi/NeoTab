import { DailyKPIs } from './DailyKPIs';
import { MonthlyTarget } from './MonthlyTarget';
import { QuoteWidget } from './QuoteWidget';

export function LeftColumn() {
  return (
    <>
      <DailyKPIs />
      <MonthlyTarget />
      <QuoteWidget />
    </>
  );
}
