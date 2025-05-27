import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("✅ Otto flat route triggered");
  return NextResponse.json({ message: "Otto is alive (flat version)!" });
}