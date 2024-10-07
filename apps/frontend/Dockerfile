FROM node:20-alpine AS alpine

RUN apk update
RUN apk add --no-cache libc6-compat

FROM alpine AS base

RUN npm install pnpm turbo --global
RUN pnpm config set store-dir ~/.pnpm-store

FROM base AS pruner

WORKDIR /app
COPY . .
RUN turbo prune frontend --docker

FROM base AS builder

WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

# Build the project and its dependencies
COPY --from=pruner /app/out/full/ .

# these values are fine to be public, can also use build time args but this is easier for now
ENV VITE_API_HOST=http://3.94.131.159:3001/
ENV VITE_REGION=us-east-1
ENV VITE_USER_POOL_ID=us-east-1_KvEgTmwzv
ENV VITE_CLIENT_ID=lmubjg1u349bcc9ptbaa6v300

RUN turbo build --filter=frontend...
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --no-optional
RUN rm -rf ./**/*/src

FROM nginx AS runner

COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx","-g","daemon off;"]