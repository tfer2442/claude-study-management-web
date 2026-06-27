import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// 하단 CTA(Call to Action) 섹션
export function CTASection() {
  return (
    <section className="px-4 py-20">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">
          지금 바로 시작하세요
        </h2>
        <p className="text-muted-foreground">
          어드민 페이지에서 패스코드를 입력하고 첫 번째 공유 링크를 만들어 보세요.
        </p>
        <Button asChild size="lg">
          <Link href="/admin">
            어드민으로 이동
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
