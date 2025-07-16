FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

# Copy root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy all app directories
COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN pnpm install

# Build the applications
RUN pnpm build

# Expose port
EXPOSE 3000

# Start the frontend (change this based on which service you want to run)
CMD ["pnpm", "--filter=frontend", "start"]