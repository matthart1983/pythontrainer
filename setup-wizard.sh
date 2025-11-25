#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Python Trainer - Database Setup Wizard  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""

# Check if we're in the right directory
if [ ! -f "backend/.env" ]; then
    echo -e "${RED}❌ Error: backend/.env not found!${NC}"
    echo "Please run this script from the project root directory."
    exit 1
fi

echo -e "${GREEN}🎯 This wizard will help you set up your database.${NC}"
echo ""
echo "You have three options:"
echo ""
echo -e "${YELLOW}1. Supabase${NC} (Recommended - Free forever, 500MB)"
echo "   → https://supabase.com"
echo ""
echo -e "${YELLOW}2. Railway${NC} (Free \$5 credit)"
echo "   → https://railway.app"
echo ""
echo -e "${YELLOW}3. ElephantSQL${NC} (Free 20MB)"
echo "   → https://elephantsql.com"
echo ""
echo -e "${YELLOW}4. Local PostgreSQL${NC} (If you have it installed)"
echo ""

read -p "Choose an option (1-4): " choice

case $choice in
    1)
        echo ""
        echo -e "${BLUE}📝 Supabase Setup Instructions:${NC}"
        echo ""
        echo "1. Go to https://supabase.com"
        echo "2. Click 'Start your project' and sign up"
        echo "3. Create a new project"
        echo "4. Go to Settings → Database"
        echo "5. Copy the 'Connection string' (URI format)"
        echo ""
        ;;
    2)
        echo ""
        echo -e "${BLUE}📝 Railway Setup Instructions:${NC}"
        echo ""
        echo "1. Go to https://railway.app"
        echo "2. Sign up with GitHub"
        echo "3. Click 'New Project' → 'Provision PostgreSQL'"
        echo "4. Click on the PostgreSQL service"
        echo "5. Go to 'Connect' tab"
        echo "6. Copy 'Postgres Connection URL'"
        echo ""
        ;;
    3)
        echo ""
        echo -e "${BLUE}📝 ElephantSQL Setup Instructions:${NC}"
        echo ""
        echo "1. Go to https://elephantsql.com"
        echo "2. Sign up and create new instance"
        echo "3. Select 'Tiny Turtle (Free)' plan"
        echo "4. Click on instance name"
        echo "5. Copy the 'URL'"
        echo ""
        ;;
    4)
        echo ""
        echo -e "${BLUE}📝 Using Local PostgreSQL${NC}"
        echo ""
        DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pythontrainer"
        ;;
    *)
        echo -e "${RED}❌ Invalid choice. Exiting.${NC}"
        exit 1
        ;;
esac

if [ $choice -ne 4 ]; then
    echo -e "${YELLOW}Please enter your database connection URL:${NC}"
    echo "(Should start with 'postgresql://' or 'postgres://')"
    echo ""
    read -p "Database URL: " DATABASE_URL
    
    if [ -z "$DATABASE_URL" ]; then
        echo -e "${RED}❌ No URL provided. Exiting.${NC}"
        exit 1
    fi
fi

# Validate URL format
if [[ ! "$DATABASE_URL" =~ ^postgres(ql)?:// ]]; then
    echo -e "${RED}❌ Invalid database URL format!${NC}"
    echo "URL should start with 'postgresql://' or 'postgres://'"
    exit 1
fi

echo ""
echo -e "${GREEN}✓ Database URL received!${NC}"
echo ""

# Backup existing .env
if [ -f "backend/.env" ]; then
    cp backend/.env backend/.env.backup
    echo -e "${GREEN}✓ Created backup: backend/.env.backup${NC}"
fi

# Update DATABASE_URL in .env
echo -e "${BLUE}📝 Updating backend/.env...${NC}"

# Read current .env and update DATABASE_URL
temp_file=$(mktemp)
while IFS= read -r line; do
    if [[ $line == DATABASE_URL=* ]]; then
        echo "DATABASE_URL=\"$DATABASE_URL\"" >> "$temp_file"
    else
        echo "$line" >> "$temp_file"
    fi
done < backend/.env

mv "$temp_file" backend/.env
echo -e "${GREEN}✓ Updated DATABASE_URL${NC}"
echo ""

# Navigate to backend
cd backend || exit

# Test connection
echo -e "${BLUE}🔌 Testing database connection...${NC}"
if npx prisma db pull --force 2>/dev/null; then
    echo -e "${GREEN}✓ Successfully connected to database!${NC}"
else
    echo -e "${YELLOW}⚠ Could not connect yet (this is normal for new databases)${NC}"
fi
echo ""

# Run migrations
echo -e "${BLUE}🗄️  Running database migrations...${NC}"
if npx prisma migrate dev --name init; then
    echo -e "${GREEN}✓ Migrations completed!${NC}"
else
    echo -e "${RED}❌ Migration failed. Check your connection URL.${NC}"
    exit 1
fi
echo ""

# Generate Prisma Client
echo -e "${BLUE}⚙️  Generating Prisma Client...${NC}"
npx prisma generate
echo -e "${GREEN}✓ Prisma Client generated!${NC}"
echo ""

# Seed database
echo -e "${BLUE}🌱 Seeding database with sample data...${NC}"
if npm run seed; then
    echo -e "${GREEN}✓ Database seeded successfully!${NC}"
    echo ""
    echo -e "${GREEN}📊 Sample data added:${NC}"
    echo "   • Demo user: demo@pythontrainer.com (password: Demo123456!)"
    echo "   • 2 beginner lessons"
    echo "   • 2 easy challenges"
    echo "   • 2 achievements"
else
    echo -e "${YELLOW}⚠ Seeding failed (database may already have data)${NC}"
fi
echo ""

# Ask if user wants to start the backend
echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║          Database Setup Complete! 🎉      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""

read -p "Would you like to start the backend server now? (y/n): " start_server

if [ "$start_server" = "y" ] || [ "$start_server" = "Y" ]; then
    echo ""
    echo -e "${GREEN}🚀 Starting backend server...${NC}"
    echo -e "${YELLOW}Backend will run at: http://localhost:3000${NC}"
    echo -e "${YELLOW}Press Ctrl+C to stop${NC}"
    echo ""
    npm run dev
else
    echo ""
    echo -e "${GREEN}✅ Setup complete!${NC}"
    echo ""
    echo -e "${BLUE}To start the backend later, run:${NC}"
    echo "   cd backend && npm run dev"
    echo ""
    echo -e "${BLUE}Your application:${NC}"
    echo "   Frontend: http://localhost:5173"
    echo "   Backend:  http://localhost:3000 (when started)"
    echo ""
    echo -e "${GREEN}Happy coding! 🐍✨${NC}"
fi
