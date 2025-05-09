import { NextResponse } from "next/server";
import { getComments, addComment } from "@/api/operations";

export async function GET(request, { params }) {
  try {
    console.log(`GET /api/posts/${params.id}/comments - Fetching comments`);
    const comments = await getComments(params.id);
    
    if (comments) {
      console.log(`GET /api/posts/${params.id}/comments - Retrieved ${comments.length} comments`);
      return NextResponse.json(comments);
    } else {
      console.error(`GET /api/posts/${params.id}/comments - No comments returned`);
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error(`GET /api/posts/${params.id}/comments - Error:`, error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    console.log(`POST /api/posts/${params.id}/comments - Adding comment`);
    const { content } = await request.json();
    
    if (!content) {
      console.error(`POST /api/posts/${params.id}/comments - No content provided`);
      return NextResponse.json(
        { error: "Comment content is required" },
        { status: 400 }
      );
    }

    const result = await addComment(params.id, content);
    console.log(`POST /api/posts/${params.id}/comments - Comment added:`, result);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(`POST /api/posts/${params.id}/comments - Error:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to add comment" },
      { status: 500 }
    );
  }
}