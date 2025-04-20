import { supabase } from "@/lib/supabase"

//ここはuseClientを指定ないのでサーバサイドで実行される．
//ここにポストの選定アルゴリズムを書く

export async function getLatestPosts() {
    const {data, error} = await supabase
    .from("posts")
    .select("*")    //全カラム取得
    .order("created_at", { ascending: false })  //created_atで降順
    .limit(20)

    if (error) throw new Error(error.message)
    return data
}