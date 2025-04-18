import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface ThreadListItemProps {
  thread: {
    id: string
    title: string
    author: string
    replies: number
    lastActivity: string
    tags: string[]
  }
}

export function ThreadListItem({ thread }: ThreadListItemProps) {
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
            <span>返信: {thread.replies}</span>
            <span>最終更新: {thread.lastActivity}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
