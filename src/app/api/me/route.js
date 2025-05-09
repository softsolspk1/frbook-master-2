import { NextResponse } from "next/server";
import { updateMe, me } from "@/api/operations";

export async function GET() {
  try {
    console.log("GET /api/me - Fetching user data");
    const userData = await me();

    if (userData) {
      console.log("GET /api/me - User data retrieved successfully:", userData);
      return NextResponse.json(userData);
    } else {
      console.error("GET /api/me - No user data returned");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
  } catch (error) {
    console.error("GET /api/me - Error fetching user data:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    console.log("POST /api/me - Updating user profile");
    const { profile_pic } = await request.json();
    const { success, message } = await updateMe(profile_pic);

    if (success) {
      console.log("POST /api/me - Profile updated successfully");
      return NextResponse.json({ success: true }, { status: 200 });
    }

    console.error("POST /api/me - Failed to update profile:", message);
    return NextResponse.json({ success: false, message }, { status: 400 });
  } catch (error) {
    console.error("POST /api/me - Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}