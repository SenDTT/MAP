import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Initialize OpenAI
const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.OPENAI_API_KEY,
});

// OpenWeatherMap API key
const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;

// Fetch weather data from OpenWeatherMap
async function getWeather(location: string): Promise<string> {
  try {
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        location
      )}&appid=${openWeatherApiKey}&units=metric`
    );
    const weatherData = weatherResponse.data;
    const description = weatherData.weather[0].description;
    const temp = weatherData.main.temp;
    const city = weatherData.name;
    const country = weatherData.sys.country;

    return `The current weather in ${city}, ${country} is ${description} with a temperature of ${temp}°C.`;
  } catch (error) {
    console.error(`Error fetching weather data: ${error.message}`);
    throw new Error("Unable to fetch weather data. Please check the location.");
  }
}

// Generate a friendly weather summary using OpenAI
async function generateFriendlySummary(weatherText: string): Promise<string> {
  const prompt = `Rewrite the following weather status to make it sound friendly:\n\n${weatherText}\n\nFriendly weather summary:`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
      temperature: 0.7,
    });
    return (
      response.choices[0].message.content?.trim() ||
      "Could not generate a friendly summary."
    );
  } catch (error) {
    console.error(`Error generating summary: ${error.message}`);
    throw new Error("Unable to generate friendly summary.");
  }
}

// Endpoint to get weather status
app.post("/get-weather", async (req, res) => {
  const { location } = req.body;

  if (!location) {
    res.status(400).json({ error: "Location is required." });
  }

  try {
    const weatherText = await getWeather(location);
    const friendlySummary = await generateFriendlySummary(weatherText);
    res.json({
      originalWeather: weatherText,
      friendlyWeather: friendlySummary,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
