import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Clock } from "lucide-react"

interface ThreadItemProps {
  thread: {
    id: number
    title: string
    author: string
    replies: number
    lastActivity: string
    tags: string[]
  }
}

export function ThreadItem({ thread }: ThreadItemProps) {
  return (
    <Link href={`/threads/${thread.id}`} className="block hover:bg-muted/50">
      <div className="p-4">
        <h3 className="mb-1 font-medium">{thread.title}</h3>
        <div className="mb-2 flex flex-wrap gap-1">
          {thread.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>作成者: {thread.author}</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{thread.replies}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{thread.lastActivity}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
