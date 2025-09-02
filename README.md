# Admin Portal — Next.js Frontend

This is the **frontend-only** Next.js app (App Router). The backend API has been split out into a separate Node.js project.

## Setup

1. Install deps:
   ```bash
   npm install
   ```

2. Set the API base URL (served by the Node API project) via an env var:
   ```bash
   echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:4000" > .env.local
   ```

3. Run:
   ```bash
   npm run dev
   ```

## Notes

- All former `/app/api/*` routes were removed. API calls now target `process.env.NEXT_PUBLIC_API_BASE_URL`.