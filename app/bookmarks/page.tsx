import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PostCard } from "@/components/post/post-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThreadListItem } from "@/components/thread/thread-list-item"

export default function BookmarksPage() {
  // サンプルデータ
  const posts = [
    {
      id: "1",
      user_id: "user1",
      content: "新しいプロジェクトに取り組んでいます。Next.jsとTailwind CSSの組み合わせは最高です！",
      created_at: new Date().toISOString()
    },
    {
      id: "2",
      user_id: "user2",
      content: "新しいカフェを見つけました。とても居心地が良くて、コーヒーも美味しかったです。おすすめです！",
      created_at: new Date().toISOString()
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

  return (
      <div className="container mx-auto p-4">
        <Card className="mb-6 border">
          <CardHeader>
            <CardTitle>ブックマーク</CardTitle>
          </CardHeader>
        </Card>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="posts" className="flex-1">
              投稿
            </TabsTrigger>
            <TabsTrigger value="threads" className="flex-1">
              スレッド
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-4 space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
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
