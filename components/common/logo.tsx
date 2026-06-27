import { Layers } from "lucide-react"
import Link from "next/link"

// 사이트 전체에서 재사용되는 로고 컴포넌트
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold text-lg">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Layers className="h-4 w-4" />
      </div>
      <span>스타터킷</span>
    </Link>
  )
}
