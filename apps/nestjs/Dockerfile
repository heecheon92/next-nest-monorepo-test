FROM node:20-alpine AS deps
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml ./
COPY apps/nestjs/package.json apps/nestjs/package.json

RUN pnpm install --filter nestjs...

FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=deps /app/package.json /app/package.json
COPY --from=deps /app/pnpm-workspace.yaml /app/pnpm-workspace.yaml
COPY --from=deps /app/apps/nestjs/package.json /app/apps/nestjs/package.json

COPY apps/nestjs apps/nestjs

RUN pnpm --filter nestjs build
RUN pnpm --filter nestjs prune --prod

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/apps/nestjs/package.json /app/apps/nestjs/package.json
COPY --from=builder /app/apps/nestjs/dist /app/apps/nestjs/dist

WORKDIR /app/apps/nestjs

EXPOSE 3001

CMD ["node", "dist/main"]
