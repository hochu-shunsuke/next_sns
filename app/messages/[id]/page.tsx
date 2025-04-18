"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, MoreHorizontal, Paperclip, Send, Smile } from "lucide-react"
import { useRouter } from "next/navigation"

interface Message {
  id: number
  text: string
  time: string
  sender: "me" | "other"
}

export default function ConversationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const conversationId = params.id

  // サンプルデータ
  const conversation = {
    id: Number.parseInt(conversationId),
    user: {
      name: "佐藤花子",
      avatar: "/placeholder.svg?height=40&width=40",
      online: true,
    },
    messages: [
      {
        id: 1,
        text: "こんにちは！明日の打ち合わせについて確認したいことがあります。",
        time: "10:30",
        sender: "other",
      },
      {
        id: 2,
        text: "こんにちは！もちろん、何でも聞いてください。",
        time: "10:32",
        sender: "me",
      },
      {
        id: 3,
        text: "打ち合わせの時間は何時からでしたか？資料は事前に準備しておいた方がいいですか？",
        time: "10:33",
        sender: "other",
      },
      {
        id: 4,
        text: "打ち合わせは14時からです。はい、可能であれば事前に資料を準備しておいてください。プロジェクトの概要と現在の進捗状況について話し合う予定です。",
        time: "10:35",
        sender: "me",
      },
      {
        id: 5,
        text: "わかりました。資料を準備しておきます。他に必要なものはありますか？",
        time: "10:36",
        sender: "other",
      },
    ] as Message[],
  }

  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // 実際のアプリではここでメッセージ送信処理を行う
      console.log("メッセージを送信:", newMessage)
      setNewMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
      <div className="container mx-auto p-4">
        <Card className="flex h-[calc(100vh-12rem)] flex-col border-2">
          <CardHeader className="flex flex-row items-center gap-3 p-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
              <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-sm font-medium">{conversation.user.name}</h3>
              <p className="text-xs text-muted-foreground">{conversation.user.online ? "オンライン" : "オフライン"}</p>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-3">
            <div className="flex flex-col gap-3">
              {conversation.messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="mt-1 text-right text-xs opacity-70">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          <div className="border-t p-3">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="メッセージを入力..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button variant="ghost" size="icon" className="shrink-0">
                <Smile className="h-5 w-5" />
              </Button>
              <Button size="icon" className="shrink-0" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
  )
}
