FROM node:20-alpine AS deps
WORKDIR /app

RUN corepack enable
RUN pnpm config set store-dir /app/.pnpm-store

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/nestjs/package.json apps/nestjs/package.json

RUN pnpm install --filter nestjs... --frozen-lockfile

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
COPY --from=deps /app/apps/nestjs/package.json /app/apps/nestjs/package.json

COPY apps/nestjs apps/nestjs
COPY --from=deps /app/apps/nestjs/node_modules /app/apps/nestjs/node_modules

RUN pnpm --filter nestjs build
RUN pnpm -C apps/nestjs prune --prod --no-optional

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/apps/nestjs/package.json /app/apps/nestjs/package.json
COPY --from=builder /app/apps/nestjs/dist /app/apps/nestjs/dist
COPY --from=builder /app/apps/nestjs/node_modules /app/apps/nestjs/node_modules

WORKDIR /app/apps/nestjs

EXPOSE 3001

CMD ["node", "dist/main"]
