FROM node:18-alpine as build

FROM base AS builder

RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune frontend --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN yarn install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .

RUN yarn turbo build --filter=frontend...

FROM ubuntu as runner

RUN apt-get update
RUN apt-get install nginx -y

COPY --from=installer /app/dist /var/www/html/

EXPOSE 80
CMD ["nginx","-g","daemon off;"]