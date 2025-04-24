import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    console.log('at api/route')
    try {
        const { content } = await request.json();
        
        if (!content) {
            return NextResponse.json(
                { message: "content is required from api/route" },
                { status: 400 }
            );
        }

        const cookieStore = cookies();
        const accessToken = (await cookieStore).get('sb-access-token')?.value;
        
        if (!accessToken) {
            return NextResponse.json(
                { message: "Unauthorized from api/route" },
                { status: 401 }
            );
        }

        // 投稿を作成
        const post = await createPost(content);

        return NextResponse.json(post, { status: 201 });

    } catch (err) {
        console.error('Error creating post:', err);
        return NextResponse.json(
            {
                message: err instanceof Error ? err.message : 'Failed to create post',
                error: err instanceof Error ? err.stack : null
            },
            { status: 500 }
        );
    }
}

export async function createPost(content: string) {
    console.log('Creating post...')
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