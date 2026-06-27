import Link from "next/link"
import { Code2, X } from "lucide-react"
import { Logo } from "@/components/common/logo"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
  제품: [
    { label: "기능", href: "#features" },
    { label: "가격", href: "#pricing" },
    { label: "변경 이력", href: "#changelog" },
  ],
  회사: [
    { label: "소개", href: "#about" },
    { label: "블로그", href: "#blog" },
    { label: "채용", href: "#careers" },
  ],
  법적: [
    { label: "개인정보처리방침", href: "#privacy" },
    { label: "이용약관", href: "#terms" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* 브랜드 컬럼 */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              빠르게 웹 개발을 시작할 수 있는 프로덕션 레디 스타터 킷입니다.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Code2 className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* 링크 컬럼들 */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-semibold">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} 스타터킷. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
