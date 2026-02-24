import type {Metadata} from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css'; // Global styles

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
});

export const metadata: Metadata = {
  title: 'NeoTab - Insurance Command Center',
  description: 'NeoTab - Insurance Command Center',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fa-IR" dir="rtl" className={`${vazirmatn.variable}`}>
      <body className="font-sans bg-slate-50 text-slate-900 antialiased selection:bg-indigo-500/30" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
