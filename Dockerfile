# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install production dependencies for server
COPY package*.json ./
COPY server.js ./
RUN npm install express compression helmet morgan dotenv greenlock-express

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Create greenlock directory for Let's Encrypt
RUN mkdir -p ./greenlock.d

# Expose ports
EXPOSE 3000 443

# Run as non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Start the server
CMD ["node", "server.js"]