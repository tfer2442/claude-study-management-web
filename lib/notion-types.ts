// Notion 블록 타입 — 앱에서 지원하는 블록 종류
export type StudyLogBlockType =
  | "paragraph"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "bulleted_list_item"
  | "numbered_list_item"
  | "code"
  | "image"
  | "divider"
  | "quote"
  | "callout"
  | "unsupported"

// 스터디 일지 블록 — Notion 블록을 앱 도메인으로 추상화
export interface StudyLogBlock {
  id: string
  type: StudyLogBlockType
  // 텍스트 계열 블록의 plain text 내용
  content: string
  // code 블록의 프로그래밍 언어
  language?: string
  // image 블록의 이미지 URL
  url?: string
  // 중첩 블록 (bulleted_list_item 등의 자식)
  children?: StudyLogBlock[]
}

// 일지 목록 조회용 경량 타입
export interface StudyLogSummary {
  id: string
  title: string
  createdAt: Date
}

// 일지 단건 조회용 전체 타입
export interface StudyLog extends StudyLogSummary {
  lastEditedAt: Date
  blocks: StudyLogBlock[]
}
