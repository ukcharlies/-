# Mini Task Manager

This repository contains:

- `backend/`: Node.js + Express + MongoDB API with JWT authentication.
- `frontend/`: Next.js app with `/login` and `/dashboard` pages.
- Backend runtime entry: `backend/src/server.js`.

## Test Login Account

- Email: `test@elonatech.com.ng`
- Password: `123456`

## Backend Setup

1. Open `backend/.env.example` and copy it to `backend/.env`.
2. Update `MONGO_URI` and `JWT_SECRET` (and keep `FRONTEND_URL=http://localhost:3000` for local dev).
3. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Seed the test user:
   ```bash
   npm run seed:test-user
   ```
5. Run the backend:
   ```bash
   npm run dev
   ```

Backend runs on `http://localhost:5000`.

### Required Endpoints

- `POST /auth/login`
- `GET /tasks`
- `POST /tasks`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

All `/tasks` endpoints require an authenticated session cookie (`httpOnly` JWT cookie set by `/auth/login`).

### Extra Auth Endpoints

- `GET /auth/me` (check active session)
- `POST /auth/logout` (clear auth cookie)

## Frontend Setup

1. Open `frontend/.env.local.example` and copy it to `frontend/.env.local`.
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Run the frontend:
   ```bash
   npm run dev
   ```

Frontend runs on `http://localhost:3000`.

## MongoDB Without Local Install (Atlas)

If MongoDB is not installed on your laptop, use MongoDB Atlas:

1. Create/sign in to Atlas at `https://www.mongodb.com/cloud/atlas/register`.
2. Create a free cluster (`M0`).
3. In Atlas, create a DB user (username/password).
4. In Network Access, add your current IP (or `0.0.0.0/0` temporarily for testing only).
5. Click `Connect` -> `Drivers` and copy the connection string.
6. Put it in `backend/.env` as `MONGO_URI`.

Example:
`MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/mini-task-manager?retryWrites=true&w=majority&appName=<appName>`

## Project Structure

```
backend/src
  config/
  controllers/
  middleware/
  models/
  routes/
  scripts/
  utils/
  validations/

frontend
  lib/
  pages/
  styles/
```
