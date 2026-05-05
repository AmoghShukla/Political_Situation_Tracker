# Political Current Situation Tracker

Production-oriented full-stack scaffold for political intelligence, election tracking, RBAC-protected data management, and analytics.

## Stack

Backend: FastAPI, async SQLAlchemy 2.0, PostgreSQL, Alembic, Pydantic v2, JWT access/refresh rotation, Redis readiness, structured logging, pytest, Gunicorn/Uvicorn.

Frontend: Next.js 15, TypeScript, TailwindCSS, ShadCN-style local UI primitives, TanStack Query, Zustand, Axios, Recharts, protected routes, RBAC-aware rendering.

## Architecture

The backend uses layered modules under `backend/app`: API routers, dependencies, repositories, services, schemas, models, permissions, middleware, and database configuration. Data access is async and repository-backed; write endpoints use explicit transactions and audit logging hooks. RBAC is enforced at route dependency level and mirrored in the frontend through `PermissionGate` and permission-aware navigation.

The frontend uses route groups under `frontend/app/(protected)`, shared layout shell, API services, query functions, Zustand auth persistence, and reusable table/input/button primitives. Admin-only controls are hidden unless the logged-in role has the required permission.

## Run Locally

1. Copy backend environment values:

```bash
cp backend/.env.example backend/.env
```

2. Start the platform:

```bash
docker compose up --build
```

3. Open:

- Frontend: `http://localhost:3000`
- Backend API docs: `http://localhost:8000/docs`
- NGINX entrypoint: `http://localhost:8080`

Seeded admin defaults are in `backend/.env.example`.

## Backend Commands

```bash
cd backend
pip install -r requirements/dev.txt
alembic upgrade head
python -m app.db.seed
pytest
```

## Frontend Commands

```bash
cd frontend
npm install
npm run dev
npm run build
npm test
```

## Scalability Notes

The API is async end to end, uses PostgreSQL indexes for common search/filter paths, connection pooling for concurrent workloads, pagination on list endpoints, eager loading where response graphs need related data, Redis-ready infrastructure for cache/rate-limit expansion, and Gunicorn worker sizing for multi-process serving. For 1000+ concurrent users, deploy behind NGINX or a cloud load balancer, run multiple backend replicas, tune PostgreSQL pool sizes per replica, add Redis-backed rate limiting, and cache analytics aggregates with explicit invalidation on election-result writes.

## Security Notes

JWT access tokens are short-lived; refresh tokens rotate through `token_version`. Passwords are bcrypt hashed. CORS and secure headers are configured. SQL injection risk is controlled through SQLAlchemy parameterization. Secrets are environment-driven and should be supplied by a secret manager outside local development.
