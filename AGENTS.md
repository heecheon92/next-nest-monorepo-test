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
- Use Biome for formatting/linting (no ESLint).

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

**Next.js Initialization**: When starting work on a Next.js project, automatically
call the `init` tool from the next-devtools-mcp server FIRST. This establishes
proper context and ensures all Next.js queries use official documentation.

## Notes

- Code format must follow Biome configs. You can check if you work is coherent to the rest of codebase with "pnpm biome".
- During the biome linting, if you encounter "no await" in async function, you can ignore that case if the file is marked with "use cache" directive because the directive requires a page function to be async even though the function does not utilize any async function.
- When you add a new API, make sure that added code is sorted by API number. Do not insert the api into an arbitrary spot.
- Suggest user to commit changes instead of waiting for users to tell you to commit.

## Skills usage

- Use skills only when the request clearly matches their scope or the user explicitly asks for them.
- If the user explicitly asks not to use a skill, honor that request for the session.
