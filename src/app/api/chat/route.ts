import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'No message provided.' },
        { status: 400 }
      );
    }

    // Replace this with real AI logic later
    return NextResponse.json({ message: `🤖 Otto received: "${message}"` });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}