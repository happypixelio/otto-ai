import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "No message provided." },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: `Otto received: ${message}` });
  } catch {
    // We’re not using the error variable, so we avoid declaring it
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}