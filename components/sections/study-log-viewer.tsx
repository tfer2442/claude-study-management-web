"use client"

import { FileDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface StudyLogViewerProps {
  token: string
}

// 스터디 일지 열람 컴포넌트
// 실제 구현 시: 토큰 검증 → Notion API 조회 → 콘텐츠 렌더링
export function StudyLogViewer({ token }: StudyLogViewerProps) {
  // TODO: 실제 구현 시 서버 컴포넌트로 변환하여 토큰 검증 및 Notion 데이터 조회
  // 현재는 뼈대만 제공 (로딩 상태 예시)
  const isLoading = false
  const isExpired = false

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
        <div className="space-y-3 mt-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* 일지 헤더 */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">스터디 일지</Badge>
          {/* TODO: 만료일 표시 */}
          <Badge variant="outline" className="text-muted-foreground">
            2024년 12월 31일 만료
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          {/* TODO: Notion 페이지 제목 */}
          스터디 일지 제목
        </h1>
        <p className="text-muted-foreground text-sm">
          {/* TODO: 작성일 */}
          작성일: 2024년 1월 1일
        </p>

        {/* PDF 다운로드 버튼 */}
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => {
            // TODO: @react-pdf/renderer로 PDF 생성 및 다운로드 구현
            console.log("PDF 다운로드:", token)
          }}
        >
          <FileDown className="mr-2 h-4 w-4" />
          PDF 다운로드
        </Button>
      </div>

      {/* 구분선 */}
      <hr className="border-border mb-8" />

      {/* 일지 콘텐츠 영역 */}
      {/* TODO: Notion 블록 렌더러 구현 */}
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-muted-foreground text-sm">
          Notion 콘텐츠가 여기에 렌더링됩니다. (구현 예정)
        </p>
      </article>
    </div>
  )
}
