"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface FollowButtonProps {
  userId: string
  initialIsFollowing: boolean
  size?: "default" | "sm" | "lg"
}

export function FollowButton({ userId, initialIsFollowing, size = "sm" }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleFollow = async () => {
    setIsLoading(true)

    // 実際のアプリではここでAPIを呼び出してフォロー状態を更新
    console.log(`ユーザー ${userId} の${isFollowing ? "フォロー解除" : "フォロー"}`)

    // 更新成功を模擬
    setTimeout(() => {
      setIsFollowing(!isFollowing)
      setIsLoading(false)
    }, 500)
  }

  return (
    <Button variant={isFollowing ? "outline" : "default"} size={size} onClick={handleToggleFollow} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          {isFollowing ? "解除中..." : "フォロー中..."}
        </>
      ) : isFollowing ? (
        "フォロー中"
      ) : (
        "フォローする"
      )}
    </Button>
  )
}
