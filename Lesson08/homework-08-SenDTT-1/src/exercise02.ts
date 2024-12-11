import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize OpenAI
const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.OPENAI_API_KEY,
});

// Utility function to interact with OpenAI API
const processText = async (prompt: string): Promise<string | null> => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });
    return response.choices[0].message.content?.trim() || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Endpoints
app.post("/proofread", async (req, res) => {
  const { text } = req.body;
  const prompt = `Proofread and correct the following text:\n\n${text}\n\nCorrected text:`;
  const result = await processText(prompt);
  res.json({ result });
});

app.post("/make-friendly", async (req, res) => {
  const { text } = req.body;
  const prompt = `Rewrite the following text to sound friendly:\n\n${text}\n\nFriendly text:`;
  const result = await processText(prompt);
  res.json({ result });
});

app.post("/make-professional", async (req, res) => {
  const { text } = req.body;
  const prompt = `Rewrite the following text to sound professional:\n\n${text}\n\nProfessional text:`;
  const result = await processText(prompt);
  res.json({ result });
});

app.post("/summarize", async (req, res) => {
  const { text } = req.body;
  const prompt = `Summarize the following text in a concise manner:\n\n${text}\n\nSummary:`;
  const result = await processText(prompt);
  res.json({ result });
});

app.post("/extract-key-points", async (req, res) => {
  const { text } = req.body;
  const prompt = `Extract the key points from the following text:\n\n${text}\n\nKey Points:`;
  const result = await processText(prompt);
  res.json({ result });
});

// Start Server
app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
