"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import { ShareDialog } from "@/components/share-dialog"

interface Post {
  id: number
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  comments: number
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes)
  const [bookmarked, setBookmarked] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikesCount((prev) => prev - 1)
    } else {
      setLikesCount((prev) => prev + 1)
    }
    setLiked(!liked)
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  return (
    <>
      <Card className="border">
        <CardHeader className="flex flex-row items-start gap-3 space-y-0 p-3 pb-1">
          <Link href={`/user/1`}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
              <AvatarFallback>{post.author[0]}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="space-y-0.5">
            <Link href={`/user/1`}>
              <h3 className="text-sm font-semibold hover:underline">{post.author}</h3>
            </Link>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-1">
          <p className="text-sm">{post.content}</p>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-2">
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 flex gap-1 px-2 ${liked ? "text-red-500" : ""}`}
            onClick={handleLike}
          >
            <Heart className={`h-3.5 w-3.5 ${liked ? "fill-current" : ""}`} />
            <span className="text-xs">{likesCount}</span>
          </Button>
          <Link href={`/post/${post.id}`}>
            <Button variant="ghost" size="sm" className="h-8 flex gap-1 px-2">
              <MessageCircle className="h-3.5 w-3.5" />
              <span className="text-xs">{post.comments}</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 px-2 ${bookmarked ? "text-primary" : ""}`}
            onClick={handleBookmark}
          >
            <Bookmark className={`h-3.5 w-3.5 ${bookmarked ? "fill-current" : ""}`} />
            <span className="sr-only">ブックマーク</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => setIsShareOpen(true)}>
            <Share2 className="h-3.5 w-3.5" />
            <span className="sr-only">シェア</span>
          </Button>
        </CardFooter>
      </Card>

      <ShareDialog isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} postId={post.id} />
    </>
  )
}
