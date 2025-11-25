# 🌐 Online Database Setup Guide

Since Docker and PostgreSQL aren't installed locally, let's use a **free online PostgreSQL database**! This is actually the easiest option and works perfectly for development and production.

## 🎯 Recommended: Supabase (Free Forever Tier)

### Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (or email)
4. Create a new project:
   - **Name:** python-trainer
   - **Database Password:** (create a strong password - save it!)
   - **Region:** Choose closest to you
   - **Plan:** Free tier (includes 500MB database, 2GB bandwidth)

### Step 2: Get Database Connection String
1. After project is created, go to **Settings** → **Database**
2. Scroll to **Connection string** section
3. Select **URI** format
4. Copy the connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxx.supabase.co:5432/postgres
   ```

### Step 3: Update Backend .env File
1. Open `backend/.env`
2. Replace the DATABASE_URL with your Supabase connection string:
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxx.supabase.co:5432/postgres"
   ```

### Step 4: Run Database Migrations
```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
npm run seed
```

### Step 5: Start Backend Server
```bash
npm run dev
```

Done! Your backend will be running at http://localhost:3000 🎉

---

## 🔄 Alternative: Railway (Free Trial)

### Why Railway?
- $5 free credit (lasts ~1-2 months)
- Very easy setup
- One-click PostgreSQL

### Steps:
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Provision PostgreSQL"
5. Click on PostgreSQL service
6. Go to **Connect** tab
7. Copy **Postgres Connection URL**
8. Update `backend/.env` with the URL
9. Run migrations (see Step 4 above)

---

## 🐘 Alternative: ElephantSQL (Free Tier)

### Why ElephantSQL?
- 20MB free database
- Simple setup
- Reliable

### Steps:
1. Go to https://www.elephantsql.com
2. Sign up (email or GitHub)
3. Click "Create New Instance"
4. Name it "python-trainer"
5. Select **Tiny Turtle (Free)** plan
6. Select region
7. Click "Create instance"
8. Click on your instance name
9. Copy the **URL** (starts with `postgres://`)
10. Update `backend/.env` with the URL
11. Run migrations (see Step 4 above)

---

## 🎯 Quick Script Method

I've created a setup script that will prompt you for the database URL:

**Linux/Mac:**
```bash
chmod +x setup-db.sh
./setup-db.sh
```

**Windows:**
```bash
./setup-db.bat
```

The script will:
- Ask for your database URL
- Update the .env file
- Run migrations
- Seed sample data
- Start the backend

---

## ✅ Verification

After setup, verify everything works:

### 1. Check Prisma can connect:
```bash
cd backend
npx prisma db push
```

### 2. Test the API:
```bash
curl http://localhost:3000/api/health
```

Should return: `{"status":"ok","timestamp":"..."}`

### 3. Try registration:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456!",
    "username": "testuser"
  }'
```

---

## 📊 Database Comparison

| Service | Free Tier | Ease | Speed | Best For |
|---------|-----------|------|-------|----------|
| **Supabase** | 500MB, unlimited | ⭐⭐⭐⭐⭐ | Fast | Development & Production |
| **Railway** | $5 credit | ⭐⭐⭐⭐ | Very Fast | Quick prototypes |
| **ElephantSQL** | 20MB | ⭐⭐⭐⭐ | Medium | Small projects |

---

## 🎓 My Recommendation

**Use Supabase** because:
- ✅ Truly free forever (500MB is plenty for learning)
- ✅ Fast global CDN
- ✅ Great dashboard for viewing data
- ✅ Can add authentication, storage, real-time features later
- ✅ No credit card required
- ✅ Excellent documentation

---

## 🆘 Troubleshooting

### Error: "Can't reach database server"
- Check connection string is correct
- Verify no extra spaces in .env file
- Ensure DATABASE_URL is in quotes

### Error: "SSL required"
Add `?sslmode=require` to end of connection string:
```
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

### Error: "Migration failed"
Your database might have existing tables. Reset:
```bash
npx prisma migrate reset
```

---

## 🚀 Next Steps

Once database is running:
1. ✅ Start backend: `cd backend && npm run dev`
2. ✅ Backend runs at: http://localhost:3000
3. ✅ Frontend automatically connects to backend
4. ✅ Register account at: http://localhost:5173/register
5. ✅ Start learning Python! 🐍

---

*Need help? Check the Supabase quickstart: https://supabase.com/docs/guides/database/connecting-to-postgres*
