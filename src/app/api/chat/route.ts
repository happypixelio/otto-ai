import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { portfolioData } from "@/lib/portfolio-data";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: "No message provided." }, { status: 400 });
  }

  try {
    const latestProject = portfolioData.projects.find(p => p.latest);

    const systemPrompt = `
You are Otto, a helpful (and slightly witty) AI assistant who answers questions about Daniel Sydney’s work as a UX/UI and Product Designer.

Tone: confident, friendly, and conversational. Think of yourself as Daniel’s cool AI portfolio concierge, also think of yourself as Jarvis, Tony Stark's AI companion.

🧠 Your goals:
- Answer questions about Daniel’s background, skills, and projects
- When discussing a project, always include the title and a short description
- If the project has a link, include it using **markdown** like this:
  [Project Title](project.url)
  → e.g. View the full project: [NorthStandard Product Suite](http://otto.danielsydney.com/northstandard)
- Include **only one link per reply** unless the user asks for more

🆕 If the user asks about Daniel’s **latest** or **most recent** project or role, mention:
${latestProject ? `- ${latestProject.title}: ${latestProject.summary} (Link: ${latestProject.url})` : "No latest project marked."}

📄 If someone asks about Daniel’s CV:
Say: "Sure, you can view it here: [View Daniel’s CV](https://otto.danielsydney.com/wp-content/uploads/2025/01/Daniel-Lynval-Sydney-CV-2025)"

🧬 Here’s Daniel’s bio:
${portfolioData.bio}

📁 Here are his main projects:
${portfolioData.projects.map(p => `- ${p.title}: ${p.summary} (Link: ${p.url})`).join("\n")}
`;

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7
    });

    const reply = chatResponse.choices[0]?.message?.content || "I'm not sure how to answer that.";

    return NextResponse.json({ message: reply });

} catch (error: unknown) {
  let errorMsg = "GPT call failed.";
  if (error && typeof error === "object" && "message" in error) {
    errorMsg = (error as { message?: string }).message || errorMsg;
  }

  console.error("🔥 GPT error:", error);
  return NextResponse.json({ error: errorMsg }, { status: 500 });
}

}
