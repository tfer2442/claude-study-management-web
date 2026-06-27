import Link from "next/link"
import { ArrowRight, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* 배경 그라디언트 장식 */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center">
        <Badge variant="secondary" className="mb-4">
          🚀 v1.0 출시
        </Badge>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
          빠르게 시작하는{" "}
          <span className="text-primary">프로덕션 레디</span>
          <br />
          Next.js 스타터 킷
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Next.js 15, TypeScript, TailwindCSS, shadcn/ui가 완벽하게 구성된
          스타터 킷으로 개발에만 집중하세요.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/dashboard">
              대시보드 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#">
              <Code2 className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          무료 오픈소스 · MIT 라이선스
        </p>
      </div>
    </section>
  )
}
