"use client"

import { useTheme } from "next-themes"
import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeSelector() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // hydration対策のためにマウント後にのみレンダリング
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" disabled className="w-24">
          <Sun className="mr-2 h-4 w-4" />
          ライト
        </Button>
        <Button variant="outline" size="sm" disabled className="w-24">
          <Moon className="mr-2 h-4 w-4" />
          ダーク
        </Button>
        <Button variant="outline" size="sm" disabled className="w-24">
          <Monitor className="mr-2 h-4 w-4" />
          自動
        </Button>
      </div>
    )
  }

  return (
    <div className="flex space-x-2">
      <Button
        variant={theme === "light" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("light")}
        className="w-24"
      >
        <Sun className="mr-2 h-4 w-4" />
        ライト
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("dark")}
        className="w-24"
      >
        <Moon className="mr-2 h-4 w-4" />
        ダーク
      </Button>
      <Button
        variant={theme === "system" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("system")}
        className="w-24"
      >
        <Monitor className="mr-2 h-4 w-4" />
        自動
      </Button>
    </div>
  )
}
