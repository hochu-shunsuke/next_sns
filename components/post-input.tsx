"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

interface PostInputProps {
  onSuccess?: () => void;
}

export function PostInput({ onSuccess }: PostInputProps) {
  const [content, setContent] = useState("");
  const { user, isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Submitting post...");
      console.log("Auth state:", { user, isAuthenticated });
      console.log("Content:", content);


      setContent("");
      onSuccess?.();
      toast({
        title: "投稿を作成しました",
        description: "投稿が正常に作成されました。",
      });
    } catch (err) {
      console.error("Post submission error:", err);
      if (err instanceof Error) {
        toast({
          title: "エラー",
          description: err.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "エラー",
          description: "投稿の作成に失敗しました",
          variant: "destructive",
        });
      }
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="いまどうしてる？"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={500}
      />
    </form>
  );
}
