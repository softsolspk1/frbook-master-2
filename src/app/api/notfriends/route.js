import { NextResponse } from "next/server";
import { getNotFriends } from "@/api/operations";

export async function GET() {
  try {
    console.log("GET /api/notfriends - Fetching non-friends");
    const notFriends = await getNotFriends();
    
    if (notFriends) {
      console.log(`GET /api/notfriends - Retrieved ${notFriends.length} non-friends`);
      return NextResponse.json(notFriends);
    } else {
      console.error("GET /api/notfriends - No non-friends returned");
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("GET /api/notfriends - Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch non-friends" },
      { status: 500 }
    );
  }
}