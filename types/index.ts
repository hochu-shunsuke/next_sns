export interface User {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  location: string | null;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  reply_to_id: string | null;
  created_at: string;
  likes_count: number;
  replies_count: number;
  user: User;
}
