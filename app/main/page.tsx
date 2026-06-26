import { SwiperSample } from '@/components/main/swiper-sample';

export default function MainPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">대시보드</h2>
        <p className="text-muted-foreground mt-1 text-sm">로그인에 성공했습니다.</p>
      </div>

      <section>
        <h3 className="mb-3 font-medium">공지사항</h3>
        <SwiperSample />
      </section>
    </div>
  );
}
