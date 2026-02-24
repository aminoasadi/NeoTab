import { TopBar } from '@/components/TopBar';
import { LeftColumn } from '@/components/LeftColumn';
import { CenterColumn } from '@/components/CenterColumn';
import { RightColumn } from '@/components/RightColumn';
import { SearchAndBookmarks } from '@/components/SearchAndBookmarks';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-900 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed relative">
      <TopBar />
      
      <main className="flex-1 container mx-auto px-4 pb-10 max-w-[1600px] flex flex-col pt-4">
        <SearchAndBookmarks />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          {/* Left Column - 3 cols */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <LeftColumn />
          </div>

          {/* Center Column - 6 cols */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <CenterColumn />
          </div>

          {/* Right Column - 3 cols */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <RightColumn />
          </div>
        </div>
      </main>
    </div>
  );
}
