import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { passcode } = await request.json()

  if (passcode !== process.env.ADMIN_PASSCODE) {
    return NextResponse.json(
      { error: "패스코드가 올바르지 않습니다" },
      { status: 401 }
    )
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set("admin_session", "authenticated", {
    httpOnly: true,
    path: "/",
    maxAge: 86400,
    sameSite: "lax",
  })
  return response
}
