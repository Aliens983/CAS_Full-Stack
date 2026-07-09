# Full-Stack Debug & Enhance Skill

This skill activates when working on the CampusAppointmentSystem (Java Spring Boot + Vue 3 full-stack project).

## Core Principles

1. **Full-stack tracing** — Never stop at one layer. When a bug is reported, trace from frontend → API → controller → service → repository → database, and back.
2. **Check similar issues** — When you find one bug (e.g., field name mismatch, missing context-path), proactively search the ENTIRE codebase for the same pattern.
3. **Fix both ends together** — Frontend and backend changes should be made in the same turn. Don't leave one side broken.
4. **User reports in Chinese with logs** — Read the full stack trace carefully. The root cause is almost always at the bottom (the first "Caused by:").
5. **No empty shells** — Every button must have a `@click` handler that calls a real API. Every function must do real work, not just `ElMessage.success("操作成功")`.

## Project Architecture

```
Backend: Java 17, Spring Boot 3.3.5, MyBatis-Plus, DDD 4-layer
  Port 18080, context-path /api/v1
  Modules: cas-common → cas-framework → cas-module-infra → cas-module-system → cas-module-appointment → cas-server

Frontend: Vue 3 + TypeScript, Vite 5, Element Plus, Tailwind
  Port 3000, proxies /api → localhost:18080, rewrite /api → /api/v1
  Routes: modules/user/router.ts (user), modules/admin/router.ts (admin)
  Layout shells: UserLayoutShell, AdminLayoutShell
```

## Standard Bug-Fix Flow

### 1. Read the error first
- Java stack trace → find the first `Caused by:` at the bottom
- Check if it's a database error (table missing, column mismatch), config error (YAML indentation, missing bean), or logic error

### 2. Trace the full data flow
- Controller → Service → Repository → Mapper → SQL/XML
- Backend DTO field names ↔ Frontend type field names

### 3. Check both ends
- Backend endpoint path vs frontend API call path
- `@RequestParam` vs `@RequestBody` vs frontend `request.post(data)` 
- `@PathVariable` names vs frontend URL construction

### 4. Fix + verify
- `mvn -pl <module> -am compile` for backend
- `npx vue-tsc --noEmit` for frontend
- `mvn test` to make sure existing tests still pass

## Common Issues Checklist

When debugging any problem, always check:

- [ ] **context-path `/api/v1`** — Backend URL construction must include it. Frontend proxy rewrites `/api/*` → `/api/v1/*`.
- [ ] **`PageResult` wrapping** — Backend paginated endpoints return `{records, total, ...}`, not bare arrays. Frontend must extract `.records`.
- [ ] **`CommonResult` unwrapping** — `request.ts` interceptor extracts `payload.data`. Frontend gets the bare DTO.
- [ ] **MapStruct** — Generated `*Impl.java` must exist in `target/`. If not, check `annotationProcessorPaths` in `pom.xml`.
- [ ] **Field name match** — Backend DTO field names (camelCase in Java) must match frontend access patterns.
- [ ] **`v-model` vs `model-value`** — `model-value` is one-way, `v-model` is two-way. Switches/inputs must use `v-model`.
- [ ] **No empty `@click`** — Every `el-button` must have a handler that does real work.
- [ ] **No hardcoded demo data** — Pages should load from APIs, not `ref([...])` arrays.
- [ ] **URL proxy** — Images from backend must go through Vite proxy: `new URL(url).pathname.replace('/api/v1', '')` → `'/api' + path`.
- [ ] **YAML indentation** — 2 spaces, no tabs, top-level keys at column 0.

## UI Design Rules

- No white-wash hover overlays on cards (`panel-card::before` with `rgba(255,255,255,...)` must be removed)
- Cards need clear separation: border + shadow + white background
- All page banners use `dashboard-hero`/`admin-hero` pattern: chip + h1 + two-column grid + side panel
- Buttons: gradient background, border-radius 10px, hover shadow, plain buttons fill on hover
- Dialog/Drawer close: use `v-if` + `:model-value="true"` NOT `v-model`, to prevent flickering
- No developer-oriented text in UI: "后续接接口", "后端已联调", "支持后续替换" → enterprise copy
- Header single-line layout: brand | nav | weather | user all in one flex row

## Database

- MySQL `cas_db`, user `root`, password `Lcy10194815!`
- Run SQL files from `sql/` directory if tables are missing
- Common cause of errors: table doesn't exist → find DDL in `sql/` and execute

## Build Commands

```bash
# Backend
mvn clean package -DskipTests
java -jar cas-server/target/cas-server-1.0.0.jar

# Single module compile
mvn -pl cas-module-appointment -am compile

# Run tests
mvn test

# Frontend
npm run dev
npx vue-tsc --noEmit
```
