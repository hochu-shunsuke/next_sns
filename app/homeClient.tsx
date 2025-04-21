// app/HomeClient.tsx
'use client';

import { useUser } from '@/lib/hooks/useUser';
import { supabase } from '@/lib/supabase';
import PostCard from "@/components/posts/PostCard";

export default function HomeClient({ posts }: { posts: any[] }) {
  const user = useUser();

  return (
    <main>
      <p>.</p>
      <p>.</p>
      {user?.email ? (
        <div>
          <button><a href="/posts/newpost">🟦ここから新規投稿🟦</a></button>
          <p>ようこそ、{user.email}さん！</p>
          <button onClick={() => supabase.auth.signOut()}>ログアウト</button>
        </div>
      ) : (
        <div>
          <p>ログインしてください。</p>
          <a href="/auth/login">ログイン</a>
          <a href="/auth/register">新規登録</a>
        </div>
      )}
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
  );
}
