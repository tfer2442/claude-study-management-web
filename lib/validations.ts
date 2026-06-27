import { z } from "zod"

// ── 어드민 패스코드 인증 스키마 ──────────────────────────────────────────
export const passcodeSchema = z.object({
  passcode: z.string().min(1, "패스코드를 입력하세요"),
})

export type PasscodeFormValues = z.infer<typeof passcodeSchema>

// ── 공유 링크 생성 스키마 ────────────────────────────────────────────────
export const linkCreateSchema = z.object({
  // 공유할 Notion 일지 ID
  notionEntryId: z.string().min(1, "공유할 일지를 선택하세요"),
  // 링크 만료일 (오늘 이후여야 함)
  expiresAt: z
    .date({ error: "만료일을 선택하세요" })
    .refine((date) => date > new Date(), {
      message: "만료일은 오늘 이후여야 합니다",
    }),
})

export type LinkCreateFormValues = z.infer<typeof linkCreateSchema>

// ── 로그인 폼 스키마 (기존 호환성 유지) ─────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email("올바른 이메일 주소를 입력하세요"),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
})

export type LoginFormValues = z.infer<typeof loginSchema>
