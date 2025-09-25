#!/bin/bash

# ===========================================
# Docker Build Script for Indicium Backend
# ===========================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="indicium-backend"
TAG=${1:-latest}
BUILD_TARGET=${2:-production}

echo -e "${BLUE}🚀 Building Indicium Backend Docker Image${NC}"
echo -e "${YELLOW}Image: ${IMAGE_NAME}:${TAG}${NC}"
echo -e "${YELLOW}Target: ${BUILD_TARGET}${NC}"
echo ""

# Clean up previous builds
echo -e "${YELLOW}🧹 Cleaning up previous builds...${NC}"
docker system prune -f --volumes || true

# Build the image
echo -e "${YELLOW}🔨 Building Docker image...${NC}"
docker build \
    --target ${BUILD_TARGET} \
    --tag ${IMAGE_NAME}:${TAG} \
    --tag ${IMAGE_NAME}:latest \
    --build-arg BUILDKIT_INLINE_CACHE=1 \
    --progress=plain \
    .

# Show image size
echo -e "${GREEN}✅ Build completed successfully!${NC}"
echo -e "${BLUE}📊 Image Information:${NC}"
docker images ${IMAGE_NAME}:${TAG} --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"

# Show image layers (optional)
if [ "$3" = "--show-layers" ]; then
    echo -e "${BLUE}🔍 Image Layers:${NC}"
    docker history ${IMAGE_NAME}:${TAG}
fi

echo -e "${GREEN}🎉 Build process completed!${NC}"
echo -e "${YELLOW}To run the container:${NC}"
echo -e "  docker run -p 8080:8080 ${IMAGE_NAME}:${TAG}"
echo -e "${YELLOW}To run with docker-compose:${NC}"
echo -e "  docker-compose up -d"
