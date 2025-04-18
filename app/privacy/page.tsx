import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
      <div className="container mx-auto max-w-3xl py-8">
        <div className="mb-6 flex items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              ホームに戻る
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="mb-4 text-3xl font-bold">プライバシーポリシー</h1>
            <p className="text-muted-foreground">最終更新日: 2024年4月14日</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. はじめに</h2>
            <p>
              SNS
              App（以下「当社」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。本プライバシーポリシーは、当社のサービス利用時に収集される情報とその使用方法について説明します。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. 収集する情報</h2>
            <p>当社は、以下の情報を収集することがあります：</p>
            <ul className="list-inside list-disc space-y-2 pl-4">
              <li>
                <strong>アカウント情報</strong>：名前、メールアドレス、パスワード、プロフィール写真などの登録情報
              </li>
              <li>
                <strong>コンテンツ</strong>：投稿、コメント、メッセージなどのユーザーが作成したコンテンツ
              </li>
              <li>
                <strong>利用データ</strong>：IPアドレス、ブラウザの種類、アクセス日時、閲覧したページなどの利用状況
              </li>
              <li>
                <strong>位置情報</strong>：ユーザーが許可した場合の位置情報
              </li>
              <li>
                <strong>デバイス情報</strong>：使用しているデバイスの種類、OSのバージョンなど
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. 情報の使用目的</h2>
            <p>収集した情報は、以下の目的で使用されます：</p>
            <ul className="list-inside list-disc space-y-2 pl-4">
              <li>サービスの提供と改善</li>
              <li>ユーザー認証とアカウント管理</li>
              <li>カスタマイズされたコンテンツの提供</li>
              <li>サービスに関する通知の送信</li>
              <li>不正行為の防止とセキュリティの確保</li>
              <li>法的義務の遵守</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. 情報の共有</h2>
            <p>当社は、以下の場合を除き、ユーザーの個人情報を第三者と共有することはありません：</p>
            <ul className="list-inside list-disc space-y-2 pl-4">
              <li>ユーザーの同意がある場合</li>
              <li>サービス提供に必要な協力会社（データ処理業者など）との共有</li>
              <li>法的要請に応じる必要がある場合</li>
              <li>当社の権利や財産を保護する必要がある場合</li>
              <li>緊急事態においてユーザーや公共の安全を守る必要がある場合</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. セキュリティ</h2>
            <p>
              当社は、ユーザーの個人情報を保護するために適切な技術的・組織的措置を講じています。ただし、インターネット上での完全なセキュリティを保証することはできません。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. ユーザーの権利</h2>
            <p>ユーザーには以下の権利があります：</p>
            <ul className="list-inside list-disc space-y-2 pl-4">
              <li>個人情報へのアクセス</li>
              <li>個人情報の訂正</li>
              <li>個人情報の削除</li>
              <li>データポータビリティ（自分のデータを取得する権利）</li>
              <li>処理の制限</li>
              <li>異議申し立て</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">7. Cookieの使用</h2>
            <p>
              当社のサービスでは、ユーザー体験の向上やサービスの改善のためにCookieを使用しています。ブラウザの設定でCookieを無効にすることも可能ですが、一部の機能が正常に動作しなくなる可能性があります。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">8. ポリシーの変更</h2>
            <p>
              当社は、必要に応じて本プライバシーポリシーを変更することがあります。重要な変更がある場合は、サービス上で通知します。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">9. お問い合わせ</h2>
            <p>プライバシーに関するご質問やご懸念がある場合は、以下の連絡先までお問い合わせください：</p>
            <p>メール: privacy@snsapp.example.com</p>
          </section>
        </div>
      </div>
  )
}
