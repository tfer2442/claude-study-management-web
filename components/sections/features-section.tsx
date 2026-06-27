import {
  Zap,
  Shield,
  Palette,
  Layout,
  Component,
  Globe,
  type LucideIcon,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Zap,
    title: "빠른 성능",
    description:
      "Next.js 15 App Router와 React Server Components로 최적화된 성능을 제공합니다.",
  },
  {
    icon: Shield,
    title: "타입 안전성",
    description:
      "TypeScript strict 모드로 런타임 오류를 사전에 방지하고 코드 품질을 높입니다.",
  },
  {
    icon: Palette,
    title: "다크 모드",
    description:
      "next-themes로 시스템 테마를 자동 감지하고 사용자 선호도를 저장합니다.",
  },
  {
    icon: Layout,
    title: "반응형 디자인",
    description:
      "모바일 퍼스트 TailwindCSS로 모든 화면 크기에 완벽하게 대응합니다.",
  },
  {
    icon: Component,
    title: "UI 컴포넌트",
    description:
      "shadcn/ui 컴포넌트로 접근성 있고 커스터마이징 가능한 UI를 빠르게 구성합니다.",
  },
  {
    icon: Globe,
    title: "SEO 최적화",
    description:
      "Next.js 메타데이터 API를 활용해 검색엔진 최적화를 손쉽게 처리합니다.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="bg-muted/50 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            모든 것이 포함되어 있습니다
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            프로덕션 수준의 웹 서비스를 시작하기 위한 모든 구성 요소를 제공합니다.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-2">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
