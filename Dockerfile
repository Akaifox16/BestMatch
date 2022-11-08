# Dependency load
FROM node:18-alpine as deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile

# Build
FROM node:18-alpine as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env.development .env.production
RUN yarn build

FROM node:18-alpine as runner

WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -g 1001 -S app
RUN adduser -S nextapp -u 1001

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextapp:app /app/.next/standalone ./
COPY --from=builder --chown=nextapp:app /app/.next/static ./.next/static

USER nextapp
EXPOSE 3000
ENV PORT 3000
CMD [ "node", "server.js" ]