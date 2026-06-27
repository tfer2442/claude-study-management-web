import { Metadata } from "next"
import { StudyLogViewer } from "@/components/sections/study-log-viewer"

export const metadata: Metadata = {
  title: "스터디 일지 | 스터디 일지 공유",
  description: "공유된 스터디 일지를 열람합니다",
}

interface StudyLogPageProps {
  params: Promise<{ token: string }>
}

// 스터디 일지 열람 페이지 — 토큰 유효성 검증 후 일지 렌더링
export default async function StudyLogPage({ params }: StudyLogPageProps) {
  const { token } = await params

  return (
    <div className="min-h-screen bg-background">
      <StudyLogViewer token={token} />
    </div>
  )
}
