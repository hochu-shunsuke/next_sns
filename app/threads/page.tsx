import { ThreadList } from "@/components/thread/thread-list"

export default function ThreadsPage() {
  return (

      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-2xl font-bold">スレッド</h1>
        <ThreadList />
      </div>

  )
}
