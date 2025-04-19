import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { ThreadHeader } from "@/components/thread/thread-header"
import { ThreadActions } from "@/components/thread/thread-actions"
import { ReplyForm } from "@/components/thread/reply-form"
import { ThreadReply } from "@/components/thread/thread-reply"

export default function ThreadDetailPage({ params }: { params: { id: string } }) {
  const threadId = params.id

  // サンプルデータ - 実際のアプリではAPIから取得
  const thread = {
    id: Number(threadId),
    title: "Next.jsについて議論するスレッド",
    content:
      "Next.jsの最新バージョンについて議論しましょう。App RouterとPages Routerの違いや、サーバーコンポーネントの利点について意見を共有したいと思います。皆さんはどのような経験や知見をお持ちですか？",
    author: {
      name: "田中太郎",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2024年4月10日",
    tags: ["Next.js", "React", "フロントエンド"],
    likes: 42,
    bookmarks: 15,
    views: 230,
    replies: [
      {
        id: 1,
        author: {
          name: "佐藤花子",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content:
          "App Routerは最初は学習曲線が急でしたが、慣れると非常に便利です。特にサーバーコンポーネントを使うことでパフォーマンスが向上しました。",
        createdAt: "2時間前",
        likes: 12,
      },
      {
        id: 2,
        author: {
          name: "鈴木一郎",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content:
          "私はまだPages Routerを使っています。移行するメリットはありますが、既存のプロジェクトでは互換性の問題があって難しいですね。",
        createdAt: "昨日",
        likes: 8,
      },
      {
        id: 3,
        author: {
          name: "高橋次郎",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content:
          "サーバーコンポーネントの最大の利点はクライアントへのJavaScriptの削減だと思います。特に大規模なアプリケーションでは効果が顕著です。",
        createdAt: "2日前",
        likes: 15,
      },
    ],
  }

  return (
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <Link
            href="/threads"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            スレッド一覧に戻る
          </Link>
        </div>

        <Card className="mb-6 border">
          <CardHeader>
            <ThreadHeader thread={thread} />
            <CardTitle className="mt-2 text-xl">{thread.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{thread.content}</p>
          </CardContent>
          <CardFooter>
            <ThreadActions likes={thread.likes} replies={thread.replies.length} bookmarks={thread.bookmarks} />
          </CardFooter>
        </Card>

        <Card className="mb-6 border">
          <CardHeader>
            <CardTitle className="text-lg">返信を投稿</CardTitle>
          </CardHeader>
          <CardContent>
            <ReplyForm />
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader>
            <CardTitle className="text-lg">返信 ({thread.replies.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {thread.replies.map((reply) => (
                <ThreadReply key={reply.id} reply={reply} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
