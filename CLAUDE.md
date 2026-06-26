@AGENTS.md

# 프로젝트 개요

Next.js 16 App Router 기반 프로토타입 프로젝트.

## 기술 스택

| 분류        | 라이브러리                            | 비고                                            |
| ----------- | ------------------------------------- | ----------------------------------------------- |
| 프레임워크  | Next.js 16 (App Router)               | Turbopack 기본 번들러                           |
| 언어        | TypeScript 5                          | strict 모드                                     |
| 스타일      | Tailwind CSS v4 줘                    | `@import "tailwindcss"` 방식 (config 파일 없음) |
| 린팅        | ESLint 9 (Flat Config)                | `eslint.config.mjs`                             |
| 포맷        | Prettier 3                            | `prettier-plugin-tailwindcss` 포함              |
| UI          | shadcn/ui (base-nova 스타일)          | Radix UI + Tailwind 기반                        |
| 아이콘      | Lucide React                          | shadcn/ui 기본 아이콘 세트                      |
| 유효성 검사 | Zod                                   | 스키마 기반, 클라이언트/서버 공유               |
| 폼          | React Hook Form + @hookform/resolvers | Zod resolver 연동                               |
| 전역 상태   | Zustand                               | 클라이언트 전용 전역 상태                       |
| URL 상태    | nuqs                                  | 쿼리스트링을 React 상태처럼 관리                |
| 유틸리티    | clsx + tailwind-merge (`cn()`)        | `lib/utils.ts`                                  |
| 토스트      | Sonner                                |                                                 |
| 애니메이션  | Motion (구 Framer Motion)             |                                                 |
| 날짜        | date-fns                              |                                                 |
| 단위 테스트 | Vitest + React Testing Library        | `vitest.config.mts`                             |
| E2E 테스트  | Playwright                            | `playwright.config.ts`, `e2e/` 디렉토리         |

## 프로젝트 구조

```
app/                  # App Router 라우트
  layout.tsx          # 루트 레이아웃
  page.tsx            # 홈 페이지
  globals.css         # Tailwind v4 + CSS 변수
components/
  ui/                 # shadcn/ui 컴포넌트 (소스 복사 방식)
lib/
  utils.ts            # cn() 유틸리티
hooks/                # 커스텀 훅
e2e/                  # Playwright E2E 테스트
__tests__/            # Vitest 단위/통합 테스트
```

## 스크립트

```bash
npm run dev           # 개발 서버 (Turbopack)
npm run build         # 프로덕션 빌드
npm run lint          # ESLint 실행
npm run lint:fix      # ESLint 자동 수정
npm run format        # Prettier 포맷
npm run format:check  # Prettier 검사
npm run test          # Vitest (watch 모드)
npm run test:e2e      # Playwright E2E 테스트
```

## 핵심 패턴

### 데이터 페칭 전략

- **읽기**: Server Components에서 직접 `fetch` — 클라이언트 라이브러리 불필요
- **쓰기**: Server Actions 사용
- 클라이언트에서 리얼타임/복잡한 뮤테이션이 필요해지면 TanStack Query 추가 검토

### 상태 분리 원칙

- 서버 상태 → Server Components
- URL 상태 (필터, 검색, 페이지) → `nuqs`
- 클라이언트 전역 상태 (UI 상태 등) → Zustand

### 클래스 병합

```ts
import { cn } from '@/lib/utils';
// cn()은 clsx + tailwind-merge 조합
```

### Zod + React Hook Form

```ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({ email: z.string().email() });

const form = useForm({ resolver: zodResolver(schema) });
```

### shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
```

## Tailwind CSS v4 주의사항

- `tailwind.config.js` 파일 없음 — CSS에서 직접 설정
- `globals.css`의 `@theme inline` 블록에서 디자인 토큰 정의
- shadcn/ui가 CSS 변수로 색상 시스템 관리
- `prettier-plugin-tailwindcss`가 클래스 자동 정렬
