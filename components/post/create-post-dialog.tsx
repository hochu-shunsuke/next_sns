"use client";

import { PostInput } from "@/components/post/post-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";


export function CreatePostDialog({children}: {children: React.ReactNode}) {
  // childrenのうち最初の要素をtriggerに、残りをDialogContentに使う
  const trigger = React.Children.toArray(children)[0];
  const content = React.Children.toArray(children).slice(1);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新規投稿</DialogTitle>
          <DialogDescription>いまどうしてる？</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}