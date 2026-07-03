import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { isDemoMode } from '@/lib/environment';

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {isDemoMode() && (
        <div className="border-b border-brass-gold/20 bg-obsidian px-4 py-2 text-center text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brass-gold/85">
          Demo preview only - not a live application.
        </div>
      )}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
