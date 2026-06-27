# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **중요:** 이 프로젝트는 Next.js 16.x를 사용합니다. 훈련 데이터와 API·컨벤션이 다를 수 있으므로, 코드 작성 전 반드시 `node_modules/next/dist/docs/`의 관련 가이드를 먼저 확인하고 deprecation 경고를 준수하세요.

## 서비스 개요

**스터디 일지 공유 서비스** — Notion에 작성된 스터디 일지를 토큰 URL로 외부 클라이언트에게 공유하고 PDF 저장을 지원합니다.

## 명령어

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
```

테스트 프레임워크는 현재 설정되어 있지 않습니다.

## 아키텍처

### 라우트 구조

| 그룹/경로 | URL | 레이아웃 |
|-----------|-----|----------|
| `(marketing)` | `/` | 마케팅 헤더 + 푸터 |
| `(admin)` | `/admin` | 중앙 정렬 카드 |
| `log/[token]` | `/log/:token` | 단독 페이지 |
| `error` | `/error` | 단독 오류 안내 |

### 폼 패턴

**react-hook-form + zod + shadcn Form** 조합을 표준으로 사용합니다:
- 스키마 정의: `lib/validations.ts` (`passcodeSchema`, `linkCreateSchema`)
- 폼 컴포넌트: `Form` → `FormField` → `FormItem` → `FormControl` + `FormMessage`
- 토스트 알림: `sonner`의 `toast.success` / `toast.error`

### 컴포넌트 계층

- `components/ui/` — shadcn/ui 원본 컴포넌트 (직접 수정하지 않음)
- `components/common/` — 재사용 공통 컴포넌트 (`Logo`, `ThemeToggle`, `EmptyState`)
- `components/layout/` — 레이아웃 전용 (`MarketingHeader`, `Footer`)
- `components/providers/` — 전역 프로바이더 (`ThemeProvider`)
- `components/sections/` — 페이지 섹션 컴포넌트
  - `HeroSection`, `FeaturesSection`, `CTASection` — 랜딩 페이지
  - `AdminPasscodeForm`, `AdminLinkCreateForm` — 어드민 페이지
  - `StudyLogViewer` — 일지 열람 페이지

### 유틸리티

- `lib/utils.ts` — `cn()` (clsx + tailwind-merge)
- `lib/validations.ts` — Zod 스키마 및 타입 추론
- `lib/hooks.ts` — usehooks-ts 훅 re-export

### 환경 변수

`.env.example` 참고. 필수 변수:
- `NOTION_API_KEY` — Notion 인테그레이션 시크릿
- `NOTION_DB_ID` — 스터디 일지 데이터베이스 ID
- `ADMIN_PASSCODE` — 어드민 패스코드
- `SHARE_TOKEN_SECRET` — 토큰 서명 시크릿
- `NEXT_PUBLIC_BASE_URL` — 서비스 기본 URL

### 테마

`next-themes`로 시스템 테마를 자동 감지합니다. `app/layout.tsx`의 `ThemeProvider`가 전역 등록되어 있으며, `<html>`에 `suppressHydrationWarning`이 필요합니다.

Tailwind CSS 4 기반이며, 다크모드 CSS 변수는 `app/globals.css`에 정의됩니다.

### 주요 패키지

- `@notionhq/client` — Notion API 클라이언트
- `@react-pdf/renderer` — PDF 생성
- `date-fns` + `ko` locale — 한국어 날짜 포맷
- `react-hook-form` + `zod` — 폼 유효성 검사
