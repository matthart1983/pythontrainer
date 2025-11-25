# 🚀 Next Steps - Get Backend Running

## Current Status
✅ **Frontend:** Running at http://localhost:5173  
✅ **Python Console:** Fully working!  
⏳ **Backend:** Ready to start (needs database)

---

## 🎯 Two Simple Options

### Option 1: Automated Setup (Easiest) ⭐

I've opened **Supabase** in your browser. Here's what to do:

#### Step 1: Create Supabase Database (2 minutes)
1. Click **"Start your project"** on Supabase
2. Sign up with GitHub (or email)
3. Click **"New project"**
4. Fill in:
   - **Name:** `python-trainer`
   - **Database Password:** Create a strong password (SAVE IT!)
   - **Region:** Choose closest to you
   - **Plan:** Free (it's already selected)
5. Click **"Create new project"** (takes ~2 minutes to provision)

#### Step 2: Get Connection String
1. Wait for project to finish setting up (green "Active" status)
2. Click **Settings** (⚙️ icon in sidebar)
3. Click **Database**
4. Scroll down to **"Connection string"** section
5. Select **"URI"** tab (not Transaction or Session)
6. Click **"Copy"** button

Your connection string looks like:
```
postgresql://postgres.xxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

#### Step 3: Run the Setup Wizard
Back in your terminal, run:
```bash
./setup-wizard.sh
```

The wizard will:
- ✅ Ask you to paste your connection string
- ✅ Update your `.env` file
- ✅ Run database migrations
- ✅ Seed sample data
- ✅ Start the backend server

**That's it!** 🎉

---

### Option 2: Manual Setup

If you prefer to do it manually:

#### 1. Update `.env` file:
```bash
nano backend/.env
```

Change the `DATABASE_URL` line to your Supabase connection string:
```env
DATABASE_URL="postgresql://postgres.xxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

#### 2. Run migrations:
```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

#### 3. Seed database:
```bash
npm run seed
```

#### 4. Start backend:
```bash
npm run dev
```

---

## 🎓 What You'll Get

Once backend is running:

### Sample Data:
- **Demo User:** demo@pythontrainer.com (password: `Demo123456!`)
- **2 Lessons:** Introduction to Python, Variables and Types
- **2 Challenges:** Hello World, Simple Math
- **2 Achievements:** First Steps, Code Warrior

### Working Features:
- ✅ User registration & login
- ✅ JWT authentication
- ✅ Lesson browsing & progress tracking
- ✅ Challenge submissions
- ✅ XP and achievements
- ✅ User profiles

---

## ✅ Verification

After backend starts, test it:

### 1. Check health endpoint:
```bash
curl http://localhost:3000/api/health
```

Should return: `{"status":"ok","timestamp":"2025-11-23T..."}`

### 2. Try the demo user:
Go to http://localhost:5173/login and use:
- **Email:** demo@pythontrainer.com
- **Password:** Demo123456!

### 3. Check your console
The backend terminal should show:
```
✅ Database connected successfully
🚀 Server running on port 3000
📊 8 models synced
```

---

## 🆘 Troubleshooting

### "Can't reach database server"
- Double-check your connection string
- Make sure no extra spaces
- Verify password is correct

### "Port 3000 already in use"
Stop any other servers:
```bash
lsof -ti:3000 | xargs kill -9
```

### "Prisma migrate failed"
Reset and try again:
```bash
npx prisma migrate reset
```

---

## 🎊 Once Everything is Running

You'll have:
- **Frontend:** http://localhost:5173 ← Your app UI
- **Backend:** http://localhost:3000 ← Your API
- **Database:** Supabase ← Your data

### Full Experience:
1. ✅ Register a new account
2. ✅ Browse lessons
3. ✅ Complete challenges
4. ✅ Earn XP and achievements
5. ✅ Track your progress
6. ✅ Use the Python console

---

## 🚀 Ready?

Run the setup wizard now:
```bash
./setup-wizard.sh
```

Or check `ONLINE_DB_SETUP.md` for detailed instructions.

**Let's get your backend running!** 🎉
