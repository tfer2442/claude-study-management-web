import { NextResponse } from "next/server"
import { cookies, headers } from "next/headers"
import { signToken } from "@/lib/token"
import { saveSharedLink } from "@/lib/notion"

export async function POST(request: Request) {
  const cookieStore = await cookies()
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    return NextResponse.json({ error: "인증이 필요합니다" }, { status: 401 })
  }

  const { notionEntryId, notionEntryTitle, expiresAt } = await request.json()

  if (!notionEntryId || !expiresAt) {
    return NextResponse.json({ error: "필수 파라미터가 누락되었습니다" }, { status: 400 })
  }

  const expiresDate = new Date(expiresAt)
  const token = await signToken(notionEntryId, expiresDate)

  // 요청 헤더에서 실제 호스트를 추출 — 환경변수에 의존하지 않아 모든 배포 환경에서 정상 동작
  const headersList = await headers()
  const host = headersList.get("host") ?? "localhost:3000"
  const proto = headersList.get("x-forwarded-proto") ?? "http"
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? `${proto}://${host}`
  const url = `${baseUrl}/log/${token}`

  // 비차단 방식으로 Shared Links DB에 기록 저장 (실패해도 URL 응답에 영향 없음)
  saveSharedLink({
    title: notionEntryTitle ?? "제목 없음",
    notionEntryId,
    token,
    expiresAt: expiresDate,
  }).catch(console.warn)

  return NextResponse.json({ url })
}
