import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  const session = request.cookies.get("admin_session")?.value

  if (session !== "authenticated") {
    return NextResponse.json(
      { error: "인증이 필요합니다" },
      { status: 401 }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/links"],
}
