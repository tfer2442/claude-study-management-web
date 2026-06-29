# Development Guidelines

## 프로젝트 개요

- **서비스**: Notion 스터디 일지 → 토큰 URL로 외부 공유 + PDF 저장
- **스택**: Next.js 16.2.9 (App Router) / React 19 / TypeScript 5 / Tailwind CSS 4 / shadcn/ui
- **주요 패키지**: `@notionhq/client`, `@react-pdf/renderer`, `react-hook-form`, `zod`, `next-themes`, `sonner`, `date-fns`, `usehooks-ts`, `lucide-react`

---

## 프로젝트 아키텍처

### 라우트 구조

| 경로 | URL | 특징 |
|------|-----|------|
| `app/(marketing)/` | `/` | MarketingHeader + Footer 레이아웃 |
| `app/(admin)/admin/` | `/admin` | 중앙 정렬 카드 레이아웃, 패스코드 인증 필요 |
| `app/log/[token]/` | `/log/:token` | 독립 레이아웃, 토큰 유효성 검증 |
| `app/error/` | `/error` | 독립 오류 안내 페이지 |

### 컴포넌트 디렉터리 규칙

- `components/ui/` — **수정 금지** (shadcn/ui 원본 그대로 유지)
- `components/common/` — 재사용 공통 컴포넌트 (Logo, ThemeToggle, EmptyState)
- `components/layout/` — 레이아웃 전용 (MarketingHeader, Footer)
- `components/providers/` — 전역 프로바이더 (ThemeProvider)
- `components/sections/` — 페이지 단위 섹션 컴포넌트

### lib 파일

- `lib/validations.ts` — 모든 Zod 스키마 및 타입 추론 중앙 관리
- `lib/utils.ts` — `cn()` 함수만 포함 (clsx + tailwind-merge)
- `lib/hooks.ts` — usehooks-ts 훅 re-export

---

## 코드 표준

### 네이밍

- 파일명: `kebab-case.tsx`
- 컴포넌트: `PascalCase`
- 변수·함수: `camelCase`
- 상수: `SCREAMING_SNAKE_CASE`

### 포맷

- 들여쓰기: 2칸 공백
- 언어: 모든 주석·문서는 한국어, 변수/함수명은 영어

### 컴포넌트 선언

- 서버 컴포넌트: 기본값 (상단에 `"use client"` 없음)
- 클라이언트 컴포넌트: 파일 최상단에 `"use client"` 선언 필수
- `useState`, `useEffect`, 이벤트 핸들러 사용 시 반드시 `"use client"` 추가

---

## 폼 구현 표준

### 필수 패턴 (예외 없음)

```tsx
"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { mySchema, type MyFormValues } from "@/lib/validations"

const form = useForm<MyFormValues>({
  resolver: zodResolver(mySchema),
  defaultValues: { ... },
})
```

### 금지 사항

- `onChange` + `useState`로 폼 상태 직접 관리 금지
- Zod 스키마를 컴포넌트 파일 내에 인라인 정의 금지 → 반드시 `lib/validations.ts`에 작성
- `alert()` 사용 금지 → `toast.success()` / `toast.error()` 사용

### Zod 스키마 추가 시 동시 수정 파일

1. `lib/validations.ts` — 스키마 및 타입 추가
2. 해당 스키마를 사용하는 `components/sections/` 파일 — import 경로 확인

---

## 스타일링 표준

### Tailwind CSS 4

- 클래스 병합: 항상 `cn()` (`lib/utils.ts`) 사용
- 인라인 style 속성 사용 금지
- 다크모드 CSS 변수는 `app/globals.css`에서만 정의

### 금지 사항

- `components/ui/` 파일 내 클래스 직접 수정 금지
- shadcn 컴포넌트에 새 variant 추가 시 해당 ui 파일 수정 대신 래퍼 컴포넌트 생성

---

## 환경변수 사용 규칙

### 필수 환경변수 (`.env.example` 참고)

| 변수명 | 용도 | 접근 위치 |
|--------|------|-----------|
| `NOTION_API_KEY` | Notion API 인증 | 서버 전용 |
| `NOTION_DB_ID` | Notion 데이터베이스 ID | 서버 전용 |
| `ADMIN_PASSCODE` | 어드민 패스코드 검증 | 서버 전용 |
| `SHARE_TOKEN_SECRET` | JWT/토큰 서명 | 서버 전용 |
| `NEXT_PUBLIC_BASE_URL` | 서비스 기본 URL | 서버·클라이언트 모두 |

### 규칙

- `NOTION_API_KEY`, `ADMIN_PASSCODE`, `SHARE_TOKEN_SECRET`은 **클라이언트 컴포넌트에서 절대 참조 금지**
- `NEXT_PUBLIC_` 접두사 없는 변수는 서버 컴포넌트 또는 Route Handler에서만 사용
- 환경변수 추가 시 `.env.example`도 반드시 동시 업데이트

---

## 서버 액션 / API Route 구현 표준

### 서버 액션 위치

- `app/actions/` 디렉터리에 기능별 파일로 분리 (예: `app/actions/auth.ts`, `app/actions/notion.ts`)
- 서버 액션 파일 최상단에 `"use server"` 선언

### 패스코드 검증 구현 시

- `components/sections/admin-passcode-form.tsx`의 `onSubmit` 함수에서 서버 액션 호출
- 검증 로직은 절대 클라이언트에 노출 금지 (환경변수 `ADMIN_PASSCODE` 서버에서만 비교)

### Notion API 연동

- `@notionhq/client`는 서버 컴포넌트 또는 서버 액션에서만 사용
- 클라이언트에서 Notion 데이터 필요 시 서버 액션 → props 전달 방식

---

## 새 기능 추가 시 파일 결정 트리

```
새 컴포넌트 추가?
├── 특정 페이지에서만 사용 → components/sections/
├── 여러 페이지에서 재사용 → components/common/
├── 레이아웃 구성 요소 → components/layout/
└── shadcn/ui 기반 확장 → components/ui/ 수정 대신 래퍼 생성

새 폼 필드/스키마 추가?
└── lib/validations.ts 먼저 수정 → 컴포넌트 import 업데이트

새 라우트 추가?
├── 마케팅 페이지 → app/(marketing)/ 하위
├── 어드민 기능 → app/(admin)/ 하위
└── 토큰 기반 공개 페이지 → app/log/ 패턴 참고
```

---

## 다중 파일 동시 수정 규칙

| 수정 파일 | 반드시 함께 확인할 파일 |
|-----------|------------------------|
| `lib/validations.ts` | 해당 스키마 사용 중인 `components/sections/*.tsx` |
| `app/globals.css` (CSS 변수 변경) | 다크모드 영향받는 모든 컴포넌트 |
| `.env.example` | 환경변수 참조하는 서버 액션 / Route Handler |
| `components/layout/marketing-header.tsx` | `app/(marketing)/layout.tsx` |
| `components/layout/footer.tsx` | `app/(marketing)/layout.tsx` |
| `app/layout.tsx` | `components/providers/theme-provider.tsx` |

---

## 테마 / 다크모드 규칙

- `next-themes`의 `ThemeProvider`는 `app/layout.tsx`에만 등록 (중복 등록 금지)
- `<html>` 태그에 `suppressHydrationWarning` 필수
- 다크모드 색상은 Tailwind 유틸 클래스 (`dark:`) 또는 CSS 변수로만 처리
- `theme-toggle.tsx` 외 다른 곳에서 테마 강제 설정 금지

---

## 금지 사항 목록

- `components/ui/` 파일 직접 수정
- 클라이언트 컴포넌트에서 서버 전용 환경변수 참조
- Zod 스키마 컴포넌트 내부 인라인 정의
- `alert()`, `confirm()`, `prompt()` 사용 (→ sonner toast 대체)
- `any` 타입 사용 (TypeScript strict 준수)
- 인라인 style 속성으로 레이아웃 처리
- 새 shadcn 컴포넌트를 `shadcn add` 없이 수동으로 `components/ui/`에 생성
- 서버 액션 없이 클라이언트에서 직접 Notion API 호출
