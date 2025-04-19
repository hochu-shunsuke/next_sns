"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { createPost } from "@/lib/posts";
import { useAuth } from "@/hooks/use-auth";
import { Camera, X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface PostFormProps {
  replyToId?: string;
  placeholder?: string;
  onSuccess?: () => void;
}

export function PostForm({ 
  replyToId,
  placeholder = "いまどうしてる？",
  onSuccess 
}: PostFormProps) {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 画像サイズチェック (5MB以下)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "エラー",
        description: "画像サイズは5MB以下にしてください",
        variant: "destructive",
      });
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() && !image) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      let imageUrl = null;
      
      // 画像のアップロード処理
      if (image) {
        const fileName = `${Date.now()}-${image.name}`;
        const { data, error } = await supabase.storage
          .from("post-images")
          .upload(fileName, image);
          
        if (error) throw error;
        
        // 公開URLを取得
        const { data: { publicUrl } } = supabase.storage
          .from("post-images")
          .getPublicUrl(fileName);
          
        imageUrl = publicUrl;
      }

      // 投稿作成
      await createPost({
        user_id: user!.id,
        content: content.trim(),
        image_url: imageUrl,
        reply_to_id: replyToId || null,
      });

      // フォームリセット
      setContent("");
      setImage(null);
      setImagePreview(null);
      
      // 成功通知
      toast({
        title: "投稿しました",
        description: "投稿が正常に作成されました",
      });
      
      // 成功コールバック
      if (onSuccess) {
        onSuccess();
      } else {
        router.refresh();
      }
    } catch (error: any) {
      toast({
        title: "エラー",
        description: error.message || "投稿に失敗しました",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="p-4 text-center border rounded-lg">
        投稿するには<Button variant="link" onClick={() => router.push('/auth/login')}>ログイン</Button>が必要です
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 border-b">
      <div className="flex gap-3">
        ここにアバターとかユーザ情報を表示する
        <div className="flex-1">
          <Textarea
            placeholder={placeholder}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
          />
          
          {imagePreview && (
            <div className="relative mt-2 overflow-hidden rounded-lg">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="object-cover w-full max-h-80" 
              />
              <Button
                size="icon"
                variant="secondary"
                className="absolute p-1 bg-black/50 hover:bg-black/70 text-white top-2 right-2"
                onClick={handleImageRemove}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="w-5 h-5" />
          </Button>
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={(!content.trim() && !image) || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              送信中...
            </>
          ) : (
            "投稿する"
          )}
        </Button>
      </div>
    </div>
  );
}