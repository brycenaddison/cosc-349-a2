FROM node:18-alpine AS alpine

RUN apk update
RUN apk add --no-cache libc6-compat

FROM alpine AS base

RUN npm install pnpm turbo --global
RUN pnpm config set store-dir ~/.pnpm-store

FROM base AS pruner

WORKDIR /app
COPY . .
RUN turbo prune api --docker

FROM base AS builder

WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

# Build the project and its dependencies
COPY --from=pruner /app/out/full/ .

RUN turbo build --filter=api...
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --no-optional
RUN rm -rf ./**/*/src

FROM alpine AS runner

RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs

WORKDIR /app
COPY --from=builder --chown=expressjs/expressjs /app .

CMD node apps/api/dist/index.js
