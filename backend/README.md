# Lead Management API

REST API for managing leads (Node.js, Express, MongoDB).

## Run locally

1. Copy `.env.example` to `.env` and set `MONGO_URI` (e.g. your MongoDB connection string).
2. Install dependencies: `npm install`
3. Start the server:
   - Development: `npm run dev`
   - Production: `npm start`

Server runs on **port 5000**. Base URL for leads: `http://localhost:5000/leads`.

## Endpoints

- **POST /leads** – Create a lead (body: `name`, `email`, optional `status`)
- **GET /leads** – List all leads (newest first)
