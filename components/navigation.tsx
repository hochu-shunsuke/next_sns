"use client"
import { usePathname } from "next/navigation"
import { Home, User, Settings, MessageCircle, Hash, Search, Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { CreatePostButton } from "@/components/create-post-button"
import { NavItem } from "@/components/nav-item"
import { AuthButton } from "@/components/auth-button"
import { useAuth } from "@/hooks/use-auth"
import { MobileCreatePostButton } from "@/components/mobile-create-post-button"

export function Navigation() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const { isAuthenticated, user } = useAuth()

  // ナビゲーション項目を定義
  const navItems = [
    { name: "ホーム", href: "/", icon: Home },
    { name: "検索", href: "/search", icon: Search },
    { name: "スレッド", href: "/threads", icon: Hash },
    { name: "メッセージ", href: "/messages", icon: MessageCircle },
    { name: "ブックマーク", href: "/bookmarks", icon: Bookmark },
    { name: "プロフィール", href: "/profile", icon: User },
    { name: "設定", href: "/settings", icon: Settings },
  ]

  // モバイル用のナビゲーション項目
  const mobileNavItems = [
    { name: "ホーム", href: "/", icon: Home },
    { name: "検索", href: "/search", icon: Search },
    { name: "プロフィール", href: "/profile", icon: User },
    { name: "メッセージ", href: "/messages", icon: MessageCircle },
    { name: "設定", href: "/settings", icon: Settings },
  ]

  const displayedItems = isMobile ? mobileNavItems : navItems

  return (
    <nav
      className={cn(
        "bg-background",
        isMobile ? "fixed bottom-0 left-0 z-10 w-full border-t py-2" : "w-64 border-r p-4",
      )}
    >
      <div className={cn("flex", isMobile ? "justify-around" : "flex-col")}>
        {/* ナビゲーション項目 */}
        <div className={cn("flex", isMobile ? "justify-around w-full" : "flex-col space-y-2")}>
          {displayedItems.map((item) => (
            <NavItem key={item.name} item={item} isActive={pathname === item.href} isMobile={isMobile} />
          ))}

          {/* モバイル表示時の投稿ボタン */}
          {isMobile && <MobileCreatePostButton />}
        </div>

        {/* 投稿ボタン - PCのみ表示 */}
        {!isMobile && (
          <div className="mt-6">
            <CreatePostButton />
          </div>
        )}

        {/* 認証ボタン - PCのみ表示 */}
        {!isMobile && (
          <div className="mt-auto pt-6">
            <AuthButton />
          </div>
        )}
      </div>
    </nav>
  )
}
