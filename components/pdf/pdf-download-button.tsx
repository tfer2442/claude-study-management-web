"use client"

// PDF 다운로드 버튼 컴포넌트 — usePDF hook 기반 (PDFDownloadLink 파일명 인코딩 문제 우회)
import { usePDF } from "@react-pdf/renderer"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { FileDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { StudyLog } from "@/lib/notion-types"
import { StudyLogDocument } from "./study-log-pdf"

interface PdfDownloadButtonProps {
  log: StudyLog
}

export default function PdfDownloadButton({ log }: PdfDownloadButtonProps) {
  const fileName = `스터디일지_${log.title}_${format(new Date(log.createdAt), "yyyy-MM-dd", { locale: ko })}.pdf`

  const [instance] = usePDF({ document: <StudyLogDocument log={log} /> })

  const handleDownload = () => {
    if (!instance.url) return
    const a = document.createElement("a")
    a.href = instance.url
    a.download = fileName
    // DOM에 append 후 클릭해야 Chrome이 download 속성을 인식함
    // attach 없이 a.click()을 호출하면 blob URL의 UUID가 파일명이 되는 버그 발생
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="mt-2"
      disabled={instance.loading || !!instance.error}
      onClick={handleDownload}
    >
      <FileDown className="mr-2 h-4 w-4" />
      {instance.loading ? "PDF 생성 중..." : "PDF 다운로드"}
    </Button>
  )
}
