"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">예기치 않은 오류가 발생했습니다</h2>
      <p className="text-sm text-muted-foreground">잠시 후 다시 시도해주세요.</p>
      <Button onClick={reset} variant="outline">
        다시 시도
      </Button>
    </div>
  )
}
