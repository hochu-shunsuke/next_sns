"use client";

import { useEffect, useState } from "react";
import { PostInput } from "@/components/post/post-input";
import { PostCard } from "@/components/post/post-card";
import { useAuth } from "@/hooks/use-auth";
import type { Post } from "@/types";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div className="p-4 text-center">ログインしてください</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
        {isAuthenticated && <PostInput />}
        <div className="space-y-4">
          投稿はまだありません
        </div>
    </div>
  );
}
