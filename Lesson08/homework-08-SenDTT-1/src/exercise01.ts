import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import OpenAI from "openai";

const env = dotenv.config();
dotenvExpand.expand(env);

async function parseAddress(address: string): Promise<null | string> {
  const prompt =
    `Extract the following parts from the address: street, city, state, and zipcode.\n` +
    `Input: ${address}\n` +
    `Output:`;
  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await client.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    temperature: 1.0,
    top_p: 1.0,
    max_tokens: 1000,
    model: "gpt-4o-mini",
  });

  return response.choices[0].message.content;
}

// Example usage
(async () => {
  const address = "1000 N 4th Street, Fairfield, IA 52556";
  const result = await parseAddress(address);
  console.log(result);
})();
