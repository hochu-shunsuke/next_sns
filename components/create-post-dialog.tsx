"use client";

import { PostInput } from "@/components/post-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function CreatePostDialog() {

  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新規投稿</DialogTitle>
          <DialogDescription>
            いまどうしてる？
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
