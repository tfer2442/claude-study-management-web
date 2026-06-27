"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  passcodeSchema,
  linkCreateSchema,
  type PasscodeFormValues,
  type LinkCreateFormValues,
} from "@/lib/validations"
import { AdminLinkCreateForm } from "@/components/sections/admin-link-create-form"

// 어드민 패스코드 인증 → 링크 생성 폼 (2단계 UI)
export function AdminPasscodeForm() {
  // 패스코드 인증 완료 여부
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const form = useForm<PasscodeFormValues>({
    resolver: zodResolver(passcodeSchema),
    defaultValues: { passcode: "" },
  })

  // 패스코드 검증 처리 (실제 검증은 서버 액션 또는 API Route로 구현 예정)
  const onSubmit = async (values: PasscodeFormValues) => {
    try {
      // TODO: 서버 액션으로 패스코드 검증 구현
      console.log("패스코드 검증:", values.passcode)
      toast.success("인증되었습니다")
      setIsAuthenticated(true)
    } catch {
      toast.error("패스코드가 올바르지 않습니다")
    }
  }

  // 인증 완료 후 링크 생성 폼 표시
  if (isAuthenticated) {
    return <AdminLinkCreateForm />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">패스코드 입력</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="passcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>패스코드</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="패스코드를 입력하세요"
                      {...field}
                    />
                  </FormControl>
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
              확인
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
