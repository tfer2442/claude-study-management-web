import { MarketingHeader } from "@/components/layout/marketing-header"
import { Footer } from "@/components/layout/footer"

// 마케팅(공개) 페이지 레이아웃 — Header + Footer 포함
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
