import { Metadata } from "next"
import { redirect } from "next/navigation"
import { StudyLogViewer } from "@/components/sections/study-log-viewer"
import { verifyToken } from "@/lib/token"
import { getStudyLog } from "@/lib/notion"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "문서 | 문서 공유",
  description: "공유된 문서를 열람합니다",
}

interface StudyLogPageProps {
  params: Promise<{ token: string }>
}

export default async function StudyLogPage({ params }: StudyLogPageProps) {
  const { token } = await params

  const payload = await verifyToken(token)
  if (!payload) {
    redirect("/error?type=invalid")
  }

  try {
    const studyLog = await getStudyLog(payload.pageId)
    return (
      <div className="min-h-screen bg-background">
        <StudyLogViewer log={studyLog} />
      </div>
    )
  } catch (error: unknown) {
    const isNotFound =
      error instanceof Error && error.message.includes("object_not_found")
    redirect(isNotFound ? "/error?type=not_found" : "/error?type=unknown")
  }
}
