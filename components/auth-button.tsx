"use client"

import { Button } from "@/components/ui/button"
import { LogIn, LogOut, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

export function AuthButton() {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (isAuthenticated && user) {
    const displayName = user.user_metadata?.display_name || "ユーザー";
    const username = user.user_metadata?.username || user.email;
    const avatarUrl = user.user_metadata?.avatar_url || "/placeholder-user.jpg";
    const initial = displayName?.[0] || "U";

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <p className="truncate text-sm font-medium">{displayName}</p>
            <p className="truncate text-xs text-muted-foreground">{username}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              アカウント
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/profile">プロフィール</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">設定</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              ログアウト
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <Link href="/auth/login" className="w-full">
      <Button variant="outline" className="w-full justify-start">
        <LogIn className="mr-2 h-4 w-4" />
        ログイン / 登録
      </Button>
    </Link>
  )
}
