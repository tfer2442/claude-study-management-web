import { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "오류 | 스터디 일지 공유",
  description: "요청을 처리하는 중 오류가 발생했습니다",
}

// 오류 페이지에 전달 가능한 오류 유형
type ErrorType = "expired" | "not_found" | "invalid" | "unknown"

interface ErrorPageProps {
  searchParams: Promise<{ type?: ErrorType }>
}

// 오류 유형별 메시지 매핑
const ERROR_MESSAGES: Record<ErrorType, { title: string; description: string }> = {
  expired: {
    title: "링크가 만료되었습니다",
    description: "공유 링크의 유효 기간이 지났습니다. 새로운 링크를 요청해 주세요.",
  },
  not_found: {
    title: "일지를 찾을 수 없습니다",
    description: "해당 스터디 일지가 존재하지 않거나 삭제되었습니다.",
  },
  invalid: {
    title: "유효하지 않은 링크입니다",
    description: "링크 주소가 올바르지 않습니다. 링크를 다시 확인해 주세요.",
  },
  unknown: {
    title: "알 수 없는 오류가 발생했습니다",
    description: "일시적인 오류입니다. 잠시 후 다시 시도해 주세요.",
  },
}

// 오류 안내 페이지
export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const { type } = await searchParams
  const errorType: ErrorType = type ?? "unknown"
  const { title, description } = ERROR_MESSAGES[errorType] ?? ERROR_MESSAGES.unknown

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  )
}
