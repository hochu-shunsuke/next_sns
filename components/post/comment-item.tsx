"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface CommentItemProps {
  comment: {
    id: number
    author: string
    username: string
    avatar: string
    content: string
    timestamp: string
    likes: number
  }
}

export function CommentItem({ comment }: CommentItemProps) {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(comment.likes)

  const handleLike = () => {
    if (liked) {
      setLikesCount((prev) => prev - 1)
    } else {
      setLikesCount((prev) => prev + 1)
    }
    setLiked(!liked)
  }

  return (
    <div className="p-4">
      <div className="flex gap-3">
        <Link href={`/user/${comment.id}`}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
            <AvatarFallback>{comment.author[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
          <div className="flex items-center">
            <Link href={`/user/${comment.id}`}>
              <span className="font-medium hover:underline">{comment.author}</span>
            </Link>
            <span className="ml-2 text-xs text-muted-foreground">{comment.username}</span>
            <span className="ml-2 text-xs text-muted-foreground">・ {comment.timestamp}</span>
          </div>
          <p className="mt-1 text-sm">{comment.content}</p>
          <div className="mt-2">
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 px-2 text-xs ${liked ? "text-red-500" : ""}`}
              onClick={handleLike}
            >
              <Heart className={`mr-1 h-3 w-3 ${liked ? "fill-current" : ""}`} />
              {likesCount}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
