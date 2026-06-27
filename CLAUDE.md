# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **중요:** 이 프로젝트는 Next.js 16.x를 사용합니다. 훈련 데이터와 API·컨벤션이 다를 수 있으므로, 코드 작성 전 반드시 `node_modules/next/dist/docs/`의 관련 가이드를 먼저 확인하고 deprecation 경고를 준수하세요.

## 명령어

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
```

테스트 프레임워크는 현재 설정되어 있지 않습니다.

## 아키텍처

### 라우트 그룹 구조

App Router의 라우트 그룹으로 레이아웃을 분리합니다:

| 그룹 | 경로 | 레이아웃 |
|------|------|----------|
| `(marketing)` | `/` | 마케팅 헤더 + 푸터 |
| `(auth)` | `/login`, `/register` | 중앙 정렬 카드 |
| `dashboard` | `/dashboard/**` | 사이드바 + 상단 헤더 |

### 폼 패턴

인증 페이지는 **react-hook-form + zod + shadcn Form** 조합을 표준으로 사용합니다:
- 스키마 정의: `lib/validations.ts` (`loginSchema`, `registerSchema`)
- 폼 컴포넌트: `Form` → `FormField` → `FormItem` → `FormControl` + `FormMessage`
- 토스트 알림: `sonner`의 `toast.success` / `toast.error`

### 컴포넌트 계층

- `components/ui/` — shadcn/ui 원본 컴포넌트 (직접 수정하지 않음)
- `components/common/` — 재사용 공통 컴포넌트 (`Logo`, `ThemeToggle`, `EmptyState`)
- `components/layout/` — 레이아웃 전용 (`Sidebar`, `DashboardHeader`, `MarketingHeader`, `Footer`)
- `components/providers/` — 전역 프로바이더 (`ThemeProvider`)
- `components/sections/` — 마케팅 페이지 섹션 (`HeroSection`, `FeaturesSection`, `CtaSection`)

### 유틸리티

- `lib/utils.ts` — `cn()` (clsx + tailwind-merge)
- `lib/validations.ts` — Zod 스키마 및 타입 추론
- `lib/hooks.ts` — usehooks-ts 훅 re-export (직접 구현 없이 라이브러리 활용)

### 테마

`next-themes`로 시스템 테마를 자동 감지합니다. `app/layout.tsx`의 `ThemeProvider`가 전역 등록되어 있으며, `<html>`에 `suppressHydrationWarning`이 필요합니다 (next-themes 하이드레이션 불일치 방지).

Tailwind CSS 4 기반이며, 다크모드 CSS 변수는 `app/globals.css`에 정의됩니다.

### 새 대시보드 페이지 추가 시

`app/dashboard/<name>/page.tsx`를 생성하면 `layout.tsx`의 사이드바·헤더가 자동 적용됩니다. 사이드바 네비게이션 항목은 `components/layout/sidebar.tsx`의 `navItems` 배열에 추가합니다.
