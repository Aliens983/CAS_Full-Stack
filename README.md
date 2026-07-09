<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=32&duration=3000&pause=1000&color=3B82F6&center=true&vCenter=true&width=700&lines=Campus+Appointment+System;%E6%A0%A1%E5%9B%AD%E9%A2%84%E7%BA%A6%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F;Spring+Boot+3+%2B+Vue+3+%2B+Docker" alt="Typing SVG" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java 17" />
  <img src="https://img.shields.io/badge/Spring_Boot-3.3.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/MyBatis_Plus-3.5.5-1E90FF?style=for-the-badge&logo=mybatis&logoColor=white" alt="MyBatis-Plus" />
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Redis-7.0-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
  <img src="https://img.shields.io/badge/Vue-3.4-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Docker-🐳-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/Architecture-DDD_Multi_Module-ff69b4?style=flat-square" alt="Architecture" />
  <img src="https://img.shields.io/badge/Auth-JWT_RBAC-green?style=flat-square" alt="Auth" />
  <img src="https://img.shields.io/badge/Deploy-Docker_Compose-2496ED?style=flat-square" alt="Docker" />
</p>

<br />

---

## 📖 项目简介

**校园预约管理系统**（Campus Appointment System）是一个面向高校的综合预约管理平台，采用**前后端分离 + Docker 一键部署**架构，支持自习室预约、心理咨询、学业辅导、考试报名、社团活动等多种校园服务场景。

> 🎯 本项目既是可部署运行的完整应用，也是全栈开发的教学参考项目——后端为 DDD 多模块 Spring Boot，前端为 Vue 3 + TypeScript + Element Plus。

<br />

---

## 📁 项目结构

```
CAS_Full-Stack/
├── README.md                         ← 本文件
├── docker-compose.yml                ← Docker 一键部署
├── .env.example                      ← 环境变量模板
├── DEPLOY.md                         ← 部署文档
├── docs/                             ← 项目文档
│   ├── todo.md                       ← 优化清单
│   └── docker-deploy.md              ← Docker 部署详细指南
│
├── CampusAppointmentSystem/          ← 后端 (Java + Spring Boot)
│   ├── Dockerfile
│   ├── docs/docker-deploy.md
│   ├── cas-server/                   ← 启动入口
│   ├── cas-framework/                ← 6 个 Spring Boot Starter
│   ├── cas-module-system/            ← 用户 & 权限模块
│   ├── cas-module-appointment/       ← 预约核心模块
│   ├── cas-module-infra/             ← 基础设施服务
│   ├── cas-thirdparty/               ← 第三方集成
│   └── sql/                          ← 数据库初始化脚本
│
└── frontend/                         ← 前端 (Vue 3 + TypeScript)
    ├── Dockerfile
    ├── nginx.conf
    ├── src/
    │   ├── modules/user/             ← 用户端页面 (10 routes)
    │   ├── modules/admin/            ← 管理端页面 (5 routes)
    │   ├── services/                 ← API 调用封装
    │   ├── router/                   ← 路由 + 守卫
    │   └── common/                   ← 共享状态 & 工具
    └── DEMO_ACCOUNTS.md              ← 演示账号
```

<br />

---

## ✨ 功能亮点

<table>
<tr>
<td width="50%">

### 👤 用户端
- 🔐 **邮箱验证码注册** — SMTP 发送 6 位验证码，Redis 限频防刷
- 🧮 **算术验证码** — 防止机器注册
- 📋 **多类型预约** — 教室 / 设备 / 咨询 / 活动
- 📊 **预约状态追踪** — 提交 → 通过 / 拒绝 / 取消
- 📧 **审核邮件通知** — 自动发送
- 🌤️ **校园天气** — 集成第三方 API

</td>
<td width="50%">

### 🛡️ 管理端
- 📝 **服务管理** — 动态上下架服务
- ✅ **预约审核** — 逐条审批，填写原因
- 🔒 **三级 RBAC** — 用户 / 管理员 / 超级管理员
- 📁 **文件上传** — 本地存储 & 阿里云 OSS
- 📱 **短信通知** — 阿里云 SMS（预留）
- 🤖 **AI 对话** — Qwen 大模型（可选）

</td>
</tr>
</table>

<br />

---

## 🚀 快速开始

### Docker 一键部署（推荐）

```bash
# 1. 配置环境变量
cp .env.example .env
vim .env   # 修改 SMTP 密码、JWT 密钥

# 2. 启动
docker compose up -d

# 3. 访问
# 前端:  http://localhost
# API文档: http://localhost:18080/doc.html
```

详见 **[DEPLOY.md](DEPLOY.md)** 和 **[CampusAppointmentSystem/docs/docker-deploy.md](CampusAppointmentSystem/docs/docker-deploy.md)**

### 本地开发

**环境要求**: JDK 17+ · MySQL 8.0+ · Redis 7.0+ · Maven 3.6+ · Node 18+

```bash
# 后端
cd CampusAppointmentSystem
mvn clean package -DskipTests
java -jar cas-server/target/cas-server-1.0.0.jar
# → http://localhost:18080

# 前端（新终端）
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### 演示账号

| 角色 | 邮箱 | 密码 |
|------|------|------|
| 超级管理员 | super_admin | 123456 |
| 管理员 | admin_demo | 123456 |
| 普通用户 | student_demo | 123456 |

<br />

---

## 🧱 系统架构

```
                    +--------------------------+
                    |       Frontend SPA       |
                    |  Vue3 + TS + ElementPlus |
                    |        Port :3000        |
                    +------------+-------------+
                                 |
                  HTTP REST · JWT Bearer Token
                                 |
                    +------------+-------------+
                    |    Backend (Port :18080) |
                    +------------+-------------+
                                 |
                +----------------+----------------+
                |                                  |
      +--------+----------+              +--------+--------+
      |   cas-server      |              |  Health · CORS  |
      | SpringBoot Entry  |              |  Actuator       |
      +--------+----------+              +-----------------+
               |
      +--------+----------------------------------+
      |          Business Modules                 |
      +--------+----------------------------------+
               |
      +--------+----------+
      | cas-module-       |
      |   appointment     |  --> booking, audit, email notify
      +--------+----------+
               |  depends on
      +--------+----------+
      | cas-module-system |  --> user, auth, role, captcha
      +--------+----------+
               |  depends on
   +-----------+-----------+
   |           |           |
+----+----+ +----+----+ +---+------+
|  infra  | | third-  | |  common  |
|  file   | |  party  | |  shared  |
|  email  | | AI/OSS  | |  kernel  |
|  qrcode | | SMS/Wth | |  utils   |
+----+----+ +----+----+ +---+------+
   |           |           |
   +-----------+-----------+
               |
      +--------+----------+
      |  Infrastructure   |
      |  MySQL · Redis    |
      |  SMTP · Aliyun    |
      +-------------------+
```

<br />

---

## 🧩 后端模块

| 模块 | 层级 | 核心功能 |
|------|------|----------|
| **cas-dependencies** | BOM | 所有第三方库版本号集中管控 |
| **cas-framework** | 基础设施 | 6 个 Spring Boot Starter（Web / Security / MyBatis / Redis / MQ / Test） |
| **cas-common** | 共享内核 | 异常体系 · JWT 工具 · 枚举 · 通用响应 · BCrypt |
| **cas-module-infra** | 基础设施服务 | 文件上传 · @Async 邮件 · 二维码生成 |
| **cas-module-system** | 业务模块 | 注册登录 · 角色管理 · @RequireRole AOP 鉴权 |
| **cas-module-appointment** | 业务模块 | 多类型预约 · 审核流程 · 邮件通知 |
| **cas-thirdparty** | 第三方集成 | 阿里云 OSS/SMS · Qwen AI · 天气查询 |
| **cas-server** | 入口 | Spring Boot 启动 · application.yml · CORS |

每个业务模块遵循 **DDD 四层架构**: `interfaces/ → application/ → domain/ → infrastructure/`

<br />

---

## 🛠️ 技术栈

| 分类 | 技术 | 用途 |
|------|------|------|
| **后端框架** | Spring Boot 3.3.5 · Java 17 · Maven 3.9 | 多模块项目 |
| **数据访问** | MyBatis-Plus 3.5.5 · MySQL 8.0 · Redis 7.0 | ORM + 缓存 |
| **安全** | JWT (HMAC-SHA512) · BCrypt · Spring Security 6.3 | 无状态认证 |
| **前端框架** | Vue 3.4 · TypeScript 5.6 · Vite 5 | SPA 应用 |
| **UI 组件** | Element Plus 2.8 · Tailwind CSS 3.4 | 组件库 + 原子化 CSS |
| **状态管理** | Pinia 2.2 · Pinia Plugin Persistedstate | 持久化状态 |
| **工具库** | Hutool 5.8 · Knife4j 4.5 · Lombok | 工具集 |
| **第三方** | 阿里云 OSS/SMS · 通义千问 · DeepSeek | 可选集成 |
| **部署** | Docker · Docker Compose · Nginx | 容器化部署 |

<br />

---

## 🧪 测试

### 后端测试 (38 个)

| 测试类 | 模块 | 测试数 |
|--------|------|--------|
| `BookServiceImplTest` | cas-module-appointment | 11 |
| `ServiceStatusServiceImplTest` | cas-module-appointment | 9 |
| `ServiceServiceImplTest` | cas-module-appointment | — |
| `AuthServiceTest` | cas-module-system | 8 |
| `RoleServiceImplTest` | cas-module-system | 6 |
| `EmailVerificationServiceImplTest` | cas-module-system | — |
| `UserServiceImplTest` | cas-module-system | — |

```bash
# 运行所有测试
cd CampusAppointmentSystem && mvn test -Dsurefire.failIfNoSpecifiedTests=false

# 运行单个模块
mvn -pl cas-module-system -am test -Dsurefire.failIfNoSpecifiedTests=false
```

<br />

---

## 📄 许可证

MIT License

---

<p align="center">
  <sub>Built with ❤️ using Spring Boot · Vue 3 · Docker</sub>
  <br />
  <sub>© 2026 Campus Appointment System</sub>
</p>
