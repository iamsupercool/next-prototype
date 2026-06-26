import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function MainPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <span className="text-xl font-bold">JS NEXT</span>
        <Button variant="outline" size="sm" render={<Link href="/" />}>
          로그아웃
        </Button>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
        <h2 className="text-2xl font-semibold">메인 화면</h2>
        <p className="text-muted-foreground">로그인에 성공했습니다.</p>
      </main>
    </div>
  );
}
