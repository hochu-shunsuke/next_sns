import { getLatestPosts } from "@/lib/posts/getLatestPosts";
import PostCard from "@/components/PostCard"

export default async function PostsPage() {
    const posts = await getLatestPosts();

    return (
        <div>
            <h1>最新の投稿</h1>
            <div>
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}