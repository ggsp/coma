#!/bin/bash

# COMA Platform - Quick Setup Script
# This script automates the initial setup of the development environment

set -e  # Exit on error

echo "🚀 COMA Platform - Quick Setup"
echo "================================"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${YELLOW}ℹ${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker Desktop first."
    print_info "Download from: https://www.docker.com/products/docker-desktop/"
    print_info "You can continue without Docker, but you'll need to set up PostgreSQL manually."
    read -p "Continue without Docker? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    SKIP_DOCKER=true
else
    SKIP_DOCKER=false
fi

# Step 1: Copy environment file
echo ""
echo "📝 Step 1: Setting up environment variables..."
if [ -f .env ]; then
    print_info ".env file already exists, skipping..."
else
    cp .env.example .env
    print_success "Created .env file from .env.example"
fi

# Step 2: Start Docker services (if available)
if [ "$SKIP_DOCKER" = false ]; then
    echo ""
    echo "🐳 Step 2: Starting Docker services (PostgreSQL + Redis)..."
    if docker compose up -d; then
        print_success "Docker services started successfully"

        # Wait for PostgreSQL to be ready
        print_info "Waiting for PostgreSQL to be ready..."
        sleep 5

        # Check if PostgreSQL is ready
        until docker compose exec -T postgres pg_isready -U coma > /dev/null 2>&1; do
            echo -n "."
            sleep 1
        done
        echo ""
        print_success "PostgreSQL is ready"
    else
        print_error "Failed to start Docker services"
        exit 1
    fi
else
    echo ""
    print_info "Step 2: Skipping Docker setup (not installed)"
    print_info "Please ensure PostgreSQL is running and DATABASE_URL in .env is correct"
fi

# Step 3: Generate Prisma Client
echo ""
echo "🔧 Step 3: Generating Prisma Client..."
if pnpm --filter @coma/database db:generate; then
    print_success "Prisma Client generated successfully"
else
    print_error "Failed to generate Prisma Client"
    exit 1
fi

# Step 4: Run database migrations
echo ""
echo "📊 Step 4: Running database migrations..."
if pnpm --filter @coma/database db:migrate; then
    print_success "Database migrations completed successfully"
else
    print_error "Failed to run database migrations"
    print_info "Make sure PostgreSQL is running and DATABASE_URL in .env is correct"
    exit 1
fi

# Step 5: Seed the database (optional)
echo ""
read -p "🌱 Do you want to seed the database with sample data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Step 5: Seeding database with sample data..."
    if pnpm --filter @coma/database db:seed; then
        print_success "Database seeded successfully"
        print_info "Sample data includes:"
        echo "   - 5 users (researchers, funders, admin)"
        echo "   - 4 funding organizations"
        echo "   - 5 research projects"
        echo "   - 3 community spaces"
        echo "   - Sample posts and comments"
    else
        print_error "Failed to seed database"
        exit 1
    fi
else
    print_info "Skipping database seed"
fi

# Final success message
echo ""
echo "================================"
echo -e "${GREEN}✨ Setup completed successfully!${NC}"
echo "================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Start the development server:"
echo "   ${YELLOW}pnpm dev${NC}"
echo ""
echo "2. Open the application:"
echo "   English: ${YELLOW}http://localhost:3000/en${NC}"
echo "   German:  ${YELLOW}http://localhost:3000/de${NC}"
echo ""
echo "3. View database in Prisma Studio:"
echo "   ${YELLOW}pnpm --filter @coma/database db:studio${NC}"
echo ""
echo "For more information, see:"
echo "   - ${YELLOW}README.md${NC} - Project overview"
echo "   - ${YELLOW}SETUP.md${NC} - Detailed setup guide"
echo ""
