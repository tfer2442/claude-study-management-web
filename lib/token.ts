import { SignJWT, jwtVerify } from "jose"

function getSecret(): Uint8Array {
  const secret = process.env.SHARE_TOKEN_SECRET
  if (!secret) throw new Error("SHARE_TOKEN_SECRET 환경변수가 설정되지 않았습니다")
  return new TextEncoder().encode(secret)
}

// 공유 토큰 서명 — pageId와 만료일을 JWT로 발급
export async function signToken(pageId: string, expiresAt: Date): Promise<string> {
  return new SignJWT({ pageId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresAt)
    .sign(getSecret())
}

// 공유 토큰 검증 — 유효하면 pageId 반환, 만료/위조 시 null 반환
export async function verifyToken(token: string): Promise<{ pageId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    if (typeof payload.pageId !== "string") return null
    return { pageId: payload.pageId }
  } catch {
    return null
  }
}
