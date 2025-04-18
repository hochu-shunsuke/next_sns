import Link from "next/link"
import { cn } from "@/lib/utils"

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t bg-background py-2 text-center text-xs text-muted-foreground", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-1">
          <p>© 2024 SNS App. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/terms" className="hover:text-foreground hover:underline">
              利用規約
            </Link>
            <Link href="/privacy" className="hover:text-foreground hover:underline">
              プライバシーポリシー
            </Link>
            <Link href="/contact" className="hover:text-foreground hover:underline">
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
