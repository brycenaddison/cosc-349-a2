ARG AWS_REGION
ARG AWS_USER_POOL_ID
ARG AWS_CLIENT_ID

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

ARG AWS_REGION
ARG AWS_USER_POOL_ID
ARG AWS_CLIENT_ID
ENV VITE_REGION=${AWS_REGION}
ENV VITE_USER_POOL_ID=${AWS_USER_POOL_ID}
ENV VITE_CLIENT_ID=${AWS_CLIENT_ID}

RUN turbo build --filter=frontend...
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --no-optional
RUN rm -rf ./**/*/src

FROM nginx AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx","-g","daemon off;"]