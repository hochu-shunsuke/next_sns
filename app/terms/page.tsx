import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
            <h1 className="mb-4 text-3xl font-bold">利用規約</h1>
            <p className="text-muted-foreground">最終更新日: 2024年4月14日</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. はじめに</h2>
            <p>
              本利用規約（以下「本規約」）は、SNS
              Appが提供するすべてのサービス（以下「本サービス」）の利用条件を定めるものです。ユーザーの皆様（以下「ユーザー」）は、本規約に同意の上、本サービスをご利用ください。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. アカウント登録</h2>
            <p>
              本サービスの利用にはアカウント登録が必要です。ユーザーは、正確かつ最新の情報を提供する責任があります。アカウント情報の管理はユーザー自身の責任で行ってください。
            </p>
            <p>
              ユーザーは、自分のアカウントの活動に責任を持ち、パスワードを安全に保管する義務があります。不正アクセスや不審な活動に気づいた場合は、直ちに当社に報告してください。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. 禁止事項</h2>
            <p>本サービスにおいて、以下の行為を禁止します：</p>
            <ul className="list-inside list-disc space-y-2 pl-4">
              <li>法令または公序良俗に違反する行為</li>
              <li>他のユーザーを誹謗中傷する行為</li>
              <li>差別的表現や暴力的表現を含むコンテンツの投稿</li>
              <li>他者のプライバシーを侵害する行為</li>
              <li>スパムや不正広告の投稿</li>
              <li>本サービスの運営を妨げる行為</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. コンテンツの権利</h2>
            <p>
              ユーザーが本サービス上で投稿したコンテンツ（テキスト、画像、動画など）の著作権はユーザーに帰属します。ただし、ユーザーは当社に対し、投稿コンテンツを本サービスの提供・改善・宣伝のために使用する権利を許諾するものとします。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. プライバシー</h2>
            <p>
              当社のプライバシーポリシーは、ユーザーの個人情報の収集、使用、開示に関する方針を定めています。本サービスを利用することにより、ユーザーはプライバシーポリシーに同意したものとみなされます。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. サービスの変更・終了</h2>
            <p>
              当社は、ユーザーに通知することなく、本サービスの内容を変更したり、提供を中止したりすることがあります。当社は、本サービスの変更・中止によってユーザーに生じた損害について一切の責任を負いません。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">7. 免責事項</h2>
            <p>
              本サービスは「現状有姿」で提供され、当社は明示または黙示を問わず、本サービスの完全性、正確性、信頼性、有用性等についていかなる保証も行いません。ユーザーは自己の責任において本サービスを利用するものとします。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">8. 規約の変更</h2>
            <p>
              当社は、必要に応じて本規約を変更することがあります。変更後の規約は、本サービス上で公表された時点から効力を生じるものとします。継続して本サービスを利用する場合、ユーザーは変更後の規約に同意したものとみなされます。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">9. 連絡先</h2>
            <p>本規約に関するお問い合わせは、以下の連絡先までお願いします：</p>
            <p>メール: support@snsapp.example.com</p>
          </section>
        </div>
      </div>
  )
}
