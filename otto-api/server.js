import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const portfolioData = {
  bio: `Daniel is a self-taught multidisciplinary Product and UX/UI Designer with experience in Finance, Insurance, Public Sector, and SaaS.`,
  projects: [
    {
      title: "NorthStandard Product Suite",
      summary: "Led the creation of the VDS (Voyage Design System), unifying components across digital products.",
      url: "http://otto.danielsydney.com/northstandard"
    },
    {
      title: "Natterbox SMS Mobile App",
      summary: "Adapted logic from the SMS Web Dashboard to update UI on the Freedom Mobile App.",
      url: "http://otto.danielsydney.com/natterbox-mobile-app/"
    },
    // Add other projects here...
  ]
};

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided." });
  }

  const systemPrompt = `
You are Otto, Daniel Sydney’s helpful AI assistant. Respond with confidence, wit, and helpfulness.
Projects:
${portfolioData.projects.map(p => `- ${p.title}: ${p.summary} (Link: ${p.url})`).join("\n")}
CV: [View Daniel’s CV](https://otto.danielsydney.com/wp-content/uploads/2025/01/Daniel-Lynval-Sydney-CV-2025)
Bio: ${portfolioData.bio}
  `;

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7
    });

    const reply = chatResponse.choices[0]?.message?.content || "Otto is speechless.";
    res.json({ message: reply });

  } catch (error) {
    console.error("🔥 GPT error:", error);
    res.status(500).json({ error: "GPT call failed." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Otto is listening on port ${PORT}`);
});
