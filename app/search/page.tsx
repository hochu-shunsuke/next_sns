"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { UserListItem } from "@/components/user/user-list-item"
import { ThreadListItem } from "@/components/thread/thread-list-item"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // サンプルデータ
  const users = [
    {
      id: "1",
      name: "佐藤花子",
      username: "@sato_hanako",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "デザイナー | イラストレーター",
      isFollowing: false,
    },
    {
      id: "2",
      name: "鈴木一郎",
      username: "@suzuki_ichiro",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "エンジニア | React愛好家",
      isFollowing: true,
    },
    {
      id: "3",
      name: "高橋次郎",
      username: "@takahashi_jiro",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "マーケター | 読書好き",
      isFollowing: false,
    },
  ]

  const posts = [
    {
      id: "1",
      user_id: "user1",
      content: "新しいプロジェクトに取り組んでいます。Next.jsとTailwind CSSの組み合わせは最高です！",
      created_at: "2024-01-20T10:00:00Z"
    },
    {
      id: "2",
      user_id: "user2",
      content: "新しいカフェを見つけました。とても居心地が良くて、コーヒーも美味しかったです。おすすめです！",
      created_at: "2024-01-20T08:00:00Z"
    },
  ]

  const threads = [
    {
      id: "1",
      title: "Next.jsについて議論するスレッド",
      author: "田中太郎",
      replies: 24,
      lastActivity: "1時間前",
      tags: ["Next.js", "React", "フロントエンド"],
    },
    {
      id: "2",
      title: "Tailwind CSSのベストプラクティス",
      author: "佐藤花子",
      replies: 18,
      lastActivity: "3時間前",
      tags: ["CSS", "Tailwind", "デザイン"],
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 実際のアプリではここで検索APIを呼び出す
    console.log("検索クエリ:", searchQuery)
  }

  return (
      <div className="container mx-auto p-4">
        <Card className="mb-6 border">
          <CardHeader>
            <CardTitle>検索</CardTitle>
            <form onSubmit={handleSearch} className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="ユーザー、投稿、スレッドを検索..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </CardHeader>
        </Card>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="users" className="flex-1">
              ユーザー
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex-1">
              投稿
            </TabsTrigger>
            <TabsTrigger value="threads" className="flex-1">
              スレッド
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-4">
            <Card className="border">
              <CardContent className="p-0">
                <div className="divide-y">
                  {users.map((user) => (
                    <UserListItem key={user.id} user={user} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          
          <TabsContent value="threads" className="mt-4">
            <Card className="border">
              <CardContent className="p-0">
                <div className="divide-y">
                  {threads.map((thread) => (
                    <ThreadListItem key={thread.id} thread={thread} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}
