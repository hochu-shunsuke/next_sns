import { supabase } from "@/lib/supabase"

export async function createPost(title: string, content: string) {
    const { data, error } = await supabase
        .from('posts')  //postsテーブルに
        .insert([{ title, content,}])   //データを追加

    if (error) {
        throw new Error(error.message || 'Failed to create post');
    }

    return data;
}