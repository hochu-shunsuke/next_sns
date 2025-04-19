import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThreadItem } from "@/components/thread/thread-item"

// サンプルデータ
const threads = [
  {
    id: 1,
    title: "Next.jsについて議論するスレッド",
    author: "田中太郎",
    replies: 24,
    lastActivity: "1時間前",
    tags: ["Next.js", "React", "フロントエンド"],
  },
  {
    id: 2,
    title: "Tailwind CSSのベストプラクティス",
    author: "佐藤花子",
    replies: 18,
    lastActivity: "3時間前",
    tags: ["CSS", "Tailwind", "デザイン"],
  },
  {
    id: 3,
    title: "TypeScriptの型システムについて",
    author: "鈴木一郎",
    replies: 32,
    lastActivity: "昨日",
    tags: ["TypeScript", "JavaScript", "プログラミング"],
  },
  {
    id: 4,
    title: "サーバーコンポーネントとクライアントコンポーネントの使い分け",
    author: "高橋次郎",
    replies: 15,
    lastActivity: "2日前",
    tags: ["React", "Next.js", "パフォーマンス"],
  },
]

export function ThreadList() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>人気のスレッド</CardTitle>
        <CardDescription>コミュニティで活発な議論が行われているスレッド</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {threads.map((thread) => (
            <ThreadItem key={thread.id} thread={thread} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
