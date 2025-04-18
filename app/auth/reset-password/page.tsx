"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // フォームデータの取得
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string

    try {
      // 実際のアプリではここでパスワードリセットAPIを呼び出す
      console.log("パスワードリセット:", { email })

      // 送信成功を模擬（実際のアプリではAPIレスポンスに基づく）
      setTimeout(() => {
        setIsSubmitted(true)
        setIsLoading(false)
      }, 1000)
    } catch (err) {
      setError("パスワードリセットリンクの送信に失敗しました。メールアドレスを確認してください。")
      setIsLoading(false)
    }
  }

  return (
    <Card className="border">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">パスワードをリセット</CardTitle>
        <CardDescription>
          {isSubmitted
            ? "パスワードリセットのリンクをメールで送信しました"
            : "メールアドレスを入力してパスワードリセットリンクを取得してください"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isSubmitted ? (
          <>
            {error && <div className="text-sm text-destructive">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input id="email" name="email" type="email" placeholder="name@example.com" required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "送信中..." : "リセットリンクを送信"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center text-sm">
            <p className="mb-4">パスワードリセットのリンクをメールで送信しました。メールをご確認ください。</p>
            <p>メールが届かない場合は、迷惑メールフォルダをご確認いただくか、別のメールアドレスでお試しください。</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/auth/login" className="flex items-center text-sm text-primary hover:underline">
          <ArrowLeft className="mr-1 h-4 w-4" />
          ログインに戻る
        </Link>
      </CardFooter>
    </Card>
  )
}
