"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, Bookmark, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { ShareDialog } from "@/components/post/share-dialog"
import { PostHeader } from "@/components/post/post-header"
import { PostContent } from "@/components/post/post-content"
import { CommentItem } from "@/components/post/comment-item"

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const postId = Number(params.id)
  const [comment, setComment] = useState("")
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(24)
  const [bookmarked, setBookmarked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // サンプルデータ - 実際のアプリではAPIから取得
  const post = {
    id: postId,
    author: "田中太郎",
    username: "@tanaka_taro",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "新しいプロジェクトに取り組んでいます。Next.jsとTailwind CSSの組み合わせは最高です！",
    timestamp: "2時間前",
    likes: 24,
    comments: [
      {
        id: 1,
        author: "佐藤花子",
        username: "@sato_hanako",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "素晴らしいですね！どのような機能を実装していますか？",
        timestamp: "1時間前",
        likes: 5,
      },
      {
        id: 2,
        author: "鈴木一郎",
        username: "@suzuki_ichiro",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "私もNext.jsとTailwindを使っています。とても開発効率が上がりますよね！",
        timestamp: "30分前",
        likes: 3,
      },
    ],
  }

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

  const handleSubmitComment = () => {
    if (comment.trim()) {
      setIsSubmitting(true)
      // 実際のアプリではAPIを呼び出してコメントを保存
      console.log("コメント送信:", comment)

      // 送信成功を模擬
      setTimeout(() => {
        setComment("")
        setIsSubmitting(false)
      }, 500)
    }
  }

  return (
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-4 w-4" />
            ホームに戻る
          </Link>
        </div>

        <Card className="mb-6 border">
          <CardHeader className="flex flex-row items-start gap-3 space-y-0 p-4">
            <PostHeader author={post.author} avatar={post.avatar} timestamp={post.timestamp} />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <PostContent content={post.content} />
          </CardContent>
          <CardFooter className="flex justify-between border-t p-3">
            <Button
              variant="ghost"
              size="sm"
              className={`flex gap-1 ${liked ? "text-red-500" : ""}`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              <span>{likesCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments.length}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`${bookmarked ? "text-primary" : ""}`}
              onClick={handleBookmark}
            >
              <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsShareOpen(true)}>
              <Share2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="mb-6 border">
          <CardHeader className="p-4 pb-0">
            <h3 className="text-lg font-medium">コメントを追加</h3>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="ユーザー" />
                <AvatarFallback>ユ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="コメントを入力..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mb-2 resize-none"
                  rows={2}
                />
                <div className="flex justify-end">
                  <Button size="sm" onClick={handleSubmitComment} disabled={!comment.trim() || isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        送信中...
                      </>
                    ) : (
                      "コメントする"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader className="p-4 pb-2">
            <h3 className="text-lg font-medium">コメント ({post.comments.length})</h3>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {post.comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          </CardContent>
        </Card>

        <ShareDialog isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} postId={postId} />
      </div>
  )
}
