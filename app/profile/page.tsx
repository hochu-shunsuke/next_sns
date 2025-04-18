import { Card } from "@/components/ui/card"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"

export default function ProfilePage() {
  // サンプルデータ
  const userProfile = {
    name: "田中太郎",
    username: "@tanaka_taro",
    avatar: "/placeholder.svg?height=120&width=120",
    bio: "Next.js開発者 | Webデザイン愛好家 | 東京在住",
    location: "東京, 日本",
    website: "https://hochu-portfolio.vercel.app",
    joinedDate: "2020年4月に参加",
    following: 284,
    followers: 529,
  }

  const posts = [
    {
      id: 1,
      author: "田中太郎",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "新しいプロジェクトに取り組んでいます。Next.jsとTailwind CSSの組み合わせは最高です！",
      timestamp: "2時間前",
      likes: 24,
      comments: 5,
    },
    {
      id: 2,
      author: "田中太郎",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "今日は素晴らしい一日でした！新しいアイデアがたくさん浮かびました。",
      timestamp: "昨日",
      likes: 42,
      comments: 8,
    },
    {
      id: 3,
      author: "田中太郎",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "週末は技術書を読んで過ごしました。おすすめの本があれば教えてください！",
      timestamp: "3日前",
      likes: 15,
      comments: 3,
    },
  ]

  return (
      <div className="container mx-auto p-4">
        <Card className="mb-4 overflow-hidden border">
          <ProfileHeader profile={userProfile} />
        </Card>

        <ProfileTabs posts={posts} />
      </div>
  )
}
