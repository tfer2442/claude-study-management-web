import { Logo } from "@/components/common/logo"
import { Separator } from "@/components/ui/separator"

// 마케팅 페이지 하단 푸터
export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Notion 기반 스터디 일지 공유 서비스
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} 스터디 일지 공유. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
