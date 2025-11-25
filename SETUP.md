# Python Trainer - Setup Instructions

## Quick Start

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend && npm install && cd ..
```

### 2. Set Up Database

You need PostgreSQL installed and running. Create a database:

```bash
# Using psql
createdb pythontrainer

# Or using PostgreSQL command line
psql -U postgres
CREATE DATABASE pythontrainer;
\q
```

### 3. Configure Environment

Update the `backend/.env` file with your database credentials:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/pythontrainer?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production-min-32-characters"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-in-production-min-32-characters"
PORT=3001
NODE_ENV=development
```

### 4. Run Database Migrations

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
cd ..
```

### 5. Start Development Servers

```bash
# From root directory - starts both frontend and backend
npm run dev

# Or start individually:
npm run dev:frontend  # Frontend on http://localhost:5173
npm run dev:backend   # Backend on http://localhost:3001
```

## Default Login Credentials

After seeding the database, you can log in with:
- **Email**: demo@pythontrainer.com
- **Password**: password123

## Troubleshooting

### Database Connection Issues

If you see database connection errors:
1. Make sure PostgreSQL is running
2. Check your DATABASE_URL in backend/.env
3. Ensure the database exists

### Port Already in Use

If port 3001 or 5173 is already in use:
- Change PORT in backend/.env
- Change port in frontend/vite.config.ts

### Prisma Issues

If Prisma commands fail:
```bash
cd backend
npx prisma generate
```

## Project Structure

```
pythontrainer/
├── frontend/          # React + Vite frontend
├── backend/           # Express + Prisma backend
├── package.json       # Root workspace config
└── README.md          # This file
```

## Features

- ✅ Interactive Python Console (Pyodide)
- ✅ User Authentication (JWT)
- ✅ Lesson System
- ✅ Challenge System
- ✅ Progress Tracking
- ✅ XP and Achievements
- ⏳ More coming soon!

## Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Pyodide (Python in browser)
- Monaco Editor

**Backend:**
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication

Enjoy coding! 🚀
