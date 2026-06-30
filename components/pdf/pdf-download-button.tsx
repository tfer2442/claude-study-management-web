"use client"

// PDF 다운로드 버튼 컴포넌트 — @react-pdf/renderer의 PDFDownloadLink 활용
import { PDFDownloadLink } from "@react-pdf/renderer"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { FileDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { StudyLog } from "@/lib/notion-types"
import { StudyLogDocument } from "./study-log-pdf"

interface PdfDownloadButtonProps {
  log: StudyLog
}

// PDF 다운로드 버튼 — 클라이언트 전용 (SSR 불가)
export default function PdfDownloadButton({ log }: PdfDownloadButtonProps) {
  // 파일명: 스터디일지_제목_날짜.pdf
  const fileName = `스터디일지_${log.title}_${format(new Date(log.createdAt), "yyyy-MM-dd", { locale: ko })}.pdf`

  return (
    <PDFDownloadLink
      document={<StudyLogDocument log={log} />}
      fileName={fileName}
    >
      {({ loading }) => (
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          disabled={loading}
        >
          <FileDown className="mr-2 h-4 w-4" />
          {loading ? "PDF 생성 중..." : "PDF 다운로드"}
        </Button>
      )}
    </PDFDownloadLink>
  )
}
