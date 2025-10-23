#!/bin/bash

# COMA Platform - Development Helper Script
# Quick commands for common development tasks

set -e

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}$1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Show usage if no argument
if [ $# -eq 0 ]; then
    echo "COMA Platform - Development Helper"
    echo ""
    echo "Usage: ./dev.sh [command]"
    echo ""
    echo "Commands:"
    echo "  start         Start development server"
    echo "  build         Build all packages"
    echo "  db:studio     Open Prisma Studio (database GUI)"
    echo "  db:migrate    Run database migrations"
    echo "  db:seed       Seed database with sample data"
    echo "  db:reset      Reset database (WARNING: deletes all data)"
    echo "  lint          Run linting"
    echo "  format        Format code with Prettier"
    echo "  type-check    Run TypeScript type checking"
    echo "  clean         Clean build artifacts and node_modules"
    echo "  docker:up     Start Docker services"
    echo "  docker:down   Stop Docker services"
    echo "  docker:logs   View Docker logs"
    echo ""
    exit 0
fi

COMMAND=$1

case $COMMAND in
    start)
        print_header "Starting development server..."
        pnpm dev
        ;;

    build)
        print_header "Building all packages..."
        pnpm build
        ;;

    db:studio)
        print_header "Opening Prisma Studio..."
        print_info "Prisma Studio will open at http://localhost:5555"
        pnpm --filter @coma/database db:studio
        ;;

    db:migrate)
        print_header "Running database migrations..."
        pnpm --filter @coma/database db:migrate
        print_success "Migrations completed"
        ;;

    db:seed)
        print_header "Seeding database..."
        pnpm --filter @coma/database db:seed
        print_success "Database seeded"
        ;;

    db:reset)
        print_header "Resetting database..."
        echo -e "${YELLOW}WARNING: This will delete ALL data!${NC}"
        read -p "Are you sure? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            pnpm --filter @coma/database prisma migrate reset
            print_success "Database reset completed"
        else
            print_info "Database reset cancelled"
        fi
        ;;

    lint)
        print_header "Running linting..."
        pnpm lint
        print_success "Linting completed"
        ;;

    format)
        print_header "Formatting code..."
        pnpm format
        print_success "Code formatted"
        ;;

    type-check)
        print_header "Running TypeScript type checking..."
        pnpm type-check
        print_success "Type checking completed"
        ;;

    clean)
        print_header "Cleaning build artifacts..."
        echo "Removing .next, .turbo, dist, and node_modules..."
        pnpm clean
        rm -rf node_modules
        find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
        print_success "Clean completed"
        print_info "Run 'pnpm install' to reinstall dependencies"
        ;;

    docker:up)
        print_header "Starting Docker services..."
        docker compose up -d
        print_success "Docker services started"
        print_info "PostgreSQL: localhost:5432"
        print_info "Redis: localhost:6379"
        ;;

    docker:down)
        print_header "Stopping Docker services..."
        docker compose down
        print_success "Docker services stopped"
        ;;

    docker:logs)
        print_header "Docker logs (Ctrl+C to exit)..."
        docker compose logs -f
        ;;

    *)
        echo "Unknown command: $COMMAND"
        echo "Run './dev.sh' without arguments to see available commands"
        exit 1
        ;;
esac
