// 어드민 라우트 그룹 레이아웃 — 중앙 정렬 카드 형태
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      {children}
    </div>
  )
}
