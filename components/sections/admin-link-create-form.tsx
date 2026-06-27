"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { CalendarIcon, Copy, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { linkCreateSchema, type LinkCreateFormValues } from "@/lib/validations"

// Notion 일지 목록 임시 타입 (실제 API 연동 시 대체)
interface NotionEntry {
  id: string
  title: string
}

// 임시 Notion 일지 목록 — 실제 구현 시 서버 컴포넌트에서 props로 전달
const MOCK_ENTRIES: NotionEntry[] = [
  { id: "entry-1", title: "2024년 1월 스터디 일지" },
  { id: "entry-2", title: "2024년 2월 스터디 일지" },
  { id: "entry-3", title: "2024년 3월 스터디 일지" },
]

// 링크 생성 폼 컴포넌트 (패스코드 인증 후 표시)
export function AdminLinkCreateForm() {
  // 생성된 공유 링크
  const [generatedLink, setGeneratedLink] = useState<string | null>(null)

  const form = useForm<LinkCreateFormValues>({
    resolver: zodResolver(linkCreateSchema),
    defaultValues: {
      notionEntryId: "",
      expiresAt: undefined,
    },
  })

  // 공유 링크 생성 처리 (실제 구현은 서버 액션으로 대체 예정)
  const onSubmit = async (values: LinkCreateFormValues) => {
    try {
      // TODO: 서버 액션으로 토큰 생성 및 링크 반환 구현
      console.log("링크 생성 요청:", values)
      const mockToken = crypto.randomUUID()
      const link = `${window.location.origin}/log/${mockToken}`
      setGeneratedLink(link)
      toast.success("공유 링크가 생성되었습니다")
    } catch {
      toast.error("링크 생성에 실패했습니다")
    }
  }

  // 링크 클립보드 복사
  const handleCopy = async () => {
    if (!generatedLink) return
    await navigator.clipboard.writeText(generatedLink)
    toast.success("링크가 복사되었습니다")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">공유 링크 생성</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Notion 일지 선택 */}
            <FormField
              control={form.control}
              name="notionEntryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>스터디 일지 선택</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="일지를 선택하세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MOCK_ENTRIES.map((entry) => (
                        <SelectItem key={entry.id} value={entry.id}>
                          {entry.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 만료일 선택 */}
            <FormField
              control={form.control}
              name="expiresAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>만료일</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "PPP", { locale: ko })
                            : "만료일을 선택하세요"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              링크 생성
            </Button>
          </form>
        </Form>

        {/* 생성된 링크 표시 */}
        {generatedLink && (
          <div className="rounded-md border bg-muted/50 p-3 space-y-2">
            <p className="text-xs text-muted-foreground font-medium">생성된 공유 링크</p>
            <div className="flex items-center gap-2">
              <p className="text-sm truncate flex-1 font-mono">{generatedLink}</p>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 h-8 w-8"
                onClick={handleCopy}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
