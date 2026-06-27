import Link from "next/link"
import { Logo } from "@/components/common/logo"
import { ThemeToggle } from "@/components/common/theme-toggle"

// 인증 페이지 레이아웃 — 중앙 정렬, 최소한의 UI
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 인증 페이지 상단 바 */}
      <header className="flex h-16 items-center justify-between px-4 border-b">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            홈으로
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        {children}
      </main>
    </div>
  )
}
