'use client';   //このページでクライアントの状態を取得するから必要．これをつけない場合はサーバサイドで実行する

import { useState } from "react";

export default function NewPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
    const response = await fetch('/posts/api/', {   //ここのurlまじで注意
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title, content}),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message);
            }

            //投稿が成功した場合はタイトルと内容をリセット
            setTitle('');
            setContent('');
        } catch (err: Error | unknown) { //ここでerrはError型かstring型を想定
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        }finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button><a href="/">🟦ホームに戻る🟦</a></button>
            <h1>新規投稿</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">タイトル</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label htmlFor="content">内容</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit" disabled={loading}>
                        {loading ? '投稿中...' : '投稿する'}
                    </button>
                </div>
            </form>
        </div>
    )
}