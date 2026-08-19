# Reel Notes — Movie Journal (MERN)

A full-stack MERN app for tracking a personal movie collection. Built with a custom React front end (Vite), an Express/Mongoose REST API, and a warm, film-journal-inspired design.

## Project structure

```
movie-app/
├── client/     React front end (Vite)
└── server/     Express + Mongoose API
```

## Data model

**Movie**
| Field | Type | Notes |
|---|---|---|
| title | String | required |
| genre | String | required |
| releaseYear | Number | required |
| createdAt | Date | auto-set on creation |

## API endpoints

Base URL: `/api/v1/movies`

| Method | Route | Description |
|---|---|---|
| GET | `/` | List all movies |
| GET | `/:id` | Get one movie |
| POST | `/` | Create a movie |
| PUT | `/:id` | Update a movie |
| DELETE | `/:id` | Delete a movie |

## Front-end pages

- `/` — Collection (list, edit, delete)
- `/add` — Add a new movie
- `/edit/:id` — Edit an existing movie

---

## Local setup

### 1. MongoDB Atlas

1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user (username + password).
3. Under Network Access, allow access from anywhere (`0.0.0.0/0`) for now.
4. Copy your connection string — it looks like:
   `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/movie-journal?retryWrites=true&w=majority`

### 2. Server

```bash
cd server
npm install
cp .env.example .env
# paste your MongoDB Atlas connection string into MONGO_URI in .env
npm run dev
```

Server runs on `http://localhost:5000`.

### 3. Client

```bash
cd client
npm install
cp .env.example .env
# .env already points at http://localhost:5000/api/v1 for local dev
npm run dev
```

Client runs on `http://localhost:5173`.

---

## Deployment

### 1. MongoDB Atlas (already set up above)

Your Atlas cluster is already your hosted database — no extra deploy step needed there, just make sure Network Access allows connections from anywhere (or from Render's IPs) so your deployed API can reach it.

### 2. API → Render

1. Push this whole project to a GitHub repo.
2. Go to [render.com](https://render.com) → New → Web Service → connect your repo.
3. Set **Root Directory** to `server`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add an environment variable: `MONGO_URI` = your Atlas connection string.
7. Deploy. Render gives you a URL like `https://reel-notes-api.onrender.com`.

### 3. Client → Vercel

1. Go to [vercel.com](https://vercel.com) → Add New Project → import the same repo.
2. Set **Root Directory** to `client`.
3. Framework preset: Vite (auto-detected).
4. Add an environment variable: `VITE_API_URL` = `https://reel-notes-api.onrender.com/api/v1` (your Render URL + `/api/v1`).
5. Deploy. Vercel gives you a live URL like `https://reel-notes.vercel.app`.

Once both are live, visiting your Vercel URL should load the collection page, which calls your Render API, which reads/writes to your Atlas database.
