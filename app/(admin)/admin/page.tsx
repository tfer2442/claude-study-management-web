import { Metadata } from "next"
import { AdminPasscodeForm } from "@/components/sections/admin-passcode-form"
import { getStudyLogList } from "@/lib/notion"

export const metadata: Metadata = {
  title: "어드민 | 스터디 일지 공유",
  description: "패스코드 인증 후 스터디 일지 공유 링크를 생성합니다",
}

// 어드민 페이지 — 패스코드 인증 + Notion 일지 선택 + 링크 생성
export default async function AdminPage() {
  const entries = await getStudyLogList().catch(() => [])

  return (
    <div className="w-full max-w-lg">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight">어드민</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          패스코드를 입력하고 공유 링크를 생성하세요
        </p>
      </div>
      <AdminPasscodeForm entries={entries} />
    </div>
  )
}
