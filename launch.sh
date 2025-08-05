#!/bin/bash

# Markdown Editor Production Launcher
# This script provides an easy way to launch the server on bare metal

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js $(node -v) detected"

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        print_status ".env file created. Please edit it with your configuration."
        echo "Opening .env file for editing..."
        ${EDITOR:-nano} .env
    else
        print_error ".env.example file not found!"
        exit 1
    fi
fi

# Check if dist folder exists
if [ ! -d dist ]; then
    print_warning "Build folder not found. Building the application..."
    npm run build
    print_status "Build completed"
fi

# Install server dependencies if needed
if [ ! -d node_modules/express ]; then
    print_warning "Server dependencies not found. Installing..."
    npm install express compression helmet morgan dotenv greenlock-express
    print_status "Dependencies installed"
fi

# Check if PM2 is available
if command -v pm2 &> /dev/null; then
    print_status "PM2 detected. Using PM2 for process management."
    
    # Check if the app is already running
    if pm2 list | grep -q "markdown-editor"; then
        print_warning "Markdown Editor is already running. Restarting..."
        pm2 restart markdown-editor
    else
        print_status "Starting Markdown Editor with PM2..."
        pm2 start server.js --name markdown-editor
        pm2 save
        print_status "PM2 startup configuration saved"
    fi
    
    echo ""
    echo "Markdown Editor is running!"
    echo "Commands:"
    echo "  pm2 logs markdown-editor    - View logs"
    echo "  pm2 status                  - Check status"
    echo "  pm2 stop markdown-editor    - Stop server"
    echo "  pm2 restart markdown-editor - Restart server"
else
    print_warning "PM2 not found. Starting with Node.js directly..."
    print_warning "For production, consider installing PM2: npm install -g pm2"
    echo ""
    print_status "Starting Markdown Editor..."
    node server.js
fi