FROM node:20-alpine AS deps
WORKDIR /app

RUN corepack enable
RUN pnpm config set store-dir /app/.pnpm-store

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/nextjs/package.json apps/nextjs/package.json

RUN pnpm install --filter nextjs... --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app

ENV PNPM_STORE_PATH=/app/.pnpm-store

RUN corepack enable
RUN pnpm config set store-dir /app/.pnpm-store

COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/.pnpm-store /app/.pnpm-store
COPY --from=deps /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=deps /app/package.json /app/package.json
COPY --from=deps /app/pnpm-workspace.yaml /app/pnpm-workspace.yaml
COPY --from=deps /app/apps/nextjs/package.json /app/apps/nextjs/package.json

COPY apps/nextjs apps/nextjs
COPY --from=deps /app/apps/nextjs/node_modules /app/apps/nextjs/node_modules

RUN pnpm --filter nextjs build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/apps/nextjs/.next/standalone ./
COPY --from=builder /app/apps/nextjs/.next/static ./apps/nextjs/.next/static
COPY --from=builder /app/apps/nextjs/public ./apps/nextjs/public

WORKDIR /app/apps/nextjs

EXPOSE 3000

CMD ["node", "server.js"]
