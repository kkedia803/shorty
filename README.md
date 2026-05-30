# Shorty

A fast and modern URL shortener built with React, Express, PostgreSQL, Prisma, and Redis caching.

## Overview

Shorty allows users to convert long URLs into short, shareable links. The application is designed with performance and scalability in mind by combining PostgreSQL for persistent storage and Redis for high-speed caching.

### Features

* Create short URLs from long links
* Automatic URL validation
* Instant redirection to original URLs
* Redis-powered caching for faster redirects
* PostgreSQL database for reliable persistence
* Clean and responsive React frontend
* RESTful API architecture
* Production-ready deployment setup

---

## Tech Stack

### Frontend

* React
* Vite
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Prisma ORM

### Caching

* Redis
* Upstash Redis

### Deployment

* Vercel (Frontend)
* Railway (Backend)

---

## Architecture

```text
User
 │
 ▼
React Frontend (Vercel)
 │
 ▼
Express Backend (Railway)
 │
 ├────────► Redis Cache (Upstash)
 │              │
 │      Cache Hit → Redirect
 │
 ▼
PostgreSQL (Prisma ORM)
 │
 └────────► Cache Miss → Fetch → Store in Redis → Redirect
```

---

## Project Structure

```text
shorty/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── config/
│   │   └── ...
│   │
│   ├── prisma/
│   └── ...
│
└── README.md
```

---

## API Endpoints

### Create Short URL

```http
POST /shorturl
```

Request Body:

```json
{
  "originalUrl": "https://example.com"
}
```

Response:

```json
{
  "shortUrl": "abc123xyz"
}
```

---

### Redirect to Original URL

```http
GET /:shorturl
```

Example:

```http
GET /abc123xyz
```

Behavior:

* Checks Redis cache first
* If found, redirects immediately
* If not found, fetches from PostgreSQL
* Stores result in Redis
* Redirects user

---

## Environment Variables

### Backend

Create a `.env` file inside the backend directory:

```env
DATABASE_URL=your_postgres_connection_string

UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

PORT=3000
```

### Frontend

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=your_backend_connection_url
```

---

## Local Development

### Clone Repository

```bash
git clone https://github.com/kkedia803/shorty.git
cd shorty
```

### Backend Setup

```bash
cd backend

npm install

npx prisma generate

npx prisma db push

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Redis Caching Strategy

Shorty uses the Cache-Aside Pattern.

### URL Creation

```text
Create URL
    │
    ▼
Store in PostgreSQL
    │
    ▼
Store in Redis
```

### URL Redirection

```text
Request Short URL
        │
        ▼
Check Redis
   │         │
 Hit       Miss
   │         │
Redirect   Query PostgreSQL
               │
               ▼
        Store in Redis
               │
               ▼
           Redirect
```

This reduces database load and improves redirect performance for frequently accessed URLs.

---

## Future Improvements

* User authentication
* Custom URL aliases
* Click analytics and tracking
* QR code generation
* Custom Expiration dates for links
* Rate limiting
* Link management dashboard

---

## License

This project is licensed under the MIT License.

---

Built by Kartik Kedia.
