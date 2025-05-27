import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("📨 Otto received request:", req.method); // <- This makes `req` “used”
  return NextResponse.json({ message: "✅ Otto is alive (flat route)!" });
}