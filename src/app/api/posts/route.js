import { NextResponse } from "next/server";
import { getPosts, createPost } from "@/api/operations";

export async function GET() {
  try {
    console.log("GET /api/posts - Fetching posts");
    const posts = await getPosts();
    
    if (posts) {
      console.log(`GET /api/posts - Retrieved ${posts.length} posts`);
      return NextResponse.json(posts);
    } else {
      console.error("GET /api/posts - No posts returned");
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("GET /api/posts - Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    console.log("POST /api/posts - Creating post");
    const formData = await request.formData();
    
    const content = formData.get("content");
    const image = formData.get("image");
    const video = formData.get("video");

    if (!content && !image && !video) {
      console.error("POST /api/posts - No content provided");
      return NextResponse.json(
        { error: "Content, image, or video is required" },
        { status: 400 }
      );
    }

    const result = await createPost(content, image, video);
    console.log("POST /api/posts - Post created:", result);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("POST /api/posts - Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create post" },
      { status: 500 }
    );
  }
}