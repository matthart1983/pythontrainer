@echo off
echo ========================================
echo Python Trainer - Windows Setup
echo ========================================
echo.

cd backend

echo Running database migrations...
call npx prisma db push
if %errorlevel% neq 0 (
    echo.
    echo Migration failed. Trying with migrate dev...
    call npx prisma migrate dev --name init
)

echo.
echo Generating Prisma Client...
call npx prisma generate

echo.
echo Seeding database...
call npm run seed

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Starting backend server...
call npm run dev
