import { Card } from "@/components/ui/card"
import { UserProfileHeader } from "@/components/profile/user-profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const userId = params.id



  // サンプルデータ - 実際のアプリではAPIから取得
  const userProfile = {
    id: userId,
    name: "佐藤花子",
    username: "@sato_hanako",
    avatar: "/placeholder.svg?height=120&width=120",
    bio: "デザイナー | イラストレーター | 東京在住",
    location: "東京, 日本",
    website: "https://example.com",
    joinedDate: "2021年6月に参加",
    following: 184,
    followers: 329,
    isFollowing: true,
  }

  const posts = [
    {
      id: 1,
      author: "佐藤花子",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "新しいデザインのアイデアが浮かびました。近日中に共有します！",
      timestamp: "3時間前",
      likes: 32,
      comments: 7,
    },
    {
      id: 2,
      author: "佐藤花子",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "今日は素晴らしい展示会に行ってきました。とても刺激を受けました！",
      timestamp: "昨日",
      likes: 48,
      comments: 12,
    },
    {
      id: 3,
      author: "佐藤花子",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "新しいイラストを完成させました。フィードバックお待ちしています！",
      timestamp: "3日前",
      likes: 65,
      comments: 18,
    },
  ]

  return (
      <div className="container mx-auto p-4">
        <Card className="mb-4 overflow-hidden border">
          <UserProfileHeader profile={userProfile} />
        </Card>

        <ProfileTabs posts={posts} />
      </div>
  )
}
