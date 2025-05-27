import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("✅ Otto's chat route hit");
  return NextResponse.json({ message: "💬 Otto is alive (nested route working)" });
}