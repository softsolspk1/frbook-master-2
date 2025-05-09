import { NextResponse } from "next/server";
import { getFriends } from "@/api/operations";

export async function GET() {
  try {
    console.log("GET /api/friends - Fetching friends");
    const friends = await getFriends();
    
    if (friends) {
      console.log(`GET /api/friends - Retrieved ${friends.length} friends`);
      return NextResponse.json(friends);
    } else {
      console.error("GET /api/friends - No friends returned");
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("GET /api/friends - Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch friends" },
      { status: 500 }
    );
  }
}