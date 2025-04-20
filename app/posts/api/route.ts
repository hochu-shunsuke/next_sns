import { NextResponse } from "next/server";
import { createPost } from "@/app/posts/api/post";

export async function POST(request: Request) {
    try {
        const { title, content } = await request.json();
        
        if (!title || !content) {
            return NextResponse.json(
                { message: "title and content are required" },
                { status: 400 }
            );
        }

        // 投稿を作成
        const post = await createPost(title, content);

        return NextResponse.json(post, { status: 201 });

    } catch (error) {

        console.error('Error creating post:', error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}