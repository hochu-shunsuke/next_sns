import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function MessagesPage() {
  // サンプルデータ
  const conversations = [
    {
      id: 1,
      user: {
        name: "佐藤花子",
        avatar: "/placeholder.svg?height=40&width=40",
        online: true,
      },
      lastMessage: {
        text: "明日の打ち合わせについて確認したいことがあります。",
        time: "10分前",
        unread: true,
      },
    },
    {
      id: 2,
      user: {
        name: "鈴木一郎",
        avatar: "/placeholder.svg?height=40&width=40",
        online: false,
      },
      lastMessage: {
        text: "プロジェクトの進捗はどうですか？",
        time: "2時間前",
        unread: false,
      },
    },
    {
      id: 3,
      user: {
        name: "高橋次郎",
        avatar: "/placeholder.svg?height=40&width=40",
        online: true,
      },
      lastMessage: {
        text: "資料を送りました。確認お願いします。",
        time: "昨日",
        unread: false,
      },
    },
    {
      id: 4,
      user: {
        name: "山田三郎",
        avatar: "/placeholder.svg?height=40&width=40",
        online: false,
      },
      lastMessage: {
        text: "週末のイベントに参加できますか？",
        time: "2日前",
        unread: false,
      },
    },
  ]

  return (
      <div className="container mx-auto p-4">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>メッセージ</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="メッセージを検索..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {conversations.map((conversation) => (
                <Link key={conversation.id} href={`/messages/${conversation.id}`} className="block hover:bg-muted/50">
                  <div className="flex items-start gap-3 p-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage
                          src={conversation.user.avatar || "/placeholder.svg"}
                          alt={conversation.user.name}
                        />
                        <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                      </Avatar>
                      {conversation.user.online && (
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background"></span>
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{conversation.user.name}</h3>
                        <span className="text-xs text-muted-foreground">{conversation.lastMessage.time}</span>
                      </div>
                      <p
                        className={`truncate text-sm ${
                          conversation.lastMessage.unread ? "font-medium" : "text-muted-foreground"
                        }`}
                      >
                        {conversation.lastMessage.text}
                      </p>
                    </div>
                    {conversation.lastMessage.unread && <div className="ml-2 h-2 w-2 rounded-full bg-primary"></div>}
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
