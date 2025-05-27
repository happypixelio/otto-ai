import { NextResponse } from "next/server";

export async function POST() {
  console.log("💡 Otto’s API is alive!");
  return NextResponse.json({ message: "Otto is listening!" });
}