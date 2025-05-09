import { NextResponse } from "next/server";
import { deletePost } from "@/api/operations";

export async function DELETE(request, { params }) {
  try {
    console.log(`DELETE /api/posts/${params.id} - Deleting post`);
    const result = await deletePost(params.id);
    console.log(`DELETE /api/posts/${params.id} - Result:`, result);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(`DELETE /api/posts/${params.id} - Error:`, error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to delete post"
      }, 
      { status: 500 }
    );
  }
}