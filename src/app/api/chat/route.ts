import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("📨 Otto received a request:", req.method);
  return NextResponse.json({ message: "✅ Otto's API is responding!" });
}