---
name: project-study-log
description: 스터디 일지 공유 서비스 프로젝트 컨텍스트 — 라우트 구조, 기술 스택, 주요 결정사항
metadata:
  type: project
---

이 프로젝트는 Notion 스터디 일지를 토큰 URL로 외부 공유하고 PDF 저장을 지원하는 서비스입니다.

**Why:** 기존 Next.js 스타터 킷(대시보드/auth 구조)을 스터디 일지 공유 서비스에 맞게 재편했습니다.

**How to apply:** 새 기능 추가 시 아래 라우트 구조와 컴포넌트 패턴을 따르세요.

## 라우트 구조

- `(marketing)/` → `/` 랜딩 페이지 (MarketingHeader + Footer 레이아웃)
- `(admin)/admin` → `/admin` 어드민 (패스코드 인증 → 링크 생성, 중앙 카드 레이아웃)
- `log/[token]` → `/log/:token` 스터디 일지 열람 (단독 페이지)
- `error` → `/error?type=expired|not_found|invalid|unknown` 오류 안내

## 기술 스택

- Next.js 16.2.9 (App Router, Turbopack)
- React 19, TypeScript 5
- TailwindCSS v4 (설정 파일 없음, postcss 기반)
- shadcn/ui (button, form, input, select, calendar, popover, badge, card, skeleton 등)
- Zod v4 (`required_error` → `error` 로 변경됨 — Zod v4 breaking change)
- `@notionhq/client` v5, `@react-pdf/renderer` v4

## Zod v4 주의사항

`.date({ required_error: "..." })` 는 Zod v4에서 컴파일 오류 발생.
`error` 필드로 대체: `.date({ error: "만료일을 선택하세요" })`

## 컴포넌트 섹션 구성

- `AdminPasscodeForm` → 패스코드 입력 후 `isAuthenticated` state로 `AdminLinkCreateForm` 전환
- `AdminLinkCreateForm` → Select(Notion 일지) + Calendar(만료일) + 생성 링크 복사 UI
- `StudyLogViewer` → 토큰 props 받아 일지 렌더링 (TODO: 실제 Notion API 연동)

## 미구현 (TODO)

- 서버 액션: 패스코드 검증, 토큰 생성/저장, Notion 데이터 조회
- PDF 생성: `@react-pdf/renderer` 활용
- 토큰 만료 검증 미들웨어 또는 서버 컴포넌트
