# CLAUDE.md — CampusAppointmentSystem (Root)

This file provides guidance to Claude Code when working anywhere in this repository.
For deep backend detail, read `CampusAppointmentSystem/CLAUDE.md`.
For frontend detail, read `frontend/README.md` and `frontend/DEMO_ACCOUNTS.md`.

## Project at a Glance

Campus Appointment System — a full-stack application with:

| Layer | Tech | Location |
|-------|------|----------|
| Backend | Java 17, Spring Boot 3.3.5, Maven multi-module, MyBatis-Plus | `CampusAppointmentSystem/` |
| Frontend | Vue 3 + TypeScript, Vite 5, Element Plus, Tailwind CSS, Pinia | `frontend/` |

**Current state:** Functional but resume-WIP. The backend has solid architecture (DDD + multi-module) with 20 unit tests in the appointment module, but lacks pagination and Bean Validation. The frontend has 18 pages with full user/admin flows.

## Repository Layout

```
CampusAppointmentSystem/
├── CLAUDE.md                     ← this file
├── AGENTS.md                     ← dual sub-project guide
├── frontend/                     ← Vue 3 SPA
│   ├── README.md
│   ├── DEMO_ACCOUNTS.md          ← demo login accounts
│   └── src/
│       ├── modules/user/         ← user-facing pages (10 routes)
│       ├── modules/admin/        ← admin pages (5 routes)
│       ├── common/               ← shared stores/utils
│       ├── services/             ← API call wrappers
│       └── router/               ← route definitions + guards
└── CampusAppointmentSystem/      ← Maven multi-module backend
    ├── CLAUDE.md                 ← COMPREHENSIVE backend guide — READ THIS FIRST
    ├── pom.xml                   ← root aggregator POM
    ├── cas-dependencies/         ← BOM
    ├── cas-framework/            ← 6 Spring Boot starters + cas-common
    ├── cas-module-infra/         ← file, QR, email infrastructure
    ├── cas-module-system/        ← user/auth/role management
    ├── cas-module-appointment/   ← core booking & audit business
    ├── cas-thirdparty/          ← AI, weather, OSS, SMS integrations
    ├── cas-server/              ← boot entry point + application.yml
    ├── sql/                     ← database DDL + sample data
    └── interact/                ← planning docs (Chinese)
```

## Quick Start

### Backend (requires MySQL + Redis + SMTP)
```bash
cd CampusAppointmentSystem
mvn clean package -DskipTests
java -jar cas-server/target/cas-server-1.0.0.jar
# App: http://localhost:18080
# API docs: http://localhost:18080/doc.html
```

### Frontend (Node ≥18)
```bash
cd frontend
npm install
npm run dev
# Dev server: http://localhost:3000 (proxies /api → :18080)
```

## Build Commands Reference

```bash
# Backend
mvn clean package -DskipTests                    # full build
mvn -pl cas-module-appointment -am clean compile  # single module + deps
java -jar cas-server/target/cas-server-1.0.0.jar   # run

# Frontend
npm run dev       # dev server (:3000)
npm run build     # production build
npm run type-check # vue-tsc --noEmit
npm run lint      # eslint
```

## Key Documentation Files

When working in a specific area, read these files:

| File | Covers |
|------|--------|
| `CampusAppointmentSystem/CLAUDE.md` | **Everything backend** — module graph, all 101 files, services, DDD layers, auth, business flows, known issues |
| `CampusAppointmentSystem/cas-module-system/AGENTS.md` | System module specifics |
| `CampusAppointmentSystem/cas-module-appointment/AGENTS.md` | Appointment module specifics |
| `CampusAppointmentSystem/cas-module-infra/AGENTS.md` | Infra module specifics |
| `CampusAppointmentSystem/cas-thirdparty/AGENTS.md` | Thirdparty module specifics |
| `CampusAppointmentSystem/cas-server/AGENTS.md` | Server/entrypoint module |
| `frontend/DEMO_ACCOUNTS.md` | Demo login accounts (super_admin, admin_demo, student_demo / 123456) |
| `CampusAppointmentSystem/interact/` | Planning docs (Chinese): code-review-report, structure analysis, migration checklist |

## High-Level Architecture

**Backend:** 7 Maven modules with strict dependency direction (bottom → top):
```
cas-dependencies (BOM)
 → cas-framework (starters + cas-common)
   → cas-module-infra + cas-thirdparty
     → cas-module-system
       → cas-module-appointment
         → cas-server (entry point)
```

Each business module follows DDD four-layer architecture:
```
interfaces/ → REST controllers + DTOs
application/ → service orchestration
domain/ → entities + repository interfaces (pure Java)
infrastructure/ → MyBatis mappers + DOs + repository impls
api/ → cross-module interfaces
```

**Frontend:** Vue 3 SPA with Composition API. Dual API layer (legacy + active) sharing the same Pinia persist key. Module-based routing with lazy loading. Demo mode available when backend is offline.

## Auth Model

- Stateless JWT (HMAC-SHA512, 24h expiration)
- `Authorization: Bearer <token>` header
- BCrypt password encoding
- Three roles: USER(0), ADMIN(1), SUPER_ADMIN(2)
- `@RequireRole` annotation + AOP enforcement
- Never inject `HttpServletRequest` — use `SecurityFrameworkUtils`

## Important Notes

- **Tests**: `cas-module-appointment` has 20 unit tests (JUnit 5 + Mockito). Other modules lack tests. Build uses `-DskipTests` for packaging, use `mvn test` to run tests.
- Backend requires MySQL (database `cas_db`), Redis (:6379), and SMTP to run.
- `application.yml` contains real credentials checked into version control — treat as secrets.
- The project is **not a Git repository** yet (no `.git` directory).
- `CampusAppointmentSystem/interact/` contains planning documents in Chinese — useful for understanding design decisions.
- `CampusAppointmentSystem/plan.md` documents an ongoing migration to clean up cas-common.
