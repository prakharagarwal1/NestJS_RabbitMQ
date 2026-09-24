# syntax=docker/dockerfile:1

FROM node:22-alpine

WORKDIR /app

# Install all dependencies (including devDeps for watch mode)
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps --ignore-scripts

# Copy config files
COPY tsconfig*.json nest-cli.json ./

COPY src ./src

ENV NODE_ENV=development
ENV PORT=3000

EXPOSE 3000

# Watch mode with --poll: recompiles and restarts on source changes.
# --poll uses filesystem polling instead of inotify, which is needed
# for bind mounts to work reliably on Windows / Docker Desktop.
CMD ["npm", "run", "start:dev", "--", "--poll"]