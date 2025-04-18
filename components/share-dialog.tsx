"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Copy, Facebook, Twitter } from "lucide-react"
import { useState } from "react"

interface ShareDialogProps {
  isOpen: boolean
  onClose: () => void
  postId: number
}

export function ShareDialog({ isOpen, onClose, postId }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = `https://snsapp.example.com/post/${postId}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: string) => {
    let shareLink = ""

    switch (platform) {
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`
        break
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      default:
        return
    }

    window.open(shareLink, "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>投稿をシェア</DialogTitle>
          <DialogDescription>この投稿を他のプラットフォームでシェアします</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Input value={shareUrl} readOnly className="w-full" />
          </div>
          <Button size="sm" variant="outline" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
            <span className="sr-only">コピー</span>
          </Button>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <Button variant="outline" size="lg" className="flex-1" onClick={() => handleShare("twitter")}>
            <Twitter className="mr-2 h-4 w-4" />
            Twitter
          </Button>
          <Button variant="outline" size="lg" className="flex-1" onClick={() => handleShare("facebook")}>
            <Facebook className="mr-2 h-4 w-4" />
            Facebook
          </Button>
        </div>
        <DialogFooter className="mt-4">
          {copied && <span className="text-sm text-green-500">URLをコピーしました！</span>}
          <Button variant="outline" onClick={onClose}>
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
