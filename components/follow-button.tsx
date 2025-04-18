"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface FollowButtonProps {
  userId: string
  initialIsFollowing: boolean
}

export function FollowButton({ userId, initialIsFollowing }: FollowButtonProps) {
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
    <Button variant={isFollowing ? "outline" : "default"} size="sm" onClick={handleToggleFollow} disabled={isLoading}>
      {isFollowing ? "フォロー中" : "フォローする"}
    </Button>
  )
}
