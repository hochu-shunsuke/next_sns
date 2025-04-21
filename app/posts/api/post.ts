import { supabase } from "@/lib/supabase"

export async function createPost(content: string) {
    // 現在のユーザーのIDを取得
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
        throw new Error('ログインが必要です')
    }

    const { data, error } = await supabase
        .from('posts')
        .insert([{ user_id: user.id, content }])

    if (error) {
        throw new Error(error.message || 'Failed to create post')
    }

    return data
}