import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  type LucideIcon,
} from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface StatCard {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: LucideIcon
}

const stats: StatCard[] = [
  { title: "총 사용자", value: "12,345", change: "+12%", trend: "up", icon: Users },
  { title: "월 매출", value: "₩2,345,000", change: "+8%", trend: "up", icon: DollarSign },
  { title: "활성 세션", value: "1,234", change: "-3%", trend: "down", icon: Activity },
  { title: "성장률", value: "23.5%", change: "+4%", trend: "up", icon: TrendingUp },
]

const recentActivities = [
  { id: 1, user: "김철수", action: "회원가입", status: "완료", date: new Date(2025, 5, 24) },
  { id: 2, user: "이영희", action: "결제 완료", status: "완료", date: new Date(2025, 5, 24) },
  { id: 3, user: "박민준", action: "비밀번호 변경", status: "완료", date: new Date(2025, 5, 23) },
  { id: 4, user: "최수진", action: "프로필 수정", status: "완료", date: new Date(2025, 5, 23) },
  { id: 5, user: "정다은", action: "구독 취소", status: "처리중", date: new Date(2025, 5, 22) },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* 페이지 제목 */}
      <div>
        <h1 className="text-2xl font-bold">대시보드</h1>
        <p className="text-muted-foreground">환영합니다. 오늘의 현황을 확인하세요.</p>
      </div>

      {/* 통계 카드 그리드 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <Badge
                variant={stat.trend === "up" ? "default" : "destructive"}
                className="mt-1 text-xs"
              >
                {stat.change} 지난달 대비
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 최근 활동 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
          <CardDescription>최근 7일간의 사용자 활동 내역입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>사용자</TableHead>
                <TableHead>활동</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">날짜</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.user}</TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>
                    <Badge
                      variant={activity.status === "완료" ? "secondary" : "outline"}
                    >
                      {activity.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {format(activity.date, "M월 d일", { locale: ko })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
