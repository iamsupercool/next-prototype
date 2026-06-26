# Next Prototype

Next.js 16 App Router 기반 프로토타입 프로젝트.

## 시작하기

### 의존성 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어 확인할 수 있습니다.

### 주요 스크립트

| 커맨드 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 (Turbopack) |
| `npm run build` | 프로덕션 빌드 |
| `npm run lint` | ESLint 실행 |
| `npm run lint:fix` | ESLint 자동 수정 |
| `npm run format` | Prettier 포맷 |
| `npm run test` | Vitest 단위 테스트 |
| `npm run test:e2e` | Playwright E2E 테스트 |

---

## Modal 시스템

Zustand 기반의 커스텀 모달 시스템입니다. `lib/modal/`에 위치합니다.

### 1. Provider 설정

루트 레이아웃에 `ModalProvider`를 추가합니다.

```tsx
// app/layout.tsx
import { ModalProvider } from '@/lib/modal';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}
```

**Provider 옵션**

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `dimMode` | `'global' \| 'per-modal'` | `'global'` | dim 렌더링 방식 |
| `zIndexBase` | `number` | `1000` | 모달 z-index 기준값 |

- `global` — dim이 전체 모달 스택 아래에 하나만 렌더링
- `per-modal` — 각 모달마다 개별 dim 렌더링 (모달 쌓기에 유리)

### 2. useModal 훅

```tsx
'use client';

import { useModal } from '@/lib/modal';

export function MyComponent() {
  const { openModal, openDefaultModal, closeModal, closeAll } = useModal();
}
```

### 3. 기본 모달 열기 — `openDefaultModal`

제목·설명·버튼이 포함된 기본 UI 모달입니다.

```tsx
const { openDefaultModal } = useModal();

openDefaultModal({
  id: 'confirm-delete',
  title: '삭제하시겠습니까?',
  description: '이 작업은 되돌릴 수 없습니다.',
  confirmLabel: '삭제',
  cancelLabel: '취소',
  onConfirm: () => console.log('삭제 실행'),
  onCancel: () => console.log('취소'),
});
```

**DefaultModal props**

| prop | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `id` | `string` | ✓ | 모달 고유 식별자 |
| `title` | `string` | | 모달 제목 |
| `description` | `string` | | 제목 아래 설명 텍스트 |
| `children` | `ReactNode` | | 본문 커스텀 콘텐츠 |
| `confirmLabel` | `string` | | 확인 버튼 텍스트 (기본: `'확인'`) |
| `cancelLabel` | `string` | | 취소 버튼 텍스트 (기본: `'취소'`) |
| `onConfirm` | `() => void` | | 확인 클릭 콜백 (없으면 버튼 미표시) |
| `onCancel` | `() => void` | | 취소 클릭 콜백 (없으면 버튼 미표시) |

### 4. 커스텀 컴포넌트 모달 열기 — `openModal`

어떤 컴포넌트든 모달로 렌더링할 수 있습니다.

```tsx
const { openModal, closeModal } = useModal();

openModal(
  'my-modal',
  <div className="bg-white rounded-xl p-6">
    <p>원하는 내용</p>
    <button onClick={() => closeModal('my-modal')}>닫기</button>
  </div>
);
```

### 5. 모달 옵션

`openModal` / `openDefaultModal` 두 번째(세 번째) 인자로 옵션을 전달합니다.

```tsx
openDefaultModal(
  { id: 'sheet', title: '하단 시트' },
  {
    mobilePosition: 'bottom', // 모바일에서 하단 고정
    dimClosable: false,        // dim 클릭으로 닫기 비활성화
  }
);
```

| 옵션 | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `dim` | `boolean` | `true` | dim 표시 여부 (`per-modal` 모드에서만 적용) |
| `dimClosable` | `boolean` | `true` | dim 클릭 시 모달 닫힘 여부 |
| `mobilePosition` | `'center' \| 'bottom' \| 'full'` | `'center'` | 모바일 화면에서의 위치 |

### 6. 모달 닫기

```tsx
const { closeModal, closeAll } = useModal();

closeModal('my-modal'); // 특정 모달 닫기
closeAll();             // 모든 모달 닫기
```

라우트 이동 시 열린 모달이 자동으로 모두 닫힙니다.

### 7. 모달 쌓기 (스택)

`openModal`을 여러 번 호출하면 모달이 순서대로 쌓입니다.

```tsx
openModal('modal-1', <StepOne />);
// StepOne 내부에서
openModal('modal-2', <StepTwo />);
```
