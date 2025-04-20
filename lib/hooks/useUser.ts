import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useUser = () => {
  const [user, setUser] = useState<any>(null); // 本番なら型をつけたい

  useEffect(() => {
    // 非同期関数としてセッション取得
    const getUserSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };

    getUserSession(); // 初回呼び出し

    // セッション変更を監視
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return user;
};
