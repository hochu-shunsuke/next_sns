"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function ReplyForm() {
  const [replyContent, setReplyContent] = useState("")

  const handleSubmitReply = () => {
    if (replyContent.trim()) {
      // 実際のアプリではAPIを呼び出して返信を保存
      console.log("返信を送信:", replyContent)
      setReplyContent("")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="ユーザー" />
          <AvatarFallback>ユ</AvatarFallback>
        </Avatar>
        <Textarea
          placeholder="このスレッドに返信..."
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          className="flex-1 resize-none"
          rows={3}
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSubmitReply} disabled={!replyContent.trim()}>
          返信する
        </Button>
      </div>
    </div>
  )
}
