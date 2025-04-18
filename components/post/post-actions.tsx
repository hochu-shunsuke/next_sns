"use client"

import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PostActionsProps {
  postId: number
  liked: boolean
  likesCount: number
  commentsCount: number
  bookmarked: boolean
  onLike: () => void
  onBookmark: () => void
  onShare: () => void
}

export function PostActions({
  postId,
  liked,
  likesCount,
  commentsCount,
  bookmarked,
  onLike,
  onBookmark,
  onShare,
}: PostActionsProps) {
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 flex gap-1 px-2 ${liked ? "text-red-500" : ""}`}
        onClick={onLike}
      >
        <Heart className={`h-3.5 w-3.5 ${liked ? "fill-current" : ""}`} />
        <span className="text-xs">{likesCount}</span>
      </Button>
      <Link href={`/post/${postId}`}>
        <Button variant="ghost" size="sm" className="h-8 flex gap-1 px-2">
          <MessageCircle className="h-3.5 w-3.5" />
          <span className="text-xs">{commentsCount}</span>
        </Button>
      </Link>
      <Button variant="ghost" size="sm" className={`h-8 px-2 ${bookmarked ? "text-primary" : ""}`} onClick={onBookmark}>
        <Bookmark className={`h-3.5 w-3.5 ${bookmarked ? "fill-current" : ""}`} />
        <span className="sr-only">ブックマーク</span>
      </Button>
      <Button variant="ghost" size="sm" className="h-8 px-2" onClick={onShare}>
        <Share2 className="h-3.5 w-3.5" />
        <span className="sr-only">シェア</span>
      </Button>
    </>
  )
}
