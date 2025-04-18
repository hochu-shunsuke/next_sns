"use client"

import { PenSquare } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileCreatePostButton() {
  return (
    <button
      className={cn(
        "flex flex-col items-center rounded-md px-3 py-2 text-xs font-medium",
        "bg-primary text-primary-foreground",
      )}
    >
      <PenSquare className="mb-1 h-5 w-5" />
      <span>投稿</span>
    </button>
  )
}
