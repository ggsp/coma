# COMA - Research & Funding Community Platform

> Discover what has been researched, funded, and learned — and connect with the people behind it.

## Overview

COMA is a digital platform where researchers, funding bodies, and the public can explore past and ongoing research projects, see where funds went, and engage in topic-based communities to improve collaboration and funding allocation decisions.

## Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **TailwindCSS** + **shadcn/ui**
- **next-intl** (i18n for EN + DE)
- **React 19**
- **TypeScript**

### Backend
- **Next.js API routes**
- **Prisma ORM**
- **PostgreSQL**
- **Redis** (caching)

### Infrastructure
- **Turborepo** (monorepo)
- **pnpm** (package manager)
- **Docker Compose** (local development)

## Project Structure

```
coma-1/
├── apps/
│   └── web/              # Next.js frontend application
├── packages/
│   ├── database/         # Prisma schema and client
│   ├── types/            # Shared TypeScript types
│   ├── config/           # Shared configurations
│   └── ui/               # Shared UI components (future)
├── docker-compose.yml    # PostgreSQL + Redis services
└── turbo.json           # Turborepo configuration
```

## Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0
- **Docker** and **Docker Compose** (recommended)

### Quick Start (Automated)

We provide a setup script that automates the entire setup process:

```bash
# 1. Clone the repository
git clone <repository-url>
cd coma-1

# 2. Install dependencies
pnpm install

# 3. Run the setup script
./setup.sh
```

The setup script will:
- Copy environment variables
- Start Docker services (PostgreSQL + Redis)
- Generate Prisma client
- Run database migrations
- Optionally seed the database with sample data

### Manual Setup

If you prefer to set up manually, follow these steps:

1. **Install dependencies**

```bash
pnpm install
```

2. **Set up environment variables**

```bash
cp .env.example .env
```

Edit [.env](.env) with your configuration (the defaults work for local development).

3. **Start the database services**

```bash
docker compose up -d
```

This starts PostgreSQL and Redis containers.

4. **Generate Prisma client and run migrations**

```bash
pnpm --filter @coma/database db:generate
pnpm --filter @coma/database db:migrate
```

5. **Seed the database (optional)**

```bash
pnpm --filter @coma/database db:seed
```

6. **Start the development server**

```bash
pnpm dev
```

The application will be available at:
- **English**: http://localhost:3000/en
- **German**: http://localhost:3000/de

### Development Helper Script

We also provide a development helper script for common tasks:

```bash
./dev.sh start         # Start development server
./dev.sh db:studio     # Open Prisma Studio
./dev.sh db:seed       # Seed database
./dev.sh docker:up     # Start Docker services
./dev.sh               # See all available commands
```

## Development Commands

### Root commands (run from project root)

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps
- `pnpm lint` - Lint all apps
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript type checking

### Database commands

- `pnpm --filter @coma/database db:generate` - Generate Prisma client
- `pnpm --filter @coma/database db:migrate` - Run database migrations
- `pnpm --filter @coma/database db:push` - Push schema changes without migrations
- `pnpm --filter @coma/database db:seed` - Seed the database
- `pnpm --filter @coma/database db:studio` - Open Prisma Studio

### Web app commands

- `pnpm --filter @coma/web dev` - Start Next.js dev server
- `pnpm --filter @coma/web build` - Build Next.js app
- `pnpm --filter @coma/web start` - Start production server

## Database Schema

The platform uses the following core entities:

- **User** - Platform users (researchers, funders, admins)
- **Profile** - Extended user profiles with ORCID, bio, research areas
- **Funder** - Funding organizations
- **Project** - Research projects with funding details
- **Tag** - Categorization tags for projects
- **Space** - Topic-based discussion spaces
- **Post** - Community posts within spaces
- **Comment** - Comments on posts
- **Annotation** - Funder/admin notes on projects

See [packages/database/prisma/schema.prisma](packages/database/prisma/schema.prisma) for the full schema.

## Environment Variables

Key environment variables (see [.env.example](.env.example)):

- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `NEXT_PUBLIC_APP_URL` - Public application URL
- `NEXTAUTH_URL` - NextAuth callback URL
- `NEXTAUTH_SECRET` - NextAuth encryption secret

## Internationalization

The platform supports English (en) and German (de) languages using next-intl.

Translation files are located in [apps/web/src/messages/](apps/web/src/messages/).

## MVP Development Phases

### Phase 1 - Foundation (Weeks 1-3) ✅
- [x] Repository setup with Turborepo
- [x] Database schema and migrations
- [x] Next.js app with i18n
- [x] Basic UI framework

### Phase 2 - Core Features (Weeks 4-7)
- [ ] Project Explorer with search/filter
- [ ] Researcher & Funder profiles
- [ ] Authentication (Google, ORCID)
- [ ] Community Spaces
- [ ] CSV data import

### Phase 3 - Polishing (Weeks 8-12)
- [ ] Advanced search & filters
- [ ] Role-based access control
- [ ] Moderation tools
- [ ] Analytics dashboard
- [ ] Semantic search (Azure AI Search)

## Contributing

This project follows the monorepo structure with Turborepo. Each package and app has its own `package.json` and can be developed independently.

## License

[To be determined]
