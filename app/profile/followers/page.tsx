import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { UserListItem } from "@/components/user/user-list-item"

export default function FollowersPage() {
  // サンプルデータ
  const followers = [
    {
      id: "1",
      name: "佐藤花子",
      username: "@sato_hanako",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "デザイナー | イラストレーター",
      isFollowing: true,
    },
    {
      id: "2",
      name: "鈴木一郎",
      username: "@suzuki_ichiro",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "エンジニア | React愛好家",
      isFollowing: false,
    },
    {
      id: "3",
      name: "高橋次郎",
      username: "@takahashi_jiro",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "マーケター | 読書好き",
      isFollowing: true,
    },
    {
      id: "4",
      name: "山田三郎",
      username: "@yamada_saburo",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "写真家 | 旅行好き",
      isFollowing: false,
    },
    {
      id: "5",
      name: "伊藤四郎",
      username: "@ito_shiro",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "料理人 | フードブロガー",
      isFollowing: true,
    },
  ]

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
            <CardTitle>フォロワー</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {followers.map((user) => (
                <UserListItem key={user.id} user={user} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
