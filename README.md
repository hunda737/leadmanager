# Lead Manager

Simple frontend + backend for managing leads.

## Prerequisites

- Node.js (recommended: 20+)
- PostgreSQL (used by the backend via Prisma)

## Run the backend (Express + Prisma) on `http://localhost:5000`

1. Open a terminal in `backend/`
   - `cd backend`
2. Install dependencies
   - `npm install`
3. Configure environment variables
   - Copy `.env.example` to `.env` (if you don’t already have it)
   - Ensure `DATABASE_URL` is set to your local Postgres connection string
4. Start the server
   - `npm run dev`

The API should be available at:
- `GET http://localhost:5000/leads`
- `POST http://localhost:5000/leads`

## Run the frontend (Next.js App Router + Tailwind) on `http://localhost:3000`

1. Open a terminal in `frontend/`
   - `cd frontend`
2. Install dependencies
   - `npm install`
3. Configure environment variables
   - Ensure `frontend/.env` includes:
     - `NEXT_PUBLIC_API_BASE_URL=http://localhost:5000`
4. Start the dev server
   - `npm run dev`

Then open:
- `http://localhost:3000`


