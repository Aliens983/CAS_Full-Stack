# Campus Appointment System — TODO & 优化清单

> 最后更新: 2026-07-09

---

## ✅ 已完成

### 4. 修复已知 Bug ✅

| Bug | 状态 | 修复方式 |
|-----|------|---------|
| RoleAspect 绕过全局异常处理 | ✅ 已修复 | 移除手动写 JSON 到 HttpServletResponse 的逻辑，改为抛出 UnauthorizedException / ForbiddenException，由 GlobalExceptionHandler 统一处理 |
| RoleServiceImpl 角色切换 | ✅ 已修复 | 将 toggle 式的 `changeRoleById` 替换为精准的 `setRoleById(userId, newRole)`，业务校验上提到 Service 层，Controller 移除 try-catch 反模式 |

### 6. 列表接口加分页 ✅

| 接口 | 状态 |
|------|------|
| ConsultationAppController.getConsultants() | ✅ DB 分页（ConsultantRepository.findPage） |
| EquipmentAppController.getEquipment() | ✅ DB 分页（EquipmentRepository.findPage） |
| BookAppController.getBook() | ✅ DB 分页（BookingRepository.getServiceStatusByUserId） |
| EquipmentAppController.getCategories() | ✅ 从 DB 去重读取分类（不再返回硬编码列表） |

### 7. DTO Bean Validation ✅

| DTO | 新增校验 |
|-----|---------|
| UserLoginRequest | password: `@Size(min=6)` |
| UserRegisterRequest | age: `@Max(150)`, code: `@Size(min=6, max=6)` |
| ResetPasswordRequest | code: `@Size(min=6, max=6)` |
| BookServiceRequest | serviceIds: `@Size(max=50)` |
| ServiceAddRequest | serviceName: `@Size(max=100)`, serviceDescribe: `@Size(max=500)` |

### 8. 替换假数据 ✅

| 改动 | 详情 |
|------|------|
| equipment 表新增 `category` 列 | SQL 已更新，种子数据带分类（投影设备、计算机设备、音频设备、摄影摄像） |
| Equipment 领域实体 | 新增 `category` 字段，Entity/DO/toEntity/fromEntity 全部同步 |
| EquipmentRepository | 新增领域仓库接口 + 实现（分页查询、分类去重） |
| ConsultantRepository | 新增领域仓库接口 + 实现（分页查询） |
| ConsultationServiceImpl | 移除假数据回退值（rating 不再默认 5.0，available 不再硬编码 true），全部从 DB 读取 |
| EquipmentServiceImpl | 移除硬编码分类列表、移除 `category="设备资源"` 硬编码、移除 `image="gradient-teal"` |
| 控制器分页 | 移除 `paginateInMemory()` 方法，全部改用 MyBatis-Plus DB 层分页 |

### 9. 单元测试 ✅

| 测试类 | 模块 | 状态 |
|--------|------|------|
| RoleServiceImplTest | cas-module-system | ✅ 已更新（适配新 API: setRoleById + 异常路径测试） |
| AuthServiceTest | cas-module-system | ✅ 通过（登录/注册/重置密码） |
| EmailVerificationServiceImplTest | cas-module-system | ✅ 通过 |
| UserServiceImplTest | cas-module-system | ✅ 通过 |
| BookServiceImplTest | cas-module-appointment | ✅ 通过（11 个测试） |
| ServiceStatusServiceImplTest | cas-module-appointment | ✅ 通过（9 个测试） |
| ServiceServiceImplTest | cas-module-appointment | ✅ 通过 |

---

## 🔴 待完成

### 1. 初始化 Git 仓库
项目目前前后端分开创建了独立的 Git 仓库，可以考虑合并为 monorepo 或使用 git submodule。

### 2. Docker 构建测试
Docker 配置文件已创建（Dockerfile + docker-compose.yml），需要在本地验证 `docker compose build` 能成功。

---

## 🟡 待完成

### 5. 生产环境关闭 SQL 日志和 debug
- 修改 `.env` 中 `LOG_LEVEL=info`
- 移除 `mybatis-plus.configuration.log-impl: StdOutImpl`

---

## 🟢 待完成

### 咨询服务时间段持久化
目前 `getAvailableTimeSlots()` 仍返回固定的 6 个时间段。如需真正的可用时段管理，需要新建 `time_slot` 或 `booking_slot` 表。

### 设备图片管理
`EquipmentResponse.image` 字段目前无数据来源（DB 中无 image 列）。如需支持，需要在 equipment 表新增 `image_url` 列。

---

## 📊 完成度统计

| 序号 | 任务 | 状态 |
|------|------|------|
| 1 | Git 初始化 | ⬜ 待完成 |
| 2 | 修复前端硬编码 request.ts | ✅ 已完成 |
| 3 | Docker 构建测试 | ⬜ 待完成 |
| 4 | 修已知 Bug | ✅ 已完成 |
| 5 | 关 SQL 日志 + debug | ⬜ 待完成 |
| 6 | 加分页 | ✅ 已完成 |
| 7 | Bean Validation | ✅ 已完成 |
| 8 | 替换假数据 | ✅ 已完成 |
| 9 | 补 system 模块测试 | ✅ 已完成 |

**总体进度: 6/9 ✅ (67%)**
