import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { signToken } from "@/lib/token"

export async function POST(request: Request) {
  const cookieStore = await cookies()
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    return NextResponse.json({ error: "인증이 필요합니다" }, { status: 401 })
  }

  const { notionEntryId, expiresAt } = await request.json()

  if (!notionEntryId || !expiresAt) {
    return NextResponse.json({ error: "필수 파라미터가 누락되었습니다" }, { status: 400 })
  }

  const token = await signToken(notionEntryId, new Date(expiresAt))
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
  const url = `${baseUrl}/log/${token}`

  return NextResponse.json({ url })
}
