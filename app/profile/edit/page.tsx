"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { ProfileFormSection } from "@/components/profile/profile-form-section"
import { ProfileImageUpload } from "@/components/profile/profile-image-upload"

export default function ProfileEditPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "田中太郎",
    username: "@tanaka_taro",
    bio: "Next.js開発者 | Webデザイン愛好家 | 東京在住",
    location: "東京, 日本",
    website: "https://example.com",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // エラーをクリア
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "名前は必須です"
    }

    if (!formData.username.trim()) {
      newErrors.username = "ユーザー名は必須です"
    } else if (!formData.username.startsWith("@")) {
      newErrors.username = "ユーザー名は@で始める必要があります"
    }

    if (formData.website && !formData.website.startsWith("http")) {
      newErrors.website = "URLはhttpまたはhttpsで始める必要があります"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setSuccessMessage("")

    // 実際のアプリではここでAPIを呼び出してプロフィールを更新
    console.log("プロフィール更新:", formData)

    // 更新成功を模擬
    setTimeout(() => {
      setIsLoading(false)
      setSuccessMessage("プロフィールを更新しました")

      // 2秒後にプロフィールページに戻る
      setTimeout(() => {
        router.push("/profile")
      }, 2000)
    }, 1000)
  }

  return (
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <Link
            href="/profile"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            プロフィールに戻る
          </Link>
        </div>

        <Card className="border">
          <CardHeader>
            <CardTitle>プロフィール編集</CardTitle>
            <CardDescription>プロフィール情報を更新します</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {successMessage && (
                <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                  <div className="flex">
                    <div className="flex-1 text-sm text-green-700 dark:text-green-400">{successMessage}</div>
                  </div>
                </div>
              )}

              <ProfileImageUpload currentImage="/placeholder.svg?height=96&width=96" userName={formData.name} />

              <ProfileFormSection label="基本情報" description="あなたの基本的なプロフィール情報">
                <div className="space-y-2">
                  <Label htmlFor="name">名前</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">ユーザー名</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={errors.username ? "border-destructive" : ""}
                  />
                  {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
                </div>
              </ProfileFormSection>

              <ProfileFormSection label="自己紹介" description="あなた自身について他のユーザーに伝えましょう">
                <div className="space-y-2">
                  <Label htmlFor="bio">自己紹介</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    placeholder="あなた自身について書いてください"
                  />
                  <p className="text-xs text-muted-foreground">最大160文字</p>
                </div>
              </ProfileFormSection>

              <ProfileFormSection label="追加情報" description="あなたの場所やウェブサイトなどの追加情報">
                <div className="space-y-2">
                  <Label htmlFor="location">場所</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="例: 東京, 日本"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">ウェブサイト</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="例: https://example.com"
                    className={errors.website ? "border-destructive" : ""}
                  />
                  {errors.website && <p className="text-xs text-destructive">{errors.website}</p>}
                </div>
              </ProfileFormSection>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.push("/profile")}>
                キャンセル
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    更新中...
                  </>
                ) : (
                  "保存する"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
  )
}
