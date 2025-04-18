import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ThreadHeaderProps {
  thread: {
    title: string
    author: {
      name: string
      avatar: string
    }
    createdAt: string
    tags: string[]
  }
}

export function ThreadHeader({ thread }: ThreadHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src={thread.author.avatar || "/placeholder.svg"} alt={thread.author.name} />
          <AvatarFallback>{thread.author.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{thread.author.name}</p>
          <p className="text-xs text-muted-foreground">{thread.createdAt}</p>
        </div>
      </div>
      <div className="flex gap-1">
        {thread.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}
