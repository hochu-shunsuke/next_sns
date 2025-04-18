"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { signUp } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const displayName = formData.get("displayName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const terms = formData.get("terms") === "on";

    if (!terms) {
      setError("利用規約に同意する必要があります");
      setIsLoading(false);
      return;
    }

    if (username.trim().length < 3) {
      setError("ユーザー名は3文字以上である必要があります");
      setIsLoading(false);
      return;
    }

    if (displayName.trim().length < 2) {
      setError("表示名は2文字以上である必要があります");
      setIsLoading(false);
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError("ユーザー名は英数字とアンダースコアのみ使用できます");
      setIsLoading(false);
      return;
    }

    try {
      await signUp(email, password, username, displayName);
      router.push("/");
    } catch (err: any) {
      setError(
        err.message.includes("already registered")
          ? "このメールアドレスはすでに登録されています"
          : err.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">アカウント登録</CardTitle>
        <CardDescription>新しいアカウントを作成してください</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              メールで登録
            </span>
          </div>
        </div>

        {error && <div className="text-sm text-destructive">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">ユーザー名</Label>
            <Input
              id="username"
              name="username"
              placeholder="tanaka_taro123"
              required
              pattern="^[a-zA-Z0-9_]+$"
              title="英数字とアンダースコアのみ使用できます"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="displayName">表示名</Label>
            <Input
              id="displayName"
              name="displayName"
              placeholder="田中太郎"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" name="terms" />
            <Label htmlFor="terms" className="text-sm">
              <Link href="/terms" className="text-primary hover:underline">
                利用規約
              </Link>
              に同意します
            </Label>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "登録中..." : "登録する"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-muted-foreground">
          すでにアカウントをお持ちですか？{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            ログイン
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
