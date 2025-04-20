// app/page.tsx
import HomeClient from './homeClient';
import { getLatestPosts } from '@/lib/posts/getLatestPosts';

export default async function Home() {
  const posts = await getLatestPosts();

  return <HomeClient posts={posts} />;
}
