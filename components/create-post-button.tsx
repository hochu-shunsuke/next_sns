"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreatePostDialog } from "@/components/create-post-dialog";

export function CreatePostButton() {


  return (
    <>
      <Button

        className="w-full gap-2"
      >
        <Plus className="h-4 w-4" />
        投稿する
      </Button>
      <CreatePostDialog />
    </>
  );
}
