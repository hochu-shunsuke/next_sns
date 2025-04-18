"use client";

import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Post } from "@/types";
import Link from "next/link";
import Image from "next/image";

export function PostCard({ post }: { post: Post }) {
  return (
    <Card>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start gap-3">
          <Link href={`/user/1`}>
            <Avatar>
              <AvatarImage src={"/placeholder.svg"} alt={"User"} />
              <AvatarFallback>{"わわわ"[0]}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <Link
                href={`/user/1`}
                className="font-semibold hover:underline"
              >
                わわわ
              </Link>
              <span className="text-sm text-muted-foreground">
                @wawawa
              </span>
            </div>
            <time className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.created_at), {
                addSuffix: true,
                locale: ja,
              })}
            </time>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <p className="whitespace-pre-wrap">{post.content}</p>
          {post.image_url && (
            <div className="relative aspect-video">
              <Image
                src={post.image_url}
                alt="投稿画像"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
