# COMA Platform - Setup Guide

This guide will help you set up the COMA platform development environment.

## Prerequisites

Before starting, ensure you have:

- **Node.js** >= 20.0.0 ([Download](https://nodejs.org/))
- **pnpm** >= 9.0.0 (will be installed automatically with corepack or npm)
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop/))
- **PostgreSQL** (via Docker or local installation)
- **Redis** (via Docker or local installation)

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

This command installs all dependencies for all packages in the monorepo.

### 2. Start Database Services

**Option A: Using Docker (Recommended)**

```bash
docker compose up -d
```

This starts PostgreSQL and Redis containers in the background.

**Option B: Without Docker**

If you don't have Docker installed, you'll need to:

1. Install PostgreSQL locally:
   - macOS: `brew install postgresql@16 && brew services start postgresql@16`
   - Ubuntu/Debian: `sudo apt install postgresql-16`
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/)

2. Create the database:
   ```bash
   createdb coma_dev
   ```

3. Update the `.env` file with your local PostgreSQL credentials:
   ```
   DATABASE_URL="postgresql://your_user:your_password@localhost:5432/coma_dev"
   ```

4. (Optional) Install Redis locally:
   - macOS: `brew install redis && brew services start redis`
   - Ubuntu/Debian: `sudo apt install redis-server`
   - Windows: Use WSL or download from [redis.io](https://redis.io/download)

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit [.env](.env) if you're using different database credentials or ports.

### 4. Generate Prisma Client

```bash
pnpm --filter @coma/database db:generate
```

This generates the Prisma client based on your schema.

### 5. Run Database Migrations

```bash
pnpm --filter @coma/database db:migrate
```

This creates all necessary database tables.

### 6. Seed the Database (Optional)

```bash
pnpm --filter @coma/database db:seed
```

This populates the database with sample data:
- 5 users (researchers, funders, admin)
- 4 funding organizations
- 5 research projects
- 3 community spaces
- Sample posts and comments

### 7. Start the Development Server

```bash
pnpm dev
```

The application will be available at:
- **English**: http://localhost:3000/en
- **German**: http://localhost:3000/de

## Verification

To verify your setup is working correctly:

1. **Check database connection**:
   ```bash
   pnpm --filter @coma/database db:studio
   ```
   This opens Prisma Studio at http://localhost:5555

2. **Check web app**:
   Open http://localhost:3000/en in your browser
   You should see the COMA landing page

3. **Check TypeScript compilation**:
   ```bash
   pnpm type-check
   ```

4. **Check linting**:
   ```bash
   pnpm lint
   ```

## Common Issues

### Issue: pnpm not found

**Solution**: Install pnpm globally:
```bash
npm install -g pnpm
# or use corepack
corepack enable
corepack prepare pnpm@latest --activate
```

### Issue: Docker daemon not running

**Solution**: Start Docker Desktop application, or install and configure Docker for your platform.

### Issue: Port 5432 already in use

**Solution**: Either:
1. Stop your existing PostgreSQL instance
2. Change the port in `docker-compose.yml` and update `DATABASE_URL` in `.env`

### Issue: Port 3000 already in use

**Solution**: The Next.js dev server will automatically try port 3001. Or stop the process using port 3000:
```bash
# Find process on port 3000
lsof -ti:3000
# Kill the process (use the PID from above command)
kill -9 <PID>
```

### Issue: Prisma migration fails

**Solution**:
1. Ensure the database is running and accessible
2. Check your `DATABASE_URL` in `.env`
3. Try resetting the database:
   ```bash
   pnpm --filter @coma/database prisma migrate reset
   ```

## Development Workflow

### Making Database Changes

1. Edit [packages/database/prisma/schema.prisma](packages/database/prisma/schema.prisma)
2. Create a migration:
   ```bash
   pnpm --filter @coma/database db:migrate
   ```
3. Regenerate Prisma client:
   ```bash
   pnpm --filter @coma/database db:generate
   ```

### Adding New Packages

To add a dependency to a specific package:

```bash
# Add to web app
pnpm --filter @coma/web add package-name

# Add to database package
pnpm --filter @coma/database add package-name

# Add as dev dependency
pnpm --filter @coma/web add -D package-name
```

### Running Individual Apps

```bash
# Run only the web app
pnpm --filter @coma/web dev

# Build only the web app
pnpm --filter @coma/web build
```

### Database Management Commands

```bash
# Open Prisma Studio (database GUI)
pnpm --filter @coma/database db:studio

# Reset database (WARNING: deletes all data)
pnpm --filter @coma/database prisma migrate reset

# Push schema changes without creating migration
pnpm --filter @coma/database db:push

# View database in Prisma Studio
pnpm --filter @coma/database db:studio
```

## Project Structure

```
coma-1/
├── apps/
│   └── web/                  # Next.js frontend application
│       ├── src/
│       │   ├── app/          # Next.js 15 App Router
│       │   │   └── [locale]/ # i18n routes
│       │   ├── i18n/         # i18n configuration
│       │   └── messages/     # Translation files (en.json, de.json)
│       ├── public/           # Static assets
│       └── package.json
│
├── packages/
│   ├── database/             # Prisma ORM & database
│   │   ├── prisma/
│   │   │   └── schema.prisma # Database schema
│   │   ├── src/
│   │   │   ├── index.ts      # Prisma client export
│   │   │   └── seed.ts       # Database seed script
│   │   └── package.json
│   │
│   ├── types/                # Shared TypeScript types
│   │   ├── src/
│   │   │   └── index.ts      # Type definitions
│   │   └── package.json
│   │
│   └── config/               # Shared configurations
│       ├── typescript/       # TypeScript configs
│       └── package.json
│
├── docker-compose.yml        # PostgreSQL + Redis services
├── turbo.json               # Turborepo configuration
├── pnpm-workspace.yaml      # pnpm workspace configuration
├── .env.example             # Environment variables template
└── package.json             # Root package.json
```

## Next Steps

Now that your environment is set up, you can:

1. **Explore the database** using Prisma Studio: `pnpm --filter @coma/database db:studio`
2. **Start building features** - Begin with the Project Explorer (Phase 2)
3. **Add UI components** - Set up shadcn/ui components as needed
4. **Review the documentation**:
   - [ASPIRATIONAL_PLAN.md](ASPIRATIONAL_PLAN.md) - Overall product vision
   - [specifications/SLICE_AND_DICE.md](specifications/SLICE_AND_DICE.md) - Development phases
   - [specifications/CORE_TRUTHS.md](specifications/CORE_TRUTHS.md) - Core principles

## Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [next-intl Documentation](https://next-intl.dev/)
- [Turborepo Documentation](https://turbo.build/repo/docs)

## Getting Help

If you encounter issues:

1. Check this setup guide first
2. Review the Common Issues section
3. Check the existing documentation in the repo
4. Consult the official documentation for the relevant tool

## Development Environment

- **Node.js**: v20+
- **Package Manager**: pnpm v10.19.0
- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL 16
- **ORM**: Prisma 6
- **Styling**: TailwindCSS 3
- **i18n**: next-intl 4
- **Monorepo**: Turborepo 2
