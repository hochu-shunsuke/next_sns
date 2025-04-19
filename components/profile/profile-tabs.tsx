"use client"

import { PostCard } from "@/components/post/post-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Post {
  id: number
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  comments: number
}

interface ProfileTabsProps {
  posts: Post[]
}

export function ProfileTabs({ posts }: ProfileTabsProps) {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="posts" className="flex-1">
          投稿
        </TabsTrigger>
        <TabsTrigger value="replies" className="flex-1">
          返信
        </TabsTrigger>
        <TabsTrigger value="media" className="flex-1">
          メディア
        </TabsTrigger>
        <TabsTrigger value="likes" className="flex-1">
          いいね
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts" className="mt-4 space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </TabsContent>
      <TabsContent value="replies">
        <div className="mt-4 text-center text-muted-foreground">返信はまだありません</div>
      </TabsContent>
      <TabsContent value="media">
        <div className="mt-4 text-center text-muted-foreground">メディアはまだありません</div>
      </TabsContent>
      <TabsContent value="likes">
        <div className="mt-4 text-center text-muted-foreground">いいねした投稿はまだありません</div>
      </TabsContent>
    </Tabs>
  )
}
