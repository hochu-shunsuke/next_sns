import { NextResponse } from "next/server";
import { createPost } from "@/app/posts/api/post";

export async function POST(request: Request) {
    try {
        const { content } = await request.json();
        
        if (!content) {
            return NextResponse.json(
                { message: "content is required" },
                { status: 400 }
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