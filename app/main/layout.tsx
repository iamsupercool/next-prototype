import Link from 'next/link';

import { Sidebar } from '@/components/main/sidebar';
import { Button } from '@/components/ui/button';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b px-6 py-3">
        <span className="text-xl font-bold">JS NEXT</span>
        <Button variant="outline" size="sm" render={<Link href="/" />}>
          로그아웃
        </Button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
