# AGENTS

Guidance for contributors and AI agents working in this repository.

## Project Goals

- Explore monorepo workflows with pnpm workspaces.
- Run a Next.js frontend and NestJS backend side-by-side.
- Containerize both services for Docker Compose and Docker Swarm.

## Structure

- `apps/nextjs`: Next.js app (App Router + Tailwind + Biome)
- `apps/nestjs`: NestJS server
- `docker-compose.yml`: two-service setup
- `pnpm-workspace.yaml`: workspace configuration

## Conventions

- Prefer pnpm workspace commands from repo root.
- Avoid installing dependencies inside `apps/*` directly.
- Keep Dockerfiles app-specific under each app directory.
- Use Biome for Next.js formatting/linting (no ESLint).

## Common Commands

```
pnpm install
pnpm --filter nextjs dev
pnpm --filter nestjs start:dev

docker compose build
docker compose up
```

## Ports

- Next.js: `3000`
- NestJS: `3001`

