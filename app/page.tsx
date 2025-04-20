// app/page.tsx
import { getLatestPosts } from '@/lib/posts/getLatestPosts'
import PostCard from "@/components/posts/PostCard"

export default async function Home() {
    const posts = await getLatestPosts()

    return (
        <main>
            <button><a href="/posts/newpost">🟦ここから新規投稿🟦</a></button>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <h1>------------------投稿一覧------------------</h1>
            <p>--------最新の投稿から20件表示中--------</p>
            <ul>
                {posts.map(post => (
                <li key={post.id}>
                    <PostCard post={post} />
                </li>
            ))}
        </ul>
    </main>
    )
}
