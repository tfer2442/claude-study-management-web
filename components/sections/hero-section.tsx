import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

// 랜딩 페이지 히어로 섹션
export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center flex-1 px-4 py-24 text-center gap-6">
      <div className="rounded-full border bg-muted px-4 py-1.5 text-sm text-muted-foreground flex items-center gap-2">
        <BookOpen className="h-3.5 w-3.5" />
        Notion 기반 문서 공유 서비스
      </div>

      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl max-w-3xl">
        문서를 <br />
        <span className="text-primary">간편하게 공유</span>하세요
      </h1>

      <p className="max-w-xl text-muted-foreground text-lg">
        Notion에 작성한 문서를 토큰 링크로 외부에 공유하고,
        PDF로 저장할 수 있습니다.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild size="lg">
          <Link href="/admin">
            어드민 로그인
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="#features">서비스 소개 보기</Link>
        </Button>
      </div>
    </section>
  )
}
