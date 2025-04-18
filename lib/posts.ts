import { supabase } from './supabase';
import type { Database } from '@/types/supabase';

export type Post = Database['public']['Tables']['posts']['Row'];
export type PostInsert = Database['public']['Tables']['posts']['Insert'];
export type PostWithAuthor = Post & {
  author: {
    id: string;
    username: string;
    display_name: string;
    avatar_url: string | null;
  };
  isLiked: boolean;
  isBookmarked: boolean;
};

export type TimelineItem = Database['public']['Views']['timeline']['Row'] & {
  author?: {
    id: string;
    username: string;
    display_name: string;
    avatar_url: string | null;
  };
  isLiked?: boolean;
  isBookmarked?: boolean;
};

/**
 * 新規投稿を作成する
 */
export async function createPost(post: Omit<PostInsert, 'id' | 'created_at' | 'likes_count' | 'replies_count'>) {
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

/**
 * 投稿を更新する
 */
export async function updatePost(id: string, content: string, image_url: string | null) {
  const { data, error } = await supabase
    .from('posts')
    .update({ content, image_url })
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

/**
 * 投稿を削除する
 */
export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

/**
 * タイムラインを取得する
 */
export async function getTimeline(page = 1, limit = 10) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('認証が必要です');

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data: timeline, error } = await supabase
    .from('timeline')
    .select('*, author:users!posts_user_id_fkey(id, username, display_name, avatar_url)')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  // いいね状態を取得
  const { data: likes } = await supabase
    .from('likes')
    .select('target_id')
    .eq('user_id', user.id)
    .eq('target_type', 'post')
    .in('target_id', timeline.map(item => item.id || ''));

  // ブックマーク状態を取得
  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('post_id')
    .eq('user_id', user.id)
    .in('post_id', timeline.map(item => item.id || ''));

  // 投稿にいいね・ブックマーク状態を追加
  const enhancedTimeline = timeline.map(post => ({
    ...post,
    isLiked: likes?.some(like => like.target_id === post.id) || false,
    isBookmarked: bookmarks?.some(bookmark => bookmark.post_id === post.id) || false
  }));

  return enhancedTimeline;
}

/**
 * 1つの投稿を取得する
 */
export async function getPost(id: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data: post, error } = await supabase
    .from('posts')
    .select('*, author:users!posts_user_id_fkey(id, username, display_name, avatar_url)')
    .eq('id', id)
    .single();

  if (error) throw error;

  // ログインしている場合はいいねとブックマーク状態を取得
  let isLiked = false;
  let isBookmarked = false;

  if (user) {
    const { data: like } = await supabase
      .from('likes')
      .select('*')
      .eq('user_id', user.id)
      .eq('target_id', id)
      .eq('target_type', 'post')
      .maybeSingle();

    const { data: bookmark } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .eq('post_id', id)
      .maybeSingle();

    isLiked = !!like;
    isBookmarked = !!bookmark;
  }

  return {
    ...post,
    isLiked,
    isBookmarked
  };
}

/**
 * ユーザーの投稿一覧を取得する
 */
export async function getUserPosts(userId: string, page = 1, limit = 10) {
  const { data: { user } } = await supabase.auth.getUser();
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, author:users!posts_user_id_fkey(id, username, display_name, avatar_url)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  // ログインしている場合はいいねとブックマーク状態を取得
  if (user) {
    // いいね状態を取得
    const { data: likes } = await supabase
      .from('likes')
      .select('target_id')
      .eq('user_id', user.id)
      .eq('target_type', 'post')
      .in('target_id', posts.map(post => post.id));

    // ブックマーク状態を取得
    const { data: bookmarks } = await supabase
      .from('bookmarks')
      .select('post_id')
      .eq('user_id', user.id)
      .in('post_id', posts.map(post => post.id));

    // 投稿にいいね・ブックマーク状態を追加
    return posts.map(post => ({
      ...post,
      isLiked: likes?.some(like => like.target_id === post.id) || false,
      isBookmarked: bookmarks?.some(bookmark => bookmark.post_id === post.id) || false
    }));
  }

  // 未ログインの場合
  return posts.map(post => ({
    ...post,
    isLiked: false,
    isBookmarked: false
  }));
}

/**
 * 投稿にいいねする/いいねを取り消す
 */
export async function toggleLike(postId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('認証が必要です');

  // 現在のいいね状態を確認
  const { data: existingLike } = await supabase
    .from('likes')
    .select('*')
    .eq('user_id', user.id)
    .eq('target_id', postId)
    .eq('target_type', 'post')
    .maybeSingle();

  if (existingLike) {
    // いいねを削除
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', user.id)
      .eq('target_id', postId)
      .eq('target_type', 'post');

    if (error) throw error;

    // いいねカウントを更新
    await supabase.rpc('decrement_post_likes', { post_id: postId });
    
    return false; // いいね解除
  } else {
    // いいねを追加
    const { error } = await supabase
      .from('likes')
      .insert({
        user_id: user.id,
        target_id: postId,
        target_type: 'post'
      });

    if (error) throw error;

    // いいねカウントを更新
    await supabase.rpc('increment_post_likes', { post_id: postId });
    
    return true; // いいね追加
  }
}

/**
 * 投稿をブックマークする/ブックマークを取り消す
 */
export async function toggleBookmark(postId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('認証が必要です');

  // 現在のブックマーク状態を確認
  const { data: existingBookmark } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user.id)
    .eq('post_id', postId)
    .maybeSingle();

  if (existingBookmark) {
    // ブックマークを削除
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', user.id)
      .eq('post_id', postId);

    if (error) throw error;
    return false; // ブックマーク解除
  } else {
    // ブックマークを追加
    const { error } = await supabase
      .from('bookmarks')
      .insert({
        user_id: user.id,
        post_id: postId
      });

    if (error) throw error;
    return true; // ブックマーク追加
  }
}

/**
 * ブックマークした投稿を取得する
 */
export async function getBookmarkedPosts(page = 1, limit = 10) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('認証が必要です');

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from('bookmarks')
    .select('post_id, posts:post_id(*, author:users!posts_user_id_fkey(id, username, display_name, avatar_url))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  // 投稿データを整形
  const posts = data.map(item => ({
    ...item.posts,
    isBookmarked: true,
    isLiked: false // デフォルト値として設定
  }));

  // いいね状態を取得
  const { data: likes } = await supabase
    .from('likes')
    .select('target_id')
    .eq('user_id', user.id)
    .eq('target_type', 'post')
    .in('target_id', posts.map(post => post.id));

  // いいね状態を追加
  return posts.map(post => ({
    ...post,
    isLiked: likes?.some(like => like.target_id === post.id) || false
  }));
}