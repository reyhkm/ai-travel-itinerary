import express from 'express';
import cors from 'cors';
import itineraryRoutes from './routes/itinerary.js';

// Debug logs for environment variables, useful for Vercel's runtime logs too
console.log('[server.js] Attempting to read GEMINI_API_KEY from process.env:', process.env.GEMINI_API_KEY ? 'Set (value hidden for security)' : 'Not Set or Empty');
console.log('[server.js] Attempting to read PORT from process.env:', process.env.PORT);

const app = express();

// Configure CORS appropriately for production if needed
app.use(cors()); 
app.use(express.json());

// All API routes are now prefixed with /api at the Express router level
app.use('/api', itineraryRoutes);

// Optional: A root endpoint for the backend function itself, accessible via /api if no other /api route matches
app.get('/api', (req, res) => {
  res.send('AI Travel Planner Backend is running on Vercel!');
});

// app.listen() is not needed for Vercel serverless functions
// Vercel handles the HTTP server and invokes the exported app

export default app;
