"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { Heart, MessageCircle, Bookmark, Share, MoreHorizontal } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { toggleLike, toggleBookmark, deletePost } from "@/lib/posts";
import type { PostWithAuthor } from "@/lib/posts";

interface PostCardProps {
  post: PostWithAuthor;
  onDelete?: () => void;
}

export function PostCard({ post, onDelete }: PostCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes_count);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [isDeleting, setIsDeleting] = useState(false);

  const formattedDate = post.created_at 
    ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ja })
    : "";

  const handleLikeToggle = async () => {
    if (!user) {
      toast({
        title: "ログインが必要です",
        description: "いいねするにはログインしてください",
      });
      return;
    }

    try {
      const newLiked = await toggleLike(post.id);
      setIsLiked(newLiked);
      setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
    } catch (error) {
      toast({
        title: "エラー",
        description: "いいねの処理に失敗しました",
        variant: "destructive",
      });
    }
  };

  const handleBookmarkToggle = async () => {
    if (!user) {
      toast({
        title: "ログインが必要です",
        description: "ブックマークするにはログインしてください",
      });
      return;
    }

    try {
      const newBookmarked = await toggleBookmark(post.id);
      setIsBookmarked(newBookmarked);
    } catch (error) {
      toast({
        title: "エラー",
        description: "ブックマークの処理に失敗しました",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!user || user.id !== post.user_id) return;
    
    if (window.confirm("この投稿を削除しますか？")) {
      setIsDeleting(true);
      try {
        await deletePost(post.id);
        toast({
          title: "投稿を削除しました",
        });
        if (onDelete) onDelete();
      } catch (error) {
        toast({
          title: "エラー",
          description: "投稿の削除に失敗しました",
          variant: "destructive",
        });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/posts/${post.id}`);
      toast({
        title: "リンクをコピーしました",
      });
    } catch (error) {
      toast({
        title: "エラー",
        description: "リンクのコピーに失敗しました",
        variant: "destructive",
      });
    }
  };

  const isOwner = user?.id === post.user_id;

  return (
    <div className="p-4 border-b hover:bg-muted/20 transition-colors">
      <div className="flex gap-3">
        <Link href={`/profile/${post.author?.username}`}>
          <Avatar 
            src={post.author?.avatar_url || undefined} 
            fallback={(post.author?.display_name?.[0] || "U").toUpperCase()} 
            className="w-10 h-10"
          />
        </Link>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 mb-1 text-sm">
              <Link href={`/profile/${post.author?.username}`} className="font-semibold hover:underline truncate">
                {post.author?.display_name}
              </Link>
              <span className="text-muted-foreground">@{post.author?.username}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{formattedDate}</span>
            </div>
            
            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled={isDeleting} onClick={handleDelete}>
                    {isDeleting ? "削除中..." : "削除"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          
          <Link href={`/posts/${post.id}`}>
            <div className="mb-3 break-words">{post.content}</div>
            
            {post.image_url && (
              <div className="mt-2 mb-3 overflow-hidden rounded-lg">
                <img 
                  src={post.image_url} 
                  alt="Post image" 
                  className="object-cover w-full max-h-96" 
                />
              </div>
            )}
          </Link>
          
          <div className="flex justify-between max-w-md mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              asChild
            >
              <Link href={`/posts/${post.id}`}>
                <MessageCircle className="w-4 h-4 mr-1" />
                <span>{post.replies_count || 0}</span>
              </Link>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className={`hover:bg-red-500/10 ${
                isLiked 
                  ? "text-red-500 hover:text-red-600" 
                  : "text-muted-foreground hover:text-red-500"
              }`}
              onClick={handleLikeToggle}
            >
              <Heart className={`w-4 h-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
              <span>{likeCount || 0}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className={`hover:bg-blue-500/10 ${
                isBookmarked 
                  ? "text-blue-500 hover:text-blue-600" 
                  : "text-muted-foreground hover:text-blue-500"
              }`}
              onClick={handleBookmarkToggle}
            >
              <Bookmark className={`w-4 h-4 mr-1 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              onClick={handleShare}
            >
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}