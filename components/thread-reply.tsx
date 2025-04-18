import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface ThreadReplyProps {
  reply: {
    id: number
    author: {
      name: string
      avatar: string
    }
    content: string
    createdAt: string
    likes: number
  }
}

export function ThreadReply({ reply }: ThreadReplyProps) {
  return (
    <div className="p-4">
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
          <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{reply.author.name}</p>
              <p className="text-xs text-muted-foreground">{reply.createdAt}</p>
            </div>
          </div>
          <p className="mt-2 text-sm">{reply.content}</p>
          <div className="mt-2">
            <Button variant="ghost" size="sm" className="h-8 flex gap-1 px-2">
              <Heart className="h-3.5 w-3.5" />
              <span className="text-xs">{reply.likes}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
