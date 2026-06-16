import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("Waring: GEMINI_API_KEY is not defined in environment variables.");
}

// Chat API Route
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!ai) {
      // Fallback response when API key is missing
      return res.json({
        text: "Hey habibi! I'm DirhamBuddy, your friendly finance helper, but I'm currently running in demo mode because my brains (the Gemini API key) aren't plugged in yet! Let's get that resolved in your Secrets page. Meanwhile, you can still play with the pre-configured UAE profiles and dispute letter generator!"
      });
    }

    const systemInstruction = `You are "DirhamBuddy", an empathetic, witty financial helper and chat mentor for UAE Gen-Z and low-to-middle-class residents who want to get smart about their money.

Your Tonality Rules:
- Cleo AI-inspired peer tone. Encouraging, a bit checky/witty, non-academic, conversational, and direct. You are a clever companion, not an accountant in a necktie.
- Use friendly, localized slang and colloquial UAE vibe elements where appropriate (e.g., comparing inflation to "Karak tea rising from 1 AED to 2.50 AED", "the noon or Talabat orders creeping up", "shawarma math", "habibi", "habibti").
- Avoid dense walls of numbers or rigid academic financial jargon.
- When saving or retirement is mentioned, remember that "45% of UAE residents haven't started saving for retirement yet!" Frame saving, building an emergency fund, or investing into gamified, bite-sized daily challenges (e.g., "Skip one single Talabat item today and challenge yourself to put 25 AED in your high-yield savings account. That's a week of Karak tea secured!").
- Translate jargon instantly: If you ever mention a complex term, instantly demystify it using a hilarious everyday analogy.
- Keep responses compact, punchy, and super readable (use short bullet points, clear line breaks, and emojis).`;

    // Map history to the format required by the chats or models API
    // We can also just send it as part of generateContent with a conversational block 
    // or use the official `ai.chats` API.
    // Let's use ai.models.generateContent with complete history blocks to ensure 100% stable structure
    const contents: any[] = [];
    
    // Add history
    if (history && Array.isArray(history)) {
      history.slice(-6).forEach((h: any) => {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        });
      });
    }

    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.8,
      }
    });

    const responseText = result.text || "Sorry habibi, I drew a blank. Say that again?";
    res.json({ text: responseText });
  } catch (err: any) {
    console.error("Gemini API Error in server.ts:", err);
    res.status(500).json({ 
      error: "Could not fetch a response from DirhamBuddy API.", 
      details: err.message 
    });
  }
});

// Setup Vite Dev Server / Static files handler
async function setupApp() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DirhamBuddy server running on port ${PORT}`);
  });
}

setupApp();
