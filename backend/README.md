# Lead Management API

REST API for managing leads (Node.js, Express, Prisma, PostgreSQL).

## Run locally

1. Copy `.env.example` to `.env` and set `DATABASE_URL` to your PostgreSQL connection string.
2. Install dependencies: `npm install`
3. Generate Prisma client and run migrations:
   - `npx prisma generate`
   - `npx prisma migrate dev` (creates the database schema)
4. Start the server:
   - Development: `npm run dev`
   - Production: `npm start`

Server runs on **port 5000**. Base URL for leads: `http://localhost:5000/leads`.

## Endpoints

- **POST /leads** – Create a lead (body: `name`, `email`, optional `status`)
- **GET /leads** – List all leads (newest first)
