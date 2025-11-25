#!/bin/bash

echo "🐘 Python Trainer - Database Setup Script"
echo "========================================="
echo ""

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo "✅ Docker found!"
    echo ""
    echo "Starting PostgreSQL container..."
    
    # Check if container already exists
    if docker ps -a | grep -q pythontrainer-db; then
        echo "Container exists, starting it..."
        docker start pythontrainer-db
    else
        echo "Creating new container..."
        docker run -d \
            --name pythontrainer-db \
            -e POSTGRES_PASSWORD=password \
            -e POSTGRES_DB=pythontrainer \
            -p 5432:5432 \
            postgres:15-alpine
    fi
    
    echo ""
    echo "⏳ Waiting for PostgreSQL to be ready (10 seconds)..."
    sleep 10
    
    echo ""
    echo "🔧 Running Prisma migrations..."
    cd backend
    npx prisma generate
    npx prisma migrate dev --name init
    
    echo ""
    echo "🌱 Seeding database..."
    npx prisma db seed
    
    echo ""
    echo "✅ Database setup complete!"
    echo ""
    echo "📝 Demo login credentials:"
    echo "   Email: demo@pythontrainer.com"
    echo "   Password: password123"
    echo ""
    echo "🚀 Start the backend with: npm run dev"
    
else
    echo "❌ Docker not found!"
    echo ""
    echo "Please install Docker:"
    echo "  • Windows: https://docs.docker.com/desktop/install/windows-install/"
    echo "  • Mac: https://docs.docker.com/desktop/install/mac-install/"
    echo "  • Linux: https://docs.docker.com/engine/install/"
    echo ""
    echo "Or install PostgreSQL directly:"
    echo "  • Ubuntu: sudo apt install postgresql"
    echo "  • Mac: brew install postgresql"
    echo "  • Windows: https://www.postgresql.org/download/windows/"
    echo ""
    echo "Alternative: Use a free online PostgreSQL database:"
    echo "  • Supabase: https://supabase.com"
    echo "  • ElephantSQL: https://www.elephantsql.com"
    echo "  • Railway: https://railway.app"
fi
