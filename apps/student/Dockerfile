FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=student --docker

FROM node:18-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
COPY .env .env

ENV HOST=localhost
RUN cat .env && yarn workspace @acme/database generate && \
  sed -i "s/${HOST}:5433/backend-db:5432/g" .env

RUN yarn turbo run build --filter=student...

FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/student/next.config.mjs .
COPY --from=installer /app/apps/student/package.json .
COPY --from=installer /app/node_modules/ ./node_modules

COPY --from=installer --chown=nextjs:nodejs /app/apps/student/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/student/.next/static ./apps/student/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/student/public ./apps/student/public

CMD node apps/student/server.js
