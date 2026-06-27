import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileText, FileImage, FileCode } from "lucide-react"

const documents = [
  { id: 1, name: "서비스 이용약관.pdf", type: "PDF", size: "234 KB", author: "김철수", status: "게시됨", date: "2025-06-01" },
  { id: 2, name: "개인정보처리방침.pdf", type: "PDF", size: "187 KB", author: "이영희", status: "게시됨", date: "2025-06-01" },
  { id: 3, name: "API 문서 v2.md", type: "마크다운", size: "56 KB", author: "박민준", status: "초안", date: "2025-06-10" },
  { id: 4, name: "디자인 가이드라인.png", type: "이미지", size: "1.2 MB", author: "최수진", status: "게시됨", date: "2025-05-20" },
  { id: 5, name: "배포 절차.md", type: "마크다운", size: "23 KB", author: "정다은", status: "검토중", date: "2025-06-18" },
  { id: 6, name: "데이터베이스 스키마.sql", type: "코드", size: "45 KB", author: "한지훈", status: "게시됨", date: "2025-04-15" },
]

const typeIcon = (type: string) => {
  if (type === "이미지") return <FileImage className="h-4 w-4 text-blue-500" />
  if (type === "코드") return <FileCode className="h-4 w-4 text-green-500" />
  return <FileText className="h-4 w-4 text-orange-500" />
}

const statusVariant = (status: string): "default" | "secondary" | "outline" => {
  if (status === "게시됨") return "default"
  if (status === "검토중") return "outline"
  return "secondary"
}

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">문서</h1>
        <p className="text-muted-foreground">등록된 문서를 관리합니다.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">전체 문서</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">게시됨</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.filter((d) => d.status === "게시됨").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">초안 / 검토중</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.filter((d) => d.status !== "게시됨").length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>문서 목록</CardTitle>
          <CardDescription>업로드된 전체 문서 현황입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>파일명</TableHead>
                <TableHead>유형</TableHead>
                <TableHead>크기</TableHead>
                <TableHead>작성자</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">날짜</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {typeIcon(doc.type)}
                      {doc.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{doc.type}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{doc.size}</TableCell>
                  <TableCell>{doc.author}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(doc.status)}>{doc.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">{doc.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
