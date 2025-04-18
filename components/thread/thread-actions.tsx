import { Button } from "@/components/ui/button"
import { Bookmark, Heart, MessageSquare, Share2 } from "lucide-react"

interface ThreadActionsProps {
  likes: number
  replies: number
  bookmarks: number
}

export function ThreadActions({ likes, replies, bookmarks }: ThreadActionsProps) {
  return (
    <div className="flex justify-between border-t pt-4">
      <div className="flex gap-4">
        <Button variant="ghost" size="sm" className="flex gap-1">
          <Heart className="h-4 w-4" />
          <span>{likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex gap-1">
          <MessageSquare className="h-4 w-4" />
          <span>{replies}</span>
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" className="flex gap-1">
          <Bookmark className="h-4 w-4" />
          <span>{bookmarks}</span>
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">シェア</span>
        </Button>
      </div>
    </div>
  )
}
