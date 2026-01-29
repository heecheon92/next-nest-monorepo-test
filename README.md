# Next + Nest 모노레포 (Docker)

이 저장소는 다음을 학습/실험하기 위한 워크스페이스입니다:
- pnpm 워크스페이스 기반 모노레포 구조
- Next.js(프론트엔드) + NestJS(백엔드)
- Docker Compose / Docker Swarm으로 컨테이너화 및 배포

## 레포 구조

```
.
├── apps
│   ├── nextjs        # Next.js 앱 (App Router + Tailwind + Biome)
│   └── nestjs        # NestJS API 서버
├── .codex
├── .agents
├── docker-compose.yml
├── docker-stack.yml
├── .gitignore
├── pnpm-workspace.yaml
└── package.json
```

## 요구사항

- Node.js 20+
- pnpm 9+
- Docker (컨테이너 실행)

## 로컬 시작하기

루트에서 의존성 설치:

```
pnpm install
```

개발 모드로 두 앱 실행:

```
pnpm dev
```

- Next.js: http://localhost:3000
- NestJS: http://localhost:3001

## Docker (두 컨테이너)

빌드 및 실행:

```
docker compose build
docker compose up
```

- Next.js: http://localhost:3000
- NestJS: http://localhost:3001

## Docker Swarm

스택 배포(루트에서 실행):

사전 조건:
- 호스트에 Docker가 설치되어 있어야 합니다.
- Swarm 모드를 초기화해야 합니다 (`docker swarm init`).

```
docker stack deploy -c docker-stack.yml next-nest
```

스크립트로 빌드 + 배포:

```
pnpm docker:build
pnpm docker:deploy
```

CORS 설정:
- `docker-stack.yml`에서 `CORS_ORIGIN`을 Next.js에 접근하는 공개 URL로 설정하세요.

## Swarm 서비스 플로우

```
Client Browser
     |
     v
Ingress / Published Port 3000
     |
     v
Swarm Routing Mesh
     |
     v
next-nest_nextjs (replicas)
     |
     v
HTTP (overlay network)
     |
     v
next-nest_nestjs (replicas)
     |
     v
Response to Next.js -> Client
```

참고:
- Swarm에서는 Next.js가 `http://nestjs:3001`(서비스 이름)로 NestJS에 접근합니다.
- NestJS의 `CORS_ORIGIN`은 실제로 Next.js에 접속하는 공개 URL을 허용해야 합니다.

## 메모

- Next.js는 `output: "standalone"`으로 설정되어 있어 프로덕션 컨테이너에 적합합니다.
- NestJS는 기본 포트 `3001`이며 컨테이너에서 `0.0.0.0`으로 리스닝합니다.
- Biome은 앱 단위 설정(`apps/nextjs/biome.json`, `apps/nestjs/biome.json`)으로 운영됩니다.
- 이 레포는 실험/학습 목적이므로 구조와 도구는 변경될 수 있습니다.

## 유용한 명령어

```
pnpm dev
pnpm --filter nextjs build
pnpm --filter nestjs build
pnpm --filter nextjs lint
pnpm --filter nestjs test
```
