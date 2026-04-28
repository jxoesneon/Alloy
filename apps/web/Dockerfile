# Build stage
FROM node:25-alpine AS builder

# Install build dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.33.0

# Copy root configurations
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc* ./

# Copy all package.json files for workspace-aware install
COPY packages/engine/package.json ./packages/engine/
COPY packages/schema/package.json ./packages/schema/
COPY packages/telemetry/package.json ./packages/telemetry/
COPY packages/tools/package.json ./packages/tools/
COPY packages/i18n/package.json ./packages/i18n/
COPY packages/registry/package.json ./packages/registry/
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the source
COPY . .

# Build all packages and the web app
RUN pnpm --filter=web... build

# Runtime stage
FROM nginx:alpine

# Copy built static files to Nginx public directory
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
