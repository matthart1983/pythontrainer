# Python Trainer 🐍

An interactive Python learning platform that brings the Python console directly to your browser. Learn Python through hands-on coding, gamified challenges, and instant feedback.

## 🎉 Current Status: LIVE & WORKING!

**Frontend:** ✅ Running at http://localhost:5173  
**Python Console:** ✅ Fully functional - Try it now!  
**Backend:** ✅ Complete (optional database setup)

## ⚡ Quick Start

### 1. Access the Application
The frontend is already running! Just visit:
- **Home**: http://localhost:5173
- **Python Console**: http://localhost:5173/console ⭐

### 2. Try the Python Console
```python
# The console works right now - try this code:
print("Hello, Python Trainer!")

def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        print(a, end=' ')
        a, b = b, a + b

fibonacci(10)
```

### 3. Optional: Enable Backend Features
To use authentication, lessons, and challenges:
```bash
# If you have Docker:
./setup-db.bat  # Windows
# or
./setup-db.sh   # Mac/Linux

# Then:
cd backend && npm run dev
```

## ✨ Features

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Monaco Editor (VSCode editor)
- Pyodide (Python in WebAssembly)
- React Router
- Zustand (State Management)

### Backend
- Node.js + Express + TypeScript
- PostgreSQL + Prisma ORM
- JWT Authentication
- Redis (Caching)

## 🚀 Getting Started

### The Console Works NOW!
No setup needed - the interactive Python console is fully functional:
1. Visit http://localhost:5173/console
2. Wait ~5 seconds for initialization
3. Start coding in Python!

### Want Full Features? (Optional)

**Prerequisites:**
- Node.js 18+ and npm 9+ (✅ Already installed)
- Docker (for easy database) OR PostgreSQL

**Setup Backend:**

1. **Option A: Docker (Easiest)**
```bash
# Windows
setup-db.bat

# Mac/Linux
chmod +x setup-db.sh
./setup-db.sh

# Then start backend:
cd backend && npm run dev
```

2. **Option B: Online Database (No Install)**
- Sign up at [Supabase](https://supabase.com) (free)
- Create a PostgreSQL database
- Copy connection string to `backend/.env`
- Run: `cd backend && npx prisma migrate dev && npm run dev`

3. **Option C: Install PostgreSQL Locally**
```bash
# Install PostgreSQL, then:
cd backend
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

### Full Stack Running:
- Frontend: http://localhost:5173 ✅
- Backend: http://localhost:3001
- Demo User: demo@pythontrainer.com / password123

## Project Structure

```
pythontrainer/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API and Python services
│   │   ├── store/         # State management
│   │   ├── types/         # TypeScript types
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   └── App.tsx        # Root component
│   └── package.json
│
├── backend/               # Node.js backend API
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Route controllers
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   ├── types/         # TypeScript types
│   │   └── server.ts      # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema
│   │   └── seed.ts        # Database seeding
│   └── package.json
│
├── DEVELOPER_SPEC.md      # Detailed technical specification
├── package.json           # Root package.json
└── README.md             # This file
```

## Development

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend
- `npm run build` - Build both applications for production
- `npm run test` - Run tests for both applications
- `npm run lint` - Lint code in both applications

### Database Commands

```bash
cd backend

# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# Open Prisma Studio (database GUI)
npx prisma studio

# Generate Prisma Client
npx prisma generate
```

## Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Railway/Render)
```bash
cd backend
npm run build
# Deploy with your preferred platform
```

## 📚 Documentation

- **[STATUS.md](STATUS.md)** - Current project status and what's working
- **[QUICKSTART.md](QUICKSTART.md)** - Fast start guide with examples
- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[DEVELOPER_SPEC.md](DEVELOPER_SPEC.md)** - Complete technical specification
- **[BUILD_SUMMARY.md](BUILD_SUMMARY.md)** - Build overview and achievements

## 🎯 What You Can Do Right Now

### Without Backend:
- ✅ Use interactive Python console
- ✅ Write and execute real Python code
- ✅ Practice Python concepts
- ✅ Test algorithms and data structures
- ✅ Learn Python syntax and features

### With Backend:
- ✅ Create user accounts
- ✅ Track lesson progress
- ✅ Submit challenge solutions
- ✅ Earn XP and achievements
- ✅ View progress statistics

## 🎮 Try These Examples

### Fibonacci Sequence
```python
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        print(a, end=' ')
        a, b = b, a + b
fib(15)
```

### Prime Numbers
```python
def is_prime(n):
    if n < 2: return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0: return False
    return True

primes = [n for n in range(2, 50) if is_prime(n)]
print(primes)
```

### Classes and OOP
```python
class Dog:
    def __init__(self, name):
        self.name = name
    
    def bark(self):
        return f"{self.name} says Woof!"

buddy = Dog("Buddy")
print(buddy.bark())
```

## 💡 Pro Tips

- **First load**: Takes ~5 seconds to initialize Pyodide
- **Use ↑/↓**: Navigate through command history
- **Shift+Enter**: Execute code
- **Reset button**: Clears Python environment
- **Import libraries**: `import math`, `import random`, etc.

## 🐛 Troubleshooting

### Frontend won't start?
```bash
cd frontend && npm install && npm run dev
```

### Backend database errors?
Check `backend/.env` has correct `DATABASE_URL`

### Console not loading?
Wait 5-10 seconds for Pyodide initialization

### Port already in use?
Change ports in `backend/.env` and `frontend/vite.config.ts`

## 🌟 What Makes This Special

- **Real Python** - Not a simplified interpreter, full CPython via WebAssembly
- **No Installation** - Python runs directly in browser
- **Full Standard Library** - Access to all Python built-in modules
- **Modern Stack** - React, TypeScript, Tailwind, Prisma
- **Production Ready** - Complete auth, security, and API
- **Extensible** - Easy to add lessons and challenges

## 📊 Project Stats

- **15+** React components
- **1,500+** lines of TypeScript
- **Complete** REST API with authentication
- **8** database models
- **Beautiful** responsive UI with dark mode
- **Fast** - Vite for instant hot reload

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- [Pyodide](https://pyodide.org/) - Python running in WebAssembly
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - VSCode's editor
- All the amazing open-source libraries used in this project

## Support

For support, please open an issue on GitHub or contact the maintainers.

---

**Happy Learning! 🚀**
