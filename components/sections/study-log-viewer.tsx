"use client"

import dynamic from "next/dynamic"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { StudyLog, StudyLogBlock } from "@/lib/notion-types"

// PDF 다운로드 버튼 — SSR 불가로 dynamic import 사용
const PdfDownloadButton = dynamic(
  () => import("@/components/pdf/pdf-download-button"),
  {
    ssr: false,
    loading: () => (
      <Button variant="outline" size="sm" className="mt-2" disabled>
        준비 중...
      </Button>
    ),
  }
)

interface StudyLogViewerProps {
  log: StudyLog
}

function renderBlock(block: StudyLogBlock): React.ReactNode {
  const children = block.children?.map((child) => renderBlock(child))

  switch (block.type) {
    case "paragraph":
      return <p key={block.id} className="mb-4 leading-7">{block.content}</p>
    case "heading_1":
      return <h1 key={block.id} className="text-3xl font-bold mt-8 mb-4">{block.content}</h1>
    case "heading_2":
      return <h2 key={block.id} className="text-2xl font-semibold mt-6 mb-3">{block.content}</h2>
    case "heading_3":
      return <h3 key={block.id} className="text-xl font-semibold mt-5 mb-2">{block.content}</h3>
    case "bulleted_list_item":
      return (
        <li key={block.id} className="ml-6 list-disc mb-1">
          {block.content}
          {children && <ul>{children}</ul>}
        </li>
      )
    case "numbered_list_item":
      return (
        <li key={block.id} className="ml-6 list-decimal mb-1">
          {block.content}
          {children && <ol>{children}</ol>}
        </li>
      )
    case "code":
      return (
        <pre key={block.id} className="bg-muted rounded-md p-4 mb-4 overflow-x-auto text-sm">
          <code data-language={block.language}>{block.content}</code>
        </pre>
      )
    case "image":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={block.id} src={block.url} alt="" className="rounded-md mb-4 max-w-full" />
      )
    case "divider":
      return <hr key={block.id} className="border-border my-6" />
    case "quote":
      return (
        <blockquote key={block.id} className="border-l-4 border-border pl-4 italic mb-4 text-muted-foreground">
          {block.content}
        </blockquote>
      )
    case "callout":
      return (
        <div key={block.id} className="bg-muted rounded-md p-4 mb-4 border border-border">
          {block.content}
        </div>
      )
    case "unsupported":
    default:
      return null
  }
}

// 스터디 일지 열람 컴포넌트
export function StudyLogViewer({ log }: StudyLogViewerProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* 일지 헤더 */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">스터디 일지</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{log.title}</h1>
        <p className="text-muted-foreground text-sm">
          작성일: {format(log.createdAt, "PPP", { locale: ko })}
        </p>

        {/* PDF 다운로드 버튼 — dynamic import로 클라이언트 전용 렌더링 */}
        <PdfDownloadButton log={log} />
      </div>

      <hr className="border-border mb-8" />

      {/* 일지 콘텐츠 */}
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        {log.blocks.map((block) => renderBlock(block))}
      </article>
    </div>
  )
}
