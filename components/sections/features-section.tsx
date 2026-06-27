import { Link2, FileDown, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// 서비스 주요 기능 목록
const FEATURES = [
  {
    icon: Link2,
    title: "토큰 링크 생성",
    description:
      "만료일을 설정하여 안전한 공유 링크를 생성하세요. 기간이 지나면 자동으로 접근이 차단됩니다.",
  },
  {
    icon: FileDown,
    title: "PDF 다운로드",
    description:
      "열람자가 스터디 일지를 PDF 파일로 저장할 수 있습니다. 오프라인에서도 참고 가능합니다.",
  },
  {
    icon: ShieldCheck,
    title: "패스코드 보안",
    description:
      "어드민 페이지는 패스코드로 보호됩니다. 허가된 관리자만 링크를 생성할 수 있습니다.",
  },
]

// 서비스 기능 소개 섹션
export function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-20 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">주요 기능</h2>
          <p className="text-muted-foreground mt-3">
            스터디 일지 공유에 필요한 모든 기능을 제공합니다
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader className="pb-2">
                <div className="rounded-md bg-primary/10 w-fit p-2 mb-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-base">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
