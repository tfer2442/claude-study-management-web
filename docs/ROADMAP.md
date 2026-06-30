# 스터디 일지 공유 서비스 개발 로드맵

Notion에 작성된 스터디 일지를 토큰 URL로 외부 클라이언트에게 안전하게 공유하고 PDF 저장을 지원하는 서비스

> 최종 업데이트: 2026-06-30 (Phase 5 완료 — 전체 배포 완료)

> **🧪 핵심 원칙**: API 연동이나 비즈니스 로직 구현과 같은 작업은 테스트를 꼼꼼히 수행할 수 있도록 작성합니다. 구현을 한 후에는 **반드시** 테스트를 수행해야 합니다. 테스트 시에는 **Playwright MCP**를 사용합니다. **단계별로 생각하며** 구현합니다.

## 개요

**스터디 일지 공유 서비스**는 스터디를 운영하는 멘토/관리자를 위한 일지 공유 솔루션으로 다음 기능을 제공합니다:

- **Notion 일지 조회 (F001)**: Notion 데이터베이스에 작성된 일지를 실시간으로 가져와 렌더링
- **토큰 기반 공개 접근 (F002)**: `/log/[token]` 경로로 인증 없이 외부 클라이언트에게 공유
- **만료일 검증 (F003)**: 발급된 링크의 유효기간을 검증하여 만료 시 접근 차단
- **PDF 다운로드 (F004)**: 열람 중인 일지를 PDF 파일로 저장
- **토큰 발급 및 링크 생성 (F005)**: 어드민이 일지별 공유 링크를 생성
- **어드민 패스코드 인증 (F010)**: 패스코드 기반으로 어드민 페이지 접근 제어
- **오류/만료 상태 표시 (F011)**: 잘못된 토큰·만료 링크에 대한 명확한 안내 화면

### 기술 스택

- **프레임워크**: Next.js 16.x (App Router), React 19, TypeScript 5.6+
- **스타일링**: TailwindCSS v4, shadcn/ui, Lucide React
- **폼/검증**: React Hook Form 7.x + Zod 4.x
- **외부 연동**: @notionhq/client (Notion API)
- **PDF 생성**: @react-pdf/renderer
- **배포**: Vercel

## 개발 진행 현황

| Phase | 내용 | 상태 | 진행률 |
|-------|------|------|--------|
| Phase 1 | 프로젝트 기반 설정 | ✅ 완료 | 100% |
| Phase 2 | Notion API 연동 및 데이터 레이어 | ✅ 완료 | 100% |
| Phase 3 | 핵심 기능 구현 (토큰·어드민·열람) | ✅ 완료 | 100% |
| Phase 3-1 | Shared Links DB 기록 저장 (F006) | ✅ 완료 | 100% |
| Phase 4 | PDF 생성 기능 | ✅ 완료 | 100% |
| Phase 5 | 배포 및 마무리 | ✅ 완료 | 100% |

**전체 진행률: 100% (6 / 6 Phase 완료) 🎉**

## 개발 워크플로우

1. **작업 계획**: 기존 코드베이스를 학습하고 현재 상태를 파악한 뒤 `ROADMAP.md`를 갱신합니다.
2. **작업 생성**: `/tasks` 디렉토리에 `XXX-description.md` 형식으로 작업 파일을 생성합니다. API/비즈니스 로직 작업에는 `## 테스트 체크리스트` 섹션(Playwright MCP 시나리오)을 **필수**로 포함합니다.
3. **작업 구현**: 작업 파일 명세를 따라 **단계별로** 구현합니다. API 연동·비즈니스 로직 구현 후에는 **반드시** Playwright MCP로 E2E 테스트를 수행합니다. 테스트 미통과 시 다음 단계로 진행하지 않습니다.
4. **로드맵 업데이트**: 완료된 작업을 ✅로 표시합니다.

---

## 개발 단계

### Phase 1: 프로젝트 기반 설정 ✅

> **목표**: 애플리케이션의 골격, 라우트 구조, 공통 컴포넌트, UI를 더미 데이터 기반으로 완성한다.
> **완료 기준**: 모든 페이지가 빈 데이터/더미 데이터로 정상 렌더링되며, 폼 검증과 테마 시스템이 동작한다. ✅

- **Task 001: 프로젝트 구조 및 라우팅 설정** ✅ - 완료
  - [x] Next.js App Router 기반 라우트 그룹 구성 (`(marketing)`, `(admin)`, `log/[token]`, `error`)
  - [x] 전역 레이아웃 `app/layout.tsx` 및 그룹별 레이아웃 구현
  - [x] 마케팅 헤더/푸터 골격 구현 (`MarketingHeader`, `Footer`)

- **Task 002: 타입 정의 및 검증 스키마 설계** ✅ - 완료
  - [x] Zod 스키마 정의 (`lib/validations.ts` — `passcodeSchema`, `linkCreateSchema`)
  - [x] 타입 추론 및 폼 입력 타입 export
  - [x] 공통 유틸리티 구성 (`lib/utils.ts` `cn()`, `lib/hooks.ts`)

- **Task 003: 공통 컴포넌트 및 디자인 시스템 구축** ✅ - 완료
  - [x] shadcn/ui 원본 컴포넌트 설치 (`components/ui/`)
  - [x] 공통 컴포넌트 구현 (`Logo`, `ThemeToggle`, `EmptyState`)
  - [x] `next-themes` 기반 테마 시스템 및 다크모드 CSS 변수 적용

- **Task 004: 전체 페이지 UI 완성 (더미 데이터)** ✅ - 완료
  - [x] 랜딩 페이지 섹션 구현 (`HeroSection`, `FeaturesSection`, `CTASection`)
  - [x] 어드민 페이지 폼 구현 (`AdminPasscodeForm`, `AdminLinkCreateForm`)
  - [x] 일지 열람 뷰어 구현 (`StudyLogViewer`) 및 오류 페이지 UI
  - [x] 반응형 디자인 및 사용자 플로우 검증

- **Task 005: 환경 변수 및 패키지 설정** ✅ - 완료
  - [x] `.env.example` 작성 (`NOTION_API_KEY`, `NOTION_DB_ID`, `ADMIN_PASSCODE`, `SHARE_TOKEN_SECRET`, `NEXT_PUBLIC_BASE_URL`)
  - [x] 주요 패키지 설치 (`@notionhq/client`, `@react-pdf/renderer`, `date-fns`, `react-hook-form`, `zod` 등)

---

### Phase 2: Notion API 연동 및 데이터 레이어 ✅

> **목표**: Notion API와 연동하여 실제 일지 데이터를 가져오는 데이터 레이어를 구축한다.
> **완료 기준**: Notion DB에서 일지 단건/목록을 조회하고, 응답을 앱 내부 타입으로 변환하는 함수가 테스트를 통과한다. ✅

- **Task 006: Notion 클라이언트 및 데이터 타입 정의** ✅ - 완료
  - [x] `lib/notion-types.ts` 도메인 타입 정의 (`StudyLogBlockType`, `StudyLogBlock`, `StudyLogSummary`, `StudyLog`)
  - [x] `lib/notion.ts` Notion 클라이언트 초기화 (환경 변수 기반, @notionhq/client v5)
  - [x] Notion 페이지 응답 → `StudyLogSummary` 변환 매퍼 작성

- **Task 007: 일지 조회 API 구현 (F001)** ✅ - 완료
  - [x] 일지 목록 조회 함수 구현 (`getStudyLogList`, dataSources.query, created_time DESC)
  - [x] 일지 단건 조회 함수 구현 (`getStudyLog`, pages.retrieve + blocks.children.list 페이지네이션)
  - [x] Notion 블록 → `StudyLogBlock` 변환 로직 (`mapBlocksToStudyLogBlocks`, 재귀 depth 2)
  - [x] 에러 핸들링 (Notion API 오류 console.error + throw)
  - [x] Playwright MCP로 /admin 페이지 정상 렌더링 확인, 콘솔 오류 없음

---

### Phase 3: 핵심 기능 구현 (토큰·어드민·열람) ✅

> **목표**: 토큰 발급·검증, 어드민 인증, 일지 열람 플로우를 실제 동작하도록 구현한다.
> **완료 기준**: 어드민이 링크를 발급하고, 발급된 토큰으로 일지를 열람하며, 만료/오류가 정확히 처리되는 전체 플로우가 E2E 테스트를 통과한다. ✅

- **Task 008: 토큰 발급 및 검증 로직 구현 (F002, F003)** ✅ - 완료
  - [x] `lib/token.ts` — jose HS256 JWT, `signToken(pageId, expiresAt)` / `verifyToken(token)` 구현
  - [x] 토큰 페이로드에 pageId·만료일(exp) 포함, SHARE_TOKEN_SECRET 서명
  - [x] 만료/위조 토큰 verifyToken 시 null 반환 (jose 자동 검증)

- **Task 009: 어드민 패스코드 인증 구현 (F010)** ✅ - 완료
  - [x] `app/api/auth/passcode/route.ts` — ADMIN_PASSCODE 비교, HttpOnly 쿠키 `admin_session` 설정
  - [x] `proxy.ts` — `/api/links` 경로 인증 보호 (middleware.ts → proxy.ts 마이그레이션)
  - [x] `AdminPasscodeForm` 실제 API 연동, 올바른/잘못된 패스코드 Playwright 확인

- **Task 010: 링크 생성 기능 구현 (F005)** ✅ - 완료
  - [x] `app/api/links/route.ts` — 쿠키 인증 확인 + signToken → URL 반환
  - [x] `AdminPage` async 서버 컴포넌트로 변경, `getStudyLogList()` → entries props 전달
  - [x] `AdminLinkCreateForm` MOCK_ENTRIES 제거, 실제 API 연동, 미인증 401 확인

- **Task 011: 일지 열람 페이지 연동 (F002, F011)** ✅ - 완료
  - [x] `/log/[token]` — verifyToken → getStudyLog → StudyLogViewer 렌더링
  - [x] 위조/만료 → `/error?type=invalid`, Notion 미존재 → `not_found`, 기타 → `unknown`
  - [x] `StudyLogViewer` 실제 StudyLog 블록 타입별 렌더링, Playwright 위조 토큰 확인

- **Task 011-1: 핵심 기능 통합 E2E 테스트** ✅ - 완료
  - [x] 잘못된 패스코드 → toast.error 확인
  - [x] 올바른 패스코드 → AdminLinkCreateForm 표시 확인
  - [x] 위조 토큰 `/log/invalid-token` → `/error?type=invalid` redirect 확인
  - [x] npm run build 최종 성공

---

---

### Phase 3-1: Shared Links DB 기록 저장 (F006) ✅

> **목표**: 링크 생성 시 Shared Links Notion DB에 발급 이력을 자동으로 저장한다.
> **완료 기준**: 어드민이 링크 생성 후 Notion Shared Links DB에 행(이름·일지ID·토큰·만료일)이 추가되는 E2E 테스트가 통과한다. ✅

- **Task 012: Shared Links DB 저장 함수 구현 및 링크 생성 API 연동** ✅ - 완료
  - [x] `lib/notion.ts`에 `saveSharedLink` 함수 추가 (fetch REST API 기반)
  - [x] `/api/links/route.ts`에서 토큰 발급 후 비차단 방식으로 `saveSharedLink` 호출
  - [x] `AdminLinkCreateForm`에서 일지 제목을 API body에 포함하여 전송

- **Task 013: Shared Links 저장 E2E 테스트** ✅ - 완료
  - [x] Playwright MCP로 어드민 전체 플로우 실행 (로그인 → 일지 선택 → 만료일 → 링크 생성)
  - [x] Notion REST API로 Shared Links DB 조회하여 신규 행 추가 검증
  - [x] 행의 이름·일지ID·만료일 속성 값이 입력값과 일치하는지 확인

---

### Phase 4: PDF 생성 기능 ✅

> **목표**: 열람 중인 일지를 PDF로 저장하는 기능을 구현한다.
> **완료 기준**: 일지 열람 페이지에서 PDF 다운로드가 동작하고, 한글 폰트·레이아웃이 정상 출력된다. ✅

- **Task 014: PDF 문서 컴포넌트 구현 (F004)** ✅ - 완료
  - [x] `@react-pdf/renderer` v4.5.1 기반 `StudyLogDocument` 컴포넌트 작성 (`components/pdf/study-log-pdf.tsx`)
  - [x] 나눔고딕 TTF 한글 폰트 등록 및 블록 타입별 PDF 요소 매핑
  - [x] 헤더(제목·날짜), 본문(블록 렌더링), 푸터(페이지 번호) 레이아웃 구성

- **Task 015: PDF 다운로드 버튼 연동 및 E2E 테스트** ✅ - 완료
  - [x] `usePDF` hook 기반 다운로드 버튼 컴포넌트 신규 생성 (`components/pdf/pdf-download-button.tsx`)
  - [x] `StudyLogViewer` 더미 버튼 제거, dynamic import + ssr:false로 교체
  - [x] DOM append 방식으로 다운로드 파일명 버그 수정 (`스터디일지_제목_날짜.pdf`), 로딩 상태 처리
  - [x] Playwright MCP로 PDF 다운로드 버튼 렌더링 및 동작 검증

---

### Phase 5: 배포 및 마무리 ✅

> **목표**: 성능·접근성·안정성을 점검하고 Vercel에 배포한다.
> **완료 기준**: 프로덕션 빌드가 성공하고, Vercel 배포 URL에서 전체 기능이 정상 동작한다. ✅

- **Task 016: 품질 점검 및 최적화** ✅ - 완료
  - [x] 접근성·반응형·다크모드 최종 점검
  - [x] Notion API 응답 캐싱 전략 적용 (ISR/revalidate=3600, /log/[token])
  - [x] 에러 바운더리 추가 (app/error.tsx) 및 Notion 이미지 도메인 허용 (next.config.ts)

- **Task 017: Vercel 배포 및 환경 구성** ✅ - 완료
  - [x] Vercel 프로젝트 연결 및 환경 변수 6개 등록 (CLI)
  - [x] 프로덕션 빌드 검증 (`npm run build`) 및 배포 — https://invoice-web-lilac.vercel.app
  - [x] 배포 URL 기반 최종 E2E 스모크 테스트 (Playwright MCP) — 링크 생성·PDF 다운로드 정상 확인
  - [x] PDF 폰트 Pretendard로 교체 (나눔고딕 서브셋 fontkit 호환 오류 수정)

---

## 상태 범례

- ✅ 완료 / `- [x]` 완료된 항목
- 🔄 진행 중 / 진행 예정
- ⏳ 예정 / `- [ ]` 미완료 항목
- **우선순위**: 즉시 시작해야 할 작업
