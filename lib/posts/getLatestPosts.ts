import { supabase } from "@/lib/supabase"

// ここはuseClientを指定ないのでサーバサイドで実行される。
// ここにポストの選定アルゴリズムを書く

export async function getLatestPosts() {
    // postsテーブルからデータを取得
    const { data: posts, error: postsError } = await supabase
        .from("posts")
        .select(`
            id,
            content,
            created_at,
            likes_count,
            comments_count,
            user_id
        `)
        .order("created_at", { ascending: false })
        .limit(20)

    if (postsError) throw new Error(postsError.message)

    // user_idを使ってprofilesテーブルから関連情報を取得
    const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select(`
            id,
            display_name,
            username,
            icon_color
        `)
        .in("id", posts.map(post => post.user_id))

    if (profilesError) throw new Error(profilesError.message)

    // postsにprofiles情報を追加
    return posts.map(post => {
        const profile = profiles.find(p => p.id === post.user_id)
        return {
            ...post,
            profile: profile || {}
        }
    })
}
