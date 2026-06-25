# AI Habit Tracker RPG

Production-grade AI-powered Habit Tracker with RPG gamification, AI coaching, and comprehensive analytics.

> 🚀 **Status**: Foundation phase. Core features under active development.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM, Server Actions
- **Database**: PostgreSQL
- **Cache**: Redis
- **Authentication**: Better Auth
- **AI**: Gemini API with streaming responses
- **State Management**: Zustand, React Query
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Testing**: Vitest, Playwright
- **Deployment**: Docker, Vercel
- **Monitoring**: Sentry

## Implemented Features

### Authentication
- ✅ Better Auth integration
- ✅ Google OAuth
- ✅ GitHub OAuth
- ✅ Session management

### Core Tracking
- ⏳ Habit creation and management
- ⏳ Daily habit logging
- ⏳ Habit categories
- ⏳ Difficulty levels

### Dashboard (Planned)
- 📋 Today's overview
- 📋 Recent activity
- 📋 Quick stats

### RPG Progression (Planned)
- 🎮 Experience points (XP)
- 🎮 Level system
- 🎮 Coin economy
- 🎮 Achievement badges
- 🎮 Daily/Weekly quests

### AI Coach (Planned)
- 🤖 Habit analysis
- 🤖 Personalized coaching
- 🤖 Progress insights
- 🤖 Adaptive recommendations

### Analytics (Planned)
- 📊 Completion rates
- 📊 Progress heatmaps
- 📊 Weekly/Monthly summaries
- 📊 CSV/PDF export

### Social Features (Planned)
- 👥 Friends system
- 👥 Leaderboards
- 👥 Activity sharing
- 👥 Social challenges

### PWA (Planned)
- 📱 Installable app
- 📱 Offline support
- 📱 Push notifications
- 📱 Background sync

## Getting Started

### Prerequisites

- Node.js >= 18.17.0
- PostgreSQL >= 14
- Redis

### Installation

```bash
# Clone repository
git clone https://github.com/pankajfarkade91-sys/ai-habit-tracker-rpg.git
cd ai-habit-tracker-rpg

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your values

# Setup database
npm run db:migrate:dev
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run format          # Format code with Prettier
npm run format:check    # Check formatting
npm run type-check      # Check TypeScript
npm run validate        # Run all quality checks

# Testing
npm run test            # Run unit tests
npm run test:ui         # Run tests with UI
npm run test:coverage   # Generate coverage report
npm run test:e2e        # Run end-to-end tests
npm run test:e2e:ui     # Run E2E tests with UI
npm run test:e2e:debug  # Debug E2E tests

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema to database
npm run db:migrate:dev  # Create and apply migration
npm run db:migrate:deploy # Apply migrations (production)
npm run db:seed         # Seed database with starter data
npm run db:reset        # Reset database
npm run db:studio       # Open Prisma Studio

# Docker
npm run docker:build    # Build Docker image
npm run docker:up       # Start Docker containers
npm run docker:down     # Stop Docker containers
npm run docker:logs     # View Docker logs
```

## Project Structure

```
ai-habit-tracker-rpg/
├── app/                 # Next.js app router
│   ├── (auth)/         # Auth layout group
│   ├── (dashboard)/    # Dashboard layout group
│   ├── api/            # API routes
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components
│   ├── forms/          # Form components
│   └── ...
├── features/            # Feature modules
│   ├── auth/
│   ├── habits/
│   ├── dashboard/
│   ├── rpg/
│   └── ...
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and helpers
├── server/              # Server actions and utilities
├── services/            # External service integrations
├── store/               # Zustand stores
├── types/               # TypeScript types
├── utils/               # Helper functions
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── scripts/             # Build and utility scripts
└── tests/               # Test files
```

## Environment Variables

See `.env.example` for all required variables. Never commit `.env.local`.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Session encryption key
- `GEMINI_API_KEY` - Server-side only, never public
- `REDIS_URL` - Redis connection string

## Security

- Better Auth for authentication and session management
- Zod for runtime input validation
- Server-side validation on all API endpoints
- Rate limiting on sensitive endpoints
- HTTPS security headers
- CSRF protection via Better Auth
- Secrets never exposed to client

## Performance

- Next.js 15 with optimized builds
- React 19 with automatic batching
- Server-side rendering and static generation
- Image optimization with AVIF/WebP
- Code splitting and lazy loading
- Database query optimization
- Redis caching layer

## Testing Strategy

- **Unit Tests**: Vitest for components and utilities
- **Integration Tests**: API route testing
- **E2E Tests**: Playwright for user workflows
- **Coverage Target**: >80%

## Deployment

Optimized for:
- **Vercel** (recommended for Next.js)
- **Docker** containers
- **Traditional** Linux servers

## Development Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit
3. Run validation: `npm run validate`
4. Push and create pull request
5. CI/CD checks run automatically

## Contributing

This is a personal project. For issues or improvements, please create GitHub issues.

## License

MIT

## Support

For issues, questions, or suggestions, please use [GitHub Issues](https://github.com/pankajfarkade91-sys/ai-habit-tracker-rpg/issues).
