'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Register() {
    const [username, setUsername] = useState('');
    const [display_name, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {

            //ユーザー名の正規表現チェック(半角英数字とアンダースコアのみ)
            const usernameRegex = /^[a-zA-Z0-9_]+$/;
            if (!usernameRegex.test(username)) {
                throw new Error('ユーザー名は半角英数字とアンダースコアのみ使用できます');
            }

            //新規ユーザ認証
            //supabase.authはemailとpasswordのみ受け付けるので，その他はprofilesテーブルに追加する
            const {data, error: signUpError} = await supabase.auth.signUp({
                email,
                password,
            });

            if (signUpError) throw signUpError;

            //その他はprofilesテーブルに追加
            const {error: profileError} = await supabase.from('profiles').insert({
                id: data.user?.id,
                username,
                display_name,
            });

            if (profileError) throw profileError;

            //登録成功時
            window.location.href = '/auth/login'; //ログインページにリダイレクト
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
            setUsername('');
            setDisplayName('');
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div>
        <h1>ユーザー登録</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="username">ユーザー名</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            </div>
            <div>
            <label htmlFor="display_name">表示名</label>
            <input
                type="text"
                id="display_name"
                value={display_name}
                onChange={(e) => setDisplayName(e.target.value)}
                required
            />
            </div>
            <div>
            <label htmlFor="email">メールアドレス</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div>
            <label htmlFor="password">パスワード</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <button type="submit" disabled={loading}>
            {loading ? '登録中...' : '登録'}
            </button>
        </form>
        </div>
    );
}