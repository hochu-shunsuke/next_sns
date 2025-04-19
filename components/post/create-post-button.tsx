"use client";

// create-post-button.tsx
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreatePostDialog } from "@/components/post/create-post-dialog";

export function CreatePostButton() {
  return (
    <CreatePostDialog>
      <Button className="w-full gap-2">
        <Plus className="h-4 w-4" />
        投稿する
      </Button>
      {/* 投稿フォームなどをここに入れる */}
    </CreatePostDialog>
  );
}