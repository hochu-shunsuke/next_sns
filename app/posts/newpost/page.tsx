'use client';   //このページでクライアントの状態を取得するから必要．これをつけない場合はサーバサイドで実行する

import { useState } from "react";
import { useUser } from '@/lib/hooks/useUser';

export default function NewPost() {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const user = useUser();

    // ユーザーがログインしていない場合
    if (!user?.id) {
        return (
            <div>
                <p>ログインが必要です</p>
                <a href="/auth/login">ログインページへ</a>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/posts/api/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({content}),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message);
            }

            //投稿が成功した場合は内容をリセット
            setContent('');
        } catch (err) {
            setError(err instanceof Error ? err.message : '投稿に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button><a href="/">🟦ホームに戻る🟦</a></button>
            <h1>新規投稿</h1>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-red-500">{error}</p>}
                <div>
                    <label htmlFor="content">内容</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? '投稿中...' : '投稿する'}
                </button>
            </form>
        </div>
    )
}