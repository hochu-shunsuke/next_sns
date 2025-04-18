import { ThemeSelector } from "@/components/theme-selector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-2xl font-bold">設定</h1>

        <Card className="mb-6 border-2">
          <CardHeader>
            <CardTitle>アピアランス</CardTitle>
            <CardDescription>アプリの見た目をカスタマイズします</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-medium">テーマ</h3>
                <ThemeSelector />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-2">
          <CardHeader>
            <CardTitle>アカウント設定</CardTitle>
            <CardDescription>アカウント情報を管理します</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>プロフィール編集</span>
                <span className="text-sm text-muted-foreground">→</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span>プライバシー設定</span>
                <span className="text-sm text-muted-foreground">→</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span>通知設定</span>
                <span className="text-sm text-muted-foreground">→</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
