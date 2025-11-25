# Railway Deployment Guide

## Prerequisites
- GitHub account
- Railway account (sign up at https://railway.app)

## Step 1: Push to GitHub

1. Create a new repository on GitHub (https://github.com/new)
2. Copy the repository URL
3. Run these commands:

```bash
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Step 2: Deploy Backend to Railway

1. Go to https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select your `pythontrainer` repository
4. Railway will detect the project structure

### Backend Service Configuration

1. Click on the backend service
2. Add these environment variables:
   - `DATABASE_URL`: (Railway will provide this when you add PostgreSQL)
   - `JWT_SECRET`: Generate a random string (e.g., `openssl rand -base64 32`)
   - `PORT`: 3001
   - `NODE_ENV`: production

3. Add PostgreSQL database:
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will automatically set DATABASE_URL

4. Set the Root Directory:
   - Go to Settings → Root Directory: `backend`

5. Set the Start Command:
   - Go to Settings → Start Command: `npx prisma migrate deploy && npm run start`

6. Deploy the backend

## Step 3: Deploy Frontend to Railway

1. In the same Railway project, click "New Service"
2. Select "GitHub Repo" → Choose your repository again
3. This will create a second service for the frontend

### Frontend Service Configuration

1. Click on the frontend service
2. Add environment variable:
   - `VITE_API_URL`: (Use the backend service URL from step 2, e.g., `https://your-backend.railway.app`)

3. Set the Root Directory:
   - Go to Settings → Root Directory: `frontend`

4. Set the Build Command:
   - Go to Settings → Build Command: `npm install && npm run build`

5. Set the Start Command:
   - Go to Settings → Start Command: `npm run preview`

6. Deploy the frontend

## Step 4: Run Database Migrations

After the backend is deployed:

1. Open the backend service in Railway
2. Go to the "Variables" tab
3. Copy the DATABASE_URL
4. Run locally:

```bash
cd backend
DATABASE_URL="your_railway_database_url" npx prisma migrate deploy
DATABASE_URL="your_railway_database_url" npx tsx prisma/seed-comprehensive-lessons.ts
```

Or use Railway CLI to run directly on the server:

```bash
railway login
railway link
railway run npx prisma migrate deploy
railway run npx tsx prisma/seed-comprehensive-lessons.ts
```

## Step 5: Verify Deployment

1. Frontend URL: Check the frontend service deployment URL
2. Backend URL: Check the backend service deployment URL
3. Test the application by creating an account and accessing lessons

## Troubleshooting

### Build Failures
- Check the build logs in Railway dashboard
- Ensure all dependencies are in package.json
- Verify environment variables are set correctly

### Database Connection Issues
- Verify DATABASE_URL is set correctly
- Check if migrations have been run
- Ensure PostgreSQL service is running

### Frontend Can't Connect to Backend
- Verify VITE_API_URL points to the correct backend URL
- Check CORS settings in backend if needed
- Ensure backend is running and healthy

## Alternative: Use Supabase for Database

If you prefer to keep using your existing Supabase database:

1. In Railway backend service, set DATABASE_URL to your Supabase connection string:
   ```
   postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
   ```

2. No need to add PostgreSQL service in Railway
3. Your data will remain in Supabase

## Cost Optimization

Railway free tier includes:
- $5 of usage per month
- Automatic scaling
- Custom domains

For production:
- Consider upgrading to Railway Pro ($20/month)
- Use environment-based deployments (staging/production)
- Monitor resource usage in Railway dashboard
