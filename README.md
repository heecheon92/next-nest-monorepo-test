# Next + Nest Monorepo (Docker)

This repository is a learning workspace for:
- Monorepo structure with pnpm workspaces
- Next.js (frontend) + NestJS (backend)
- Dockerized local development and deployable containers (Docker Compose now, Swarm later)

## Repository Structure

```
.
├── apps
│   ├── nextjs        # Next.js app (App Router + Tailwind + Biome)
│   └── nestjs        # NestJS API server
├── .codex
├── .agents
├── docker-compose.yml
├── pnpm-workspace.yaml
└── package.json
```

## Requirements

- Node.js 20+
- pnpm 9+
- Docker (for containers)

## Getting Started (Local)

Install dependencies from the repo root:

```
pnpm install
```

Run both apps in dev mode:

```
pnpm --filter nextjs dev
pnpm --filter nestjs start:dev
```

- Next.js: http://localhost:3000
- NestJS: http://localhost:3001

## Docker (Two Containers)

Build and run both services:

```
docker compose build
docker compose up
```

- Next.js: http://localhost:3000
- NestJS: http://localhost:3001

## Notes

- Next.js is configured for `output: "standalone"` to run efficiently in production containers.
- NestJS defaults to port `3001` and listens on `0.0.0.0` inside containers.
- This repo is intended for experimentation; expect structure and tooling to evolve.

## Useful Commands

```
pnpm --filter nextjs build
pnpm --filter nestjs build
pnpm --filter nextjs lint
pnpm --filter nestjs test
```

