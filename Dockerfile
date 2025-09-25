# ===========================================
# Multi-stage Dockerfile for Indicium Backend
# Optimized for production with minimal image size
# ===========================================

# ===========================================
# Stage 1: Base Image with System Dependencies
# ===========================================
FROM node:22-slim AS base

# Install system dependencies in a single layer
RUN apt-get update && apt-get install -y --no-install-recommends \
    # Essential build tools
    build-essential \
    pkg-config \
    # Graphics libraries for potential image processing
    libfontconfig1 \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    # Chromium dependencies (if needed for PDF generation)
    chromium \
    chromium-l10n \
    libnss3 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libcups2 \
    libgtk-3-0 \
    # Clean up apt cache
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Install pnpm globally
RUN npm install -g pnpm@latest

# ===========================================
# Stage 2: Dependencies Installation
# ===========================================
FROM base AS deps

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install dependencies with optimizations
RUN pnpm install --frozen-lockfile --prod=false

# ===========================================
# Stage 3: Build Stage
# ===========================================
FROM deps AS builder

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm generate

# Build the application
RUN pnpm build

# ===========================================
# Stage 4: Production Dependencies
# ===========================================
FROM base AS prod-deps

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod=true

# ===========================================
# Stage 5: Production Image
# ===========================================
FROM base AS production

# Create non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Set working directory
WORKDIR /app

# Copy production dependencies
COPY --from=prod-deps /app/node_modules ./node_modules

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma-outputs ./prisma-outputs

# Copy necessary files for runtime
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

# Create directories for data and logs
RUN mkdir -p /app/data /app/logs && \
    chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8080/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Expose port
EXPOSE 8080

# Start the application
CMD ["node", "dist/server.js"]