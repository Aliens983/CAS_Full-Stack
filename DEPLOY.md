# Docker Compose 部署指南

## 环境要求

| 软件 | 最低版本 |
|------|---------|
| Docker | 20.10+ |
| Docker Compose | 2.0+ |
| 内存 | ≥ 2GB 空闲 |
| 磁盘 | ≥ 5GB 空闲 |

## 快速开始

```bash
# 1. 配置环境变量
cp .env.example .env
vim .env   # 修改 SMTP 密码、JWT 密钥等

# 2. 一键启动
docker compose up -d

# 3. 查看日志
docker compose logs -f

# 4. 访问
# 前端:  http://localhost
# API文档: http://localhost:18080/doc.html
```

## 生成的容器

| 容器名 | 服务 | 端口 |
|--------|------|------|
| `cas-mysql` | MySQL 8.0 | 3306 |
| `cas-redis` | Redis 7 | 6379 |
| `cas-backend` | Spring Boot | 18080 |
| `cas-frontend` | Nginx + Vue | 80 |

## 常用命令

```bash
docker compose up -d              # 启动所有服务
docker compose down               # 停止并删除容器
docker compose down -v            # 停止并删除容器+数据卷（⚠️ 数据会丢失）
docker compose restart backend    # 重启后端
docker compose logs -f backend    # 查看后端日志
docker compose ps                 # 查看服务状态
docker compose build --no-cache   # 强制重新构建镜像
```

## 目录结构

```
├── docker-compose.yml        # 服务编排
├── .env                      # 环境变量（不提交到 Git）
├── .env.example              # 环境变量模板
├── docker/
│   └── mysql/
│       └── conf.d/           # MySQL 自定义配置
├── CampusAppointmentSystem/
│   ├── Dockerfile            # 后端镜像
│   └── sql/                  # 数据库初始化脚本（自动执行）
└── frontend/
    ├── Dockerfile            # 前端镜像
    └── nginx.conf            # Nginx 配置
```

## 环境变量说明

### 必填项（不填则功能不可用）

| 变量 | 说明 | 示例 |
|------|------|------|
| `MYSQL_ROOT_PASSWORD` | MySQL root 密码 | `root123456` |
| `SMTP_USERNAME` | 发件邮箱 | `your_email@163.com` |
| `SMTP_PASSWORD` | SMTP 授权码 | `your_auth_code` |
| `JWT_SECRET` | JWT 签名密钥（64位随机字符串） | `openssl rand -base64 64` |

### 可选项

| 变量 | 说明 |
|------|------|
| `WEATHER_API_ID` / `WEATHER_API_KEY` | 天气 API 凭证 |
| `DEEPSEEK_API_KEY` / `QWEN_API_KEY` | AI 模型 API 凭证 |
| `ALIYUN_OSS_*` | 阿里云 OSS 配置 |
| `ALIYUN_ACCESS_KEY_*` | 阿里云 SMS 配置 |
| `REDIS_PASSWORD` | Redis 密码（默认无密码） |
| `JAVA_OPTS` | JVM 参数（默认 -Xms256m -Xmx512m） |

## 数据库

- 数据库名: `cas_db`
- 首次启动时 `sql/` 目录下的脚本自动执行（按文件名排序）
- 数据持久化在 `cas-mysql-data` 数据卷中
- 演示账号见 `frontend/DEMO_ACCOUNTS.md`

## 故障排查

```bash
# 查看某个服务的日志
docker compose logs backend

# 进入容器调试
docker compose exec backend sh
docker compose exec mysql mysql -uroot -p

# 检查端口占用
ss -tlnp | grep -E '80|3306|6379|18080'

# 如果前端页面刷新 404
# 检查 nginx.conf 中 try_files 配置是否正确
docker compose exec frontend cat /etc/nginx/conf.d/default.conf

# 如果后端连不上 MySQL
# 确认 mysql 服务已 healthy
docker compose ps mysql
```
