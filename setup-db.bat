@echo off
echo 🐘 Python Trainer - Database Setup Script
echo =========================================
echo.

REM Check if Docker is available
docker --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Docker found!
    echo.
    echo Starting PostgreSQL container...
    
    REM Check if container already exists
    docker ps -a | findstr pythontrainer-db >nul 2>&1
    if %errorlevel% == 0 (
        echo Container exists, starting it...
        docker start pythontrainer-db
    ) else (
        echo Creating new container...
        docker run -d --name pythontrainer-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=pythontrainer -p 5432:5432 postgres:15-alpine
    )
    
    echo.
    echo ⏳ Waiting for PostgreSQL to be ready (10 seconds)...
    timeout /t 10 /nobreak >nul
    
    echo.
    echo 🔧 Running Prisma migrations...
    cd backend
    call npx prisma generate
    call npx prisma migrate dev --name init
    
    echo.
    echo 🌱 Seeding database...
    call npx prisma db seed
    
    echo.
    echo ✅ Database setup complete!
    echo.
    echo 📝 Demo login credentials:
    echo    Email: demo@pythontrainer.com
    echo    Password: password123
    echo.
    echo 🚀 Start the backend with: npm run dev
    
) else (
    echo ❌ Docker not found!
    echo.
    echo Please install Docker Desktop for Windows:
    echo   https://docs.docker.com/desktop/install/windows-install/
    echo.
    echo Or use a free online PostgreSQL database:
    echo   • Supabase: https://supabase.com
    echo   • ElephantSQL: https://www.elephantsql.com
    echo   • Railway: https://railway.app
    echo.
    echo Then update backend/.env with your connection string
)

pause
