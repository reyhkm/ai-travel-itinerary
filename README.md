# AI Travel Itinerary Planner (Frontend/Backend)

This project is a web application that helps users generate personalized travel itineraries using Google's Gemini AI. It's structured with a React frontend and a Node.js/Express backend.

## Prerequisites

*   Node.js (v18 or newer recommended)
*   npm or yarn

## Setup

1.  **Clone the repository (if applicable).**

2.  **Backend Setup:**
    *   Navigate to the `backend` directory: `cd backend`
    *   Install dependencies: `npm install`
    *   Create a `.env` file in the `backend` directory (`backend/.env`) and add your Gemini API key and desired port:
        ```env
        GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
        PORT=3001
        ```
    *   Replace `YOUR_GEMINI_API_KEY_HERE` with your actual key.

3.  **Frontend Setup:**
    *   Navigate to the `frontend` directory (from the project root): `cd frontend`
    *   Install dependencies: `npm install`
    *   (No API key is needed directly in the frontend; API calls are proxied to the backend during development.)

## Running the Application

1.  **Start the Backend Server:**
    *   In a terminal, navigate to the `backend` directory.
    *   Run: `npm start` (for production-like start) or `npm run dev` (for development with nodemon).
    *   The backend will typically run on `http://localhost:3001` (or the port specified in `backend/.env`).

2.  **Start the Frontend Development Server:**
    *   In another terminal, navigate to the `frontend` directory.
    *   Run: `npm run dev`
    *   The frontend will typically run on `http://localhost:5173` (or another port Vite chooses) and will automatically open in your browser. API requests to `/api/...` will be proxied to the backend.

3.  Open your browser and navigate to the frontend URL if it doesn't open automatically.

## Building for Production

*   **Frontend:**
    *   Navigate to the `frontend` directory: `cd frontend`
    *   Run: `npm run build`
    *   The production-ready static assets will be generated in the `frontend/dist/` directory. These can be served by any static file server or hosting platform (like Render's static site hosting).

*   **Backend:**
    *   The backend Node.js/Express application is ready to be deployed to platforms like Render (as a Web Service), Heroku, etc.
    *   Ensure the `GEMINI_API_KEY` and `PORT` environment variables are set on your hosting platform.
    *   For Render, you would typically connect your Git repository, set it up as a Node.js service, and Render will use the `npm start` script from `backend/package.json` to run the application.

## Project Structure

```
/
├── backend/          # Node.js/Express backend application
│   ├── routes/       # API route definitions
│   ├── .env          # (Gitignored) Environment variables (GEMINI_API_KEY, PORT)
│   ├── server.js     # Express server setup
│   └── package.json
├── frontend/         # React/Vite frontend application
│   ├── public/       # Static assets for frontend
│   ├── src/          # Main source code for the React app
│   │   ├── components/ # React components
│   │   ├── App.tsx     # Main application component
│   │   ├── index.tsx   # Entry point for React app
│   │   └── types.ts    # TypeScript type definitions
│   ├── index.html    # Main HTML page for Vite
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .gitignore        # Specifies intentionally untracked files
├── metadata.json     # Project metadata (may be used by specific deployment platforms)
└── README.md         # This file
```
