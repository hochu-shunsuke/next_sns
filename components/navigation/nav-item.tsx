"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface NavItemProps {
  item: {
    name: string
    href: string
    icon: LucideIcon
  }
  isActive: boolean
  isMobile: boolean
}

export function NavItem({ item, isActive, isMobile }: NavItemProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center rounded-md text-sm font-medium transition-colors",
        isMobile ? "flex-col px-3 py-2 text-xs" : "space-x-2 px-3 py-2",
        isActive ? (isMobile ? "text-primary" : "bg-primary text-primary-foreground") : "hover:bg-muted",
      )}
    >
      <item.icon className={cn("h-5 w-5", isMobile && "mb-1")} />
      {!isMobile && <span>{item.name}</span>}
      {isMobile && <span>{item.name}</span>}
    </Link>
  )
}
