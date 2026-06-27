import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, DollarSign } from "lucide-react"

const monthlyData = [
  { month: "1월", users: 820, revenue: 1200000 },
  { month: "2월", users: 932, revenue: 1350000 },
  { month: "3월", users: 1100, revenue: 1580000 },
  { month: "4월", users: 1340, revenue: 1900000 },
  { month: "5월", users: 1520, revenue: 2100000 },
  { month: "6월", users: 1820, revenue: 2345000 },
]

const metrics = [
  { label: "페이지뷰", value: "234,567", change: "+18%", trend: "up" as const },
  { label: "평균 세션 시간", value: "4분 32초", change: "+5%", trend: "up" as const },
  { label: "이탈률", value: "32.4%", change: "-2%", trend: "up" as const },
  { label: "전환율", value: "3.8%", change: "+0.5%", trend: "up" as const },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">분석</h1>
        <p className="text-muted-foreground">서비스 성과와 사용자 행동을 분석합니다.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <Badge variant={metric.trend === "up" ? "default" : "destructive"} className="mt-1 text-xs">
                {metric.change}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>월별 현황</CardTitle>
          <CardDescription>최근 6개월간의 사용자 및 매출 추이입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {monthlyData.map((row) => (
              <div key={row.month} className="flex items-center justify-between border-b pb-2 last:border-0">
                <span className="w-10 text-sm font-medium">{row.month}</span>
                <div className="flex flex-1 items-center gap-4 px-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{row.users.toLocaleString()}명</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <DollarSign className="h-3 w-3" />
                    <span>₩{row.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>성장 중</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
