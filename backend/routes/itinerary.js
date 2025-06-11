import express from 'express';
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("GEMINI_API_KEY environment variable is not set in the backend.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;
const modelName = 'gemini-2.5-flash-preview-04-17';

const cleanJsonString = (rawJson) => {
  let jsonStr = rawJson.trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = jsonStr.match(fenceRegex);
  if (match && match[2]) {
    jsonStr = match[2].trim();
  }
  return jsonStr;
};

router.post('/generate-itinerary', async (req, res) => {
  if (!ai) {
    return res.status(500).json({ error: "API Key is not configured on the server. Please set GEMINI_API_KEY in backend .env file." });
  }

  const details = req.body;
  const { startDate, endDate, destination, preferences } = details;

  if (!startDate || !endDate || !destination) {
    return res.status(400).json({ error: "Missing required fields: startDate, endDate, destination." });
  }
  if (new Date(startDate) > new Date(endDate)) {
    return res.status(400).json({ error: "End Date cannot be before Start Date." });
  }

  const prompt = `
    You are an expert travel planner AI. Your goal is to generate a detailed, engaging, and practical day-by-day travel itinerary.

    Trip Details:
    - Destination: ${destination}
    - Start Date: ${startDate}
    - End Date: ${endDate}
    - Traveler's Preferences: ${preferences || 'No specific preferences provided. Please suggest a balanced itinerary.'}

    Please provide the itinerary in JSON format. The root of the JSON object should be a key named "itinerary", which is an array of objects.
    Each object in the "itinerary" array represents a single day and must have the following structure:
    {
      "day": "Day X - YYYY-MM-DD", 
      "title": "A concise and engaging title for the day's theme", 
      "activities": [ 
        {
          "time": "Morning | Afternoon | Evening | Specific Time (e.g., 9:00 AM)", 
          "name": "Activity Name", 
          "description": "A brief, helpful description of the activity (1-3 sentences). Include practical tips if relevant."
        }
      ]
    }

    Important Instructions:
    1.  Ensure the number of days in the itinerary matches the duration between the start and end dates.
    2.  If the date range is invalid (e.g., end date before start date), or too short for a meaningful plan (e.g. same day), respond with a JSON indicating an error, like: {"error": "Invalid date range provided."}.
    3.  If the destination is unclear or too broad, try to make reasonable assumptions or indicate this in an error JSON.
    4.  Activities should be realistic, culturally relevant if applicable, and aligned with the destination and stated preferences.
    5.  Distribute activities sensibly across the days. Avoid over-scheduling. Include some leisure time if appropriate.
    6.  The "day" field should accurately reflect the progression of days and include the actual date.
    7.  If no preferences are given, create a well-rounded itinerary including popular attractions, cultural experiences, and some dining suggestions.
    8.  If suggesting specific restaurants or ticketed attractions, mention that booking in advance might be advisable, but do not provide booking links.
    9.  The "description" for activities should be concise but informative.
    10. Ensure the output is ONLY the JSON object, without any surrounding text or markdown.
    `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    
    const rawText = response.text;
    if (!rawText) {
      return res.status(500).json({ error: "Received an empty response from the AI." });
    }

    const cleanedJson = cleanJsonString(rawText);
    const parsedData = JSON.parse(cleanedJson);

    if (parsedData.error) {
      return res.status(400).json({ error: parsedData.error });
    }
    
    if (parsedData && Array.isArray(parsedData.itinerary)) {
      const groundingSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(
        (chunk) => ({
          web: chunk.web ? { uri: chunk.web.uri, title: chunk.web.title } : undefined,
        })
      ) || [];
      return res.json({ itineraryData: parsedData, sources: groundingSources });
    } else {
      console.error("Parsed data is not in the expected ItineraryData format:", parsedData);
      return res.status(500).json({ error: "The AI returned data in an unexpected format. Please try again." });
    }

  } catch (e) {
    console.error("Error calling Gemini API or parsing response on backend:", e);
    let errorMessage = "Failed to generate itinerary due to an AI service error on the backend.";
    if (e.message && e.message.includes("API key not valid")) {
        errorMessage = "API Key is invalid or not authorized on the backend. Please check your GEMINI_API_KEY environment variable.";
    } else if (e instanceof SyntaxError) {
        errorMessage = "Failed to parse the AI's response on the backend. The format might be incorrect.";
    } else if (e.message) {
        errorMessage = e.message;
    }
    return res.status(500).json({ error: errorMessage });
  }
});

export default router;
