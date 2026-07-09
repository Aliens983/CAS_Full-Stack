# AGENTS.md

Two sub-projects: a Java Spring Boot backend and a Vue 3 + TypeScript frontend.

**When editing backend code, read `CampusAppointmentSystem/CLAUDE.md` first** — it is the comprehensive reference with complete file inventory, business flows, known issues, and every convention.

---

## Backend — `CampusAppointmentSystem/`

Java 17, Spring Boot 3.3.5, Maven multi-module (7 modules). No `mvnw` — use system `mvn`. Group `com.laoliu`, base package `com.laoliu.cas`.

```bash
mvn clean package -DskipTests                      # full build
mvn -pl cas-module-appointment -am clean compile   # single module + deps
java -jar cas-server/target/cas-server-1.0.0.jar   # run on :18080
```

### Module dependency chain (bottom → top)

```
cas-dependencies (BOM)
 → cas-framework (6 starters + cas-common)
   → cas-module-infra + cas-thirdparty
     → cas-module-system
       → cas-module-appointment
         → cas-server (entry point, NO business code)
```

**Hard rules:**
- `infra` must not depend on `system`/`appointment`
- `thirdparty` depends only on `cas-common`
- Business modules communicate only through `api/` interfaces

### DDD layers (every business module)

```
interfaces/       controller (+ dto/, assembler/) — REST boundary
application/      service + impl — orchestration only, NO direct DB
domain/           entity + repository interface — NO Spring annotations
infrastructure/   persistence (mapper, dataobject), external, aspect
api/              cross-module interface (+ impl) — ONLY cross-module path
```

### Backend rules

- **Auth:** stateless JWT (HMAC-SHA512, 24h). Never inject `HttpServletRequest`. Use `SecurityFrameworkUtils.getLoginUser()`/`getLoginUserId()`. For cross-module user id, inject `GetUserIdViaTokenApi`.
- **Controllers** return `CommonResult<T>`. Admin endpoints: add `@RequireRole({ADMIN, SUPER_ADMIN})`.
- **`@RequireRole` uses EXACT match.** `@RequireRole({USER, ADMIN, SUPER_ADMIN})` to accept all roles. Enforced by `RoleAspect` in cas-module-system (known issue: writes manual JSON, bypasses GlobalExceptionHandler).
- **Cross-module:** never call another module's service/Mapper. Use `api/` interfaces.
- **Error codes:** add to the relevant `*ErrorCode` interface in `cas-common.exception.code.*`. Current error codes are INCONSISTENT (mix of HTTP codes, domain codes, magic numbers like 3838438).
- **`application.yml`** contains real credentials (DB, SMTP, JWT secret, API keys) — treat as SECRETS, use env vars for new ones.
- **SQL** in `sql/` (DDL + sample data). No Flyway/Liquibase. Redis data in `data/redis/`.
- **MyBatis-Plus:** mapper XML at `classpath*:/mapper/**/*.xml`, type-aliases `com.laoliu.cas.**.dataobject`, `map-underscore-to-camel-case: true`.
- **Tests:** `cas-module-appointment` has 20 unit tests (JUnit 5 + Mockito). Other modules lack tests. `BaseApplicationTest` in cas-spring-boot-starter-test provides test infrastructure.
- Each module has its own `AGENTS.md` and `README.md` — read before editing.

### Complete controller path inventory

**Bridge controllers** (flat paths, no prefix):

| Controller | Path | Module |
|-----------|------|--------|
| `LoginController` | `POST /login` | system |
| `GraphicController` | `GET /graphic/get` | system |
| `RegisterController` | `POST /register/verify-code` | system |
| `EmailController` | `POST /email` | system |
| `ServiceController` | `GET /service` | appointment |
| `ServiceStatusController` | `GET /service-status/user` | appointment |

**Admin endpoints** (`/admin/` prefix):

| Controller | Path | Auth |
|-----------|------|------|
| `ServiceStatusAdminController` | `POST /admin/service-status/audit/pass` | `@RequireRole({ADMIN, SUPER_ADMIN})` |
| `ServiceStatusAdminController` | `POST /admin/service-status/audit/reject` | `@RequireRole({ADMIN, SUPER_ADMIN})` |
| `ServiceStatusAdminController` | `GET /admin/service-status` | (no explicit role guard) |
| `ServiceAdminController` | `GET /admin/service`, `POST /admin/service` | `@RequireRole(ADMIN)` |
| `ServiceAdminController` | `GET /admin/service/id` | `@RequireRole(ADMIN)` |
| `UserController` | `GET /user`, `GET /user/all_users`, `POST /user/create` | Varies |
| `RoleAdminController` | `GET /admin/role`, `PUT /admin/role` | USER/ADMIN |
| `EmailAdminController` | `POST /admin/email` | — |
| `FileAdminController` | `POST /admin/file/upload` | — |
| `OSSAdminController` | `POST /admin/oss/upload` | — |

**App endpoints** (`/app/` prefix) — most have DUPLICATE bridge variants:

| Controller | Path |
|-----------|------|
| `LoginAppController` | `POST /app/login` |
| `RegisterAppController` | `POST /app/register/verify-code` |
| `GraphicVerificationAppController` | `GET /app/graphic/get` |
| `ServiceAppController` | `GET /app/service` |
| `ServiceStatusAppController` | `GET /app/service-status/user` |

**User-facing endpoints:**

| Controller | Path |
|-----------|------|
| `BookAppController` | `POST /book`, `POST /book/room`, `POST /book/equipment`, `POST /book/consultation`, `GET /book/allService`, `POST /book/cancel` |
| `ConsultationAppController` | `GET /consultation`, `GET /consultation/:id` |
| `EquipmentAppController` | `GET /equipment`, `GET /equipment/:id` |

**Public endpoints** (no auth):

| Controller | Path |
|-----------|------|
| `CallTheModelController` | `POST /callTheLargeModel` |
| `WeatherController` | `GET /weather` |

### Key business flows (summary)

1. **Login**: POST /login → AuthService.login() → BCrypt verify → JWT generate
2. **Register**: POST /email (get code) → POST /register/verify-code (verify code + create account)
3. **Book**: POST /book → BookServiceImpl.bookService() → @Transactional → insert
4. **Audit**: POST /admin/service-status/audit/{pass,reject} → ServiceStatusServiceImpl → update status + send email
5. **Captcha**: GET /graphic/get → CaptchaServiceImpl → math captcha → Redis → return image URL

### Spring Security permit-all paths

```
/api/auth/**, /api/public/**, /login, /login/reset, /graphic/get,
/register/verify-code, /email, /callTheLargeModel/**, /error,
/doc.html, /swagger-ui/**, /v3/api-docs/**, /webjars/**, /favicon.ico, /hello
```

### Known issues (high priority)

1. **Partial test coverage** — 20 tests in cas-module-appointment, system/infra modules uncovered
2. **No pagination** on any list endpoint
3. **Minimal Bean Validation** — only 1 DTO uses @NotNull
4. **Fake data** in ConsultationServiceImpl/EquipmentServiceImpl
5. **Duplicate controllers** — 4 pairs at /app/* vs /*
6. **Role toggle bug** in RoleServiceImpl — role assignment inverted
7. **RoleAspect** bypasses GlobalExceptionHandler
8. **No @Cacheable** — Redis only for verification codes
9. **MQ starter empty** — dead code
10. **DeepSeekConfig** never used — dead code

---

## Frontend — `frontend/`

Vue 3 (Composition API + TypeScript), Vite 5, Tailwind CSS, Element Plus, Pinia, Axios, Vue Router 4, ECharts, dayjs, vue-i18n (not yet wired).

```bash
npm install              # Node >=18, npm >=9
npm run dev              # dev server on http://localhost:3000
npm run build            # production build (vue-tsc && vite build)
npm run type-check       # vue-tsc --noEmit
npm run lint             # eslint
```

### Vite proxy

`/api` → `http://localhost:18080`, rewrites strip `/api` prefix. Frontend `GET /api/user` → backend `GET /user`.

### Two parallel API layers (same persist key)

| Layer | Request util | Store |
|-------|-------------|-------|
| Legacy (auth pages) | `@/utils/request` | `@/stores/user` |
| Active (modules) | `@/common/utils/request` | `@/common/stores/user` |

Both use persist key `"enterprise_frontend_user"` — token set during login is visible everywhere.

### Routing (18 pages)

**Public:** `/login`, `/register`, 404 catch-all

**User routes** (10): `/dashboard`, `/services`, `/service/:id`, `/rooms`, `/equipment`, `/consultation`, `/bookings`, `/bookings/:id`, `/messages`, `/profile`

**Admin routes** (5): `/admin` (dashboard), `/admin/services`, `/admin/bookings`, `/admin/users`, `/admin/system`

Route guard: unauthenticated → `/login`, admin → `/admin`, user → `/dashboard`.

### Demo accounts (frontend-only bypass)

When backend is offline, role determined by username keyword:
- `super_admin` / `123456` → SUPER_ADMIN
- `admin_demo` / `123456` → ADMIN
- `student_demo` / `123456` → USER

### TypeScript paths

`@/*` → `src/*`, plus `@components`, `@views`, `@utils`, `@stores`, `@router`, `@types`.

---

## General Notes

- **Tests:** Backend has 20 unit tests in `cas-module-appointment` (JUnit 5 + Mockito). Frontend has no tests.
- **No Git repository** initialized yet (`git init` needed).
- **No Docker/CI/CD** configuration.
- `CampusAppointmentSystem/interact/` and `CampusAppointmentSystem/plan.md` are planning notes (Chinese).
- **`CampusAppointmentSystem/CLAUDE.md`** is the comprehensive backend reference — read it first.
